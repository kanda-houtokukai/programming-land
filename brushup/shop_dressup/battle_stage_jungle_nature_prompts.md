# 画像生成プロンプト: バトル舞台の背景2種（ジャングル・自然テーマ）

作成: 2026-07-07 ／ 対象: ショップの「バトルのぶたい」（コイン購入・きせかえ枠）
背景: 元のP6設計では「にじのぶたい」「うちゅうのぶたい」だったが、これはAIが
機械的に考えた案で、探検家の世界観と関連がなかった。今回の主人公＝島を冒険する
探検家の世界観に合わせ、ジャングル・自然をテーマにした2種に変更する。

---

## 0. 構図の要件（既存ルール・battle_effects_guide.md より厳守）

- **相棒＝画面の左下寄り、敵＝右上寄り**で斜めに対峙する構図。
- **背景の中央〜下部は視覚的に空けておく**（キャラクターを配置するため、
  そこに細かい物や強いコントラストを置かない）。
- 難易度別の既存3枚（草原=やさしい／夕日の闘技場=ふつう／夜の王座=むずかしい）
  と同じ画風（明るい3Dルック・柔らかい光）に揃える。
- 横長 1600×900 程度（既存のバトル背景と同じ比率）。

---

## 1. ジャングルのぶたい

```
A bright, cheerful 3D-rendered jungle clearing for a children's game battle
background, mobile game art style, soft lighting, high saturation, cute and
adventurous. A circular clearing of soft green grass surrounded by lush jungle
trees, vines, and large tropical leaves framing the left and right edges of
the scene. Dappled warm sunlight filtering through the canopy. Maybe a few
ancient stone ruins or ropes/vines hanging at the edges for adventurous flavor
(small, not blocking the center).

IMPORTANT: the center and lower-middle area of the image must stay visually
calm and open (no large objects, moderate detail only) — two characters will
be placed there during battle. Keep the busiest jungle details toward the
left/right edges and background, not the center-front.

A few colorful tropical birds or butterflies in the background for charm.
No people, no text, no UI elements. Landscape orientation 16:9, game
background art.
```

## 2. だいちのぶたい（大地・崖のぶたい）

```
A bright, cheerful 3D-rendered canyon/mesa landscape for a children's game
battle background, mobile game art style, soft lighting, high saturation,
cute and adventurous. Warm reddish-orange rock formations and mesas in the
distance, a wide open sandy/rocky clearing in the foreground, a few desert
plants (small cacti, dry shrubs) framing the left and right edges, a clear
warm-toned sky (late afternoon golden light) above.

IMPORTANT: the center and lower-middle area of the image must stay visually
calm and open (no large objects, moderate detail only) — two characters will
be placed there during battle. Keep the busiest rock/canyon details toward
the left/right edges and background, not the center-front.

A soaring bird silhouette in the sky for adventurous flavor. No people, no
text, no UI elements. Landscape orientation 16:9, game background art.
```

---

## 2. 名称・入手方法（案）

| 内部名 | ひらがな表示名 | 価格(案) |
|---|---|---|
| jungle | 🌴 ジャングルの ぶたい | 50枚 |
| canyon | 🏜️ だいちの ぶたい | 50枚 |

既存の草原/夕日/夜の3枚（難易度別・自動切り替え）とは別に、この2枚は
ショップで購入・きせかえで選んで固定できる枠として追加する。

---

## 3. 生成時の補足（日本語）

「子ども向け教育ゲームのバトル背景です。中央から下にかけて、相棒モンスターと
敵モンスターの絵を重ねて表示するので、その部分は騒がしくなりすぎないように
してください。ジャングル/渓谷らしさは奥や左右の縁に寄せてください」

3〜4案ずつ出してもらい、以下の基準で選ぶ:
1. 中央〜下部が静か（キャラクターを重ねられる）
2. 既存のバトル背景（草原・夕日・夜）と画風が揃っている
3. 探検家の世界観（島・ジャングル・渓谷を冒険する）に合っている

## 4. 納品後の流れ

届いたら、Chatが1600px幅にリサイズ・WebP化（既存のバトル背景と同じ形式）。
実際に相棒・敵の透過PNGを乗せてみて、中央が騒がしくないか確認します。
