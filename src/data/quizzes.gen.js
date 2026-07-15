/* 自動生成クイズ（tools/quizgen.mjs --write・シード固定・P6e: 5カテゴリ全数メタ付き生成）。手で編集しない。
   素材データ（因果チェーン・タグ辞書）: tools/quiz-data.mjs ＝ 人手で品質保証する場所
   再生成: node tools/quizgen.mjs --write → npm run verify で全数検証（難易度タグ照合込み） */
export const GEN_QUIZZES = [
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "ふうせんを ふくらませるよ。さいしょに することは？",
  "opts": [
   "💨 いきを ふきこむ",
   "🎈 おおきく する",
   "🤲 くちを しばる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 💨 いきを ふきこむ → 🎈 おおきく する → 🤲 くちを しばる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "💨 いきを ふきこむ",
    "🎈 おおきく する",
    "🤲 くちを しばる"
   ],
   "chainId": "fusen"
  },
  "id": "junban-e-1"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "かみひこうきで あそぶよ。いちばん さいごに することは？",
  "opts": [
   "🏃 ひろいに いく",
   "✈️ とばす",
   "📄 かみを おる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 📄 かみを おる → ✈️ とばす → 🏃 ひろいに いく だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "📄 かみを おる",
    "✈️ とばす",
    "🏃 ひろいに いく"
   ],
   "chainId": "kamihikouki"
  },
  "id": "junban-e-2"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "はなに みずを あげるよ。さいしょに することは？",
  "opts": [
   "🌼 はなが げんきに なる",
   "💧 はなに かける",
   "🚰 じょうろに みずを いれる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🚰 じょうろに みずを いれる → 💧 はなに かける → 🌼 はなが げんきに なる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🚰 じょうろに みずを いれる",
    "💧 はなに かける",
    "🌼 はなが げんきに なる"
   ],
   "chainId": "mizuyari"
  },
  "id": "junban-e-3"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "きんぎょに えさを あげるよ。いちばん さいごに することは？",
  "opts": [
   "🫳 えさを つまむ",
   "🐟 すいそうに いれる",
   "😊 きんぎょが たべる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🫳 えさを つまむ → 🐟 すいそうに いれる → 😊 きんぎょが たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🫳 えさを つまむ",
    "🐟 すいそうに いれる",
    "😊 きんぎょが たべる"
   ],
   "chainId": "kingyo"
  },
  "id": "junban-e-4"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "かみひこうきで あそぶよ。さいしょに することは？",
  "opts": [
   "✈️ とばす",
   "🏃 ひろいに いく",
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
  "id": "junban-e-5"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "ゆきだるまを つくるよ。さいしょに することは？",
  "opts": [
   "⚪ ゆきを まるめる",
   "😊 かおを つける",
   "⛄ ふたつ かさねる"
  ],
  "a": 0,
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
  "id": "junban-e-6"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "はみがきを するよ。いちばん さいごに することは？",
  "opts": [
   "💦 くちを ゆすぐ",
   "✨ はを みがく",
   "🪥 はみがきこを つける"
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
  "id": "junban-e-7"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "シャボンだまで あそぶよ。さいしょに することは？",
  "opts": [
   "💨 ふーっと ふく",
   "🥤 えきを つける",
   "✨ たくさん とんでいく"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🥤 えきを つける → 💨 ふーっと ふく → ✨ たくさん とんでいく だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🥤 えきを つける",
    "💨 ふーっと ふく",
    "✨ たくさん とんでいく"
   ],
   "chainId": "shabon"
  },
  "id": "junban-e-8"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "トーストを たべるよ。いちばん さいごに することは？",
  "opts": [
   "🍓 ジャムを ぬる",
   "😋 たべる",
   "🍞 パンを やく"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🍞 パンを やく → 🍓 ジャムを ぬる → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🍞 パンを やく",
    "🍓 ジャムを ぬる",
    "😋 たべる"
   ],
   "chainId": "toast"
  },
  "id": "junban-e-9"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "おそとに いくよ。いちばん さいごに することは？",
  "opts": [
   "🧦 くつしたを はく",
   "🚶 そとを あるく",
   "👟 くつを はく"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🧦 くつしたを はく → 👟 くつを はく → 🚶 そとを あるく だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🧦 くつしたを はく",
    "👟 くつを はく",
    "🚶 そとを あるく"
   ],
   "chainId": "kutsu"
  },
  "id": "junban-e-10"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "おてがみを おくるよ。いちばん さいごに することは？",
  "opts": [
   "✏️ てがみを かく",
   "✉️ ふうとうに いれる",
   "📮 ポストに だす"
  ],
  "a": 2,
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
  "id": "junban-e-11"
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
  "id": "junban-e-12"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "ころんで ひざを すりむいたよ。いちばん さいごに することは？",
  "opts": [
   "🩹 ばんそうこうを はる",
   "🏃 また あそぶ",
   "💧 きずを あらう"
  ],
  "a": 1,
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
  "id": "junban-e-13"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "スイカを たべるよ。さいしょに することは？",
  "opts": [
   "🔪 きって わける",
   "🗑️ かわを すてる",
   "😋 たべる"
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
  "id": "junban-e-14"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "アイスを たべるよ。いちばん さいごに することは？",
  "opts": [
   "😋 とけるまえに たべる",
   "🛒 アイスを かう",
   "🫳 ふくろを あける"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🛒 アイスを かう → 🫳 ふくろを あける → 😋 とけるまえに たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🛒 アイスを かう",
    "🫳 ふくろを あける",
    "😋 とけるまえに たべる"
   ],
   "chainId": "ice"
  },
  "id": "junban-e-15"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "くつを あらうよ。さいしょに することは？",
  "opts": [
   "🧼 あわで ごしごし あらう",
   "🌞 ほして かわかす",
   "💦 みずで ながす"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🧼 あわで ごしごし あらう → 💦 みずで ながす → 🌞 ほして かわかす だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🧼 あわで ごしごし あらう",
    "💦 みずで ながす",
    "🌞 ほして かわかす"
   ],
   "chainId": "kutsuarai"
  },
  "id": "junban-e-16"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "シャボンだまで あそぶよ。いちばん さいごに することは？",
  "opts": [
   "🥤 えきを つける",
   "💨 ふーっと ふく",
   "✨ たくさん とんでいく"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🥤 えきを つける → 💨 ふーっと ふく → ✨ たくさん とんでいく だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🥤 えきを つける",
    "💨 ふーっと ふく",
    "✨ たくさん とんでいく"
   ],
   "chainId": "shabon"
  },
  "id": "junban-e-17"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "おそとに いくよ。さいしょに することは？",
  "opts": [
   "🧦 くつしたを はく",
   "🚶 そとを あるく",
   "👟 くつを はく"
  ],
  "a": 0,
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
  "id": "junban-e-18"
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
  "id": "junban-e-19"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "たまごやきを つくるよ。さいしょに することは？",
  "opts": [
   "🍳 やく",
   "🥣 かきまぜる",
   "🥚 たまごを わる"
  ],
  "a": 2,
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
  "id": "junban-e-20"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "くつを あらうよ。いちばん さいごに することは？",
  "opts": [
   "🧼 あわで ごしごし あらう",
   "💦 みずで ながす",
   "🌞 ほして かわかす"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🧼 あわで ごしごし あらう → 💦 みずで ながす → 🌞 ほして かわかす だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🧼 あわで ごしごし あらう",
    "💦 みずで ながす",
    "🌞 ほして かわかす"
   ],
   "chainId": "kutsuarai"
  },
  "id": "junban-e-21"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "たまごやきを つくるよ。いちばん さいごに することは？",
  "opts": [
   "🍳 やく",
   "🥚 たまごを わる",
   "🥣 かきまぜる"
  ],
  "a": 0,
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
  "id": "junban-e-22"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "としょかんの ほん。さいしょに することは？",
  "opts": [
   "🏫 としょかんに かえす",
   "📚 ほんを かりる",
   "📖 よむ"
  ],
  "a": 1,
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
  "id": "junban-e-23"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "おかしを たべるよ。いちばん さいごに することは？",
  "opts": [
   "🫳 ふくろを あける",
   "😋 たべる",
   "🗑️ ふくろを すてる"
  ],
  "a": 2,
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
  "id": "junban-e-24"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "ヨーグルトを たべるよ。さいしょに することは？",
  "opts": [
   "🫳 ふたを あける",
   "😋 たべる",
   "🗑️ カップを すてる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🫳 ふたを あける → 😋 たべる → 🗑️ カップを すてる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🫳 ふたを あける",
    "😋 たべる",
    "🗑️ カップを すてる"
   ],
   "chainId": "yogurt"
  },
  "id": "junban-e-25"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "おてがみを おくるよ。さいしょに することは？",
  "opts": [
   "✉️ ふうとうに いれる",
   "✏️ てがみを かく",
   "📮 ポストに だす"
  ],
  "a": 1,
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
  "id": "junban-e-26"
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
  "id": "junban-e-27"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "バナナを たべるよ。さいしょに することは？",
  "opts": [
   "🗑️ かわを すてる",
   "🍌 かわを むく",
   "😋 たべる"
  ],
  "a": 1,
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
  "id": "junban-e-28"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "トーストを たべるよ。さいしょに することは？",
  "opts": [
   "🍓 ジャムを ぬる",
   "🍞 パンを やく",
   "😋 たべる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🍞 パンを やく → 🍓 ジャムを ぬる → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🍞 パンを やく",
    "🍓 ジャムを ぬる",
    "😋 たべる"
   ],
   "chainId": "toast"
  },
  "id": "junban-e-29"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "しゃしんを かざるよ。いちばん さいごに することは？",
  "opts": [
   "📷 しゃしんを とる",
   "🖼️ かべに かざる",
   "🖨️ プリントする"
  ],
  "a": 1,
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
  "id": "junban-e-30"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "ジュースを のむよ。さいしょに することは？",
  "opts": [
   "😋 のむ",
   "🫧 コップを あらう",
   "🫗 コップに そそぐ"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🫗 コップに そそぐ → 😋 のむ → 🫧 コップを あらう だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🫗 コップに そそぐ",
    "😋 のむ",
    "🫧 コップを あらう"
   ],
   "chainId": "juice"
  },
  "id": "junban-e-31"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "ヨーグルトを たべるよ。いちばん さいごに することは？",
  "opts": [
   "😋 たべる",
   "🗑️ カップを すてる",
   "🫳 ふたを あける"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🫳 ふたを あける → 😋 たべる → 🗑️ カップを すてる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🫳 ふたを あける",
    "😋 たべる",
    "🗑️ カップを すてる"
   ],
   "chainId": "yogurt"
  },
  "id": "junban-e-32"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "おちゃを いれるよ。いちばん さいごに することは？",
  "opts": [
   "😋 のむ",
   "🔥 おゆを わかす",
   "🍵 おちゃを いれる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🔥 おゆを わかす → 🍵 おちゃを いれる → 😋 のむ だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🔥 おゆを わかす",
    "🍵 おちゃを いれる",
    "😋 のむ"
   ],
   "chainId": "ocha"
  },
  "id": "junban-e-33"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "はみがきを するよ。さいしょに することは？",
  "opts": [
   "💦 くちを ゆすぐ",
   "🪥 はみがきこを つける",
   "✨ はを みがく"
  ],
  "a": 1,
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
  "id": "junban-e-34"
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
  "id": "junban-e-35"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "アイスを たべるよ。さいしょに することは？",
  "opts": [
   "🛒 アイスを かう",
   "🫳 ふくろを あける",
   "😋 とけるまえに たべる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🛒 アイスを かう → 🫳 ふくろを あける → 😋 とけるまえに たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🛒 アイスを かう",
    "🫳 ふくろを あける",
    "😋 とけるまえに たべる"
   ],
   "chainId": "ice"
  },
  "id": "junban-e-36"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "スイカを たべるよ。いちばん さいごに することは？",
  "opts": [
   "😋 たべる",
   "🔪 きって わける",
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
  "id": "junban-e-37"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "プレゼントを あけるよ。さいしょに することは？",
  "opts": [
   "🎀 リボンを ほどく",
   "🎁 はこを あける",
   "🧸 なかみを だす"
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
  "id": "junban-e-38"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "プレゼントを あけるよ。いちばん さいごに することは？",
  "opts": [
   "🎁 はこを あける",
   "🎀 リボンを ほどく",
   "🧸 なかみを だす"
  ],
  "a": 2,
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
  "id": "junban-e-39"
 },
 {
  "category": "junban",
  "difficulty": "easy",
  "q": "きんぎょに えさを あげるよ。さいしょに することは？",
  "opts": [
   "😊 きんぎょが たべる",
   "🫳 えさを つまむ",
   "🐟 すいそうに いれる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🫳 えさを つまむ → 🐟 すいそうに いれる → 😊 きんぎょが たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🫳 えさを つまむ",
    "🐟 すいそうに いれる",
    "😊 きんぎょが たべる"
   ],
   "chainId": "kingyo"
  },
  "id": "junban-e-40"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "ホットケーキを つくるよ。さいしょに することは？",
  "opts": [
   "🍳 フライパンで やく",
   "😋 たべる",
   "🥣 こなを まぜる"
  ],
  "a": 2,
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
  "id": "junban-n-1"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "ちょうちょが そだつよ。いちばん さいごに することは？",
  "opts": [
   "🐛 あおむしに なる",
   "🦋 ちょうちょに なる",
   "😴 さなぎに なる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🥚 たまごから うまれる → 🐛 あおむしに なる → 😴 さなぎに なる → 🦋 ちょうちょに なる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🥚 たまごから うまれる",
    "🐛 あおむしに なる",
    "😴 さなぎに なる",
    "🦋 ちょうちょに なる"
   ],
   "chainId": "chou"
  },
  "id": "junban-n-2"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "プールで およぐよ。さいしょに することは？",
  "opts": [
   "👕 みずぎに きがえる",
   "🤸 じゅんびたいそうを する",
   "🧻 からだを ふく"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 👕 みずぎに きがえる → 🤸 じゅんびたいそうを する → 🏊 プールに はいる → 🧻 からだを ふく だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "👕 みずぎに きがえる",
    "🤸 じゅんびたいそうを する",
    "🏊 プールに はいる",
    "🧻 からだを ふく"
   ],
   "chainId": "pool"
  },
  "id": "junban-n-3"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "かきごおりを つくるよ。いちばん さいごに することは？",
  "opts": [
   "🍧 やまもりに する",
   "😋 たべる",
   "🍓 シロップを かける"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🧊 こおりを けずる → 🍧 やまもりに する → 🍓 シロップを かける → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🧊 こおりを けずる",
    "🍧 やまもりに する",
    "🍓 シロップを かける",
    "😋 たべる"
   ],
   "chainId": "kakigori"
  },
  "id": "junban-n-4"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "せんたくを するよ。さいしょに することは？",
  "opts": [
   "🧺 とりこむ",
   "🫧 せんたくきで あらう",
   "👕 たたんで しまう"
  ],
  "a": 1,
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
  "id": "junban-n-5"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "でんしゃに のるよ。いちばん さいごに することは？",
  "opts": [
   "🎫 きっぷを かう",
   "🚃 でんしゃに のる",
   "🚉 えきで おりる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🎫 きっぷを かう → 🚪 かいさつを とおる → 🚃 でんしゃに のる → 🚉 えきで おりる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🎫 きっぷを かう",
    "🚪 かいさつを とおる",
    "🚃 でんしゃに のる",
    "🚉 えきで おりる"
   ],
   "chainId": "densha"
  },
  "id": "junban-n-6"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おおきな きが そだつまで。さいしょに することは？",
  "opts": [
   "🌱 めが でる",
   "🌳 おおきな きに なる",
   "🌰 どんぐりを うえる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🌰 どんぐりを うえる → 🌱 めが でる → 🌿 わかい きに そだつ → 🌳 おおきな きに なる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🌰 どんぐりを うえる",
    "🌱 めが でる",
    "🌿 わかい きに そだつ",
    "🌳 おおきな きに なる"
   ],
   "chainId": "bigtree"
  },
  "id": "junban-n-7"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おおきな きが そだつまで。いちばん さいごに することは？",
  "opts": [
   "🌰 どんぐりを うえる",
   "🌳 おおきな きに なる",
   "🌿 わかい きに そだつ"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🌰 どんぐりを うえる → 🌱 めが でる → 🌿 わかい きに そだつ → 🌳 おおきな きに なる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🌰 どんぐりを うえる",
    "🌱 めが でる",
    "🌿 わかい きに そだつ",
    "🌳 おおきな きに なる"
   ],
   "chainId": "bigtree"
  },
  "id": "junban-n-8"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おふろに はいるよ。さいしょに することは？",
  "opts": [
   "👕 ふくを ぬぐ",
   "👚 パジャマを きる",
   "🧻 からだを ふく"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 👕 ふくを ぬぐ → 🛁 おふろに はいる → 🧻 からだを ふく → 👚 パジャマを きる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "👕 ふくを ぬぐ",
    "🛁 おふろに はいる",
    "🧻 からだを ふく",
    "👚 パジャマを きる"
   ],
   "chainId": "ofuro"
  },
  "id": "junban-n-9"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "えほんを かりて よむよ。いちばん さいごに することは？",
  "opts": [
   "📖 いえで よむ",
   "🏫 かえす",
   "📚 かりる"
  ],
  "a": 1,
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
  "id": "junban-n-10"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "カップラーメンを つくるよ。さいしょに することは？",
  "opts": [
   "🍜 たべる",
   "🔥 おゆを わかす",
   "⏲️ 3ぷん まつ"
  ],
  "a": 1,
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
  "id": "junban-n-11"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "カレーを つくるよ。いちばん さいごに することは？",
  "opts": [
   "🍽️ おさらに もる",
   "💧 みずで にこむ",
   "🔪 やさいを きる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🔪 やさいを きる → 🍳 いためる → 💧 みずで にこむ → 🍛 ルーを いれる → 🍽️ おさらに もる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずで にこむ",
    "🍛 ルーを いれる",
    "🍽️ おさらに もる"
   ],
   "chainId": "curry"
  },
  "id": "junban-n-12"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "トマトを そだてるよ。さいしょに することは？",
  "opts": [
   "🌰 たねを まく",
   "😋 たべる",
   "🌼 はなが さく"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🌰 たねを まく → 🌱 めが でる → 🌼 はなが さく → 🍅 みが なる → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🌰 たねを まく",
    "🌱 めが でる",
    "🌼 はなが さく",
    "🍅 みが なる",
    "😋 たべる"
   ],
   "chainId": "tomato"
  },
  "id": "junban-n-13"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "じてんしゃで こうえんに いくよ。いちばん さいごに することは？",
  "opts": [
   "🔒 とめて かぎを かける",
   "⛑️ ヘルメットを かぶる",
   "🏞️ こうえんに つく"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは ⛑️ ヘルメットを かぶる → 🚲 じてんしゃに のる → 🏞️ こうえんに つく → 🔒 とめて かぎを かける だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "⛑️ ヘルメットを かぶる",
    "🚲 じてんしゃに のる",
    "🏞️ こうえんに つく",
    "🔒 とめて かぎを かける"
   ],
   "chainId": "cycling"
  },
  "id": "junban-n-14"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おふろに はいるよ。いちばん さいごに することは？",
  "opts": [
   "👚 パジャマを きる",
   "👕 ふくを ぬぐ",
   "🛁 おふろに はいる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 👕 ふくを ぬぐ → 🛁 おふろに はいる → 🧻 からだを ふく → 👚 パジャマを きる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "👕 ふくを ぬぐ",
    "🛁 おふろに はいる",
    "🧻 からだを ふく",
    "👚 パジャマを きる"
   ],
   "chainId": "ofuro"
  },
  "id": "junban-n-15"
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
  "id": "junban-n-16"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おおきな きが そだつまで。いちばん さいごに することは？",
  "opts": [
   "🌱 めが でる",
   "🌳 おおきな きに なる",
   "🌿 わかい きに そだつ"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🌰 どんぐりを うえる → 🌱 めが でる → 🌿 わかい きに そだつ → 🌳 おおきな きに なる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🌰 どんぐりを うえる",
    "🌱 めが でる",
    "🌿 わかい きに そだつ",
    "🌳 おおきな きに なる"
   ],
   "chainId": "bigtree"
  },
  "id": "junban-n-17"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "じてんしゃで こうえんに いくよ。いちばん さいごに することは？",
  "opts": [
   "🚲 じてんしゃに のる",
   "🏞️ こうえんに つく",
   "🔒 とめて かぎを かける"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは ⛑️ ヘルメットを かぶる → 🚲 じてんしゃに のる → 🏞️ こうえんに つく → 🔒 とめて かぎを かける だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "⛑️ ヘルメットを かぶる",
    "🚲 じてんしゃに のる",
    "🏞️ こうえんに つく",
    "🔒 とめて かぎを かける"
   ],
   "chainId": "cycling"
  },
  "id": "junban-n-18"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おくった てがみが とどくまで。さいしょに することは？",
  "opts": [
   "✏️ てがみを かく",
   "🏠 あいての いえに とどく",
   "🚚 トラックが はこぶ"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは ✏️ てがみを かく → 📮 ポストに いれる → 🚚 トラックが はこぶ → 🏠 あいての いえに とどく だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "✏️ てがみを かく",
    "📮 ポストに いれる",
    "🚚 トラックが はこぶ",
    "🏠 あいての いえに とどく"
   ],
   "chainId": "tegamitabi"
  },
  "id": "junban-n-19"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "サンドイッチを つくるよ。いちばん さいごに することは？",
  "opts": [
   "🥒 ぐを のせる",
   "😋 たべる",
   "🍞 パンで はさむ"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🍞 パンを ならべる → 🥒 ぐを のせる → 🍞 パンで はさむ → 🔪 はんぶんに きる → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🍞 パンを ならべる",
    "🥒 ぐを のせる",
    "🍞 パンで はさむ",
    "🔪 はんぶんに きる",
    "😋 たべる"
   ],
   "chainId": "sandwich"
  },
  "id": "junban-n-20"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "ホットケーキを つくるよ。いちばん さいごに することは？",
  "opts": [
   "🥣 こなを まぜる",
   "🍯 シロップを かける",
   "😋 たべる"
  ],
  "a": 2,
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
  "id": "junban-n-21"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おくった てがみが とどくまで。さいしょに することは？",
  "opts": [
   "🏠 あいての いえに とどく",
   "📮 ポストに いれる",
   "✏️ てがみを かく"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは ✏️ てがみを かく → 📮 ポストに いれる → 🚚 トラックが はこぶ → 🏠 あいての いえに とどく だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "✏️ てがみを かく",
    "📮 ポストに いれる",
    "🚚 トラックが はこぶ",
    "🏠 あいての いえに とどく"
   ],
   "chainId": "tegamitabi"
  },
  "id": "junban-n-22"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "カレーを つくるよ。いちばん さいごに することは？",
  "opts": [
   "🍛 ルーを いれる",
   "🍳 いためる",
   "🍽️ おさらに もる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🔪 やさいを きる → 🍳 いためる → 💧 みずで にこむ → 🍛 ルーを いれる → 🍽️ おさらに もる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずで にこむ",
    "🍛 ルーを いれる",
    "🍽️ おさらに もる"
   ],
   "chainId": "curry"
  },
  "id": "junban-n-23"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "ちょうちょが そだつよ。さいしょに することは？",
  "opts": [
   "🥚 たまごから うまれる",
   "🐛 あおむしに なる",
   "🦋 ちょうちょに なる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🥚 たまごから うまれる → 🐛 あおむしに なる → 😴 さなぎに なる → 🦋 ちょうちょに なる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🥚 たまごから うまれる",
    "🐛 あおむしに なる",
    "😴 さなぎに なる",
    "🦋 ちょうちょに なる"
   ],
   "chainId": "chou"
  },
  "id": "junban-n-24"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "はたけで やさいを そだてるよ。いちばん さいごに することは？",
  "opts": [
   "🌿 そだつ",
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
  "id": "junban-n-25"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おおきな きが そだつまで。さいしょに することは？",
  "opts": [
   "🌳 おおきな きに なる",
   "🌿 わかい きに そだつ",
   "🌰 どんぐりを うえる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🌰 どんぐりを うえる → 🌱 めが でる → 🌿 わかい きに そだつ → 🌳 おおきな きに なる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🌰 どんぐりを うえる",
    "🌱 めが でる",
    "🌿 わかい きに そだつ",
    "🌳 おおきな きに なる"
   ],
   "chainId": "bigtree"
  },
  "id": "junban-n-26"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "カップラーメンを つくるよ。いちばん さいごに することは？",
  "opts": [
   "🫗 おゆを そそぐ",
   "🍜 たべる",
   "🔥 おゆを わかす"
  ],
  "a": 1,
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
  "id": "junban-n-27"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おにぎりを つくるよ。さいしょに することは？",
  "opts": [
   "😋 たべる",
   "🌿 のりを まく",
   "🍚 ごはんを たく"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🍚 ごはんを たく → 🍙 ぎゅっと にぎる → 🌿 のりを まく → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🍚 ごはんを たく",
    "🍙 ぎゅっと にぎる",
    "🌿 のりを まく",
    "😋 たべる"
   ],
   "chainId": "onigiri"
  },
  "id": "junban-n-28"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "プールで およぐよ。いちばん さいごに することは？",
  "opts": [
   "🏊 プールに はいる",
   "🧻 からだを ふく",
   "🤸 じゅんびたいそうを する"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 👕 みずぎに きがえる → 🤸 じゅんびたいそうを する → 🏊 プールに はいる → 🧻 からだを ふく だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "👕 みずぎに きがえる",
    "🤸 じゅんびたいそうを する",
    "🏊 プールに はいる",
    "🧻 からだを ふく"
   ],
   "chainId": "pool"
  },
  "id": "junban-n-29"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "あさがおを そだてるよ。いちばん さいごに することは？",
  "opts": [
   "🌿 めが でる",
   "🫘 たねが とれる",
   "🌱 たねを まく"
  ],
  "a": 1,
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
  "id": "junban-n-30"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おおきな きが そだつまで。いちばん さいごに することは？",
  "opts": [
   "🌰 どんぐりを うえる",
   "🌱 めが でる",
   "🌳 おおきな きに なる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🌰 どんぐりを うえる → 🌱 めが でる → 🌿 わかい きに そだつ → 🌳 おおきな きに なる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🌰 どんぐりを うえる",
    "🌱 めが でる",
    "🌿 わかい きに そだつ",
    "🌳 おおきな きに なる"
   ],
   "chainId": "bigtree"
  },
  "id": "junban-n-31"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "はたけで やさいを そだてるよ。さいしょに することは？",
  "opts": [
   "🥕 しゅうかくする",
   "🌰 たねを まく",
   "💧 みずを やる"
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
  "id": "junban-n-32"
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
  "id": "junban-n-33"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "おにぎりを つくるよ。さいしょに することは？",
  "opts": [
   "🍚 ごはんを たく",
   "🍙 ぎゅっと にぎる",
   "🌿 のりを まく"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🍚 ごはんを たく → 🍙 ぎゅっと にぎる → 🌿 のりを まく → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🍚 ごはんを たく",
    "🍙 ぎゅっと にぎる",
    "🌿 のりを まく",
    "😋 たべる"
   ],
   "chainId": "onigiri"
  },
  "id": "junban-n-34"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "はりえを つくって かざるよ。いちばん さいごに することは？",
  "opts": [
   "🧴 のりを つける",
   "📄 だいしに はる",
   "🖼️ かべに かざる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは ✂️ かみを きる → 🧴 のりを つける → 📄 だいしに はる → 🖼️ かべに かざる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "✂️ かみを きる",
    "🧴 のりを つける",
    "📄 だいしに はる",
    "🖼️ かべに かざる"
   ],
   "chainId": "harie"
  },
  "id": "junban-n-35"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "せんたくを するよ。さいしょに することは？",
  "opts": [
   "🌞 そとに ほす",
   "🫧 せんたくきで あらう",
   "🧺 とりこむ"
  ],
  "a": 1,
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
  "id": "junban-n-36"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "カレーを つくるよ。いちばん さいごに することは？",
  "opts": [
   "🍳 いためる",
   "💧 みずで にこむ",
   "🍽️ おさらに もる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🔪 やさいを きる → 🍳 いためる → 💧 みずで にこむ → 🍛 ルーを いれる → 🍽️ おさらに もる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずで にこむ",
    "🍛 ルーを いれる",
    "🍽️ おさらに もる"
   ],
   "chainId": "curry"
  },
  "id": "junban-n-37"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "せんたくを するよ。さいしょに することは？",
  "opts": [
   "👕 たたんで しまう",
   "🌞 そとに ほす",
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
  "id": "junban-n-38"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "カレーを つくるよ。いちばん さいごに することは？",
  "opts": [
   "🔪 やさいを きる",
   "🍳 いためる",
   "🍽️ おさらに もる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🔪 やさいを きる → 🍳 いためる → 💧 みずで にこむ → 🍛 ルーを いれる → 🍽️ おさらに もる だね",
  "meta": {
   "kind": "junban",
   "ask": "last",
   "pos": null,
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずで にこむ",
    "🍛 ルーを いれる",
    "🍽️ おさらに もる"
   ],
   "chainId": "curry"
  },
  "id": "junban-n-39"
 },
 {
  "category": "junban",
  "difficulty": "normal",
  "q": "サンドイッチを つくるよ。さいしょに することは？",
  "opts": [
   "🔪 はんぶんに きる",
   "😋 たべる",
   "🍞 パンを ならべる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🍞 パンを ならべる → 🥒 ぐを のせる → 🍞 パンで はさむ → 🔪 はんぶんに きる → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "first",
   "pos": null,
   "steps": [
    "🍞 パンを ならべる",
    "🥒 ぐを のせる",
    "🍞 パンで はさむ",
    "🔪 はんぶんに きる",
    "😋 たべる"
   ],
   "chainId": "sandwich"
  },
  "id": "junban-n-40"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "はりえを つくって かざるよ。\n① ✂️ かみを きる → ② ？ → ③ 📄 だいしに はる → ④ 🖼️ かべに かざる\n②に はいるのは？",
  "opts": [
   "✂️ かみを きる",
   "🖼️ かべに かざる",
   "🧴 のりを つける"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは ✂️ かみを きる → 🧴 のりを つける → 📄 だいしに はる → 🖼️ かべに かざる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 1,
   "steps": [
    "✂️ かみを きる",
    "🧴 のりを つける",
    "📄 だいしに はる",
    "🖼️ かべに かざる"
   ],
   "chainId": "harie"
  },
  "id": "junban-h-1"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "せんたくを するよ。「🌞 そとに ほす」の まえに かならず することは？",
  "opts": [
   "👕 たたんで しまう",
   "🧺 とりこむ",
   "🫧 せんたくきで あらう"
  ],
  "a": 2,
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
  "id": "junban-h-2"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ころんで ひざを すりむいたよ。ただしい じゅんばんは どれ？",
  "opts": [
   "💧 きずを あらう → 🏃 また あそぶ → 🩹 ばんそうこうを はる",
   "🩹 ばんそうこうを はる → 💧 きずを あらう → 🏃 また あそぶ",
   "💧 きずを あらう → 🩹 ばんそうこうを はる → 🏃 また あそぶ"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 💧 きずを あらう → 🩹 ばんそうこうを はる → 🏃 また あそぶ だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "💧 きずを あらう",
    "🩹 ばんそうこうを はる",
    "🏃 また あそぶ"
   ],
   "chainId": "kega"
  },
  "id": "junban-h-3"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ピクニックに いくよ。\n① 🍙 おべんとうを つくる → ② ？ → ③ 🚶 こうえんに いく → ④ 😋 たべる\n②に はいるのは？",
  "opts": [
   "🍙 おべんとうを つくる",
   "😋 たべる",
   "🎒 かばんに つめる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🍙 おべんとうを つくる → 🎒 かばんに つめる → 🚶 こうえんに いく → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 1,
   "steps": [
    "🍙 おべんとうを つくる",
    "🎒 かばんに つめる",
    "🚶 こうえんに いく",
    "😋 たべる"
   ],
   "chainId": "obento"
  },
  "id": "junban-h-4"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "はたけで やさいを そだてるよ。「💧 みずを やる」の まえに かならず することは？",
  "opts": [
   "🌰 たねを まく",
   "🌿 そだつ",
   "🥕 しゅうかくする"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🌰 たねを まく → 💧 みずを やる → 🌿 そだつ → 🥕 しゅうかくする だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 そだつ",
    "🥕 しゅうかくする"
   ],
   "chainId": "tanemaki"
  },
  "id": "junban-h-5"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "おちゃを いれるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "🔥 おゆを わかす → 😋 のむ → 🍵 おちゃを いれる",
   "🍵 おちゃを いれる → 🔥 おゆを わかす → 😋 のむ",
   "🔥 おゆを わかす → 🍵 おちゃを いれる → 😋 のむ"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🔥 おゆを わかす → 🍵 おちゃを いれる → 😋 のむ だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "🔥 おゆを わかす",
    "🍵 おちゃを いれる",
    "😋 のむ"
   ],
   "chainId": "ocha"
  },
  "id": "junban-h-6"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "はたけで やさいを そだてるよ。\n① 🌰 たねを まく → ② 💧 みずを やる → ③ ？ → ④ 🥕 しゅうかくする\n③に はいるのは？",
  "opts": [
   "💧 みずを やる",
   "🌰 たねを まく",
   "🌿 そだつ"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🌰 たねを まく → 💧 みずを やる → 🌿 そだつ → 🥕 しゅうかくする だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 2,
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 そだつ",
    "🥕 しゅうかくする"
   ],
   "chainId": "tanemaki"
  },
  "id": "junban-h-7"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ヨーグルトを たべるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "🫳 ふたを あける → 😋 たべる → 🗑️ カップを すてる",
   "🫳 ふたを あける → 🗑️ カップを すてる → 😋 たべる",
   "😋 たべる → 🫳 ふたを あける → 🗑️ カップを すてる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🫳 ふたを あける → 😋 たべる → 🗑️ カップを すてる だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "🫳 ふたを あける",
    "😋 たべる",
    "🗑️ カップを すてる"
   ],
   "chainId": "yogurt"
  },
  "id": "junban-h-8"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "あさがおを そだてるよ。\n① 🌱 たねを まく → ② ？ → ③ 🌸 はなが さく → ④ 🫘 たねが とれる\n②に はいるのは？",
  "opts": [
   "🌸 はなが さく",
   "🌿 めが でる",
   "🫘 たねが とれる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🌱 たねを まく → 🌿 めが でる → 🌸 はなが さく → 🫘 たねが とれる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 1,
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
  "q": "ホットケーキを つくるよ。「🍳 フライパンで やく」の まえに かならず することは？",
  "opts": [
   "🥣 こなを まぜる",
   "😋 たべる",
   "🍯 シロップを かける"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🥣 こなを まぜる → 🍳 フライパンで やく → 🍯 シロップを かける → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "🥣 こなを まぜる",
    "🍳 フライパンで やく",
    "🍯 シロップを かける",
    "😋 たべる"
   ],
   "chainId": "hotcake"
  },
  "id": "junban-h-10"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ふうせんを ふくらませるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "💨 いきを ふきこむ → 🤲 くちを しばる → 🎈 おおきく する",
   "🎈 おおきく する → 💨 いきを ふきこむ → 🤲 くちを しばる",
   "💨 いきを ふきこむ → 🎈 おおきく する → 🤲 くちを しばる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 💨 いきを ふきこむ → 🎈 おおきく する → 🤲 くちを しばる だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "💨 いきを ふきこむ",
    "🎈 おおきく する",
    "🤲 くちを しばる"
   ],
   "chainId": "fusen"
  },
  "id": "junban-h-11"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "トマトを そだてるよ。\n① 🌰 たねを まく → ② 🌱 めが でる → ③ 🌼 はなが さく → ④ ？ → ⑤ 😋 たべる\n④に はいるのは？",
  "opts": [
   "🌱 めが でる",
   "🌰 たねを まく",
   "🍅 みが なる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🌰 たねを まく → 🌱 めが でる → 🌼 はなが さく → 🍅 みが なる → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 3,
   "steps": [
    "🌰 たねを まく",
    "🌱 めが でる",
    "🌼 はなが さく",
    "🍅 みが なる",
    "😋 たべる"
   ],
   "chainId": "tomato"
  },
  "id": "junban-h-12"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "かきごおりを つくるよ。「🍧 やまもりに する」の まえに かならず することは？",
  "opts": [
   "😋 たべる",
   "🍓 シロップを かける",
   "🧊 こおりを けずる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🧊 こおりを けずる → 🍧 やまもりに する → 🍓 シロップを かける → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "🧊 こおりを けずる",
    "🍧 やまもりに する",
    "🍓 シロップを かける",
    "😋 たべる"
   ],
   "chainId": "kakigori"
  },
  "id": "junban-h-13"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ジュースを のむよ。ただしい じゅんばんは どれ？",
  "opts": [
   "🫗 コップに そそぐ → 😋 のむ → 🫧 コップを あらう",
   "😋 のむ → 🫗 コップに そそぐ → 🫧 コップを あらう",
   "🫗 コップに そそぐ → 🫧 コップを あらう → 😋 のむ"
  ],
  "a": 0,
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
  "id": "junban-h-14"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "せんたくを するよ。\n① 🫧 せんたくきで あらう → ② ？ → ③ 🧺 とりこむ → ④ 👕 たたんで しまう\n②に はいるのは？",
  "opts": [
   "🌞 そとに ほす",
   "🧺 とりこむ",
   "👕 たたんで しまう"
  ],
  "a": 0,
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
  "id": "junban-h-15"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "サンドイッチを つくるよ。「🍞 パンで はさむ」の まえに かならず することは？",
  "opts": [
   "🔪 はんぶんに きる",
   "😋 たべる",
   "🥒 ぐを のせる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🍞 パンを ならべる → 🥒 ぐを のせる → 🍞 パンで はさむ → 🔪 はんぶんに きる → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 2,
   "steps": [
    "🍞 パンを ならべる",
    "🥒 ぐを のせる",
    "🍞 パンで はさむ",
    "🔪 はんぶんに きる",
    "😋 たべる"
   ],
   "chainId": "sandwich"
  },
  "id": "junban-h-16"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "プレゼントを あけるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "🎀 リボンを ほどく → 🧸 なかみを だす → 🎁 はこを あける",
   "🎀 リボンを ほどく → 🎁 はこを あける → 🧸 なかみを だす",
   "🎁 はこを あける → 🎀 リボンを ほどく → 🧸 なかみを だす"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🎀 リボンを ほどく → 🎁 はこを あける → 🧸 なかみを だす だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "🎀 リボンを ほどく",
    "🎁 はこを あける",
    "🧸 なかみを だす"
   ],
   "chainId": "present"
  },
  "id": "junban-h-17"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "せんたくを するよ。\n① 🫧 せんたくきで あらう → ② 🌞 そとに ほす → ③ ？ → ④ 👕 たたんで しまう\n③に はいるのは？",
  "opts": [
   "👕 たたんで しまう",
   "🧺 とりこむ",
   "🌞 そとに ほす"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🫧 せんたくきで あらう → 🌞 そとに ほす → 🧺 とりこむ → 👕 たたんで しまう だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 2,
   "steps": [
    "🫧 せんたくきで あらう",
    "🌞 そとに ほす",
    "🧺 とりこむ",
    "👕 たたんで しまう"
   ],
   "chainId": "sentaku"
  },
  "id": "junban-h-18"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "てるてるぼうずを つくるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "🖍️ かおを かく → 📄 かみを まるめる → 🧵 ひもで つるす",
   "📄 かみを まるめる → 🧵 ひもで つるす → 🖍️ かおを かく",
   "📄 かみを まるめる → 🖍️ かおを かく → 🧵 ひもで つるす"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 📄 かみを まるめる → 🖍️ かおを かく → 🧵 ひもで つるす だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "📄 かみを まるめる",
    "🖍️ かおを かく",
    "🧵 ひもで つるす"
   ],
   "chainId": "teruteru"
  },
  "id": "junban-h-19"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ちょうちょが そだつよ。\n① 🥚 たまごから うまれる → ② 🐛 あおむしに なる → ③ ？ → ④ 🦋 ちょうちょに なる\n③に はいるのは？",
  "opts": [
   "😴 さなぎに なる",
   "🦋 ちょうちょに なる",
   "🐛 あおむしに なる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🥚 たまごから うまれる → 🐛 あおむしに なる → 😴 さなぎに なる → 🦋 ちょうちょに なる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 2,
   "steps": [
    "🥚 たまごから うまれる",
    "🐛 あおむしに なる",
    "😴 さなぎに なる",
    "🦋 ちょうちょに なる"
   ],
   "chainId": "chou"
  },
  "id": "junban-h-20"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "はりえを つくって かざるよ。「🧴 のりを つける」の まえに かならず することは？",
  "opts": [
   "✂️ かみを きる",
   "📄 だいしに はる",
   "🖼️ かべに かざる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは ✂️ かみを きる → 🧴 のりを つける → 📄 だいしに はる → 🖼️ かべに かざる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "✂️ かみを きる",
    "🧴 のりを つける",
    "📄 だいしに はる",
    "🖼️ かべに かざる"
   ],
   "chainId": "harie"
  },
  "id": "junban-h-21"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "トーストを たべるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "🍞 パンを やく → 🍓 ジャムを ぬる → 😋 たべる",
   "🍞 パンを やく → 😋 たべる → 🍓 ジャムを ぬる",
   "🍓 ジャムを ぬる → 🍞 パンを やく → 😋 たべる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🍞 パンを やく → 🍓 ジャムを ぬる → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "🍞 パンを やく",
    "🍓 ジャムを ぬる",
    "😋 たべる"
   ],
   "chainId": "toast"
  },
  "id": "junban-h-22"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ホットケーキを つくるよ。\n① 🥣 こなを まぜる → ② 🍳 フライパンで やく → ③ ？ → ④ 😋 たべる\n③に はいるのは？",
  "opts": [
   "🥣 こなを まぜる",
   "🍯 シロップを かける",
   "😋 たべる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🥣 こなを まぜる → 🍳 フライパンで やく → 🍯 シロップを かける → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 2,
   "steps": [
    "🥣 こなを まぜる",
    "🍳 フライパンで やく",
    "🍯 シロップを かける",
    "😋 たべる"
   ],
   "chainId": "hotcake"
  },
  "id": "junban-h-23"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "おふろに はいるよ。「🛁 おふろに はいる」の まえに かならず することは？",
  "opts": [
   "👕 ふくを ぬぐ",
   "👚 パジャマを きる",
   "🧻 からだを ふく"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 👕 ふくを ぬぐ → 🛁 おふろに はいる → 🧻 からだを ふく → 👚 パジャマを きる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "👕 ふくを ぬぐ",
    "🛁 おふろに はいる",
    "🧻 からだを ふく",
    "👚 パジャマを きる"
   ],
   "chainId": "ofuro"
  },
  "id": "junban-h-24"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "しゃしんを かざるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "📷 しゃしんを とる → 🖼️ かべに かざる → 🖨️ プリントする",
   "🖨️ プリントする → 📷 しゃしんを とる → 🖼️ かべに かざる",
   "📷 しゃしんを とる → 🖨️ プリントする → 🖼️ かべに かざる"
  ],
  "a": 2,
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
  "id": "junban-h-25"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "トマトを そだてるよ。\n① 🌰 たねを まく → ② ？ → ③ 🌼 はなが さく → ④ 🍅 みが なる → ⑤ 😋 たべる\n②に はいるのは？",
  "opts": [
   "🌱 めが でる",
   "🍅 みが なる",
   "😋 たべる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🌰 たねを まく → 🌱 めが でる → 🌼 はなが さく → 🍅 みが なる → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 1,
   "steps": [
    "🌰 たねを まく",
    "🌱 めが でる",
    "🌼 はなが さく",
    "🍅 みが なる",
    "😋 たべる"
   ],
   "chainId": "tomato"
  },
  "id": "junban-h-26"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "カレーを つくるよ。「💧 みずで にこむ」の まえに かならず することは？",
  "opts": [
   "🍛 ルーを いれる",
   "🍳 いためる",
   "🍽️ おさらに もる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🔪 やさいを きる → 🍳 いためる → 💧 みずで にこむ → 🍛 ルーを いれる → 🍽️ おさらに もる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 2,
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずで にこむ",
    "🍛 ルーを いれる",
    "🍽️ おさらに もる"
   ],
   "chainId": "curry"
  },
  "id": "junban-h-27"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "シャボンだまで あそぶよ。ただしい じゅんばんは どれ？",
  "opts": [
   "💨 ふーっと ふく → 🥤 えきを つける → ✨ たくさん とんでいく",
   "🥤 えきを つける → 💨 ふーっと ふく → ✨ たくさん とんでいく",
   "🥤 えきを つける → ✨ たくさん とんでいく → 💨 ふーっと ふく"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🥤 えきを つける → 💨 ふーっと ふく → ✨ たくさん とんでいく だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "🥤 えきを つける",
    "💨 ふーっと ふく",
    "✨ たくさん とんでいく"
   ],
   "chainId": "shabon"
  },
  "id": "junban-h-28"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "あさがおを そだてるよ。\n① 🌱 たねを まく → ② ？ → ③ 🌸 はなが さく → ④ 🫘 たねが とれる\n②に はいるのは？",
  "opts": [
   "🌸 はなが さく",
   "🌱 たねを まく",
   "🌿 めが でる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🌱 たねを まく → 🌿 めが でる → 🌸 はなが さく → 🫘 たねが とれる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 1,
   "steps": [
    "🌱 たねを まく",
    "🌿 めが でる",
    "🌸 はなが さく",
    "🫘 たねが とれる"
   ],
   "chainId": "asagao"
  },
  "id": "junban-h-29"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "トマトを そだてるよ。「🌱 めが でる」の まえに かならず することは？",
  "opts": [
   "🍅 みが なる",
   "🌼 はなが さく",
   "🌰 たねを まく"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🌰 たねを まく → 🌱 めが でる → 🌼 はなが さく → 🍅 みが なる → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "🌰 たねを まく",
    "🌱 めが でる",
    "🌼 はなが さく",
    "🍅 みが なる",
    "😋 たべる"
   ],
   "chainId": "tomato"
  },
  "id": "junban-h-30"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ホットケーキを つくるよ。\n① 🥣 こなを まぜる → ② 🍳 フライパンで やく → ③ ？ → ④ 😋 たべる\n③に はいるのは？",
  "opts": [
   "🍳 フライパンで やく",
   "🍯 シロップを かける",
   "🥣 こなを まぜる"
  ],
  "a": 1,
  "why": "ただしい じゅんばんは 🥣 こなを まぜる → 🍳 フライパンで やく → 🍯 シロップを かける → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 2,
   "steps": [
    "🥣 こなを まぜる",
    "🍳 フライパンで やく",
    "🍯 シロップを かける",
    "😋 たべる"
   ],
   "chainId": "hotcake"
  },
  "id": "junban-h-31"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "ピクニックに いくよ。「🎒 かばんに つめる」の まえに かならず することは？",
  "opts": [
   "🚶 こうえんに いく",
   "😋 たべる",
   "🍙 おべんとうを つくる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🍙 おべんとうを つくる → 🎒 かばんに つめる → 🚶 こうえんに いく → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "🍙 おべんとうを つくる",
    "🎒 かばんに つめる",
    "🚶 こうえんに いく",
    "😋 たべる"
   ],
   "chainId": "obento"
  },
  "id": "junban-h-32"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "おてがみを おくるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "✏️ てがみを かく → 📮 ポストに だす → ✉️ ふうとうに いれる",
   "✏️ てがみを かく → ✉️ ふうとうに いれる → 📮 ポストに だす",
   "✉️ ふうとうに いれる → ✏️ てがみを かく → 📮 ポストに だす"
  ],
  "a": 1,
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
  "id": "junban-h-33"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "あさがおを そだてるよ。\n① 🌱 たねを まく → ② 🌿 めが でる → ③ ？ → ④ 🫘 たねが とれる\n③に はいるのは？",
  "opts": [
   "🌿 めが でる",
   "🫘 たねが とれる",
   "🌸 はなが さく"
  ],
  "a": 2,
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
  "id": "junban-h-34"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "でんしゃに のるよ。「🚪 かいさつを とおる」の まえに かならず することは？",
  "opts": [
   "🚃 でんしゃに のる",
   "🚉 えきで おりる",
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
  "id": "junban-h-35"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "カレーを つくるよ。\n① 🔪 やさいを きる → ② 🍳 いためる → ③ 💧 みずで にこむ → ④ ？ → ⑤ 🍽️ おさらに もる\n④に はいるのは？",
  "opts": [
   "🍛 ルーを いれる",
   "🍽️ おさらに もる",
   "🔪 やさいを きる"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは 🔪 やさいを きる → 🍳 いためる → 💧 みずで にこむ → 🍛 ルーを いれる → 🍽️ おさらに もる だね",
  "meta": {
   "kind": "junban",
   "ask": "middle",
   "pos": 3,
   "steps": [
    "🔪 やさいを きる",
    "🍳 いためる",
    "💧 みずで にこむ",
    "🍛 ルーを いれる",
    "🍽️ おさらに もる"
   ],
   "chainId": "curry"
  },
  "id": "junban-h-36"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "トマトを そだてるよ。「🌼 はなが さく」の まえに かならず することは？",
  "opts": [
   "😋 たべる",
   "🍅 みが なる",
   "🌱 めが でる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🌰 たねを まく → 🌱 めが でる → 🌼 はなが さく → 🍅 みが なる → 😋 たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 2,
   "steps": [
    "🌰 たねを まく",
    "🌱 めが でる",
    "🌼 はなが さく",
    "🍅 みが なる",
    "😋 たべる"
   ],
   "chainId": "tomato"
  },
  "id": "junban-h-37"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "えほんを かりて よむよ。\n① 🏫 としょかんに いく → ② 🔍 よみたい ほんを さがす → ③ ？ → ④ 📖 いえで よむ → ⑤ 🏫 かえす\n③に はいるのは？",
  "opts": [
   "📖 いえで よむ",
   "📚 かりる",
   "🔍 よみたい ほんを さがす"
  ],
  "a": 1,
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
  "id": "junban-h-38"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "じてんしゃで こうえんに いくよ。「🚲 じてんしゃに のる」の まえに かならず することは？",
  "opts": [
   "⛑️ ヘルメットを かぶる",
   "🔒 とめて かぎを かける",
   "🏞️ こうえんに つく"
  ],
  "a": 0,
  "why": "ただしい じゅんばんは ⛑️ ヘルメットを かぶる → 🚲 じてんしゃに のる → 🏞️ こうえんに つく → 🔒 とめて かぎを かける だね",
  "meta": {
   "kind": "junban",
   "ask": "before",
   "pos": 1,
   "steps": [
    "⛑️ ヘルメットを かぶる",
    "🚲 じてんしゃに のる",
    "🏞️ こうえんに つく",
    "🔒 とめて かぎを かける"
   ],
   "chainId": "cycling"
  },
  "id": "junban-h-39"
 },
 {
  "category": "junban",
  "difficulty": "hard",
  "q": "アイスを たべるよ。ただしい じゅんばんは どれ？",
  "opts": [
   "🫳 ふくろを あける → 🛒 アイスを かう → 😋 とけるまえに たべる",
   "🛒 アイスを かう → 😋 とけるまえに たべる → 🫳 ふくろを あける",
   "🛒 アイスを かう → 🫳 ふくろを あける → 😋 とけるまえに たべる"
  ],
  "a": 2,
  "why": "ただしい じゅんばんは 🛒 アイスを かう → 🫳 ふくろを あける → 😋 とけるまえに たべる だね",
  "meta": {
   "kind": "junban",
   "ask": "order",
   "pos": null,
   "steps": [
    "🛒 アイスを かう",
    "🫳 ふくろを あける",
    "😋 とけるまえに たべる"
   ],
   "chainId": "ice"
  },
  "id": "junban-h-40"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🚲 🚌 🚲 🚌 ❓",
  "opts": [
   "🚲",
   "🚗",
   "🚀"
  ],
  "a": 0,
  "why": "🚲・🚌 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚲",
    "🚌",
    "🚲",
    "🚌"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-1"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n👑 🎀 👑 🎀 👑 ❓",
  "opts": [
   "🧢",
   "👑",
   "🎀"
  ],
  "a": 2,
  "why": "👑・🎀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "👑",
    "🎀",
    "👑",
    "🎀",
    "👑"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-2"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🥦 🍅 🥦 🍅 🥦 ❓",
  "opts": [
   "🍅",
   "🥕",
   "🥦"
  ],
  "a": 0,
  "why": "🥦・🍅 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🥦",
    "🍅",
    "🥦",
    "🍅",
    "🥦"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-3"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n⭐ 🌊 ⭐ 🌊 ⭐ ❓",
  "opts": [
   "🌊",
   "⭐",
   "🔥"
  ],
  "a": 0,
  "why": "⭐・🌊 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⭐",
    "🌊",
    "⭐",
    "🌊",
    "⭐"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-4"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🦀 🐟 🦀 🐟 ❓",
  "opts": [
   "🐬",
   "🐟",
   "🦀"
  ],
  "a": 2,
  "why": "🦀・🐟 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🦀",
    "🐟",
    "🦀",
    "🐟"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-5"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🧢 🎩 🧢 🎩 🧢 ❓",
  "opts": [
   "👑",
   "🧢",
   "🎩"
  ],
  "a": 2,
  "why": "🧢・🎩 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🧢",
    "🎩",
    "🧢",
    "🎩",
    "🧢"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-6"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n👑 🧢 👑 🧢 ❓",
  "opts": [
   "🎩",
   "🎀",
   "👑"
  ],
  "a": 2,
  "why": "👑・🧢 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "👑",
    "🧢",
    "👑",
    "🧢"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-7"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🦋 🐞 🦋 🐞 🦋 ❓",
  "opts": [
   "🐞",
   "🐌",
   "🐛"
  ],
  "a": 0,
  "why": "🦋・🐞 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🦋",
    "🐞",
    "🦋",
    "🐞",
    "🦋"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-8"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n⭐ 🔥 ⭐ 🔥 ❓",
  "opts": [
   "⭐",
   "🔥",
   "🌊"
  ],
  "a": 0,
  "why": "⭐・🔥 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⭐",
    "🔥",
    "⭐",
    "🔥"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-9"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🏀 🏈 🏀 🏈 ❓",
  "opts": [
   "🏈",
   "🎾",
   "🏀"
  ],
  "a": 2,
  "why": "🏀・🏈 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🏀",
    "🏈",
    "🏀",
    "🏈"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-10"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🐱 🐶 🐱 🐶 🐱 ❓",
  "opts": [
   "🐰",
   "🐶",
   "🐸"
  ],
  "a": 1,
  "why": "🐱・🐶 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐱",
    "🐶",
    "🐱",
    "🐶",
    "🐱"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-11"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🟡 🔴 🟡 🔴 ❓",
  "opts": [
   "🟡",
   "🔵",
   "🔴"
  ],
  "a": 0,
  "why": "🟡・🔴 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🟡",
    "🔴",
    "🟡",
    "🔴"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-12"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🚂 🚁 🚂 🚁 ❓",
  "opts": [
   "🚁",
   "🚤",
   "🚂"
  ],
  "a": 2,
  "why": "🚂・🚁 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚂",
    "🚁",
    "🚂",
    "🚁"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-13"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🚌 🚲 🚌 🚲 🚌 ❓",
  "opts": [
   "🚗",
   "🚲",
   "🚌"
  ],
  "a": 1,
  "why": "🚌・🚲 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚌",
    "🚲",
    "🚌",
    "🚲",
    "🚌"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-14"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🟡 🔴 🟡 🔴 ❓",
  "opts": [
   "🟡",
   "🔴",
   "🟢"
  ],
  "a": 0,
  "why": "🟡・🔴 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🟡",
    "🔴",
    "🟡",
    "🔴"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-15"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n⭐ 🔥 ⭐ 🔥 ❓",
  "opts": [
   "🌈",
   "🔥",
   "⭐"
  ],
  "a": 2,
  "why": "⭐・🔥 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⭐",
    "🔥",
    "⭐",
    "🔥"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-16"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🧢 👑 🧢 👑 🧢 ❓",
  "opts": [
   "🎀",
   "👑",
   "🧢"
  ],
  "a": 1,
  "why": "🧢・👑 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🧢",
    "👑",
    "🧢",
    "👑",
    "🧢"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-17"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🦋 🐌 🦋 🐌 🦋 ❓",
  "opts": [
   "🐞",
   "🐌",
   "🐛"
  ],
  "a": 1,
  "why": "🦋・🐌 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🦋",
    "🐌",
    "🦋",
    "🐌",
    "🦋"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-18"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🍀 🌷 🍀 🌷 ❓",
  "opts": [
   "🌻",
   "🌷",
   "🍀"
  ],
  "a": 2,
  "why": "🍀・🌷 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍀",
    "🌷",
    "🍀",
    "🌷"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-19"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🍓 🍋 🍓 🍋 🍓 ❓",
  "opts": [
   "🍋",
   "🍓",
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
  "id": "kimari-e-20"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🌽 🥕 🌽 🥕 ❓",
  "opts": [
   "🥕",
   "🍅",
   "🌽"
  ],
  "a": 2,
  "why": "🌽・🥕 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌽",
    "🥕",
    "🌽",
    "🥕"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-21"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🌴 🍄 🌴 🍄 🌴 ❓",
  "opts": [
   "🌴",
   "🍄",
   "🌵"
  ],
  "a": 1,
  "why": "🌴・🍄 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌴",
    "🍄",
    "🌴",
    "🍄",
    "🌴"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-22"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🍰 🍭 🍰 🍭 ❓",
  "opts": [
   "🍩",
   "🍭",
   "🍰"
  ],
  "a": 2,
  "why": "🍰・🍭 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍰",
    "🍭",
    "🍰",
    "🍭"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-23"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🌊 ⭐ 🌊 ⭐ ❓",
  "opts": [
   "🔥",
   "🌊",
   "🌈"
  ],
  "a": 1,
  "why": "🌊・⭐ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌊",
    "⭐",
    "🌊",
    "⭐"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-24"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🔥 🌈 🔥 🌈 🔥 ❓",
  "opts": [
   "🌈",
   "🔥",
   "🌊"
  ],
  "a": 0,
  "why": "🔥・🌈 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔥",
    "🌈",
    "🔥",
    "🌈",
    "🔥"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-25"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🍩 🍰 🍩 🍰 🍩 ❓",
  "opts": [
   "🍩",
   "🍰",
   "🍪"
  ],
  "a": 1,
  "why": "🍩・🍰 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍩",
    "🍰",
    "🍩",
    "🍰",
    "🍩"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-26"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🌲 🌵 🌲 🌵 ❓",
  "opts": [
   "🌲",
   "🌵",
   "🌴"
  ],
  "a": 0,
  "why": "🌲・🌵 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌲",
    "🌵",
    "🌲",
    "🌵"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-27"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n⏰ 🔔 ⏰ 🔔 ❓",
  "opts": [
   "🔦",
   "⏰",
   "🔑"
  ],
  "a": 1,
  "why": "⏰・🔔 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⏰",
    "🔔",
    "⏰",
    "🔔"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-28"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🌙 ☁️ 🌙 ☁️ ❓",
  "opts": [
   "🌙",
   "⭐",
   "☁️"
  ],
  "a": 0,
  "why": "🌙・☁️ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌙",
    "☁️",
    "🌙",
    "☁️"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-29"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🌵 🍀 🌵 🍀 ❓",
  "opts": [
   "🌵",
   "🍀",
   "🌷"
  ],
  "a": 0,
  "why": "🌵・🍀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌵",
    "🍀",
    "🌵",
    "🍀"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-30"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🐶 🐰 🐶 🐰 🐶 ❓",
  "opts": [
   "🐸",
   "🐰",
   "🐶"
  ],
  "a": 1,
  "why": "🐶・🐰 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐶",
    "🐰",
    "🐶",
    "🐰",
    "🐶"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-31"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🫐 🍈 🫐 🍈 ❓",
  "opts": [
   "🍈",
   "🫐",
   "🍓"
  ],
  "a": 1,
  "why": "🫐・🍈 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🫐",
    "🍈",
    "🫐",
    "🍈"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-32"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🍄 🌴 🍄 🌴 🍄 ❓",
  "opts": [
   "🍄",
   "🌴",
   "🌵"
  ],
  "a": 1,
  "why": "🍄・🌴 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍄",
    "🌴",
    "🍄",
    "🌴",
    "🍄"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-33"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🔦 🔑 🔦 🔑 🔦 ❓",
  "opts": [
   "⏰",
   "🔔",
   "🔑"
  ],
  "a": 2,
  "why": "🔦・🔑 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔦",
    "🔑",
    "🔦",
    "🔑",
    "🔦"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-34"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🎁 🎉 🎁 🎉 ❓",
  "opts": [
   "🎉",
   "🎁",
   "🎈"
  ],
  "a": 1,
  "why": "🎁・🎉 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🎁",
    "🎉",
    "🎁",
    "🎉"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-35"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🍎 🍌 🍎 🍌 🍎 ❓",
  "opts": [
   "🍎",
   "🍌",
   "🍇"
  ],
  "a": 1,
  "why": "🍎・🍌 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍎",
    "🍌",
    "🍎",
    "🍌",
    "🍎"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-36"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🚌 🚲 🚌 🚲 ❓",
  "opts": [
   "🚌",
   "🚲",
   "🚗"
  ],
  "a": 0,
  "why": "🚌・🚲 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚌",
    "🚲",
    "🚌",
    "🚲"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-37"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🔦 ⏰ 🔦 ⏰ 🔦 ❓",
  "opts": [
   "🔔",
   "🔦",
   "⏰"
  ],
  "a": 2,
  "why": "🔦・⏰ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔦",
    "⏰",
    "🔦",
    "⏰",
    "🔦"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-38"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🚲 🚀 🚲 🚀 🚲 ❓",
  "opts": [
   "🚗",
   "🚲",
   "🚀"
  ],
  "a": 2,
  "why": "🚲・🚀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚲",
    "🚀",
    "🚲",
    "🚀",
    "🚲"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-39"
 },
 {
  "category": "kimari",
  "difficulty": "easy",
  "q": "つぎに くるのは？\n🐬 🦀 🐬 🦀 🐬 ❓",
  "opts": [
   "🐟",
   "🦀",
   "🐙"
  ],
  "a": 1,
  "why": "🐬・🦀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐬",
    "🦀",
    "🐬",
    "🦀",
    "🐬"
   ],
   "period": 2,
   "grouped": false
  },
  "id": "kimari-e-40"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🚗 🚀 🚲 🚗 🚀 🚲 🚗 🚀 ❓",
  "opts": [
   "🚀",
   "🚗",
   "🚲"
  ],
  "a": 2,
  "why": "🚗・🚀・🚲 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚗",
    "🚀",
    "🚲",
    "🚗",
    "🚀",
    "🚲",
    "🚗",
    "🚀"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-1"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🤖 👻 👻 🤖 👻 👻 🤖 👻 ❓",
  "opts": [
   "😀",
   "🤖",
   "👻"
  ],
  "a": 2,
  "why": "🤖・👻・👻 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🤖",
    "👻",
    "👻",
    "🤖",
    "👻",
    "👻",
    "🤖",
    "👻"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-2"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n⬛ ⬜ 🔶 ⬛ ⬜ 🔶 ⬛ ❓",
  "opts": [
   "⬛",
   "⬜",
   "🔶"
  ],
  "a": 1,
  "why": "⬛・⬜・🔶 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⬛",
    "⬜",
    "🔶",
    "⬛",
    "⬜",
    "🔶",
    "⬛"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-3"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🫐 🫐 🍈 🫐 🫐 🍈 🫐 🫐 ❓",
  "opts": [
   "🍈",
   "🫐",
   "🍓"
  ],
  "a": 0,
  "why": "🫐・🫐・🍈 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🫐",
    "🫐",
    "🍈",
    "🫐",
    "🫐",
    "🍈",
    "🫐",
    "🫐"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-4"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n😺 👻 👻 😺 👻 👻 😺 👻 ❓",
  "opts": [
   "🤖",
   "😀",
   "👻"
  ],
  "a": 2,
  "why": "😺・👻・👻 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "😺",
    "👻",
    "👻",
    "😺",
    "👻",
    "👻",
    "😺",
    "👻"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-5"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🐛 🐛 🦋 🐛 🐛 🦋 🐛 ❓",
  "opts": [
   "🐞",
   "🐛",
   "🐌"
  ],
  "a": 1,
  "why": "🐛・🐛・🦋 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐛",
    "🐛",
    "🦋",
    "🐛",
    "🐛",
    "🦋",
    "🐛"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-6"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍎 🍎 🍇 🍎 🍎 🍇 🍎 🍎 ❓",
  "opts": [
   "🍓",
   "🍎",
   "🍇"
  ],
  "a": 2,
  "why": "🍎・🍎・🍇 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍎",
    "🍎",
    "🍇",
    "🍎",
    "🍎",
    "🍇",
    "🍎",
    "🍎"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-7"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍄 🌴 🌴 🍄 🌴 🌴 🍄 🌴 ❓",
  "opts": [
   "🌴",
   "🌵",
   "🍄"
  ],
  "a": 0,
  "why": "🍄・🌴・🌴 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍄",
    "🌴",
    "🌴",
    "🍄",
    "🌴",
    "🌴",
    "🍄",
    "🌴"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-8"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🌵 🌵 🍀 🌵 🌵 🍀 🌵 ❓",
  "opts": [
   "🍀",
   "🌵",
   "🌻"
  ],
  "a": 1,
  "why": "🌵・🌵・🍀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌵",
    "🌵",
    "🍀",
    "🌵",
    "🌵",
    "🍀",
    "🌵"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-9"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍋 🍋 🍓 🍓 🍋 🍋 🍓 🍓 🍋 🍋 ❓",
  "opts": [
   "🫐",
   "🍈",
   "🍓"
  ],
  "a": 2,
  "why": "🍋・🍋・🍓・🍓 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍋",
    "🍋",
    "🍓",
    "🍓",
    "🍋",
    "🍋",
    "🍓",
    "🍓",
    "🍋",
    "🍋"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-10"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🎩 🎩 🧢 🧢 🎩 🎩 🧢 🧢 🎩 ❓",
  "opts": [
   "🎩",
   "🧢",
   "👑"
  ],
  "a": 0,
  "why": "🎩・🎩・🧢・🧢 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🎩",
    "🎩",
    "🧢",
    "🧢",
    "🎩",
    "🎩",
    "🧢",
    "🧢",
    "🎩"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-11"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🦋 🦋 🐌 🦋 🦋 🐌 🦋 🦋 ❓",
  "opts": [
   "🐞",
   "🦋",
   "🐌"
  ],
  "a": 2,
  "why": "🦋・🦋・🐌 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🦋",
    "🦋",
    "🐌",
    "🦋",
    "🦋",
    "🐌",
    "🦋",
    "🦋"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-12"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🌻 🍀 🌵 🌻 🍀 🌵 🌻 🍀 ❓",
  "opts": [
   "🍀",
   "🌷",
   "🌵"
  ],
  "a": 2,
  "why": "🌻・🍀・🌵 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌻",
    "🍀",
    "🌵",
    "🌻",
    "🍀",
    "🌵",
    "🌻",
    "🍀"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-13"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍇 🍇 🍌 🍌 🍇 🍇 🍌 🍌 🍇 🍇 🍌 ❓",
  "opts": [
   "🍓",
   "🍇",
   "🍌"
  ],
  "a": 2,
  "why": "🍇・🍇・🍌・🍌 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍇",
    "🍇",
    "🍌",
    "🍌",
    "🍇",
    "🍇",
    "🍌",
    "🍌",
    "🍇",
    "🍇",
    "🍌"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-14"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍎 🍓 🍓 🍎 🍓 🍓 🍎 ❓",
  "opts": [
   "🍌",
   "🍓",
   "🍇"
  ],
  "a": 1,
  "why": "🍎・🍓・🍓 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍎",
    "🍓",
    "🍓",
    "🍎",
    "🍓",
    "🍓",
    "🍎"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-15"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🌵 🌷 🍀 🌵 🌷 🍀 🌵 ❓",
  "opts": [
   "🍀",
   "🌷",
   "🌵"
  ],
  "a": 1,
  "why": "🌵・🌷・🍀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌵",
    "🌷",
    "🍀",
    "🌵",
    "🌷",
    "🍀",
    "🌵"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-16"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🌈 ⭐ ⭐ 🌈 ⭐ ⭐ 🌈 ❓",
  "opts": [
   "🌊",
   "🌈",
   "⭐"
  ],
  "a": 2,
  "why": "🌈・⭐・⭐ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌈",
    "⭐",
    "⭐",
    "🌈",
    "⭐",
    "⭐",
    "🌈"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-17"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🦀 🐙 🐟 🦀 🐙 🐟 🦀 ❓",
  "opts": [
   "🦀",
   "🐟",
   "🐙"
  ],
  "a": 2,
  "why": "🦀・🐙・🐟 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🦀",
    "🐙",
    "🐟",
    "🦀",
    "🐙",
    "🐟",
    "🦀"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-18"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🚜 🚜 🚁 🚜 🚜 🚁 🚜 🚜 ❓",
  "opts": [
   "🚜",
   "🚁",
   "🚤"
  ],
  "a": 1,
  "why": "🚜・🚜・🚁 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚜",
    "🚜",
    "🚁",
    "🚜",
    "🚜",
    "🚁",
    "🚜",
    "🚜"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-19"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🟡 🟡 🔵 🔵 🟡 🟡 🔵 🔵 🟡 ❓",
  "opts": [
   "🟡",
   "🟢",
   "🔴"
  ],
  "a": 0,
  "why": "🟡・🟡・🔵・🔵 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🟡",
    "🟡",
    "🔵",
    "🔵",
    "🟡",
    "🟡",
    "🔵",
    "🔵",
    "🟡"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-20"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🐶 🐰 🐰 🐶 🐰 🐰 🐶 ❓",
  "opts": [
   "🐶",
   "🐰",
   "🐱"
  ],
  "a": 1,
  "why": "🐶・🐰・🐰 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐶",
    "🐰",
    "🐰",
    "🐶",
    "🐰",
    "🐰",
    "🐶"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-21"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍄 🌴 🌲 🍄 🌴 🌲 🍄 ❓",
  "opts": [
   "🍄",
   "🌲",
   "🌴"
  ],
  "a": 2,
  "why": "🍄・🌴・🌲 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍄",
    "🌴",
    "🌲",
    "🍄",
    "🌴",
    "🌲",
    "🍄"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-22"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍀 🌷 🌵 🍀 🌷 🌵 🍀 🌷 ❓",
  "opts": [
   "🌷",
   "🌵",
   "🍀"
  ],
  "a": 1,
  "why": "🍀・🌷・🌵 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍀",
    "🌷",
    "🌵",
    "🍀",
    "🌷",
    "🌵",
    "🍀",
    "🌷"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-23"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🐌 🐌 🦋 🐌 🐌 🦋 🐌 ❓",
  "opts": [
   "🐛",
   "🐌",
   "🐞"
  ],
  "a": 1,
  "why": "🐌・🐌・🦋 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐌",
    "🐌",
    "🦋",
    "🐌",
    "🐌",
    "🦋",
    "🐌"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-24"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🌽 🥦 🥦 🌽 🥦 🥦 🌽 🥦 ❓",
  "opts": [
   "🥕",
   "🌽",
   "🥦"
  ],
  "a": 2,
  "why": "🌽・🥦・🥦 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌽",
    "🥦",
    "🥦",
    "🌽",
    "🥦",
    "🥦",
    "🌽",
    "🥦"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-25"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🎉 🎀 🎀 🎉 🎀 🎀 🎉 🎀 ❓",
  "opts": [
   "🎁",
   "🎉",
   "🎀"
  ],
  "a": 2,
  "why": "🎉・🎀・🎀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🎉",
    "🎀",
    "🎀",
    "🎉",
    "🎀",
    "🎀",
    "🎉",
    "🎀"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-26"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🚲 🚲 🚀 🚀 🚲 🚲 🚀 🚀 🚲 ❓",
  "opts": [
   "🚀",
   "🚌",
   "🚲"
  ],
  "a": 2,
  "why": "🚲・🚲・🚀・🚀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🚲",
    "🚲",
    "🚀",
    "🚀",
    "🚲",
    "🚲",
    "🚀",
    "🚀",
    "🚲"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-27"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n⬜ 🔶 🔶 ⬜ 🔶 🔶 ⬜ 🔶 ❓",
  "opts": [
   "🔶",
   "🔷",
   "⬜"
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
    "⬜",
    "🔶"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-28"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🫐 🫐 🍋 🫐 🫐 🍋 🫐 🫐 ❓",
  "opts": [
   "🍈",
   "🍋",
   "🫐"
  ],
  "a": 1,
  "why": "🫐・🫐・🍋 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🫐",
    "🫐",
    "🍋",
    "🫐",
    "🫐",
    "🍋",
    "🫐",
    "🫐"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-29"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍄 🌴 🌲 🍄 🌴 🌲 🍄 ❓",
  "opts": [
   "🍄",
   "🌴",
   "🌵"
  ],
  "a": 1,
  "why": "🍄・🌴・🌲 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍄",
    "🌴",
    "🌲",
    "🍄",
    "🌴",
    "🌲",
    "🍄"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-30"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🎩 🎩 🧢 🎩 🎩 🧢 🎩 🎩 ❓",
  "opts": [
   "🎩",
   "👑",
   "🧢"
  ],
  "a": 2,
  "why": "🎩・🎩・🧢 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🎩",
    "🎩",
    "🧢",
    "🎩",
    "🎩",
    "🧢",
    "🎩",
    "🎩"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-31"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🐱 🐰 🐰 🐱 🐰 🐰 🐱 🐰 ❓",
  "opts": [
   "🐶",
   "🐰",
   "🐱"
  ],
  "a": 1,
  "why": "🐱・🐰・🐰 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐱",
    "🐰",
    "🐰",
    "🐱",
    "🐰",
    "🐰",
    "🐱",
    "🐰"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-32"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🐙 🐬 🦀 🐙 🐬 🦀 🐙 ❓",
  "opts": [
   "🦀",
   "🐟",
   "🐬"
  ],
  "a": 2,
  "why": "🐙・🐬・🦀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐙",
    "🐬",
    "🦀",
    "🐙",
    "🐬",
    "🦀",
    "🐙"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-33"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🔷 🔶 🔶 🔷 🔶 🔶 🔷 🔶 ❓",
  "opts": [
   "🔷",
   "🔶",
   "⬛"
  ],
  "a": 1,
  "why": "🔷・🔶・🔶 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔷",
    "🔶",
    "🔶",
    "🔷",
    "🔶",
    "🔶",
    "🔷",
    "🔶"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-34"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🍀 🍀 🌵 🌵 🍀 🍀 🌵 🌵 🍀 ❓",
  "opts": [
   "🌵",
   "🌻",
   "🍀"
  ],
  "a": 2,
  "why": "🍀・🍀・🌵・🌵 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍀",
    "🍀",
    "🌵",
    "🌵",
    "🍀",
    "🍀",
    "🌵",
    "🌵",
    "🍀"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-35"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🐛 🐞 🐌 🐛 🐞 🐌 🐛 🐞 ❓",
  "opts": [
   "🐞",
   "🐌",
   "🦋"
  ],
  "a": 1,
  "why": "🐛・🐞・🐌 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐛",
    "🐞",
    "🐌",
    "🐛",
    "🐞",
    "🐌",
    "🐛",
    "🐞"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-36"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n⚽ ⚽ 🎾 ⚽ ⚽ 🎾 ⚽ ❓",
  "opts": [
   "⚽",
   "🏈",
   "🏀"
  ],
  "a": 0,
  "why": "⚽・⚽・🎾 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⚽",
    "⚽",
    "🎾",
    "⚽",
    "⚽",
    "🎾",
    "⚽"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-37"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🌵 🍀 🍀 🌵 🍀 🍀 🌵 ❓",
  "opts": [
   "🌵",
   "🌻",
   "🍀"
  ],
  "a": 2,
  "why": "🌵・🍀・🍀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌵",
    "🍀",
    "🍀",
    "🌵",
    "🍀",
    "🍀",
    "🌵"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-38"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🔴 🟢 🟢 🔴 🟢 🟢 🔴 ❓",
  "opts": [
   "🟡",
   "🟢",
   "🔵"
  ],
  "a": 1,
  "why": "🔴・🟢・🟢 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔴",
    "🟢",
    "🟢",
    "🔴",
    "🟢",
    "🟢",
    "🔴"
   ],
   "period": 3,
   "grouped": false
  },
  "id": "kimari-n-39"
 },
 {
  "category": "kimari",
  "difficulty": "normal",
  "q": "つぎに くるのは？\n🔷 🔷 ⬛ ⬛ 🔷 🔷 ⬛ ⬛ 🔷 🔷 ❓",
  "opts": [
   "🔷",
   "🔶",
   "⬛"
  ],
  "a": 2,
  "why": "🔷・🔷・⬛・⬛ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔷",
    "🔷",
    "⬛",
    "⬛",
    "🔷",
    "🔷",
    "⬛",
    "⬛",
    "🔷",
    "🔷"
   ],
   "period": 4,
   "grouped": true
  },
  "id": "kimari-n-40"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🔔 ⏰ 🔔 🔑 🔔 ⏰ 🔔 🔑 🔔 ⏰ ❓",
  "opts": [
   "🔦",
   "🔑",
   "🔔"
  ],
  "a": 2,
  "why": "🔔・⏰・🔔・🔑 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔔",
    "⏰",
    "🔔",
    "🔑",
    "🔔",
    "⏰",
    "🔔",
    "🔑",
    "🔔",
    "⏰"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-1"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、9ばんめに くるのは？\n🔑 🔦 🔑 🔦 …",
  "opts": [
   "⏰",
   "🔑",
   "🔦"
  ],
  "a": 1,
  "why": "🔑・🔦の くりかえし。ゆびで 9ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🔑",
    "🔦",
    "🔑",
    "🔦"
   ],
   "pos": 9
  },
  "id": "kimari-h-2"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🟢🔵🟢🔵🟢🔵",
   "🟢🔵🔵🔵🟢🔵",
   "🔵🟢🔵🟢🔵🟢"
  ],
  "a": 1,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-3"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🌊 🔥 🌈 🔥 🌊 🔥 🌈 🔥 🌊 🔥 ❓",
  "opts": [
   "🔥",
   "🌊",
   "🌈"
  ],
  "a": 2,
  "why": "🌊・🔥・🌈・🔥 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌊",
    "🔥",
    "🌈",
    "🔥",
    "🌊",
    "🔥",
    "🌈",
    "🔥",
    "🌊",
    "🔥"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-4"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、11ばんめに くるのは？\n⭐ 🌊 ⭐ 🌊 …",
  "opts": [
   "⭐",
   "🌊",
   "🌈"
  ],
  "a": 0,
  "why": "⭐・🌊の くりかえし。ゆびで 11ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "⭐",
    "🌊",
    "⭐",
    "🌊"
   ],
   "pos": 11
  },
  "id": "kimari-h-5"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🥕🌽🥕🌽🥕🌽",
   "🥕🌽🥕🌽🌽🌽",
   "🌽🥕🌽🥕🌽🥕"
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
  "q": "つぎに くるのは？\n🐰 🐶 🐸 🐶 🐰 🐶 🐸 🐶 🐰 ❓",
  "opts": [
   "🐰",
   "🐶",
   "🐸"
  ],
  "a": 1,
  "why": "🐰・🐶・🐸・🐶 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐰",
    "🐶",
    "🐸",
    "🐶",
    "🐰",
    "🐶",
    "🐸",
    "🐶",
    "🐰"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-7"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、10ばんめに くるのは？\n🍅 🌽 🍅 🌽 …",
  "opts": [
   "🍅",
   "🌽",
   "🥕"
  ],
  "a": 1,
  "why": "🍅・🌽の くりかえし。ゆびで 10ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🍅",
    "🌽",
    "🍅",
    "🌽"
   ],
   "pos": 10
  },
  "id": "kimari-h-8"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "⬛🔶⬛🔶⬛🔶",
   "⬛🔶🔶🔶⬛🔶",
   "🔶⬛🔶⬛🔶⬛"
  ],
  "a": 1,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-9"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n⚽ 🏀 ⚽ 🏈 ⚽ 🏀 ⚽ 🏈 ⚽ ❓",
  "opts": [
   "🎾",
   "🏀",
   "🏈"
  ],
  "a": 1,
  "why": "⚽・🏀・⚽・🏈 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "⚽",
    "🏀",
    "⚽",
    "🏈",
    "⚽",
    "🏀",
    "⚽",
    "🏈",
    "⚽"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-10"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、10ばんめに くるのは？\n🍌 🍓 🍌 🍓 …",
  "opts": [
   "🍇",
   "🍓",
   "🍎"
  ],
  "a": 1,
  "why": "🍌・🍓の くりかえし。ゆびで 10ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🍌",
    "🍓",
    "🍌",
    "🍓"
   ],
   "pos": 10
  },
  "id": "kimari-h-11"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🍇🍓🍇🍇🍇🍓",
   "🍇🍓🍇🍓🍇🍓",
   "🍓🍇🍓🍇🍓🍇"
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
  "q": "つぎに くるのは？\n🌊 🌈 🌊 ⭐ 🌊 🌈 🌊 ⭐ 🌊 🌈 🌊 ❓",
  "opts": [
   "🌈",
   "⭐",
   "🌊"
  ],
  "a": 1,
  "why": "🌊・🌈・🌊・⭐ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌊",
    "🌈",
    "🌊",
    "⭐",
    "🌊",
    "🌈",
    "🌊",
    "⭐",
    "🌊",
    "🌈",
    "🌊"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-13"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、8ばんめに くるのは？\n🐸 🐰 🐶 🐸 🐰 🐶 …",
  "opts": [
   "🐰",
   "🐸",
   "🐱"
  ],
  "a": 0,
  "why": "🐸・🐰・🐶の くりかえし。ゆびで 8ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🐸",
    "🐰",
    "🐶",
    "🐸",
    "🐰",
    "🐶"
   ],
   "pos": 8
  },
  "id": "kimari-h-14"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🎀🎉🎀🎉🎉🎉",
   "🎀🎉🎀🎉🎀🎉",
   "🎉🎀🎉🎀🎉🎀"
  ],
  "a": 0,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-15"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🔔 🔑 🔦 🔑 🔔 🔑 🔦 🔑 🔔 🔑 🔦 ❓",
  "opts": [
   "🔔",
   "⏰",
   "🔑"
  ],
  "a": 2,
  "why": "🔔・🔑・🔦・🔑 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔔",
    "🔑",
    "🔦",
    "🔑",
    "🔔",
    "🔑",
    "🔦",
    "🔑",
    "🔔",
    "🔑",
    "🔦"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-16"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、11ばんめに くるのは？\n🐸 🐶 🐸 🐶 …",
  "opts": [
   "🐱",
   "🐸",
   "🐰"
  ],
  "a": 1,
  "why": "🐸・🐶の くりかえし。ゆびで 11ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🐸",
    "🐶",
    "🐸",
    "🐶"
   ],
   "pos": 11
  },
  "id": "kimari-h-17"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🍌🍎🍌🍎🍌🍎",
   "🍎🍌🍎🍌🍎🍌",
   "🍎🍌🍌🍌🍎🍌"
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
  "q": "つぎに くるのは？\n🎾 🏀 ⚽ 🏈 🎾 🏀 ⚽ 🏈 🎾 🏀 ❓",
  "opts": [
   "⚽",
   "🏀",
   "🎾"
  ],
  "a": 0,
  "why": "🎾・🏀・⚽・🏈 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🎾",
    "🏀",
    "⚽",
    "🏈",
    "🎾",
    "🏀",
    "⚽",
    "🏈",
    "🎾",
    "🏀"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-19"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、11ばんめに くるのは？\n🥦 🍅 🥦 🍅 …",
  "opts": [
   "🍅",
   "🥦",
   "🥕"
  ],
  "a": 1,
  "why": "🥦・🍅の くりかえし。ゆびで 11ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🥦",
    "🍅",
    "🥦",
    "🍅"
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
   "🐛🐞🐛🐛🐛🐞",
   "🐛🐞🐛🐞🐛🐞",
   "🐞🐛🐞🐛🐞🐛"
  ],
  "a": 0,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-21"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🌊 ⭐ 🌈 ⭐ 🌊 ⭐ 🌈 ⭐ 🌊 ⭐ ❓",
  "opts": [
   "⭐",
   "🌊",
   "🌈"
  ],
  "a": 2,
  "why": "🌊・⭐・🌈・⭐ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌊",
    "⭐",
    "🌈",
    "⭐",
    "🌊",
    "⭐",
    "🌈",
    "⭐",
    "🌊",
    "⭐"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-22"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、11ばんめに くるのは？\n🌵 🌴 🍄 🌵 🌴 🍄 …",
  "opts": [
   "🌴",
   "🌵",
   "🍄"
  ],
  "a": 0,
  "why": "🌵・🌴・🍄の くりかえし。ゆびで 11ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🌵",
    "🌴",
    "🍄",
    "🌵",
    "🌴",
    "🍄"
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
   "🍭🍪🍭🍭🍭🍪",
   "🍭🍪🍭🍪🍭🍪",
   "🍪🍭🍪🍭🍪🍭"
  ],
  "a": 0,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-24"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🍓 🫐 🍋 🍈 🍓 🫐 🍋 🍈 🍓 🫐 ❓",
  "opts": [
   "🍈",
   "🍋",
   "🫐"
  ],
  "a": 1,
  "why": "🍓・🫐・🍋・🍈 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍓",
    "🫐",
    "🍋",
    "🍈",
    "🍓",
    "🫐",
    "🍋",
    "🍈",
    "🍓",
    "🫐"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-25"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、8ばんめに くるのは？\n🎀 🎩 🎀 🎩 …",
  "opts": [
   "🧢",
   "🎀",
   "🎩"
  ],
  "a": 2,
  "why": "🎀・🎩の くりかえし。ゆびで 8ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🎀",
    "🎩",
    "🎀",
    "🎩"
   ],
   "pos": 8
  },
  "id": "kimari-h-26"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🌷🌵🌷🌵🌷🌵",
   "🌵🌷🌵🌷🌵🌷",
   "🌵🌷🌵🌵🌵🌷"
  ],
  "a": 2,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-27"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🐬 🐟 🐙 🦀 🐬 🐟 🐙 🦀 🐬 ❓",
  "opts": [
   "🐬",
   "🐟",
   "🐙"
  ],
  "a": 1,
  "why": "🐬・🐟・🐙・🦀 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐬",
    "🐟",
    "🐙",
    "🦀",
    "🐬",
    "🐟",
    "🐙",
    "🦀",
    "🐬"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-28"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、10ばんめに くるのは？\n🚁 🚂 🚁 🚂 …",
  "opts": [
   "🚂",
   "🚜",
   "🚤"
  ],
  "a": 0,
  "why": "🚁・🚂の くりかえし。ゆびで 10ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🚁",
    "🚂",
    "🚁",
    "🚂"
   ],
   "pos": 10
  },
  "id": "kimari-h-29"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🍋🍈🍋🍋🍋🍈",
   "🍋🍈🍋🍈🍋🍈",
   "🍈🍋🍈🍋🍈🍋"
  ],
  "a": 0,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-30"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🍰 🍩 🍰 🍪 🍰 🍩 🍰 🍪 🍰 🍩 ❓",
  "opts": [
   "🍭",
   "🍰",
   "🍩"
  ],
  "a": 1,
  "why": "🍰・🍩・🍰・🍪 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🍰",
    "🍩",
    "🍰",
    "🍪",
    "🍰",
    "🍩",
    "🍰",
    "🍪",
    "🍰",
    "🍩"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-31"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、8ばんめに くるのは？\n🚜 🚤 🚂 🚜 🚤 🚂 …",
  "opts": [
   "🚁",
   "🚂",
   "🚤"
  ],
  "a": 2,
  "why": "🚜・🚤・🚂の くりかえし。ゆびで 8ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🚜",
    "🚤",
    "🚂",
    "🚜",
    "🚤",
    "🚂"
   ],
   "pos": 8
  },
  "id": "kimari-h-32"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🌲🌵🌲🌵🌲🌵",
   "🌵🌲🌵🌲🌵🌲",
   "🌲🌵🌲🌲🌲🌵"
  ],
  "a": 2,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-33"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🔴 🟢 🟡 🔵 🔴 🟢 🟡 🔵 🔴 🟢 ❓",
  "opts": [
   "🟡",
   "🔵",
   "🟢"
  ],
  "a": 0,
  "why": "🔴・🟢・🟡・🔵 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🔴",
    "🟢",
    "🟡",
    "🔵",
    "🔴",
    "🟢",
    "🟡",
    "🔵",
    "🔴",
    "🟢"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-34"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、10ばんめに くるのは？\n🎉 🎈 🎉 🎈 …",
  "opts": [
   "🎈",
   "🎁",
   "🎉"
  ],
  "a": 0,
  "why": "🎉・🎈の くりかえし。ゆびで 10ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🎉",
    "🎈",
    "🎉",
    "🎈"
   ],
   "pos": 10
  },
  "id": "kimari-h-35"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🍰🍩🍰🍩🍰🍩",
   "🍩🍰🍩🍰🍩🍰",
   "🍩🍰🍩🍰🍰🍰"
  ],
  "a": 2,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-36"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🌙 ⭐ ☀️ ☁️ 🌙 ⭐ ☀️ ☁️ 🌙 ⭐ ☀️ ❓",
  "opts": [
   "☀️",
   "🌙",
   "☁️"
  ],
  "a": 2,
  "why": "🌙・⭐・☀️・☁️ の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🌙",
    "⭐",
    "☀️",
    "☁️",
    "🌙",
    "⭐",
    "☀️",
    "☁️",
    "🌙",
    "⭐",
    "☀️"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-37"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "この ままつづくと、10ばんめに くるのは？\n🔔 ⏰ 🔔 ⏰ …",
  "opts": [
   "🔔",
   "🔦",
   "⏰"
  ],
  "a": 2,
  "why": "🔔・⏰の くりかえし。ゆびで 10ばんめまで かぞえてみよう",
  "meta": {
   "kind": "kimari-jump",
   "prefix": [
    "🔔",
    "⏰",
    "🔔",
    "⏰"
   ],
   "pos": 10
  },
  "id": "kimari-h-38"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "きまりが ちがうのは どれ？",
  "opts": [
   "🐛🐌🐛🐌🐛🐌",
   "🐌🐛🐛🐛🐌🐛",
   "🐌🐛🐌🐛🐌🐛"
  ],
  "a": 1,
  "why": "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
  "meta": {
   "kind": "kimari-broken"
  },
  "id": "kimari-h-39"
 },
 {
  "category": "kimari",
  "difficulty": "hard",
  "q": "つぎに くるのは？\n🐰 🐱 🐸 🐶 🐰 🐱 🐸 🐶 🐰 🐱 ❓",
  "opts": [
   "🐸",
   "🐱",
   "🐶"
  ],
  "a": 0,
  "why": "🐰・🐱・🐸・🐶 の くりかえしだよ",
  "meta": {
   "kind": "kimari-next",
   "prefix": [
    "🐰",
    "🐱",
    "🐸",
    "🐶",
    "🐰",
    "🐱",
    "🐸",
    "🐶",
    "🐰",
    "🐱"
   ],
   "period": 4,
   "grouped": false
  },
  "id": "kimari-h-40"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "📏 じょうぎ",
   "🍦 アイスクリーム",
   "🍫 チョコレート"
  ],
  "a": 0,
  "why": "📏 じょうぎだけ おかしじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "📏 じょうぎ",
   "items": [
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": [
      "made",
      "long"
     ]
    },
    {
     "label": "🍦 アイスクリーム",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
    },
    {
     "label": "🍫 チョコレート",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
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
   "🧢 ぼうし",
   "🔪 ほうちょう",
   "👞 くつ"
  ],
  "a": 1,
  "why": "🔪 ほうちょうだけ ようふくじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🔪 ほうちょう",
   "items": [
    {
     "label": "🧢 ぼうし",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🔪 ほうちょう",
     "cat": "tool",
     "props": [
      "cut",
      "made"
     ]
    },
    {
     "label": "👞 くつ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
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
   "🦒 きりん",
   "🐶 いぬ",
   "🎈 ふうせん"
  ],
  "a": 2,
  "why": "🎈 ふうせんだけ どうぶつじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🎈 ふうせん",
   "items": [
    {
     "label": "🦒 きりん",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🐶 いぬ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🎈 ふうせん",
     "cat": "toy",
     "props": [
      "made",
      "red",
      "round"
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
   "🍰 ケーキ",
   "🍬 あめ",
   "⛵ ふね"
  ],
  "a": 2,
  "why": "⛵ ふねだけ おかしじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "⛵ ふね",
   "items": [
    {
     "label": "🍰 ケーキ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
    },
    {
     "label": "🍬 あめ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
    },
    {
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water",
      "carry",
      "made"
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
   "🎺 ラッパ",
   "✈️ ひこうき",
   "🔔 すず"
  ],
  "a": 1,
  "why": "✈️ ひこうきだけ がっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "✈️ ひこうき",
   "items": [
    {
     "label": "🎺 ラッパ",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
     ]
    },
    {
     "label": "🔔 すず",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
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
   "🍎 りんご",
   "🧅 たまねぎ",
   "🍓 いちご"
  ],
  "a": 1,
  "why": "🧅 たまねぎだけ くだものじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🧅 たまねぎ",
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
     "label": "🧅 たまねぎ",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
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
  "id": "nakama-e-6"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "👞 くつ",
   "👗 ワンピース",
   "🍉 すいか"
  ],
  "a": 2,
  "why": "🍉 すいかだけ ようふくじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🍉 すいか",
   "items": [
    {
     "label": "👞 くつ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "👗 ワンピース",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
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
   "👖 ズボン",
   "🥢 おはし",
   "👞 くつ"
  ],
  "a": 1,
  "why": "🥢 おはしだけ ようふくじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🥢 おはし",
   "items": [
    {
     "label": "👖 ズボン",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🥢 おはし",
     "cat": "tableware",
     "props": [
      "made",
      "long"
     ]
    },
    {
     "label": "👞 くつ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
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
   "🥤 コップ",
   "🍋 レモン",
   "🍽️ おさら"
  ],
  "a": 1,
  "why": "🍋 レモンだけ しょっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🍋 レモン",
   "items": [
    {
     "label": "🥤 コップ",
     "cat": "tableware",
     "props": [
      "made"
     ]
    },
    {
     "label": "🍋 レモン",
     "cat": "fruit",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🍽️ おさら",
     "cat": "tableware",
     "props": [
      "made"
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
   "🍰 ケーキ",
   "🍦 アイスクリーム",
   "🧸 ぬいぐるみ"
  ],
  "a": 2,
  "why": "🧸 ぬいぐるみだけ おかしじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🧸 ぬいぐるみ",
   "items": [
    {
     "label": "🍰 ケーキ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
    },
    {
     "label": "🍦 アイスクリーム",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
    },
    {
     "label": "🧸 ぬいぐるみ",
     "cat": "toy",
     "props": [
      "made"
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
   "📺 テレビ",
   "☁️ くも",
   "⛰️ やま"
  ],
  "a": 0,
  "why": "📺 テレビだけ しぜんの ものじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "📺 テレビ",
   "items": [
    {
     "label": "📺 テレビ",
     "cat": "furniture",
     "props": [
      "made",
      "square"
     ]
    },
    {
     "label": "☁️ くも",
     "cat": "nature",
     "props": [
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
  "id": "nakama-e-11"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🎸 ギター",
   "🍉 すいか",
   "🔔 すず"
  ],
  "a": 1,
  "why": "🍉 すいかだけ がっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🍉 すいか",
   "items": [
    {
     "label": "🎸 ギター",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
     ]
    },
    {
     "label": "🔔 すず",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
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
   "🎈 ふうせん",
   "🌈 にじ",
   "⛰️ やま"
  ],
  "a": 0,
  "why": "🎈 ふうせんだけ しぜんの ものじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🎈 ふうせん",
   "items": [
    {
     "label": "🎈 ふうせん",
     "cat": "toy",
     "props": [
      "made",
      "red",
      "round"
     ]
    },
    {
     "label": "🌈 にじ",
     "cat": "nature",
     "props": [
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
  "id": "nakama-e-13"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🎺 ラッパ",
   "🎸 ギター",
   "🍽️ おさら"
  ],
  "a": 2,
  "why": "🍽️ おさらだけ がっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🍽️ おさら",
   "items": [
    {
     "label": "🎺 ラッパ",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🎸 ギター",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🍽️ おさら",
     "cat": "tableware",
     "props": [
      "made"
     ]
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
   "👞 くつ",
   "🐝 はち",
   "👗 ワンピース"
  ],
  "a": 1,
  "why": "🐝 はちだけ ようふくじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🐝 はち",
   "items": [
    {
     "label": "👞 くつ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
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
     "label": "👗 ワンピース",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
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
   "🎹 ピアノ",
   "🎻 バイオリン",
   "🍇 ぶどう"
  ],
  "a": 2,
  "why": "🍇 ぶどうだけ がっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🍇 ぶどう",
   "items": [
    {
     "label": "🎹 ピアノ",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🎻 バイオリン",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
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
  "id": "nakama-e-16"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🎺 ラッパ",
   "🎸 ギター",
   "🪑 いす"
  ],
  "a": 2,
  "why": "🪑 いすだけ がっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🪑 いす",
   "items": [
    {
     "label": "🎺 ラッパ",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🎸 ギター",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🪑 いす",
     "cat": "furniture",
     "props": [
      "made",
      "fourlegs"
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
   "🎸 ギター",
   "🔔 すず",
   "🐴 うま"
  ],
  "a": 2,
  "why": "🐴 うまだけ がっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🐴 うま",
   "items": [
    {
     "label": "🎸 ギター",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🔔 すず",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
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
   "🌙 つき",
   "🚲 じてんしゃ",
   "🚗 くるま"
  ],
  "a": 0,
  "why": "🌙 つきだけ のりものじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🌙 つき",
   "items": [
    {
     "label": "🌙 つき",
     "cat": "nature",
     "props": [
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🚲 じてんしゃ",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
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
   "🪑 いす",
   "🛏️ ベッド",
   "🍊 みかん"
  ],
  "a": 2,
  "why": "🍊 みかんだけ かぐじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🍊 みかん",
   "items": [
    {
     "label": "🪑 いす",
     "cat": "furniture",
     "props": [
      "made",
      "fourlegs"
     ]
    },
    {
     "label": "🛏️ ベッド",
     "cat": "furniture",
     "props": [
      "made",
      "fourlegs"
     ]
    },
    {
     "label": "🍊 みかん",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
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
   "🎸 ギター",
   "🎻 バイオリン",
   "📺 テレビ"
  ],
  "a": 2,
  "why": "📺 テレビだけ がっきじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "📺 テレビ",
   "items": [
    {
     "label": "🎸 ギター",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🎻 バイオリン",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "📺 テレビ",
     "cat": "furniture",
     "props": [
      "made",
      "square"
     ]
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
   "👕 シャツ",
   "🍅 トマト",
   "👗 ワンピース"
  ],
  "a": 1,
  "why": "🍅 トマトだけ ようふくじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🍅 トマト",
   "items": [
    {
     "label": "👕 シャツ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural",
      "round"
     ]
    },
    {
     "label": "👗 ワンピース",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
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
   "👖 ズボン",
   "👞 くつ",
   "🐸 かえる"
  ],
  "a": 2,
  "why": "🐸 かえるだけ ようふくじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🐸 かえる",
   "items": [
    {
     "label": "👖 ズボン",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "👞 くつ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🐸 かえる",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "water",
      "green"
     ]
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
   "🍑 もも",
   "🪑 いす"
  ],
  "a": 1,
  "why": "🍑 ももだけ かぐじゃないね",
  "meta": {
   "kind": "nakama",
   "axisType": "concrete",
   "odd": "🍑 もも",
   "items": [
    {
     "label": "🛏️ ベッド",
     "cat": "furniture",
     "props": [
      "made",
      "fourlegs"
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
     "label": "🪑 いす",
     "cat": "furniture",
     "props": [
      "made",
      "fourlegs"
     ]
    }
   ]
  },
  "id": "nakama-e-24"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "のりものの なかまは どれ？",
  "opts": [
   "🌙 つき",
   "⛵ ふね",
   "✏️ えんぴつ"
  ],
  "a": 1,
  "why": "⛵ ふねは のりものの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "vehicle",
   "axisType": "concrete",
   "correct": "⛵ ふね",
   "items": [
    {
     "label": "🌙 つき",
     "cat": "nature",
     "props": [
      "natural",
      "yellow"
     ]
    },
    {
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water",
      "carry",
      "made"
     ]
    },
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
     ]
    }
   ]
  },
  "id": "nakama-e-25"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "ほそながい なかまは どれ？",
  "opts": [
   "🍅 トマト",
   "🍈 メロン",
   "📏 じょうぎ"
  ],
  "a": 2,
  "why": "📏 じょうぎは「ほそながい」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "long",
   "axisType": "concrete",
   "correct": "📏 じょうぎ",
   "items": [
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural",
      "round"
     ]
    },
    {
     "label": "🍈 メロン",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "green",
      "round"
     ]
    },
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": [
      "made",
      "long"
     ]
    }
   ]
  },
  "id": "nakama-e-26"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "かぐの なかまは どれ？",
  "opts": [
   "📺 テレビ",
   "🐴 うま",
   "🌷 チューリップ"
  ],
  "a": 0,
  "why": "📺 テレビは かぐの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "furniture",
   "axisType": "concrete",
   "correct": "📺 テレビ",
   "items": [
    {
     "label": "📺 テレビ",
     "cat": "furniture",
     "props": [
      "made",
      "square"
     ]
    },
    {
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
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
  "id": "nakama-e-27"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "ほそながい なかまは どれ？",
  "opts": [
   "🥕 にんじん",
   "📺 テレビ",
   "📕 ほん"
  ],
  "a": 0,
  "why": "🥕 にんじんは「ほそながい」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "long",
   "axisType": "concrete",
   "correct": "🥕 にんじん",
   "items": [
    {
     "label": "🥕 にんじん",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground",
      "long"
     ]
    },
    {
     "label": "📺 テレビ",
     "cat": "furniture",
     "props": [
      "made",
      "square"
     ]
    },
    {
     "label": "📕 ほん",
     "cat": "stationery",
     "props": [
      "made",
      "square"
     ]
    }
   ]
  },
  "id": "nakama-e-28"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "くだものの なかまは どれ？",
  "opts": [
   "🚗 くるま",
   "🍈 メロン",
   "🐤 ひよこ"
  ],
  "a": 1,
  "why": "🍈 メロンは くだものの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "fruit",
   "axisType": "concrete",
   "correct": "🍈 メロン",
   "items": [
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "🍈 メロン",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "green",
      "round"
     ]
    },
    {
     "label": "🐤 ひよこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    }
   ]
  },
  "id": "nakama-e-29"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "みどりいろの なかまは どれ？",
  "opts": [
   "🐤 ひよこ",
   "🚕 タクシー",
   "🍈 メロン"
  ],
  "a": 2,
  "why": "🍈 メロンは「みどりいろの」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "green",
   "axisType": "concrete",
   "correct": "🍈 メロン",
   "items": [
    {
     "label": "🐤 ひよこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🚕 タクシー",
     "cat": "vehicle",
     "props": [
      "carry",
      "made",
      "yellow"
     ]
    },
    {
     "label": "🍈 メロン",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "green",
      "round"
     ]
    }
   ]
  },
  "id": "nakama-e-30"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "ぶんぼうぐの なかまは どれ？",
  "opts": [
   "🥢 おはし",
   "🚒 しょうぼうしゃ",
   "📏 じょうぎ"
  ],
  "a": 2,
  "why": "📏 じょうぎは ぶんぼうぐの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "stationery",
   "axisType": "concrete",
   "correct": "📏 じょうぎ",
   "items": [
    {
     "label": "🥢 おはし",
     "cat": "tableware",
     "props": [
      "made",
      "long"
     ]
    },
    {
     "label": "🚒 しょうぼうしゃ",
     "cat": "vehicle",
     "props": [
      "red",
      "carry",
      "made"
     ]
    },
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": [
      "made",
      "long"
     ]
    }
   ]
  },
  "id": "nakama-e-31"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "みどりいろの なかまは どれ？",
  "opts": [
   "🍓 いちご",
   "🌙 つき",
   "🐢 かめ"
  ],
  "a": 2,
  "why": "🐢 かめは「みどりいろの」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "green",
   "axisType": "concrete",
   "correct": "🐢 かめ",
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
     "label": "🌙 つき",
     "cat": "nature",
     "props": [
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🐢 かめ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "water",
      "green"
     ]
    }
   ]
  },
  "id": "nakama-e-32"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "ようふくの なかまは どれ？",
  "opts": [
   "🐤 ひよこ",
   "🐘 ぞう",
   "🧢 ぼうし"
  ],
  "a": 2,
  "why": "🧢 ぼうしは ようふくの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "clothing",
   "axisType": "concrete",
   "correct": "🧢 ぼうし",
   "items": [
    {
     "label": "🐤 ひよこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    },
    {
     "label": "🧢 ぼうし",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-e-33"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "ほそながい なかまは どれ？",
  "opts": [
   "🎈 ふうせん",
   "📓 ノート",
   "🪚 のこぎり"
  ],
  "a": 2,
  "why": "🪚 のこぎりは「ほそながい」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "long",
   "axisType": "concrete",
   "correct": "🪚 のこぎり",
   "items": [
    {
     "label": "🎈 ふうせん",
     "cat": "toy",
     "props": [
      "made",
      "red",
      "round"
     ]
    },
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": [
      "made",
      "square"
     ]
    },
    {
     "label": "🪚 のこぎり",
     "cat": "tool",
     "props": [
      "cut",
      "made",
      "long"
     ]
    }
   ]
  },
  "id": "nakama-e-34"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "やさいの なかまは どれ？",
  "opts": [
   "🍬 あめ",
   "🥄 スプーン",
   "🌽 とうもろこし"
  ],
  "a": 2,
  "why": "🌽 とうもろこしは やさいの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "vegetable",
   "axisType": "concrete",
   "correct": "🌽 とうもろこし",
   "items": [
    {
     "label": "🍬 あめ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
    },
    {
     "label": "🥄 スプーン",
     "cat": "tableware",
     "props": [
      "made"
     ]
    },
    {
     "label": "🌽 とうもろこし",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    }
   ]
  },
  "id": "nakama-e-35"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "あかい なかまは どれ？",
  "opts": [
   "🌽 とうもろこし",
   "🌳 き",
   "🍓 いちご"
  ],
  "a": 2,
  "why": "🍓 いちごは「あかい」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "red",
   "axisType": "concrete",
   "correct": "🍓 いちご",
   "items": [
    {
     "label": "🌽 とうもろこし",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "green"
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
  "id": "nakama-e-36"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "ぶんぼうぐの なかまは どれ？",
  "opts": [
   "📺 テレビ",
   "🐢 かめ",
   "🖍️ クレヨン"
  ],
  "a": 2,
  "why": "🖍️ クレヨンは ぶんぼうぐの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "stationery",
   "axisType": "concrete",
   "correct": "🖍️ クレヨン",
   "items": [
    {
     "label": "📺 テレビ",
     "cat": "furniture",
     "props": [
      "made",
      "square"
     ]
    },
    {
     "label": "🐢 かめ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "water",
      "green"
     ]
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-e-37"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "ほそながい なかまは どれ？",
  "opts": [
   "📺 テレビ",
   "🥒 きゅうり",
   "🍊 みかん"
  ],
  "a": 1,
  "why": "🥒 きゅうりは「ほそながい」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "long",
   "axisType": "concrete",
   "correct": "🥒 きゅうり",
   "items": [
    {
     "label": "📺 テレビ",
     "cat": "furniture",
     "props": [
      "made",
      "square"
     ]
    },
    {
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "green",
      "long"
     ]
    },
    {
     "label": "🍊 みかん",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
     ]
    }
   ]
  },
  "id": "nakama-e-38"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "のりものの なかまは どれ？",
  "opts": [
   "⚽ ボール",
   "🦁 ライオン",
   "✈️ ひこうき"
  ],
  "a": 2,
  "why": "✈️ ひこうきは のりものの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "vehicle",
   "axisType": "concrete",
   "correct": "✈️ ひこうき",
   "items": [
    {
     "label": "⚽ ボール",
     "cat": "toy",
     "props": [
      "made",
      "round"
     ]
    },
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-e-39"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "ほそながい なかまは どれ？",
  "opts": [
   "🍉 すいか",
   "🥒 きゅうり",
   "🎲 サイコロ"
  ],
  "a": 1,
  "why": "🥒 きゅうりは「ほそながい」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "long",
   "axisType": "concrete",
   "correct": "🥒 きゅうり",
   "items": [
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
     ]
    },
    {
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "green",
      "long"
     ]
    },
    {
     "label": "🎲 サイコロ",
     "cat": "toy",
     "props": [
      "made",
      "square"
     ]
    }
   ]
  },
  "id": "nakama-e-40"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "しょっきの なかまは どれ？",
  "opts": [
   "🐟 さかな",
   "🥄 スプーン",
   "🍑 もも"
  ],
  "a": 1,
  "why": "🥄 スプーンは しょっきの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "tableware",
   "axisType": "concrete",
   "correct": "🥄 スプーン",
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
     "label": "🥄 スプーン",
     "cat": "tableware",
     "props": [
      "made"
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
  "id": "nakama-e-41"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "あかい なかまは どれ？",
  "opts": [
   "🍒 さくらんぼ",
   "🚕 タクシー",
   "🐤 ひよこ"
  ],
  "a": 0,
  "why": "🍒 さくらんぼは「あかい」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "red",
   "axisType": "concrete",
   "correct": "🍒 さくらんぼ",
   "items": [
    {
     "label": "🍒 さくらんぼ",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "red",
      "round"
     ]
    },
    {
     "label": "🚕 タクシー",
     "cat": "vehicle",
     "props": [
      "carry",
      "made",
      "yellow"
     ]
    },
    {
     "label": "🐤 ひよこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    }
   ]
  },
  "id": "nakama-e-42"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "がっきの なかまは どれ？",
  "opts": [
   "🌹 ばら",
   "🐴 うま",
   "🔔 すず"
  ],
  "a": 2,
  "why": "🔔 すずは がっきの なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "cat",
   "axis": "instrument",
   "axisType": "concrete",
   "correct": "🔔 すず",
   "items": [
    {
     "label": "🌹 ばら",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "red"
     ]
    },
    {
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    },
    {
     "label": "🔔 すず",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-e-43"
 },
 {
  "category": "nakama",
  "difficulty": "easy",
  "q": "きいろい なかまは どれ？",
  "opts": [
   "🌳 き",
   "🌽 とうもろこし",
   "🎈 ふうせん"
  ],
  "a": 1,
  "why": "🌽 とうもろこしは「きいろい」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "yellow",
   "axisType": "concrete",
   "correct": "🌽 とうもろこし",
   "items": [
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "green"
     ]
    },
    {
     "label": "🌽 とうもろこし",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🎈 ふうせん",
     "cat": "toy",
     "props": [
      "made",
      "red",
      "round"
     ]
    }
   ]
  },
  "id": "nakama-e-44"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🛏️ ベッド",
   "🪑 いす",
   "📺 テレビ"
  ],
  "a": 2,
  "why": "いすと ベッドは「あしが 4ほん ある」なかま。📺 テレビだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📺 テレビ",
   "items": [
    {
     "label": "🛏️ ベッド",
     "cat": "furniture",
     "props": [
      "made",
      "fourlegs"
     ]
    },
    {
     "label": "🪑 いす",
     "cat": "furniture",
     "props": [
      "made",
      "fourlegs"
     ]
    },
    {
     "label": "📺 テレビ",
     "cat": "furniture",
     "props": [
      "made",
      "square"
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
   "🐘 ぞう",
   "🐴 うま",
   "🐱 ねこ"
  ],
  "a": 2,
  "why": "ぞうと うまは「ひとを のせて はこぶ」なかま。🐱 ねこだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐱 ねこ",
   "items": [
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    },
    {
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    },
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
   "🚌 バス",
   "🚁 ヘリコプター",
   "🚀 ロケット"
  ],
  "a": 0,
  "why": "ロケットと ヘリコプターは「そらを とぶ」なかま。🚌 バスだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🚌 バス",
   "items": [
    {
     "label": "🚌 バス",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "🚁 ヘリコプター",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
     ]
    },
    {
     "label": "🚀 ロケット",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
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
   "🐘 ぞう",
   "🐴 うま",
   "🐟 さかな"
  ],
  "a": 2,
  "why": "うまと ぞうは「ひとを のせて はこぶ」なかま。🐟 さかなだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐟 さかな",
   "items": [
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    },
    {
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
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
  "id": "nakama-n-4"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🦒 きりん",
   "🐦 ことり",
   "🦋 ちょう"
  ],
  "a": 0,
  "why": "ちょうと ことりは「そらを とぶ」なかま。🦒 きりんだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🦒 きりん",
   "items": [
    {
     "label": "🦒 きりん",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
   "🦋 ちょう",
   "🐦 ことり",
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
     "label": "🐮 うし",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
   "🌽 とうもろこし",
   "🥔 じゃがいも",
   "🍠 さつまいも"
  ],
  "a": 0,
  "why": "じゃがいもと さつまいもは「つちの なかで そだつ」なかま。🌽 とうもろこしだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🌽 とうもろこし",
   "items": [
    {
     "label": "🌽 とうもろこし",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🥔 じゃがいも",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
     ]
    },
    {
     "label": "🍠 さつまいも",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
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
   "🐘 ぞう",
   "🐙 たこ",
   "🐴 うま"
  ],
  "a": 1,
  "why": "ぞうと うまは「ひとを のせて はこぶ」なかま。🐙 たこだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐙 たこ",
   "items": [
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
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
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
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
   "✏️ えんぴつ",
   "🖊️ ペン",
   "📏 じょうぎ"
  ],
  "a": 2,
  "why": "ペンと えんぴつは「かく・ぬる」なかま。📏 じょうぎだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📏 じょうぎ",
   "items": [
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
     ]
    },
    {
     "label": "🖊️ ペン",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
     ]
    },
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": [
      "made",
      "long"
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
   "🐮 うし",
   "🐴 うま",
   "🐘 ぞう"
  ],
  "a": 0,
  "why": "うまと ぞうは「ひとを のせて はこぶ」なかま。🐮 うしだけ ちがうね",
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
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    },
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
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
   "🚀 ロケット",
   "🚲 じてんしゃ",
   "✈️ ひこうき"
  ],
  "a": 1,
  "why": "ロケットと ひこうきは「そらを とぶ」なかま。🚲 じてんしゃだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🚲 じてんしゃ",
   "items": [
    {
     "label": "🚀 ロケット",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
     ]
    },
    {
     "label": "🚲 じてんしゃ",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
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
      "natural",
      "fourlegs"
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
   "🥔 じゃがいも",
   "🍠 さつまいも",
   "🍅 トマト"
  ],
  "a": 2,
  "why": "さつまいもと じゃがいもは「つちの なかで そだつ」なかま。🍅 トマトだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🍅 トマト",
   "items": [
    {
     "label": "🥔 じゃがいも",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
     ]
    },
    {
     "label": "🍠 さつまいも",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
     ]
    },
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural",
      "round"
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
   "🥔 じゃがいも",
   "🧅 たまねぎ",
   "🍅 トマト"
  ],
  "a": 2,
  "why": "たまねぎと じゃがいもは「つちの なかで そだつ」なかま。🍅 トマトだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🍅 トマト",
   "items": [
    {
     "label": "🥔 じゃがいも",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
     ]
    },
    {
     "label": "🧅 たまねぎ",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
     ]
    },
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural",
      "round"
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
   "🦁 ライオン",
   "🐜 あり",
   "🐶 いぬ"
  ],
  "a": 1,
  "why": "いぬと ライオンは「あしが 4ほん ある」なかま。🐜 ありだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐜 あり",
   "items": [
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
     "label": "🐶 いぬ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
   "🖊️ ペン",
   "🖌️ ふで",
   "📓 ノート"
  ],
  "a": 2,
  "why": "ふでと ペンは「かく・ぬる」なかま。📓 ノートだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📓 ノート",
   "items": [
    {
     "label": "🖊️ ペン",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
     ]
    },
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
     ]
    },
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": [
      "made",
      "square"
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
   "📓 ノート",
   "✏️ えんぴつ",
   "🖊️ ペン"
  ],
  "a": 0,
  "why": "ペンと えんぴつは「かく・ぬる」なかま。📓 ノートだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📓 ノート",
   "items": [
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": [
      "made",
      "square"
     ]
    },
    {
     "label": "✏️ えんぴつ",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
     ]
    },
    {
     "label": "🖊️ ペン",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
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
   "🚕 タクシー",
   "🚀 ロケット",
   "🚁 ヘリコプター"
  ],
  "a": 0,
  "why": "ヘリコプターと ロケットは「そらを とぶ」なかま。🚕 タクシーだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🚕 タクシー",
   "items": [
    {
     "label": "🚕 タクシー",
     "cat": "vehicle",
     "props": [
      "carry",
      "made",
      "yellow"
     ]
    },
    {
     "label": "🚀 ロケット",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
     ]
    },
    {
     "label": "🚁 ヘリコプター",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
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
   "🖌️ ふで",
   "📏 じょうぎ",
   "🖊️ ペン"
  ],
  "a": 1,
  "why": "ペンと ふでは「かく・ぬる」なかま。📏 じょうぎだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "📏 じょうぎ",
   "items": [
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
     ]
    },
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": [
      "made",
      "long"
     ]
    },
    {
     "label": "🖊️ ペン",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
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
   "🐴 うま",
   "🐝 はち"
  ],
  "a": 1,
  "why": "はちと ことりは「そらを とぶ」なかま。🐴 うまだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐴 うま",
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
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
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
   "🐴 うま",
   "🐷 ぶた",
   "🐘 ぞう"
  ],
  "a": 1,
  "why": "ぞうと うまは「ひとを のせて はこぶ」なかま。🐷 ぶただけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐷 ぶた",
   "items": [
    {
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    },
    {
     "label": "🐷 ぶた",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
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
   "🐟 さかな",
   "🐳 くじら",
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
  "id": "nakama-n-23"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🐶 いぬ",
   "🐘 ぞう",
   "🐴 うま"
  ],
  "a": 0,
  "why": "ぞうと うまは「ひとを のせて はこぶ」なかま。🐶 いぬだけ ちがうね",
  "meta": {
   "kind": "nakama",
   "axisType": "functional",
   "odd": "🐶 いぬ",
   "items": [
    {
     "label": "🐶 いぬ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    },
    {
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    }
   ]
  },
  "id": "nakama-n-24"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "ひとを のせて はこぶ なかまは どれ？",
  "opts": [
   "🐢 かめ",
   "🐶 いぬ",
   "🐘 ぞう"
  ],
  "a": 2,
  "why": "🐘 ぞうは「ひとを のせて はこぶ」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "carry",
   "axisType": "functional",
   "correct": "🐘 ぞう",
   "items": [
    {
     "label": "🐢 かめ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "water",
      "green"
     ]
    },
    {
     "label": "🐶 いぬ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    }
   ]
  },
  "id": "nakama-n-25"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "ものを きる なかまは どれ？",
  "opts": [
   "🪚 のこぎり",
   "🔨 かなづち",
   "🧹 ほうき"
  ],
  "a": 0,
  "why": "🪚 のこぎりは「ものを きる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "cut",
   "axisType": "functional",
   "correct": "🪚 のこぎり",
   "items": [
    {
     "label": "🪚 のこぎり",
     "cat": "tool",
     "props": [
      "cut",
      "made",
      "long"
     ]
    },
    {
     "label": "🔨 かなづち",
     "cat": "tool",
     "props": [
      "made"
     ]
    },
    {
     "label": "🧹 ほうき",
     "cat": "tool",
     "props": [
      "made",
      "long"
     ]
    }
   ]
  },
  "id": "nakama-n-26"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "みずの なかや うえに いる なかまは どれ？",
  "opts": [
   "🐳 くじら",
   "🦁 ライオン",
   "🐷 ぶた"
  ],
  "a": 0,
  "why": "🐳 くじらは「みずの なかや うえに いる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "water",
   "axisType": "functional",
   "correct": "🐳 くじら",
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
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🐷 ぶた",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    }
   ]
  },
  "id": "nakama-n-27"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "かいたり ぬったり する なかまは どれ？",
  "opts": [
   "📓 ノート",
   "🖍️ クレヨン",
   "✂️ はさみ"
  ],
  "a": 1,
  "why": "🖍️ クレヨンは「かいたり ぬったり する」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "draw",
   "axisType": "functional",
   "correct": "🖍️ クレヨン",
   "items": [
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": [
      "made",
      "square"
     ]
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw",
      "made"
     ]
    },
    {
     "label": "✂️ はさみ",
     "cat": "stationery",
     "props": [
      "cut",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-n-28"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "おとを ならす なかまは どれ？",
  "opts": [
   "🍎 りんご",
   "🌽 とうもろこし",
   "🥁 たいこ"
  ],
  "a": 2,
  "why": "🥁 たいこは「おとを ならす」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "sound",
   "axisType": "functional",
   "correct": "🥁 たいこ",
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
     "label": "🌽 とうもろこし",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🥁 たいこ",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-n-29"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "みに つける なかまは どれ？",
  "opts": [
   "🌽 とうもろこし",
   "🔔 すず",
   "👞 くつ"
  ],
  "a": 2,
  "why": "👞 くつは「みに つける」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "wear",
   "axisType": "functional",
   "correct": "👞 くつ",
   "items": [
    {
     "label": "🌽 とうもろこし",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🔔 すず",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "👞 くつ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-n-30"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "みずの なかや うえに いる なかまは どれ？",
  "opts": [
   "🐳 くじら",
   "🐍 へび",
   "🐱 ねこ"
  ],
  "a": 0,
  "why": "🐳 くじらは「みずの なかや うえに いる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "water",
   "axisType": "functional",
   "correct": "🐳 くじら",
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
     "label": "🐍 へび",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "long"
     ]
    },
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
   "🚀 ロケット"
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
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water",
      "carry",
      "made"
     ]
    },
    {
     "label": "🚀 ロケット",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-n-32"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "ひとを のせて はこぶ なかまは どれ？",
  "opts": [
   "🐮 うし",
   "🦋 ちょう",
   "🐴 うま"
  ],
  "a": 2,
  "why": "🐴 うまは「ひとを のせて はこぶ」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "carry",
   "axisType": "functional",
   "correct": "🐴 うま",
   "items": [
    {
     "label": "🐮 うし",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    }
   ]
  },
  "id": "nakama-n-33"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "みに つける なかまは どれ？",
  "opts": [
   "🪚 のこぎり",
   "🐸 かえる",
   "👕 シャツ"
  ],
  "a": 2,
  "why": "👕 シャツは「みに つける」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "wear",
   "axisType": "functional",
   "correct": "👕 シャツ",
   "items": [
    {
     "label": "🪚 のこぎり",
     "cat": "tool",
     "props": [
      "cut",
      "made",
      "long"
     ]
    },
    {
     "label": "🐸 かえる",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "water",
      "green"
     ]
    },
    {
     "label": "👕 シャツ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-n-34"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "みずの なかや うえに いる なかまは どれ？",
  "opts": [
   "⛵ ふね",
   "🚕 タクシー",
   "✈️ ひこうき"
  ],
  "a": 0,
  "why": "⛵ ふねは「みずの なかや うえに いる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "water",
   "axisType": "functional",
   "correct": "⛵ ふね",
   "items": [
    {
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water",
      "carry",
      "made"
     ]
    },
    {
     "label": "🚕 タクシー",
     "cat": "vehicle",
     "props": [
      "carry",
      "made",
      "yellow"
     ]
    },
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-n-35"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "そらを とぶ なかまは どれ？",
  "opts": [
   "✈️ ひこうき",
   "🚌 バス",
   "🚗 くるま"
  ],
  "a": 0,
  "why": "✈️ ひこうきは「そらを とぶ」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "flies",
   "axisType": "functional",
   "correct": "✈️ ひこうき",
   "items": [
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
     ]
    },
    {
     "label": "🚌 バス",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-n-36"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "みずの なかや うえに いる なかまは どれ？",
  "opts": [
   "🐙 たこ",
   "🐶 いぬ",
   "🐜 あり"
  ],
  "a": 0,
  "why": "🐙 たこは「みずの なかや うえに いる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "water",
   "axisType": "functional",
   "correct": "🐙 たこ",
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
     "label": "🐶 いぬ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
  "id": "nakama-n-37"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "ひとを のせて はこぶ なかまは どれ？",
  "opts": [
   "🐴 うま",
   "🐜 あり",
   "🐰 うさぎ"
  ],
  "a": 0,
  "why": "🐴 うまは「ひとを のせて はこぶ」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "carry",
   "axisType": "functional",
   "correct": "🐴 うま",
   "items": [
    {
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
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
     "label": "🐰 うさぎ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    }
   ]
  },
  "id": "nakama-n-38"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "つちの なかで そだつ なかまは どれ？",
  "opts": [
   "🥒 きゅうり",
   "🥔 じゃがいも",
   "🍅 トマト"
  ],
  "a": 1,
  "why": "🥔 じゃがいもは「つちの なかで そだつ」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "underground",
   "axisType": "functional",
   "correct": "🥔 じゃがいも",
   "items": [
    {
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "green",
      "long"
     ]
    },
    {
     "label": "🥔 じゃがいも",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
     ]
    },
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural",
      "round"
     ]
    }
   ]
  },
  "id": "nakama-n-39"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "かいたり ぬったり する なかまは どれ？",
  "opts": [
   "📏 じょうぎ",
   "🖍️ クレヨン",
   "📕 ほん"
  ],
  "a": 1,
  "why": "🖍️ クレヨンは「かいたり ぬったり する」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "draw",
   "axisType": "functional",
   "correct": "🖍️ クレヨン",
   "items": [
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": [
      "made",
      "long"
     ]
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw",
      "made"
     ]
    },
    {
     "label": "📕 ほん",
     "cat": "stationery",
     "props": [
      "made",
      "square"
     ]
    }
   ]
  },
  "id": "nakama-n-40"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "ひとを のせて はこぶ なかまは どれ？",
  "opts": [
   "🐟 さかな",
   "🐰 うさぎ",
   "🐴 うま"
  ],
  "a": 2,
  "why": "🐴 うまは「ひとを のせて はこぶ」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "carry",
   "axisType": "functional",
   "correct": "🐴 うま",
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
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    }
   ]
  },
  "id": "nakama-n-41"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "ものを きる なかまは どれ？",
  "opts": [
   "📓 ノート",
   "✂️ はさみ",
   "🖌️ ふで"
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
     "label": "📓 ノート",
     "cat": "stationery",
     "props": [
      "made",
      "square"
     ]
    },
    {
     "label": "✂️ はさみ",
     "cat": "stationery",
     "props": [
      "cut",
      "made"
     ]
    },
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
     ]
    }
   ]
  },
  "id": "nakama-n-42"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "あしが 4ほん ある なかまは どれ？",
  "opts": [
   "🐱 ねこ",
   "🐤 ひよこ",
   "🐝 はち"
  ],
  "a": 0,
  "why": "🐱 ねこは「あしが 4ほん ある」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "fourlegs",
   "axisType": "functional",
   "correct": "🐱 ねこ",
   "items": [
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🐤 ひよこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "yellow"
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
  "id": "nakama-n-43"
 },
 {
  "category": "nakama",
  "difficulty": "normal",
  "q": "つちの なかで そだつ なかまは どれ？",
  "opts": [
   "🌽 とうもろこし",
   "🍅 トマト",
   "🧅 たまねぎ"
  ],
  "a": 2,
  "why": "🧅 たまねぎは「つちの なかで そだつ」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "underground",
   "axisType": "functional",
   "correct": "🧅 たまねぎ",
   "items": [
    {
     "label": "🌽 とうもろこし",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🍅 トマト",
     "cat": "vegetable",
     "props": [
      "food",
      "red",
      "natural",
      "round"
     ]
    },
    {
     "label": "🧅 たまねぎ",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
     ]
    }
   ]
  },
  "id": "nakama-n-44"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🎲 サイコロ",
   "🚂 きしゃ",
   "🦋 ちょう",
   "📺 テレビ"
  ],
  "a": 2,
  "why": "🦋 ちょうだけ ひとが つくった ものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🦋 ちょう",
   "items": [
    {
     "label": "🎲 サイコロ",
     "cat": "toy",
     "props": [
      "made",
      "square"
     ]
    },
    {
     "label": "🚂 きしゃ",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
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
     "label": "📺 テレビ",
     "cat": "furniture",
     "props": [
      "made",
      "square"
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
   "🐍 へび",
   "🌻 ひまわり",
   "🎹 ピアノ",
   "🐷 ぶた"
  ],
  "a": 2,
  "why": "🎹 ピアノだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🎹 ピアノ",
   "items": [
    {
     "label": "🐍 へび",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "long"
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
     "label": "🎹 ピアノ",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🐷 ぶた",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
   "🥔 じゃがいも",
   "🎹 ピアノ",
   "🌳 き",
   "🐴 うま"
  ],
  "a": 1,
  "why": "🎹 ピアノだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🎹 ピアノ",
   "items": [
    {
     "label": "🥔 じゃがいも",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
     ]
    },
    {
     "label": "🎹 ピアノ",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "green"
     ]
    },
    {
     "label": "🐴 うま",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
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
   "🌽 とうもろこし",
   "🍎 りんご",
   "🌹 ばら",
   "🧢 ぼうし"
  ],
  "a": 3,
  "why": "🧢 ぼうしだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🧢 ぼうし",
   "items": [
    {
     "label": "🌽 とうもろこし",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "yellow"
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
     "label": "🌹 ばら",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "red"
     ]
    },
    {
     "label": "🧢 ぼうし",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
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
   "🐳 くじら",
   "🚁 ヘリコプター",
   "🧦 くつした",
   "✈️ ひこうき"
  ],
  "a": 0,
  "why": "🐳 くじらだけ ひとが つくった ものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
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
     "label": "🚁 ヘリコプター",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
     ]
    },
    {
     "label": "🧦 くつした",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "✈️ ひこうき",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
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
   "🚗 くるま",
   "🍎 りんご",
   "🐍 へび",
   "🪨 いし"
  ],
  "a": 0,
  "why": "🚗 くるまだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🚗 くるま",
   "items": [
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
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
     "label": "🐍 へび",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "long"
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
  "id": "nakama-h-6"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "なかまはずれは どれ？",
  "opts": [
   "🧸 ぬいぐるみ",
   "🚕 タクシー",
   "🌳 き",
   "🔪 ほうちょう"
  ],
  "a": 2,
  "why": "🌳 きだけ ひとが つくった ものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🌳 き",
   "items": [
    {
     "label": "🧸 ぬいぐるみ",
     "cat": "toy",
     "props": [
      "made"
     ]
    },
    {
     "label": "🚕 タクシー",
     "cat": "vehicle",
     "props": [
      "carry",
      "made",
      "yellow"
     ]
    },
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "green"
     ]
    },
    {
     "label": "🔪 ほうちょう",
     "cat": "tool",
     "props": [
      "cut",
      "made"
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
   "🐍 へび",
   "⚽ ボール",
   "🧤 てぶくろ",
   "🥄 スプーン"
  ],
  "a": 0,
  "why": "🐍 へびだけ ひとが つくった ものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🐍 へび",
   "items": [
    {
     "label": "🐍 へび",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "long"
     ]
    },
    {
     "label": "⚽ ボール",
     "cat": "toy",
     "props": [
      "made",
      "round"
     ]
    },
    {
     "label": "🧤 てぶくろ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🥄 スプーン",
     "cat": "tableware",
     "props": [
      "made"
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
   "🦁 ライオン",
   "🌳 き",
   "🐷 ぶた",
   "🖍️ クレヨン"
  ],
  "a": 3,
  "why": "🖍️ クレヨンだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🖍️ クレヨン",
   "items": [
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "green"
     ]
    },
    {
     "label": "🐷 ぶた",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw",
      "made"
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
   "🪨 いし",
   "🛏️ ベッド",
   "🪚 のこぎり",
   "🖌️ ふで"
  ],
  "a": 0,
  "why": "🪨 いしだけ ひとが つくった ものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🪨 いし",
   "items": [
    {
     "label": "🪨 いし",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "🛏️ ベッド",
     "cat": "furniture",
     "props": [
      "made",
      "fourlegs"
     ]
    },
    {
     "label": "🪚 のこぎり",
     "cat": "tool",
     "props": [
      "cut",
      "made",
      "long"
     ]
    },
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
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
   "🍈 メロン",
   "🚌 バス",
   "📏 じょうぎ",
   "🚀 ロケット"
  ],
  "a": 0,
  "why": "🍈 メロンだけ ひとが つくった ものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🍈 メロン",
   "items": [
    {
     "label": "🍈 メロン",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "green",
      "round"
     ]
    },
    {
     "label": "🚌 バス",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": [
      "made",
      "long"
     ]
    },
    {
     "label": "🚀 ロケット",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
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
   "🐤 ひよこ",
   "🦁 ライオン",
   "✂️ はさみ",
   "🍊 みかん"
  ],
  "a": 2,
  "why": "✂️ はさみだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "✂️ はさみ",
   "items": [
    {
     "label": "🐤 ひよこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "✂️ はさみ",
     "cat": "stationery",
     "props": [
      "cut",
      "made"
     ]
    },
    {
     "label": "🍊 みかん",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
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
   "📓 ノート",
   "🚗 くるま",
   "🚁 ヘリコプター",
   "🐱 ねこ"
  ],
  "a": 3,
  "why": "🐱 ねこだけ ひとが つくった ものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🐱 ねこ",
   "items": [
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": [
      "made",
      "square"
     ]
    },
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "🚁 ヘリコプター",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
     ]
    },
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
   "🍫 チョコレート",
   "🥕 にんじん",
   "🐸 かえる",
   "🐷 ぶた"
  ],
  "a": 0,
  "why": "🍫 チョコレートだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🍫 チョコレート",
   "items": [
    {
     "label": "🍫 チョコレート",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
    },
    {
     "label": "🥕 にんじん",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground",
      "long"
     ]
    },
    {
     "label": "🐸 かえる",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "water",
      "green"
     ]
    },
    {
     "label": "🐷 ぶた",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
   "🖊️ ペン",
   "🌳 き",
   "🌈 にじ",
   "🍠 さつまいも"
  ],
  "a": 0,
  "why": "🖊️ ペンだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🖊️ ペン",
   "items": [
    {
     "label": "🖊️ ペン",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
     ]
    },
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "green"
     ]
    },
    {
     "label": "🌈 にじ",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "🍠 さつまいも",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
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
   "🌻 ひまわり",
   "🐘 ぞう",
   "🍋 レモン",
   "🐸 かえる"
  ],
  "a": 2,
  "why": "🍋 レモンだけ いきものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🍋 レモン",
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
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    },
    {
     "label": "🍋 レモン",
     "cat": "fruit",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🐸 かえる",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "water",
      "green"
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
   "🍦 アイスクリーム",
   "🔪 ほうちょう",
   "👖 ズボン",
   "🦁 ライオン"
  ],
  "a": 3,
  "why": "🦁 ライオンだけ ひとが つくった ものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🦁 ライオン",
   "items": [
    {
     "label": "🍦 アイスクリーム",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
    },
    {
     "label": "🔪 ほうちょう",
     "cat": "tool",
     "props": [
      "cut",
      "made"
     ]
    },
    {
     "label": "👖 ズボン",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
   "☁️ くも",
   "🍫 チョコレート",
   "🍊 みかん",
   "🍬 あめ"
  ],
  "a": 0,
  "why": "☁️ くもだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "☁️ くも",
   "items": [
    {
     "label": "☁️ くも",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "🍫 チョコレート",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
    },
    {
     "label": "🍊 みかん",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
     ]
    },
    {
     "label": "🍬 あめ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
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
   "🐜 あり",
   "🐦 ことり",
   "🥔 じゃがいも",
   "🚀 ロケット"
  ],
  "a": 3,
  "why": "🚀 ロケットだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🚀 ロケット",
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
     "label": "🐦 ことり",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "flies"
     ]
    },
    {
     "label": "🥔 じゃがいも",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
     ]
    },
    {
     "label": "🚀 ロケット",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
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
   "🍈 メロン",
   "🖌️ ふで",
   "🚗 くるま",
   "🔨 かなづち"
  ],
  "a": 0,
  "why": "🍈 メロンだけ ひとが つくった ものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🍈 メロン",
   "items": [
    {
     "label": "🍈 メロン",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "green",
      "round"
     ]
    },
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
     ]
    },
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "🔨 かなづち",
     "cat": "tool",
     "props": [
      "made"
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
   "🍠 さつまいも",
   "🍌 バナナ",
   "🥁 たいこ",
   "🍦 アイスクリーム"
  ],
  "a": 2,
  "why": "🥁 たいこだけ たべられないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🥁 たいこ",
   "items": [
    {
     "label": "🍠 さつまいも",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
     ]
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
    },
    {
     "label": "🥁 たいこ",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🍦 アイスクリーム",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
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
   "🍋 レモン",
   "👖 ズボン",
   "🌻 ひまわり",
   "🐤 ひよこ"
  ],
  "a": 1,
  "why": "👖 ズボンだけ ひとが つくった ものだね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "👖 ズボン",
   "items": [
    {
     "label": "🍋 レモン",
     "cat": "fruit",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "👖 ズボン",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
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
     "label": "🐤 ひよこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "yellow"
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
   "🚗 くるま",
   "🥤 コップ",
   "🐜 あり",
   "🛏️ ベッド"
  ],
  "a": 2,
  "why": "🐜 ありだけ ひとが つくった ものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🐜 あり",
   "items": [
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "🥤 コップ",
     "cat": "tableware",
     "props": [
      "made"
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
     "label": "🛏️ ベッド",
     "cat": "furniture",
     "props": [
      "made",
      "fourlegs"
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
   "🍰 ケーキ",
   "👗 ワンピース",
   "🔨 かなづち",
   "🍓 いちご"
  ],
  "a": 3,
  "why": "🍓 いちごだけ ひとが つくった ものじゃ ないね",
  "meta": {
   "kind": "nakama",
   "axisType": "abstract",
   "odd": "🍓 いちご",
   "items": [
    {
     "label": "🍰 ケーキ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
    },
    {
     "label": "👗 ワンピース",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🔨 かなづち",
     "cat": "tool",
     "props": [
      "made"
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
  "id": "nakama-h-24"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "いきている なかまは どれ？",
  "opts": [
   "🌽 とうもろこし",
   "🧦 くつした",
   "🐱 ねこ",
   "👞 くつ"
  ],
  "a": 2,
  "why": "🐱 ねこは「いきている」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "living",
   "axisType": "abstract",
   "correct": "🐱 ねこ",
   "items": [
    {
     "label": "🌽 とうもろこし",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🧦 くつした",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "👞 くつ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-h-25"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "たべられる なかまは どれ？",
  "opts": [
   "🌷 チューリップ",
   "🚒 しょうぼうしゃ",
   "🍓 いちご",
   "🧦 くつした"
  ],
  "a": 2,
  "why": "🍓 いちごは「たべられる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "food",
   "axisType": "abstract",
   "correct": "🍓 いちご",
   "items": [
    {
     "label": "🌷 チューリップ",
     "cat": "flower",
     "props": [
      "living",
      "natural"
     ]
    },
    {
     "label": "🚒 しょうぼうしゃ",
     "cat": "vehicle",
     "props": [
      "red",
      "carry",
      "made"
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
     "label": "🧦 くつした",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-h-26"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "いきている なかまは どれ？",
  "opts": [
   "👗 ワンピース",
   "👖 ズボン",
   "🌳 き",
   "🔔 すず"
  ],
  "a": 2,
  "why": "🌳 きは「いきている」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "living",
   "axisType": "abstract",
   "correct": "🌳 き",
   "items": [
    {
     "label": "👗 ワンピース",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "👖 ズボン",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🌳 き",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "green"
     ]
    },
    {
     "label": "🔔 すず",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
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
   "📏 じょうぎ",
   "🐰 うさぎ",
   "🍓 いちご",
   "🚲 じてんしゃ"
  ],
  "a": 2,
  "why": "🍓 いちごは「たべられる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "food",
   "axisType": "abstract",
   "correct": "🍓 いちご",
   "items": [
    {
     "label": "📏 じょうぎ",
     "cat": "stationery",
     "props": [
      "made",
      "long"
     ]
    },
    {
     "label": "🐰 うさぎ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
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
     "label": "🚲 じてんしゃ",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
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
   "🎈 ふうせん",
   "🍉 すいか",
   "🧸 ぬいぐるみ",
   "🐷 ぶた"
  ],
  "a": 1,
  "why": "🍉 すいかは「たべられる」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "food",
   "axisType": "abstract",
   "correct": "🍉 すいか",
   "items": [
    {
     "label": "🎈 ふうせん",
     "cat": "toy",
     "props": [
      "made",
      "red",
      "round"
     ]
    },
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
     ]
    },
    {
     "label": "🧸 ぬいぐるみ",
     "cat": "toy",
     "props": [
      "made"
     ]
    },
    {
     "label": "🐷 ぶた",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    }
   ]
  },
  "id": "nakama-h-29"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "いきている なかまは どれ？",
  "opts": [
   "🧤 てぶくろ",
   "🍋 レモン",
   "🐷 ぶた",
   "🚁 ヘリコプター"
  ],
  "a": 2,
  "why": "🐷 ぶたは「いきている」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "living",
   "axisType": "abstract",
   "correct": "🐷 ぶた",
   "items": [
    {
     "label": "🧤 てぶくろ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🍋 レモン",
     "cat": "fruit",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🐷 ぶた",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🚁 ヘリコプター",
     "cat": "vehicle",
     "props": [
      "flies",
      "carry",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-h-30"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "ひとが つくった なかまは どれ？",
  "opts": [
   "🍩 ドーナツ",
   "🍉 すいか",
   "🥒 きゅうり",
   "🦒 きりん"
  ],
  "a": 0,
  "why": "🍩 ドーナツは「ひとが つくった」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "made",
   "axisType": "abstract",
   "correct": "🍩 ドーナツ",
   "items": [
    {
     "label": "🍩 ドーナツ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made",
      "round"
     ]
    },
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
     ]
    },
    {
     "label": "🥒 きゅうり",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "green",
      "long"
     ]
    },
    {
     "label": "🦒 きりん",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    }
   ]
  },
  "id": "nakama-h-31"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "ひとが つくった なかまは どれ？",
  "opts": [
   "👕 シャツ",
   "🌷 チューリップ",
   "⛰️ やま",
   "🦁 ライオン"
  ],
  "a": 0,
  "why": "👕 シャツは「ひとが つくった」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "made",
   "axisType": "abstract",
   "correct": "👕 シャツ",
   "items": [
    {
     "label": "👕 シャツ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
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
    },
    {
     "label": "🦁 ライオン",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    }
   ]
  },
  "id": "nakama-h-32"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "いきている なかまは どれ？",
  "opts": [
   "🐘 ぞう",
   "⛵ ふね",
   "🍑 もも",
   "✂️ はさみ"
  ],
  "a": 0,
  "why": "🐘 ぞうは「いきている」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "living",
   "axisType": "abstract",
   "correct": "🐘 ぞう",
   "items": [
    {
     "label": "🐘 ぞう",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "carry"
     ]
    },
    {
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water",
      "carry",
      "made"
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
     "label": "✂️ はさみ",
     "cat": "stationery",
     "props": [
      "cut",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-h-33"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "しぜんに ある なかまは どれ？",
  "opts": [
   "🚌 バス",
   "🍉 すいか",
   "👞 くつ",
   "🔪 ほうちょう"
  ],
  "a": 1,
  "why": "🍉 すいかは「しぜんに ある」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "natural",
   "axisType": "abstract",
   "correct": "🍉 すいか",
   "items": [
    {
     "label": "🚌 バス",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
     ]
    },
    {
     "label": "👞 くつ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🔪 ほうちょう",
     "cat": "tool",
     "props": [
      "cut",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-h-34"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "ひとが つくった なかまは どれ？",
  "opts": [
   "🥔 じゃがいも",
   "🍉 すいか",
   "🐱 ねこ",
   "🍴 フォーク"
  ],
  "a": 3,
  "why": "🍴 フォークは「ひとが つくった」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "made",
   "axisType": "abstract",
   "correct": "🍴 フォーク",
   "items": [
    {
     "label": "🥔 じゃがいも",
     "cat": "vegetable",
     "props": [
      "food",
      "natural",
      "underground"
     ]
    },
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
     ]
    },
    {
     "label": "🐱 ねこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🍴 フォーク",
     "cat": "tableware",
     "props": [
      "made"
     ]
    }
   ]
  },
  "id": "nakama-h-35"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "ひとが つくった なかまは どれ？",
  "opts": [
   "🐳 くじら",
   "🐶 いぬ",
   "🔔 すず",
   "🍒 さくらんぼ"
  ],
  "a": 2,
  "why": "🔔 すずは「ひとが つくった」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "made",
   "axisType": "abstract",
   "correct": "🔔 すず",
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
      "natural",
      "fourlegs"
     ]
    },
    {
     "label": "🔔 すず",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🍒 さくらんぼ",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "red",
      "round"
     ]
    }
   ]
  },
  "id": "nakama-h-36"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "しぜんに ある なかまは どれ？",
  "opts": [
   "🚲 じてんしゃ",
   "🎺 ラッパ",
   "🪑 いす",
   "🍋 レモン"
  ],
  "a": 3,
  "why": "🍋 レモンは「しぜんに ある」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "natural",
   "axisType": "abstract",
   "correct": "🍋 レモン",
   "items": [
    {
     "label": "🚲 じてんしゃ",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "🎺 ラッパ",
     "cat": "instrument",
     "props": [
      "sound",
      "made"
     ]
    },
    {
     "label": "🪑 いす",
     "cat": "furniture",
     "props": [
      "made",
      "fourlegs"
     ]
    },
    {
     "label": "🍋 レモン",
     "cat": "fruit",
     "props": [
      "food",
      "natural",
      "yellow"
     ]
    }
   ]
  },
  "id": "nakama-h-37"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "ひとが つくった なかまは どれ？",
  "opts": [
   "🍊 みかん",
   "🦋 ちょう",
   "⛵ ふね",
   "🐢 かめ"
  ],
  "a": 2,
  "why": "⛵ ふねは「ひとが つくった」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "made",
   "axisType": "abstract",
   "correct": "⛵ ふね",
   "items": [
    {
     "label": "🍊 みかん",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
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
     "label": "⛵ ふね",
     "cat": "vehicle",
     "props": [
      "water",
      "carry",
      "made"
     ]
    },
    {
     "label": "🐢 かめ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "water",
      "green"
     ]
    }
   ]
  },
  "id": "nakama-h-38"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "ひとが つくった なかまは どれ？",
  "opts": [
   "🍎 りんご",
   "🍑 もも",
   "☁️ くも",
   "📓 ノート"
  ],
  "a": 3,
  "why": "📓 ノートは「ひとが つくった」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "made",
   "axisType": "abstract",
   "correct": "📓 ノート",
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
     "label": "🍑 もも",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural"
     ]
    },
    {
     "label": "☁️ くも",
     "cat": "nature",
     "props": [
      "natural"
     ]
    },
    {
     "label": "📓 ノート",
     "cat": "stationery",
     "props": [
      "made",
      "square"
     ]
    }
   ]
  },
  "id": "nakama-h-39"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "いきている なかまは どれ？",
  "opts": [
   "🐢 かめ",
   "👞 くつ",
   "🖌️ ふで",
   "🍒 さくらんぼ"
  ],
  "a": 0,
  "why": "🐢 かめは「いきている」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "living",
   "axisType": "abstract",
   "correct": "🐢 かめ",
   "items": [
    {
     "label": "🐢 かめ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "water",
      "green"
     ]
    },
    {
     "label": "👞 くつ",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🖌️ ふで",
     "cat": "stationery",
     "props": [
      "draw",
      "made",
      "long"
     ]
    },
    {
     "label": "🍒 さくらんぼ",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "red",
      "round"
     ]
    }
   ]
  },
  "id": "nakama-h-40"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "ひとが つくった なかまは どれ？",
  "opts": [
   "🍑 もも",
   "🪑 いす",
   "🍉 すいか",
   "🌈 にじ"
  ],
  "a": 1,
  "why": "🪑 いすは「ひとが つくった」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "made",
   "axisType": "abstract",
   "correct": "🪑 いす",
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
     "label": "🪑 いす",
     "cat": "furniture",
     "props": [
      "made",
      "fourlegs"
     ]
    },
    {
     "label": "🍉 すいか",
     "cat": "fruit",
     "props": [
      "food",
      "sweet",
      "natural",
      "round"
     ]
    },
    {
     "label": "🌈 にじ",
     "cat": "nature",
     "props": [
      "natural"
     ]
    }
   ]
  },
  "id": "nakama-h-41"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "いきている なかまは どれ？",
  "opts": [
   "🖍️ クレヨン",
   "🐢 かめ",
   "🔨 かなづち",
   "🚌 バス"
  ],
  "a": 1,
  "why": "🐢 かめは「いきている」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "living",
   "axisType": "abstract",
   "correct": "🐢 かめ",
   "items": [
    {
     "label": "🖍️ クレヨン",
     "cat": "stationery",
     "props": [
      "draw",
      "made"
     ]
    },
    {
     "label": "🐢 かめ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "fourlegs",
      "water",
      "green"
     ]
    },
    {
     "label": "🔨 かなづち",
     "cat": "tool",
     "props": [
      "made"
     ]
    },
    {
     "label": "🚌 バス",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    }
   ]
  },
  "id": "nakama-h-42"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "しぜんに ある なかまは どれ？",
  "opts": [
   "🧢 ぼうし",
   "🚂 きしゃ",
   "🪚 のこぎり",
   "🌹 ばら"
  ],
  "a": 3,
  "why": "🌹 ばらは「しぜんに ある」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "natural",
   "axisType": "abstract",
   "correct": "🌹 ばら",
   "items": [
    {
     "label": "🧢 ぼうし",
     "cat": "clothing",
     "props": [
      "wear",
      "made"
     ]
    },
    {
     "label": "🚂 きしゃ",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "🪚 のこぎり",
     "cat": "tool",
     "props": [
      "cut",
      "made",
      "long"
     ]
    },
    {
     "label": "🌹 ばら",
     "cat": "flower",
     "props": [
      "living",
      "natural",
      "red"
     ]
    }
   ]
  },
  "id": "nakama-h-43"
 },
 {
  "category": "nakama",
  "difficulty": "hard",
  "q": "いきている なかまは どれ？",
  "opts": [
   "🚗 くるま",
   "🐤 ひよこ",
   "🍰 ケーキ",
   "🥄 スプーン"
  ],
  "a": 1,
  "why": "🐤 ひよこは「いきている」なかまだね。ほかは ちがうよ",
  "meta": {
   "kind": "nakama-axis",
   "axisKind": "prop",
   "axis": "living",
   "axisType": "abstract",
   "correct": "🐤 ひよこ",
   "items": [
    {
     "label": "🚗 くるま",
     "cat": "vehicle",
     "props": [
      "carry",
      "made"
     ]
    },
    {
     "label": "🐤 ひよこ",
     "cat": "animal",
     "props": [
      "living",
      "natural",
      "yellow"
     ]
    },
    {
     "label": "🍰 ケーキ",
     "cat": "sweets",
     "props": [
      "food",
      "sweet",
      "made"
     ]
    },
    {
     "label": "🥄 スプーン",
     "cat": "tableware",
     "props": [
      "made"
     ]
    }
   ]
  },
  "id": "nakama-h-44"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "⬆️ うえ",
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
  "id": "robot-e-1"
 },
 {
  "q": "「まえへ」を 5かい。なんマス すすむ？",
  "opts": [
   "4マス",
   "6マス",
   "5マス"
  ],
  "a": 2,
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
  "id": "robot-e-2"
 },
 {
  "q": "⬇️ したを むいている ロボットが「まえへ 4マス」。スタートから みて どこに いる？",
  "opts": [
   "したに 5マス",
   "したに 4マス",
   "ひだりに 4マス"
  ],
  "a": 1,
  "why": "むいている ほうこうに 4マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 1,
   "n": 4
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-3"
 },
 {
  "q": "⬇️ したを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬅️ ひだり"
  ],
  "a": 1,
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
  "id": "robot-e-4"
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
  "id": "robot-e-5"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬅️ ひだり",
   "➡️ みぎ"
  ],
  "a": 0,
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
  "id": "robot-e-6"
 },
 {
  "q": "「まえへ」を 2かい。なんマス すすむ？",
  "opts": [
   "2マス",
   "1マス",
   "3マス"
  ],
  "a": 0,
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
  "id": "robot-e-7"
 },
 {
  "q": "⬇️ したを むいている ロボットが「まえへ 5マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 5マス",
   "したに 5マス",
   "したに 6マス"
  ],
  "a": 1,
  "why": "むいている ほうこうに 5マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 1,
   "n": 5
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-8"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬆️ うえ"
  ],
  "a": 0,
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
  "id": "robot-e-9"
 },
 {
  "q": "「まえへ」を 4かい。なんマス すすむ？",
  "opts": [
   "4マス",
   "5マス",
   "3マス"
  ],
  "a": 0,
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
  "id": "robot-e-10"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 3マス",
   "うえに 3マス",
   "うえに 4マス"
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
  "id": "robot-e-11"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "➡️ みぎ",
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
  "id": "robot-e-12"
 },
 {
  "q": "「まえへ」を 6かい。なんマス すすむ？",
  "opts": [
   "7マス",
   "6マス",
   "5マス"
  ],
  "a": 1,
  "why": "1かいで 1マス。6かいなら 6マスだね",
  "meta": {
   "kind": "robot-steps",
   "steps": [
    1,
    1,
    1,
    1,
    1,
    1
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-13"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「まえへ 4マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 4マス",
   "みぎに 5マス",
   "したに 4マス"
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
  "id": "robot-e-14"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬅️ ひだり"
  ],
  "a": 0,
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
  "id": "robot-e-15"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "したに 3マス",
   "みぎに 4マス",
   "みぎに 3マス"
  ],
  "a": 2,
  "why": "むいている ほうこうに 3マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 0,
   "n": 3
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-16"
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
  "id": "robot-e-17"
 },
 {
  "q": "「まえへ」を 3かい。なんマス すすむ？",
  "opts": [
   "3マス",
   "4マス",
   "2マス"
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
  "id": "robot-e-18"
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
  "id": "robot-e-19"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "➡️ みぎ",
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
  "id": "robot-e-20"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬅️ ひだり",
   "⬆️ うえ"
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
  "id": "robot-e-21"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 3マス",
   "みぎに 2マス",
   "したに 2マス"
  ],
  "a": 1,
  "why": "むいている ほうこうに 2マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 0,
   "n": 2
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-22"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「まえへ 5マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 5マス",
   "みぎに 6マス",
   "したに 5マス"
  ],
  "a": 0,
  "why": "むいている ほうこうに 5マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 0,
   "n": 5
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-23"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬇️ した",
   "➡️ みぎ"
  ],
  "a": 0,
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
  "id": "robot-e-24"
 },
 {
  "q": "「まえへ」を 7かい。なんマス すすむ？",
  "opts": [
   "7マス",
   "8マス",
   "6マス"
  ],
  "a": 0,
  "why": "1かいで 1マス。7かいなら 7マスだね",
  "meta": {
   "kind": "robot-steps",
   "steps": [
    1,
    1,
    1,
    1,
    1,
    1,
    1
   ]
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-25"
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
  "id": "robot-e-26"
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
  "id": "robot-e-27"
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
  "id": "robot-e-28"
 },
 {
  "q": "⬇️ したを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 1,
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
  "id": "robot-e-29"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「まえへ 5マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 6マス",
   "ひだりに 5マス",
   "うえに 5マス"
  ],
  "a": 1,
  "why": "むいている ほうこうに 5マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 2,
   "n": 5
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-30"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "⬇️ した",
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
  "id": "robot-e-31"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「まえへ 4マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 5マス",
   "うえに 4マス",
   "ひだりに 4マス"
  ],
  "a": 2,
  "why": "むいている ほうこうに 4マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 2,
   "n": 4
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-32"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬇️ した",
   "⬅️ ひだり"
  ],
  "a": 0,
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
  "id": "robot-e-33"
 },
 {
  "q": "⬇️ したを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "⬆️ うえ",
   "➡️ みぎ"
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
  "id": "robot-e-34"
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
  "id": "robot-e-35"
 },
 {
  "q": "⬆️ うえを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬇️ した",
   "⬆️ うえ"
  ],
  "a": 0,
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
  "id": "robot-e-36"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 3マス",
   "ひだりに 3マス",
   "ひだりに 4マス"
  ],
  "a": 1,
  "why": "むいている ほうこうに 3マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 2,
   "n": 3
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-37"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」。どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬇️ した",
   "⬆️ うえ"
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
  "id": "robot-e-38"
 },
 {
  "q": "⬇️ したを むいている ロボットが「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "したに 2マス",
   "したに 3マス",
   "ひだりに 2マス"
  ],
  "a": 0,
  "why": "むいている ほうこうに 2マス すすむよ",
  "meta": {
   "kind": "robot-move",
   "start": 1,
   "n": 2
  },
  "category": "robot",
  "difficulty": "easy",
  "id": "robot-e-39"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「みぎを むく」。どっちを むく？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬅️ ひだり"
  ],
  "a": 0,
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
  "id": "robot-e-40"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットに「ひだりを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬇️ した",
   "⬆️ うえ",
   "➡️ みぎ"
  ],
  "a": 2,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
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
  "q": "➡️ みぎを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 4マス",
   "みぎに 3マス・したに 1マス",
   "みぎに 3マス・したに 2マス"
  ],
  "a": 1,
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
  "id": "robot-n-2"
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
  "id": "robot-n-3"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 3マス・うえに 4マス",
   "ひだりに 6マス",
   "ひだりに 3マス・うえに 3マス"
  ],
  "a": 2,
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
  "id": "robot-n-4"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットに「みぎを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
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
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-5"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 3マス」→「ひだりを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 3マス・うえに 3マス",
   "みぎに 3マス・うえに 2マス",
   "みぎに 5マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
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
   "⬇️ した",
   "⬅️ ひだり",
   "➡️ みぎ"
  ],
  "a": 0,
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
  "q": "⬆️ うえを むいている ロボット。「まえへ 2マス」→「ひだりを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 5マス",
   "ひだりに 4マス・うえに 2マス",
   "ひだりに 3マス・うえに 2マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    2,
    "L",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-8"
 },
 {
  "q": "⬆️ うえを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬆️ うえ",
   "➡️ みぎ",
   "⬅️ ひだり"
  ],
  "a": 0,
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
  "id": "robot-n-9"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 2マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 2マス・うえに 2マス",
   "うえに 3マス",
   "ひだりに 1マス・うえに 2マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    2,
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-10"
 },
 {
  "q": "⬇️ したを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬅️ ひだり",
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
  "id": "robot-n-11"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 3マス」→「ひだりを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "したに 6マス",
   "みぎに 3マス・したに 3マス",
   "みぎに 4マス・したに 3マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    3,
    "L",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-12"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬅️ ひだり",
   "⬇️ した",
   "➡️ みぎ"
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
  "id": "robot-n-13"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 1マス」→「ひだりを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 4マス・うえに 1マス",
   "ひだりに 3マス・うえに 1マス",
   "うえに 4マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    1,
    "L",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-14"
 },
 {
  "q": "⬆️ うえを むいている ロボットに「ひだりを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬆️ うえ"
  ],
  "a": 0,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 3,
   "turns": [
    "left",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-15"
 },
 {
  "q": "⬇️ したを むいている ロボットに「ひだりを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬇️ した",
   "⬆️ うえ",
   "➡️ みぎ"
  ],
  "a": 0,
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
  "q": "➡️ みぎを むいている ロボット。「まえへ 1マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 2マス",
   "みぎに 1マス・うえに 2マス",
   "みぎに 1マス・うえに 1マス"
  ],
  "a": 2,
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
  "id": "robot-n-17"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットに「みぎを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 0,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 2,
   "turns": [
    "right",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-18"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "したに 4マス",
   "ひだりに 2マス・したに 2マス",
   "ひだりに 3マス・したに 2マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    2,
    "R",
    2
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-19"
 },
 {
  "q": "➡️ みぎを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬆️ うえ",
   "⬇️ した"
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
  "id": "robot-n-20"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 2マス」→「ひだりを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 2マス・したに 4マス",
   "ひだりに 5マス",
   "ひだりに 2マス・したに 3マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
   "cmds": [
    2,
    "L",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-21"
 },
 {
  "q": "⬆️ うえを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬇️ した",
   "⬅️ ひだり",
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
  "id": "robot-n-22"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 1マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 2マス",
   "ひだりに 1マス・うえに 1マス",
   "ひだりに 1マス・うえに 2マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
   "cmds": [
    1,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-23"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬇️ した",
   "⬆️ うえ",
   "⬅️ ひだり"
  ],
  "a": 2,
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
  "id": "robot-n-24"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 3マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "したに 4マス",
   "みぎに 1マス・したに 3マス",
   "みぎに 2マス・したに 3マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    3,
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-25"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 3マス・うえに 3マス",
   "うえに 6マス",
   "みぎに 4マス・うえに 3マス"
  ],
  "a": 0,
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
  "id": "robot-n-26"
 },
 {
  "q": "⬆️ うえを むいている ロボットに「みぎを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬆️ うえ"
  ],
  "a": 0,
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
  "id": "robot-n-27"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 2マス」→「ひだりを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 2マス・うえに 2マス",
   "うえに 4マス",
   "ひだりに 3マス・うえに 2マス"
  ],
  "a": 0,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    2,
    "L",
    2
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-28"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 1マス」→「ひだりを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 1マス・うえに 3マス",
   "みぎに 3マス",
   "みぎに 1マス・うえに 2マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    1,
    "L",
    2
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-29"
 },
 {
  "q": "➡️ みぎを むいている ロボットに「ひだりを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬅️ ひだり",
   "⬇️ した",
   "➡️ みぎ"
  ],
  "a": 0,
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
  "id": "robot-n-30"
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
  "id": "robot-n-31"
 },
 {
  "q": "➡️ みぎを むいている ロボットに「みぎを むく」→「みぎを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 1,
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
  "id": "robot-n-32"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 1マス」→「ひだりを むく」→「まえへ 3マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 4マス・したに 1マス",
   "みぎに 3マス・したに 1マス",
   "したに 4マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    1,
    "L",
    3
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-33"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬅️ ひだり",
   "⬆️ うえ"
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
  "id": "robot-n-34"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 5マス",
   "みぎに 3マス・したに 3マス",
   "みぎに 3マス・したに 2マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    3,
    "R",
    2
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-35"
 },
 {
  "q": "➡️ みぎを むいている ロボットに「ひだりを むく」→「みぎを むく」。さいごに どっちを むいている？",
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
    "left",
    "right"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-36"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 3マス",
   "みぎに 2マス・したに 1マス",
   "みぎに 2マス・したに 2マス"
  ],
  "a": 1,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    2,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-37"
 },
 {
  "q": "⬆️ うえを むいている ロボットに「ひだりを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "⬆️ うえ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 2,
  "why": "1かいずつ じゅんばんに まわして かんがえよう",
  "meta": {
   "kind": "robot-turn",
   "start": 3,
   "turns": [
    "left",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-38"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 3マス」→「ひだりを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "したに 5マス",
   "みぎに 3マス・したに 3マス",
   "みぎに 2マス・したに 3マス"
  ],
  "a": 2,
  "why": "まがった あとは すすむ ほうこうが かわるよ",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    3,
    "L",
    2
   ]
  },
  "category": "robot",
  "difficulty": "normal",
  "id": "robot-n-39"
 },
 {
  "q": "⬇️ したを むいている ロボットに「みぎを むく」→「ひだりを むく」。さいごに どっちを むいている？",
  "opts": [
   "➡️ みぎ",
   "⬇️ した",
   "⬆️ うえ"
  ],
  "a": 1,
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
  "id": "robot-n-40"
 },
 {
  "q": "「🔁4かい くりかえし［まえへ・まえへ］」。ぜんぶで なんマス すすむ？",
  "opts": [
   "6マス",
   "8マス",
   "10マス"
  ],
  "a": 1,
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
  "q": "⬇️ したを むいている ロボットが「ひだりを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬅️ ひだり",
   "➡️ みぎ"
  ],
  "a": 2,
  "why": "4かい まわると もとに もどるよ。5かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
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
  "id": "robot-h-2"
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
  "id": "robot-h-3"
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
  "id": "robot-h-4"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「みぎを むく」を 4かい。さいごに どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 0,
  "why": "4かい まわると もとに もどるよ。4かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
   "turns": [
    "right",
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
  "q": "➡️ みぎを むいている ロボット。「まえへ 1マス」→「みぎを むく」→「まえへ 3マス」→「ひだりを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 6マス",
   "みぎに 3マス・したに 3マス",
   "みぎに 3マス・うえに 3マス"
  ],
  "a": 1,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    1,
    "R",
    3,
    "L",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-6"
 },
 {
  "q": "⬇️ したを むいている ロボットが「みぎを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬇️ した",
   "⬆️ うえ"
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
  "id": "robot-h-7"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 2マス」→「ひだりを むく」→「まえへ 3マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 3マス・したに 1マス",
   "ひだりに 3マス・したに 1マス",
   "したに 6マス"
  ],
  "a": 0,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    2,
    "L",
    3,
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-8"
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
  "id": "robot-h-9"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "➡️ みぎ",
   "⬅️ ひだり"
  ],
  "a": 0,
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
  "id": "robot-h-10"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 1マス」→「みぎを むく」→「まえへ 1マス」→「ひだりを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 1マス・したに 3マス",
   "したに 4マス",
   "ひだりに 1マス・したに 3マス"
  ],
  "a": 2,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    1,
    "R",
    1,
    "L",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-11"
 },
 {
  "q": "「🔁2かい くりかえし［まえへ・まえへ・まえへ］」。ぜんぶで なんマス すすむ？",
  "opts": [
   "5マス",
   "9マス",
   "6マス"
  ],
  "a": 2,
  "why": "1かいで 3マス。2かい くりかえすと 6マスだね",
  "meta": {
   "kind": "robot-steps",
   "repeat": 2,
   "body": 3
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-12"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「ひだりを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "➡️ みぎ",
   "⬇️ した"
  ],
  "a": 0,
  "why": "4かい まわると もとに もどるよ。5かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 0,
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
  "id": "robot-h-13"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 1マス」→「ひだりを むく」→「まえへ 3マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 5マス",
   "したに 3マス",
   "うえに 3マス"
  ],
  "a": 1,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
   "cmds": [
    1,
    "L",
    3,
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-14"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "⬇️ した",
   "⬅️ ひだり"
  ],
  "a": 0,
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
  "id": "robot-h-15"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 1マス」→「みぎを むく」→「まえへ 3マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 5マス",
   "みぎに 2マス・したに 3マス",
   "みぎに 2マス・うえに 3マス"
  ],
  "a": 1,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    1,
    "R",
    3,
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-16"
 },
 {
  "q": "⬇️ したを むいている ロボットが「ひだりを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "⬆️ うえ",
   "➡️ みぎ",
   "⬇️ した"
  ],
  "a": 1,
  "why": "4かい まわると もとに もどるよ。5かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
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
  "id": "robot-h-17"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 1マス・うえに 1マス",
   "うえに 6マス",
   "ひだりに 1マス・うえに 1マス"
  ],
  "a": 0,
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
  "id": "robot-h-18"
 },
 {
  "q": "⬇️ したを むいている ロボットが「みぎを むく」を 4かい。さいごに どっちを むく？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬅️ ひだり"
  ],
  "a": 0,
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
  "id": "robot-h-19"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 1マス」→「みぎを むく」→「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 5マス",
   "したに 3マス",
   "うえに 3マス"
  ],
  "a": 1,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
   "cmds": [
    1,
    "R",
    3,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-20"
 },
 {
  "q": "➡️ みぎを むいている ロボットが「みぎを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬅️ ひだり",
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
  "id": "robot-h-21"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 1マス」→「ひだりを むく」→「まえへ 2マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 2マス・したに 2マス",
   "ひだりに 2マス・したに 2マス",
   "したに 4マス"
  ],
  "a": 0,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    1,
    "L",
    2,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-22"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「みぎを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬇️ した",
   "⬆️ うえ"
  ],
  "a": 1,
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
  "id": "robot-h-23"
 },
 {
  "q": "➡️ みぎを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 2マス・したに 3マス",
   "みぎに 7マス",
   "みぎに 2マス・うえに 3マス"
  ],
  "a": 0,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 0,
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
  "id": "robot-h-24"
 },
 {
  "q": "⬇️ したを むいている ロボットが「ひだりを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
   "⬅️ ひだり"
  ],
  "a": 1,
  "why": "4かい まわると もとに もどるよ。5かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
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
  "id": "robot-h-25"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」→「みぎを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 6マス",
   "ひだりに 1マス・したに 1マス",
   "ひだりに 1マス・うえに 1マス"
  ],
  "a": 2,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
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
  "id": "robot-h-26"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 2マス」→「みぎを むく」→「まえへ 3マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 3マス・うえに 3マス",
   "みぎに 3マス・うえに 3マス",
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
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-27"
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
  "id": "robot-h-28"
 },
 {
  "q": "⬇️ したを むいている ロボットが「みぎを むく」を 4かい。さいごに どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "⬇️ した",
   "⬆️ うえ"
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
  "id": "robot-h-29"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 2マス」→「ひだりを むく」→「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 3マス・うえに 3マス",
   "うえに 6マス",
   "ひだりに 3マス・うえに 3マス"
  ],
  "a": 2,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    2,
    "L",
    3,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-30"
 },
 {
  "q": "⬇️ したを むいている ロボットが「ひだりを むく」を 4かい。さいごに どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "⬆️ うえ",
   "⬇️ した"
  ],
  "a": 2,
  "why": "4かい まわると もとに もどるよ。4かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
   "turns": [
    "left",
    "left",
    "left",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-31"
 },
 {
  "q": "⬇️ したを むいている ロボット。「まえへ 2マス」→「ひだりを むく」→「まえへ 1マス」→「みぎを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 1マス・したに 3マス",
   "したに 4マス",
   "ひだりに 1マス・したに 3マス"
  ],
  "a": 0,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 1,
   "cmds": [
    2,
    "L",
    1,
    "R",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-32"
 },
 {
  "q": "⬇️ したを むいている ロボットが「ひだりを むく」を 3かい。さいごに どっちを むく？",
  "opts": [
   "⬅️ ひだり",
   "⬇️ した",
   "➡️ みぎ"
  ],
  "a": 0,
  "why": "4かい まわると もとに もどるよ。3かいなら…？",
  "meta": {
   "kind": "robot-turn",
   "start": 1,
   "turns": [
    "left",
    "left",
    "left"
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-33"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 2マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "みぎに 2マス・うえに 4マス",
   "ひだりに 2マス・うえに 4マス",
   "うえに 6マス"
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
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-34"
 },
 {
  "q": "⬅️ ひだりを むいている ロボットが「ひだりを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "➡️ みぎ",
   "⬅️ ひだり",
   "⬇️ した"
  ],
  "a": 2,
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
  "id": "robot-h-35"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 1マス」→「ひだりを むく」→「まえへ 1マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 1マス",
   "うえに 3マス",
   "みぎに 1マス"
  ],
  "a": 0,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    1,
    "L",
    1,
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-36"
 },
 {
  "q": "⬇️ したを むいている ロボットが「みぎを むく」を 5かい。さいごに どっちを むく？",
  "opts": [
   "⬇️ した",
   "➡️ みぎ",
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
  "id": "robot-h-37"
 },
 {
  "q": "⬅️ ひだりを むいている ロボット。「まえへ 2マス」→「ひだりを むく」→「まえへ 1マス」→「ひだりを むく」→「まえへ 1マス」。スタートから みて どこに いる？",
  "opts": [
   "ひだりに 1マス・したに 1マス",
   "ひだりに 1マス・うえに 1マス",
   "ひだりに 4マス"
  ],
  "a": 0,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 2,
   "cmds": [
    2,
    "L",
    1,
    "L",
    1
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-38"
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
  "id": "robot-h-39"
 },
 {
  "q": "⬆️ うえを むいている ロボット。「まえへ 3マス」→「みぎを むく」→「まえへ 1マス」→「ひだりを むく」→「まえへ 2マス」。スタートから みて どこに いる？",
  "opts": [
   "うえに 6マス",
   "みぎに 1マス・うえに 5マス",
   "ひだりに 1マス・うえに 5マス"
  ],
  "a": 1,
  "why": "むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう",
  "meta": {
   "kind": "robot-goal",
   "start": 3,
   "cmds": [
    3,
    "R",
    1,
    "L",
    2
   ]
  },
  "category": "robot",
  "difficulty": "hard",
  "id": "robot-h-40"
 },
 {
  "q": "「せんたく」の フローチャートだよ。\n\nはじめ\n ↓\n👕 ふくを あつめる\n ↓\n🫧 せんたくきを まわす\n ↓\n🌞 ほす\n ↓\n📦 たたんで しまう\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🫧 せんたくきを まわす",
   "🌞 ほす",
   "📦 たたんで しまう"
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
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-1"
 },
 {
  "q": "「ねるまえの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🛁 おふろに はいる\n ↓\n🥛 みずを のむ\n ↓\n📖 えほんを よむ\n ↓\n😴 ねる\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🥛 みずを のむ",
   "📖 えほんを よむ",
   "😴 ねる"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🛁 おふろに はいる",
    "🥛 みずを のむ",
    "📖 えほんを よむ",
    "😴 ねる"
   ],
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-2"
 },
 {
  "q": "「キャンプ」の フローチャートだよ。\n\nはじめ\n ↓\n⛺ テントを はる\n ↓\n🔥 ひを おこす\n ↓\n🍖 ごはんを つくる\n ↓\n🌙 ねる\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🍖 ごはんを つくる",
   "⛺ テントを はる",
   "🔥 ひを おこす"
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
  "q": "「おかいもの」の フローチャートだよ。\n\nはじめ\n ↓\n📝 メモを かく\n ↓\n🚶 おみせに いく\n ↓\n🛒 かごに いれる\n ↓\n💰 おかねを はらう\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🛒 かごに いれる",
   "💰 おかねを はらう",
   "🚶 おみせに いく"
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
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-4"
 },
 {
  "q": "「キャンプ」の フローチャートだよ。\n\nはじめ\n ↓\n⛺ テントを はる\n ↓\n🔥 ひを おこす\n ↓\n🍖 ごはんを つくる\n ↓\n🌙 ねる\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🍖 ごはんを つくる",
   "🌙 ねる",
   "🔥 ひを おこす"
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
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-5"
 },
 {
  "q": "「キャンプ」の フローチャートだよ。\n\nはじめ\n ↓\n⛺ テントを はる\n ↓\n🔥 ひを おこす\n ↓\n🍖 ごはんを つくる\n ↓\n🌙 ねる\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🔥 ひを おこす",
   "⛺ テントを はる",
   "🍖 ごはんを つくる"
  ],
  "a": 0,
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
  "id": "yomitori-e-6"
 },
 {
  "q": "「おかいもの」の フローチャートだよ。\n\nはじめ\n ↓\n📝 メモを かく\n ↓\n🚶 おみせに いく\n ↓\n🛒 かごに いれる\n ↓\n💰 おかねを はらう\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🚶 おみせに いく",
   "🛒 かごに いれる",
   "📝 メモを かく"
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
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-7"
 },
 {
  "q": "「おでかけの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🧢 ぼうしを かぶる\n ↓\n🎒 リュックを せおう\n ↓\n🚪 いえの かぎを しめる\n ↓\n🚶 しゅっぱつ！\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🧢 ぼうしを かぶる",
   "🎒 リュックを せおう",
   "🚪 いえの かぎを しめる"
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
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-8"
 },
 {
  "q": "「ねるまえの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🛁 おふろに はいる\n ↓\n🥛 みずを のむ\n ↓\n📖 えほんを よむ\n ↓\n😴 ねる\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🛁 おふろに はいる",
   "🥛 みずを のむ",
   "😴 ねる"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🛁 おふろに はいる",
    "🥛 みずを のむ",
    "📖 えほんを よむ",
    "😴 ねる"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-9"
 },
 {
  "q": "「ペットの おせわ」の フローチャートだよ。\n\nはじめ\n ↓\n🍖 えさを あげる\n ↓\n💧 みずを かえる\n ↓\n🧹 こやを そうじする\n ↓\n🚶 さんぽに いく\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🧹 こやを そうじする",
   "🚶 さんぽに いく",
   "💧 みずを かえる"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🍖 えさを あげる",
    "💧 みずを かえる",
    "🧹 こやを そうじする",
    "🚶 さんぽに いく"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-10"
 },
 {
  "q": "「たなばたの かざり」の フローチャートだよ。\n\nはじめ\n ↓\n📄 たんざくを よういする\n ↓\n✏️ ねがいごとを かく\n ↓\n🎋 ささに かざる\n ↓\n⭐ よぞらを みる\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "📄 たんざくを よういする",
   "✏️ ねがいごとを かく",
   "🎋 ささに かざる"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "📄 たんざくを よういする",
    "✏️ ねがいごとを かく",
    "🎋 ささに かざる",
    "⭐ よぞらを みる"
   ],
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-11"
 },
 {
  "q": "「キャンプ」の フローチャートだよ。\n\nはじめ\n ↓\n⛺ テントを はる\n ↓\n🔥 ひを おこす\n ↓\n🍖 ごはんを つくる\n ↓\n🌙 ねる\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "⛺ テントを はる",
   "🌙 ねる",
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
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-12"
 },
 {
  "q": "「キャンプ」の フローチャートだよ。\n\nはじめ\n ↓\n⛺ テントを はる\n ↓\n🔥 ひを おこす\n ↓\n🍖 ごはんを つくる\n ↓\n🌙 ねる\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🌙 ねる",
   "🔥 ひを おこす",
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
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-13"
 },
 {
  "q": "「はたけの しごと」の フローチャートだよ。\n\nはじめ\n ↓\n🌰 たねを まく\n ↓\n💧 みずを やる\n ↓\n🌿 くさとりを する\n ↓\n🥕 しゅうかくする\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🌿 くさとりを する",
   "💧 みずを やる",
   "🌰 たねを まく"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 くさとりを する",
    "🥕 しゅうかくする"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-14"
 },
 {
  "q": "「はたけの しごと」の フローチャートだよ。\n\nはじめ\n ↓\n🌰 たねを まく\n ↓\n💧 みずを やる\n ↓\n🌿 くさとりを する\n ↓\n🥕 しゅうかくする\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🥕 しゅうかくする",
   "🌰 たねを まく",
   "💧 みずを やる"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 くさとりを する",
    "🥕 しゅうかくする"
   ],
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-15"
 },
 {
  "q": "「ねるまえの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🛁 おふろに はいる\n ↓\n🥛 みずを のむ\n ↓\n📖 えほんを よむ\n ↓\n😴 ねる\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "📖 えほんを よむ",
   "🛁 おふろに はいる",
   "🥛 みずを のむ"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🛁 おふろに はいる",
    "🥛 みずを のむ",
    "📖 えほんを よむ",
    "😴 ねる"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-16"
 },
 {
  "q": "「おかいもの」の フローチャートだよ。\n\nはじめ\n ↓\n📝 メモを かく\n ↓\n🚶 おみせに いく\n ↓\n🛒 かごに いれる\n ↓\n💰 おかねを はらう\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "💰 おかねを はらう",
   "📝 メモを かく",
   "🚶 おみせに いく"
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
  "id": "yomitori-e-17"
 },
 {
  "q": "「はたけの しごと」の フローチャートだよ。\n\nはじめ\n ↓\n🌰 たねを まく\n ↓\n💧 みずを やる\n ↓\n🌿 くさとりを する\n ↓\n🥕 しゅうかくする\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🌿 くさとりを する",
   "🥕 しゅうかくする",
   "🌰 たねを まく"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 くさとりを する",
    "🥕 しゅうかくする"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-18"
 },
 {
  "q": "「おかいもの」の フローチャートだよ。\n\nはじめ\n ↓\n📝 メモを かく\n ↓\n🚶 おみせに いく\n ↓\n🛒 かごに いれる\n ↓\n💰 おかねを はらう\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🛒 かごに いれる",
   "💰 おかねを はらう",
   "📝 メモを かく"
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
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-19"
 },
 {
  "q": "「おそうじ」の フローチャートだよ。\n\nはじめ\n ↓\n🧹 ほうきで はく\n ↓\n🧽 ぞうきんで ふく\n ↓\n🗑️ ごみを すてる\n ↓\n🧼 てを あらう\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🧼 てを あらう",
   "🧹 ほうきで はく",
   "🗑️ ごみを すてる"
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
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-20"
 },
 {
  "q": "「はたけの しごと」の フローチャートだよ。\n\nはじめ\n ↓\n🌰 たねを まく\n ↓\n💧 みずを やる\n ↓\n🌿 くさとりを する\n ↓\n🥕 しゅうかくする\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🌿 くさとりを する",
   "🌰 たねを まく",
   "💧 みずを やる"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 くさとりを する",
    "🥕 しゅうかくする"
   ],
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-21"
 },
 {
  "q": "「せんたく」の フローチャートだよ。\n\nはじめ\n ↓\n👕 ふくを あつめる\n ↓\n🫧 せんたくきを まわす\n ↓\n🌞 ほす\n ↓\n📦 たたんで しまう\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🌞 ほす",
   "📦 たたんで しまう",
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
  "id": "yomitori-e-22"
 },
 {
  "q": "「おふろそうじ」の フローチャートだよ。\n\nはじめ\n ↓\n🧴 せんざいを つける\n ↓\n🧽 ごしごし こする\n ↓\n💦 みずで ながす\n ↓\n🛁 おゆを ためる\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🧽 ごしごし こする",
   "🛁 おゆを ためる",
   "🧴 せんざいを つける"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🧴 せんざいを つける",
    "🧽 ごしごし こする",
    "💦 みずで ながす",
    "🛁 おゆを ためる"
   ],
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-23"
 },
 {
  "q": "「はたけの しごと」の フローチャートだよ。\n\nはじめ\n ↓\n🌰 たねを まく\n ↓\n💧 みずを やる\n ↓\n🌿 くさとりを する\n ↓\n🥕 しゅうかくする\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🌿 くさとりを する",
   "💧 みずを やる",
   "🥕 しゅうかくする"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 くさとりを する",
    "🥕 しゅうかくする"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-24"
 },
 {
  "q": "「たんじょうびかい」の フローチャートだよ。\n\nはじめ\n ↓\n🎈 かざりつけを する\n ↓\n🎂 ケーキを だす\n ↓\n🎵 うたを うたう\n ↓\n🎁 プレゼントを あける\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🎁 プレゼントを あける",
   "🎵 うたを うたう",
   "🎈 かざりつけを する"
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
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-25"
 },
 {
  "q": "「せんたく」の フローチャートだよ。\n\nはじめ\n ↓\n👕 ふくを あつめる\n ↓\n🫧 せんたくきを まわす\n ↓\n🌞 ほす\n ↓\n📦 たたんで しまう\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🫧 せんたくきを まわす",
   "📦 たたんで しまう",
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
  "id": "yomitori-e-26"
 },
 {
  "q": "「おふろそうじ」の フローチャートだよ。\n\nはじめ\n ↓\n🧴 せんざいを つける\n ↓\n🧽 ごしごし こする\n ↓\n💦 みずで ながす\n ↓\n🛁 おゆを ためる\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🛁 おゆを ためる",
   "🧴 せんざいを つける",
   "💦 みずで ながす"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🧴 せんざいを つける",
    "🧽 ごしごし こする",
    "💦 みずで ながす",
    "🛁 おゆを ためる"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-27"
 },
 {
  "q": "「ねるまえの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🛁 おふろに はいる\n ↓\n🥛 みずを のむ\n ↓\n📖 えほんを よむ\n ↓\n😴 ねる\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "📖 えほんを よむ",
   "🥛 みずを のむ",
   "🛁 おふろに はいる"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🛁 おふろに はいる",
    "🥛 みずを のむ",
    "📖 えほんを よむ",
    "😴 ねる"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-28"
 },
 {
  "q": "「カレーづくり」の フローチャートだよ。\n\nはじめ\n ↓\n🔪 やさいを きる\n ↓\n🍳 いためる\n ↓\n💧 みずを いれて にこむ\n ↓\n🍛 ルーを いれる\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "💧 みずを いれて にこむ",
   "🍛 ルーを いれる",
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
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-29"
 },
 {
  "q": "「はたけの しごと」の フローチャートだよ。\n\nはじめ\n ↓\n🌰 たねを まく\n ↓\n💧 みずを やる\n ↓\n🌿 くさとりを する\n ↓\n🥕 しゅうかくする\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🌰 たねを まく",
   "🥕 しゅうかくする",
   "💧 みずを やる"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 くさとりを する",
    "🥕 しゅうかくする"
   ],
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-30"
 },
 {
  "q": "「やさいの みずやり」の フローチャートだよ。\n\nはじめ\n ↓\n🚰 じょうろに みずを いれる\n ↓\n🚶 はたけに いく\n ↓\n💧 みずを かける\n ↓\n🏠 じょうろを かたづける\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🚰 じょうろに みずを いれる",
   "🚶 はたけに いく",
   "💧 みずを かける"
  ],
  "a": 0,
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
  "id": "yomitori-e-31"
 },
 {
  "q": "「はたけの しごと」の フローチャートだよ。\n\nはじめ\n ↓\n🌰 たねを まく\n ↓\n💧 みずを やる\n ↓\n🌿 くさとりを する\n ↓\n🥕 しゅうかくする\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🥕 しゅうかくする",
   "🌰 たねを まく",
   "🌿 くさとりを する"
  ],
  "a": 0,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 くさとりを する",
    "🥕 しゅうかくする"
   ],
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-32"
 },
 {
  "q": "「たなばたの かざり」の フローチャートだよ。\n\nはじめ\n ↓\n📄 たんざくを よういする\n ↓\n✏️ ねがいごとを かく\n ↓\n🎋 ささに かざる\n ↓\n⭐ よぞらを みる\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "⭐ よぞらを みる",
   "✏️ ねがいごとを かく",
   "📄 たんざくを よういする"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "📄 たんざくを よういする",
    "✏️ ねがいごとを かく",
    "🎋 ささに かざる",
    "⭐ よぞらを みる"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-33"
 },
 {
  "q": "「としょかんの ひ」の フローチャートだよ。\n\nはじめ\n ↓\n🏫 としょかんに いく\n ↓\n📚 ほんを えらぶ\n ↓\n📖 しずかに よむ\n ↓\n🏠 かりて かえる\n ↓\nおわり\n\n2ばんめに することは？",
  "opts": [
   "🏠 かりて かえる",
   "📚 ほんを えらぶ",
   "📖 しずかに よむ"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🏫 としょかんに いく",
    "📚 ほんを えらぶ",
    "📖 しずかに よむ",
    "🏠 かりて かえる"
   ],
   "askIndex": 1
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-34"
 },
 {
  "q": "「ねるまえの じゅんび」の フローチャートだよ。\n\nはじめ\n ↓\n🛁 おふろに はいる\n ↓\n🥛 みずを のむ\n ↓\n📖 えほんを よむ\n ↓\n😴 ねる\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🛁 おふろに はいる",
   "😴 ねる",
   "📖 えほんを よむ"
  ],
  "a": 1,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🛁 おふろに はいる",
    "🥛 みずを のむ",
    "📖 えほんを よむ",
    "😴 ねる"
   ],
   "askIndex": 3
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-35"
 },
 {
  "q": "「おふろそうじ」の フローチャートだよ。\n\nはじめ\n ↓\n🧴 せんざいを つける\n ↓\n🧽 ごしごし こする\n ↓\n💦 みずで ながす\n ↓\n🛁 おゆを ためる\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "🧽 ごしごし こする",
   "🧴 せんざいを つける",
   "💦 みずで ながす"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🧴 せんざいを つける",
    "🧽 ごしごし こする",
    "💦 みずで ながす",
    "🛁 おゆを ためる"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-36"
 },
 {
  "q": "「カレーづくり」の フローチャートだよ。\n\nはじめ\n ↓\n🔪 やさいを きる\n ↓\n🍳 いためる\n ↓\n💧 みずを いれて にこむ\n ↓\n🍛 ルーを いれる\n ↓\nおわり\n\n4ばんめに することは？",
  "opts": [
   "🔪 やさいを きる",
   "🍛 ルーを いれる",
   "🍳 いためる"
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
  "id": "yomitori-e-37"
 },
 {
  "q": "「たなばたの かざり」の フローチャートだよ。\n\nはじめ\n ↓\n📄 たんざくを よういする\n ↓\n✏️ ねがいごとを かく\n ↓\n🎋 ささに かざる\n ↓\n⭐ よぞらを みる\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "📄 たんざくを よういする",
   "⭐ よぞらを みる",
   "🎋 ささに かざる"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "📄 たんざくを よういする",
    "✏️ ねがいごとを かく",
    "🎋 ささに かざる",
    "⭐ よぞらを みる"
   ],
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-38"
 },
 {
  "q": "「はたけの しごと」の フローチャートだよ。\n\nはじめ\n ↓\n🌰 たねを まく\n ↓\n💧 みずを やる\n ↓\n🌿 くさとりを する\n ↓\n🥕 しゅうかくする\n ↓\nおわり\n\n1ばんめに することは？",
  "opts": [
   "🌿 くさとりを する",
   "🥕 しゅうかくする",
   "🌰 たねを まく"
  ],
  "a": 2,
  "why": "やじるしを うえから じゅんばんに たどろう",
  "meta": {
   "kind": "yomitori-seq",
   "steps": [
    "🌰 たねを まく",
    "💧 みずを やる",
    "🌿 くさとりを する",
    "🥕 しゅうかくする"
   ],
   "askIndex": 0
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-39"
 },
 {
  "q": "「せんたく」の フローチャートだよ。\n\nはじめ\n ↓\n👕 ふくを あつめる\n ↓\n🫧 せんたくきを まわす\n ↓\n🌞 ほす\n ↓\n📦 たたんで しまう\n ↓\nおわり\n\n3ばんめに することは？",
  "opts": [
   "📦 たたんで しまう",
   "👕 ふくを あつめる",
   "🌞 ほす"
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
   "askIndex": 2
  },
  "category": "yomitori",
  "difficulty": "easy",
  "id": "yomitori-e-40"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nそらは はれている？\n ├─ はい → 🧺 せんたくものを ほす\n └─ いいえ → 🏠 へやの なかに ほす\n\n「そらは はれている？」が「いいえ」のとき、どうする？",
  "opts": [
   "🏠 へやの なかに ほす",
   "🧺 せんたくものを ほす",
   "🧢 ぼうしを かぶる"
  ],
  "a": 0,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🧺 せんたくものを ほす",
   "no": "🏠 へやの なかに ほす"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-1"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nともだちが ころんだ？\n ├─ はい → 🤝 たすけおこす\n └─ いいえ → 🏃 いっしょに はしる\n\n「ともだちが ころんだ？」が「いいえ」のとき、どうする？",
  "opts": [
   "🏃 いっしょに はしる",
   "🤝 たすけおこす",
   "🏫 がっこうに いく"
  ],
  "a": 0,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🤝 たすけおこす",
   "no": "🏃 いっしょに はしる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-2"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nそらは はれている？\n ├─ はい → 🧺 せんたくものを ほす\n └─ いいえ → 🏠 へやの なかに ほす\n\n「そらは はれている？」が「はい」のとき、どうする？",
  "opts": [
   "🏠 いえに かえる",
   "🏠 へやの なかに ほす",
   "🧺 せんたくものを ほす"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🧺 せんたくものを ほす",
   "no": "🏠 へやの なかに ほす"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-3"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nそとが くらくなった？\n ├─ はい → 🏠 いえに かえる\n └─ いいえ → ⚽ もうすこし あそぶ\n\n「そとが くらくなった？」が「いいえ」のとき、どうする？",
  "opts": [
   "🚶 そのまま あるく",
   "⚽ もうすこし あそぶ",
   "🏠 いえに かえる"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🏠 いえに かえる",
   "no": "⚽ もうすこし あそぶ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-4"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nゴミが おちている？\n ├─ はい → 🗑️ ひろって すてる\n └─ いいえ → 🚶 そのまま あるく\n\n「ゴミが おちている？」が「はい」のとき、どうする？",
  "opts": [
   "🥤 みずを のむ",
   "🗑️ ひろって すてる",
   "🚶 そのまま あるく"
  ],
  "a": 1,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🗑️ ひろって すてる",
   "no": "🚶 そのまま あるく"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-5"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nへやが くらい？\n ├─ はい → 💡 でんきを つける\n └─ いいえ → そのまま あそぶ\n\n「へやが くらい？」が「はい」のとき、どうする？",
  "opts": [
   "🧥 うわぎを きる",
   "💡 でんきを つける",
   "そのまま あそぶ"
  ],
  "a": 1,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "💡 でんきを つける",
   "no": "そのまま あそぶ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-6"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nしゅくだいは おわった？\n ├─ はい → ⚽ そとで あそぶ\n └─ いいえ → ✏️ つづきを やる\n\n「しゅくだいは おわった？」が「いいえ」のとき、どうする？",
  "opts": [
   "🪑 ベンチで まつ",
   "✏️ つづきを やる",
   "⚽ そとで あそぶ"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "⚽ そとで あそぶ",
   "no": "✏️ つづきを やる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-7"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nたまごが ある？\n ├─ はい → 🍳 たまごやきを つくる\n └─ いいえ → 🍞 パンだけ たべる\n\n「たまごが ある？」が「はい」のとき、どうする？",
  "opts": [
   "🍳 たまごやきを つくる",
   "🛑 とまって まつ",
   "🍞 パンだけ たべる"
  ],
  "a": 0,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🍳 たまごやきを つくる",
   "no": "🍞 パンだけ たべる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-8"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nおなかが すいた？\n ├─ はい → 🍙 おにぎりを たべる\n └─ いいえ → 📚 ほんを よむ\n\n「おなかが すいた？」が「いいえ」のとき、どうする？",
  "opts": [
   "🍙 おにぎりを たべる",
   "🚶 そのまま あるく",
   "📚 ほんを よむ"
  ],
  "a": 2,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🍙 おにぎりを たべる",
   "no": "📚 ほんを よむ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-9"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nてが よごれている？\n ├─ はい → 🧼 てを あらう\n └─ いいえ → 🍞 そのまま たべる\n\n「てが よごれている？」が「いいえ」のとき、どうする？",
  "opts": [
   "🧼 てを あらう",
   "🍞 パンだけ たべる",
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
  "id": "yomitori-n-10"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nバスが きた？\n ├─ はい → 🚌 バスに のる\n └─ いいえ → 🪑 ベンチで まつ\n\n「バスが きた？」が「いいえ」のとき、どうする？",
  "opts": [
   "🚌 バスに のる",
   "🍞 そのまま たべる",
   "🪑 ベンチで まつ"
  ],
  "a": 2,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🚌 バスに のる",
   "no": "🪑 ベンチで まつ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-11"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nさむい？\n ├─ はい → 🧥 うわぎを きる\n └─ いいえ → 👕 そのままで いい\n\n「さむい？」が「いいえ」のとき、どうする？",
  "opts": [
   "👕 そのままで いい",
   "🍞 パンだけ たべる",
   "🧥 うわぎを きる"
  ],
  "a": 0,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🧥 うわぎを きる",
   "no": "👕 そのままで いい"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-12"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nおなかが すいた？\n ├─ はい → 🍙 おにぎりを たべる\n └─ いいえ → 📚 ほんを よむ\n\n「おなかが すいた？」が「いいえ」のとき、どうする？",
  "opts": [
   "🍙 おにぎりを たべる",
   "📚 ほんを よむ",
   "👟 そのまま はく"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🍙 おにぎりを たべる",
   "no": "📚 ほんを よむ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-13"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nしゅくだいは おわった？\n ├─ はい → ⚽ そとで あそぶ\n └─ いいえ → ✏️ つづきを やる\n\n「しゅくだいは おわった？」が「いいえ」のとき、どうする？",
  "opts": [
   "⚽ そとで あそぶ",
   "🏫 がっこうに いく",
   "✏️ つづきを やる"
  ],
  "a": 2,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "⚽ そとで あそぶ",
   "no": "✏️ つづきを やる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-14"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nおなかが すいた？\n ├─ はい → 🍙 おにぎりを たべる\n └─ いいえ → 📚 ほんを よむ\n\n「おなかが すいた？」が「はい」のとき、どうする？",
  "opts": [
   "📚 ほんを よむ",
   "🍙 おにぎりを たべる",
   "🍳 たまごやきを つくる"
  ],
  "a": 1,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🍙 おにぎりを たべる",
   "no": "📚 ほんを よむ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-15"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nのどが かわいた？\n ├─ はい → 🥤 みずを のむ\n └─ いいえ → ⚽ あそびつづける\n\n「のどが かわいた？」が「いいえ」のとき、どうする？",
  "opts": [
   "⚽ あそびつづける",
   "🏫 がっこうに いく",
   "🥤 みずを のむ"
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
  "id": "yomitori-n-16"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nてが よごれている？\n ├─ はい → 🧼 てを あらう\n └─ いいえ → 🍞 そのまま たべる\n\n「てが よごれている？」が「はい」のとき、どうする？",
  "opts": [
   "🧥 うわぎを きる",
   "🍞 そのまま たべる",
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
  "id": "yomitori-n-17"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nおなかが すいた？\n ├─ はい → 🍙 おにぎりを たべる\n └─ いいえ → 📚 ほんを よむ\n\n「おなかが すいた？」が「いいえ」のとき、どうする？",
  "opts": [
   "📚 ほんを よむ",
   "✏️ つづきを やる",
   "🍙 おにぎりを たべる"
  ],
  "a": 0,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🍙 おにぎりを たべる",
   "no": "📚 ほんを よむ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-18"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nしゅくだいは おわった？\n ├─ はい → ⚽ そとで あそぶ\n └─ いいえ → ✏️ つづきを やる\n\n「しゅくだいは おわった？」が「はい」のとき、どうする？",
  "opts": [
   "✏️ つづきを やる",
   "⚽ そとで あそぶ",
   "🗑️ ひろって すてる"
  ],
  "a": 1,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "⚽ そとで あそぶ",
   "no": "✏️ つづきを やる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-19"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nたまごが ある？\n ├─ はい → 🍳 たまごやきを つくる\n └─ いいえ → 🍞 パンだけ たべる\n\n「たまごが ある？」が「はい」のとき、どうする？",
  "opts": [
   "🍞 パンだけ たべる",
   "☂️ かさを もっていく",
   "🍳 たまごやきを つくる"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🍳 たまごやきを つくる",
   "no": "🍞 パンだけ たべる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-20"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nそとが くらくなった？\n ├─ はい → 🏠 いえに かえる\n └─ いいえ → ⚽ もうすこし あそぶ\n\n「そとが くらくなった？」が「はい」のとき、どうする？",
  "opts": [
   "💡 でんきを つける",
   "🏠 いえに かえる",
   "⚽ もうすこし あそぶ"
  ],
  "a": 1,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🏠 いえに かえる",
   "no": "⚽ もうすこし あそぶ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-21"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nそらは はれている？\n ├─ はい → 🧺 せんたくものを ほす\n └─ いいえ → 🏠 へやの なかに ほす\n\n「そらは はれている？」が「はい」のとき、どうする？",
  "opts": [
   "🍳 たまごやきを つくる",
   "🏠 へやの なかに ほす",
   "🧺 せんたくものを ほす"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🧺 せんたくものを ほす",
   "no": "🏠 へやの なかに ほす"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-22"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nてが よごれている？\n ├─ はい → 🧼 てを あらう\n └─ いいえ → 🍞 そのまま たべる\n\n「てが よごれている？」が「はい」のとき、どうする？",
  "opts": [
   "☂️ かさを もっていく",
   "🧼 てを あらう",
   "🍞 そのまま たべる"
  ],
  "a": 1,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🧼 てを あらう",
   "no": "🍞 そのまま たべる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-23"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nおもちゃが こわれた？\n ├─ はい → 🔧 なおして もらう\n └─ いいえ → 🧸 そのまま あそぶ\n\n「おもちゃが こわれた？」が「いいえ」のとき、どうする？",
  "opts": [
   "⚽ もうすこし あそぶ",
   "🔧 なおして もらう",
   "🧸 そのまま あそぶ"
  ],
  "a": 2,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🔧 なおして もらう",
   "no": "🧸 そのまま あそぶ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-24"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nてが よごれている？\n ├─ はい → 🧼 てを あらう\n └─ いいえ → 🍞 そのまま たべる\n\n「てが よごれている？」が「いいえ」のとき、どうする？",
  "opts": [
   "🧼 てを あらう",
   "🧸 そのまま あそぶ",
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
  "id": "yomitori-n-25"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nそとが くらくなった？\n ├─ はい → 🏠 いえに かえる\n └─ いいえ → ⚽ もうすこし あそぶ\n\n「そとが くらくなった？」が「いいえ」のとき、どうする？",
  "opts": [
   "🍞 パンだけ たべる",
   "⚽ もうすこし あそぶ",
   "🏠 いえに かえる"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🏠 いえに かえる",
   "no": "⚽ もうすこし あそぶ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-26"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nおなかが すいた？\n ├─ はい → 🍙 おにぎりを たべる\n └─ いいえ → 📚 ほんを よむ\n\n「おなかが すいた？」が「はい」のとき、どうする？",
  "opts": [
   "📚 ほんを よむ",
   "🍙 おにぎりを たべる",
   "🛏️ おうちで やすむ"
  ],
  "a": 1,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🍙 おにぎりを たべる",
   "no": "📚 ほんを よむ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-27"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nともだちが ころんだ？\n ├─ はい → 🤝 たすけおこす\n └─ いいえ → 🏃 いっしょに はしる\n\n「ともだちが ころんだ？」が「いいえ」のとき、どうする？",
  "opts": [
   "🏃 いっしょに はしる",
   "⚽ もうすこし あそぶ",
   "🤝 たすけおこす"
  ],
  "a": 0,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🤝 たすけおこす",
   "no": "🏃 いっしょに はしる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-28"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nたまごが ある？\n ├─ はい → 🍳 たまごやきを つくる\n └─ いいえ → 🍞 パンだけ たべる\n\n「たまごが ある？」が「いいえ」のとき、どうする？",
  "opts": [
   "✏️ つづきを やる",
   "🍞 パンだけ たべる",
   "🍳 たまごやきを つくる"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🍳 たまごやきを つくる",
   "no": "🍞 パンだけ たべる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-29"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nのどが かわいた？\n ├─ はい → 🥤 みずを のむ\n └─ いいえ → ⚽ あそびつづける\n\n「のどが かわいた？」が「はい」のとき、どうする？",
  "opts": [
   "🥤 みずを のむ",
   "⚽ あそびつづける",
   "☂️ かさを もっていく"
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
  "id": "yomitori-n-30"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nのどが かわいた？\n ├─ はい → 🥤 みずを のむ\n └─ いいえ → ⚽ あそびつづける\n\n「のどが かわいた？」が「いいえ」のとき、どうする？",
  "opts": [
   "🏃 いっしょに はしる",
   "⚽ あそびつづける",
   "🥤 みずを のむ"
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
  "id": "yomitori-n-31"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nしんごうが あか？\n ├─ はい → 🛑 とまって まつ\n └─ いいえ → 🚶 わたる\n\n「しんごうが あか？」が「はい」のとき、どうする？",
  "opts": [
   "🗑️ ひろって すてる",
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
  "id": "yomitori-n-32"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nおなかが すいた？\n ├─ はい → 🍙 おにぎりを たべる\n └─ いいえ → 📚 ほんを よむ\n\n「おなかが すいた？」が「いいえ」のとき、どうする？",
  "opts": [
   "🧢 ぼうしを かぶる",
   "🍙 おにぎりを たべる",
   "📚 ほんを よむ"
  ],
  "a": 2,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🍙 おにぎりを たべる",
   "no": "📚 ほんを よむ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-33"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nねつが ある？\n ├─ はい → 🛏️ おうちで やすむ\n └─ いいえ → 🏫 がっこうに いく\n\n「ねつが ある？」が「いいえ」のとき、どうする？",
  "opts": [
   "🛏️ おうちで やすむ",
   "🏫 がっこうに いく",
   "🍞 そのまま たべる"
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
  "id": "yomitori-n-34"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nあめが ふっている？\n ├─ はい → ☂️ かさを もっていく\n └─ いいえ → 🧢 ぼうしを かぶる\n\n「あめが ふっている？」が「はい」のとき、どうする？",
  "opts": [
   "☂️ かさを もっていく",
   "🧢 ぼうしを かぶる",
   "🥤 みずを のむ"
  ],
  "a": 0,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "☂️ かさを もっていく",
   "no": "🧢 ぼうしを かぶる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-35"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nバスが きた？\n ├─ はい → 🚌 バスに のる\n └─ いいえ → 🪑 ベンチで まつ\n\n「バスが きた？」が「はい」のとき、どうする？",
  "opts": [
   "🪑 ベンチで まつ",
   "🚌 バスに のる",
   "🧥 うわぎを きる"
  ],
  "a": 1,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "🚌 バスに のる",
   "no": "🪑 ベンチで まつ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-36"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nともだちが ころんだ？\n ├─ はい → 🤝 たすけおこす\n └─ いいえ → 🏃 いっしょに はしる\n\n「ともだちが ころんだ？」が「いいえ」のとき、どうする？",
  "opts": [
   "🏃 いっしょに はしる",
   "そのまま あそぶ",
   "🤝 たすけおこす"
  ],
  "a": 0,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🤝 たすけおこす",
   "no": "🏃 いっしょに はしる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-37"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nともだちが ころんだ？\n ├─ はい → 🤝 たすけおこす\n └─ いいえ → 🏃 いっしょに はしる\n\n「ともだちが ころんだ？」が「いいえ」のとき、どうする？",
  "opts": [
   "👕 そのままで いい",
   "🏃 いっしょに はしる",
   "🤝 たすけおこす"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🤝 たすけおこす",
   "no": "🏃 いっしょに はしる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-38"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nしゅくだいは おわった？\n ├─ はい → ⚽ そとで あそぶ\n └─ いいえ → ✏️ つづきを やる\n\n「しゅくだいは おわった？」が「はい」のとき、どうする？",
  "opts": [
   "🏠 いえに かえる",
   "✏️ つづきを やる",
   "⚽ そとで あそぶ"
  ],
  "a": 2,
  "why": "「はい」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": true,
   "yes": "⚽ そとで あそぶ",
   "no": "✏️ つづきを やる"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-39"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\nそとが くらくなった？\n ├─ はい → 🏠 いえに かえる\n └─ いいえ → ⚽ もうすこし あそぶ\n\n「そとが くらくなった？」が「いいえ」のとき、どうする？",
  "opts": [
   "🏠 いえに かえる",
   "⚽ もうすこし あそぶ",
   "🏃 いっしょに はしる"
  ],
  "a": 1,
  "why": "「いいえ」の やじるしの さきを みよう",
  "meta": {
   "kind": "yomitori-branch",
   "askCond": false,
   "yes": "🏠 いえに かえる",
   "no": "⚽ もうすこし あそぶ"
  },
  "category": "yomitori",
  "difficulty": "normal",
  "id": "yomitori-n-40"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 🌸を かく\n │ 🌸を かく\n ↓\nおわり\n\nはな🌸は ぜんぶで なんかい？",
  "opts": [
   "15かい",
   "7かい",
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
  "id": "yomitori-h-1"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ ⭕を かく\n │ 🔔を ならす\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
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
  "id": "yomitori-h-2"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 🦘 ジャンプする\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "5かい",
   "6かい",
   "10かい"
  ],
  "a": 0,
  "why": "5かい くりかえすと 5かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 5,
   "per": 1
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-3"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ 🦘 ジャンプする\n │ 🪙を いれる\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "5かい",
   "3かい"
  ],
  "a": 2,
  "why": "1しゅうに 1かいずつ。3しゅうで 3かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 3
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-4"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 6かい くりかえす\n │ ⭕を かく\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
  "opts": [
   "12かい",
   "7かい",
   "6かい"
  ],
  "a": 2,
  "why": "6かい くりかえすと 6かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 6,
   "per": 1
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-5"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 🔔を ならす\n │ 🌸を かく\n ↓\nおわり\n\nかね🔔は ぜんぶで なんかい？",
  "opts": [
   "7かい",
   "10かい",
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
  "id": "yomitori-h-6"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 6かい くりかえす\n │ 🔔を ならす\n ↓\nおわり\n\nかね🔔は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "12かい",
   "7かい"
  ],
  "a": 0,
  "why": "6かい くりかえすと 6かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 6,
   "per": 1
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-7"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ ⭕を かく\n │ ⭐を かく\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
  "opts": [
   "5かい",
   "10かい",
   "7かい"
  ],
  "a": 0,
  "why": "1しゅうに 1かいずつ。5しゅうで 5かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 5
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-8"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🌸を かく\n │ 🌸を かく\n ↓\nおわり\n\nはな🌸は ぜんぶで なんかい？",
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
  "id": "yomitori-h-9"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 6かい くりかえす\n │ 🦘 ジャンプする\n │ 🥁を たたく\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "12かい",
   "8かい",
   "6かい"
  ],
  "a": 2,
  "why": "1しゅうに 1かいずつ。6しゅうで 6かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 6
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-10"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 6かい くりかえす\n │ ⭐を かく\n │ ⭐を かく\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
  "opts": [
   "18かい",
   "12かい",
   "8かい"
  ],
  "a": 1,
  "why": "1しゅうで 2かい。6しゅうで 12かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 6,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-11"
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
  "id": "yomitori-h-12"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 6かい くりかえす\n │ ⭐を かく\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
  "opts": [
   "7かい",
   "6かい",
   "12かい"
  ],
  "a": 1,
  "why": "6かい くりかえすと 6かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 6,
   "per": 1
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-13"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🎈を ふくらませる\n │ ⭐を かく\n ↓\nおわり\n\nふうせん🎈は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "4かい",
   "8かい"
  ],
  "a": 1,
  "why": "1しゅうに 1かいずつ。4しゅうで 4かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 4
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-14"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🪙を いれる\n │ 🥁を たたく\n ↓\nおわり\n\nコイン🪙は ぜんぶで なんかい？",
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
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 6かい くりかえす\n │ ⭕を かく\n │ ⭕を かく\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
  "opts": [
   "8かい",
   "18かい",
   "12かい"
  ],
  "a": 2,
  "why": "1しゅうで 2かい。6しゅうで 12かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 6,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-16"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🌸を かく\n │ 🔔を ならす\n ↓\nおわり\n\nはな🌸は ぜんぶで なんかい？",
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
  "id": "yomitori-h-17"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 🥁を たたく\n ↓\nおわり\n\nたいこ🥁は ぜんぶで なんかい？",
  "opts": [
   "10かい",
   "6かい",
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
  "id": "yomitori-h-18"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 👏 てを たたく\n │ 🥁を たたく\n ↓\nおわり\n\nはくしゅ👏は ぜんぶで なんかい？",
  "opts": [
   "7かい",
   "10かい",
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
  "id": "yomitori-h-19"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🪙を いれる\n ↓\nおわり\n\nコイン🪙は ぜんぶで なんかい？",
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
  "id": "yomitori-h-20"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ 🎈を ふくらませる\n │ 🪙を いれる\n ↓\nおわり\n\nふうせん🎈は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "5かい",
   "3かい"
  ],
  "a": 2,
  "why": "1しゅうに 1かいずつ。3しゅうで 3かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 3
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-21"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🥁を たたく\n │ 🥁を たたく\n ↓\nおわり\n\nたいこ🥁は ぜんぶで なんかい？",
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
  "id": "yomitori-h-22"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ ⭐を かく\n │ 🦘 ジャンプする\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
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
  "id": "yomitori-h-23"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ 🚩を ふる\n │ 🚩を ふる\n ↓\nおわり\n\nはた🚩は ぜんぶで なんかい？",
  "opts": [
   "9かい",
   "6かい",
   "5かい"
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
  "id": "yomitori-h-24"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 👏 てを たたく\n │ 🦘 ジャンプする\n ↓\nおわり\n\nはくしゅ👏は ぜんぶで なんかい？",
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
  "id": "yomitori-h-25"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 6かい くりかえす\n │ 🚩を ふる\n │ 🚩を ふる\n ↓\nおわり\n\nはた🚩は ぜんぶで なんかい？",
  "opts": [
   "18かい",
   "8かい",
   "12かい"
  ],
  "a": 2,
  "why": "1しゅうで 2かい。6しゅうで 12かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 6,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-26"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 🔔を ならす\n │ ⭐を かく\n ↓\nおわり\n\nかね🔔は ぜんぶで なんかい？",
  "opts": [
   "5かい",
   "10かい",
   "7かい"
  ],
  "a": 0,
  "why": "1しゅうに 1かいずつ。5しゅうで 5かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 5
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-27"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ ⭐を かく\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
  "opts": [
   "4かい",
   "3かい",
   "6かい"
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
  "id": "yomitori-h-28"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🎈を ふくらませる\n │ 🦘 ジャンプする\n ↓\nおわり\n\nふうせん🎈は ぜんぶで なんかい？",
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
  "id": "yomitori-h-29"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🦘 ジャンプする\n │ 🦘 ジャンプする\n ↓\nおわり\n\nジャンプ🦘は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "12かい",
   "8かい"
  ],
  "a": 2,
  "why": "1しゅうで 2かい。4しゅうで 8かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 4,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-30"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 🪙を いれる\n │ 🥁を たたく\n ↓\nおわり\n\nコイン🪙は ぜんぶで なんかい？",
  "opts": [
   "7かい",
   "5かい",
   "10かい"
  ],
  "a": 1,
  "why": "1しゅうに 1かいずつ。5しゅうで 5かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 5
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-31"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ ⭕を かく\n │ ⭕を かく\n ↓\nおわり\n\nまる⭕は ぜんぶで なんかい？",
  "opts": [
   "12かい",
   "6かい",
   "8かい"
  ],
  "a": 2,
  "why": "1しゅうで 2かい。4しゅうで 8かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 4,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-32"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🥁を たたく\n │ 🦘 ジャンプする\n ↓\nおわり\n\nたいこ🥁は ぜんぶで なんかい？",
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
  "id": "yomitori-h-33"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 6かい くりかえす\n │ 🪙を いれる\n │ 👏 てを たたく\n ↓\nおわり\n\nコイン🪙は ぜんぶで なんかい？",
  "opts": [
   "12かい",
   "8かい",
   "6かい"
  ],
  "a": 2,
  "why": "1しゅうに 1かいずつ。6しゅうで 6かいだね",
  "meta": {
   "kind": "yomitori-loop2",
   "count": 6
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-34"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 5かい くりかえす\n │ 🎈を ふくらませる\n │ 🎈を ふくらませる\n ↓\nおわり\n\nふうせん🎈は ぜんぶで なんかい？",
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
  "id": "yomitori-h-35"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ ⭐を かく\n │ 🔔を ならす\n ↓\nおわり\n\nほし⭐は ぜんぶで なんかい？",
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
  "id": "yomitori-h-36"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 6かい くりかえす\n │ 🔔を ならす\n │ 🔔を ならす\n ↓\nおわり\n\nかね🔔は ぜんぶで なんかい？",
  "opts": [
   "18かい",
   "12かい",
   "8かい"
  ],
  "a": 1,
  "why": "1しゅうで 2かい。6しゅうで 12かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 6,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-37"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🥁を たたく\n │ ⭐を かく\n ↓\nおわり\n\nたいこ🥁は ぜんぶで なんかい？",
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
  "id": "yomitori-h-38"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 4かい くりかえす\n │ 🎈を ふくらませる\n │ 🎈を ふくらませる\n ↓\nおわり\n\nふうせん🎈は ぜんぶで なんかい？",
  "opts": [
   "6かい",
   "12かい",
   "8かい"
  ],
  "a": 2,
  "why": "1しゅうで 2かい。4しゅうで 8かいだね",
  "meta": {
   "kind": "yomitori-loop",
   "count": 4,
   "per": 2
  },
  "category": "yomitori",
  "difficulty": "hard",
  "id": "yomitori-h-39"
 },
 {
  "q": "フローチャートを よもう。\n\nはじめ\n ↓\n🔁 3かい くりかえす\n │ 🔔を ならす\n │ 🎈を ふくらませる\n ↓\nおわり\n\nかね🔔は ぜんぶで なんかい？",
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
  "id": "yomitori-h-40"
 }
];
