// 6つの島（P2）。難易度はステージ側が持つ（easy/normal/hard）
export const ISLANDS = {
  1: { name: "じゅんばんの しま", emoji: "🏝️", color: "#6BCB77",
    skill: "じゅんばんに めいれいする ちから",
    palette: ["move", "left", "right"],
    hint: "⬆️まえへ で すすんで、↩️↪️で むきを かえよう。ロボットの むいている ほうこうに ちゅうもく！" },
  2: { name: "くりかえしの しま", emoji: "🌀", color: "#7FC8F8",
    skill: "おなじことを くりかえす ちから",
    palette: ["move", "left", "right", "repeat"],
    hint: "おなじ ブロックが つづくときは 🔁くりかえしに いれると ブロックが へって ⭐が ふえるよ！" },
  3: { name: "もしもの しま", emoji: "⛰️", color: "#9D7BD8",
    skill: "「もしも」で かんがえる ちから",
    palette: ["move", "left", "right", "repeat", "smartR", "smartL"],
    hint: "🧠かべ？ブロックは「まえが かべなら まがる・かべじゃないなら すすむ」。🔁の なかに いれると かべに そって あるけるよ！" },
  4: { name: "くみあわせの しま", emoji: "🌈", color: "#FF9F43",
    skill: "🔁と🧠を くみあわせる ちから",
    palette: ["move", "left", "right", "repeat", "smartR", "smartL"],
    hint: "🔁の なかに 🧠を いれると さいきょう！ くみあわせを ためして みよう！" },
  5: { name: "あたまのたいそうの しま", emoji: "🧠", color: "#FF8FAB",
    skill: "みじかい プログラムを かんがえぬく ちから",
    palette: ["move", "left", "right", "repeat", "smartR", "smartL"],
    hint: "この しまの こたえは びっくりするほど みじかいよ。とおまわりに みえる みちが ちかみちかも！" },
  6: { name: "ちょうせんの しま", emoji: "🏰", color: "#8D6E63",
    skill: "おおきな めいろを ときあかす ちから",
    palette: ["move", "left", "right", "repeat"],
    hint: "おおきな めいろは こわくない！ みちを ちいさく わけて、🔁で まとめよう！" },
};

export const DIFFICULTIES = [
  { id: "easy", label: "⭐ やさしい", short: "やさしい" },
  { id: "normal", label: "⭐⭐ ふつう", short: "ふつう" },
  { id: "hard", label: "⭐⭐⭐ むずかしい", short: "むずかしい" },
];
