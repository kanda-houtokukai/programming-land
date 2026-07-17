// 経験値・レベル・進化・たまごサイクルのルール（b4j: レベルは相棒ごと）
import { stageForLevel, monsterName, SPECIES } from "./data/monsters.js";

export const MAX_LEVEL = 30;

// あそびごとの もらえる経験値
export const XP = {
  puzzleWin: stars => 8 + 3 * stars,   // ★1=11 ★2=14 ★3=17
  quizSet: score => 4 + 2 * score,     // 5問全問正解で14
  artSave: () => 8,
  typing: () => 10,                     // P4で使用
  studioSave: () => 10,                 // つくるスタジオ: 新規作品の初回保存のみ（作り直し保存では出ない・設計§8）。初期値
};

// つぎのレベルまでに必要な経験値（レベルが上がるほど少しずつ増える）
// P6bでバトル勝利がXP源に加わったぶん、全域を約25%引き上げて進化(Lv5/Lv12)をゆっくりに
// （旧: 12+4*(level-1)。Lv5到達 72→90 XP／Lv12到達 352→440 XP＝ちょうど+25%）
export function xpToNext(level) { return 15 + 5 * (level - 1); }

// アクティブ相棒のレコード（b4j: owned は {id, level, xp} の配列）。移行前の不正値でも落ちない
export function activeMon(partner) {
  if (!partner || !Array.isArray(partner.owned) || !partner.owned.length) return null;
  return partner.owned.find(m => m.id === partner.active) || partner.owned[0];
}

/* ===== たまごサイクル（b4j・旧EGG_LEVELS方式は廃止） =====
   付与: アクティブ相棒が stage3（Lv12）へ「到達した瞬間」に卵1個（未所持タイプが残っていて・卵が保留中でないとき）
   ＝卵は常に1個だけ・溜まらない。孵化: 以後アクティブが得るEXPでゲージが進み、満ちたら未所持からランダムで1体（Lv1）。
   ★EGG_HATCH_XP は初期値＝実機でテンポ調整（BATTLE_XP: easy12/normal16/hard22 → やさしいバトル3〜4回ぶん） */
export const EGG_HATCH_XP = 40;

/* profile.partner のアクティブ相棒に経験値を加算し、レベルアップ・進化・たまご付与/孵化を処理する
   （profileを直接書き換える）。返り値: { levelsGained, evolvedTo, eggArrived, hatched }
   evolvedTo=進化した場合の新すがた番号／eggArrived=このXPで卵が届いた／hatched=孵化した場合の新タイプid */
export function applyXp(profile, amount) {
  const p = profile.partner;
  const mon = activeMon(p);
  if (!mon) return { levelsGained: 0, evolvedTo: null, eggArrived: false, hatched: null };
  const beforeStage = stageForLevel(mon.level);
  let levelsGained = 0;
  mon.xp += amount;
  while (mon.level < MAX_LEVEL && mon.xp >= xpToNext(mon.level)) {
    mon.xp -= xpToNext(mon.level);
    mon.level += 1;
    levelsGained += 1;
  }
  if (mon.level >= MAX_LEVEL) mon.xp = Math.min(mon.xp, xpToNext(MAX_LEVEL) - 1);
  const afterStage = stageForLevel(mon.level);
  let evolvedTo = null;
  if (afterStage > beforeStage) {
    evolvedTo = afterStage;
    // レベルは相棒ごと＝進化した本人だけ ずかんに登録（途中段階の飛び級も埋める）
    for (let st = beforeStage + 1; st <= afterStage; st++) {
      const key = `${mon.id}-${st}`;
      if (!profile.dex.includes(key)) profile.dex.push(key);
    }
  }
  // たまご付与: アクティブが stage3 へ「新たに到達」した瞬間だけ（未所持あり＆卵なし）
  let eggArrived = false;
  const unowned = () => SPECIES.filter(sp => !p.owned.some(m => m.id === sp.id));
  if (beforeStage < 3 && afterStage === 3 && !p.egg && unowned().length > 0) {
    p.egg = { xp: 0 };
    eggArrived = true;
  }
  // 孵化ゲージ: 卵が「この加算の前から」あった場合のみ進む（届いた瞬間のXPは二重計上しない）
  let hatched = null;
  if (p.egg && !eggArrived) {
    p.egg.xp += amount;
    if (p.egg.xp >= EGG_HATCH_XP) {
      const pool = unowned();
      if (pool.length > 0) {
        const pick = pool[Math.floor(Math.random() * pool.length)];
        p.owned.push({ id: pick.id, level: 1, xp: 0 });
        const key = `${pick.id}-1`;
        if (!profile.dex.includes(key)) profile.dex.push(key);
        hatched = pick.id;
      }
      p.egg = null; // 5体そろっていたら消えるだけ（保険・通常は付与時点で止まる）
    }
  }
  return { levelsGained, evolvedTo, eggArrived, hatched };
}

export function partnerDisplayName(partner) {
  const mon = activeMon(partner);
  return mon ? monsterName(mon.id, stageForLevel(mon.level)) : "";
}

/* ===== コイン（P6フェーズ2）。★入手レートはここに集約★（設計書§4） =====
   コインは学習行動からのみ。時間配布・ログインボーナスは無し。
   ※ただし同じ実績は日をまたぐと再び払う（その日ごとの進歩ベース・実機FB第2便②）。
   1日の中では同じ実績から二度払われない（荒稼ぎ不可＝06-Cの狙い維持）が、毎日遊べば貯まる（反復学習の動機）。
   上限は設けない（上限は「もう終わり」の合図になり反復を止めるため。遊べる量そのものが自然な上限）。 */
export const COIN = {
  puzzleStar: 2,          // パズルで「新しく」得た★1つにつき
  quizCorrect: 1,         // クイズ1問正解（セッション精算）
  typingClear: 3, typingBest: 5, // タイピングクリア（自己ベスト更新は+5）
  artSave: 2, artDailyCap: 6,    // おえかき保存（1日の上限6枚＝乱発防止）
  battle: { easy: 5, normal: 8, hard: 12 }, // バトル勝利（難易度別）
  // つくるスタジオ: 作品ごとの付与ゼロ・初回マイルストーンのみ（量産で稼げない・設計§8）。初期値
  studio: { first: 15, works5: 20, works10: 30, firstNest: 15, firstCast3: 15 },
};

// コイン加算（負や0は無視）。返り値=実際に足した枚数
export function addCoins(profile, n) {
  if (n > 0) profile.coins = (profile.coins || 0) + n;
  return n > 0 ? n : 0;
}
/* 当日のコイン基準（実機FB第2便②）。日付が変わると作り直し＝当日ぶんだけ保持でセーブが膨らまない。
   既存セーブに coinDay が無くても初回アクセスでここが作る＝移行不要。
   quiz={セルkey:当日ベスト点} / puzzle={面id:当日ベスト★} / battle={敵id:true} / typing={段階id:{acc,kpm}} */
export function coinDay(profile, dateStr) {
  if (!profile.coinDay || profile.coinDay.date !== dateStr) {
    profile.coinDay = { date: dateStr, quiz: {}, puzzle: {}, battle: {}, typing: {} };
  }
  return profile.coinDay;
}
// おえかき保存のコイン（その日の上限内でのみ付与）。log[date].artCoins で当日分を管理
export function awardArtCoins(profile, dateStr) {
  const l = profile.log[dateStr] || (profile.log[dateStr] = {});
  const give = Math.min(COIN.artSave, Math.max(0, COIN.artDailyCap - (l.artCoins || 0)));
  l.artCoins = (l.artCoins || 0) + give;
  return addCoins(profile, give);
}

// 導入時の初回換算: 既存の実績からコインをまとめて付与（1プロファイル1回だけ）。
// 返り値=付与額（0なら「いままでのがんばり」演出は不要）。profile を直接書き換える。
export function grantLegacyCoins(profile) {
  if (profile.coinsGranted) return 0;
  const sum = o => Object.values(o || {}).reduce((a, b) => a + (b || 0), 0);
  let total = 0;
  total += sum(profile.puzzle && profile.puzzle.stars) * COIN.puzzleStar;
  total += Object.entries((profile.quiz && profile.quiz.best) || {})
    .filter(([k]) => k.includes(":")).reduce((a, [, v]) => a + (v || 0), 0) * COIN.quizCorrect;
  total += Object.keys((profile.typing && profile.typing.best) || {}).length * COIN.typingClear;
  total += (((profile.art && profile.art.gallery) || []).length) * COIN.artSave;
  // バトルは best[diff]（勝利数）×レート。06-Cで通常付与は「初撃破のみ」に変えたが、legacyは
  // 現状式を維持（ずかんbestベースへ寄せると growth.js→battle.js import が必要＝node直import不可の
  // 既知事故と同型になるため回避。coinsGranted ゲートで実プロファイルは基本再付与されず影響も小）。
  const best = (profile.battle && profile.battle.best) || {};
  for (const d of ["easy", "normal", "hard"]) total += (best[d] || 0) * COIN.battle[d];
  profile.coins = (profile.coins || 0) + total;
  profile.coinsGranted = true;
  return total;
}
