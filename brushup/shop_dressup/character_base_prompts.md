# 画像生成プロンプト: 着せ替えベース人物（男の子・女の子）

作成: 2026-07-07 ／ 対象: 第3波ショップ前の準備（着せ替えシステムの基盤・案の段階）
工程: ChatGPT で生成 → 生成画像を Chat（Claude）に渡す → Chat が加工して納品
前提: 男の子は完成済み（アップロード画像を基準/お手本とする）。
　　女の子は、その基準に**完全に一致させて**新規生成する。

---

## 0. なぜ「完全一致」が最重要か

このベース人物の上に、将来100個以上のアイテム（帽子・リボン・リュック等）を
透過PNGで重ねる（レイヤー合成方式）。**アイテムPNGは「頭の位置」「体の大きさ」
「光の当たり方」が男女で揃っていて初めて、同じ帽子を男女どちらにも使い回せる**。
ここがズレると、アイテムを男女別に2倍作る羽目になる（＝100個の基盤が崩れる）。
なので女の子は「新しいキャラを作る」のではなく「男の子と同じ型紙に、女の子の
見た目を流し込む」という発想でプロンプトを組む。

## 1. 確定した基準（アップロード画像から抽出・変更しない）

- **頭身**: 現状のまま（幼児的な頭身・低学年が見て「自分たちくらいの子」と
  感じるバランス。極端なデフォルメ2頭身にはしない＝今回は現状維持で確定）。
- **向き・ポーズ**: 完全な正面向き、直立、腕は体から少し離してだらんと下げる
  （＝将来リュックや手持ちアイテムを重ねても腕と干渉しにくい自然なポーズ）。
- **画角**: 全身（頭の先からつま先まで）が収まる、同じカメラ距離・同じ画角。
- **画風**: Pixar/ディズニー風の3Dレンダリング、丸みのある可愛いプロポーション、
  肌はつやのある質感、大きな瞳、やわらかい頬の赤み。
- **光源**: 正面やや上からのやわらかい光。影の向き・強さも男女で揃える。
- **服装**: 派手すぎない・柄なしの基本服（Tシャツ＋ショートパンツ相当）。
  これは「着せ替え前のシンプルな状態」であり、将来別の服アイテムに差し替え
  られる前提（＝服自体も後で「アイテム」として作り直す可能性がある。今回は
  まず基準となる素の姿を確定させる）。
- **背景**: 透明（チェッカー柄で確認・PNG）。
- **解像度/縦横比**: 縦長（アップロード画像相当・全身が収まる比率）。

## 2. ChatGPT に貼るプロンプト: 女の子（男の子との対）

```
A cute 3D-rendered Pixar-style character for a children's educational game,
full body, standing perfectly straight, facing directly forward (front view,
symmetrical), arms relaxed and slightly away from the body, legs together,
neutral standing pose (like a character select screen model).

A young girl, around 7-8 years old proportions, same chibi-ish friendly
proportions as a typical cute mobile-game mascot character (NOT extremely
chibi/2-head-tall, a natural child-like body ratio). Warm brown or black
hair in a simple ponytail or short bob (simple, not elaborate), big round
expressive eyes, soft rosy cheeks, gentle smile, warm skin tone.

Simple, plain clothing with no patterns: a short-sleeve T-shirt in a solid
soft color (different from the boy's blue — try soft pink, yellow, or
lavender) and simple shorts or a simple skirt, plain sneakers. No hat, no
accessories, no bag — completely plain "base" outfit so clothing items can
be added later.

Lighting: soft, warm, front-slightly-above key light, gentle shadows,
consistent with a cheerful storybook/mobile-game render. Same lighting
setup and render style as a matching boy character (soft 3D toy-like
render, smooth skin shading, glossy eyes).

Full body visible from head to feet, centered in frame, plain transparent
background (or plain white if transparent isn't possible), no ground
shadow, no props, no text, no watermark.

Vertical portrait orientation, character reference sheet style.
```

## 3. 男の子の仕様（参照用・既に完成しているので再生成不要）

再生成する必要はないが、女の子や将来のアイテム制作で「揃っているか」を
照合する基準として、アップロード画像の特徴を文章化しておく:

- 正面直立・腕は体からやや離して自然に下げる・脚を揃える。
- 茶色の柔らかい髪（前髪あり・サイドがふんわり）、大きな瞳（濃い茶）、
  頬にほんのり赤み。
- 水色の半袖Tシャツ＋カーキのハーフパンツ＋紺のスニーカー（無地・柄なし）。
- Pixar調の丸みのある質感、正面やや上からの柔らかい光。
- 透明背景・全身・縦長構図。

女の子の生成結果は、**この5項目（ポーズ／頭身／画風／光源／構図）が男の子と
一致しているか**で照合する。服の色・髪型が違うのは問題ない（むしろ区別のため
必要）。

## 4. 生成時の指示（日本語・ChatGPTへの補足として添えてよい）

- 「子ども向け教育ゲームのキャラクター選択画面に使う、着せ替えの土台となる
  ベースキャラクターです。すでに完成している男の子キャラ（別途共有）と、
  ポーズ・頭身・画風・光の当たり方を完全に揃えてください。服の色・髪型は
  女の子らしく変えて構いませんが、体のバランスと絵のタッチは同じにしてください」
- 可能であれば、男の子の画像をChatGPTに一緒にアップロードし、「このキャラと
  同じ仕様で、女の子版を作って」と指示すると一致度が上がる。
- 3〜4案出してもらい、以下の基準で選ぶ:
  1. 頭身・体のバランスが男の子と同じに見える
  2. 正面直立・同じ腕の角度
  3. 画風（Pixar調の質感）が男の子と揃っている
  4. 光の当たり方・影の向きが同じ

## 5. 加工（Chat が実施）

- 透過PNG化（生成時に透過が難しければ、白背景→透過処理をChat側で実施）。
- 男の子の画像とキャンバスサイズ・被写体の縦位置（頭のてっぺん・足元の
  ピクセル位置）を揃えるようリサイズ/位置調整（後のアイテム重ね合わせの
  ズレを防ぐため、ここは加工時に必ず照合する）。
- ファイル名: `player_boy_base.png` / `player_girl_base.png`（ASCII英数字）。

## 6. 次の段取り（着せ替え基盤・案の整理の一部）

- 男女のベースが「型紙として一致」した時点で、初回アイテム（例: 帽子1種）を
  両方に仮乗せしてズレがないか検証してから、本格的にアイテム制作に入るのが安全
  （最初の1個で方式を確認してから量産する）。
- スロット定義・zオーダー・アイテムのデータ構造は別途、着せ替え基盤の設計書と
  してまとめる（今回のプロンプト整備とは別タスク）。
