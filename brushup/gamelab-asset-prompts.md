# アセット生成プロンプト一式: ゲームこうぼう（開店フェーズ）

作成: 2026-07-24 ／ 用途: ChatGPT での画像生成 → Chat で加工 → Code が配置
準拠: `brushup/studio-asset-prompts.md`（2026-07-17・つくるスタジオ）と**同じ共通スタイル・同じ書式**

加工の標準（確立済みパイプライン・スタジオと同一）:
- アイコン/建物/小物: **白背景で生成** → 透過処理（flood-fill・閾値 mn>225 かつ 彩度<22 で色要素保護・影は `scipy.ndimage.binary_dilation` で半透明化） → **256px PNG**
- 背景: 1600×900 → WebP quality=75
- 不自然な箇所はクロップで直さず**再生成**。文字は画像に描かせない（アプリ側フォントで重畳）
- 以下の各プロンプトは**共通スタイル込みの自己完結型**。**そのまま1個ずつコピペして生成**する

生成方針: **1枚ずつ生成**（グリッド一括はサイズ不揃いの手戻りが出やすい）。
⚠️ **まず #1〜#3 の3枚だけ出して、既存18枚と並べて画風が揃うか確認**してから残りを進めること。

---

## A. カードアイコン 11種（透過PNG・生成後に256pxへ）

現在この11種はすべて暫定SVGグリフ。既存18枚（本番PNG）と並ぶため画風を揃える。

### #1 ランダムに うごく（moveRand）

```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. Four short chunky 3D arrows in bright blue pointing outward in four different scattered directions from a common center, with rounded edges, suggesting unpredictable movement. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #2 はねかえる（bounce）

```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A single chunky 3D arrow in bright blue bent sharply into a V shape, bouncing off a short rounded grey wall placed at the outer side of the bend, with rounded edges. Plain white background, generous margins. No text, no letters, no logos.
```

### #3 スコア ＋（scoreUp）

```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A single golden star with a small round green badge attached at its upper right corner, and a chunky rounded plus shape on that badge. Plain white background, generous margins. No text, no letters, no logos.
```

### #4 スコア －（scoreDown）

```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A single golden star with a small round red badge attached at its upper right corner, and a chunky rounded minus bar on that badge. Plain white background, generous margins. No text, no letters, no logos.
```

### #5 ぶつかったら・あいてを えらぶ（bumpTarget）

```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. Two round glossy balls in orange and light blue gently bumping into each other, with a few tiny stars scattering from the point of contact, and a small glowing ring highlighting the light blue one to show it is the chosen partner. Playful, not violent. Plain white background, generous margins. No text, no letters, no logos.
```

### #6 じゅうじキー（dpad）

```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A single chunky game controller directional pad shaped like a plus sign with four rounded arms, made of glossy teal plastic with a slightly lighter pressable top surface and a small round dip in the center. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #7 タップいどう（tapMove）

```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A cute rounded cartoon hand with one index finger tapping down onto a flat spot, with two soft teal ripple rings spreading outward from the touch point. Plain white background, generous margins. No text, no letters, no logos.
```

### #8 ゴール（goal）

```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A single checkered racing goal flag with a black and white checker pattern, gently waving, on a short rounded wooden pole. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #9 おいかける（chase）

```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. Two round glossy balls in a row, a blue one chasing an orange one, with three short rounded speed lines trailing behind the blue one. Playful and cheerful, not scary. Plain white background, generous margins. No text, no letters, no logos.
```

### #10 ふってくる（fall）

```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A single glossy red apple with a small green leaf, falling downward, with two short rounded motion lines above it. Plain white background, generous margins. No text, no letters, no logos.
```

### #11 とべるように（jumpable）

```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A round glossy teal ball in mid-air at the top of a jump, with a dashed curved arc drawn below it showing the jump path, and a small puff of dust at the takeoff point. Plain white background, generous margins. No text, no letters, no logos.
```

**確認点**: 既存18枚と並べて、輪郭の太さ・つやの入り方・色の明るさが揃っていること。
矢印系（#1・#2）は既存の #4〜#7（みぎへ/ひだりへ/うえへ/したへ）と同じ造形に見えること。
#9 のボールは #3 ぶつかったら・#5 と同じ質感のボールであること。

---

## B. こうぼう建物（ワールドマップ用・透過256px PNG）

⚠️ **2〜3案出して見比べる。** 屋根の飾りはスタジオの「カチンコ」と対になる記号なので、ここだけは選びたい。

### B-案1 コントローラー（推奨）

```
A cute 3D-rendered game asset for a children's educational game. Soft glossy lighting, rounded shapes, warm high-saturation colors, bright and friendly low-poly cartoon style. A small game workshop building: rounded warm red-brick walls, a teal green roof, a large decorative game controller ornament mounted on the roof, two small round gears on the wall beside the entrance, a warm wooden door, and windows glowing with warm light from inside. Plain white background, single building only, generous margins around it, viewed from slightly above at a front three-quarter angle. No text, no letters, no logos, no people, no real-world characters or brands.
```

### B-案2 ジョイスティック

```
A cute 3D-rendered game asset for a children's educational game. Soft glossy lighting, rounded shapes, warm high-saturation colors, bright and friendly low-poly cartoon style. A small game workshop building: rounded warm red-brick walls, a teal green roof, a large decorative arcade joystick with a red ball top mounted on the roof, a row of three small round colored buttons above the entrance, a warm wooden door, and windows glowing with warm light from inside. Plain white background, single building only, generous margins around it, viewed from slightly above at a front three-quarter angle. No text, no letters, no logos, no people, no real-world characters or brands.
```

### B-案3 歯車とブロック

```
A cute 3D-rendered game asset for a children's educational game. Soft glossy lighting, rounded shapes, warm high-saturation colors, bright and friendly low-poly cartoon style. A small game workshop building: rounded warm red-brick walls, a teal green roof, three large colorful rounded puzzle-piece blocks stacked as an ornament on the roof, a big golden gear turning on the side wall, a warm wooden door, and windows glowing with warm light from inside. Plain white background, single building only, generous margins around it, viewed from slightly above at a front three-quarter angle. No text, no letters, no logos, no people, no real-world characters or brands.
```

**確認点**: 看板・壁面に文字が入っていないこと。既存の建物（スタジオ・電球の館・紫の塔・赤屋根の家）と並べて違和感のない画風・縮尺感であること。**スタジオと隣り合っても別の建物だと一目で分かること**。

---

## C. こうぼう内装（カセットだな画面の背景・1600×900 WebP・任意）

スタジオの `studio-interior.webp` と揃える場合のみ。

```
A cute 3D-rendered interior background for a children's educational game, 16:9 landscape. Soft glossy lighting, rounded shapes, warm high-saturation colors, bright and friendly cartoon style. The inside of a small cozy game workshop room: on the left, a wooden workbench with small colorful rounded blocks and tools laid out; on the right, a tall shelf holding stacked game cartridges and a few glowing screens; at the back, a large window with warm daylight; the floor is warm wood planks. Keep the center and lower half of the image open and empty with no furniture (space reserved for UI overlays). No people, no animals, no text, no letters, no logos.
```

**確認点**: 中央下の余白が画面の1/2程度確保されていること。既存のスタジオ内装・ショップ店内・おうち部屋と同じ画風に見えること。

---

## D. BGM（Suno・Custom mode / Instrumental オン）

既存11本と同じ加工: **-19.0 LUFS 正規化 → AAC .m4a 96kbps**。

### D-1. こうぼう

**Style of Music:**
```
playful chiptune workshop theme, bright 8-bit arpeggios over warm acoustic guitar, light hand percussion, gentle build, loopable, no vocals, cheerful and focused, for a children's game-making studio
```
**Title:** `game workshop`

狙い: 「作る場所」の音。スタジオ（`studio.m4a`）より**少し軽快で機械的**な色を混ぜて差をつける。長く流していて疲れず、考えている邪魔をしないこと。

### D-2. バトルアリーナ（以前からの保留分）

**Style of Music:**
```
driving battle theme, energetic chiptune with orchestral hits, tense but never scary, steady mid tempo, loopable, no vocals, for a children's monster battle
```
**Title:** `battle arena`

※「かんせい！」ジングルは `jingle_kansei.m4a` として**すでに存在**。以前の保留リストの記載は古い情報だった。

---

## 進め方

1. **A の #1〜#3 を3枚だけ**生成 → Chat が既存18枚と並べて検品
2. 画風が揃ったら A の残り8枚
3. **B を3案**生成 → 見比べて1つ決める
4. C（任意）・D
5. 集まったら Chat が透過処理・256px化・検品 → Code が戻ったら配置

A・B・C・D は互いに独立。やりやすいものから着手して構わない。
