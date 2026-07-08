# 着せ替えアイテム 第1弾（8個）選定と画像生成プロンプト

作成: 2026-07-07 ／ 対象: 着せ替え基盤設計書の実例・最初のアイテムセット
工程: ChatGPT で生成 → Chat が透過・アンカー配置 → まとめて納品

---

## 0. 選定リスト（学習内容との対応・確定案）

神田さんの元案（学習内容とアイテムの対応）をそのまま採用し、8個を選定。
「手に持つ」系（虫眼鏡）は、固定ポーズと両立するよう**バッジ(ピン留め)化**した。

| # | アイテム名 | スロット | 学習内容 | 入手方法(案) |
|---|---|---|---|---|
| 1 | コンパスぼうし | head | じゅんばん(順次) | ショップ購入 |
| 2 | はぐるまバッジ | chest | くりかえし(反復) | ショップ購入 |
| 3 | むしめがねバッジ | chest | じょうけん(条件分岐) | ショップ購入 |
| 4 | どうぐベルト | waist | デバッグ | ショップ購入 |
| 5 | キーボードリュック | back | タイピング | ショップ購入 |
| 6 | まほうのほんリュック | back | クイズ | ショップ購入 |
| 7 | はかせぼうし | head | 全島クリア(パズル制覇) | 実績解放 |
| 8 | おうかん | head | 100問クリア(クイズ) | 実績解放 |

head=3種／chest=2種／waist=1種／back=2種。face・neckは今回空き
（将来「なかよしリボン」「めがね」等を実績アイテムとして追加できる余地を残す）。

---

## 1. 共通の生成ルール（全アイテム共通）

- 画風: Pixar調3Dレンダー、柔らかい光源、彩度高め、子ども向け教育ゲームのアイテムアイコン。
- 背景: 白背景・単体・正方形構図（透過加工前提）。
- **既存の建物アイコン（ワールドマップ）や、そだったちからの植物と同じ質感**に揃える。
- 文字・ロゴ・実在キャラクターは入れない。
- 影は背景に落とさない（アイテム自体の陰影のみ）。

---

## 2. 個別プロンプト

### 1. コンパスぼうし（head・じゅんばん）
```
A cute 3D-rendered explorer's hat for a children's game item icon, Pixar-style,
soft lighting, high saturation. A small friendly safari/explorer hat (khaki or
warm brown) with a tiny compass badge/emblem on the front of the hat band.
Simple, chunky, toy-like proportions. Plain white background, no shadow, no
text, no characters. Square composition, centered, 3/4 slightly-front angle
suitable for a game icon.
```

### 2. はぐるまバッジ（chest・くりかえし）
```
A cute 3D-rendered pin badge shaped like a friendly gear/cog, for a children's
game item icon, Pixar-style, soft lighting, high saturation, glossy enamel-pin
look. Warm blue or teal gear shape with a small round center, slightly bevelled
edges, cheerful and toy-like (not mechanical/scary). Plain white background,
no shadow, no text. Square composition, centered, slight 3/4 angle.
```

### 3. むしめがねバッジ（chest・じょうけん）
```
A cute 3D-rendered pin badge shaped like a friendly magnifying glass, for a
children's game item icon, Pixar-style, soft lighting, high saturation, glossy
enamel-pin look. Warm wood-colored handle, round lens with a light blue glass
tint, cheerful and toy-like. Plain white background, no shadow, no text.
Square composition, centered, slight 3/4 angle.
```

### 4. どうぐベルト（waist・デバッグ）
```
A cute 3D-rendered kid-sized tool belt for a children's game item icon,
Pixar-style, soft lighting, high saturation. A simple brown/tan belt with 2-3
small chunky cartoon tool pouches (a tiny wrench, a tiny screwdriver poking
out), rounded and toy-like, not realistic/sharp. Shown laid out in a gentle
curve as if wrapping around a waist. Plain white background, no shadow, no
text. Square composition, centered.
```

### 5. キーボードリュック（back・タイピング）
```
A cute 3D-rendered small kid's backpack shaped like a friendly computer
keyboard, for a children's game item icon, Pixar-style, soft lighting, high
saturation. Backpack body in soft gray or navy with a few oversized cute
keyboard keys decorating the front flap, rounded straps, plush toy-like
proportions. Plain white background, no shadow, no text. Square composition,
centered, 3/4 front angle (as if worn on the back, front flap visible).
```

### 6. まほうのほんリュック（back・クイズ）
```
A cute 3D-rendered small kid's backpack shaped like a magical storybook, for
a children's game item icon, Pixar-style, soft lighting, high saturation.
Backpack shaped like a thick book with a warm purple cover, a glowing soft
star or sparkle emblem on the front, gold-ish trim, rounded straps, plush
toy-like proportions. Plain white background, no shadow, no text. Square
composition, centered, 3/4 front angle.
```

### 7. はかせぼうし（head・全島クリア）
```
A cute 3D-rendered graduation/professor mortarboard hat for a children's game
item icon, Pixar-style, soft lighting, high saturation. Small friendly navy
blue graduation cap with a gold tassel, rounded and toy-like (not too formal/
scary), slightly oversized tassel for a playful look. Plain white background,
no shadow, no text. Square composition, centered, 3/4 slightly-front angle.
```

### 8. おうかん（head・100問クリア）
```
A cute 3D-rendered small golden crown for a children's game item icon,
Pixar-style, soft lighting, high saturation, glossy toy-like gold material
with a few round colorful gem accents (ruby red, sapphire blue), rounded
friendly points (not sharp/dangerous looking), playful and warm. Plain white
background, no shadow, no text. Square composition, centered, slight 3/4
front angle.
```

---

## 3. 生成時の補足指示（日本語・ChatGPTに添えてよい）

「子ども向け教育ゲームの着せ替えアイテムのアイコンです。単体・白背景・正方形で、
今後同じシリーズとして何十個も追加するので、画風（Pixar調3Dレンダー・彩度高め・
やわらかい光）をこの1枚で確立するつもりで作ってください」

3〜4案ずつ出してもらい、以下で選ぶ:
1. 白背景・単体で綺麗に収まっている
2. Pixar調の質感（ワールドマップ・そだったちからの植物と並べても違和感がない）
3. 子どもが見て嬌しくなく「かわいい・かっこいい」と感じる形

---

## 4. 納品後の流れ（Chat側作業）

各アイテムを受け取り次第、Chatが以下を実施:
1. 透過PNG化・トリミング。
2. ベース人物（男女共通アンカー座標）に仮配置してプレビューを作成、
   大きさ・位置の妥当性を確認（設計書§3の目安座標から出発）。
3. `DRESSUP_ITEMS` データ用のエントリ（id・skillTie・flavorText案）を用意。
4. 8個まとまった時点で、Codeへの実装指示書を作成。

生成できたら、画像をアップロードしてください。1個ずつでも、まとめてでも構いません。
