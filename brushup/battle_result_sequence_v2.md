# バトル後・結果シーケンス v2（演出リデザイン）— 実装記録（v2.3-b4n）

日付: 2026-07-13 ／ 起点: v2.3-b4m ／ 指示書: Chat「バトル後・結果シーケンス v2（演出リデザイン）」（絵コンテ承認済み）

## 実装サマリ（絵コンテどおり）

- **枠つきパネル廃止**: 各ステップは暗めの薄幕の上に「枠なしの文字と絵だけ」。大見出し=pl-display＋暖色金#FFD447＋
  ink4方向のtext-shadow（`seqTitleStyle`・`wordBreak:keep-all`でスペース位置折返し）。
- **勝利アニメ後 0.8s 何も出さない**（`SEQ.BREATH`）→ステップ①へ。
- **各ステップの登場が終わるまで「つぎへ▶」を出さない**（畳みかけ防止・`seqReady`ゲート＋minHeightでレイアウト固定）。
  「つぎへ」は小さめ・最終ステップだけ従来遷移（つぎの てき/フロアへ▶＋ホームへ）。
- 固有演出（同じ動きは2度使わない・すべて新keyframe `pl-seq*`）:
  ① かった！=下からふわっ（seqFloatUp 450ms）＋コイン＋WinXpBar
  ② レベルアップ！=薄幕+10%暗く・ドンと突き上げオーバーシュート（seqPunchUp 550ms）→Lv数字カチッ（seqTick・550ms遅延）・すがたは旧のまま
  ③ しんかした！=**ゆっくり暗転60%**（背景transition 1.2s=pl-seqDim相当）→白シルエット明滅（seqGlowPulse 1.2s×2）＋「…あれ？」→光がぱあっ（seqBurst 420ms・放射グラデ）→新すがたが下からせり上がり（seqRiseIn 600ms）→木漏れ日の光点3つ（seqDrift）→**+1.5sのタメ**（SEQ.HOLD_EVOLVE）後にボタン
  ④ たまご=「あれ？ なにか きたよ…」600ms→egg.pngがころんと落ちて2回バウンド（seqDropBounce 700ms）→大文字
  ⑤ なかま=たまごぷるぷる×2（seqWiggle 280ms×2）→光ぱっ（seqBurst流用）→ぽんっとジャンプ登場（seqPopJump 550ms）
- **定数は`SEQ`に集約**（Battle.jsx冒頭・BREATH/DIM_BASE .45/DIM_SOFT +.10/DIM_EVOLVE .60/HOLD_EVOLVE 1500/
  各READY/内部タイムライン）＝★実機調整はここ1箇所。
- theme.js: `pl-seqFloatUp/PunchUp/Tick/GlowPulse/Burst/RiseIn/Drift/DropBounce/Wiggle/PopJump` を新規追加
  （既存keyframe不変・reduced-motionブロックに登録＝reduceでは即時全表示・burst/driftはJSX側でも非表示ガード）。
  ※`pl-seqDim` はオーバーレイ背景の transition(1.2s) で実装（等価・キーフレーム不要のため）。

## 開発中に踏んだバグ（修正済み・教訓）

- ★新しい useEffect の依存配列に、**後方で宣言される `reducedMotion` を書いて TDZ クラッシュ**
  （BattleFightがマウント時に白画面・consoleにReact error boundary警告のみ）。エフェクトを reducedMotion 宣言の
  後ろへ移動して解消。コンポーネント内の宣言順に依存する参照は挿入位置に注意。

## 検証記録

- verify全PASS・roundtrip全PASS（ロジック/スキーマ不変）。
- プレビュー実プレイ（Lv11 mizu→勝利＝4ステップ）: ①金文字ふわっ＋バー ②突き上げ＋Lv.11→Lv.12カチッ（旧すがた）
  ③暗転→（内部タイムライン進行）→ウズリュウ登場＋しんかした！ ④ささやき→ころん→大文字→**最終ボタン**。
- ④のタイムラインを200msサンプリングで実測: ささやき即時→egg 600ms→大文字1400ms→ボタン1600ms
  ＝定数どおり・**登場完了までボタン非表示**を機械確認（reducedMotion=false環境）。
- 戦闘中演出（タイプライター/かいしん演出等）はプレイ中も従来どおり・敗北/タワーはコード共通・不変。コンソールエラーなし。
