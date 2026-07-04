// パズルのブロック定義（v1から移植。島ごとの使えるブロックは islands.js の palette）
export const BLOCK_DEFS = {
  move: { emoji: "⬆️", label: "まえへ", color: "#6BCB77" },
  left: { emoji: "↩️", label: "ひだりを むく", color: "#7FC8F8" },
  right: { emoji: "↪️", label: "みぎを むく", color: "#7FC8F8" },
  repeat: { emoji: "🔁", label: "くりかえし", color: "#FFD447" },
  smartR: { emoji: "🧠", label: "かべ？→みぎ", color: "#9D7BD8" },
  smartL: { emoji: "🧠", label: "かべ？→ひだり", color: "#9D7BD8" },
};
