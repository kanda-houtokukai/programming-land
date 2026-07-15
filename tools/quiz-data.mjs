/* クイズ生成の素材データ（P6e・クイズ改修）。
   ここが「人手で品質を保証する場所」＝quiz-書き起こし基準.md を適用する対象。
   じゅんばん: 厳密な因果チェーン（逆にすると物理的に不可能な手順のみ）
   なかまわけ: タグつきアイテム辞書（曖昧性は quiz-criteria の機械検証が全軸を照合）
   きまり・よみとり: 絵文字プール・フローチャート素材 */

/* ================= じゅんばん: 因果チェーン =================
   ルール（書き起こし基準§3準拠・全チェーンでセルフチェック済み）:
   - 隣り合う手順は「前をやらないと次が物理的に不可能」なものだけ
   - 家庭・文化で順序が変わる手順（体を洗う順・食べる順）は使わない
   - steps は「絵文字 ラベル」形式。len=3 が easy 用、len>=4 が normal/hard 用 */
export const CHAINS = [
  // --- 3ステップ（easy 用） ---
  { id: "banana", title: "バナナを たべるよ", steps: ["🍌 かわを むく", "😋 たべる", "🗑️ かわを すてる"] },
  { id: "tamago", title: "たまごやきを つくるよ", steps: ["🥚 たまごを わる", "🥣 かきまぜる", "🍳 やく"] },
  { id: "tegami", title: "おてがみを おくるよ", steps: ["✏️ てがみを かく", "✉️ ふうとうに いれる", "📮 ポストに だす"] },
  { id: "yukidaruma", title: "ゆきだるまを つくるよ", steps: ["⚪ ゆきを まるめる", "⛄ ふたつ かさねる", "😊 かおを つける"] },
  { id: "present", title: "プレゼントを あけるよ", steps: ["🎀 リボンを ほどく", "🎁 はこを あける", "🧸 なかみを だす"] },
  { id: "tosyokan", title: "としょかんの ほん", steps: ["📚 ほんを かりる", "📖 よむ", "🏫 としょかんに かえす"] },
  { id: "kega", title: "ころんで ひざを すりむいたよ", steps: ["💧 きずを あらう", "🩹 ばんそうこうを はる", "🏃 また あそぶ"] },
  { id: "kutsu", title: "おそとに いくよ", steps: ["🧦 くつしたを はく", "👟 くつを はく", "🚶 そとを あるく"] },
  { id: "suika", title: "スイカを たべるよ", steps: ["🔪 きって わける", "😋 たべる", "🗑️ かわを すてる"] },
  { id: "hamigaki", title: "はみがきを するよ", steps: ["🪥 はみがきこを つける", "✨ はを みがく", "💦 くちを ゆすぐ"] },
  { id: "kamihikouki", title: "かみひこうきで あそぶよ", steps: ["📄 かみを おる", "✈️ とばす", "🏃 ひろいに いく"] },
  { id: "juice", title: "ジュースを のむよ", steps: ["🫗 コップに そそぐ", "😋 のむ", "🫧 コップを あらう"] },
  { id: "okashi", title: "おかしを たべるよ", steps: ["🫳 ふくろを あける", "😋 たべる", "🗑️ ふくろを すてる"] },
  { id: "shashin", title: "しゃしんを かざるよ", steps: ["📷 しゃしんを とる", "🖨️ プリントする", "🖼️ かべに かざる"] },
  // --- 4〜5ステップ（normal / hard 用） ---
  { id: "asagao", title: "あさがおを そだてるよ", steps: ["🌱 たねを まく", "🌿 めが でる", "🌸 はなが さく", "🫘 たねが とれる"] },
  { id: "cupmen", title: "カップラーメンを つくるよ", steps: ["🔥 おゆを わかす", "🫗 おゆを そそぐ", "⏲️ 3ぷん まつ", "🍜 たべる"] },
  { id: "onigiri", title: "おにぎりを つくるよ", steps: ["🍚 ごはんを たく", "🍙 ぎゅっと にぎる", "🌿 のりを まく", "😋 たべる"] },
  { id: "sentaku", title: "せんたくを するよ", steps: ["🫧 せんたくきで あらう", "🌞 そとに ほす", "🧺 とりこむ", "👕 たたんで しまう"] },
  { id: "densha", title: "でんしゃに のるよ", steps: ["🎫 きっぷを かう", "🚪 かいさつを とおる", "🚃 でんしゃに のる", "🚉 えきで おりる"] },
  { id: "hotcake", title: "ホットケーキを つくるよ", steps: ["🥣 こなを まぜる", "🍳 フライパンで やく", "🍯 シロップを かける", "😋 たべる"] },
  { id: "tomato", title: "トマトを そだてるよ", steps: ["🌰 たねを まく", "🌱 めが でる", "🌼 はなが さく", "🍅 みが なる", "😋 たべる"] },
  { id: "curry", title: "カレーを つくるよ", steps: ["🔪 やさいを きる", "🍳 いためる", "💧 みずで にこむ", "🍛 ルーを いれる", "🍽️ おさらに もる"] },
  { id: "ehon", title: "えほんを かりて よむよ", steps: ["🏫 としょかんに いく", "🔍 よみたい ほんを さがす", "📚 かりる", "📖 いえで よむ", "🏫 かえす"] },
  { id: "ofuro", title: "おふろに はいるよ", steps: ["👕 ふくを ぬぐ", "🛁 おふろに はいる", "🧻 からだを ふく", "👚 パジャマを きる"] },
  { id: "tanemaki", title: "はたけで やさいを そだてるよ", steps: ["🌰 たねを まく", "💧 みずを やる", "🌿 そだつ", "🥕 しゅうかくする"] },
  { id: "obento", title: "ピクニックに いくよ", steps: ["🍙 おべんとうを つくる", "🎒 かばんに つめる", "🚶 こうえんに いく", "😋 たべる"] },
];

/* ================= なかまわけ: タグつきアイテム辞書 =================
   cat=基本カテゴリ（見た目で分かる）／props=性質タグ。
   ★曖昧性の担保: quiz-criteria が「全タグ軸」を照合し、どの軸で読んでも
   なかまはずれが変わらない組だけを採用する（りんご・トマト・いちご事故の機械防止）。
   甘い果物に sweet を付けてあるのは「あまいもの軸」との競合を検出させるため。 */
export const NAKAMA_ITEMS = [
  // どうぶつ（むし・とり・さかなも「いきもの・どうぶつ」として同カテゴリ扱い）
  { e: "🐶", n: "いぬ", cat: "animal", props: ["living", "natural"] },
  { e: "🐱", n: "ねこ", cat: "animal", props: ["living", "natural"] },
  { e: "🐰", n: "うさぎ", cat: "animal", props: ["living", "natural"] },
  { e: "🐘", n: "ぞう", cat: "animal", props: ["living", "natural"] },
  { e: "🦁", n: "ライオン", cat: "animal", props: ["living", "natural"] },
  { e: "🐮", n: "うし", cat: "animal", props: ["living", "natural"] },
  { e: "🐦", n: "ことり", cat: "animal", props: ["living", "natural", "flies"] },
  { e: "🦋", n: "ちょう", cat: "animal", props: ["living", "natural", "flies"] },
  { e: "🐝", n: "はち", cat: "animal", props: ["living", "natural", "flies"] },
  { e: "🐟", n: "さかな", cat: "animal", props: ["living", "natural", "water"] },
  { e: "🐳", n: "くじら", cat: "animal", props: ["living", "natural", "water"] },
  { e: "🐙", n: "たこ", cat: "animal", props: ["living", "natural", "water"] },
  { e: "🐜", n: "あり", cat: "animal", props: ["living", "natural"] },
  // のりもの
  { e: "🚗", n: "くるま", cat: "vehicle", props: [] },
  { e: "🚌", n: "バス", cat: "vehicle", props: [] },
  { e: "🚲", n: "じてんしゃ", cat: "vehicle", props: [] },
  { e: "🚂", n: "きしゃ", cat: "vehicle", props: [] },
  { e: "✈️", n: "ひこうき", cat: "vehicle", props: ["flies"] },
  { e: "🚁", n: "ヘリコプター", cat: "vehicle", props: ["flies"] },
  { e: "⛵", n: "ふね", cat: "vehicle", props: ["water"] },
  { e: "🚒", n: "しょうぼうしゃ", cat: "vehicle", props: ["red"] },
  // くだもの・やさい・おかし（すべて food。あまいものに sweet）
  { e: "🍎", n: "りんご", cat: "fruit", props: ["food", "red", "sweet", "natural"] },
  { e: "🍌", n: "バナナ", cat: "fruit", props: ["food", "yellow", "sweet", "natural"] },
  { e: "🍇", n: "ぶどう", cat: "fruit", props: ["food", "sweet", "natural"] },
  { e: "🍓", n: "いちご", cat: "fruit", props: ["food", "red", "sweet", "natural"] },
  { e: "🍑", n: "もも", cat: "fruit", props: ["food", "sweet", "natural"] },
  { e: "🍉", n: "すいか", cat: "fruit", props: ["food", "sweet", "natural"] },
  { e: "🥕", n: "にんじん", cat: "vegetable", props: ["food", "natural"] },
  { e: "🥒", n: "きゅうり", cat: "vegetable", props: ["food", "natural"] },
  { e: "🍅", n: "トマト", cat: "vegetable", props: ["food", "red", "natural"] },
  { e: "🧅", n: "たまねぎ", cat: "vegetable", props: ["food", "natural"] },
  { e: "🍰", n: "ケーキ", cat: "sweets", props: ["food", "sweet"] },
  { e: "🍫", n: "チョコレート", cat: "sweets", props: ["food", "sweet"] },
  { e: "🍬", n: "あめ", cat: "sweets", props: ["food", "sweet"] },
  { e: "🍦", n: "アイスクリーム", cat: "sweets", props: ["food", "sweet"] },
  // ぶんぼうぐ・どうぐ
  { e: "✏️", n: "えんぴつ", cat: "stationery", props: ["draw"] },
  { e: "🖍️", n: "クレヨン", cat: "stationery", props: ["draw"] },
  { e: "🖌️", n: "ふで", cat: "stationery", props: ["draw"] },
  { e: "📏", n: "じょうぎ", cat: "stationery", props: [] },
  { e: "📓", n: "ノート", cat: "stationery", props: [] },
  { e: "✂️", n: "はさみ", cat: "stationery", props: ["cut"] },
  { e: "🔪", n: "ほうちょう", cat: "tool", props: ["cut"] },
  { e: "🪚", n: "のこぎり", cat: "tool", props: ["cut"] },
  { e: "🔨", n: "かなづち", cat: "tool", props: [] },
  // がっき
  { e: "🎹", n: "ピアノ", cat: "instrument", props: ["sound"] },
  { e: "🎸", n: "ギター", cat: "instrument", props: ["sound"] },
  { e: "🥁", n: "たいこ", cat: "instrument", props: ["sound"] },
  { e: "🎺", n: "ラッパ", cat: "instrument", props: ["sound"] },
  { e: "🔔", n: "すず", cat: "instrument", props: ["sound"] },
  // ようふく
  { e: "👕", n: "シャツ", cat: "clothing", props: [] },
  { e: "👖", n: "ズボン", cat: "clothing", props: [] },
  { e: "🧦", n: "くつした", cat: "clothing", props: [] },
  { e: "🧤", n: "てぶくろ", cat: "clothing", props: [] },
  { e: "🧢", n: "ぼうし", cat: "clothing", props: [] },
  // しょっき
  { e: "🥤", n: "コップ", cat: "tableware", props: [] },
  { e: "🍽️", n: "おさら", cat: "tableware", props: [] },
  { e: "🥄", n: "スプーン", cat: "tableware", props: [] },
  // しぜん・しょくぶつ
  { e: "🌷", n: "チューリップ", cat: "flower", props: ["living", "natural"] },
  { e: "🌻", n: "ひまわり", cat: "flower", props: ["living", "natural", "yellow"] },
  { e: "🌳", n: "き", cat: "flower", props: ["living", "natural"] },
  { e: "⛰️", n: "やま", cat: "nature", props: ["natural"] },
  { e: "⭐", n: "ほし", cat: "nature", props: ["natural"] },
  { e: "🌙", n: "つき", cat: "nature", props: ["natural"] },
  { e: "🪨", n: "いし", cat: "nature", props: ["natural"] },
  // いきものじゃない・たべられない 対比用
  { e: "🤖", n: "ロボット", cat: "toy", props: [] },
  { e: "⚽", n: "ボール", cat: "toy", props: [] },
  { e: "🧸", n: "ぬいぐるみ", cat: "toy", props: [] },
  { e: "📺", n: "テレビ", cat: "furniture", props: [] },
  { e: "🪑", n: "いす", cat: "furniture", props: [] },
  { e: "🛏️", n: "ベッド", cat: "furniture", props: [] },
];

// 軸の日本語（why 文の生成に使う）
export const CAT_LABEL = {
  animal: "どうぶつ", vehicle: "のりもの", fruit: "くだもの", vegetable: "やさい",
  sweets: "おかし", stationery: "ぶんぼうぐ", tool: "どうぐ", instrument: "がっき",
  clothing: "ようふく", tableware: "しょっき", flower: "しょくぶつ", nature: "しぜんの もの",
  toy: "おもちゃ", furniture: "かぐ",
};
export const PROP_AXES = {
  // qLabel=出題文用の短い言い回し（軸名称形式「〇〇 なかまは どれ？」・b4t）。未指定の軸は label を使う。
  // label は why 文用＝不変。qLabel は「その軸を持つ全アイテムに対して真」であること（どれが正解に選ばれてもよいように）。
  // functional（ふつう用）: 同じカテゴリの中を性質で切る
  flies: { label: "そらを とぶ", type: "functional" },
  water: { label: "みずの なかで くらす（つかう）", qLabel: "みずの なかや うえに いる", type: "functional" },
  cut: { label: "ものを きる", type: "functional" },
  draw: { label: "かく・ぬる", qLabel: "かいたり ぬったり する", type: "functional" },
  sound: { label: "おとを ならす", type: "functional" },
  // abstract（むずかしい用）: カテゴリをまたいで抽象概念で切る
  living: { label: "いきている", type: "abstract" },
  food: { label: "たべられる", type: "abstract" },
  natural: { label: "しぜんに ある（ひとが つくって いない）", qLabel: "しぜんに ある", type: "abstract" },
};

/* ================= きまり: 絵文字プール ================= */
export const KIMARI_POOLS = [
  ["🍎", "🍌", "🍇", "🍓"], ["🔴", "🔵", "🟡", "🟢"], ["🐶", "🐱", "🐰", "🐸"],
  ["⭐", "🌙", "☀️", "☁️"], ["🚗", "🚌", "🚲", "🚀"], ["🌷", "🌻", "🍀", "🌵"],
  ["⬜", "⬛", "🔶", "🔷"], ["🍓", "🍋", "🍈", "🫐"], ["😀", "😺", "🤖", "👻"],
  ["🎈", "🎁", "🎀", "🎉"],
];

/* ================= よみとり: フローチャート素材 ================= */
export const FLOWS = [
  { title: "あさの したく", steps: ["🧼 かおを あらう", "🍞 あさごはんを たべる", "🦷 はを みがく", "🎒 じゅんびを する"] },
  { title: "カレーづくり", steps: ["🔪 やさいを きる", "🍳 いためる", "💧 みずを いれて にこむ", "🍛 ルーを いれる"] },
  { title: "おかいもの", steps: ["📝 メモを かく", "🚶 おみせに いく", "🛒 かごに いれる", "💰 おかねを はらう"] },
  { title: "せんたく", steps: ["👕 ふくを あつめる", "🫧 せんたくきを まわす", "🌞 ほす", "📦 たたんで しまう"] },
  { title: "キャンプ", steps: ["⛺ テントを はる", "🔥 ひを おこす", "🍖 ごはんを つくる", "🌙 ねる"] },
  { title: "おそうじ", steps: ["🧹 ほうきで はく", "🧽 ぞうきんで ふく", "🗑️ ごみを すてる", "🧼 てを あらう"] },
  { title: "たんじょうびかい", steps: ["🎈 かざりつけを する", "🎂 ケーキを だす", "🎵 うたを うたう", "🎁 プレゼントを あける"] },
  { title: "やさいの みずやり", steps: ["🚰 じょうろに みずを いれる", "🚶 はたけに いく", "💧 みずを かける", "🏠 じょうろを かたづける"] },
  { title: "おでかけの じゅんび", steps: ["🧢 ぼうしを かぶる", "🎒 リュックを せおう", "🚪 いえの かぎを しめる", "🚶 しゅっぱつ！"] },
];
export const BRANCHES = [
  { cond: "あめが ふっている？", yes: "☂️ かさを もっていく", no: "🧢 ぼうしを かぶる" },
  { cond: "しんごうが あか？", yes: "🛑 とまって まつ", no: "🚶 わたる" },
  { cond: "おなかが すいた？", yes: "🍙 おにぎりを たべる", no: "📚 ほんを よむ" },
  { cond: "へやが くらい？", yes: "💡 でんきを つける", no: "そのまま あそぶ" },
  { cond: "のどが かわいた？", yes: "🥤 みずを のむ", no: "⚽ あそびつづける" },
  { cond: "さむい？", yes: "🧥 うわぎを きる", no: "👕 そのままで いい" },
  { cond: "てが よごれている？", yes: "🧼 てを あらう", no: "🍞 そのまま たべる" },
  { cond: "ねつが ある？", yes: "🛏️ おうちで やすむ", no: "🏫 がっこうに いく" },
  { cond: "くつが ぬれている？", yes: "🌞 ほして かわかす", no: "👟 そのまま はく" },
];
export const LOOP_ACTS = [
  { noun: "ほし⭐", text: "⭐を かく" },
  { noun: "かね🔔", text: "🔔を ならす" },
  { noun: "はくしゅ👏", text: "👏 てを たたく" },
  { noun: "まる⭕", text: "⭕を かく" },
  { noun: "ジャンプ🦘", text: "🦘 ジャンプする" },
];
