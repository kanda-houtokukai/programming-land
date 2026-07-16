# そだちのもり 刷新 — 実装指示（Code）

作成: 2026-07-16 ／ 起点: v2.3-b4u ／ 設計・モック承認済み ／ 実装時の起点: v2.3-b5a
対象: `src/data/powers.js`（主）／`src/components/PowerPanel.jsx`（主）／`src/components/Powers.jsx`／`feature-spec.md`
アセット: 21枚を `src/assets/` へ（木20枚=512px透過PNG／bg_mori.webp=1600×900）。

狙い: 「5つの鉢が横に並ぶ一覧」→「5本の木が立つ もり」（クイズひろば化・アリーナ背景化と同じ「一覧→場所」の手）。

要点:
1. GROW_STAGES 5→4段階（たね0/め10/わかぎ40/おおきな き80・初期値）。称号title廃止・imgはちから別TREE_IMGへ。
2. POWERS の emoji フィールド削除（絵文字不採用・木がアイコンの役目）。
3. POWER_DID（できるように なったこと・段階ごとに増える）＋STAGE_LINE（%の代わりの段階の一言）新設。
4. もりの画面: bg_mori cover＋5本の木を%座標・★底基準アンカー（bottom）＝足元が地面に乗る（中心アンカーはb3zの罠）。
   木は height で制御（TREE_H=["14%","22%","36%","54%"]・TREE_POS 初期値）。看板は既存.bubble。
5. 詳細モーダル刷新: %バー・「そだち ぐあいN%」・称号🏅・絵文字を廃止 → 木の絵150px＋名前＋段階の一言＋次への一言＋
   できるようになったこと（たねは「あそぶと ここに ふえるよ」）＋grows＋導線（維持）＋とじる。
6. 「そだった！」演出（powers.prev差分・celebrate・growpop・stageUp→fanfare・初回は静か）は★維持（中の絵だけ木に）。
7. PowerPanel の他画面利用は grep 確認 → 壊れる場所があれば横並びを別コンポーネントで残す。

---

## 実装記録（Code・2026-07-16・v2.3-b5b）

- **§6の確認結果**: PowerPanel は `Powers.jsx`（専用画面）のみで使用＝他画面のミニ表示なし → 横並びの温存不要・全面もり化でOK。
- **アセット**: 21枚配置。★b4a教訓のbbox確認で、たね3枚（keyboard_1/kurikaeshi_1/tsukuru_1）に下余白31〜82pxを検出
  →bbox+4pxでトリムして他と揃えた（底基準アンカーで浮くのを防止・他17枚は元から4px）。
- powers.js: 指示どおり（GROW_STAGES 4段階・treeImg・emoji削除・POWER_DID/STAGE_LINE）。growStage のロジック不変。
- PowerPanel.jsx: もりシーン（aspectRatio 16/9＋cover＝ひろば/アリーナと同じ作法。bg_mori は1600×900=16:9ちょうど）。
  木=tapzone ボタン（left/bottom%・translateX(-50%)・height=TREE_H[idx]・img height:100%）。看板は button 内 absolute bottom:calc(100%+6px)
  ＝ボタンの高さ（%）を木の高さのまま保つ。celebrate は絵の参照とラベルのみ変更（🏅称号→「だんかい アップ！ ○○に なった」）。
- Powers.jsx: 下部文言を「あそぶと きが そだって、もりが にぎやかに なるよ！」に（花→木の世界観）。
- feature-spec: §7-2「そだった ちから（そだちのもり）」新設（§8以降の番号を壊さないため枝番）。
- 検証: verify全PASS・roundtrip全PASS（powers.prevスキーマ不変）・プレビュー実測=
  段階違い5本（め/たね/わかぎ/おおきな き/め）が指定座標・指定高さで地面に立つ／看板5枚正常／
  祝い演出発火（3件・だんかい アップ表示・prev更新後は再発火なし）／わかぎモーダル（一言・できること2項目・%・称号・絵文字なし）／
  たねモーダル（「あそぶと ここに ふえるよ」）／導線→パズル遷移／375px崩れなし／コンソールエラーなし。
