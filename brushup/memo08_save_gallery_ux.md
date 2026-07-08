# おえかき・保存/ギャラリー周りのUX改善（b3k の小改修＝b3l）

作成: 2026-07-08 ／ 起点: v2.3-b3k ／ 対象: `src/components/Art.jsx`（すべて Art 内で完結）

## ① 保存せず「戻る」で無言消失を防ぐ（確認）
- `dirty` フラグ: `add`/`pickColor`/`undo` で `setDirty(true)`、`saveArt` 成功時と `clearAll` で false。
- `requestBack = () => (cmds.length>0 && dirty) ? setConfirmBack(true) : go("home")`。Header の onBack を差し替え。
- confirmBack モーダル:「ほぞんしていない え が あるよ。もどると きえちゃうけど いい？」
  [💾ほぞんする]（confirmBackを閉じ backAfterSave=true→askSave→保存後 go("home")）／
  [ほぞんしないで もどる]（go("home")）／[やめる]（閉じるだけ）。
  ※おうちモーダル(openHome)・おうちの方へ は Art を消さないので対象外。

## ② ギャラリーの「けす」に確認
- `confirmDel`（対象作品）。✖けす → `setConfirmDel(a)`。
- confirmDel モーダル:「この さくひん「〇〇」を けす？」[けす]（delArt→閉じる）／[やめる]。

## ③ 作品タップで「額縁ポップアップ」
- ギャラリーの各作品をタップ可能なボタンに → `viewWork(a)` を開く。
- viewWork モーダル: 作品を大きめに木枠ふうの額縁（linear-gradient茶＋内側白線）に入れて表示
  （既存 `ArtSVG`・`showTurtle=false`）。作品名・日付・[とじる]・[🗑 けす]。
- 削除は額縁内の [🗑 けす]（→②の確認）に集約。一覧のインライン✖けすは廃止（タップ＝額縁表示に一本化）。

## 維持
壁ハルト・圧縮表示・上限300・45°・ペン・保存フロー等 b3k の挙動はそのまま。モーダルは既存
`confirmClear`/`naming` と同じ実装様式（`modalBg`＋`.panel .slide`＋stopPropagation）。

## 検証（Code・2026-07-08）
- verify全PASS・roundtrip全一致（保存データ・描画は不変）。
- 手動（プレビュー）:
  - ① 何も描かず戻る→確認なしで遷移／描いて戻る→確認出る→[やめる]で残る(命令2保持)／
    [ほぞんする]→名前モーダル→保存→dirty=false／保存直後に戻る→確認なしで遷移。
  - ② 額縁内🗑けす→確認「「ぎざぎざ」を けす？」→[やめる]で額縁残る→再度🗑→[けす]で削除・額縁閉じ・一覧から消える。
  - ③ 作品タップ→木枠額縁で大きく表示（旧作品も四角に描画）・とじるで戻る。
- ★完了報告は「実機確認をお願いします」で（額縁の見た目・文言は実機調整）。
