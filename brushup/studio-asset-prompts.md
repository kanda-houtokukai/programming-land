# アセット生成プロンプト一式: つくるスタジオ

作成: 2026-07-17(改訂: 英語プロンプト・各プロンプト自己完結型) ／ 用途: ChatGPTでの画像生成
→ Chatで加工 → 段階3でCodeが差し替え

加工の標準(確立済みパイプライン):
- アイコン/建物/小物: 白背景で生成 → 透過処理(flood-fill・閾値 mn>225 かつ 彩度<22 で
  色要素保護・影は scipy.ndimage.binary_dilation で半透明化) → 256px PNG。
- 背景: 1600×900 → WebP quality=75(82は目標サイズ超過の実績あり)。
- 不自然な箇所はクロップで直さず**再生成**。文字は画像に描かせない(アプリ側フォントで重畳)。
- 以下の各プロンプトは共通スタイル込みの自己完結型。**そのまま1個ずつコピペして生成**する。

---

## 1. スタジオ建物(ワールドマップ用・透過256px PNG)

```
A cute 3D-rendered game asset for a children's educational game. Soft glossy lighting, rounded shapes, warm high-saturation colors, bright and friendly low-poly cartoon style. A small movie studio building: rounded cream-colored walls, a reddish-brown roof, a large decorative black-and-white striped clapperboard sign on the front (completely blank, no letters), two small spotlights and a star ornament on the roof, and a warm wooden door. Plain white background, single building only, generous margins around it, viewed from slightly above at a front three-quarter angle. No text, no letters, no logos, no people, no real-world characters or brands.
```

- 確認点: 看板・壁面に文字が入っていないこと/既存の建物(電球の館・紫の塔・赤屋根の家)と
  並べて違和感のない画風・縮尺感(高さ比で家の1.1倍程度)。

## 2. じゅんびちゅう看板(拡張枠用・透過256px PNG)

```
A cute 3D-rendered game asset for a children's educational game. Soft glossy lighting, rounded shapes, warm colors, bright and friendly low-poly cartoon style. A wooden standing signboard: two round log posts supporting one horizontal wooden plank with visible wood grain. The plank is completely blank with no letters or symbols. Small round decorative nail heads at the top corners, and two or three tiny tufts of grass at the base. Warm brown tones. Plain white background, single object only, generous margins, viewed from slightly above at a front three-quarter angle. No text, no letters, no logos.
```

- 「じゅんびちゅう」の文字はアプリ側でフォント重畳(将来、別の告知にも流用する)。

## 3. スタジオ内装(入口/フィルムだな画面の背景・1600×900 WebP)

```
A cute 3D-rendered interior background for a children's educational game, 16:9 landscape. Soft glossy lighting, rounded shapes, warm high-saturation colors, bright and friendly cartoon style. The inside of a small cozy movie studio room: on the left, a wooden shelf holding film reels and a small blank clapperboard; on the right, two warm-toned spotlights on stands; at the back, a small stage with red curtains; the floor is warm wood planks. Keep the center and lower half of the image open and empty with no furniture (space reserved for UI overlays). No people, no animals, no text, no letters, no logos.
```

- 確認点: 中央下の余白が画面の1/2程度確保されていること/既存のショップ店内・おうち部屋と
  同じ画風に見えること。

## 4. カチンコ(▶ボタン/演出用・透過256px PNG)

```
A cute 3D-rendered game asset for a children's educational game. Soft glossy lighting, rounded shapes, bright and friendly cartoon style. A single movie clapperboard, slightly open: the top bar has bold black-and-white diagonal stripes, the body is dark warm wood, and the front face is completely blank. Plain white background, single object only, generous margins, viewed from slightly above at a front three-quarter angle. No text, no letters, no numbers, no logos.
```

## 5. カードアイコン18種(透過PNG・生成後に各96px程度へ縮小)

生成方針: 1枚ずつ生成(グリッド一括はサイズ不揃いの手戻りが出やすい)。
矢印4種(#4〜7)は同一デザインの向き違いで統一感を出す(1つ生成→回転流用可。
光源が不自然なら向き別に再生成)。#13のおばけは敵キャラ(enemy_ghost)と混同しない
水色系にする。

各アイコン共通の書き出し(以下の全プロンプトに組み込み済み):
"A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable
single object with a clear bold silhouette, designed to sit on a small colored card. Soft
glossy lighting, rounded shapes, bright colors. Plain white background, single object only,
generous margins. No text, no letters, no logos."

### #1 はたが おされたら
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A small yellow triangular flag on a short rounded pole, gently waving in the wind. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #2 タップされたら
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A rounded cartoon mitten-like hand with the index finger gently tapping, with small tap ripple rings at the fingertip. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #3 ぶつかったら
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. Two round glossy balls in different colors gently bumping into each other, with a few tiny stars scattering from the point of contact. Playful, not violent. Plain white background, generous margins. No text, no letters, no logos.
```

### #4 みぎへ すすむ
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A single chunky 3D arrow pointing to the right, with rounded edges. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #5 ひだりへ すすむ
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A single chunky 3D arrow pointing to the left, with rounded edges. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #6 うえへ
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A single chunky 3D arrow pointing straight up, with rounded edges. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #7 したへ
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A single chunky 3D arrow pointing straight down, with rounded edges. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #8 まわる
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A single chunky circular rotation arrow forming a clockwise loop, with a rounded arrowhead. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #9 ジャンプ
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A small glossy ball bouncing along a dotted arc trajectory, with a tiny coil spring beneath the starting point. Plain white background, generous margins. No text, no letters, no logos.
```

### #10 もとのばしょへ
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A small round start-point marker: a rounded base disc on the ground with a tiny flag planted in its center. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #11 おおきく
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. Four chunky 3D arrows pointing outward toward the four corners, arranged around an empty center, meaning "grow bigger". Plain white background, generous margins. No text, no letters, no logos.
```

### #12 ちいさく
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. Four chunky 3D arrows pointing inward toward the center from the four corners, meaning "shrink smaller". Plain white background, generous margins. No text, no letters, no logos.
```

### #13 きえる
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A tiny friendly smiling ghost in light aqua blue, becoming semi-transparent and fading away on one side. Cute and not scary at all. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #14 でる
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A small golden star appearing with a bright sparkle flash and tiny light particles around it, meaning "appear". Plain white background, generous margins. No text, no letters, no logos.
```

### #15 おとを ならす
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A small golden toy trumpet with one single music note floating beside it. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #16 まつ
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A cute rounded hourglass with warm wooden frames and soft yellow sand flowing inside. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #17 くりかえし
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. Two chunky curved arrows chasing each other in a circle to form a loop, with rounded arrowheads. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

### #18 ずっと
```
A cute 3D-rendered icon for a children's educational game. A simple, easily recognizable single object with a clear bold silhouette, designed to sit on a small colored card. Soft glossy lighting, rounded shapes, bright colors. A glossy ribbon-like infinity symbol (a sideways figure eight) with soft rounded loops. Plain white background, single object only, generous margins. No text, no letters, no logos.
```

## 6. 効果音(Suno・段階3)

Customモード・Instrumental ON。必要素材: カチッ(スナップ)/ポフッ(削除)/
カチンコ(上演開始)/ポン・キラン・ドン(おとカード3種)/かんせい!ジングル(保存時)。
既存8BGM+4ジングル構成に追加する短尺SE群として発注文はChatが別途作成。

## 7. 差し替え対応表(段階3でCodeに渡す)

| アセット | 置き場所 | 使用箇所 |
|---|---|---|
| studio-building.png | src/assets/ | ワールドマップ 北(58,16) |
| sign-junbichu.png | src/assets/ | ワールドマップ 右中(70,36)+文字重畳 |
| studio-interior.webp | src/assets/ | スタジオ入口/フィルムだな背景 |
| clapper.png | src/assets/ | ▶ボタン/上演開始演出 |
| card_icon_*.png ×18 | src/assets/ | 各ブロックの左端(簡易白SVGと差し替え) |
