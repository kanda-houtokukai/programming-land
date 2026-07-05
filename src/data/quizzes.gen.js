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
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🖍️ クレヨン",
   "✏️ えんぴつ",
   "📏 じょうぎ"
  ],
  "a": 2,
  "why": "えんぴつと クレヨンは「かく・ぬる」なかま。📏 じょうぎだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📏 じょうぎ",
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
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": []
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
   "✈️ ひこうき",
   "🚒 しょうぼうしゃ",
   "🚁 ヘリコプター"
  ],
  "a": 1,
  "why": "ヘリコプターと ひこうきは「そらを とぶ」なかま。🚒 しょうぼうしゃだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🚒 しょうぼうしゃ",
   "items": [
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies"
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
     "label": "🚁 ヘリコプター",
     "cat": "vehicle",
     "props": [
      "flies"
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
   "🐟 さかな",
   "🐙 たこ",
   "🐱 ねこ"
  ],
  "a": 2,
  "why": "たこと さかなは「みずの なかで くらす（つかう）」なかま。🐱 ねこだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐱 ねこ",
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
     "label": "🐙 たこ",
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
  "id": "nakama-n-3"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🔪 ほうちょう",
   "🔨 かなづち",
   "🪚 のこぎり"
  ],
  "a": 1,
  "why": "ほうちょうと のこぎりは「ものを きる」なかま。🔨 かなづちだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🔨 かなづち",
   "items": [
    {
     "label": "🔪 ほうちょう",
     "cat": "tool",
     "props": [
      "cut"
     ]
    },
    {
     "label": "🔨 かなづち",
     "cat": "tool",
     "props": []
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
  "id": "nakama-n-4"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐙 たこ",
   "🐝 はち",
   "🐟 さかな"
  ],
  "a": 1,
  "why": "たこと さかなは「みずの なかで くらす（つかう）」なかま。🐝 はちだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐝 はち",
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
   "🐟 さかな",
   "🐦 ことり",
   "🐙 たこ"
  ],
  "a": 1,
  "why": "たこと さかなは「みずの なかで くらす（つかう）」なかま。🐦 ことりだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐦 ことり",
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
   "🐮 うし",
   "🐟 さかな",
   "🐙 たこ"
  ],
  "a": 0,
  "why": "たこと さかなは「みずの なかで くらす（つかう）」なかま。🐮 うしだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
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
     "label": "🐟 さかな",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
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
  "id": "nakama-n-7"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🦁 ライオン",
   "🐟 さかな",
   "🐳 くじら"
  ],
  "a": 0,
  "why": "くじらと さかなは「みずの なかで くらす（つかう）」なかま。🦁 ライオンだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🦁 ライオン",
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
  "id": "nakama-n-8"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐳 くじら",
   "🐙 たこ",
   "🦋 ちょう"
  ],
  "a": 2,
  "why": "たこと くじらは「みずの なかで くらす（つかう）」なかま。🦋 ちょうだけ ちがうね",
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
     "label": "🐙 たこ",
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
  "id": "nakama-n-9"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "✈️ ひこうき",
   "🚗 くるま",
   "🚁 ヘリコプター"
  ],
  "a": 1,
  "why": "ヘリコプターと ひこうきは「そらを とぶ」なかま。🚗 くるまだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🚗 くるま",
   "items": [
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies"
     ]
    },
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": []
    },
    {
     "label": "🚁 ヘリコプター",
     "cat": "vehicle",
     "props": [
      "flies"
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
   "📓 ノート",
   "🖍️ クレヨン"
  ],
  "a": 1,
  "why": "えんぴつと クレヨンは「かく・ぬる」なかま。📓 ノートだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📓 ノート",
   "items": [
    {
     "label": "✏️ えんぴつ",
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
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw"
     ]
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
   "🐳 くじら",
   "🐶 いぬ",
   "🐟 さかな"
  ],
  "a": 1,
  "why": "さかなと くじらは「みずの なかで くらす（つかう）」なかま。🐶 いぬだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐶 いぬ",
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
     "label": "🐶 いぬ",
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
   "🐜 あり",
   "🐙 たこ",
   "🐟 さかな"
  ],
  "a": 0,
  "why": "さかなと たこは「みずの なかで くらす（つかう）」なかま。🐜 ありだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐜 あり",
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
     "label": "🐙 たこ",
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
   "🐳 くじら",
   "🐟 さかな",
   "🐜 あり"
  ],
  "a": 2,
  "why": "くじらと さかなは「みずの なかで くらす（つかう）」なかま。🐜 ありだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐜 あり",
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
     "label": "🐜 あり",
     "cat": "animal",
     "props": [
      "living",
      "natural"
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
   "🖌️ ふで",
   "✏️ えんぴつ",
   "📓 ノート"
  ],
  "a": 2,
  "why": "ふでと えんぴつは「かく・ぬる」なかま。📓 ノートだけ ちがうね",
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
     "label": "✏️ えんぴつ",
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
  "id": "nakama-n-15"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "✈️ ひこうき",
   "⛵ ふね",
   "🚁 ヘリコプター"
  ],
  "a": 1,
  "why": "ひこうきと ヘリコプターは「そらを とぶ」なかま。⛵ ふねだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "⛵ ふね",
   "items": [
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies"
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
     "label": "🚁 ヘリコプター",
     "cat": "vehicle",
     "props": [
      "flies"
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
   "🖍️ クレヨン"
  ],
  "a": 1,
  "why": "ふでと クレヨンは「かく・ぬる」なかま。✂️ はさみだけ ちがうね",
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
     "label": "🖍️ クレヨン",
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
   "🚁 ヘリコプター",
   "✈️ ひこうき",
   "🚲 じてんしゃ"
  ],
  "a": 2,
  "why": "ひこうきと ヘリコプターは「そらを とぶ」なかま。🚲 じてんしゃだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🚲 じてんしゃ",
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
     "label": "🚲 じてんしゃ",
     "cat": "vehicle",
     "props": []
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
   "🐘 ぞう",
   "🐳 くじら",
   "🐙 たこ"
  ],
  "a": 0,
  "why": "たこと くじらは「みずの なかで くらす（つかう）」なかま。🐘 ぞうだけ ちがうね",
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
     "label": "🐳 くじら",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
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
  "id": "nakama-n-19"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐟 さかな",
   "🦋 ちょう",
   "🐳 くじら"
  ],
  "a": 1,
  "why": "くじらと さかなは「みずの なかで くらす（つかう）」なかま。🦋 ちょうだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🦋 ちょう",
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
     "label": "🦋 ちょう",
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
   "🖌️ ふで",
   "📏 じょうぎ",
   "✏️ えんぴつ"
  ],
  "a": 1,
  "why": "えんぴつと ふでは「かく・ぬる」なかま。📏 じょうぎだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📏 じょうぎ",
   "items": [
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
  "id": "nakama-n-21"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🦋 ちょう",
   "🐝 はち",
   "🐰 うさぎ"
  ],
  "a": 2,
  "why": "ちょうと はちは「そらを とぶ」なかま。🐰 うさぎだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐰 うさぎ",
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
     "label": "🐝 はち",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
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
  "id": "nakama-n-22"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "✏️ えんぴつ",
   "✂️ はさみ",
   "🖍️ クレヨン"
  ],
  "a": 1,
  "why": "クレヨンと えんぴつは「かく・ぬる」なかま。✂️ はさみだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "✂️ はさみ",
   "items": [
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
  "id": "nakama-n-23"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐳 くじら",
   "🐮 うし",
   "🐙 たこ"
  ],
  "a": 1,
  "why": "くじらと たこは「みずの なかで くらす（つかう）」なかま。🐮 うしだけ ちがうね",
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
     "label": "🐮 うし",
     "cat": "animal",
     "props": [
      "living",
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
    }
   ]
  },
  "id": "nakama-n-24"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐜 あり",
   "🌻 ひまわり",
   "🔔 すず",
   "🐟 さかな"
  ],
  "a": 2,
  "why": "🔔 すずだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🔔 すず",
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
     "label": "🌻 ひまわり",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🔔 すず",
     "cat": "instrument",
     "props": [
      "sound"
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
  "id": "nakama-h-1"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍬 あめ",
   "🍰 ケーキ",
   "🍓 いちご",
   "🐳 くじら"
  ],
  "a": 3,
  "why": "🐳 くじらだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🐳 くじら",
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
  "id": "nakama-h-2"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍉 すいか",
   "🧅 たまねぎ",
   "⚽ ボール",
   "🥒 きゅうり"
  ],
  "a": 2,
  "why": "⚽ ボールだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "⚽ ボール",
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
     "label": "🧅 たまねぎ",
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
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural"
     ]
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
   "🐜 あり",
   "🌻 ひまわり",
   "🐳 くじら",
   "🥤 コップ"
  ],
  "a": 3,
  "why": "🥤 コップだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🥤 コップ",
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
     "label": "🌻 ひまわり",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "yellow"
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
     "label": "🥤 コップ",
     "cat": "tableware",
     "props": []
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
   "🥒 きゅうり",
   "📓 ノート",
   "🍰 ケーキ",
   "🍑 もも"
  ],
  "a": 1,
  "why": "📓 ノートだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "📓 ノート",
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
     "label": "📓 ノート",
     "cat": "stationery",
     "props": []
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
     "label": "🍑 もも",
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
   "🍓 いちご",
   "🍅 トマト",
   "🍰 ケーキ",
   "🔔 すず"
  ],
  "a": 3,
  "why": "🔔 すずだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🔔 すず",
   "items": [
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
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
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
  "id": "nakama-h-6"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍉 すいか",
   "🐙 たこ",
   "🍅 トマト",
   "📏 じょうぎ"
  ],
  "a": 3,
  "why": "📏 じょうぎだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "📏 じょうぎ",
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
     "label": "🐙 たこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "water"
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
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": []
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
   "🍫 チョコレート",
   "🍰 ケーキ",
   "✂️ はさみ",
   "🍎 りんご"
  ],
  "a": 2,
  "why": "✂️ はさみだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "✂️ はさみ",
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
     "label": "🍰 ケーキ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
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
  "id": "nakama-h-8"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐦 ことり",
   "🐘 ぞう",
   "🍬 あめ",
   "🌳 き"
  ],
  "a": 2,
  "why": "🍬 あめだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🍬 あめ",
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
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
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
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural"
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
   "🍰 ケーキ",
   "🍎 りんご",
   "🤖 ロボット",
   "🍅 トマト"
  ],
  "a": 2,
  "why": "🤖 ロボットだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🤖 ロボット",
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
     "label": "🤖 ロボット",
     "cat": "toy",
     "props": []
    },
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
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
   "🧅 たまねぎ",
   "🍦 アイスクリーム",
   "🍬 あめ",
   "🌻 ひまわり"
  ],
  "a": 3,
  "why": "🌻 ひまわりだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🌻 ひまわり",
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
     "label": "🍦 アイスクリーム",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
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
  "id": "nakama-h-11"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐰 うさぎ",
   "🥒 きゅうり",
   "🐜 あり",
   "🚂 きしゃ"
  ],
  "a": 3,
  "why": "🚂 きしゃだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🚂 きしゃ",
   "items": [
    {
     "label": "🐰 うさぎ",
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
     "label": "🚂 きしゃ",
     "cat": "vehicle",
     "props": []
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
   "🧸 ぬいぐるみ",
   "🌳 き",
   "🐮 うし",
   "🐶 いぬ"
  ],
  "a": 0,
  "why": "🧸 ぬいぐるみだけ いきものじゃ ないね",
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
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
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
  "id": "nakama-h-13"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🤖 ロボット",
   "🐙 たこ",
   "🌻 ひまわり",
   "🌷 チューリップ"
  ],
  "a": 0,
  "why": "🤖 ロボットだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🤖 ロボット",
   "items": [
    {
     "label": "🤖 ロボット",
     "cat": "toy",
     "props": []
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
     "label": "🌻 ひまわり",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "yellow"
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
  "id": "nakama-h-14"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐳 くじら",
   "🪨 いし",
   "✂️ はさみ",
   "🍇 ぶどう"
  ],
  "a": 2,
  "why": "✂️ はさみだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "✂️ はさみ",
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
     "label": "🪨 いし",
     "cat": "nature",
     "props": [
      "natural"
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
  "id": "nakama-h-15"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐟 さかな",
   "🚲 じてんしゃ",
   "🌷 チューリップ",
   "🐘 ぞう"
  ],
  "a": 1,
  "why": "🚲 じてんしゃだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🚲 じてんしゃ",
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
     "label": "🚲 じてんしゃ",
     "cat": "vehicle",
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
     "label": "🐘 ぞう",
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
   "👕 シャツ",
   "🐮 うし",
   "🐘 ぞう",
   "🍅 トマト"
  ],
  "a": 0,
  "why": "👕 シャツだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "👕 シャツ",
   "items": [
    {
     "label": "👕 シャツ",
     "cat": "clothing",
     "props": []
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
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
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
   "🌳 き",
   "⚽ ボール",
   "🌻 ひまわり",
   "🐱 ねこ"
  ],
  "a": 1,
  "why": "⚽ ボールだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "⚽ ボール",
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
     "label": "⚽ ボール",
     "cat": "toy",
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
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural"
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
   "🍬 あめ",
   "🥒 きゅうり",
   "🍉 すいか",
   "🚂 きしゃ"
  ],
  "a": 3,
  "why": "🚂 きしゃだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🚂 きしゃ",
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
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
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
     "label": "🚂 きしゃ",
     "cat": "vehicle",
     "props": []
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
   "🎸 ギター",
   "🦁 ライオン",
   "🪨 いし",
   "🐝 はち"
  ],
  "a": 0,
  "why": "🎸 ギターだけ ひとが つくった ものだね",
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
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
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
  "id": "nakama-h-20"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🧅 たまねぎ",
   "🍎 りんご",
   "🐦 ことり",
   "🍓 いちご"
  ],
  "a": 2,
  "why": "🐦 ことりだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🐦 ことり",
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
  "id": "nakama-h-21"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🍰 ケーキ",
   "🍬 あめ",
   "🍎 りんご",
   "🪨 いし"
  ],
  "a": 3,
  "why": "🪨 いしだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🪨 いし",
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
     "label": "🍬 あめ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
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
  "id": "nakama-h-22"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐘 ぞう",
   "🧅 たまねぎ",
   "🍦 アイスクリーム",
   "🍰 ケーキ"
  ],
  "a": 0,
  "why": "🐘 ぞうだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
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
     "label": "🧅 たまねぎ",
     "cat": "vegetable",
     "props": [
      "food",
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
     "label": "🍰 ケーキ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet"
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
   "🍑 もも",
   "🥕 にんじん",
   "🍬 あめ",
   "🚒 しょうぼうしゃ"
  ],
  "a": 3,
  "why": "🚒 しょうぼうしゃだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🚒 しょうぼうしゃ",
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
     "label": "🥕 にんじん",
     "cat": "vegetable",
     "props": [
      "food",
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
     "label": "🚒 しょうぼうしゃ",
     "cat": "vehicle",
     "props": [
      "red"
     ]
    }
   ]
  },
  "id": "nakama-h-24"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "⬇️ した",
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
  "id": "robot-e-1"
 },
 {
  "q": "「まえへ」を 4かい。なんマス すすむ？",
  "opts": [
   "5マス",
   "3マス",
   "4マス"
  ],
  "a": 2,
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
  "q": "⬇️ したを むいている ロボットが「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 2マス",
   "したに 2マス",
   "したに 3マス"
  ],
  "a": 1,
  "why": "むいている ほうこうに 2マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 1,
   "n": 2
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-3"
 },
 {
  "q": "⬇️ したを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬆️ うえ",
   "⬅️ ひだり"
  ],
  "a": 2,
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
  "id": "robot-e-4"
 },
 {
  "q": "「まえへ」を 5かい。なんマス すすむ？",
  "opts": [
   "4マス",
   "5マス",
   "6マス"
  ],
  "a": 1,
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
  "id": "robot-e-5"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 3マス",
   "したに 2マス",
   "みぎに 2マス"
  ],
  "a": 2,
  "why": "むいている ほうこうに 2マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 0,
   "n": 2
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-6"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "➡️ みぎ",
   "⬇️ した"
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
  "id": "robot-e-7"
 },
 {
  "q": "「まえへ」を 3かい。なんマス すすむ？",
  "opts": [
   "3マス",
   "2マス",
   "4マス"
  ],
  "a": 0,
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
  "id": "robot-e-8"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 2マス",
   "ひだりに 3マス",
   "うえに 2マス"
  ],
  "a": 0,
  "why": "むいている ほうこうに 2マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 2,
   "n": 2
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-9"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "➡️ みぎ",
   "⬇️ した"
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
  "id": "robot-e-10"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「まえへ 4マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 4マス",
   "ひだりに 5マス",
   "うえに 4マス"
  ],
  "a": 0,
  "why": "むいている ほうこうに 4マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 2,
   "n": 4
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-11"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 2,
  "why": "➡️ みぎから くるっと まわると ⬇️ しただね",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-12"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「まえへ 4マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 5マス",
   "みぎに 4マス",
   "うえに 4マス"
  ],
  "a": 2,
  "why": "むいている ほうこうに 4マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 3,
   "n": 4
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-13"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬅️ ひだり",
   "⬇️ した"
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
  "id": "robot-e-14"
 },
 {
  "q": "「まえへ」を 2かい。なんマス すすむ？",
  "opts": [
   "3マス",
   "1マス",
   "2マス"
  ],
  "a": 2,
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
  "id": "robot-e-15"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬇️ した",
   "➡️ みぎ"
  ],
  "a": 1,
  "why": "⬅️ ひだりから くるっと まわると ⬇️ しただね",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-16"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬆️ うえ",
   "⬅️ ひだり"
  ],
  "a": 1,
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
  "id": "robot-e-17"
 },
 {
  "q": "⬇️ したを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬇️ した",
   "⬅️ ひだり",
   "➡️ みぎ"
  ],
  "a": 2,
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
  "id": "robot-e-18"
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
  "id": "robot-e-19"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "➡️ みぎ",
   "⬇️ した"
  ],
  "a": 2,
  "why": "⬅️ ひだりから くるっと まわると ⬇️ しただね",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-20"
 },
 {
  "q": "⬇️ したを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬆️ うえ",
   "⬇️ した"
  ],
  "a": 2,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
   "turns": [
    "right",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-1"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 3マス・うえに 4マス",
   "ひだりに 3マス・うえに 3マス",
   "ひだりに 6マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
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
   "⬅️ ひだり",
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
  "q": "➡️ みぎを むいている ロボット。「まえへ 3マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 3マス・うえに 1マス",
   "みぎに 4マス",
   "みぎに 3マス・うえに 2マス"
  ],
  "a": 0,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
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
  "q": "⬅️ ひだりを むいている ロボットに「ひだりを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬆️ うえ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 1,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
    "left",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-5"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 3マス」→「ひだりを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 5マス",
   "ひだりに 3マス・したに 2マス",
   "ひだりに 3マス・したに 3マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
   "cmds": [
    3,
    "L",
    2
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-6"
 },
 {
  "q": "⬆️ うえを むいている ロボットに「みぎを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬆️ うえ",
   "➡️ みぎ",
   "⬇️ した"
  ],
  "a": 2,
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
  "id": "robot-n-7"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 2マス・うえに 4マス",
   "ひだりに 2マス・うえに 3マス",
   "ひだりに 5マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
   "cmds": [
    2,
    "R",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-8"
 },
 {
  "q": "➡️ みぎを むいている ロボットに「みぎを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬆️ うえ",
   "⬅️ ひだり"
  ],
  "a": 2,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-9"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "したに 6マス",
   "ひだりに 4マス・したに 3マス",
   "ひだりに 3マス・したに 3マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    3,
    "R",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-10"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬅️ ひだり",
   "⬇️ した",
   "⬆️ うえ"
  ],
  "a": 0,
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
  "id": "robot-n-11"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 2マス」→「ひだりを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 4マス・したに 2マス",
   "したに 5マス",
   "みぎに 3マス・したに 2マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    2,
    "L",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-12"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 4マス",
   "みぎに 3マス・したに 2マス",
   "みぎに 3マス・したに 1マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    3,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-13"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬅️ ひだり",
   "➡️ みぎ",
   "⬆️ うえ"
  ],
  "a": 0,
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
  "id": "robot-n-14"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 1マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "したに 3マス",
   "ひだりに 3マス・したに 1マス",
   "ひだりに 2マス・したに 1マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    1,
    "R",
    2
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-15"
 },
 {
  "q": "⬇️ したを むいている ロボットに「ひだりを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 2,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
   "turns": [
    "left",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-16"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 1マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 1マス・したに 2マス",
   "みぎに 2マス",
   "みぎに 1マス・したに 1マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    1,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-17"
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
  "id": "robot-n-18"
 },
 {
  "q": "⬇️ したを むいている ロボットに「みぎを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬆️ うえ",
   "⬇️ した"
  ],
  "a": 1,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
   "turns": [
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-19"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 4マス",
   "みぎに 2マス・したに 2マス",
   "みぎに 2マス・したに 3マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    2,
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
  "q": "➡️ みぎを むいている ロボットが「ひだりを むく」を 4かい。さいごに どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬆️ うえ",
   "⬅️ ひだり"
  ],
  "a": 0,
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
  "id": "robot-h-2"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 1マス」→「みぎを むく」→「まえへ 2マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 2マス",
   "うえに 4マス",
   "ひだりに 2マス"
  ],
  "a": 0,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    1,
    "R",
    2,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-3"
 },
 {
  "q": "「🔁2かい くりかえし［まえへ・まえへ・まえへ］」。ぜんぶで なんマス すすむ？",
  "opts": [
   "6マス",
   "5マス",
   "9マス"
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
  "id": "robot-h-4"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「みぎを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "⬇️ した",
   "⬆️ うえ",
   "⬅️ ひだり"
  ],
  "a": 0,
  "why": "4かい まわると もとに もどるよ。3かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
    "right",
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-5"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 1マス」→「ひだりを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 1マス・うえに 4マス",
   "みぎに 1マス・うえに 4マス",
   "うえに 5マス"
  ],
  "a": 1,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    2,
    "R",
    1,
    "L",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-6"
 },
 {
  "q": "「🔁4かい くりかえし［まえへ・まえへ・まえへ］」。ぜんぶで なんマス すすむ？",
  "opts": [
   "7マス",
   "15マス",
   "12マス"
  ],
  "a": 2,
  "why": "1かいで 3マス。4かい くりかえすと 12マスだね",
  "meta": {
   "kind": "robot-steps",
   "repeat": 4,
   "body": 3
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-7"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「みぎを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "➡️ みぎ",
   "⬇️ した"
  ],
  "a": 2,
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
  "q": "⬆️ うえを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 6マス",
   "ひだりに 1マス・うえに 1マス",
   "みぎに 1マス・うえに 1マス"
  ],
  "a": 2,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    3,
    "R",
    1,
    "R",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-9"
 },
 {
  "q": "「🔁3かい くりかえし［まえへ・まえへ・まえへ］」。ぜんぶで なんマス すすむ？",
  "opts": [
   "6マス",
   "9マス",
   "12マス"
  ],
  "a": 1,
  "why": "1かいで 3マス。3かい くりかえすと 9マスだね",
  "meta": {
   "kind": "robot-steps",
   "repeat": 3,
   "body": 3
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-10"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "⬇️ した",
   "⬆️ うえ",
   "➡️ みぎ"
  ],
  "a": 0,
  "why": "4かい まわると もとに もどるよ。5かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
    "left",
    "left",
    "left",
    "left",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-11"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 2マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 2マス",
   "したに 6マス",
   "みぎに 2マス"
  ],
  "a": 0,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
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
  "id": "robot-h-12"
 },
 {
  "q": "「🔁3かい くりかえし［まえへ・まえへ］」。ぜんぶで なんマス すすむ？",
  "opts": [
   "6マス",
   "5マス",
   "8マス"
  ],
  "a": 0,
  "why": "1かいで 2マス。3かい くりかえすと 6マスだね",
  "meta": {
   "kind": "robot-steps",
   "repeat": 3,
   "body": 2
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-13"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "⬇️ した",
   "⬆️ うえ",
   "➡️ みぎ"
  ],
  "a": 1,
  "why": "4かい まわると もとに もどるよ。3かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
    "left",
    "left",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-14"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 3マス・うえに 1マス",
   "みぎに 3マス・うえに 1マス",
   "うえに 6マス"
  ],
  "a": 1,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    2,
    "R",
    3,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-15"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「みぎを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "⬇️ した",
   "⬆️ うえ"
  ],
  "a": 2,
  "why": "4かい まわると もとに もどるよ。3かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "right",
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-16"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 1マス」→「みぎを むく」→「まえへ 2マス」→「ひだりを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 2マス・うえに 3マス",
   "みぎに 2マス・うえに 3マス",
   "うえに 5マス"
  ],
  "a": 1,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    1,
    "R",
    2,
    "L",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-17"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「みぎを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬅️ ひだり"
  ],
  "a": 0,
  "why": "4かい まわると もとに もどるよ。3かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
    "right",
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-18"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 1マス」→「ひだりを むく」→「まえへ 2マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 3マス・うえに 2マス",
   "ひだりに 3マス・したに 2マス",
   "ひだりに 5マス"
  ],
  "a": 1,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
   "cmds": [
    1,
    "L",
    2,
    "R",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-19"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "⬆️ うえ",
   "⬇️ した"
  ],
  "a": 1,
  "why": "4かい まわると もとに もどるよ。3かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
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
  "q": "「たんじょうびかい」の フローチャートだよ。\n\nはじめ\n ↓\n🎈 かざりつけを する\n ↓\n🎂 ケーキを だす\n ↓\n🎵 うたを うたう\n ↓\n🎁 プレゼントを あける\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🎈 かざりつけを する",
   "🎁 プレゼントを あける",
   "🎂 ケーキを だす"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🎈 かざりつけを する",
    "🎂 ケーキを だす",
    "🎵 うたを うたう",
    "🎁 プレゼントを あける"
   ],
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-1"
 },
 {
  "q": "「おでかけの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🧢 ぼうしを かぶる\n ↓\n🎒 リュックを せおう\n ↓\n🚪 いえの かぎを しめる\n ↓\n🚶 しゅっぱつ！\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🧢 ぼうしを かぶる",
   "🚪 いえの かぎを しめる",
   "🎒 リュックを せおう"
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
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-2"
 },
 {
  "q": "「キャンプ」の フローチャートだよ。\n\nはじめ\n ↓\n⛺ テントを はる\n ↓\n🔥 ひを おこす\n ↓\n🍖 ごはんを つくる\n ↓\n🌙 ねる\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🔥 ひを おこす",
   "⛺ テントを はる",
   "🍖 ごはんを つくる"
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
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-3"
 },
 {
  "q": "「おでかけの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🧢 ぼうしを かぶる\n ↓\n🎒 リュックを せおう\n ↓\n🚪 いえの かぎを しめる\n ↓\n🚶 しゅっぱつ！\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🧢 ぼうしを かぶる",
   "🚶 しゅっぱつ！",
   "🚪 いえの かぎを しめる"
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
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-4"
 },
 {
  "q": "「おそうじ」の フローチャートだよ。\n\nはじめ\n ↓\n🧹 ほうきで はく\n ↓\n🧽 ぞうきんで ふく\n ↓\n🗑️ ごみを すてる\n ↓\n🧼 てを あらう\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🗑️ ごみを すてる",
   "🧽 ぞうきんで ふく",
   "🧼 てを あらう"
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
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-5"
 },
 {
  "q": "「あさの したく」の フローチャートだよ。\n\nはじめ\n ↓\n🧼 かおを あらう\n ↓\n🍞 あさごはんを たべる\n ↓\n🦷 はを みがく\n ↓\n🎒 じゅんびを する\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🦷 はを みがく",
   "🍞 あさごはんを たべる",
   "🧼 かおを あらう"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🧼 かおを あらう",
    "🍞 あさごはんを たべる",
    "🦷 はを みがく",
    "🎒 じゅんびを する"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-6"
 },
 {
  "q": "「あさの したく」の フローチャートだよ。\n\nはじめ\n ↓\n🧼 かおを あらう\n ↓\n🍞 あさごはんを たべる\n ↓\n🦷 はを みがく\n ↓\n🎒 じゅんびを する\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🧼 かおを あらう",
   "🍞 あさごはんを たべる",
   "🎒 じゅんびを する"
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
  "q": "「あさの したく」の フローチャートだよ。\n\nはじめ\n ↓\n🧼 かおを あらう\n ↓\n🍞 あさごはんを たべる\n ↓\n🦷 はを みがく\n ↓\n🎒 じゅんびを する\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🎒 じゅんびを する",
   "🧼 かおを あらう",
   "🦷 はを みがく"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🧼 かおを あらう",
    "🍞 あさごはんを たべる",
    "🦷 はを みがく",
    "🎒 じゅんびを する"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-8"
 },
 {
  "q": "「おそうじ」の フローチャートだよ。\n\nはじめ\n ↓\n🧹 ほうきで はく\n ↓\n🧽 ぞうきんで ふく\n ↓\n🗑️ ごみを すてる\n ↓\n🧼 てを あらう\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🗑️ ごみを すてる",
   "🧼 てを あらう",
   "🧹 ほうきで はく"
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
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-9"
 },
 {
  "q": "「あさの したく」の フローチャートだよ。\n\nはじめ\n ↓\n🧼 かおを あらう\n ↓\n🍞 あさごはんを たべる\n ↓\n🦷 はを みがく\n ↓\n🎒 じゅんびを する\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🦷 はを みがく",
   "🍞 あさごはんを たべる",
   "🎒 じゅんびを する"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🧼 かおを あらう",
    "🍞 あさごはんを たべる",
    "🦷 はを みがく",
    "🎒 じゅんびを する"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-10"
 },
 {
  "q": "「おでかけの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🧢 ぼうしを かぶる\n ↓\n🎒 リュックを せおう\n ↓\n🚪 いえの かぎを しめる\n ↓\n🚶 しゅっぱつ！\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🚶 しゅっぱつ！",
   "🧢 ぼうしを かぶる",
   "🎒 リュックを せおう"
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
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-11"
 },
 {
  "q": "「キャンプ」の フローチャートだよ。\n\nはじめ\n ↓\n⛺ テントを はる\n ↓\n🔥 ひを おこす\n ↓\n🍖 ごはんを つくる\n ↓\n🌙 ねる\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🍖 ごはんを つくる",
   "⛺ テントを はる",
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
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-12"
 },
 {
  "q": "「せんたく」の フローチャートだよ。\n\nはじめ\n ↓\n👕 ふくを あつめる\n ↓\n🫧 せんたくきを まわす\n ↓\n🌞 ほす\n ↓\n📦 たたんで しまう\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "👕 ふくを あつめる",
   "🫧 せんたくきを まわす",
   "🌞 ほす"
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
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-13"
 },
 {
  "q": "「カレーづくり」の フローチャートだよ。\n\nはじめ\n ↓\n🔪 やさいを きる\n ↓\n🍳 いためる\n ↓\n💧 みずを いれて にこむ\n ↓\n🍛 ルーを いれる\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🍳 いためる",
   "🍛 ルーを いれる",
   "💧 みずを いれて にこむ"
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
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-14"
 },
 {
  "q": "「おそうじ」の フローチャートだよ。\n\nはじめ\n ↓\n🧹 ほうきで はく\n ↓\n🧽 ぞうきんで ふく\n ↓\n🗑️ ごみを すてる\n ↓\n🧼 てを あらう\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🧼 てを あらう",
   "🗑️ ごみを すてる",
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
  "id": "yomitori-e-15"
 },
 {
  "q": "「おかいもの」の フローチャートだよ。\n\nはじめ\n ↓\n📝 メモを かく\n ↓\n🚶 おみせに いく\n ↓\n🛒 かごに いれる\n ↓\n💰 おかねを はらう\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🛒 かごに いれる",
   "📝 メモを かく",
   "💰 おかねを はらう"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "📝 メモを かく",
    "🚶 おみせに いく",
    "🛒 かごに いれる",
    "💰 おかねを はらう"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-16"
 },
 {
  "q": "「カレーづくり」の フローチャートだよ。\n\nはじめ\n ↓\n🔪 やさいを きる\n ↓\n🍳 いためる\n ↓\n💧 みずを いれて にこむ\n ↓\n🍛 ルーを いれる\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🍛 ルーを いれる",
   "🍳 いためる",
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
  "id": "yomitori-e-17"
 },
 {
  "q": "「たんじょうびかい」の フローチャートだよ。\n\nはじめ\n ↓\n🎈 かざりつけを する\n ↓\n🎂 ケーキを だす\n ↓\n🎵 うたを うたう\n ↓\n🎁 プレゼントを あける\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🎁 プレゼントを あける",
   "🎈 かざりつけを する",
   "🎂 ケーキを だす"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🎈 かざりつけを する",
    "🎂 ケーキを だす",
    "🎵 うたを うたう",
    "🎁 プレゼントを あける"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-18"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nてが よごれている？\n ├─ はい → 🧼 てを あらう\n └─ いいえ → 🍞 そのまま たべる\n\n「てが よごれている？」が「はい」のとき、どうする？",
  "opts": [
   "🍞 そのまま たべる",
   "🌞 ほして かわかす",
   "🧼 てを あらう"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🧼 てを あらう",
   "no": "🍞 そのまま たべる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-1"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nのどが かわいた？\n ├─ はい → 🥤 みずを のむ\n └─ いいえ → ⚽ あそびつづける\n\n「のどが かわいた？」が「いいえ」のとき、どうする？",
  "opts": [
   "⚽ あそびつづける",
   "🥤 みずを のむ",
   "🏫 がっこうに いく"
  ],
  "a": 0,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🥤 みずを のむ",
   "no": "⚽ あそびつづける"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-2"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nてが よごれている？\n ├─ はい → 🧼 てを あらう\n └─ いいえ → 🍞 そのまま たべる\n\n「てが よごれている？」が「いいえ」のとき、どうする？",
  "opts": [
   "🧼 てを あらう",
   "🚶 わたる",
   "🍞 そのまま たべる"
  ],
  "a": 2,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🧼 てを あらう",
   "no": "🍞 そのまま たべる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-3"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nさむい？\n ├─ はい → 🧥 うわぎを きる\n └─ いいえ → 👕 そのままで いい\n\n「さむい？」が「はい」のとき、どうする？",
  "opts": [
   "🥤 みずを のむ",
   "🧥 うわぎを きる",
   "👕 そのままで いい"
  ],
  "a": 1,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🧥 うわぎを きる",
   "no": "👕 そのままで いい"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-4"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nへやが くらい？\n ├─ はい → 💡 でんきを つける\n └─ いいえ → そのまま あそぶ\n\n「へやが くらい？」が「はい」のとき、どうする？",
  "opts": [
   "💡 でんきを つける",
   "🌞 ほして かわかす",
   "そのまま あそぶ"
  ],
  "a": 0,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "💡 でんきを つける",
   "no": "そのまま あそぶ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-5"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nのどが かわいた？\n ├─ はい → 🥤 みずを のむ\n └─ いいえ → ⚽ あそびつづける\n\n「のどが かわいた？」が「はい」のとき、どうする？",
  "opts": [
   "⚽ あそびつづける",
   "🥤 みずを のむ",
   "💡 でんきを つける"
  ],
  "a": 1,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🥤 みずを のむ",
   "no": "⚽ あそびつづける"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-6"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nてが よごれている？\n ├─ はい → 🧼 てを あらう\n └─ いいえ → 🍞 そのまま たべる\n\n「てが よごれている？」が「はい」のとき、どうする？",
  "opts": [
   "🧼 てを あらう",
   "🍞 そのまま たべる",
   "☂️ かさを もっていく"
  ],
  "a": 0,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🧼 てを あらう",
   "no": "🍞 そのまま たべる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-7"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nしんごうが あか？\n ├─ はい → 🛑 とまって まつ\n └─ いいえ → 🚶 わたる\n\n「しんごうが あか？」が「はい」のとき、どうする？",
  "opts": [
   "🚶 わたる",
   "🍙 おにぎりを たべる",
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
  "id": "yomitori-n-8"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nしんごうが あか？\n ├─ はい → 🛑 とまって まつ\n └─ いいえ → 🚶 わたる\n\n「しんごうが あか？」が「はい」のとき、どうする？",
  "opts": [
   "🚶 わたる",
   "🛏️ おうちで やすむ",
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
  "id": "yomitori-n-9"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nあめが ふっている？\n ├─ はい → ☂️ かさを もっていく\n └─ いいえ → 🧢 ぼうしを かぶる\n\n「あめが ふっている？」が「はい」のとき、どうする？",
  "opts": [
   "🧢 ぼうしを かぶる",
   "🧼 てを あらう",
   "☂️ かさを もっていく"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "☂️ かさを もっていく",
   "no": "🧢 ぼうしを かぶる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-10"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nあめが ふっている？\n ├─ はい → ☂️ かさを もっていく\n └─ いいえ → 🧢 ぼうしを かぶる\n\n「あめが ふっている？」が「はい」のとき、どうする？",
  "opts": [
   "🛑 とまって まつ",
   "🧢 ぼうしを かぶる",
   "☂️ かさを もっていく"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "☂️ かさを もっていく",
   "no": "🧢 ぼうしを かぶる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-11"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nねつが ある？\n ├─ はい → 🛏️ おうちで やすむ\n └─ いいえ → 🏫 がっこうに いく\n\n「ねつが ある？」が「はい」のとき、どうする？",
  "opts": [
   "🛏️ おうちで やすむ",
   "🏫 がっこうに いく",
   "🌞 ほして かわかす"
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
  "id": "yomitori-n-12"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nしんごうが あか？\n ├─ はい → 🛑 とまって まつ\n └─ いいえ → 🚶 わたる\n\n「しんごうが あか？」が「いいえ」のとき、どうする？",
  "opts": [
   "⚽ あそびつづける",
   "🚶 わたる",
   "🛑 とまって まつ"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🛑 とまって まつ",
   "no": "🚶 わたる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-13"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nくつが ぬれている？\n ├─ はい → 🌞 ほして かわかす\n └─ いいえ → 👟 そのまま はく\n\n「くつが ぬれている？」が「はい」のとき、どうする？",
  "opts": [
   "🍙 おにぎりを たべる",
   "👟 そのまま はく",
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
  "id": "yomitori-n-14"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nくつが ぬれている？\n ├─ はい → 🌞 ほして かわかす\n └─ いいえ → 👟 そのまま はく\n\n「くつが ぬれている？」が「いいえ」のとき、どうする？",
  "opts": [
   "🌞 ほして かわかす",
   "👟 そのまま はく",
   "🏫 がっこうに いく"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🌞 ほして かわかす",
   "no": "👟 そのまま はく"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-15"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nしんごうが あか？\n ├─ はい → 🛑 とまって まつ\n └─ いいえ → 🚶 わたる\n\n「しんごうが あか？」が「いいえ」のとき、どうする？",
  "opts": [
   "🛑 とまって まつ",
   "🚶 わたる",
   "📚 ほんを よむ"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🛑 とまって まつ",
   "no": "🚶 わたる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-16"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nへやが くらい？\n ├─ はい → 💡 でんきを つける\n └─ いいえ → そのまま あそぶ\n\n「へやが くらい？」が「いいえ」のとき、どうする？",
  "opts": [
   "そのまま あそぶ",
   "👕 そのままで いい",
   "💡 でんきを つける"
  ],
  "a": 0,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "💡 でんきを つける",
   "no": "そのまま あそぶ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-17"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nあめが ふっている？\n ├─ はい → ☂️ かさを もっていく\n └─ いいえ → 🧢 ぼうしを かぶる\n\n「あめが ふっている？」が「いいえ」のとき、どうする？",
  "opts": [
   "☂️ かさを もっていく",
   "そのまま あそぶ",
   "🧢 ぼうしを かぶる"
  ],
  "a": 2,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "☂️ かさを もっていく",
   "no": "🧢 ぼうしを かぶる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-18"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🦘 ジャンプする\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "4かい",
   "8かい",
   "5かい"
  ],
  "a": 0,
  "why": "4かい くりかえすと 4かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 4,
   "per": 1
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-1"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ 👏 てを たたく\n │ ⭕を かく\n ↓\nおわり\n\nはくしゅ👏は ぜんぶで なんかい？",
  "opts": [
   "3かい",
   "5かい",
   "6かい"
  ],
  "a": 0,
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
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ 👏 てを たたく\n │ 👏 てを たたく\n ↓\nおわり\n\nはくしゅ👏は ぜんぶで なんかい？",
  "opts": [
   "9かい",
   "5かい",
   "6かい"
  ],
  "a": 2,
  "why": "1しゅうで 2かい。3しゅうで 6かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 3,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-3"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 👏 てを たたく\n │ 👏 てを たたく\n ↓\nおわり\n\nはくしゅ👏は ぜんぶで なんかい？",
  "opts": [
   "7かい",
   "15かい",
   "10かい"
  ],
  "a": 2,
  "why": "1しゅうで 2かい。5しゅうで 10かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 5,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-4"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🦘 ジャンプする\n │ ⭐を かく\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "8かい",
   "6かい",
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
  "id": "yomitori-h-5"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ 🦘 ジャンプする\n │ 🦘 ジャンプする\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "5かい",
   "9かい"
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
  "id": "yomitori-h-6"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ ⭐を かく\n │ 🦘 ジャンプする\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
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
  "id": "yomitori-h-7"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 🔔を ならす\n │ 🔔を ならす\n ↓\nおわり\n\nかね🔔は ぜんぶで なんかい？",
  "opts": [
   "10かい",
   "7かい",
   "15かい"
  ],
  "a": 0,
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
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ ⭐を かく\n │ ⭕を かく\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
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
  "id": "yomitori-h-9"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🔔を ならす\n │ 🔔を ならす\n ↓\nおわり\n\nかね🔔は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "8かい",
   "12かい"
  ],
  "a": 1,
  "why": "1しゅうで 2かい。4しゅうで 8かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 4,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-10"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 👏 てを たたく\n │ ⭕を かく\n ↓\nおわり\n\nはくしゅ👏は ぜんぶで なんかい？",
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
  "id": "yomitori-h-11"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ ⭕を かく\n │ ⭕を かく\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
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
  "id": "yomitori-h-12"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ ⭕を かく\n │ 🔔を ならす\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
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
  "id": "yomitori-h-13"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ ⭕を かく\n │ ⭕を かく\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
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
  "id": "yomitori-h-14"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ ⭕を かく\n │ 🦘 ジャンプする\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
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
  "id": "yomitori-h-15"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🔔を ならす\n │ ⭐を かく\n ↓\nおわり\n\nかね🔔は ぜんぶで なんかい？",
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
  "id": "yomitori-h-16"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ ⭐を かく\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "5かい",
   "10かい"
  ],
  "a": 1,
  "why": "5かい くりかえすと 5かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 5,
   "per": 1
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-17"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ ⭕を かく\n │ 🔔を ならす\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
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
  "id": "yomitori-h-18"
 }
];
