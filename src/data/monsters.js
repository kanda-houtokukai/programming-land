// 相棒モンスター定義（3タイプ×3進化・すべてオリジナルデザイン）
// 進化: たまご(Lv1〜) → こども(Lv5〜) → せいちょう(Lv12〜)
export const EVOLVE_LEVELS = { 2: 5, 3: 12 }; // stage: 必要レベル

export const SPECIES = [
  {
    id: "moko", typeName: "もりタイプ", typeEmoji: "🌳", color: "#6BCB77", headBg: "#EAF8E7",
    stages: [
      { name: "タネモコ", desc: "つやつやの タネの あかちゃん" },
      { name: "モコ", desc: "はっぱの みみと しっぽが はえた" },
      { name: "モコノス", desc: "はっぱの マントを まとう もりの まもりがみ" },
    ],
  },
  {
    id: "shizuku", typeName: "うみタイプ", typeEmoji: "🌊", color: "#7FC8F8", headBg: "#E5F4FE",
    stages: [
      { name: "ポチャ", desc: "ぷるんと ひかる しずくの あかちゃん" },
      { name: "シズク", desc: "なみの とさかと ひれが はえた" },
      { name: "ウズマル", desc: "おおなみを まとう うみの まもりがみ" },
    ],
  },
  {
    id: "hoshi", typeName: "そらタイプ", typeEmoji: "⭐", color: "#9D7BD8", headBg: "#F0EAFB",
    stages: [
      { name: "チカ", desc: "ちかちか ひかる ほしの あかちゃん" },
      { name: "ホシマル", desc: "ほしの みみと つばさが はえた" },
      { name: "ソラオー", desc: "ながれぼしを まとう よぞらの まもりがみ" },
    ],
  },
];

export function speciesById(id) { return SPECIES.find(s => s.id === id); }

export function stageForLevel(level) {
  if (level >= EVOLVE_LEVELS[3]) return 3;
  if (level >= EVOLVE_LEVELS[2]) return 2;
  return 1;
}

// 進化段階ごとの表示スケール（共有・2026-07-12）。進化で「大きくなった」を見せる。
// 初期値＝実機調整。おうちの部屋（HomeRoom）とバトル（Battle.jsx PARTNER_BASE_W×これ）の両方で使用中（b4c）。
export const partnerStageScale = { 1: 1.0, 2: 1.2, 3: 1.45 };

export function monsterName(speciesId, stage) {
  const sp = speciesById(speciesId);
  return sp ? sp.stages[stage - 1].name : "";
}

// ずかんの全エントリ（3タイプ×3すがた）
export const DEX_ENTRIES = SPECIES.flatMap(sp =>
  [1, 2, 3].map(stage => ({ key: `${sp.id}-${stage}`, species: sp.id, stage }))
);
