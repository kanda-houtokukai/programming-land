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
  // --- b4u 追加（3ステップ・easy 用） ---
  { id: "ocha", title: "おちゃを いれるよ", steps: ["🔥 おゆを わかす", "🍵 おちゃを いれる", "😋 のむ"] },
  { id: "shabon", title: "シャボンだまで あそぶよ", steps: ["🥤 えきを つける", "💨 ふーっと ふく", "✨ たくさん とんでいく"] },
  { id: "fusen", title: "ふうせんを ふくらませるよ", steps: ["💨 いきを ふきこむ", "🎈 おおきく する", "🤲 くちを しばる"] },
  { id: "yogurt", title: "ヨーグルトを たべるよ", steps: ["🫳 ふたを あける", "😋 たべる", "🗑️ カップを すてる"] },
  { id: "mizuyari", title: "はなに みずを あげるよ", steps: ["🚰 じょうろに みずを いれる", "💧 はなに かける", "🌼 はなが げんきに なる"] },
  { id: "ice", title: "アイスを たべるよ", steps: ["🛒 アイスを かう", "🫳 ふくろを あける", "😋 とけるまえに たべる"] },
  { id: "teruteru", title: "てるてるぼうずを つくるよ", steps: ["📄 かみを まるめる", "🖍️ かおを かく", "🧵 ひもで つるす"] },
  { id: "toast", title: "トーストを たべるよ", steps: ["🍞 パンを やく", "🍓 ジャムを ぬる", "😋 たべる"] },
  { id: "kingyo", title: "きんぎょに えさを あげるよ", steps: ["🫳 えさを つまむ", "🐟 すいそうに いれる", "😊 きんぎょが たべる"] },
  { id: "kutsuarai", title: "くつを あらうよ", steps: ["🧼 あわで ごしごし あらう", "💦 みずで ながす", "🌞 ほして かわかす"] },
  // --- b4u 追加（4〜5ステップ・normal / hard 用） ---
  { id: "sandwich", title: "サンドイッチを つくるよ", steps: ["🍞 パンを ならべる", "🥒 ぐを のせる", "🍞 パンで はさむ", "🔪 はんぶんに きる", "😋 たべる"] },
  { id: "pool", title: "プールで およぐよ", steps: ["👕 みずぎに きがえる", "🤸 じゅんびたいそうを する", "🏊 プールに はいる", "🧻 からだを ふく"] },
  { id: "chou", title: "ちょうちょが そだつよ", steps: ["🥚 たまごから うまれる", "🐛 あおむしに なる", "😴 さなぎに なる", "🦋 ちょうちょに なる"] },
  { id: "tegamitabi", title: "おくった てがみが とどくまで", steps: ["✏️ てがみを かく", "📮 ポストに いれる", "🚚 トラックが はこぶ", "🏠 あいての いえに とどく"] },
  { id: "bigtree", title: "おおきな きが そだつまで", steps: ["🌰 どんぐりを うえる", "🌱 めが でる", "🌿 わかい きに そだつ", "🌳 おおきな きに なる"] },
  { id: "harie", title: "はりえを つくって かざるよ", steps: ["✂️ かみを きる", "🧴 のりを つける", "📄 だいしに はる", "🖼️ かべに かざる"] },
  { id: "cycling", title: "じてんしゃで こうえんに いくよ", steps: ["⛑️ ヘルメットを かぶる", "🚲 じてんしゃに のる", "🏞️ こうえんに つく", "🔒 とめて かぎを かける"] },
  { id: "kakigori", title: "かきごおりを つくるよ", steps: ["🧊 こおりを けずる", "🍧 やまもりに する", "🍓 シロップを かける", "😋 たべる"] },
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
/* b4u 拡張の作法:
   - 人工物には made（「ひとが つくった」軸＋競合検出）。のりもの全部に carry。ようふく全部に wear。
   - 色/形（red/yellow/green/round/long/square）は「絵文字の見た目がはっきりしている物だけ」に付ける。
     曖昧な物（たこ=赤っぽい・りんご=丸っぽい・にじ=何色でもある 等）は無タグ＝色/形の問題に登場しない（group誤答方式）。
   - 「実は当てはまる」物には正直にタグを付けて誤答事故を防ぐ（うま/ぞう=carry・いす/ベッド=fourlegs 等）。
   - 動物に food を付けない（生きた動物の読み）は既存の書き起こし基準の慣例を踏襲（ぶた・ひよこも同様）。 */
export const NAKAMA_ITEMS = [
  // どうぶつ（むし・とり・さかなも「いきもの・どうぶつ」として同カテゴリ扱い）
  { e: "🐶", n: "いぬ", cat: "animal", props: ["living", "natural", "fourlegs"] },
  { e: "🐱", n: "ねこ", cat: "animal", props: ["living", "natural", "fourlegs"] },
  { e: "🐰", n: "うさぎ", cat: "animal", props: ["living", "natural", "fourlegs"] },
  { e: "🐘", n: "ぞう", cat: "animal", props: ["living", "natural", "fourlegs", "carry"] },
  { e: "🦁", n: "ライオン", cat: "animal", props: ["living", "natural", "fourlegs"] },
  { e: "🐮", n: "うし", cat: "animal", props: ["living", "natural", "fourlegs"] },
  { e: "🐴", n: "うま", cat: "animal", props: ["living", "natural", "fourlegs", "carry"] },
  { e: "🐷", n: "ぶた", cat: "animal", props: ["living", "natural", "fourlegs"] },
  { e: "🦒", n: "きりん", cat: "animal", props: ["living", "natural", "fourlegs"] },
  { e: "🐢", n: "かめ", cat: "animal", props: ["living", "natural", "fourlegs", "water", "green"] },
  { e: "🐸", n: "かえる", cat: "animal", props: ["living", "natural", "fourlegs", "water", "green"] },
  { e: "🐍", n: "へび", cat: "animal", props: ["living", "natural", "long"] },
  { e: "🐤", n: "ひよこ", cat: "animal", props: ["living", "natural", "yellow"] },
  { e: "🐦", n: "ことり", cat: "animal", props: ["living", "natural", "flies"] },
  { e: "🦋", n: "ちょう", cat: "animal", props: ["living", "natural", "flies"] },
  { e: "🐝", n: "はち", cat: "animal", props: ["living", "natural", "flies"] },
  { e: "🐟", n: "さかな", cat: "animal", props: ["living", "natural", "water"] },
  { e: "🐳", n: "くじら", cat: "animal", props: ["living", "natural", "water"] },
  { e: "🐙", n: "たこ", cat: "animal", props: ["living", "natural", "water"] },
  { e: "🐜", n: "あり", cat: "animal", props: ["living", "natural"] },
  // のりもの（全部 carry+made）
  { e: "🚗", n: "くるま", cat: "vehicle", props: ["carry", "made"] },
  { e: "🚌", n: "バス", cat: "vehicle", props: ["carry", "made"] },
  { e: "🚕", n: "タクシー", cat: "vehicle", props: ["carry", "made", "yellow"] },
  { e: "🚲", n: "じてんしゃ", cat: "vehicle", props: ["carry", "made"] },
  { e: "🚂", n: "きしゃ", cat: "vehicle", props: ["carry", "made"] },
  { e: "✈️", n: "ひこうき", cat: "vehicle", props: ["flies", "carry", "made"] },
  { e: "🚁", n: "ヘリコプター", cat: "vehicle", props: ["flies", "carry", "made"] },
  { e: "🚀", n: "ロケット", cat: "vehicle", props: ["flies", "carry", "made"] },
  { e: "⛵", n: "ふね", cat: "vehicle", props: ["water", "carry", "made"] },
  { e: "🚒", n: "しょうぼうしゃ", cat: "vehicle", props: ["red", "carry", "made"] },
  // くだもの・やさい・おかし（すべて food。あまいものに sweet）
  { e: "🍎", n: "りんご", cat: "fruit", props: ["food", "red", "sweet", "natural"] },
  { e: "🍌", n: "バナナ", cat: "fruit", props: ["food", "yellow", "sweet", "natural"] },
  { e: "🍇", n: "ぶどう", cat: "fruit", props: ["food", "sweet", "natural"] },
  { e: "🍓", n: "いちご", cat: "fruit", props: ["food", "red", "sweet", "natural"] },
  { e: "🍑", n: "もも", cat: "fruit", props: ["food", "sweet", "natural"] },
  { e: "🍉", n: "すいか", cat: "fruit", props: ["food", "sweet", "natural", "round"] },
  { e: "🍊", n: "みかん", cat: "fruit", props: ["food", "sweet", "natural", "round"] },
  { e: "🍒", n: "さくらんぼ", cat: "fruit", props: ["food", "sweet", "natural", "red", "round"] },
  { e: "🍈", n: "メロン", cat: "fruit", props: ["food", "sweet", "natural", "green", "round"] },
  { e: "🍋", n: "レモン", cat: "fruit", props: ["food", "natural", "yellow"] },
  { e: "🥕", n: "にんじん", cat: "vegetable", props: ["food", "natural", "underground", "long"] },
  { e: "🥒", n: "きゅうり", cat: "vegetable", props: ["food", "natural", "green", "long"] },
  { e: "🍅", n: "トマト", cat: "vegetable", props: ["food", "red", "natural", "round"] },
  { e: "🧅", n: "たまねぎ", cat: "vegetable", props: ["food", "natural", "underground"] },
  { e: "🥔", n: "じゃがいも", cat: "vegetable", props: ["food", "natural", "underground"] },
  { e: "🍠", n: "さつまいも", cat: "vegetable", props: ["food", "natural", "underground"] },
  { e: "🌽", n: "とうもろこし", cat: "vegetable", props: ["food", "natural", "yellow"] },
  { e: "🍰", n: "ケーキ", cat: "sweets", props: ["food", "sweet", "made"] },
  { e: "🍫", n: "チョコレート", cat: "sweets", props: ["food", "sweet", "made"] },
  { e: "🍬", n: "あめ", cat: "sweets", props: ["food", "sweet", "made"] },
  { e: "🍦", n: "アイスクリーム", cat: "sweets", props: ["food", "sweet", "made"] },
  { e: "🍩", n: "ドーナツ", cat: "sweets", props: ["food", "sweet", "made", "round"] },
  // ぶんぼうぐ・どうぐ
  { e: "✏️", n: "えんぴつ", cat: "stationery", props: ["draw", "made", "long"] },
  { e: "🖍️", n: "クレヨン", cat: "stationery", props: ["draw", "made"] },
  { e: "🖌️", n: "ふで", cat: "stationery", props: ["draw", "made", "long"] },
  { e: "🖊️", n: "ペン", cat: "stationery", props: ["draw", "made", "long"] },
  { e: "📏", n: "じょうぎ", cat: "stationery", props: ["made", "long"] },
  { e: "📓", n: "ノート", cat: "stationery", props: ["made", "square"] },
  { e: "📕", n: "ほん", cat: "stationery", props: ["made", "square"] },
  { e: "✂️", n: "はさみ", cat: "stationery", props: ["cut", "made"] },
  { e: "🔪", n: "ほうちょう", cat: "tool", props: ["cut", "made"] },
  { e: "🪚", n: "のこぎり", cat: "tool", props: ["cut", "made", "long"] },
  { e: "🔨", n: "かなづち", cat: "tool", props: ["made"] },
  { e: "🧹", n: "ほうき", cat: "tool", props: ["made", "long"] },
  // がっき
  { e: "🎹", n: "ピアノ", cat: "instrument", props: ["sound", "made"] },
  { e: "🎸", n: "ギター", cat: "instrument", props: ["sound", "made"] },
  { e: "🎻", n: "バイオリン", cat: "instrument", props: ["sound", "made"] },
  { e: "🥁", n: "たいこ", cat: "instrument", props: ["sound", "made"] },
  { e: "🎺", n: "ラッパ", cat: "instrument", props: ["sound", "made"] },
  { e: "🔔", n: "すず", cat: "instrument", props: ["sound", "made"] },
  // ようふく（全部 wear+made）
  { e: "👕", n: "シャツ", cat: "clothing", props: ["wear", "made"] },
  { e: "👖", n: "ズボン", cat: "clothing", props: ["wear", "made"] },
  { e: "👗", n: "ワンピース", cat: "clothing", props: ["wear", "made"] },
  { e: "👞", n: "くつ", cat: "clothing", props: ["wear", "made"] },
  { e: "🧦", n: "くつした", cat: "clothing", props: ["wear", "made"] },
  { e: "🧤", n: "てぶくろ", cat: "clothing", props: ["wear", "made"] },
  { e: "🧢", n: "ぼうし", cat: "clothing", props: ["wear", "made"] },
  // しょっき
  { e: "🥤", n: "コップ", cat: "tableware", props: ["made"] },
  { e: "🍽️", n: "おさら", cat: "tableware", props: ["made"] },
  { e: "🥄", n: "スプーン", cat: "tableware", props: ["made"] },
  { e: "🍴", n: "フォーク", cat: "tableware", props: ["made"] },
  { e: "🥢", n: "おはし", cat: "tableware", props: ["made", "long"] },
  // しぜん・しょくぶつ
  { e: "🌷", n: "チューリップ", cat: "flower", props: ["living", "natural"] },
  { e: "🌻", n: "ひまわり", cat: "flower", props: ["living", "natural", "yellow"] },
  { e: "🌹", n: "ばら", cat: "flower", props: ["living", "natural", "red"] },
  { e: "🌳", n: "き", cat: "flower", props: ["living", "natural", "green"] },
  { e: "⛰️", n: "やま", cat: "nature", props: ["natural"] },
  { e: "⭐", n: "ほし", cat: "nature", props: ["natural", "yellow"] },
  { e: "🌙", n: "つき", cat: "nature", props: ["natural", "yellow"] },
  { e: "🪨", n: "いし", cat: "nature", props: ["natural"] },
  { e: "🌈", n: "にじ", cat: "nature", props: ["natural"] },
  { e: "☁️", n: "くも", cat: "nature", props: ["natural"] },
  // いきものじゃない・たべられない 対比用
  { e: "🤖", n: "ロボット", cat: "toy", props: ["made"] },
  { e: "⚽", n: "ボール", cat: "toy", props: ["made", "round"] },
  { e: "🧸", n: "ぬいぐるみ", cat: "toy", props: ["made"] },
  { e: "🎲", n: "サイコロ", cat: "toy", props: ["made", "square"] },
  { e: "🎈", n: "ふうせん", cat: "toy", props: ["made", "red", "round"] },
  { e: "📺", n: "テレビ", cat: "furniture", props: ["made", "square"] },
  { e: "🪑", n: "いす", cat: "furniture", props: ["made", "fourlegs"] },
  { e: "🛏️", n: "ベッド", cat: "furniture", props: ["made", "fourlegs"] },
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
  // concrete（やさしい用・軸名称形式のみ・b4u）: 見た目の いろ・かたち。
  // ★いろ/かたち軸の鉄則: 絵文字は色/形が曖昧なものがある（たこ=赤っぽい・りんご=丸っぽい 等）。
  //   propは「色/形がはっきりした物だけ」に付け、誤答は group（color/shape）内の別propを持つ物だけから選ぶ
  //   （＝曖昧な無タグアイテムは色/形の問題に一切登場しない）。この誤答条件は quiz-criteria が機械検証する。
  red: { label: "あかい", type: "concrete", group: "color" },
  yellow: { label: "きいろい", type: "concrete", group: "color" },
  green: { label: "みどりいろの", type: "concrete", group: "color" },
  round: { label: "まるい", type: "concrete", group: "shape" },
  long: { label: "ほそながい", type: "concrete", group: "shape" },
  square: { label: "しかくい", type: "concrete", group: "shape" },
  // functional（ふつう用）: 同じカテゴリの中を性質で切る
  flies: { label: "そらを とぶ", type: "functional" },
  water: { label: "みずの なかで くらす（つかう）", qLabel: "みずの なかや うえに いる", type: "functional" },
  cut: { label: "ものを きる", type: "functional" },
  draw: { label: "かく・ぬる", qLabel: "かいたり ぬったり する", type: "functional" },
  sound: { label: "おとを ならす", type: "functional" },
  carry: { label: "ひとを のせて はこぶ", type: "functional" },
  fourlegs: { label: "あしが 4ほん ある", type: "functional" },
  wear: { label: "みに つける", type: "functional" },
  underground: { label: "つちの なかで そだつ", type: "functional" },
  // abstract（むずかしい用）: カテゴリをまたいで抽象概念で切る
  living: { label: "いきている", type: "abstract" },
  food: { label: "たべられる", type: "abstract" },
  natural: { label: "しぜんに ある（ひとが つくって いない）", qLabel: "しぜんに ある", type: "abstract" },
  made: { label: "ひとが つくった", type: "abstract" },
};

/* ================= きまり: 絵文字プール ================= */
export const KIMARI_POOLS = [
  ["🍎", "🍌", "🍇", "🍓"], ["🔴", "🔵", "🟡", "🟢"], ["🐶", "🐱", "🐰", "🐸"],
  ["⭐", "🌙", "☀️", "☁️"], ["🚗", "🚌", "🚲", "🚀"], ["🌷", "🌻", "🍀", "🌵"],
  ["⬜", "⬛", "🔶", "🔷"], ["🍓", "🍋", "🍈", "🫐"], ["😀", "😺", "🤖", "👻"],
  ["🎈", "🎁", "🎀", "🎉"],
  // b4u 追加（+10・プール内で見た目がはっきり区別できる組だけ）
  ["🍅", "🥕", "🌽", "🥦"], ["⚽", "🏀", "🎾", "🏈"], ["🐟", "🐙", "🦀", "🐬"],
  ["🚂", "🚁", "🚤", "🚜"], ["🎩", "👑", "🧢", "🎀"], ["🌲", "🌴", "🌵", "🍄"],
  ["🔑", "🔔", "⏰", "🔦"], ["🍩", "🍪", "🍰", "🍭"], ["🦋", "🐞", "🐌", "🐛"],
  ["🌊", "🔥", "⭐", "🌈"],
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
  // b4u 追加（+8。フローチャートは「よみとる」のが課題なので、手順の順序は図が正＝物理因果の縛りは不要）
  { title: "ねるまえの じゅんび", steps: ["🛁 おふろに はいる", "🥛 みずを のむ", "📖 えほんを よむ", "😴 ねる"] },
  { title: "ペットの おせわ", steps: ["🍖 えさを あげる", "💧 みずを かえる", "🧹 こやを そうじする", "🚶 さんぽに いく"] },
  { title: "としょかんの ひ", steps: ["🏫 としょかんに いく", "📚 ほんを えらぶ", "📖 しずかに よむ", "🏠 かりて かえる"] },
  { title: "おりょうりの おてつだい", steps: ["🧼 てを あらう", "🥕 やさいを あらう", "🔪 ちいさく きる", "🍽️ おさらに ならべる"] },
  { title: "あさの きょうしつ", steps: ["🎒 ランドセルを おく", "📓 しゅくだいを だす", "📖 あさどくしょを する", "🙋 あさのかいに でる"] },
  { title: "はたけの しごと", steps: ["🌰 たねを まく", "💧 みずを やる", "🌿 くさとりを する", "🥕 しゅうかくする"] },
  { title: "おふろそうじ", steps: ["🧴 せんざいを つける", "🧽 ごしごし こする", "💦 みずで ながす", "🛁 おゆを ためる"] },
  { title: "たなばたの かざり", steps: ["📄 たんざくを よういする", "✏️ ねがいごとを かく", "🎋 ささに かざる", "⭐ よぞらを みる"] },
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
  // b4u 追加（+8）
  { cond: "おもちゃが こわれた？", yes: "🔧 なおして もらう", no: "🧸 そのまま あそぶ" },
  { cond: "しゅくだいは おわった？", yes: "⚽ そとで あそぶ", no: "✏️ つづきを やる" },
  { cond: "バスが きた？", yes: "🚌 バスに のる", no: "🪑 ベンチで まつ" },
  { cond: "そらは はれている？", yes: "🧺 せんたくものを ほす", no: "🏠 へやの なかに ほす" },
  { cond: "たまごが ある？", yes: "🍳 たまごやきを つくる", no: "🍞 パンだけ たべる" },
  { cond: "そとが くらくなった？", yes: "🏠 いえに かえる", no: "⚽ もうすこし あそぶ" },
  { cond: "ゴミが おちている？", yes: "🗑️ ひろって すてる", no: "🚶 そのまま あるく" },
  { cond: "ともだちが ころんだ？", yes: "🤝 たすけおこす", no: "🏃 いっしょに はしる" },
];
export const LOOP_ACTS = [
  { noun: "ほし⭐", text: "⭐を かく" },
  { noun: "かね🔔", text: "🔔を ならす" },
  { noun: "はくしゅ👏", text: "👏 てを たたく" },
  { noun: "まる⭕", text: "⭕を かく" },
  { noun: "ジャンプ🦘", text: "🦘 ジャンプする" },
  // b4u 追加（+5）
  { noun: "たいこ🥁", text: "🥁を たたく" },
  { noun: "はた🚩", text: "🚩を ふる" },
  { noun: "ふうせん🎈", text: "🎈を ふくらませる" },
  { noun: "はな🌸", text: "🌸を かく" },
  { noun: "コイン🪙", text: "🪙を いれる" },
];
