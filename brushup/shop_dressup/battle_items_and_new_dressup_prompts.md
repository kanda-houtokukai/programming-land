# 画像生成プロンプト: バトルアイテム4種＋着せ替え新設2種(たんけんメガネ・バンダナ)

作成: 2026-07-07 ／ 対象: ①バトル消耗アイテムのイラスト化 ②着せ替えface/neckスロットの新設
工程: ChatGPT で生成 → Chat が透過・仮合成確認 → 納品

---

## 0. 共通スタイル(全アイテム共通)

- Pixar調3Dレンダー・柔らかい光源・彩度高め・子ども向け教育ゲームのアイテムアイコン。
- 白背景・単体・正方形構図（透過加工前提）。文字・ロゴ・実在キャラクター不使用。
- 影は背景に落とさない（アイテム自体の質感の陰影のみ）。
- 世界観（ワールドマップ・探検家の主人公・着せ替えアイテムの帽子/バッジ）と
  同じ画風に揃える。

---

## A. バトル消耗アイテム4種（そのまま単体アイコン）

### A1. かいふくドリンク（ハート回復）
```
A cute 3D-rendered potion bottle for a children's game item icon, Pixar-style,
soft lighting, high saturation. A small round glass bottle with a cork stopper,
filled with a warm pink/red glowing liquid, a tiny heart-shaped bubble or heart
symbol glowing inside the liquid. Warm, friendly, healing feeling (not medical/
scary). Plain white background, no shadow, no text, no characters.
Square composition, centered, slight 3/4 angle.
```

### A2. ヒントメガネ（選択肢を1つ消す）
```
A cute 3D-rendered pair of glasses for a children's game item icon, Pixar-style,
soft lighting, high saturation. Round friendly glasses frames in a warm yellow/
gold color, with a tiny sparkle or light-bulb-shaped glint on one lens (subtle,
suggesting "a clever idea"), toy-like and chunky proportions. Plain white
background, no shadow, no text. Square composition, centered, front-facing.
```

### A3. パワーバンド（次の正解が2倍ダメージ）
```
A cute 3D-rendered wristband/bracelet for a children's game item icon, Pixar-
style, soft lighting, high saturation. A chunky sporty wristband in bright
orange/red with a small lightning-bolt emblem on it, glossy toy-like material,
energetic and powerful feeling but still friendly/cute. Plain white background,
no shadow, no text. Square composition, centered, slight 3/4 angle.
```

### A4. まもりのたて（次のミスを無効化）
```
A cute 3D-rendered small shield for a children's game item icon, Pixar-style,
soft lighting, high saturation. A rounded heraldic shield shape in friendly
blue with a lighter blue star or emblem in the center, gold trim around the
edge, glossy toy-like material, protective and reassuring feeling (not
militaristic/scary). Plain white background, no shadow, no text. Square
composition, centered, slight 3/4 angle.
```

---

## B. 着せ替え新設: face（たんけんメガネ）・neck（たんけんバンダナ）

これらは帽子・バッジと同じく「商品写真アングルのままで使える」（体に隠れる
部分がなく、装着状態限定の絵は不要）。単体アイコンとして生成する。

### B1. たんけんメガネ（face・観察力）
```
A cute 3D-rendered pair of explorer/aviator-style glasses for a children's
game item icon, Pixar-style, soft lighting, high saturation. Round or slightly
teardrop-shaped lenses with a warm brown/tortoiseshell or bronze frame,
matching an adventurer/explorer aesthetic (khaki and warm earthy tones),
chunky toy-like proportions, friendly (not tough/cool — still cute for a
child character). Plain white background, no shadow, no text. Square
composition, centered, front-facing view (symmetrical, as if seen on a face).
```

### B2. たんけんバンダナ（neck・冒険心）
```
A cute 3D-rendered bandana/neckerchief tied around a neck, for a children's
game item icon, Pixar-style, soft lighting, high saturation. Shown as it
would appear already tied — a triangular folded cloth shape with a small
knot, viewed from the front (front-facing, symmetrical, not laid flat as an
untied square). Warm orange or khaki-green color with a simple subtle pattern
(small dots or a compass motif), matching an adventurer/explorer aesthetic.
Plain white background, no shadow, no text. Square composition, centered.
```

---

## 1. 生成時の補足（日本語）

- バトルアイテム4種: 「ハート回復・選択肢を消すヒント・攻撃力アップ・ミス無効化、
  という4つの効果をイメージできる、子ども向けゲームのアイテムアイコンです」
- たんけんメガネ・バンダナ: 「探検家の服（カーキ・オリーブ色のベスト）を着た
  子どものキャラクターに、メガネ/バンダナとして装着させるアイテムです。
  探検家らしい色味に揃えてください」
- 各3〜4案出してもらい、白背景・単体・画風の統一感で選ぶ。

---

## 2. 納品後の流れ（Chat側作業）

1. 透過処理（確立済みの外周フラッドフィル＋ピンポイント方式）。
2. B（メガネ・バンダナ）は探検家版ベース人物（男女）に仮合成し、
   顔の位置（メガネ）・首元（バンダナ）に自然に乗るか確認、アンカー座標を実測。
3. A（バトルアイテム4種）はそのまま単体アイコンとして書き出し
   （既存の絵文字プレースホルダー🧃👓💪🛡️と差し替え）。
4. 着せ替え基盤設計書にB2点を追加（face/neckスロットが埋まる）。
