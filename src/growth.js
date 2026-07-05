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
