// おえかきコードの定義（v1から移植）
export const ART_COLORS = ["#FF6B6B", "#FF9F43", "#FFD447", "#6BCB77", "#54A0FF", "#9D7BD8"];

export const ART_CMDS = {
  fwd: { emoji: "✏️", label: "すすんで かく" },
  right: { emoji: "↪️", label: "みぎへ まがる" },
  left: { emoji: "↩️", label: "ひだりへ まがる" },
  color: { emoji: "🎨", label: "いろを かえる" },
};

export const ART_CHALLENGES = [
  { name: "しかくに ちょうせん", hint: "✏️→↪️ を 4かい ならべてみよう", emoji: "🟨" },
  { name: "かいだんに ちょうせん", hint: "✏️→↪️→✏️→↩️ を くりかえすと…？", emoji: "🪜" },
  { name: "にじいろの みち", hint: "🎨を はさむと いろが かわるよ", emoji: "🌈" },
];
