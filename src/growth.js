// 経験値・レベル・進化のルール
import { stageForLevel, monsterName } from "./data/monsters.js";

export const MAX_LEVEL = 30;

// あそびごとの もらえる経験値
export const XP = {
  puzzleWin: stars => 8 + 3 * stars,   // ★1=11 ★2=14 ★3=17
  quizSet: score => 4 + 2 * score,     // 5問全問正解で14
  artSave: () => 8,
  typing: () => 10,                     // P4で使用
};

// つぎのレベルまでに必要な経験値（レベルが上がるほど少しずつ増える）
// P6bでバトル勝利がXP源に加わったぶん、全域を約25%引き上げて進化(Lv5/Lv12)をゆっくりに
// （旧: 12+4*(level-1)。Lv5到達 72→90 XP／Lv12到達 352→440 XP＝ちょうど+25%）
export function xpToNext(level) { return 15 + 5 * (level - 1); }

/* profile.partner に経験値を加算し、レベルアップ・進化を処理する（profileを直接書き換える）。
   返り値: { levelsGained, evolvedTo } evolvedTo は進化した場合の新しいすがた番号 */
export function applyXp(profile, amount) {
  const p = profile.partner;
  if (!p) return { levelsGained: 0, evolvedTo: null };
  const beforeStage = stageForLevel(p.level);
  let levelsGained = 0;
  p.xp += amount;
  while (p.level < MAX_LEVEL && p.xp >= xpToNext(p.level)) {
    p.xp -= xpToNext(p.level);
    p.level += 1;
    levelsGained += 1;
  }
  if (p.level >= MAX_LEVEL) p.xp = Math.min(p.xp, xpToNext(MAX_LEVEL) - 1);
  const afterStage = stageForLevel(p.level);
  let evolvedTo = null;
  if (afterStage > beforeStage) {
    evolvedTo = afterStage;
    const key = `${p.species}-${afterStage}`;
    if (!profile.dex.includes(key)) profile.dex.push(key);
  }
  return { levelsGained, evolvedTo };
}

export function partnerDisplayName(partner) {
  return monsterName(partner.species, stageForLevel(partner.level));
}

/* ===== コイン（P6フェーズ2）。★入手レートはここに集約★（設計書§4） =====
   コインは学習行動からのみ。時間配布・ログインボーナスは無し。 */
export const COIN = {
  puzzleStar: 2,          // パズルで「新しく」得た★1つにつき
  quizCorrect: 1,         // クイズ1問正解（セッション精算）
  typingClear: 3, typingBest: 5, // タイピングクリア（自己ベスト更新は+5）
  artSave: 2, artDailyCap: 6,    // おえかき保存（1日の上限6枚＝乱発防止）
  battle: { easy: 5, normal: 8, hard: 12 }, // バトル勝利（難易度別）
};

// コイン加算（負や0は無視）。返り値=実際に足した枚数
export function addCoins(profile, n) {
  if (n > 0) profile.coins = (profile.coins || 0) + n;
  return n > 0 ? n : 0;
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
