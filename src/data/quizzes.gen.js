/* 自動生成クイズ（tools/quizgen.mjs --write・シード固定・P6e: 5カテゴリ全数メタ付き生成）。手で編集しない。
   素材データ（因果チェーン・タグ辞書）: tools/quiz-data.mjs ＝ 人手で品質保証する場所
   再生成: node tools/quizgen.mjs --write → npm run verify で全数検証（難易度タグ照合込み） */
export const GEN_QUIZZES = [
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "はみがきを するよ。さいしょに することは？",
  "opts": [
   "🪥 はみがきこを つける",
   "✨ はを みがく",
   "💦 くちを ゆすぐ"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🪥 はみがきこを つける → ✨ はを みがく → 💦 くちを ゆすぐ だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🪥 はみがきこを つける",
    "✨ はを みがく",
    "💦 くちを ゆすぐ"
   ],
   "chainId": "hamigaki"
  },
  "id": "junban-e-1"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "ころんで ひざを すりむいたよ。いちばん さいごに することは？",
  "opts": [
   "🏃 また あそぶ",
   "🩹 ばんそうこうを はる",
   "💧 きずを あらう"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 💧 きずを あらう → 🩹 ばんそうこうを はる → 🏃 また あそぶ だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "💧 きずを あらう",
    "🩹 ばんそうこうを はる",
    "🏃 また あそぶ"
   ],
   "chainId": "kega"
  },
  "id": "junban-e-2"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "かみひこうきで あそぶよ。さいしょに することは？",
  "opts": [
   "🏃 ひろいに いく",
   "✈️ とばす",
   "📄 かみを おる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 📄 かみを おる → ✈️ とばす → 🏃 ひろいに いく だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "📄 かみを おる",
    "✈️ とばす",
    "🏃 ひろいに いく"
   ],
   "chainId": "kamihikouki"
  },
  "id": "junban-e-3"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "しゃしんを かざるよ。いちばん さいごに することは？",
  "opts": [
   "📷 しゃしんを とる",
   "🖨️ プリントする",
   "🖼️ かべに かざる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 📷 しゃしんを とる → 🖨️ プリントする → 🖼️ かべに かざる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "📷 しゃしんを とる",
    "🖨️ プリントする",
    "🖼️ かべに かざる"
   ],
   "chainId": "shashin"
  },
  "id": "junban-e-4"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "ころんで ひざを すりむいたよ。さいしょに することは？",
  "opts": [
   "🩹 ばんそうこうを はる",
   "🏃 また あそぶ",
   "💧 きずを あらう"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 💧 きずを あらう → 🩹 ばんそうこうを はる → 🏃 また あそぶ だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "💧 きずを あらう",
    "🩹 ばんそうこうを はる",
    "🏃 また あそぶ"
   ],
   "chainId": "kega"
  },
  "id": "junban-e-5"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "たまごやきを つくるよ。さいしょに することは？",
  "opts": [
   "🥚 たまごを わる",
   "🍳 やく",
   "🥣 かきまぜる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🥚 たまごを わる → 🥣 かきまぜる → 🍳 やく だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🥚 たまごを わる",
    "🥣 かきまぜる",
    "🍳 やく"
   ],
   "chainId": "tamago"
  },
  "id": "junban-e-6"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "としょかんの ほん。いちばん さいごに することは？",
  "opts": [
   "🏫 としょかんに かえす",
   "📖 よむ",
   "📚 ほんを かりる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 📚 ほんを かりる → 📖 よむ → 🏫 としょかんに かえす だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "📚 ほんを かりる",
    "📖 よむ",
    "🏫 としょかんに かえす"
   ],
   "chainId": "tosyokan"
  },
  "id": "junban-e-7"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "おかしを たべるよ。いちばん さいごに することは？",
  "opts": [
   "😋 たべる",
   "🗑️ ふくろを すてる",
   "🫳 ふくろを あける"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🫳 ふくろを あける → 😋 たべる → 🗑️ ふくろを すてる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🫳 ふくろを あける",
    "😋 たべる",
    "🗑️ ふくろを すてる"
   ],
   "chainId": "okashi"
  },
  "id": "junban-e-8"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "スイカを たべるよ。さいしょに することは？",
  "opts": [
   "🔪 きって わける",
   "😋 たべる",
   "🗑️ かわを すてる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🔪 きって わける → 😋 たべる → 🗑️ かわを すてる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🔪 きって わける",
    "😋 たべる",
    "🗑️ かわを すてる"
   ],
   "chainId": "suika"
  },
  "id": "junban-e-9"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "プレゼントを あけるよ。いちばん さいごに することは？",
  "opts": [
   "🎀 リボンを ほどく",
   "🧸 なかみを だす",
   "🎁 はこを あける"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🎀 リボンを ほどく → 🎁 はこを あける → 🧸 なかみを だす だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🎀 リボンを ほどく",
    "🎁 はこを あける",
    "🧸 なかみを だす"
   ],
   "chainId": "present"
  },
  "id": "junban-e-10"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "たまごやきを つくるよ。いちばん さいごに することは？",
  "opts": [
   "🥚 たまごを わる",
   "🥣 かきまぜる",
   "🍳 やく"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🥚 たまごを わる → 🥣 かきまぜる → 🍳 やく だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🥚 たまごを わる",
    "🥣 かきまぜる",
    "🍳 やく"
   ],
   "chainId": "tamago"
  },
  "id": "junban-e-11"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "としょかんの ほん。さいしょに することは？",
  "opts": [
   "📚 ほんを かりる",
   "🏫 としょかんに かえす",
   "📖 よむ"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 📚 ほんを かりる → 📖 よむ → 🏫 としょかんに かえす だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "📚 ほんを かりる",
    "📖 よむ",
    "🏫 としょかんに かえす"
   ],
   "chainId": "tosyokan"
  },
  "id": "junban-e-12"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "ジュースを のむよ。いちばん さいごに することは？",
  "opts": [
   "🫧 コップを あらう",
   "🫗 コップに そそぐ",
   "😋 のむ"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🫗 コップに そそぐ → 😋 のむ → 🫧 コップを あらう だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🫗 コップに そそぐ",
    "😋 のむ",
    "🫧 コップを あらう"
   ],
   "chainId": "juice"
  },
  "id": "junban-e-13"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "おてがみを おくるよ。さいしょに することは？",
  "opts": [
   "✏️ てがみを かく",
   "✉️ ふうとうに いれる",
   "📮 ポストに だす"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは ✏️ てがみを かく → ✉️ ふうとうに いれる → 📮 ポストに だす だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "✏️ てがみを かく",
    "✉️ ふうとうに いれる",
    "📮 ポストに だす"
   ],
   "chainId": "tegami"
  },
  "id": "junban-e-14"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "しゃしんを かざるよ。さいしょに することは？",
  "opts": [
   "📷 しゃしんを とる",
   "🖼️ かべに かざる",
   "🖨️ プリントする"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 📷 しゃしんを とる → 🖨️ プリントする → 🖼️ かべに かざる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "📷 しゃしんを とる",
    "🖨️ プリントする",
    "🖼️ かべに かざる"
   ],
   "chainId": "shashin"
  },
  "id": "junban-e-15"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "スイカを たべるよ。いちばん さいごに することは？",
  "opts": [
   "🔪 きって わける",
   "😋 たべる",
   "🗑️ かわを すてる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🔪 きって わける → 😋 たべる → 🗑️ かわを すてる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🔪 きって わける",
    "😋 たべる",
    "🗑️ かわを すてる"
   ],
   "chainId": "suika"
  },
  "id": "junban-e-16"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "ゆきだるまを つくるよ。いちばん さいごに することは？",
  "opts": [
   "⛄ ふたつ かさねる",
   "😊 かおを つける",
   "⚪ ゆきを まるめる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは ⚪ ゆきを まるめる → ⛄ ふたつ かさねる → 😊 かおを つける だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "⚪ ゆきを まるめる",
    "⛄ ふたつ かさねる",
    "😊 かおを つける"
   ],
   "chainId": "yukidaruma"
  },
  "id": "junban-e-17"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "プレゼントを あけるよ。さいしょに することは？",
  "opts": [
   "🎀 リボンを ほどく",
   "🧸 なかみを だす",
   "🎁 はこを あける"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🎀 リボンを ほどく → 🎁 はこを あける → 🧸 なかみを だす だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🎀 リボンを ほどく",
    "🎁 はこを あける",
    "🧸 なかみを だす"
   ],
   "chainId": "present"
  },
  "id": "junban-e-18"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "おてがみを おくるよ。いちばん さいごに することは？",
  "opts": [
   "✉️ ふうとうに いれる",
   "📮 ポストに だす",
   "✏️ てがみを かく"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは ✏️ てがみを かく → ✉️ ふうとうに いれる → 📮 ポストに だす だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "✏️ てがみを かく",
    "✉️ ふうとうに いれる",
    "📮 ポストに だす"
   ],
   "chainId": "tegami"
  },
  "id": "junban-e-19"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "バナナを たべるよ。さいしょに することは？",
  "opts": [
   "🗑️ かわを すてる",
   "😋 たべる",
   "🍌 かわを むく"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🍌 かわを むく → 😋 たべる → 🗑️ かわを すてる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🍌 かわを むく",
    "😋 たべる",
    "🗑️ かわを すてる"
   ],
   "chainId": "banana"
  },
  "id": "junban-e-20"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "おそとに いくよ。さいしょに することは？",
  "opts": [
   "👟 くつを はく",
   "🧦 くつしたを はく",
   "🚶 そとを あるく"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🧦 くつしたを はく → 👟 くつを はく → 🚶 そとを あるく だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🧦 くつしたを はく",
    "👟 くつを はく",
    "🚶 そとを あるく"
   ],
   "chainId": "kutsu"
  },
  "id": "junban-e-21"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "はみがきを するよ。いちばん さいごに することは？",
  "opts": [
   "💦 くちを ゆすぐ",
   "🪥 はみがきこを つける",
   "✨ はを みがく"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🪥 はみがきこを つける → ✨ はを みがく → 💦 くちを ゆすぐ だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🪥 はみがきこを つける",
    "✨ はを みがく",
    "💦 くちを ゆすぐ"
   ],
   "chainId": "hamigaki"
  },
  "id": "junban-e-22"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "バナナを たべるよ。いちばん さいごに することは？",
  "opts": [
   "🗑️ かわを すてる",
   "🍌 かわを むく",
   "😋 たべる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🍌 かわを むく → 😋 たべる → 🗑️ かわを すてる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🍌 かわを むく",
    "😋 たべる",
    "🗑️ かわを すてる"
   ],
   "chainId": "banana"
  },
  "id": "junban-e-23"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "ゆきだるまを つくるよ。さいしょに することは？",
  "opts": [
   "😊 かおを つける",
   "⚪ ゆきを まるめる",
   "⛄ ふたつ かさねる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは ⚪ ゆきを まるめる → ⛄ ふたつ かさねる → 😊 かおを つける だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "⚪ ゆきを まるめる",
    "⛄ ふたつ かさねる",
    "😊 かおを つける"
   ],
   "chainId": "yukidaruma"
  },
  "id": "junban-e-24"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "あさがおを そだてるよ。さいしょに することは？",
  "opts": [
   "🌱 たねを まく",
   "🌸 はなが さく",
   "🫘 たねが とれる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🌱 たねを まく → 🌿 めが でる → 🌸 はなが さく → 🫘 たねが とれる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🌱 たねを まく",
    "🌿 めが でる",
    "🌸 はなが さく",
    "🫘 たねが とれる"
   ],
   "chainId": "asagao"
  },
  "id": "junban-n-1"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "せんたくを するよ。いちばん さいごに することは？",
  "opts": [
   "👕 たたんで しまう",
   "🧺 とりこむ",
   "🫧 せんたくきで あらう"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🫧 せんたくきで あらう → 🌞 そとに ほす → 🧺 とりこむ → 👕 たたんで しまう だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🫧 せんたくきで あらう",
    "🌞 そとに ほす",
    "🧺 とりこむ",
    "👕 たたんで しまう"
   ],
   "chainId": "sentaku"
  },
  "id": "junban-n-2"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "カップラーメンを つくるよ。さいしょに することは？",
  "opts": [
   "🔥 おゆを わかす",
   "🫗 おゆを そそぐ",
   "🍜 たべる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🔥 おゆを わかす → 🫗 おゆを そそぐ → ⏲️ 3ぷん まつ → 🍜 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🔥 おゆを わかす",
    "🫗 おゆを そそぐ",
    "⏲️ 3ぷん まつ",
    "🍜 たべる"
   ],
   "chainId": "cupmen"
  },
  "id": "junban-n-3"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "はたけで やさいを そだてるよ。いちばん さいごに することは？",
  "opts": [
   "🌰 たねを まく",
   "🥕 しゅうかくする",
   "💧 みずを やる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🌰 たねを まく → 💧 みずを やる → 🌿 そだつ → 🥕 しゅうかくする だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 そだつ",
    "🥕 しゅうかくする"
   ],
   "chainId": "tanemaki"
  },
  "id": "junban-n-4"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "えほんを かりて よむよ。さいしょに することは？",
  "opts": [
   "📖 いえで よむ",
   "🏫 としょかんに いく",
   "🔍 よみたい ほんを さがす"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🏫 としょかんに いく → 🔍 よみたい ほんを さがす → 📚 かりる → 📖 いえで よむ → 🏫 かえす だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🏫 としょかんに いく",
    "🔍 よみたい ほんを さがす",
    "📚 かりる",
    "📖 いえで よむ",
    "🏫 かえす"
   ],
   "chainId": "ehon"
  },
  "id": "junban-n-5"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "カップラーメンを つくるよ。いちばん さいごに することは？",
  "opts": [
   "🍜 たべる",
   "🔥 おゆを わかす",
   "🫗 おゆを そそぐ"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🔥 おゆを わかす → 🫗 おゆを そそぐ → ⏲️ 3ぷん まつ → 🍜 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🔥 おゆを わかす",
    "🫗 おゆを そそぐ",
    "⏲️ 3ぷん まつ",
    "🍜 たべる"
   ],
   "chainId": "cupmen"
  },
  "id": "junban-n-6"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "ホットケーキを つくるよ。さいしょに することは？",
  "opts": [
   "🥣 こなを まぜる",
   "🍯 シロップを かける",
   "😋 たべる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🥣 こなを まぜる → 🍳 フライパンで やく → 🍯 シロップを かける → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🥣 こなを まぜる",
    "🍳 フライパンで やく",
    "🍯 シロップを かける",
    "😋 たべる"
   ],
   "chainId": "hotcake"
  },
  "id": "junban-n-7"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "あさがおを そだてるよ。いちばん さいごに することは？",
  "opts": [
   "🌱 たねを まく",
   "🌸 はなが さく",
   "🫘 たねが とれる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🌱 たねを まく → 🌿 めが でる → 🌸 はなが さく → 🫘 たねが とれる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🌱 たねを まく",
    "🌿 めが でる",
    "🌸 はなが さく",
    "🫘 たねが とれる"
   ],
   "chainId": "asagao"
  },
  "id": "junban-n-8"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "せんたくを するよ。さいしょに することは？",
  "opts": [
   "🌞 そとに ほす",
   "👕 たたんで しまう",
   "🫧 せんたくきで あらう"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🫧 せんたくきで あらう → 🌞 そとに ほす → 🧺 とりこむ → 👕 たたんで しまう だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🫧 せんたくきで あらう",
    "🌞 そとに ほす",
    "🧺 とりこむ",
    "👕 たたんで しまう"
   ],
   "chainId": "sentaku"
  },
  "id": "junban-n-9"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "はたけで やさいを そだてるよ。いちばん さいごに することは？",
  "opts": [
   "🌿 そだつ",
   "💧 みずを やる",
   "🥕 しゅうかくする"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🌰 たねを まく → 💧 みずを やる → 🌿 そだつ → 🥕 しゅうかくする だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 そだつ",
    "🥕 しゅうかくする"
   ],
   "chainId": "tanemaki"
  },
  "id": "junban-n-10"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "でんしゃに のるよ。さいしょに することは？",
  "opts": [
   "🚃 でんしゃに のる",
   "🎫 きっぷを かう",
   "🚉 えきで おりる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🎫 きっぷを かう → 🚪 かいさつを とおる → 🚃 でんしゃに のる → 🚉 えきで おりる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🎫 きっぷを かう",
    "🚪 かいさつを とおる",
    "🚃 でんしゃに のる",
    "🚉 えきで おりる"
   ],
   "chainId": "densha"
  },
  "id": "junban-n-11"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "せんたくを するよ。いちばん さいごに することは？",
  "opts": [
   "👕 たたんで しまう",
   "🌞 そとに ほす",
   "🧺 とりこむ"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🫧 せんたくきで あらう → 🌞 そとに ほす → 🧺 とりこむ → 👕 たたんで しまう だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🫧 せんたくきで あらう",
    "🌞 そとに ほす",
    "🧺 とりこむ",
    "👕 たたんで しまう"
   ],
   "chainId": "sentaku"
  },
  "id": "junban-n-12"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "ホットケーキを つくるよ。さいしょに することは？",
  "opts": [
   "🍳 フライパンで やく",
   "🥣 こなを まぜる",
   "🍯 シロップを かける"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🥣 こなを まぜる → 🍳 フライパンで やく → 🍯 シロップを かける → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🥣 こなを まぜる",
    "🍳 フライパンで やく",
    "🍯 シロップを かける",
    "😋 たべる"
   ],
   "chainId": "hotcake"
  },
  "id": "junban-n-13"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おにぎりを つくるよ。いちばん さいごに することは？",
  "opts": [
   "😋 たべる",
   "🌿 のりを まく",
   "🍙 ぎゅっと にぎる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🍚 ごはんを たく → 🍙 ぎゅっと にぎる → 🌿 のりを まく → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🍚 ごはんを たく",
    "🍙 ぎゅっと にぎる",
    "🌿 のりを まく",
    "😋 たべる"
   ],
   "chainId": "onigiri"
  },
  "id": "junban-n-14"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "あさがおを そだてるよ。いちばん さいごに することは？",
  "opts": [
   "🫘 たねが とれる",
   "🌱 たねを まく",
   "🌿 めが でる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🌱 たねを まく → 🌿 めが でる → 🌸 はなが さく → 🫘 たねが とれる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🌱 たねを まく",
    "🌿 めが でる",
    "🌸 はなが さく",
    "🫘 たねが とれる"
   ],
   "chainId": "asagao"
  },
  "id": "junban-n-15"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "ホットケーキを つくるよ。さいしょに することは？",
  "opts": [
   "🍳 フライパンで やく",
   "🥣 こなを まぜる",
   "😋 たべる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🥣 こなを まぜる → 🍳 フライパンで やく → 🍯 シロップを かける → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🥣 こなを まぜる",
    "🍳 フライパンで やく",
    "🍯 シロップを かける",
    "😋 たべる"
   ],
   "chainId": "hotcake"
  },
  "id": "junban-n-16"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "えほんを かりて よむよ。いちばん さいごに することは？",
  "opts": [
   "🏫 としょかんに いく",
   "📚 かりる",
   "🏫 かえす"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🏫 としょかんに いく → 🔍 よみたい ほんを さがす → 📚 かりる → 📖 いえで よむ → 🏫 かえす だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🏫 としょかんに いく",
    "🔍 よみたい ほんを さがす",
    "📚 かりる",
    "📖 いえで よむ",
    "🏫 かえす"
   ],
   "chainId": "ehon"
  },
  "id": "junban-n-17"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "ピクニックに いくよ。いちばん さいごに することは？",
  "opts": [
   "🚶 こうえんに いく",
   "😋 たべる",
   "🍙 おべんとうを つくる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🍙 おべんとうを つくる → 🎒 かばんに つめる → 🚶 こうえんに いく → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🍙 おべんとうを つくる",
    "🎒 かばんに つめる",
    "🚶 こうえんに いく",
    "😋 たべる"
   ],
   "chainId": "obento"
  },
  "id": "junban-n-18"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "カップラーメンを つくるよ。さいしょに することは？",
  "opts": [
   "🫗 おゆを そそぐ",
   "⏲️ 3ぷん まつ",
   "🔥 おゆを わかす"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🔥 おゆを わかす → 🫗 おゆを そそぐ → ⏲️ 3ぷん まつ → 🍜 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🔥 おゆを わかす",
    "🫗 おゆを そそぐ",
    "⏲️ 3ぷん まつ",
    "🍜 たべる"
   ],
   "chainId": "cupmen"
  },
  "id": "junban-n-19"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "ピクニックに いくよ。いちばん さいごに することは？",
  "opts": [
   "🍙 おべんとうを つくる",
   "🎒 かばんに つめる",
   "😋 たべる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🍙 おべんとうを つくる → 🎒 かばんに つめる → 🚶 こうえんに いく → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🍙 おべんとうを つくる",
    "🎒 かばんに つめる",
    "🚶 こうえんに いく",
    "😋 たべる"
   ],
   "chainId": "obento"
  },
  "id": "junban-n-20"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "ピクニックに いくよ。さいしょに することは？",
  "opts": [
   "🍙 おべんとうを つくる",
   "🚶 こうえんに いく",
   "🎒 かばんに つめる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🍙 おべんとうを つくる → 🎒 かばんに つめる → 🚶 こうえんに いく → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🍙 おべんとうを つくる",
    "🎒 かばんに つめる",
    "🚶 こうえんに いく",
    "😋 たべる"
   ],
   "chainId": "obento"
  },
  "id": "junban-n-21"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "はたけで やさいを そだてるよ。さいしょに することは？",
  "opts": [
   "💧 みずを やる",
   "🌰 たねを まく",
   "🌿 そだつ"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🌰 たねを まく → 💧 みずを やる → 🌿 そだつ → 🥕 しゅうかくする だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 そだつ",
    "🥕 しゅうかくする"
   ],
   "chainId": "tanemaki"
  },
  "id": "junban-n-22"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "カップラーメンを つくるよ。いちばん さいごに することは？",
  "opts": [
   "⏲️ 3ぷん まつ",
   "🫗 おゆを そそぐ",
   "🍜 たべる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🔥 おゆを わかす → 🫗 おゆを そそぐ → ⏲️ 3ぷん まつ → 🍜 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🔥 おゆを わかす",
    "🫗 おゆを そそぐ",
    "⏲️ 3ぷん まつ",
    "🍜 たべる"
   ],
   "chainId": "cupmen"
  },
  "id": "junban-n-23"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "ホットケーキを つくるよ。いちばん さいごに することは？",
  "opts": [
   "😋 たべる",
   "🍳 フライパンで やく",
   "🥣 こなを まぜる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🥣 こなを まぜる → 🍳 フライパンで やく → 🍯 シロップを かける → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🥣 こなを まぜる",
    "🍳 フライパンで やく",
    "🍯 シロップを かける",
    "😋 たべる"
   ],
   "chainId": "hotcake"
  },
  "id": "junban-n-24"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "カップラーメンを つくるよ。\n① 🔥 おゆを わかす → ② ？ → ③ ⏲️ 3ぷん まつ → ④ 🍜 たべる\n②に はいるのは？",
  "opts": [
   "⏲️ 3ぷん まつ",
   "🔥 おゆを わかす",
   "🫗 おゆを そそぐ"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🔥 おゆを わかす → 🫗 おゆを そそぐ → ⏲️ 3ぷん まつ → 🍜 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 1,
   "steps": [
    "🔥 おゆを わかす",
    "🫗 おゆを そそぐ",
    "⏲️ 3ぷん まつ",
    "🍜 たべる"
   ],
   "chainId": "cupmen"
  },
  "id": "junban-h-1"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "えほんを かりて よむよ。「🔍 よみたい ほんを さがす」の まえに かならず することは？",
  "opts": [
   "🏫 としょかんに いく",
   "📖 いえで よむ",
   "🏫 かえす"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🏫 としょかんに いく → 🔍 よみたい ほんを さがす → 📚 かりる → 📖 いえで よむ → 🏫 かえす だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "🏫 としょかんに いく",
    "🔍 よみたい ほんを さがす",
    "📚 かりる",
    "📖 いえで よむ",
    "🏫 かえす"
   ],
   "chainId": "ehon"
  },
  "id": "junban-h-2"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "スイカを たべるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "🔪 きって わける → 🗑️ かわを すてる → 😋 たべる",
   "🔪 きって わける → 😋 たべる → 🗑️ かわを すてる",
   "😋 たべる → 🔪 きって わける → 🗑️ かわを すてる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🔪 きって わける → 😋 たべる → 🗑️ かわを すてる だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "🔪 きって わける",
    "😋 たべる",
    "🗑️ かわを すてる"
   ],
   "chainId": "suika"
  },
  "id": "junban-h-3"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "えほんを かりて よむよ。\n① 🏫 としょかんに いく → ② 🔍 よみたい ほんを さがす → ③ ？ → ④ 📖 いえで よむ → ⑤ 🏫 かえす\n③に はいるのは？",
  "opts": [
   "📚 かりる",
   "📖 いえで よむ",
   "🏫 としょかんに いく"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🏫 としょかんに いく → 🔍 よみたい ほんを さがす → 📚 かりる → 📖 いえで よむ → 🏫 かえす だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 2,
   "steps": [
    "🏫 としょかんに いく",
    "🔍 よみたい ほんを さがす",
    "📚 かりる",
    "📖 いえで よむ",
    "🏫 かえす"
   ],
   "chainId": "ehon"
  },
  "id": "junban-h-4"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "せんたくを するよ。「🌞 そとに ほす」の まえに かならず することは？",
  "opts": [
   "🧺 とりこむ",
   "🫧 せんたくきで あらう",
   "👕 たたんで しまう"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🫧 せんたくきで あらう → 🌞 そとに ほす → 🧺 とりこむ → 👕 たたんで しまう だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "🫧 せんたくきで あらう",
    "🌞 そとに ほす",
    "🧺 とりこむ",
    "👕 たたんで しまう"
   ],
   "chainId": "sentaku"
  },
  "id": "junban-h-5"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "としょかんの ほん。ただしい じゅんばんは どれ？",
  "opts": [
   "📚 ほんを かりる → 🏫 としょかんに かえす → 📖 よむ",
   "📖 よむ → 📚 ほんを かりる → 🏫 としょかんに かえす",
   "📚 ほんを かりる → 📖 よむ → 🏫 としょかんに かえす"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 📚 ほんを かりる → 📖 よむ → 🏫 としょかんに かえす だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "📚 ほんを かりる",
    "📖 よむ",
    "🏫 としょかんに かえす"
   ],
   "chainId": "tosyokan"
  },
  "id": "junban-h-6"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "カレーを つくるよ。\n① 🔪 やさいを きる → ② ？ → ③ 💧 みずで にこむ → ④ 🍛 ルーを いれる → ⑤ 🍽️ おさらに もる\n②に はいるのは？",
  "opts": [
   "🍳 いためる",
   "🍽️ おさらに もる",
   "🍛 ルーを いれる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🔪 やさいを きる → 🍳 いためる → 💧 みずで にこむ → 🍛 ルーを いれる → 🍽️ おさらに もる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 1,
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずで にこむ",
    "🍛 ルーを いれる",
    "🍽️ おさらに もる"
   ],
   "chainId": "curry"
  },
  "id": "junban-h-7"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "しゃしんを かざるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "🖨️ プリントする → 📷 しゃしんを とる → 🖼️ かべに かざる",
   "📷 しゃしんを とる → 🖨️ プリントする → 🖼️ かべに かざる",
   "📷 しゃしんを とる → 🖼️ かべに かざる → 🖨️ プリントする"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 📷 しゃしんを とる → 🖨️ プリントする → 🖼️ かべに かざる だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "📷 しゃしんを とる",
    "🖨️ プリントする",
    "🖼️ かべに かざる"
   ],
   "chainId": "shashin"
  },
  "id": "junban-h-8"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "あさがおを そだてるよ。\n① 🌱 たねを まく → ② 🌿 めが でる → ③ ？ → ④ 🫘 たねが とれる\n③に はいるのは？",
  "opts": [
   "🌱 たねを まく",
   "🌸 はなが さく",
   "🫘 たねが とれる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🌱 たねを まく → 🌿 めが でる → 🌸 はなが さく → 🫘 たねが とれる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 2,
   "steps": [
    "🌱 たねを まく",
    "🌿 めが でる",
    "🌸 はなが さく",
    "🫘 たねが とれる"
   ],
   "chainId": "asagao"
  },
  "id": "junban-h-9"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "えほんを かりて よむよ。「📚 かりる」の まえに かならず することは？",
  "opts": [
   "🏫 かえす",
   "🔍 よみたい ほんを さがす",
   "📖 いえで よむ"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🏫 としょかんに いく → 🔍 よみたい ほんを さがす → 📚 かりる → 📖 いえで よむ → 🏫 かえす だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 2,
   "steps": [
    "🏫 としょかんに いく",
    "🔍 よみたい ほんを さがす",
    "📚 かりる",
    "📖 いえで よむ",
    "🏫 かえす"
   ],
   "chainId": "ehon"
  },
  "id": "junban-h-10"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "えほんを かりて よむよ。\n① 🏫 としょかんに いく → ② 🔍 よみたい ほんを さがす → ③ 📚 かりる → ④ ？ → ⑤ 🏫 かえす\n④に はいるのは？",
  "opts": [
   "📖 いえで よむ",
   "🏫 かえす",
   "🔍 よみたい ほんを さがす"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🏫 としょかんに いく → 🔍 よみたい ほんを さがす → 📚 かりる → 📖 いえで よむ → 🏫 かえす だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 3,
   "steps": [
    "🏫 としょかんに いく",
    "🔍 よみたい ほんを さがす",
    "📚 かりる",
    "📖 いえで よむ",
    "🏫 かえす"
   ],
   "chainId": "ehon"
  },
  "id": "junban-h-11"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ジュースを のむよ。ただしい じゅんばんは どれ？",
  "opts": [
   "😋 のむ → 🫗 コップに そそぐ → 🫧 コップを あらう",
   "🫗 コップに そそぐ → 🫧 コップを あらう → 😋 のむ",
   "🫗 コップに そそぐ → 😋 のむ → 🫧 コップを あらう"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🫗 コップに そそぐ → 😋 のむ → 🫧 コップを あらう だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "🫗 コップに そそぐ",
    "😋 のむ",
    "🫧 コップを あらう"
   ],
   "chainId": "juice"
  },
  "id": "junban-h-12"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "カレーを つくるよ。\n① 🔪 やさいを きる → ② ？ → ③ 💧 みずで にこむ → ④ 🍛 ルーを いれる → ⑤ 🍽️ おさらに もる\n②に はいるのは？",
  "opts": [
   "🍳 いためる",
   "🔪 やさいを きる",
   "💧 みずで にこむ"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🔪 やさいを きる → 🍳 いためる → 💧 みずで にこむ → 🍛 ルーを いれる → 🍽️ おさらに もる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 1,
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずで にこむ",
    "🍛 ルーを いれる",
    "🍽️ おさらに もる"
   ],
   "chainId": "curry"
  },
  "id": "junban-h-13"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "カレーを つくるよ。「🍳 いためる」の まえに かならず することは？",
  "opts": [
   "💧 みずで にこむ",
   "🍽️ おさらに もる",
   "🔪 やさいを きる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🔪 やさいを きる → 🍳 いためる → 💧 みずで にこむ → 🍛 ルーを いれる → 🍽️ おさらに もる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずで にこむ",
    "🍛 ルーを いれる",
    "🍽️ おさらに もる"
   ],
   "chainId": "curry"
  },
  "id": "junban-h-14"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ゆきだるまを つくるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "⛄ ふたつ かさねる → ⚪ ゆきを まるめる → 😊 かおを つける",
   "⚪ ゆきを まるめる → ⛄ ふたつ かさねる → 😊 かおを つける",
   "⚪ ゆきを まるめる → 😊 かおを つける → ⛄ ふたつ かさねる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは ⚪ ゆきを まるめる → ⛄ ふたつ かさねる → 😊 かおを つける だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "⚪ ゆきを まるめる",
    "⛄ ふたつ かさねる",
    "😊 かおを つける"
   ],
   "chainId": "yukidaruma"
  },
  "id": "junban-h-15"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "せんたくを するよ。\n① 🫧 せんたくきで あらう → ② ？ → ③ 🧺 とりこむ → ④ 👕 たたんで しまう\n②に はいるのは？",
  "opts": [
   "🧺 とりこむ",
   "👕 たたんで しまう",
   "🌞 そとに ほす"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🫧 せんたくきで あらう → 🌞 そとに ほす → 🧺 とりこむ → 👕 たたんで しまう だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 1,
   "steps": [
    "🫧 せんたくきで あらう",
    "🌞 そとに ほす",
    "🧺 とりこむ",
    "👕 たたんで しまう"
   ],
   "chainId": "sentaku"
  },
  "id": "junban-h-16"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "でんしゃに のるよ。「🚪 かいさつを とおる」の まえに かならず することは？",
  "opts": [
   "🚉 えきで おりる",
   "🚃 でんしゃに のる",
   "🎫 きっぷを かう"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🎫 きっぷを かう → 🚪 かいさつを とおる → 🚃 でんしゃに のる → 🚉 えきで おりる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "🎫 きっぷを かう",
    "🚪 かいさつを とおる",
    "🚃 でんしゃに のる",
    "🚉 えきで おりる"
   ],
   "chainId": "densha"
  },
  "id": "junban-h-17"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "おてがみを おくるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "✉️ ふうとうに いれる → ✏️ てがみを かく → 📮 ポストに だす",
   "✏️ てがみを かく → 📮 ポストに だす → ✉️ ふうとうに いれる",
   "✏️ てがみを かく → ✉️ ふうとうに いれる → 📮 ポストに だす"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは ✏️ てがみを かく → ✉️ ふうとうに いれる → 📮 ポストに だす だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "✏️ てがみを かく",
    "✉️ ふうとうに いれる",
    "📮 ポストに だす"
   ],
   "chainId": "tegami"
  },
  "id": "junban-h-18"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "でんしゃに のるよ。\n① 🎫 きっぷを かう → ② 🚪 かいさつを とおる → ③ ？ → ④ 🚉 えきで おりる\n③に はいるのは？",
  "opts": [
   "🚉 えきで おりる",
   "🚪 かいさつを とおる",
   "🚃 でんしゃに のる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🎫 きっぷを かう → 🚪 かいさつを とおる → 🚃 でんしゃに のる → 🚉 えきで おりる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 2,
   "steps": [
    "🎫 きっぷを かう",
    "🚪 かいさつを とおる",
    "🚃 でんしゃに のる",
    "🚉 えきで おりる"
   ],
   "chainId": "densha"
  },
  "id": "junban-h-19"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "カレーを つくるよ。「🍳 いためる」の まえに かならず することは？",
  "opts": [
   "🍛 ルーを いれる",
   "🔪 やさいを きる",
   "🍽️ おさらに もる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🔪 やさいを きる → 🍳 いためる → 💧 みずで にこむ → 🍛 ルーを いれる → 🍽️ おさらに もる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずで にこむ",
    "🍛 ルーを いれる",
    "🍽️ おさらに もる"
   ],
   "chainId": "curry"
  },
  "id": "junban-h-20"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ホットケーキを つくるよ。\n① 🥣 こなを まぜる → ② ？ → ③ 🍯 シロップを かける → ④ 😋 たべる\n②に はいるのは？",
  "opts": [
   "🍳 フライパンで やく",
   "🥣 こなを まぜる",
   "🍯 シロップを かける"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🥣 こなを まぜる → 🍳 フライパンで やく → 🍯 シロップを かける → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 1,
   "steps": [
    "🥣 こなを まぜる",
    "🍳 フライパンで やく",
    "🍯 シロップを かける",
    "😋 たべる"
   ],
   "chainId": "hotcake"
  },
  "id": "junban-h-21"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "かみひこうきで あそぶよ。ただしい じゅんばんは どれ？",
  "opts": [
   "✈️ とばす → 📄 かみを おる → 🏃 ひろいに いく",
   "📄 かみを おる → 🏃 ひろいに いく → ✈️ とばす",
   "📄 かみを おる → ✈️ とばす → 🏃 ひろいに いく"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 📄 かみを おる → ✈️ とばす → 🏃 ひろいに いく だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "📄 かみを おる",
    "✈️ とばす",
    "🏃 ひろいに いく"
   ],
   "chainId": "kamihikouki"
  },
  "id": "junban-h-22"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "カップラーメンを つくるよ。\n① 🔥 おゆを わかす → ② 🫗 おゆを そそぐ → ③ ？ → ④ 🍜 たべる\n③に はいるのは？",
  "opts": [
   "⏲️ 3ぷん まつ",
   "🔥 おゆを わかす",
   "🍜 たべる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🔥 おゆを わかす → 🫗 おゆを そそぐ → ⏲️ 3ぷん まつ → 🍜 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 2,
   "steps": [
    "🔥 おゆを わかす",
    "🫗 おゆを そそぐ",
    "⏲️ 3ぷん まつ",
    "🍜 たべる"
   ],
   "chainId": "cupmen"
  },
  "id": "junban-h-23"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "あさがおを そだてるよ。「🌿 めが でる」の まえに かならず することは？",
  "opts": [
   "🌸 はなが さく",
   "🫘 たねが とれる",
   "🌱 たねを まく"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🌱 たねを まく → 🌿 めが でる → 🌸 はなが さく → 🫘 たねが とれる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "🌱 たねを まく",
    "🌿 めが でる",
    "🌸 はなが さく",
    "🫘 たねが とれる"
   ],
   "chainId": "asagao"
  },
  "id": "junban-h-24"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🐱 🐸 🐱 🐸 ❓",
  "opts": [
   "🐰",
   "🐱",
   "🐶"
  ],
  "a": 1,
  "why": "🐱・🐸 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐱",
    "🐸",
    "🐱",
    "🐸"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-1"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🌻 🌵 🌻 🌵 ❓",
  "opts": [
   "🌵",
   "🍀",
   "🌻"
  ],
  "a": 2,
  "why": "🌻・🌵 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌻",
    "🌵",
    "🌻",
    "🌵"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-2"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🐰 🐱 🐰 🐱 ❓",
  "opts": [
   "🐰",
   "🐱",
   "🐶"
  ],
  "a": 0,
  "why": "🐰・🐱 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐰",
    "🐱",
    "🐰",
    "🐱"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-3"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🍀 🌻 🍀 🌻 🍀 ❓",
  "opts": [
   "🌷",
   "🍀",
   "🌻"
  ],
  "a": 2,
  "why": "🍀・🌻 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍀",
    "🌻",
    "🍀",
    "🌻",
    "🍀"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-4"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🚀 🚌 🚀 🚌 🚀 ❓",
  "opts": [
   "🚗",
   "🚀",
   "🚌"
  ],
  "a": 2,
  "why": "🚀・🚌 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚀",
    "🚌",
    "🚀",
    "🚌",
    "🚀"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-5"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🍀 🌵 🍀 🌵 🍀 ❓",
  "opts": [
   "🌵",
   "🌷",
   "🌻"
  ],
  "a": 0,
  "why": "🍀・🌵 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍀",
    "🌵",
    "🍀",
    "🌵",
    "🍀"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-6"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🐰 🐸 🐰 🐸 ❓",
  "opts": [
   "🐰",
   "🐶",
   "🐸"
  ],
  "a": 0,
  "why": "🐰・🐸 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐰",
    "🐸",
    "🐰",
    "🐸"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-7"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🐱 🐰 🐱 🐰 🐱 ❓",
  "opts": [
   "🐱",
   "🐰",
   "🐸"
  ],
  "a": 1,
  "why": "🐱・🐰 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐱",
    "🐰",
    "🐱",
    "🐰",
    "🐱"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-8"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🎉 🎁 🎉 🎁 🎉 ❓",
  "opts": [
   "🎈",
   "🎀",
   "🎁"
  ],
  "a": 2,
  "why": "🎉・🎁 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🎉",
    "🎁",
    "🎉",
    "🎁",
    "🎉"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-9"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🍇 🍓 🍇 🍓 ❓",
  "opts": [
   "🍓",
   "🍎",
   "🍇"
  ],
  "a": 2,
  "why": "🍇・🍓 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍇",
    "🍓",
    "🍇",
    "🍓"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-10"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n☁️ 🌙 ☁️ 🌙 ☁️ ❓",
  "opts": [
   "⭐",
   "🌙",
   "☀️"
  ],
  "a": 1,
  "why": "☁️・🌙 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "☁️",
    "🌙",
    "☁️",
    "🌙",
    "☁️"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-11"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🔵 🔴 🔵 🔴 🔵 ❓",
  "opts": [
   "🔴",
   "🔵",
   "🟢"
  ],
  "a": 0,
  "why": "🔵・🔴 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔵",
    "🔴",
    "🔵",
    "🔴",
    "🔵"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-12"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🍓 🍋 🍓 🍋 🍓 ❓",
  "opts": [
   "🍋",
   "🫐",
   "🍈"
  ],
  "a": 0,
  "why": "🍓・🍋 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍓",
    "🍋",
    "🍓",
    "🍋",
    "🍓"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-13"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n👻 🤖 👻 🤖 👻 ❓",
  "opts": [
   "😺",
   "😀",
   "🤖"
  ],
  "a": 2,
  "why": "👻・🤖 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "👻",
    "🤖",
    "👻",
    "🤖",
    "👻"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-14"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🍈 🍓 🍈 🍓 ❓",
  "opts": [
   "🍋",
   "🍈",
   "🫐"
  ],
  "a": 1,
  "why": "🍈・🍓 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍈",
    "🍓",
    "🍈",
    "🍓"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-15"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🔶 ⬜ 🔶 ⬜ 🔶 ❓",
  "opts": [
   "⬜",
   "🔶",
   "⬛"
  ],
  "a": 0,
  "why": "🔶・⬜ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔶",
    "⬜",
    "🔶",
    "⬜",
    "🔶"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-16"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n😀 😺 😀 😺 ❓",
  "opts": [
   "🤖",
   "😺",
   "😀"
  ],
  "a": 2,
  "why": "😀・😺 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "😀",
    "😺",
    "😀",
    "😺"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-17"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n⭐ ☀️ ⭐ ☀️ ⭐ ❓",
  "opts": [
   "☁️",
   "⭐",
   "☀️"
  ],
  "a": 2,
  "why": "⭐・☀️ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⭐",
    "☀️",
    "⭐",
    "☀️",
    "⭐"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-18"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🫐 🍋 🫐 🍋 ❓",
  "opts": [
   "🍋",
   "🍈",
   "🫐"
  ],
  "a": 2,
  "why": "🫐・🍋 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🫐",
    "🍋",
    "🫐",
    "🍋"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-19"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🚀 🚗 🚀 🚗 🚀 ❓",
  "opts": [
   "🚌",
   "🚲",
   "🚗"
  ],
  "a": 2,
  "why": "🚀・🚗 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚀",
    "🚗",
    "🚀",
    "🚗",
    "🚀"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-20"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n⭐ ☀️ ⭐ ☀️ ❓",
  "opts": [
   "☀️",
   "⭐",
   "☁️"
  ],
  "a": 1,
  "why": "⭐・☀️ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⭐",
    "☀️",
    "⭐",
    "☀️"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-21"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n☁️ ⭐ ☁️ ⭐ ❓",
  "opts": [
   "☁️",
   "🌙",
   "⭐"
  ],
  "a": 0,
  "why": "☁️・⭐ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "☁️",
    "⭐",
    "☁️",
    "⭐"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-22"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n⭐ ☁️ ⭐ ☁️ ❓",
  "opts": [
   "☀️",
   "🌙",
   "⭐"
  ],
  "a": 2,
  "why": "⭐・☁️ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⭐",
    "☁️",
    "⭐",
    "☁️"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-23"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🚗 🚲 🚗 🚲 🚗 ❓",
  "opts": [
   "🚲",
   "🚌",
   "🚀"
  ],
  "a": 0,
  "why": "🚗・🚲 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚗",
    "🚲",
    "🚗",
    "🚲",
    "🚗"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-24"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🐶 🐱 🐶 🐱 🐶 ❓",
  "opts": [
   "🐰",
   "🐱",
   "🐸"
  ],
  "a": 1,
  "why": "🐶・🐱 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐶",
    "🐱",
    "🐶",
    "🐱",
    "🐶"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-25"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n👻 🤖 👻 🤖 ❓",
  "opts": [
   "🤖",
   "👻",
   "😺"
  ],
  "a": 1,
  "why": "👻・🤖 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "👻",
    "🤖",
    "👻",
    "🤖"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-26"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n😺 😺 🤖 🤖 😺 😺 🤖 🤖 😺 ❓",
  "opts": [
   "😀",
   "👻",
   "😺"
  ],
  "a": 2,
  "why": "😺・😺・🤖・🤖 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "😺",
    "😺",
    "🤖",
    "🤖",
    "😺",
    "😺",
    "🤖",
    "🤖",
    "😺"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-1"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n☁️ ☁️ ☀️ ☀️ ☁️ ☁️ ☀️ ☀️ ☁️ ☁️ ☀️ ❓",
  "opts": [
   "🌙",
   "☀️",
   "☁️"
  ],
  "a": 1,
  "why": "☁️・☁️・☀️・☀️ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "☁️",
    "☁️",
    "☀️",
    "☀️",
    "☁️",
    "☁️",
    "☀️",
    "☀️",
    "☁️",
    "☁️",
    "☀️"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-2"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍓 🍈 🍋 🍓 🍈 🍋 🍓 🍈 ❓",
  "opts": [
   "🍈",
   "🍋",
   "🍓"
  ],
  "a": 1,
  "why": "🍓・🍈・🍋 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍓",
    "🍈",
    "🍋",
    "🍓",
    "🍈",
    "🍋",
    "🍓",
    "🍈"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-3"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🎁 🎁 🎉 🎉 🎁 🎁 🎉 🎉 🎁 ❓",
  "opts": [
   "🎁",
   "🎈",
   "🎉"
  ],
  "a": 0,
  "why": "🎁・🎁・🎉・🎉 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🎁",
    "🎁",
    "🎉",
    "🎉",
    "🎁",
    "🎁",
    "🎉",
    "🎉",
    "🎁"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-4"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🐰 🐰 🐱 🐰 🐰 🐱 🐰 🐰 ❓",
  "opts": [
   "🐸",
   "🐶",
   "🐱"
  ],
  "a": 2,
  "why": "🐰・🐰・🐱 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐰",
    "🐰",
    "🐱",
    "🐰",
    "🐰",
    "🐱",
    "🐰",
    "🐰"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-5"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n😺 😺 😀 😀 😺 😺 😀 😀 😺 😺 😀 ❓",
  "opts": [
   "😀",
   "👻",
   "🤖"
  ],
  "a": 0,
  "why": "😺・😺・😀・😀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "😺",
    "😺",
    "😀",
    "😀",
    "😺",
    "😺",
    "😀",
    "😀",
    "😺",
    "😺",
    "😀"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-6"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍈 🍋 🍋 🍈 🍋 🍋 🍈 ❓",
  "opts": [
   "🍋",
   "🍈",
   "🍓"
  ],
  "a": 0,
  "why": "🍈・🍋・🍋 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍈",
    "🍋",
    "🍋",
    "🍈",
    "🍋",
    "🍋",
    "🍈"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-7"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍌 🍌 🍇 🍇 🍌 🍌 🍇 🍇 🍌 🍌 🍇 ❓",
  "opts": [
   "🍇",
   "🍎",
   "🍓"
  ],
  "a": 0,
  "why": "🍌・🍌・🍇・🍇 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍌",
    "🍌",
    "🍇",
    "🍇",
    "🍌",
    "🍌",
    "🍇",
    "🍇",
    "🍌",
    "🍌",
    "🍇"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-8"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍌 🍓 🍓 🍌 🍓 🍓 🍌 🍓 ❓",
  "opts": [
   "🍎",
   "🍇",
   "🍓"
  ],
  "a": 2,
  "why": "🍌・🍓・🍓 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍌",
    "🍓",
    "🍓",
    "🍌",
    "🍓",
    "🍓",
    "🍌",
    "🍓"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-9"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🎁 🎉 🎈 🎁 🎉 🎈 🎁 🎉 ❓",
  "opts": [
   "🎉",
   "🎀",
   "🎈"
  ],
  "a": 2,
  "why": "🎁・🎉・🎈 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🎁",
    "🎉",
    "🎈",
    "🎁",
    "🎉",
    "🎈",
    "🎁",
    "🎉"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-10"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🌷 🌵 🌻 🌷 🌵 🌻 🌷 ❓",
  "opts": [
   "🌵",
   "🍀",
   "🌻"
  ],
  "a": 0,
  "why": "🌷・🌵・🌻 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌷",
    "🌵",
    "🌻",
    "🌷",
    "🌵",
    "🌻",
    "🌷"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-11"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍓 🫐 🍈 🍓 🫐 🍈 🍓 🫐 ❓",
  "opts": [
   "🍈",
   "🫐",
   "🍓"
  ],
  "a": 0,
  "why": "🍓・🫐・🍈 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍓",
    "🫐",
    "🍈",
    "🍓",
    "🫐",
    "🍈",
    "🍓",
    "🫐"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-12"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n⬜ 🔶 🔶 ⬜ 🔶 🔶 ⬜ ❓",
  "opts": [
   "🔶",
   "⬜",
   "🔷"
  ],
  "a": 0,
  "why": "⬜・🔶・🔶 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⬜",
    "🔶",
    "🔶",
    "⬜",
    "🔶",
    "🔶",
    "⬜"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-13"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🚌 🚌 🚲 🚲 🚌 🚌 🚲 🚲 🚌 🚌 🚲 ❓",
  "opts": [
   "🚌",
   "🚗",
   "🚲"
  ],
  "a": 2,
  "why": "🚌・🚌・🚲・🚲 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚌",
    "🚌",
    "🚲",
    "🚲",
    "🚌",
    "🚌",
    "🚲",
    "🚲",
    "🚌",
    "🚌",
    "🚲"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-14"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍌 🍓 🍓 🍌 🍓 🍓 🍌 🍓 ❓",
  "opts": [
   "🍓",
   "🍌",
   "🍎"
  ],
  "a": 0,
  "why": "🍌・🍓・🍓 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍌",
    "🍓",
    "🍓",
    "🍌",
    "🍓",
    "🍓",
    "🍌",
    "🍓"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-15"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🐶 🐶 🐰 🐰 🐶 🐶 🐰 🐰 🐶 🐶 🐰 ❓",
  "opts": [
   "🐱",
   "🐸",
   "🐰"
  ],
  "a": 2,
  "why": "🐶・🐶・🐰・🐰 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐶",
    "🐶",
    "🐰",
    "🐰",
    "🐶",
    "🐶",
    "🐰",
    "🐰",
    "🐶",
    "🐶",
    "🐰"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-16"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🐶 🐶 🐰 🐰 🐶 🐶 🐰 🐰 🐶 ❓",
  "opts": [
   "🐸",
   "🐰",
   "🐶"
  ],
  "a": 2,
  "why": "🐶・🐶・🐰・🐰 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐶",
    "🐶",
    "🐰",
    "🐰",
    "🐶",
    "🐶",
    "🐰",
    "🐰",
    "🐶"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-17"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🐸 🐱 🐱 🐸 🐱 🐱 🐸 ❓",
  "opts": [
   "🐱",
   "🐶",
   "🐰"
  ],
  "a": 0,
  "why": "🐸・🐱・🐱 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐸",
    "🐱",
    "🐱",
    "🐸",
    "🐱",
    "🐱",
    "🐸"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-18"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🟡 🟡 🔴 🟡 🟡 🔴 🟡 ❓",
  "opts": [
   "🟡",
   "🔵",
   "🔴"
  ],
  "a": 0,
  "why": "🟡・🟡・🔴 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🟡",
    "🟡",
    "🔴",
    "🟡",
    "🟡",
    "🔴",
    "🟡"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-19"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🔷 🔷 ⬜ ⬜ 🔷 🔷 ⬜ ⬜ 🔷 🔷 ⬜ ❓",
  "opts": [
   "🔶",
   "⬜",
   "🔷"
  ],
  "a": 1,
  "why": "🔷・🔷・⬜・⬜ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔷",
    "🔷",
    "⬜",
    "⬜",
    "🔷",
    "🔷",
    "⬜",
    "⬜",
    "🔷",
    "🔷",
    "⬜"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-20"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍓 🍓 🍈 🍓 🍓 🍈 🍓 🍓 ❓",
  "opts": [
   "🍓",
   "🍋",
   "🍈"
  ],
  "a": 2,
  "why": "🍓・🍓・🍈 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍓",
    "🍓",
    "🍈",
    "🍓",
    "🍓",
    "🍈",
    "🍓",
    "🍓"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-21"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n☀️ ☁️ ☁️ ☀️ ☁️ ☁️ ☀️ ☁️ ❓",
  "opts": [
   "⭐",
   "🌙",
   "☁️"
  ],
  "a": 2,
  "why": "☀️・☁️・☁️ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "☀️",
    "☁️",
    "☁️",
    "☀️",
    "☁️",
    "☁️",
    "☀️",
    "☁️"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-22"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n😺 🤖 🤖 😺 🤖 🤖 😺 🤖 ❓",
  "opts": [
   "😀",
   "😺",
   "🤖"
  ],
  "a": 2,
  "why": "😺・🤖・🤖 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "😺",
    "🤖",
    "🤖",
    "😺",
    "🤖",
    "🤖",
    "😺",
    "🤖"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-23"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n😺 😺 😀 😺 😺 😀 😺 😺 ❓",
  "opts": [
   "😀",
   "😺",
   "🤖"
  ],
  "a": 0,
  "why": "😺・😺・😀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "😺",
    "😺",
    "😀",
    "😺",
    "😺",
    "😀",
    "😺",
    "😺"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-24"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🟢 🟢 🟡 🟡 🟢 🟢 🟡 🟡 🟢 ❓",
  "opts": [
   "🔴",
   "🟡",
   "🟢"
  ],
  "a": 2,
  "why": "🟢・🟢・🟡・🟡 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🟢",
    "🟢",
    "🟡",
    "🟡",
    "🟢",
    "🟢",
    "🟡",
    "🟡",
    "🟢"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-25"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍓 🍓 🫐 🍓 🍓 🫐 🍓 🍓 ❓",
  "opts": [
   "🫐",
   "🍓",
   "🍋"
  ],
  "a": 0,
  "why": "🍓・🍓・🫐 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍓",
    "🍓",
    "🫐",
    "🍓",
    "🍓",
    "🫐",
    "🍓",
    "🍓"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-26"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n😺 👻 😀 👻 😺 👻 😀 👻 😺 👻 ❓",
  "opts": [
   "👻",
   "🤖",
   "😀"
  ],
  "a": 2,
  "why": "😺・👻・😀・👻 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "😺",
    "👻",
    "😀",
    "👻",
    "😺",
    "👻",
    "😀",
    "👻",
    "😺",
    "👻"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-1"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、11ばんめに くるのは？\n🔵 🟢 🟡 🔵 🟢 🟡 …",
  "opts": [
   "🟡",
   "🟢",
   "🔴"
  ],
  "a": 1,
  "why": "🔵・🟢・🟡の くりかえし。ゆびで 11ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🔵",
    "🟢",
    "🟡",
    "🔵",
    "🟢",
    "🟡"
   ],
   "pos": 11
  },
  "id": "kimari-h-2"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🤖👻👻👻🤖👻",
   "👻🤖👻🤖👻🤖",
   "🤖👻🤖👻🤖👻"
  ],
  "a": 0,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-3"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🐱 🐶 🐱 🐰 🐱 🐶 🐱 🐰 🐱 🐶 🐱 ❓",
  "opts": [
   "🐰",
   "🐸",
   "🐱"
  ],
  "a": 0,
  "why": "🐱・🐶・🐱・🐰 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐱",
    "🐶",
    "🐱",
    "🐰",
    "🐱",
    "🐶",
    "🐱",
    "🐰",
    "🐱",
    "🐶",
    "🐱"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-4"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、10ばんめに くるのは？\n🚌 🚀 🚗 🚌 🚀 🚗 …",
  "opts": [
   "🚌",
   "🚗",
   "🚀"
  ],
  "a": 0,
  "why": "🚌・🚀・🚗の くりかえし。ゆびで 10ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🚌",
    "🚀",
    "🚗",
    "🚌",
    "🚀",
    "🚗"
   ],
   "pos": 10
  },
  "id": "kimari-h-5"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "😀🤖😀🤖😀🤖",
   "😀🤖😀😀😀🤖",
   "🤖😀🤖😀🤖😀"
  ],
  "a": 1,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-6"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n⬜ ⬛ ⬜ 🔶 ⬜ ⬛ ⬜ 🔶 ⬜ ⬛ ⬜ ❓",
  "opts": [
   "🔶",
   "⬛",
   "🔷"
  ],
  "a": 0,
  "why": "⬜・⬛・⬜・🔶 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⬜",
    "⬛",
    "⬜",
    "🔶",
    "⬜",
    "⬛",
    "⬜",
    "🔶",
    "⬜",
    "⬛",
    "⬜"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-7"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、8ばんめに くるのは？\n🔶 ⬛ ⬜ 🔶 ⬛ ⬜ …",
  "opts": [
   "🔷",
   "⬛",
   "🔶"
  ],
  "a": 1,
  "why": "🔶・⬛・⬜の くりかえし。ゆびで 8ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🔶",
    "⬛",
    "⬜",
    "🔶",
    "⬛",
    "⬜"
   ],
   "pos": 8
  },
  "id": "kimari-h-8"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🔵🟢🟢🟢🔵🟢",
   "🟢🔵🟢🔵🟢🔵",
   "🔵🟢🔵🟢🔵🟢"
  ],
  "a": 0,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-9"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n👻 🤖 😀 😺 👻 🤖 😀 😺 👻 🤖 ❓",
  "opts": [
   "😀",
   "👻",
   "😺"
  ],
  "a": 0,
  "why": "👻・🤖・😀・😺 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "👻",
    "🤖",
    "😀",
    "😺",
    "👻",
    "🤖",
    "😀",
    "😺",
    "👻",
    "🤖"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-10"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、11ばんめに くるのは？\n⬜ 🔶 ⬜ 🔶 …",
  "opts": [
   "🔷",
   "⬜",
   "🔶"
  ],
  "a": 1,
  "why": "⬜・🔶の くりかえし。ゆびで 11ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "⬜",
    "🔶",
    "⬜",
    "🔶"
   ],
   "pos": 11
  },
  "id": "kimari-h-11"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "☁️☀️☀️☀️☁️☀️",
   "☀️☁️☀️☁️☀️☁️",
   "☁️☀️☁️☀️☁️☀️"
  ],
  "a": 0,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-12"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🍀 🌷 🍀 🌻 🍀 🌷 🍀 🌻 🍀 🌷 🍀 ❓",
  "opts": [
   "🌻",
   "🌷",
   "🍀"
  ],
  "a": 0,
  "why": "🍀・🌷・🍀・🌻 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍀",
    "🌷",
    "🍀",
    "🌻",
    "🍀",
    "🌷",
    "🍀",
    "🌻",
    "🍀",
    "🌷",
    "🍀"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-13"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、11ばんめに くるのは？\n🚀 🚗 🚌 🚀 🚗 🚌 …",
  "opts": [
   "🚌",
   "🚀",
   "🚗"
  ],
  "a": 2,
  "why": "🚀・🚗・🚌の くりかえし。ゆびで 11ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🚀",
    "🚗",
    "🚌",
    "🚀",
    "🚗",
    "🚌"
   ],
   "pos": 11
  },
  "id": "kimari-h-14"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🚀🚌🚀🚌🚀🚌",
   "🚌🚀🚀🚀🚌🚀",
   "🚌🚀🚌🚀🚌🚀"
  ],
  "a": 1,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-15"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n👻 😺 🤖 😺 👻 😺 🤖 😺 👻 😺 🤖 ❓",
  "opts": [
   "🤖",
   "😀",
   "😺"
  ],
  "a": 2,
  "why": "👻・😺・🤖・😺 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "👻",
    "😺",
    "🤖",
    "😺",
    "👻",
    "😺",
    "🤖",
    "😺",
    "👻",
    "😺",
    "🤖"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-16"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、9ばんめに くるのは？\n🚌 🚲 🚌 🚲 …",
  "opts": [
   "🚌",
   "🚗",
   "🚲"
  ],
  "a": 0,
  "why": "🚌・🚲の くりかえし。ゆびで 9ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🚌",
    "🚲",
    "🚌",
    "🚲"
   ],
   "pos": 9
  },
  "id": "kimari-h-17"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🤖👻🤖👻🤖👻",
   "👻🤖👻🤖👻🤖",
   "👻🤖👻👻👻🤖"
  ],
  "a": 2,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-18"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🔵 🟡 🟢 🔴 🔵 🟡 🟢 🔴 🔵 🟡 🟢 ❓",
  "opts": [
   "🔵",
   "🔴",
   "🟡"
  ],
  "a": 1,
  "why": "🔵・🟡・🟢・🔴 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔵",
    "🟡",
    "🟢",
    "🔴",
    "🔵",
    "🟡",
    "🟢",
    "🔴",
    "🔵",
    "🟡",
    "🟢"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-19"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、11ばんめに くるのは？\n🟢 🟡 🔵 🟢 🟡 🔵 …",
  "opts": [
   "🟢",
   "🟡",
   "🔵"
  ],
  "a": 1,
  "why": "🟢・🟡・🔵の くりかえし。ゆびで 11ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🟢",
    "🟡",
    "🔵",
    "🟢",
    "🟡",
    "🔵"
   ],
   "pos": 11
  },
  "id": "kimari-h-20"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🐸🐶🐸🐶🐸🐶",
   "🐶🐸🐶🐸🐸🐸",
   "🐶🐸🐶🐸🐶🐸"
  ],
  "a": 1,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-21"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🤖 😀 🤖 😺 🤖 😀 🤖 😺 🤖 😀 ❓",
  "opts": [
   "👻",
   "🤖",
   "😺"
  ],
  "a": 1,
  "why": "🤖・😀・🤖・😺 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🤖",
    "😀",
    "🤖",
    "😺",
    "🤖",
    "😀",
    "🤖",
    "😺",
    "🤖",
    "😀"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-22"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、11ばんめに くるのは？\n🎀 🎉 🎀 🎉 …",
  "opts": [
   "🎉",
   "🎈",
   "🎀"
  ],
  "a": 2,
  "why": "🎀・🎉の くりかえし。ゆびで 11ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🎀",
    "🎉",
    "🎀",
    "🎉"
   ],
   "pos": 11
  },
  "id": "kimari-h-23"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🌵🌻🌵🌻🌵🌻",
   "🌻🌵🌵🌵🌻🌵",
   "🌻🌵🌻🌵🌻🌵"
  ],
  "a": 1,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-24"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🚗 🚀 🚲 🚌 🚗 🚀 🚲 🚌 🚗 🚀 🚲 ❓",
  "opts": [
   "🚗",
   "🚌",
   "🚀"
  ],
  "a": 1,
  "why": "🚗・🚀・🚲・🚌 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚗",
    "🚀",
    "🚲",
    "🚌",
    "🚗",
    "🚀",
    "🚲",
    "🚌",
    "🚗",
    "🚀",
    "🚲"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-25"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、11ばんめに くるのは？\n🐸 🐶 🐰 🐸 🐶 🐰 …",
  "opts": [
   "🐸",
   "🐶",
   "🐰"
  ],
  "a": 1,
  "why": "🐸・🐶・🐰の くりかえし。ゆびで 11ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🐸",
    "🐶",
    "🐰",
    "🐸",
    "🐶",
    "🐰"
   ],
   "pos": 11
  },
  "id": "kimari-h-26"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "⛰️ やま",
   "🪨 いし",
   "🪑 いす"
  ],
  "a": 2,
  "why": "🪑 いすだけ しぜんの ものじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🪑 いす",
   "items": [
    {
     "label": "⛰️ やま",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "🪨 いし",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "🪑 いす",
     "cat": "furniture",
     "props": []
    }
   ]
  },
  "id": "nakama-e-1"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🥤 コップ",
   "🥕 にんじん",
   "🍽️ おさら"
  ],
  "a": 1,
  "why": "🥕 にんじんだけ しょっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🥕 にんじん",
   "items": [
    {
     "label": "🥤 コップ",
     "cat": "tableware",
     "props": []
    },
    {
     "label": "🥕 にんじん",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🍽️ おさら",
     "cat": "tableware",
     "props": []
    }
   ]
  },
  "id": "nakama-e-2"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "⭐ ほし",
   "🧅 たまねぎ",
   "🌙 つき"
  ],
  "a": 1,
  "why": "🧅 たまねぎだけ しぜんの ものじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🧅 たまねぎ",
   "items": [
    {
     "label": "⭐ ほし",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "🧅 たまねぎ",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🌙 つき",
     "cat": "nature",
     "props": [
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-e-3"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🎺 ラッパ",
   "🐙 たこ",
   "🔔 すず"
  ],
  "a": 1,
  "why": "🐙 たこだけ がっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🐙 たこ",
   "items": [
    {
     "label": "🎺 ラッパ",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "🐙 たこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🔔 すず",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    }
   ]
  },
  "id": "nakama-e-4"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🪑 いす",
   "📺 テレビ",
   "🚒 しょうぼうしゃ"
  ],
  "a": 2,
  "why": "🚒 しょうぼうしゃだけ かぐじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🚒 しょうぼうしゃ",
   "items": [
    {
     "label": "🪑 いす",
     "cat": "furniture",
     "props": []
    },
    {
     "label": "📺 テレビ",
     "cat": "furniture",
     "props": []
    },
    {
     "label": "🚒 しょうぼうしゃ",
     "cat": "vehicle",
     "props": [
      "red"
     ]
    }
   ]
  },
  "id": "nakama-e-5"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🥒 きゅうり",
   "🧅 たまねぎ",
   "🚗 くるま"
  ],
  "a": 2,
  "why": "🚗 くるまだけ やさいじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🚗 くるま",
   "items": [
    {
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🧅 たまねぎ",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": []
    }
   ]
  },
  "id": "nakama-e-6"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🖌️ ふで",
   "🍑 もも",
   "🍇 ぶどう"
  ],
  "a": 0,
  "why": "🖌️ ふでだけ くだものじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🖌️ ふで",
   "items": [
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "🍑 もも",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🍇 ぶどう",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-e-7"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🌳 き",
   "🐶 いぬ",
   "🦁 ライオン"
  ],
  "a": 0,
  "why": "🌳 きだけ どうぶつじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🌳 き",
   "items": [
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🐶 いぬ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-e-8"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐮 うし",
   "🌳 き",
   "🌷 チューリップ"
  ],
  "a": 0,
  "why": "🐮 うしだけ しょくぶつじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🐮 うし",
   "items": [
    {
     "label": "🐮 うし",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🌷 チューリップ",
     "cat": "flower",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-e-9"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🤖 ロボット",
   "⚽ ボール",
   "🍇 ぶどう"
  ],
  "a": 2,
  "why": "🍇 ぶどうだけ おもちゃじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🍇 ぶどう",
   "items": [
    {
     "label": "🤖 ロボット",
     "cat": "toy",
     "props": []
    },
    {
     "label": "⚽ ボール",
     "cat": "toy",
     "props": []
    },
    {
     "label": "🍇 ぶどう",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-e-10"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "⛰️ やま",
   "✈️ ひこうき",
   "🌙 つき"
  ],
  "a": 1,
  "why": "✈️ ひこうきだけ しぜんの ものじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "✈️ ひこうき",
   "items": [
    {
     "label": "⛰️ やま",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies"
     ]
    },
    {
     "label": "🌙 つき",
     "cat": "nature",
     "props": [
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-e-11"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍬 あめ",
   "🍰 ケーキ",
   "🤖 ロボット"
  ],
  "a": 2,
  "why": "🤖 ロボットだけ おかしじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🤖 ロボット",
   "items": [
    {
     "label": "🍬 あめ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    },
    {
     "label": "🍰 ケーキ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    },
    {
     "label": "🤖 ロボット",
     "cat": "toy",
     "props": []
    }
   ]
  },
  "id": "nakama-e-12"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "⚽ ボール",
   "👕 シャツ",
   "🧸 ぬいぐるみ"
  ],
  "a": 1,
  "why": "👕 シャツだけ おもちゃじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "👕 シャツ",
   "items": [
    {
     "label": "⚽ ボール",
     "cat": "toy",
     "props": []
    },
    {
     "label": "👕 シャツ",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "🧸 ぬいぐるみ",
     "cat": "toy",
     "props": []
    }
   ]
  },
  "id": "nakama-e-13"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "📏 じょうぎ",
   "🎸 ギター",
   "📓 ノート"
  ],
  "a": 1,
  "why": "🎸 ギターだけ ぶんぼうぐじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🎸 ギター",
   "items": [
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": []
    },
    {
     "label": "🎸 ギター",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": []
    }
   ]
  },
  "id": "nakama-e-14"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍰 ケーキ",
   "🍓 いちご",
   "🍬 あめ"
  ],
  "a": 1,
  "why": "🍓 いちごだけ おかしじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🍓 いちご",
   "items": [
    {
     "label": "🍰 ケーキ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    },
    {
     "label": "🍓 いちご",
     "cat": "fruit",
     "props": [
      "food",
      "red",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🍬 あめ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    }
   ]
  },
  "id": "nakama-e-15"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🪚 のこぎり",
   "🥒 きゅうり",
   "🔪 ほうちょう"
  ],
  "a": 1,
  "why": "🥒 きゅうりだけ どうぐじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🥒 きゅうり",
   "items": [
    {
     "label": "🪚 のこぎり",
     "cat": "tool",
     "props": [
      "cut"
     ]
    },
    {
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🔪 ほうちょう",
     "cat": "tool",
     "props": [
      "cut"
     ]
    }
   ]
  },
  "id": "nakama-e-16"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🧤 てぶくろ",
   "🌙 つき",
   "🪨 いし"
  ],
  "a": 0,
  "why": "🧤 てぶくろだけ しぜんの ものじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🧤 てぶくろ",
   "items": [
    {
     "label": "🧤 てぶくろ",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "🌙 つき",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "🪨 いし",
     "cat": "nature",
     "props": [
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-e-17"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🥕 にんじん",
   "🥤 コップ",
   "🥄 スプーン"
  ],
  "a": 0,
  "why": "🥕 にんじんだけ しょっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🥕 にんじん",
   "items": [
    {
     "label": "🥕 にんじん",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🥤 コップ",
     "cat": "tableware",
     "props": []
    },
    {
     "label": "🥄 スプーン",
     "cat": "tableware",
     "props": []
    }
   ]
  },
  "id": "nakama-e-18"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍦 アイスクリーム",
   "🍫 チョコレート",
   "✏️ えんぴつ"
  ],
  "a": 2,
  "why": "✏️ えんぴつだけ おかしじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "✏️ えんぴつ",
   "items": [
    {
     "label": "🍦 アイスクリーム",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    },
    {
     "label": "🍫 チョコレート",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    },
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    }
   ]
  },
  "id": "nakama-e-19"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🔨 かなづち",
   "🍫 チョコレート",
   "🍦 アイスクリーム"
  ],
  "a": 0,
  "why": "🔨 かなづちだけ おかしじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🔨 かなづち",
   "items": [
    {
     "label": "🔨 かなづち",
     "cat": "tool",
     "props": []
    },
    {
     "label": "🍫 チョコレート",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    },
    {
     "label": "🍦 アイスクリーム",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    }
   ]
  },
  "id": "nakama-e-20"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🚒 しょうぼうしゃ",
   "👕 シャツ",
   "👖 ズボン"
  ],
  "a": 0,
  "why": "🚒 しょうぼうしゃだけ ようふくじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🚒 しょうぼうしゃ",
   "items": [
    {
     "label": "🚒 しょうぼうしゃ",
     "cat": "vehicle",
     "props": [
      "red"
     ]
    },
    {
     "label": "👕 シャツ",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "👖 ズボン",
     "cat": "clothing",
     "props": []
    }
   ]
  },
  "id": "nakama-e-21"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍅 トマト",
   "🎹 ピアノ",
   "🎺 ラッパ"
  ],
  "a": 0,
  "why": "🍅 トマトだけ がっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🍅 トマト",
   "items": [
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural"
     ]
    },
    {
     "label": "🎹 ピアノ",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "🎺 ラッパ",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    }
   ]
  },
  "id": "nakama-e-22"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🥒 きゅうり",
   "⚽ ボール",
   "🧸 ぬいぐるみ"
  ],
  "a": 0,
  "why": "🥒 きゅうりだけ おもちゃじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🥒 きゅうり",
   "items": [
    {
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "⚽ ボール",
     "cat": "toy",
     "props": []
    },
    {
     "label": "🧸 ぬいぐるみ",
     "cat": "toy",
     "props": []
    }
   ]
  },
  "id": "nakama-e-23"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🛏️ ベッド",
   "🦋 ちょう",
   "🪑 いす"
  ],
  "a": 1,
  "why": "🦋 ちょうだけ かぐじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🦋 ちょう",
   "items": [
    {
     "label": "🛏️ ベッド",
     "cat": "furniture",
     "props": []
    },
    {
     "label": "🦋 ちょう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🪑 いす",
     "cat": "furniture",
     "props": []
    }
   ]
  },
  "id": "nakama-e-24"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "おもちゃの なかまは どれ？",
  "opts": [
   "🔪 ほうちょう",
   "🐮 うし",
   "🧸 ぬいぐるみ"
  ],
  "a": 2,
  "why": "🧸 ぬいぐるみは おもちゃの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "toy",
   "axisType": "concrete",
   "correct": "🧸 ぬいぐるみ",
   "items": [
    {
     "label": "🔪 ほうちょう",
     "cat": "tool",
     "props": [
      "cut"
     ]
    },
    {
     "label": "🐮 うし",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🧸 ぬいぐるみ",
     "cat": "toy",
     "props": []
    }
   ]
  },
  "id": "nakama-e-25"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "がっきの なかまは どれ？",
  "opts": [
   "🪚 のこぎり",
   "🥁 たいこ",
   "👖 ズボン"
  ],
  "a": 1,
  "why": "🥁 たいこは がっきの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "instrument",
   "axisType": "concrete",
   "correct": "🥁 たいこ",
   "items": [
    {
     "label": "🪚 のこぎり",
     "cat": "tool",
     "props": [
      "cut"
     ]
    },
    {
     "label": "🥁 たいこ",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "👖 ズボン",
     "cat": "clothing",
     "props": []
    }
   ]
  },
  "id": "nakama-e-26"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "どうぶつの なかまは どれ？",
  "opts": [
   "🐮 うし",
   "🍑 もも",
   "✏️ えんぴつ"
  ],
  "a": 0,
  "why": "🐮 うしは どうぶつの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "animal",
   "axisType": "concrete",
   "correct": "🐮 うし",
   "items": [
    {
     "label": "🐮 うし",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🍑 もも",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    }
   ]
  },
  "id": "nakama-e-27"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "かぐの なかまは どれ？",
  "opts": [
   "🦁 ライオン",
   "🧦 くつした",
   "🪑 いす"
  ],
  "a": 2,
  "why": "🪑 いすは かぐの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "furniture",
   "axisType": "concrete",
   "correct": "🪑 いす",
   "items": [
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🧦 くつした",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "🪑 いす",
     "cat": "furniture",
     "props": []
    }
   ]
  },
  "id": "nakama-e-28"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "のりものの なかまは どれ？",
  "opts": [
   "🍫 チョコレート",
   "🎹 ピアノ",
   "🚗 くるま"
  ],
  "a": 2,
  "why": "🚗 くるまは のりものの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "vehicle",
   "axisType": "concrete",
   "correct": "🚗 くるま",
   "items": [
    {
     "label": "🍫 チョコレート",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    },
    {
     "label": "🎹 ピアノ",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": []
    }
   ]
  },
  "id": "nakama-e-29"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "くだものの なかまは どれ？",
  "opts": [
   "🍅 トマト",
   "🍉 すいか",
   "🧅 たまねぎ"
  ],
  "a": 1,
  "why": "🍉 すいかは くだものの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "fruit",
   "axisType": "concrete",
   "correct": "🍉 すいか",
   "items": [
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural"
     ]
    },
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🧅 たまねぎ",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-e-30"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "がっきの なかまは どれ？",
  "opts": [
   "🎸 ギター",
   "🐱 ねこ",
   "🐳 くじら"
  ],
  "a": 0,
  "why": "🎸 ギターは がっきの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "instrument",
   "axisType": "concrete",
   "correct": "🎸 ギター",
   "items": [
    {
     "label": "🎸 ギター",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🐳 くじら",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    }
   ]
  },
  "id": "nakama-e-31"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "しょくぶつの なかまは どれ？",
  "opts": [
   "🌳 き",
   "⛵ ふね",
   "🥕 にんじん"
  ],
  "a": 0,
  "why": "🌳 きは しょくぶつの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "flower",
   "axisType": "concrete",
   "correct": "🌳 き",
   "items": [
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water"
     ]
    },
    {
     "label": "🥕 にんじん",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-e-32"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🔨 かなづち",
   "🔪 ほうちょう",
   "🪚 のこぎり"
  ],
  "a": 0,
  "why": "ほうちょうと のこぎりは「ものを きる」なかま。🔨 かなづちだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🔨 かなづち",
   "items": [
    {
     "label": "🔨 かなづち",
     "cat": "tool",
     "props": []
    },
    {
     "label": "🔪 ほうちょう",
     "cat": "tool",
     "props": [
      "cut"
     ]
    },
    {
     "label": "🪚 のこぎり",
     "cat": "tool",
     "props": [
      "cut"
     ]
    }
   ]
  },
  "id": "nakama-n-1"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐳 くじら",
   "🐟 さかな",
   "🐮 うし"
  ],
  "a": 2,
  "why": "さかなと くじらは「みずの なかで くらす（つかう）」なかま。🐮 うしだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐮 うし",
   "items": [
    {
     "label": "🐳 くじら",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🐟 さかな",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🐮 うし",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-n-2"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐝 はち",
   "🐟 さかな",
   "🦋 ちょう"
  ],
  "a": 1,
  "why": "ちょうと はちは「そらを とぶ」なかま。🐟 さかなだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐟 さかな",
   "items": [
    {
     "label": "🐝 はち",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🐟 さかな",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🦋 ちょう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    }
   ]
  },
  "id": "nakama-n-3"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🖍️ クレヨン",
   "✏️ えんぴつ",
   "✂️ はさみ"
  ],
  "a": 2,
  "why": "えんぴつと クレヨンは「かく・ぬる」なかま。✂️ はさみだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "✂️ はさみ",
   "items": [
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "✂️ はさみ",
     "cat": "stationery",
     "props": [
      "cut"
     ]
    }
   ]
  },
  "id": "nakama-n-4"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "📓 ノート",
   "✏️ えんぴつ",
   "🖍️ クレヨン"
  ],
  "a": 0,
  "why": "えんぴつと クレヨンは「かく・ぬる」なかま。📓 ノートだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📓 ノート",
   "items": [
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": []
    },
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    }
   ]
  },
  "id": "nakama-n-5"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🦋 ちょう",
   "🦁 ライオン",
   "🐦 ことり"
  ],
  "a": 1,
  "why": "ちょうと ことりは「そらを とぶ」なかま。🦁 ライオンだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🦁 ライオン",
   "items": [
    {
     "label": "🦋 ちょう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🐦 ことり",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    }
   ]
  },
  "id": "nakama-n-6"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐳 くじら",
   "🐟 さかな",
   "🐝 はち"
  ],
  "a": 2,
  "why": "さかなと くじらは「みずの なかで くらす（つかう）」なかま。🐝 はちだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐝 はち",
   "items": [
    {
     "label": "🐳 くじら",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🐟 さかな",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🐝 はち",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    }
   ]
  },
  "id": "nakama-n-7"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🚁 ヘリコプター",
   "✈️ ひこうき",
   "🚂 きしゃ"
  ],
  "a": 2,
  "why": "ヘリコプターと ひこうきは「そらを とぶ」なかま。🚂 きしゃだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🚂 きしゃ",
   "items": [
    {
     "label": "🚁 ヘリコプター",
     "cat": "vehicle",
     "props": [
      "flies"
     ]
    },
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies"
     ]
    },
    {
     "label": "🚂 きしゃ",
     "cat": "vehicle",
     "props": []
    }
   ]
  },
  "id": "nakama-n-8"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🖌️ ふで",
   "📓 ノート",
   "✏️ えんぴつ"
  ],
  "a": 1,
  "why": "えんぴつと ふでは「かく・ぬる」なかま。📓 ノートだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📓 ノート",
   "items": [
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": []
    },
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    }
   ]
  },
  "id": "nakama-n-9"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐳 くじら",
   "🐝 はち",
   "🐙 たこ"
  ],
  "a": 1,
  "why": "くじらと たこは「みずの なかで くらす（つかう）」なかま。🐝 はちだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐝 はち",
   "items": [
    {
     "label": "🐳 くじら",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🐝 はち",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🐙 たこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    }
   ]
  },
  "id": "nakama-n-10"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "✏️ えんぴつ",
   "🖌️ ふで",
   "📏 じょうぎ"
  ],
  "a": 2,
  "why": "えんぴつと ふでは「かく・ぬる」なかま。📏 じょうぎだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📏 じょうぎ",
   "items": [
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": []
    }
   ]
  },
  "id": "nakama-n-11"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐘 ぞう",
   "🐟 さかな",
   "🐳 くじら"
  ],
  "a": 0,
  "why": "くじらと さかなは「みずの なかで くらす（つかう）」なかま。🐘 ぞうだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐘 ぞう",
   "items": [
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🐟 さかな",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🐳 くじら",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    }
   ]
  },
  "id": "nakama-n-12"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "📓 ノート",
   "🖌️ ふで",
   "🖍️ クレヨン"
  ],
  "a": 0,
  "why": "ふでと クレヨンは「かく・ぬる」なかま。📓 ノートだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📓 ノート",
   "items": [
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": []
    },
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    }
   ]
  },
  "id": "nakama-n-13"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🖌️ ふで",
   "🖍️ クレヨン",
   "✂️ はさみ"
  ],
  "a": 2,
  "why": "クレヨンと ふでは「かく・ぬる」なかま。✂️ はさみだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "✂️ はさみ",
   "items": [
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "✂️ はさみ",
     "cat": "stationery",
     "props": [
      "cut"
     ]
    }
   ]
  },
  "id": "nakama-n-14"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐳 くじら",
   "🦋 ちょう",
   "🐝 はち"
  ],
  "a": 0,
  "why": "はちと ちょうは「そらを とぶ」なかま。🐳 くじらだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐳 くじら",
   "items": [
    {
     "label": "🐳 くじら",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🦋 ちょう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🐝 はち",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    }
   ]
  },
  "id": "nakama-n-15"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐦 ことり",
   "🦋 ちょう",
   "🐮 うし"
  ],
  "a": 2,
  "why": "ことりと ちょうは「そらを とぶ」なかま。🐮 うしだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐮 うし",
   "items": [
    {
     "label": "🐦 ことり",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🦋 ちょう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🐮 うし",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-n-16"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🖌️ ふで",
   "✂️ はさみ",
   "✏️ えんぴつ"
  ],
  "a": 1,
  "why": "ふでと えんぴつは「かく・ぬる」なかま。✂️ はさみだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "✂️ はさみ",
   "items": [
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "✂️ はさみ",
     "cat": "stationery",
     "props": [
      "cut"
     ]
    },
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    }
   ]
  },
  "id": "nakama-n-17"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐳 くじら",
   "🦋 ちょう",
   "🐟 さかな"
  ],
  "a": 1,
  "why": "さかなと くじらは「みずの なかで くらす（つかう）」なかま。🦋 ちょうだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🦋 ちょう",
   "items": [
    {
     "label": "🐳 くじら",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🦋 ちょう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🐟 さかな",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    }
   ]
  },
  "id": "nakama-n-18"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🦋 ちょう",
   "🐦 ことり",
   "🐱 ねこ"
  ],
  "a": 2,
  "why": "ちょうと ことりは「そらを とぶ」なかま。🐱 ねこだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐱 ねこ",
   "items": [
    {
     "label": "🦋 ちょう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🐦 ことり",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-n-19"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "✏️ えんぴつ",
   "📏 じょうぎ",
   "🖍️ クレヨン"
  ],
  "a": 1,
  "why": "クレヨンと えんぴつは「かく・ぬる」なかま。📏 じょうぎだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📏 じょうぎ",
   "items": [
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": []
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    }
   ]
  },
  "id": "nakama-n-20"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐦 ことり",
   "🐙 たこ",
   "🐝 はち"
  ],
  "a": 1,
  "why": "ことりと はちは「そらを とぶ」なかま。🐙 たこだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐙 たこ",
   "items": [
    {
     "label": "🐦 ことり",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🐙 たこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🐝 はち",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    }
   ]
  },
  "id": "nakama-n-21"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐱 ねこ",
   "🐝 はち",
   "🦋 ちょう"
  ],
  "a": 0,
  "why": "はちと ちょうは「そらを とぶ」なかま。🐱 ねこだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐱 ねこ",
   "items": [
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🐝 はち",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🦋 ちょう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    }
   ]
  },
  "id": "nakama-n-22"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "📏 じょうぎ",
   "🖍️ クレヨン",
   "🖌️ ふで"
  ],
  "a": 0,
  "why": "クレヨンと ふでは「かく・ぬる」なかま。📏 じょうぎだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📏 じょうぎ",
   "items": [
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": []
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    }
   ]
  },
  "id": "nakama-n-23"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🦋 ちょう",
   "🐙 たこ",
   "🐝 はち"
  ],
  "a": 1,
  "why": "はちと ちょうは「そらを とぶ」なかま。🐙 たこだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐙 たこ",
   "items": [
    {
     "label": "🦋 ちょう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🐙 たこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🐝 はち",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    }
   ]
  },
  "id": "nakama-n-24"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "そらを とぶ なかまは どれ？",
  "opts": [
   "🐝 はち",
   "🐳 くじら",
   "🐱 ねこ"
  ],
  "a": 0,
  "why": "🐝 はちは「そらを とぶ」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "flies",
   "axisType": "functional",
   "correct": "🐝 はち",
   "items": [
    {
     "label": "🐝 はち",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🐳 くじら",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-n-25"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "みずの なかや うえに いる なかまは どれ？",
  "opts": [
   "🚒 しょうぼうしゃ",
   "⛵ ふね",
   "🚗 くるま"
  ],
  "a": 1,
  "why": "⛵ ふねは「みずの なかや うえに いる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "water",
   "axisType": "functional",
   "correct": "⛵ ふね",
   "items": [
    {
     "label": "🚒 しょうぼうしゃ",
     "cat": "vehicle",
     "props": [
      "red"
     ]
    },
    {
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water"
     ]
    },
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": []
    }
   ]
  },
  "id": "nakama-n-26"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "そらを とぶ なかまは どれ？",
  "opts": [
   "🚌 バス",
   "✈️ ひこうき",
   "🚲 じてんしゃ"
  ],
  "a": 1,
  "why": "✈️ ひこうきは「そらを とぶ」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "flies",
   "axisType": "functional",
   "correct": "✈️ ひこうき",
   "items": [
    {
     "label": "🚌 バス",
     "cat": "vehicle",
     "props": []
    },
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies"
     ]
    },
    {
     "label": "🚲 じてんしゃ",
     "cat": "vehicle",
     "props": []
    }
   ]
  },
  "id": "nakama-n-27"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "そらを とぶ なかまは どれ？",
  "opts": [
   "🚒 しょうぼうしゃ",
   "🚂 きしゃ",
   "✈️ ひこうき"
  ],
  "a": 2,
  "why": "✈️ ひこうきは「そらを とぶ」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "flies",
   "axisType": "functional",
   "correct": "✈️ ひこうき",
   "items": [
    {
     "label": "🚒 しょうぼうしゃ",
     "cat": "vehicle",
     "props": [
      "red"
     ]
    },
    {
     "label": "🚂 きしゃ",
     "cat": "vehicle",
     "props": []
    },
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies"
     ]
    }
   ]
  },
  "id": "nakama-n-28"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "ものを きる なかまは どれ？",
  "opts": [
   "🖌️ ふで",
   "✂️ はさみ",
   "🖍️ クレヨン"
  ],
  "a": 1,
  "why": "✂️ はさみは「ものを きる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "cut",
   "axisType": "functional",
   "correct": "✂️ はさみ",
   "items": [
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "✂️ はさみ",
     "cat": "stationery",
     "props": [
      "cut"
     ]
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    }
   ]
  },
  "id": "nakama-n-29"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "ものを きる なかまは どれ？",
  "opts": [
   "✂️ はさみ",
   "🖍️ クレヨン",
   "📓 ノート"
  ],
  "a": 0,
  "why": "✂️ はさみは「ものを きる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "cut",
   "axisType": "functional",
   "correct": "✂️ はさみ",
   "items": [
    {
     "label": "✂️ はさみ",
     "cat": "stationery",
     "props": [
      "cut"
     ]
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": []
    }
   ]
  },
  "id": "nakama-n-30"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "ものを きる なかまは どれ？",
  "opts": [
   "📓 ノート",
   "🖌️ ふで",
   "✂️ はさみ"
  ],
  "a": 2,
  "why": "✂️ はさみは「ものを きる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "cut",
   "axisType": "functional",
   "correct": "✂️ はさみ",
   "items": [
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": []
    },
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "✂️ はさみ",
     "cat": "stationery",
     "props": [
      "cut"
     ]
    }
   ]
  },
  "id": "nakama-n-31"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "みずの なかや うえに いる なかまは どれ？",
  "opts": [
   "🚗 くるま",
   "⛵ ふね",
   "🚲 じてんしゃ"
  ],
  "a": 1,
  "why": "⛵ ふねは「みずの なかや うえに いる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "water",
   "axisType": "functional",
   "correct": "⛵ ふね",
   "items": [
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": []
    },
    {
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water"
     ]
    },
    {
     "label": "🚲 じてんしゃ",
     "cat": "vehicle",
     "props": []
    }
   ]
  },
  "id": "nakama-n-32"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐟 さかな",
   "🐰 うさぎ",
   "🎹 ピアノ",
   "🌻 ひまわり"
  ],
  "a": 2,
  "why": "🎹 ピアノだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🎹 ピアノ",
   "items": [
    {
     "label": "🐟 さかな",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🐰 うさぎ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🎹 ピアノ",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "🌻 ひまわり",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    }
   ]
  },
  "id": "nakama-h-1"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍉 すいか",
   "🍬 あめ",
   "🛏️ ベッド",
   "🍌 バナナ"
  ],
  "a": 2,
  "why": "🛏️ ベッドだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🛏️ ベッド",
   "items": [
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🍬 あめ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    },
    {
     "label": "🛏️ ベッド",
     "cat": "furniture",
     "props": []
    },
    {
     "label": "🍌 バナナ",
     "cat": "fruit",
     "props": [
      "food",
      "yellow",
      "sweet",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-2"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐘 ぞう",
   "🌷 チューリップ",
   "🌻 ひまわり",
   "👖 ズボン"
  ],
  "a": 3,
  "why": "👖 ズボンだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "👖 ズボン",
   "items": [
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🌷 チューリップ",
     "cat": "flower",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🌻 ひまわり",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "👖 ズボン",
     "cat": "clothing",
     "props": []
    }
   ]
  },
  "id": "nakama-h-3"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍑 もも",
   "🍅 トマト",
   "🐙 たこ",
   "🍎 りんご"
  ],
  "a": 2,
  "why": "🐙 たこだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🐙 たこ",
   "items": [
    {
     "label": "🍑 もも",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural"
     ]
    },
    {
     "label": "🐙 たこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🍎 りんご",
     "cat": "fruit",
     "props": [
      "food",
      "red",
      "sweet",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-4"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐜 あり",
   "🧅 たまねぎ",
   "🪚 のこぎり",
   "🍉 すいか"
  ],
  "a": 2,
  "why": "🪚 のこぎりだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🪚 のこぎり",
   "items": [
    {
     "label": "🐜 あり",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🧅 たまねぎ",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🪚 のこぎり",
     "cat": "tool",
     "props": [
      "cut"
     ]
    },
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-5"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🧅 たまねぎ",
   "🍑 もも",
   "🚒 しょうぼうしゃ",
   "🥕 にんじん"
  ],
  "a": 2,
  "why": "🚒 しょうぼうしゃだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🚒 しょうぼうしゃ",
   "items": [
    {
     "label": "🧅 たまねぎ",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🍑 もも",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🚒 しょうぼうしゃ",
     "cat": "vehicle",
     "props": [
      "red"
     ]
    },
    {
     "label": "🥕 にんじん",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-6"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐙 たこ",
   "👖 ズボン",
   "🌻 ひまわり",
   "🌳 き"
  ],
  "a": 1,
  "why": "👖 ズボンだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "👖 ズボン",
   "items": [
    {
     "label": "🐙 たこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "👖 ズボン",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "🌻 ひまわり",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-7"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐦 ことり",
   "👕 シャツ",
   "🍎 りんご",
   "🍇 ぶどう"
  ],
  "a": 1,
  "why": "👕 シャツだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "👕 シャツ",
   "items": [
    {
     "label": "🐦 ことり",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "👕 シャツ",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "🍎 りんご",
     "cat": "fruit",
     "props": [
      "food",
      "red",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🍇 ぶどう",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-8"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍦 アイスクリーム",
   "🍇 ぶどう",
   "🔪 ほうちょう",
   "🍬 あめ"
  ],
  "a": 2,
  "why": "🔪 ほうちょうだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🔪 ほうちょう",
   "items": [
    {
     "label": "🍦 アイスクリーム",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    },
    {
     "label": "🍇 ぶどう",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🔪 ほうちょう",
     "cat": "tool",
     "props": [
      "cut"
     ]
    },
    {
     "label": "🍬 あめ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    }
   ]
  },
  "id": "nakama-h-9"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🧸 ぬいぐるみ",
   "🍓 いちご",
   "🐶 いぬ",
   "🥒 きゅうり"
  ],
  "a": 0,
  "why": "🧸 ぬいぐるみだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🧸 ぬいぐるみ",
   "items": [
    {
     "label": "🧸 ぬいぐるみ",
     "cat": "toy",
     "props": []
    },
    {
     "label": "🍓 いちご",
     "cat": "fruit",
     "props": [
      "food",
      "red",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🐶 いぬ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-10"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "⭐ ほし",
   "🍽️ おさら",
   "🦋 ちょう",
   "🥒 きゅうり"
  ],
  "a": 1,
  "why": "🍽️ おさらだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🍽️ おさら",
   "items": [
    {
     "label": "⭐ ほし",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "🍽️ おさら",
     "cat": "tableware",
     "props": []
    },
    {
     "label": "🦋 ちょう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-11"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🎸 ギター",
   "🥒 きゅうり",
   "🍅 トマト",
   "🍫 チョコレート"
  ],
  "a": 0,
  "why": "🎸 ギターだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🎸 ギター",
   "items": [
    {
     "label": "🎸 ギター",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural"
     ]
    },
    {
     "label": "🍫 チョコレート",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    }
   ]
  },
  "id": "nakama-h-12"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🥒 きゅうり",
   "🌙 つき",
   "🍇 ぶどう",
   "🥕 にんじん"
  ],
  "a": 1,
  "why": "🌙 つきだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🌙 つき",
   "items": [
    {
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🌙 つき",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "🍇 ぶどう",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🥕 にんじん",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-13"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🪨 いし",
   "🧦 くつした",
   "🦋 ちょう",
   "🥕 にんじん"
  ],
  "a": 1,
  "why": "🧦 くつしただけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🧦 くつした",
   "items": [
    {
     "label": "🪨 いし",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "🧦 くつした",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "🦋 ちょう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🥕 にんじん",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-14"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍎 りんご",
   "🍦 アイスクリーム",
   "🍅 トマト",
   "⛵ ふね"
  ],
  "a": 3,
  "why": "⛵ ふねだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "⛵ ふね",
   "items": [
    {
     "label": "🍎 りんご",
     "cat": "fruit",
     "props": [
      "food",
      "red",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🍦 アイスクリーム",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    },
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural"
     ]
    },
    {
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water"
     ]
    }
   ]
  },
  "id": "nakama-h-15"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🎹 ピアノ",
   "🐜 あり",
   "🌻 ひまわり",
   "🐮 うし"
  ],
  "a": 0,
  "why": "🎹 ピアノだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🎹 ピアノ",
   "items": [
    {
     "label": "🎹 ピアノ",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "🐜 あり",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🌻 ひまわり",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🐮 うし",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-16"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐦 ことり",
   "🌳 き",
   "🍑 もも",
   "🐮 うし"
  ],
  "a": 2,
  "why": "🍑 ももだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🍑 もも",
   "items": [
    {
     "label": "🐦 ことり",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🍑 もも",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🐮 うし",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-17"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍉 すいか",
   "🚌 バス",
   "🍎 りんご",
   "🍰 ケーキ"
  ],
  "a": 1,
  "why": "🚌 バスだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🚌 バス",
   "items": [
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🚌 バス",
     "cat": "vehicle",
     "props": []
    },
    {
     "label": "🍎 りんご",
     "cat": "fruit",
     "props": [
      "food",
      "red",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🍰 ケーキ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    }
   ]
  },
  "id": "nakama-h-18"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍅 トマト",
   "📏 じょうぎ",
   "🌷 チューリップ",
   "⭐ ほし"
  ],
  "a": 1,
  "why": "📏 じょうぎだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "📏 じょうぎ",
   "items": [
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural"
     ]
    },
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": []
    },
    {
     "label": "🌷 チューリップ",
     "cat": "flower",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "⭐ ほし",
     "cat": "nature",
     "props": [
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-19"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🎺 ラッパ",
   "🌳 き",
   "🦁 ライオン",
   "🐰 うさぎ"
  ],
  "a": 0,
  "why": "🎺 ラッパだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🎺 ラッパ",
   "items": [
    {
     "label": "🎺 ラッパ",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🐰 うさぎ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-20"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐝 はち",
   "📏 じょうぎ",
   "🐳 くじら",
   "🪨 いし"
  ],
  "a": 1,
  "why": "📏 じょうぎだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "📏 じょうぎ",
   "items": [
    {
     "label": "🐝 はち",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": []
    },
    {
     "label": "🐳 くじら",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
     ]
    },
    {
     "label": "🪨 いし",
     "cat": "nature",
     "props": [
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-21"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🌻 ひまわり",
   "📺 テレビ",
   "🐰 うさぎ",
   "🐶 いぬ"
  ],
  "a": 1,
  "why": "📺 テレビだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "📺 テレビ",
   "items": [
    {
     "label": "🌻 ひまわり",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "📺 テレビ",
     "cat": "furniture",
     "props": []
    },
    {
     "label": "🐰 うさぎ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🐶 いぬ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-22"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐱 ねこ",
   "🦁 ライオン",
   "🌷 チューリップ",
   "⛰️ やま"
  ],
  "a": 3,
  "why": "⛰️ やまだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "⛰️ やま",
   "items": [
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🌷 チューリップ",
     "cat": "flower",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "⛰️ やま",
     "cat": "nature",
     "props": [
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-23"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🥕 にんじん",
   "🐘 ぞう",
   "🎺 ラッパ",
   "🦁 ライオン"
  ],
  "a": 2,
  "why": "🎺 ラッパだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🎺 ラッパ",
   "items": [
    {
     "label": "🥕 にんじん",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🎺 ラッパ",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-24"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "しぜんに ある なかまは どれ？",
  "opts": [
   "🐮 うし",
   "⛵ ふね",
   "📏 じょうぎ",
   "🖌️ ふで"
  ],
  "a": 0,
  "why": "🐮 うしは「しぜんに ある」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "natural",
   "axisType": "abstract",
   "correct": "🐮 うし",
   "items": [
    {
     "label": "🐮 うし",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water"
     ]
    },
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": []
    },
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    }
   ]
  },
  "id": "nakama-h-25"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "いきている なかまは どれ？",
  "opts": [
   "🧸 ぬいぐるみ",
   "🧦 くつした",
   "🌻 ひまわり",
   "📏 じょうぎ"
  ],
  "a": 2,
  "why": "🌻 ひまわりは「いきている」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "living",
   "axisType": "abstract",
   "correct": "🌻 ひまわり",
   "items": [
    {
     "label": "🧸 ぬいぐるみ",
     "cat": "toy",
     "props": []
    },
    {
     "label": "🧦 くつした",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "🌻 ひまわり",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": []
    }
   ]
  },
  "id": "nakama-h-26"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "たべられる なかまは どれ？",
  "opts": [
   "🚁 ヘリコプター",
   "🥕 にんじん",
   "🖍️ クレヨン",
   "📺 テレビ"
  ],
  "a": 1,
  "why": "🥕 にんじんは「たべられる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "food",
   "axisType": "abstract",
   "correct": "🥕 にんじん",
   "items": [
    {
     "label": "🚁 ヘリコプター",
     "cat": "vehicle",
     "props": [
      "flies"
     ]
    },
    {
     "label": "🥕 にんじん",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "📺 テレビ",
     "cat": "furniture",
     "props": []
    }
   ]
  },
  "id": "nakama-h-27"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "たべられる なかまは どれ？",
  "opts": [
   "🧦 くつした",
   "⛰️ やま",
   "🍦 アイスクリーム",
   "🥄 スプーン"
  ],
  "a": 2,
  "why": "🍦 アイスクリームは「たべられる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "food",
   "axisType": "abstract",
   "correct": "🍦 アイスクリーム",
   "items": [
    {
     "label": "🧦 くつした",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "⛰️ やま",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "🍦 アイスクリーム",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    },
    {
     "label": "🥄 スプーン",
     "cat": "tableware",
     "props": []
    }
   ]
  },
  "id": "nakama-h-28"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "たべられる なかまは どれ？",
  "opts": [
   "🔪 ほうちょう",
   "🐰 うさぎ",
   "🐦 ことり",
   "🍓 いちご"
  ],
  "a": 3,
  "why": "🍓 いちごは「たべられる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "food",
   "axisType": "abstract",
   "correct": "🍓 いちご",
   "items": [
    {
     "label": "🔪 ほうちょう",
     "cat": "tool",
     "props": [
      "cut"
     ]
    },
    {
     "label": "🐰 うさぎ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🐦 ことり",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🍓 いちご",
     "cat": "fruit",
     "props": [
      "food",
      "red",
      "sweet",
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-29"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "たべられる なかまは どれ？",
  "opts": [
   "⛵ ふね",
   "🧤 てぶくろ",
   "🍑 もも",
   "🧦 くつした"
  ],
  "a": 2,
  "why": "🍑 ももは「たべられる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "food",
   "axisType": "abstract",
   "correct": "🍑 もも",
   "items": [
    {
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water"
     ]
    },
    {
     "label": "🧤 てぶくろ",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "🍑 もも",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "🧦 くつした",
     "cat": "clothing",
     "props": []
    }
   ]
  },
  "id": "nakama-h-30"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "しぜんに ある なかまは どれ？",
  "opts": [
   "🖍️ クレヨン",
   "👖 ズボン",
   "🥁 たいこ",
   "🐝 はち"
  ],
  "a": 3,
  "why": "🐝 はちは「しぜんに ある」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "natural",
   "axisType": "abstract",
   "correct": "🐝 はち",
   "items": [
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "👖 ズボン",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "🥁 たいこ",
     "cat": "instrument",
     "props": [
      "sound"
     ]
    },
    {
     "label": "🐝 はち",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    }
   ]
  },
  "id": "nakama-h-31"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "たべられる なかまは どれ？",
  "opts": [
   "🧤 てぶくろ",
   "🐱 ねこ",
   "✏️ えんぴつ",
   "🍬 あめ"
  ],
  "a": 3,
  "why": "🍬 あめは「たべられる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "food",
   "axisType": "abstract",
   "correct": "🍬 あめ",
   "items": [
    {
     "label": "🧤 てぶくろ",
     "cat": "clothing",
     "props": []
    },
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw"
     ]
    },
    {
     "label": "🍬 あめ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
     ]
    }
   ]
  },
  "id": "nakama-h-32"
 },
 {
  "q": "⬇️ したを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "➡️ みぎ",
   "⬆️ うえ"
  ],
  "a": 0,
  "why": "⬇️ したから くるっと まわると ⬅️ ひだりだね",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
   "turns": [
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-1"
 },
 {
  "q": "「まえへ」を 4かい。なんマス すすむ？",
  "opts": [
   "3マス",
   "4マス",
   "5マス"
  ],
  "a": 1,
  "why": "1かいで 1マス。4かいなら 4マスだね",
  "meta": {
   "kind": "robot-steps",
   "steps": [
    1,
    1,
    1,
    1
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-2"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 3マス",
   "みぎに 4マス",
   "したに 3マス"
  ],
  "a": 0,
  "why": "むいている ほうこうに 3マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 0,
   "n": 3
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-3"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬇️ した",
   "⬆️ うえ",
   "⬅️ ひだり"
  ],
  "a": 2,
  "why": "⬆️ うえから くるっと まわると ⬅️ ひだりだね",
  "meta": {
   "kind": "robot-turn",
   "start": 3,
   "turns": [
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-4"
 },
 {
  "q": "「まえへ」を 2かい。なんマス すすむ？",
  "opts": [
   "3マス",
   "2マス",
   "1マス"
  ],
  "a": 1,
  "why": "1かいで 1マス。2かいなら 2マスだね",
  "meta": {
   "kind": "robot-steps",
   "steps": [
    1,
    1
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-5"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「まえへ 4マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 4マス",
   "したに 4マス",
   "みぎに 5マス"
  ],
  "a": 0,
  "why": "むいている ほうこうに 4マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 0,
   "n": 4
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-6"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬇️ した",
   "⬅️ ひだり",
   "➡️ みぎ"
  ],
  "a": 2,
  "why": "⬆️ うえから くるっと まわると ➡️ みぎだね",
  "meta": {
   "kind": "robot-turn",
   "start": 3,
   "turns": [
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-7"
 },
 {
  "q": "「まえへ」を 5かい。なんマス すすむ？",
  "opts": [
   "5マス",
   "6マス",
   "4マス"
  ],
  "a": 0,
  "why": "1かいで 1マス。5かいなら 5マスだね",
  "meta": {
   "kind": "robot-steps",
   "steps": [
    1,
    1,
    1,
    1,
    1
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-8"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 4マス",
   "うえに 3マス",
   "みぎに 3マス"
  ],
  "a": 1,
  "why": "むいている ほうこうに 3マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 3,
   "n": 3
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-9"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「まえへ 4マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 4マス",
   "うえに 5マス",
   "みぎに 4マス"
  ],
  "a": 0,
  "why": "むいている ほうこうに 4マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 3,
   "n": 4
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-10"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬆️ うえ",
   "⬇️ した"
  ],
  "a": 1,
  "why": "⬅️ ひだりから くるっと まわると ⬆️ うえだね",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-11"
 },
 {
  "q": "⬇️ したを むいている ロボットが「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 3マス",
   "したに 3マス",
   "したに 4マス"
  ],
  "a": 1,
  "why": "むいている ほうこうに 3マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 1,
   "n": 3
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-12"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "➡️ みぎ",
   "⬆️ うえ"
  ],
  "a": 1,
  "why": "⬆️ うえから くるっと まわると ➡️ みぎだね",
  "meta": {
   "kind": "robot-turn",
   "start": 3,
   "turns": [
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-13"
 },
 {
  "q": "「まえへ」を 3かい。なんマス すすむ？",
  "opts": [
   "4マス",
   "2マス",
   "3マス"
  ],
  "a": 2,
  "why": "1かいで 1マス。3かいなら 3マスだね",
  "meta": {
   "kind": "robot-steps",
   "steps": [
    1,
    1,
    1
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-14"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 3マス",
   "うえに 2マス",
   "みぎに 2マス"
  ],
  "a": 1,
  "why": "むいている ほうこうに 2マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 3,
   "n": 2
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-15"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "➡️ みぎ",
   "⬅️ ひだり"
  ],
  "a": 0,
  "why": "➡️ みぎから くるっと まわると ⬆️ うえだね",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-16"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬇️ した",
   "⬅️ ひだり",
   "➡️ みぎ"
  ],
  "a": 1,
  "why": "⬆️ うえから くるっと まわると ⬅️ ひだりだね",
  "meta": {
   "kind": "robot-turn",
   "start": 3,
   "turns": [
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-17"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬇️ した",
   "⬅️ ひだり",
   "⬆️ うえ"
  ],
  "a": 2,
  "why": "➡️ みぎから くるっと まわると ⬆️ うえだね",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-18"
 },
 {
  "q": "⬇️ したを むいている ロボットが「まえへ 4マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 4マス",
   "したに 5マス",
   "したに 4マス"
  ],
  "a": 2,
  "why": "むいている ほうこうに 4マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 1,
   "n": 4
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-19"
 },
 {
  "q": "⬇️ したを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬇️ した",
   "⬆️ うえ"
  ],
  "a": 0,
  "why": "⬇️ したから くるっと まわると ➡️ みぎだね",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
   "turns": [
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-20"
 },
 {
  "q": "⬇️ したを むいている ロボットに「ひだりを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬇️ した",
   "⬆️ うえ",
   "➡️ みぎ"
  ],
  "a": 1,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
   "turns": [
    "left",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-1"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 6マス",
   "みぎに 4マス・うえに 3マス",
   "みぎに 3マス・うえに 3マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    3,
    "R",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-2"
 },
 {
  "q": "➡️ みぎを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬆️ うえ"
  ],
  "a": 1,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "right",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-3"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 3マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 2マス・うえに 3マス",
   "うえに 4マス",
   "ひだりに 1マス・うえに 3マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    3,
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-4"
 },
 {
  "q": "➡️ みぎを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬇️ した",
   "⬅️ ひだり"
  ],
  "a": 0,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "right",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-5"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 1マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 1マス・うえに 1マス",
   "みぎに 2マス",
   "みぎに 1マス・うえに 2マス"
  ],
  "a": 0,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    1,
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-6"
 },
 {
  "q": "➡️ みぎを むいている ロボットに「ひだりを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬆️ うえ"
  ],
  "a": 1,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "left",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-7"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 2マス・うえに 2マス",
   "みぎに 3マス・うえに 2マス",
   "うえに 4マス"
  ],
  "a": 0,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    2,
    "R",
    2
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-8"
 },
 {
  "q": "➡️ みぎを むいている ロボットに「ひだりを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬆️ うえ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 1,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "left",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-9"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 3マス・うえに 2マス",
   "ひだりに 4マス",
   "ひだりに 3マス・うえに 1マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
   "cmds": [
    3,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-10"
 },
 {
  "q": "⬆️ うえを むいている ロボットに「みぎを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬇️ した",
   "⬅️ ひだり"
  ],
  "a": 1,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 3,
   "turns": [
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-11"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 5マス",
   "みぎに 4マス・うえに 2マス",
   "みぎに 3マス・うえに 2マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    2,
    "R",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-12"
 },
 {
  "q": "⬆️ うえを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬆️ うえ"
  ],
  "a": 2,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 3,
   "turns": [
    "right",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-13"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 6マス",
   "みぎに 3マス・したに 3マス",
   "みぎに 3マス・したに 4マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    3,
    "R",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-14"
 },
 {
  "q": "⬆️ うえを むいている ロボットに「ひだりを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬆️ うえ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 0,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 3,
   "turns": [
    "left",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-15"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 1マス」→「みぎを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 4マス・したに 1マス",
   "ひだりに 3マス・したに 1マス",
   "したに 4マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    1,
    "R",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-16"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 1,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
    "right",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-17"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 3マス",
   "みぎに 1マス・うえに 2マス",
   "みぎに 2マス・うえに 2マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    2,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-18"
 },
 {
  "q": "➡️ みぎを むいている ロボットに「ひだりを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬅️ ひだり",
   "⬇️ した",
   "➡️ みぎ"
  ],
  "a": 2,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "left",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-19"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 1マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 2マス・うえに 1マス",
   "うえに 3マス",
   "みぎに 3マス・うえに 1マス"
  ],
  "a": 0,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    1,
    "R",
    2
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-20"
 },
 {
  "q": "「🔁4かい くりかえし［まえへ・まえへ］」。ぜんぶで なんマス すすむ？",
  "opts": [
   "8マス",
   "6マス",
   "10マス"
  ],
  "a": 0,
  "why": "1かいで 2マス。4かい くりかえすと 8マスだね",
  "meta": {
   "kind": "robot-steps",
   "repeat": 4,
   "body": 2
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-1"
 },
 {
  "q": "⬇️ したを むいている ロボットが「みぎを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 0,
  "why": "4かい まわると もとに もどるよ。3かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
   "turns": [
    "right",
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-2"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 2マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "したに 2マス",
   "ひだりに 6マス",
   "うえに 2マス"
  ],
  "a": 2,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
   "cmds": [
    2,
    "R",
    2,
    "R",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-3"
 },
 {
  "q": "「🔁3かい くりかえし［まえへ・まえへ・まえへ］」。ぜんぶで なんマス すすむ？",
  "opts": [
   "12マス",
   "6マス",
   "9マス"
  ],
  "a": 2,
  "why": "1かいで 3マス。3かい くりかえすと 9マスだね",
  "meta": {
   "kind": "robot-steps",
   "repeat": 3,
   "body": 3
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-4"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」を 4かい。さいごに どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬅️ ひだり",
   "➡️ みぎ"
  ],
  "a": 1,
  "why": "4かい まわると もとに もどるよ。4かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
    "left",
    "left",
    "left",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-5"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 3マス・うえに 2マス",
   "うえに 7マス",
   "みぎに 3マス・うえに 2マス"
  ],
  "a": 2,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    3,
    "R",
    3,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-6"
 },
 {
  "q": "「🔁2かい くりかえし［まえへ・まえへ・まえへ］」。ぜんぶで なんマス すすむ？",
  "opts": [
   "6マス",
   "9マス",
   "5マス"
  ],
  "a": 0,
  "why": "1かいで 3マス。2かい くりかえすと 6マスだね",
  "meta": {
   "kind": "robot-steps",
   "repeat": 2,
   "body": 3
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-7"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「みぎを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬇️ した",
   "⬅️ ひだり"
  ],
  "a": 1,
  "why": "4かい まわると もとに もどるよ。5かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "right",
    "right",
    "right",
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-8"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 1マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 1マス・うえに 3マス",
   "うえに 4マス",
   "みぎに 1マス・うえに 3マス"
  ],
  "a": 2,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    2,
    "R",
    1,
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-9"
 },
 {
  "q": "「🔁4かい くりかえし［まえへ・まえへ・まえへ］」。ぜんぶで なんマス すすむ？",
  "opts": [
   "12マス",
   "15マス",
   "7マス"
  ],
  "a": 0,
  "why": "1かいで 3マス。4かい くりかえすと 12マスだね",
  "meta": {
   "kind": "robot-steps",
   "repeat": 4,
   "body": 3
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-10"
 },
 {
  "q": "⬇️ したを むいている ロボットが「みぎを むく」を 4かい。さいごに どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬇️ した",
   "⬅️ ひだり"
  ],
  "a": 1,
  "why": "4かい まわると もとに もどるよ。4かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
   "turns": [
    "right",
    "right",
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-11"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 2マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 2マス・うえに 1マス",
   "ひだりに 2マス・うえに 1マス",
   "うえに 7マス"
  ],
  "a": 0,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    3,
    "R",
    2,
    "R",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-12"
 },
 {
  "q": "⬇️ したを むいている ロボットが「みぎを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬇️ した",
   "⬅️ ひだり"
  ],
  "a": 2,
  "why": "4かい まわると もとに もどるよ。5かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
   "turns": [
    "right",
    "right",
    "right",
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-13"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 2マス」→「ひだりを むく」→「まえへ 2マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 4マス・うえに 2マス",
   "ひだりに 4マス・したに 2マス",
   "ひだりに 6マス"
  ],
  "a": 1,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
   "cmds": [
    2,
    "L",
    2,
    "R",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-14"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「みぎを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "⬇️ した",
   "⬆️ うえ"
  ],
  "a": 1,
  "why": "4かい まわると もとに もどるよ。5かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "right",
    "right",
    "right",
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-15"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 2マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 1マス・うえに 2マス",
   "みぎに 7マス",
   "みぎに 1マス・したに 2マス"
  ],
  "a": 2,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    3,
    "R",
    2,
    "R",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-16"
 },
 {
  "q": "「🔁3かい くりかえし［まえへ・まえへ］」。ぜんぶで なんマス すすむ？",
  "opts": [
   "5マス",
   "8マス",
   "6マス"
  ],
  "a": 2,
  "why": "1かいで 2マス。3かい くりかえすと 6マスだね",
  "meta": {
   "kind": "robot-steps",
   "repeat": 3,
   "body": 2
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-17"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「ひだりを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "➡️ みぎ",
   "⬅️ ひだり"
  ],
  "a": 1,
  "why": "4かい まわると もとに もどるよ。3かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 3,
   "turns": [
    "left",
    "left",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-18"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 3マス」→「ひだりを むく」→「まえへ 3マス」→「ひだりを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 8マス",
   "ひだりに 3マス・うえに 1マス",
   "みぎに 3マス・うえに 1マス"
  ],
  "a": 1,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    3,
    "L",
    3,
    "L",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-19"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「ひだりを むく」を 4かい。さいごに どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "➡️ みぎ",
   "⬅️ ひだり"
  ],
  "a": 1,
  "why": "4かい まわると もとに もどるよ。4かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "left",
    "left",
    "left",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-20"
 },
 {
  "q": "「カレーづくり」の フローチャートだよ。\n\nはじめ\n ↓\n🔪 やさいを きる\n ↓\n🍳 いためる\n ↓\n💧 みずを いれて にこむ\n ↓\n🍛 ルーを いれる\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🔪 やさいを きる",
   "🍳 いためる",
   "💧 みずを いれて にこむ"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずを いれて にこむ",
    "🍛 ルーを いれる"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-1"
 },
 {
  "q": "「たんじょうびかい」の フローチャートだよ。\n\nはじめ\n ↓\n🎈 かざりつけを する\n ↓\n🎂 ケーキを だす\n ↓\n🎵 うたを うたう\n ↓\n🎁 プレゼントを あける\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🎂 ケーキを だす",
   "🎵 うたを うたう",
   "🎁 プレゼントを あける"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🎈 かざりつけを する",
    "🎂 ケーキを だす",
    "🎵 うたを うたう",
    "🎁 プレゼントを あける"
   ],
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-2"
 },
 {
  "q": "「キャンプ」の フローチャートだよ。\n\nはじめ\n ↓\n⛺ テントを はる\n ↓\n🔥 ひを おこす\n ↓\n🍖 ごはんを つくる\n ↓\n🌙 ねる\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🍖 ごはんを つくる",
   "🔥 ひを おこす",
   "🌙 ねる"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "⛺ テントを はる",
    "🔥 ひを おこす",
    "🍖 ごはんを つくる",
    "🌙 ねる"
   ],
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-3"
 },
 {
  "q": "「カレーづくり」の フローチャートだよ。\n\nはじめ\n ↓\n🔪 やさいを きる\n ↓\n🍳 いためる\n ↓\n💧 みずを いれて にこむ\n ↓\n🍛 ルーを いれる\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🔪 やさいを きる",
   "🍛 ルーを いれる",
   "💧 みずを いれて にこむ"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずを いれて にこむ",
    "🍛 ルーを いれる"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-4"
 },
 {
  "q": "「やさいの みずやり」の フローチャートだよ。\n\nはじめ\n ↓\n🚰 じょうろに みずを いれる\n ↓\n🚶 はたけに いく\n ↓\n💧 みずを かける\n ↓\n🏠 じょうろを かたづける\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🏠 じょうろを かたづける",
   "💧 みずを かける",
   "🚰 じょうろに みずを いれる"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🚰 じょうろに みずを いれる",
    "🚶 はたけに いく",
    "💧 みずを かける",
    "🏠 じょうろを かたづける"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-5"
 },
 {
  "q": "「カレーづくり」の フローチャートだよ。\n\nはじめ\n ↓\n🔪 やさいを きる\n ↓\n🍳 いためる\n ↓\n💧 みずを いれて にこむ\n ↓\n🍛 ルーを いれる\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🍳 いためる",
   "🔪 やさいを きる",
   "🍛 ルーを いれる"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずを いれて にこむ",
    "🍛 ルーを いれる"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-6"
 },
 {
  "q": "「あさの したく」の フローチャートだよ。\n\nはじめ\n ↓\n🧼 かおを あらう\n ↓\n🍞 あさごはんを たべる\n ↓\n🦷 はを みがく\n ↓\n🎒 じゅんびを する\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🦷 はを みがく",
   "🍞 あさごはんを たべる",
   "🧼 かおを あらう"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🧼 かおを あらう",
    "🍞 あさごはんを たべる",
    "🦷 はを みがく",
    "🎒 じゅんびを する"
   ],
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-7"
 },
 {
  "q": "「せんたく」の フローチャートだよ。\n\nはじめ\n ↓\n👕 ふくを あつめる\n ↓\n🫧 せんたくきを まわす\n ↓\n🌞 ほす\n ↓\n📦 たたんで しまう\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "📦 たたんで しまう",
   "🫧 せんたくきを まわす",
   "👕 ふくを あつめる"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "👕 ふくを あつめる",
    "🫧 せんたくきを まわす",
    "🌞 ほす",
    "📦 たたんで しまう"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-8"
 },
 {
  "q": "「おでかけの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🧢 ぼうしを かぶる\n ↓\n🎒 リュックを せおう\n ↓\n🚪 いえの かぎを しめる\n ↓\n🚶 しゅっぱつ！\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🎒 リュックを せおう",
   "🧢 ぼうしを かぶる",
   "🚶 しゅっぱつ！"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🧢 ぼうしを かぶる",
    "🎒 リュックを せおう",
    "🚪 いえの かぎを しめる",
    "🚶 しゅっぱつ！"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-9"
 },
 {
  "q": "「カレーづくり」の フローチャートだよ。\n\nはじめ\n ↓\n🔪 やさいを きる\n ↓\n🍳 いためる\n ↓\n💧 みずを いれて にこむ\n ↓\n🍛 ルーを いれる\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🍛 ルーを いれる",
   "💧 みずを いれて にこむ",
   "🔪 やさいを きる"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずを いれて にこむ",
    "🍛 ルーを いれる"
   ],
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-10"
 },
 {
  "q": "「やさいの みずやり」の フローチャートだよ。\n\nはじめ\n ↓\n🚰 じょうろに みずを いれる\n ↓\n🚶 はたけに いく\n ↓\n💧 みずを かける\n ↓\n🏠 じょうろを かたづける\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "💧 みずを かける",
   "🏠 じょうろを かたづける",
   "🚰 じょうろに みずを いれる"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🚰 じょうろに みずを いれる",
    "🚶 はたけに いく",
    "💧 みずを かける",
    "🏠 じょうろを かたづける"
   ],
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-11"
 },
 {
  "q": "「おそうじ」の フローチャートだよ。\n\nはじめ\n ↓\n🧹 ほうきで はく\n ↓\n🧽 ぞうきんで ふく\n ↓\n🗑️ ごみを すてる\n ↓\n🧼 てを あらう\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🧼 てを あらう",
   "🧹 ほうきで はく",
   "🧽 ぞうきんで ふく"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🧹 ほうきで はく",
    "🧽 ぞうきんで ふく",
    "🗑️ ごみを すてる",
    "🧼 てを あらう"
   ],
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-12"
 },
 {
  "q": "「せんたく」の フローチャートだよ。\n\nはじめ\n ↓\n👕 ふくを あつめる\n ↓\n🫧 せんたくきを まわす\n ↓\n🌞 ほす\n ↓\n📦 たたんで しまう\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🌞 ほす",
   "👕 ふくを あつめる",
   "🫧 せんたくきを まわす"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "👕 ふくを あつめる",
    "🫧 せんたくきを まわす",
    "🌞 ほす",
    "📦 たたんで しまう"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-13"
 },
 {
  "q": "「おでかけの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🧢 ぼうしを かぶる\n ↓\n🎒 リュックを せおう\n ↓\n🚪 いえの かぎを しめる\n ↓\n🚶 しゅっぱつ！\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🚶 しゅっぱつ！",
   "🧢 ぼうしを かぶる",
   "🎒 リュックを せおう"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🧢 ぼうしを かぶる",
    "🎒 リュックを せおう",
    "🚪 いえの かぎを しめる",
    "🚶 しゅっぱつ！"
   ],
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-14"
 },
 {
  "q": "「おかいもの」の フローチャートだよ。\n\nはじめ\n ↓\n📝 メモを かく\n ↓\n🚶 おみせに いく\n ↓\n🛒 かごに いれる\n ↓\n💰 おかねを はらう\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "💰 おかねを はらう",
   "📝 メモを かく",
   "🚶 おみせに いく"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "📝 メモを かく",
    "🚶 おみせに いく",
    "🛒 かごに いれる",
    "💰 おかねを はらう"
   ],
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-15"
 },
 {
  "q": "「おかいもの」の フローチャートだよ。\n\nはじめ\n ↓\n📝 メモを かく\n ↓\n🚶 おみせに いく\n ↓\n🛒 かごに いれる\n ↓\n💰 おかねを はらう\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "💰 おかねを はらう",
   "📝 メモを かく",
   "🚶 おみせに いく"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "📝 メモを かく",
    "🚶 おみせに いく",
    "🛒 かごに いれる",
    "💰 おかねを はらう"
   ],
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-16"
 },
 {
  "q": "「カレーづくり」の フローチャートだよ。\n\nはじめ\n ↓\n🔪 やさいを きる\n ↓\n🍳 いためる\n ↓\n💧 みずを いれて にこむ\n ↓\n🍛 ルーを いれる\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🔪 やさいを きる",
   "💧 みずを いれて にこむ",
   "🍳 いためる"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずを いれて にこむ",
    "🍛 ルーを いれる"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-17"
 },
 {
  "q": "「おでかけの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🧢 ぼうしを かぶる\n ↓\n🎒 リュックを せおう\n ↓\n🚪 いえの かぎを しめる\n ↓\n🚶 しゅっぱつ！\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🎒 リュックを せおう",
   "🚶 しゅっぱつ！",
   "🚪 いえの かぎを しめる"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🧢 ぼうしを かぶる",
    "🎒 リュックを せおう",
    "🚪 いえの かぎを しめる",
    "🚶 しゅっぱつ！"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-18"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nへやが くらい？\n ├─ はい → 💡 でんきを つける\n └─ いいえ → そのまま あそぶ\n\n「へやが くらい？」が「いいえ」のとき、どうする？",
  "opts": [
   "💡 でんきを つける",
   "そのまま あそぶ",
   "📚 ほんを よむ"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "💡 でんきを つける",
   "no": "そのまま あそぶ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-1"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nねつが ある？\n ├─ はい → 🛏️ おうちで やすむ\n └─ いいえ → 🏫 がっこうに いく\n\n「ねつが ある？」が「いいえ」のとき、どうする？",
  "opts": [
   "そのまま あそぶ",
   "🏫 がっこうに いく",
   "🛏️ おうちで やすむ"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🛏️ おうちで やすむ",
   "no": "🏫 がっこうに いく"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-2"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nあめが ふっている？\n ├─ はい → ☂️ かさを もっていく\n └─ いいえ → 🧢 ぼうしを かぶる\n\n「あめが ふっている？」が「いいえ」のとき、どうする？",
  "opts": [
   "☂️ かさを もっていく",
   "🧢 ぼうしを かぶる",
   "📚 ほんを よむ"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "☂️ かさを もっていく",
   "no": "🧢 ぼうしを かぶる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-3"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nのどが かわいた？\n ├─ はい → 🥤 みずを のむ\n └─ いいえ → ⚽ あそびつづける\n\n「のどが かわいた？」が「いいえ」のとき、どうする？",
  "opts": [
   "🥤 みずを のむ",
   "⚽ あそびつづける",
   "📚 ほんを よむ"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🥤 みずを のむ",
   "no": "⚽ あそびつづける"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-4"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nおなかが すいた？\n ├─ はい → 🍙 おにぎりを たべる\n └─ いいえ → 📚 ほんを よむ\n\n「おなかが すいた？」が「はい」のとき、どうする？",
  "opts": [
   "🛏️ おうちで やすむ",
   "📚 ほんを よむ",
   "🍙 おにぎりを たべる"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🍙 おにぎりを たべる",
   "no": "📚 ほんを よむ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-5"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nねつが ある？\n ├─ はい → 🛏️ おうちで やすむ\n └─ いいえ → 🏫 がっこうに いく\n\n「ねつが ある？」が「はい」のとき、どうする？",
  "opts": [
   "🛑 とまって まつ",
   "🏫 がっこうに いく",
   "🛏️ おうちで やすむ"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🛏️ おうちで やすむ",
   "no": "🏫 がっこうに いく"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-6"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nさむい？\n ├─ はい → 🧥 うわぎを きる\n └─ いいえ → 👕 そのままで いい\n\n「さむい？」が「はい」のとき、どうする？",
  "opts": [
   "👕 そのままで いい",
   "💡 でんきを つける",
   "🧥 うわぎを きる"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🧥 うわぎを きる",
   "no": "👕 そのままで いい"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-7"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nしんごうが あか？\n ├─ はい → 🛑 とまって まつ\n └─ いいえ → 🚶 わたる\n\n「しんごうが あか？」が「いいえ」のとき、どうする？",
  "opts": [
   "🚶 わたる",
   "🏫 がっこうに いく",
   "🛑 とまって まつ"
  ],
  "a": 0,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🛑 とまって まつ",
   "no": "🚶 わたる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-8"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nくつが ぬれている？\n ├─ はい → 🌞 ほして かわかす\n └─ いいえ → 👟 そのまま はく\n\n「くつが ぬれている？」が「いいえ」のとき、どうする？",
  "opts": [
   "👟 そのまま はく",
   "🌞 ほして かわかす",
   "⚽ あそびつづける"
  ],
  "a": 0,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🌞 ほして かわかす",
   "no": "👟 そのまま はく"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-9"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nしんごうが あか？\n ├─ はい → 🛑 とまって まつ\n └─ いいえ → 🚶 わたる\n\n「しんごうが あか？」が「はい」のとき、どうする？",
  "opts": [
   "🥤 みずを のむ",
   "🚶 わたる",
   "🛑 とまって まつ"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🛑 とまって まつ",
   "no": "🚶 わたる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-10"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nのどが かわいた？\n ├─ はい → 🥤 みずを のむ\n └─ いいえ → ⚽ あそびつづける\n\n「のどが かわいた？」が「いいえ」のとき、どうする？",
  "opts": [
   "🏫 がっこうに いく",
   "🥤 みずを のむ",
   "⚽ あそびつづける"
  ],
  "a": 2,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🥤 みずを のむ",
   "no": "⚽ あそびつづける"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-11"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nてが よごれている？\n ├─ はい → 🧼 てを あらう\n └─ いいえ → 🍞 そのまま たべる\n\n「てが よごれている？」が「いいえ」のとき、どうする？",
  "opts": [
   "⚽ あそびつづける",
   "🍞 そのまま たべる",
   "🧼 てを あらう"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🧼 てを あらう",
   "no": "🍞 そのまま たべる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-12"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nのどが かわいた？\n ├─ はい → 🥤 みずを のむ\n └─ いいえ → ⚽ あそびつづける\n\n「のどが かわいた？」が「はい」のとき、どうする？",
  "opts": [
   "🥤 みずを のむ",
   "🛑 とまって まつ",
   "⚽ あそびつづける"
  ],
  "a": 0,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🥤 みずを のむ",
   "no": "⚽ あそびつづける"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-13"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nねつが ある？\n ├─ はい → 🛏️ おうちで やすむ\n └─ いいえ → 🏫 がっこうに いく\n\n「ねつが ある？」が「はい」のとき、どうする？",
  "opts": [
   "🛏️ おうちで やすむ",
   "🌞 ほして かわかす",
   "🏫 がっこうに いく"
  ],
  "a": 0,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🛏️ おうちで やすむ",
   "no": "🏫 がっこうに いく"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-14"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nねつが ある？\n ├─ はい → 🛏️ おうちで やすむ\n └─ いいえ → 🏫 がっこうに いく\n\n「ねつが ある？」が「いいえ」のとき、どうする？",
  "opts": [
   "🍞 そのまま たべる",
   "🏫 がっこうに いく",
   "🛏️ おうちで やすむ"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🛏️ おうちで やすむ",
   "no": "🏫 がっこうに いく"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-15"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nくつが ぬれている？\n ├─ はい → 🌞 ほして かわかす\n └─ いいえ → 👟 そのまま はく\n\n「くつが ぬれている？」が「はい」のとき、どうする？",
  "opts": [
   "👟 そのまま はく",
   "🛑 とまって まつ",
   "🌞 ほして かわかす"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🌞 ほして かわかす",
   "no": "👟 そのまま はく"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-16"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nおなかが すいた？\n ├─ はい → 🍙 おにぎりを たべる\n └─ いいえ → 📚 ほんを よむ\n\n「おなかが すいた？」が「はい」のとき、どうする？",
  "opts": [
   "🍙 おにぎりを たべる",
   "☂️ かさを もっていく",
   "📚 ほんを よむ"
  ],
  "a": 0,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🍙 おにぎりを たべる",
   "no": "📚 ほんを よむ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-17"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nてが よごれている？\n ├─ はい → 🧼 てを あらう\n └─ いいえ → 🍞 そのまま たべる\n\n「てが よごれている？」が「いいえ」のとき、どうする？",
  "opts": [
   "👟 そのまま はく",
   "🍞 そのまま たべる",
   "🧼 てを あらう"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🧼 てを あらう",
   "no": "🍞 そのまま たべる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-18"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ ⭐を かく\n │ ⭐を かく\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "9かい",
   "5かい"
  ],
  "a": 0,
  "why": "1しゅうで 2かい。3しゅうで 6かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 3,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-1"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ 🦘 ジャンプする\n │ ⭐を かく\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "5かい",
   "3かい",
   "6かい"
  ],
  "a": 1,
  "why": "1しゅうに 1かいずつ。3しゅうで 3かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 3
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-2"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ ⭕を かく\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
  "opts": [
   "8かい",
   "5かい",
   "4かい"
  ],
  "a": 2,
  "why": "4かい くりかえすと 4かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 4,
   "per": 1
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-3"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ ⭐を かく\n │ ⭕を かく\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
  "opts": [
   "10かい",
   "7かい",
   "5かい"
  ],
  "a": 2,
  "why": "1しゅうに 1かいずつ。5しゅうで 5かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 5
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-4"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ ⭐を かく\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "3かい",
   "4かい"
  ],
  "a": 1,
  "why": "3かい くりかえすと 3かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 3,
   "per": 1
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-5"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 🔔を ならす\n │ 🦘 ジャンプする\n ↓\nおわり\n\nかね🔔は ぜんぶで なんかい？",
  "opts": [
   "10かい",
   "5かい",
   "7かい"
  ],
  "a": 1,
  "why": "1しゅうに 1かいずつ。5しゅうで 5かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 5
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-6"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 👏 てを たたく\n ↓\nおわり\n\nはくしゅ👏は ぜんぶで なんかい？",
  "opts": [
   "8かい",
   "4かい",
   "5かい"
  ],
  "a": 1,
  "why": "4かい くりかえすと 4かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 4,
   "per": 1
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-7"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 🦘 ジャンプする\n │ 🦘 ジャンプする\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "7かい",
   "10かい",
   "15かい"
  ],
  "a": 1,
  "why": "1しゅうで 2かい。5しゅうで 10かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 5,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-8"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🦘 ジャンプする\n │ ⭕を かく\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "4かい",
   "8かい",
   "6かい"
  ],
  "a": 0,
  "why": "1しゅうに 1かいずつ。4しゅうで 4かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 4
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-9"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ ⭐を かく\n │ ⭕を かく\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
  "opts": [
   "8かい",
   "4かい",
   "6かい"
  ],
  "a": 1,
  "why": "1しゅうに 1かいずつ。4しゅうで 4かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 4
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-10"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ 🦘 ジャンプする\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "3かい",
   "4かい"
  ],
  "a": 1,
  "why": "3かい くりかえすと 3かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 3,
   "per": 1
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-11"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ ⭕を かく\n │ 👏 てを たたく\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "3かい",
   "5かい"
  ],
  "a": 1,
  "why": "1しゅうに 1かいずつ。3しゅうで 3かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 3
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-12"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🦘 ジャンプする\n │ 🦘 ジャンプする\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "8かい",
   "12かい",
   "6かい"
  ],
  "a": 0,
  "why": "1しゅうで 2かい。4しゅうで 8かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 4,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-13"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ ⭐を かく\n │ 🔔を ならす\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
  "opts": [
   "5かい",
   "7かい",
   "10かい"
  ],
  "a": 0,
  "why": "1しゅうに 1かいずつ。5しゅうで 5かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 5
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-14"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ ⭕を かく\n │ 🦘 ジャンプする\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "8かい",
   "4かい"
  ],
  "a": 2,
  "why": "1しゅうに 1かいずつ。4しゅうで 4かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 4
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-15"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 🦘 ジャンプする\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "10かい",
   "5かい"
  ],
  "a": 2,
  "why": "5かい くりかえすと 5かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 5,
   "per": 1
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-16"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ 🦘 ジャンプする\n │ 🦘 ジャンプする\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "5かい",
   "6かい",
   "9かい"
  ],
  "a": 1,
  "why": "1しゅうで 2かい。3しゅうで 6かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 3,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-17"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🔔を ならす\n │ ⭕を かく\n ↓\nおわり\n\nかね🔔は ぜんぶで なんかい？",
  "opts": [
   "4かい",
   "6かい",
   "8かい"
  ],
  "a": 0,
  "why": "1しゅうに 1かいずつ。4しゅうで 4かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 4
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-18"
 }
];
