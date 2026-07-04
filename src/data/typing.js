// タイピングの出題データ（P4）。量産は チェックポイント承認後（今はサンプル）
// kotoba: 2〜4文字のことば（段階1） / tanbun: みじかい文（段階2） / bunshou: ながい文（段階3）
export const TYPING_STAGES = [
  { id: "kotoba", name: "ひらがな ことば", emoji: "🍎", desc: "2〜4もじの ことばを うとう", hint: "full" },
  { id: "tanbun", name: "みじかい ぶん", emoji: "📝", desc: "みじかい ぶんに ちょうせん", hint: "spell" },
  { id: "bunshou", name: "ながい ぶん", emoji: "📖", desc: "ヒントなしで うちきろう", hint: "none" },
];

export const WORDS_PER_SESSION = 5;

export const TYPING_WORDS = {
  // 段階1サンプル（チェックポイント用12語。ん・っ・ー・拗音・両式分岐を網羅）
  kotoba: [
    "ねこ", "いぬ", "うみ", "そら", "ほし", "ちず",
    "さかな", "りんご", "きって", "でんしゃ", "らーめん", "きんぎょ",
  ],
  tanbun: [],   // 承認後に量産
  bunshou: [],  // 承認後に量産
};
