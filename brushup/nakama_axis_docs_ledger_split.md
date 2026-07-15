# なかまわけ拡張＋ドキュメント追随＋台帳分割 — 実装指示（Fable 5・1パス）

作成: 2026-07-15 ／ 起点: v2.3-b4s ／ 設計確定済み（Chat）
対象: `tools/quizgen.mjs`（主）／`tools/quiz-data.mjs`（軸の出題用ラベルのみ）／`tools/quiz-criteria.mjs`（新形式の検証条件）／`src/data/quizzes.gen.js`（再生成物）／`feature-spec.md`／`progland-handoff.md`（＋新規アーカイブ）

★内部チェックポイントは2つだけ: ①`--count` の件数報告→続行、②最終の実機確認（神田さん）。それ以外は止まらず1パスで通してよい。
★工程: deploy＝実機確認のため。完了報告は「実機確認をお願いします」で戻す。
★境界: 出題ロジック（セット内5問シャッフル・重複回避・選択肢セット衝突回避）・他4カテゴリ・バトル/演出は不変。絵文字アイコン不採用の方針は不変（※クイズの選択肢の絵文字は既存仕様なのでそのまま）。

## ① なかまわけ拡張：「〇〇の なかま」＝軸名称形式の追加

### ねらい（教育設計）
既存の「なかまはずれは どれ？」は 差を見つける操作。新形式は 与えられた基準を当てはめる操作＝属性フィルタリング。同じ素材で認知の操作を変え、計算論的思考の別の面を鍛える。

### 現状（調査済み・前提）
- `tools/quizgen.mjs` L182〜: なかまわけは3難易度とも仲間外れ探しの1形式（やさ=カテゴリ軸 concrete／ふつう=はたらき軸 functional／むず=抽象軸 abstract）。
- `tools/quiz-data.mjs`: `NAKAMA_ITEMS`（`{e,n,cat,props}`）・`CAT_LABEL`（14カテゴリ）・`PROP_AXES`（functional: flies/water/cut/draw/sound、abstract: living/food/natural）。
- `tools/quiz-criteria.mjs`（261行）が全タグ軸を照合して曖昧な組を弾く。
- `tools/quizgen.mjs` L19-20 の COUNTS: `{ kimari:26, robot:20, yomitori:18, junban:24, nakama:24 }` ＝1難易度112問・総数336問。

### やること
1. 新しい軸は追加しない（色・形は今回見送り＝Chat判断）。既存の CAT_LABEL / PROP_AXES をそのまま使う。
2. 新形式の生成をなかまわけに追加（既存3形式は残す）:
   - 出題文: 「〇〇の なかまは どれ？」
   - 難易度ごとの軸: やさしい=カテゴリ軸（CAT_LABEL）／ふつう=はたらき軸（PROP_AXES functional）／むずかしい=抽象軸（PROP_AXES abstract）
   - 正解＝その軸に当てはまる選択肢がちょうど1つ。残りは当てはまらないもの。
   - 選択肢数は各難易度の既存形式に合わせる（やさ/ふつう＝3択・むず＝4択）。
   - 出題用の短いラベル: `PROP_AXES` に `qLabel` を追加してよい（例 natural: qLabel:"しぜんに ある"）。`label` は why 文用で不変。`qLabel` 未指定の軸は `label` を使う。
   - why 文: 既存の作法に合わせて自動生成（例:「🐦 ことりは「そらを とぶ」なかまだね。ほかは ちがうよ」）。
3. 問題数: COUNTS の `nakama: 24 → 32`（＝1難易度 112→120・総数 336→360）。既存の仲間外れ24問は減らさず、新形式8問を足す（初期値）。同じカテゴリの出題プールに混在させる。
4. 機械検証（`tools/quiz-criteria.mjs`）: 既存形式の全軸照合はそのまま。新形式には「名指しした軸に当てはまる選択肢がちょうど1つ」を必須条件として追加。既存の難易度タグの機械検証も通す。
5. 生成: `node tools/quizgen.mjs --count` → ★チェックポイント①: 件数を報告してから続行 → `--write` で再生成。
6. `npm run verify` 全PASS＋roundtrip。

## ② ドキュメント追随（文書のみ）
`feature-spec.md` を実装に合わせて2点更新: §4 総数336→360＋新形式の旨1〜2行／§7 卵欄を b4s 実装（たまごモーダル・看板「たまご」・状態文はゲージ直下）に。

## ③ 台帳分割（progland-handoff.md）
- 現行台帳（スリム化・目安150行前後）: 現在地サマリ／未完了タスク／次の一手／ファイルの地図／決定事項／生きている注意事項＋版の記録は直近15版程度（おおよそ b4e〜b4s）＋今も効く教訓の集約＋冒頭にアーカイブへのリンク1行。
- 新規 `progland-handoff-archive.md`: それ以前の版ごとの詳細ログ・過去フェーズ固有の古い教訓（P2〜A6 等）。冒頭に警告バナー必須:
  「⚠ これは過去の経緯の記録です。現在の計画・仕様ではありません。現状は progland-handoff.md・roadmap.md・feature-spec.md が正。」
- 今回の作業をスリム化後の台帳に記録。

## 公開・検証
- version.js b4s→b4t・`npm run deploy`（コード/データ変更ぶん）。
- 文書のみのコミットは deploy を通らない → `git push origin main` まで必須。
- 裏取りは SHA固定 raw。コミットSHAを報告（Chat が裏取り）。
- 本指示書も brushup/ に残す。
- 手動確認（プレビュー）: なかまわけ3難易度で新形式が混ざる／答えが1つに定まる／whyが自然／既存の仲間外れも従来どおり／他4カテゴリ不変。
- ★チェックポイント②＝完了報告は「実機確認をお願いします」で（混在比率8/32は初期値＝実機で調整可）。

---

## 実装記録（Code・2026-07-15・v2.3-b4t）

- `tools/quiz-data.mjs`: PROP_AXES に qLabel 3つ追加（water=「みずの なかや うえに いる」・draw=「かいたり ぬったり する」・natural=「しぜんに ある」）。qLabel は「その軸を持つ全アイテムに対して真」であること（どれが正解に選ばれてもよいように）とコメント明記。
- `tools/quizgen.mjs`: N.nakama 24→32・`NAKAMA_ODD=24`（SAMPLE時2）。`genNakama(diff, idx, made)` が made>=24 で新設 `genNakamaAxis` にディスパッチ（実行ループが made を第3引数で渡す・他カテゴリは無視）。
  - genNakamaAxis: やさ=カテゴリ軸3択（nature は「しぜんの ものの なかま」と の が重なるため出題名から除外・仲間外れ形式では従来どおり）／ふつう=はたらき軸3択・なるべく同カテゴリ内で切る（カテゴリで解けなくする＝既存形式と同じ思想・sound のように同カテゴリ内で切れない軸はカテゴリまたぎで代替）／むず=抽象軸4択・誤答は2カテゴリ以上に散らす。meta.kind="nakama-axis"。
  - ★バグ教訓: `filter(i => i.cat === pick(cats))` と filter 内で pick を呼ぶと毎アイテム再抽選され同カテゴリ制約が壊れる（初回生成で発覚）→ カテゴリを先に1回抽選してから filter に修正。ランダム選択は必ずループ/コールバックの外で。
- `tools/quiz-criteria.mjs`: checkQuestion に kind="nakama-axis" を追加＝「名指しした軸（cat/prop）に当てはまる選択肢がちょうど1つ・それが正解」を必須条件（複数正解の事故を機械で弾く）。expectedDifficulty は nakama と共通（concrete/functional/abstract→easy/normal/hard）。
- 生成: 360問（各難易度120・nakama 32=仲間外れ24＋軸名称8）。verify 全PASS・roundtrip 全PASS。
- プレビュー実測: なかまわけ3難易度とも新形式が混在して出題・正答判定・why 表示✓。既存形式・きまり・ロボット（再生成対象）従来どおり✓。コンソールエラーなし。
