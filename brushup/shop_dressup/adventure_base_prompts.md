# 画像生成プロンプト: 探検家風ベース人物（男の子・女の子）

作成: 2026-07-07 ／ 復元: 2026-07-08（Chatが過去会話から復元・原本ファイル欠落のため）
対象: 着せ替え基盤の刷新（服を探検家風に）／ 背負わない基本形2体
段取り: 1-A（まず背負わない基本人物2体を確定 → 後でリュック版4体）・2-A（探検家風）

※復元メモ①: 本プロンプトの出力（採用版）は、当時の文中では
　「`player_boy_base.png` / `player_girl_base.png` を置き換える」想定だったが、実際には
　別名 `player_boy_adventure.png` / `player_girl_adventure.png` として保存された
　（無地シャツの旧base＝`character_base_prompts.md` は経緯として残存）。
　§0・§4・§5 の「player_*_base.png」は当時の記述のまま残している。
※復元メモ②: 原本の §6 以降は検索復元で取得できず（内容は生成物アップロード案内と推測）。
　ダウンロード済み原本が見つかれば照合を。

---

## 0. 最重要ルール（絶対に守る）

現行ベース（`player_boy_base.png`）と体の骨格・ポーズ・各部位の位置を完全一致させる。
服だけ探検家風に変える。 体の位置がズレると、帽子/バッジ/ベルトのレイヤーが
全部ズレるため。以下は現行から一切変更しない:

- 頭身・全身のプロポーション（現行と同じ）
- 正面直立・完全な正面向き・左右対称
- 腕を体からやや離して自然に下げる・脚を揃える
- カメラ距離/画角（頭頂〜足元が同じ位置に収まる）
- 光源（正面やや上・柔らかい）
- キャンバス比率（縦長・現行と同じ）

変えるのは服のデザインのみ。 髪・顔・体型・ポーズは現行と同じ子であるように。

## 1. 探検家風の服の方向性（確定）

- 全体トーン: 島を冒険する子ども探検家。カーキ／アースカラー中心。
- 上: 半袖の探検シャツ（襟つき・胸ポケット）またはシャツ＋軽いベスト（ポケット多め）。
- 下: カーキのハーフパンツ（現行と近い丈）。
- 足: しっかりした小さめのブーツ（or 現行のスニーカーに近い探検靴）。
- 避けるもの: マント・大きな肩掛け・首の大きな装飾（後でリュックや帽子・
  ベルトを重ねるため、肩と腰周りはすっきりさせる）。
- 帽子はかぶせない（帽子は着せ替えアイテムでレイヤー装備するため、素の頭のまま）。

## 2. プロンプト: 男の子（探検家風・背負わない基本形）

```
A cute 3D-rendered Pixar-style boy character for a children's educational game,
full body, standing perfectly straight, facing directly forward (front view,
symmetrical), arms relaxed and slightly away from the body, legs together,
neutral character-select pose.

SAME boy as a reference base character: warm brown tousled hair, big round
brown eyes, soft rosy cheeks, gentle smile, same child-like body proportions.
Keep the exact same pose, body shape, head size, camera distance and soft
front lighting as a standard character-select base — ONLY the clothing changes.

Clothing: a young explorer / adventurer outfit. A short-sleeve khaki explorer
shirt with a collar and a chest pocket (optionally a light utility vest with
small pockets over it), khaki shorts, and small sturdy adventure boots. Earthy
tones (khaki, tan, warm brown, a touch of forest green). Simple and clean, NO
cape, NO large shoulder pieces, NO hat (bare head), nothing bulky around the
neck or shoulders.

Full body head-to-toe, centered, plain white or transparent background, no
ground shadow, no props, no text. Vertical portrait orientation, character
reference sheet style, same framing as a standard full-body character base.
```

## 3. プロンプト: 女の子（探検家風・背負わない基本形）

```
A cute 3D-rendered Pixar-style girl character for a children's educational game,
full body, standing perfectly straight, facing directly forward (front view,
symmetrical), arms relaxed and slightly away from the body, legs together,
neutral character-select pose.

SAME girl as a reference base character: warm brown hair in a simple ponytail,
big round brown eyes, soft rosy cheeks, gentle smile, same child-like body
proportions. Keep the exact same pose, body shape, head size, camera distance
and soft front lighting as a standard character-select base — ONLY the clothing
changes.

Clothing: a young explorer / adventurer outfit matching the boy's style. A
short-sleeve khaki explorer shirt with a collar and a chest pocket (optionally
a light utility vest with small pockets), khaki shorts or a practical khaki
skirt with shorts underneath, and small sturdy adventure boots. Earthy tones
(khaki, tan, warm brown, a touch of forest green, maybe a small warm-colored
accent). Simple and clean, NO cape, NO large shoulder pieces, NO hat (bare
head), nothing bulky around the neck or shoulders.

Full body head-to-toe, centered, plain white or transparent background, no
ground shadow, no props, no text. Vertical portrait orientation, character
reference sheet style, same framing as a standard full-body character base.
```

## 4. 生成時の補足（日本語・重要）

- 現行のベース画像（`player_boy_base.png` / `player_girl_base.png`）をChatGPTに
  一緒にアップロードし、「この子と同じポーズ・同じ体型・同じ構図のまま、服だけを
  探検家風に変えてください。帽子はかぶせず、マントや大きな肩の装飾は付けないで
  ください」と指示すると一致度が上がる。
- 男女で服のトーンを揃える（並べたとき対に見えるように）。
- 3〜4案ずつ出し、以下で選ぶ:
  1. 現行と同じポーズ・体型・構図（重ねるアイテムがズレない）
  2. 肩と腰周りがすっきり（リュック・ベルトを後で重ねられる）
  3. 探検家らしさ＋子どもの可愛さ

## 5. 加工（Chat が実施）

- 透過処理（脇の下だけ狙う方式・目や靴を保護する確立済みの手法）。
- 現行ベースと頭頂/足元/中心をピクセル単位で一致させる（実測して補正）。
  これにより既存のアンカー座標（肩y≈580・腰y≈905等）がそのまま使える。
- ファイル名: `player_boy_base.png` / `player_girl_base.png`（現行を置き換え）。
  （※実際の採用版は別名 `player_boy_adventure.png` / `player_girl_adventure.png`。
  　冒頭の復元メモ①参照。）
