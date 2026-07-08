// おえかきコードの定義（v1から移植・メモ08で拡張: 45°/ペン上下・2026-07-08）
export const ART_COLORS = ["#FF6B6B", "#FF9F43", "#FFD447", "#6BCB77", "#54A0FF", "#9D7BD8"];

// 旧作品互換: 既存ID（fwd/right/left/color）は変えず、新IDは追加のみ。
// fwd のラベルは「すすんで かく」→「すすむ」（描くかはペン状態に依存するため・B1）
export const ART_CMDS = {
  fwd: { emoji: "✏️", label: "すすむ" },
  right45: { emoji: "↗️", label: "みぎ45" },
  right: { emoji: "↪️", label: "みぎ90" },
  left45: { emoji: "↖️", label: "ひだり45" },
  left: { emoji: "↩️", label: "ひだり90" },
  color: { emoji: "🎨", label: "いろを かえる" },
  penup: { emoji: "🖐️", label: "ペンを あげる" },
  pendown: { emoji: "✍️", label: "ペンを おろす" },
};

export const ART_CHALLENGES = [
  { name: "しかくに ちょうせん", hint: "✏️→↪️ を 4かい ならべてみよう", emoji: "🟨" },
  { name: "かいだんに ちょうせん", hint: "✏️→↪️→✏️→↩️ を くりかえすと…？", emoji: "🪜" },
  { name: "にじいろの みち", hint: "🎨を はさむと いろが かわるよ", emoji: "🌈" },
  { name: "ギザギザやまに ちょうせん", hint: "↗️→✏️→↪️→✏️ で やまが ひとつ！ ↩️→✏️→↪️→✏️ と つづけると ギザギザに", emoji: "⛰️" },
];
