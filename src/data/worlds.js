// ワールド定義とパズルのブロック定義（v1から移植）
export const WORLD_META = {
  1: { name: "じゅんばんの もり", emoji: "🌳", color: "#6BCB77", skill: "じゅんばんに めいれいする ちから" },
  2: { name: "くりかえしの うみ", emoji: "🌊", color: "#7FC8F8", skill: "おなじことを くりかえす ちから" },
  3: { name: "もしもの やま", emoji: "⛰️", color: "#9D7BD8", skill: "「もしも」で かんがえる ちから" },
};

export const BLOCK_DEFS = {
  move: { emoji: "⬆️", label: "まえへ", color: "#6BCB77" },
  left: { emoji: "↩️", label: "ひだりを むく", color: "#7FC8F8" },
  right: { emoji: "↪️", label: "みぎを むく", color: "#7FC8F8" },
  repeat: { emoji: "🔁", label: "くりかえし", color: "#FFD447" },
  smartR: { emoji: "🧠", label: "かべ？→みぎ", color: "#9D7BD8" },
  smartL: { emoji: "🧠", label: "かべ？→ひだり", color: "#9D7BD8" },
};

export const WORLD_PALETTE = {
  1: ["move", "left", "right"],
  2: ["move", "left", "right", "repeat"],
  3: ["move", "left", "right", "repeat", "smartR", "smartL"],
};

// パズルの世界ごとのヒント（v1から移植）
export const WORLD_HINTS = {
  1: "⬆️まえへ で すすんで、↩️↪️で むきを かえよう。ロボットの むいている ほうこうに ちゅうもく！",
  2: "おなじ ブロックが つづくときは 🔁くりかえしに いれると ブロックが へって ⭐が ふえるよ！",
  3: "🧠かべ？ブロックは「まえが かべなら まがる・かべじゃないなら すすむ」。🔁と くみあわせると さいきょう！",
};
