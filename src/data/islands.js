// 6つの島（P2）。難易度はステージ側が持つ（easy/normal/hard）
// grade=対象学年の目安（教育カリキュラム帯A/B/C）。あくまで目安でロックはしない。
export const ISLANDS = {
  1: { name: "じゅんばんの しま", emoji: "🏝️", color: "#6BCB77", grade: "1〜2年生むけ",
    skill: "じゅんばんに めいれいする ちから",
    palette: ["move", "left", "right"],
    hint: "⬆️まえへ で すすんで、↩️↪️で むきを かえよう。ロボットの むいている ほうこうに ちゅうもく！" },
  2: { name: "くりかえしの しま", emoji: "🌀", color: "#7FC8F8", grade: "1〜2年生むけ",
    skill: "おなじことを くりかえす ちから",
    palette: ["move", "left", "right", "repeat"],
    hint: "おなじ ブロックが つづくときは 🔁くりかえしに いれると ブロックが へって ⭐が ふえるよ！" },
  3: { name: "もしもの しま", emoji: "⛰️", color: "#9D7BD8", grade: "1〜2年生むけ",
    skill: "「もしも」で かんがえる ちから",
    palette: ["move", "left", "right", "repeat", "smartR", "smartL"],
    hint: "🧠かべ？ブロックは「まえが かべなら まがる・かべじゃないなら すすむ」。🔁の なかに いれると かべに そって あるけるよ！" },
  4: { name: "くみあわせの しま", emoji: "🌈", color: "#FF9F43", grade: "3〜4年生むけ",
    skill: "🔁と🧠を くみあわせる ちから",
    palette: ["move", "left", "right", "repeat", "smartR", "smartL"],
    hint: "🔁の なかに 🧠を いれると さいきょう！ くみあわせを ためして みよう！" },
  5: { name: "あたまのたいそうの しま", emoji: "🧠", color: "#FF8FAB", grade: "3〜4年生むけ",
    skill: "みじかい プログラムを かんがえぬく ちから",
    palette: ["move", "left", "right", "repeat", "smartR", "smartL"],
    hint: "この しまの こたえは びっくりするほど みじかいよ。とおまわりに みえる みちが ちかみちかも！" },
  6: { name: "ちょうせんの しま", emoji: "🏰", color: "#8D6E63", grade: "5〜6年生むけ",
    skill: "おおきな めいろを ときあかす ちから",
    palette: ["move", "left", "right", "repeat"],
    hint: "おおきな めいろは こわくない！ みちを ちいさく わけて、🔁で まとめよう！" },
};

// 難易度は「色＋言葉」で見せる（メモ03）。★は評価（クリア成績）専用にして混同を避ける。
// 色: やさしい=緑（安心）/ ふつう=黄（中間）/ むずかしい=濃いオレンジ（挑戦。赤=失敗の色なので使わない）
// ※quizzes.js の QUIZ_DIFFS と同じ色（tools からの node 直import都合で相互importせず値を揃える）
export const DIFFICULTIES = [
  { id: "easy", label: "やさしい", short: "やさしい", color: "#6BCB77" },
  { id: "normal", label: "ふつう", short: "ふつう", color: "#FFD447" },
  { id: "hard", label: "むずかしい", short: "むずかしい", color: "#FF9F43" },
];
