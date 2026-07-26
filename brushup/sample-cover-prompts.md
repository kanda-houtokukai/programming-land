# アセット生成プロンプト: みほんのカバー絵（カセットのラベル）

作成: 2026-07-25 ／ 用途: ChatGPT での画像生成 → Chat で加工 → Code が配置
準拠: `brushup/studio-asset-prompts.md`（つくるスタジオ）／`brushup/gamelab-asset-prompts.md` と同じ作法

## なぜ作るか

みほんの棚（**カセットだな**）のサムネは、いま `StudioThumb` が「背景＋キャラの初期配置」を自動で描いている。
そのため**どのみほんも「背景の上にキャラが立っている絵」になり、並べても見分けがつかない**（神田さんの実機FB「あれだけ見るとなんのことかわからず」）。

b6m で1行の説明文を足したが、絵そのものは変わっていない。
**棚は「カセットだな」＝ 本物のカセットにはラベルの絵がある。** そこを埋める。

## 仕様

- **3:2 の横長**（表示は 128×85px・生成は 1536×1024 など 3:2 なら可）
- **白背景で生成 → Chat が加工**（透過は不要。**四隅まで絵で埋める**）
- **文字は一切入れない**（名前と説明文はアプリ側で下に出す）
- ⚠️ **128×85 まで縮む。** 細部は完全に消える。**大きな形・強い色・要素は3つまで**
- 既存の3Dつやつや画風に合わせる（既存18枚のアイコン・建物と同じ世界）
- **主人公の顔は描かない**（子どもごとにアバターが違うため）。うしろ姿・シルエット・帽子だけ、などで示す

---

## A. ゲームこうぼう（6枚）★こちらを先に

### #1 あつめゲーム（`collect`）
説明文: 「キャラを タップして あつめよう！ 10てんで クリア！」

```
A cute 3D-rendered game cover illustration for a children's game-making app, 3:2 landscape, filling the entire frame. Soft glossy lighting, rounded shapes, bright high-saturation colors, bold simple composition readable at very small size. A big cartoon hand with one finger tapping down on a glowing golden star in the center, with three more golden stars floating upward and shrinking toward the top right corner, on a sunny green grass field with a bright blue sky. Only three kinds of elements: the hand, the stars, the field. No text, no letters, no numbers, no logos, no human faces.
```

### #2 よけゲーム（`dodge`）
説明文: 「タップで にげまわって、てきに さわらず 30びょう しのごう！」

```
A cute 3D-rendered game cover illustration for a children's game-making app, 3:2 landscape, filling the entire frame. Soft glossy lighting, rounded shapes, bright high-saturation colors, bold simple composition readable at very small size. A small round blue character seen from behind, ducking low in the center, with three chunky red spiky balls rushing toward it from the left and right leaving short motion lines, on a sunny green grass field. The blue character is clearly smaller than the red hazards. No text, no letters, no numbers, no logos, no human faces.
```

### #3 キャッチ（`catch`）
説明文: 「タップで うごいて、にげる スライムだけを 5ひき つかまえよう！」

```
A cute 3D-rendered game cover illustration for a children's game-making app, 3:2 landscape, filling the entire frame. Soft glossy lighting, rounded shapes, bright high-saturation colors, bold simple composition readable at very small size. Three round glossy blue slime blobs fleeing to the right with worried expressions and short motion lines behind them, while a big cartoon hand reaches in from the left about to scoop one up, on a sunny green grass field. No text, no letters, no numbers, no logos, no human faces.
```

### #4 おちものキャッチ（`dropcatch`）
説明文: 「じゅうじキーで うごいて、おちてくる リンゴを キャッチ！」

```
A cute 3D-rendered game cover illustration for a children's game-making app, 3:2 landscape, filling the entire frame. Soft glossy lighting, rounded shapes, bright high-saturation colors, bold simple composition readable at very small size. Four big glossy red apples falling down from the top of the frame with short motion lines, and at the bottom center a small explorer child seen from behind wearing a wide tan safari hat, arms raised to catch them, on a sunny green grass field. The apples are large and clearly the main subject. No text, no letters, no numbers, no logos, no human faces.
```

### #5 おにごっこ（`oni`）
説明文: 「おにに つかまらないように、30びょう にげきろう！」

```
A cute 3D-rendered game cover illustration for a children's game-making app, 3:2 landscape, filling the entire frame. Soft glossy lighting, rounded shapes, bright high-saturation colors, bold simple composition readable at very small size. A small explorer child seen from behind wearing a wide tan safari hat, running fast toward the left with motion lines, chased closely from the right by a big friendly orange flame lion with a playful grin, on a sunny green grass field. Energetic and fun, never scary. No text, no letters, no numbers, no logos, no human faces.
```

### #6 ゴールまで いこう（`goalrun`）
説明文: 「いわを よけて、ゴールの はたに たどりつこう！」

```
A cute 3D-rendered game cover illustration for a children's game-making app, 3:2 landscape, filling the entire frame. Soft glossy lighting, rounded shapes, bright high-saturation colors, bold simple composition readable at very small size. A large black and white checkered goal flag on a wooden pole standing on the right side, a small explorer child seen from behind wearing a wide tan safari hat walking toward it from the left, and two chunky grey boulders between them, on a sunny green grass field. No text, no letters, no numbers, no logos, no human faces.
```

---

## B. つくるスタジオ（4枚）★A の画風が決まってから

### #7 ダンスパーティー（`dance`）
「▶を おすと、2ひきが ちがう リズムで おどりだすよ。」

```
A cute 3D-rendered game cover illustration for a children's creative app, 3:2 landscape, filling the entire frame. Soft glossy lighting, rounded shapes, bright high-saturation colors, bold simple composition readable at very small size. Two round glossy characters in orange and light blue dancing side by side with their arms up, tilted in opposite directions, with a few colorful music notes floating around them, on a warm wooden theater stage with a red curtain behind. No text, no letters, no numbers, no logos, no human faces.
```

### #8 おいかけっこ（`chase`）
「さきに いった こを、あとから きのこが おいかけるよ。」

```
A cute 3D-rendered game cover illustration for a children's creative app, 3:2 landscape, filling the entire frame. Soft glossy lighting, rounded shapes, bright high-saturation colors, bold simple composition readable at very small size. A round glossy blue character running to the left, followed closely by a cheerful red-capped mushroom character hopping after it with short motion lines behind, on a warm wooden theater stage with a red curtain behind. Playful and friendly. No text, no letters, no numbers, no logos, no human faces.
```

### #9 タップでへんしん（`tap`）
「キャラを タップすると、大きくなったり きえたり するよ。」

```
A cute 3D-rendered game cover illustration for a children's creative app, 3:2 landscape, filling the entire frame. Soft glossy lighting, rounded shapes, bright high-saturation colors, bold simple composition readable at very small size. A big cartoon hand tapping down on a round glossy orange character in the center, which is bursting bigger with a ring of sparkles around it, while a faded translucent copy of the same character vanishes at the right side, on a warm wooden theater stage with a red curtain behind. No text, no letters, no numbers, no logos, no human faces.
```

### #10 ドッキリかくれんぼ（`hide`）
「あるいて きのこに ぶつかると、ドッキリ！ きのこが きえるよ。」

```
A cute 3D-rendered game cover illustration for a children's creative app, 3:2 landscape, filling the entire frame. Soft glossy lighting, rounded shapes, bright high-saturation colors, bold simple composition readable at very small size. A round glossy blue character bumping into a cheerful red-capped mushroom character in the center, with a burst of yellow surprise stars at the point of contact, and the mushroom already turning translucent as it vanishes, on a warm wooden theater stage with a red curtain behind. Playful surprise, never scary. No text, no letters, no numbers, no logos, no human faces.
```

---

## 進め方

1. **まず #4 おちものキャッチ・#5 おにごっこ・#6 ゴールまで いこう の3枚**を生成 → Chat が **128×85 に縮めた状態で並べて検品**（ここで読めなければ画風から作り直す）
2. 通れば A の残り3枚
3. B の4枚
4. Chat が **3:2 に整えて WebP 化**（既存の内観と同じ q75）→ Code が `StudioThumb` の代わりに表示

⚠️ **検品は必ず 128×85 で行う。** 大きな絵で良く見えても、縮めると何も分からない、が最も起きやすい失敗。

⚠️ **自分の作品（フィルムだな）は従来の自動サムネのまま。** カバー絵は**みほんだけ**。「みほん＝作り込まれた見本」「自分の作品＝自分が作ったもの」の区別がつく。
