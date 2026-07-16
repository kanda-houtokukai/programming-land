# 実機FB 第3便 — バトルの横画面レイアウト（Code）

作成: 2026-07-16 ／ 起点: v2.3-b4z ／ 設計・モック承認済み
対象: `src/components/Battle.jsx`（`BattleFight` の外枠と2カラム化）＋ `src/theme.js`（CSS追加のみ）

問題: 横画面の端末で、フローチャート（ずのよみとり）のように縦に長い問題だと、答えのボタンまでスクロールした時点でバトルシーンが画面外に消える。
原因: `BattleFight` の外枠が inline の `maxWidth: 640`。横画面でも中身は640pxに制限され、全部が縦に積み上がる。
方針: 横画面のときだけ2カラム（左=バトルシーン sticky／右=もんだい）。縦画面は一切変えない。

★境界: 戦闘中の演出ロジック（命中解決・突進/lunge・shakeCls・メッセージパネル・pl-*）と結果シーケンスは触らない。中身のJSXは移動するだけで改変しない。

## 1. 判定は CSS メディアクエリで（★JSの向き検出は使わない）
このプロジェクトはJSでの環境判定で2回事故っている（b4b: matchMedia誤発火／b4l: ResizeObserver不発火）。
向きの判定は CSS の `@media (orientation: landscape) and (min-width: 820px)` に任せる。

## 2. theme.js（追加のみ）
`.battleWrap`（max-width 640・従来のinlineから移設）＋ 横画面時のみ `.battleWrap{max-width:1120px}` と
`.battleSplit{flex}` `.bsLeft{flex:0 0 54%; position:sticky; top:8px}` `.bsRight{flex:1 1 46%; min-width:0}`。

## 3. Battle.jsx（既存ブロックを2つのdivで包むだけ）
★inline の maxWidth は CSS より強いので必ず className に置き換える。
battleWrap > [Header・にげる行=全幅] + battleSplit > [bsLeft=バトルシーン+たたかいメッセージ / bsRight=アイテム+もんだい]。
勝敗オーバーレイ（fixed 全画面）は分割の外。

---

## 実装記録（Code・2026-07-16・v2.3-b5a）

- theme.js: 指示どおり `.battleWrap`/`.battleSplit`/`.bsLeft`/`.bsRight` を追加（既存CSSは不変・コメントにb4b/b4lの教訓を明記）。
- Battle.jsx: 外枠inline→`className="battleWrap"`・バトルシーン+メッセージを`bsLeft`、アイテム+もんだいを`bsRight`で包んだ（中身のJSXは1行も改変なし・勝敗オーバーレイは分割の外）。
- 検証（プレビュー実測）:
  - 横1180×820: wrapMaxW=1120px・flex・左605px(54%)/右501px(46%)・左sticky top:8px。回答時の演出（ダメージ数字・かいしんメッセージ）が左カラム内に表示されるのをDOM実測。
  - sticky実測: ランダム出題で縦長問題を引けなかったため、右カラムに1400px相当のspacerを一時挿入して模擬（アプリコード不変）→最下部までスクロールでシーンtop=8pxに貼り付き・画面内 ✓。
  - 横844×390（スマホ横）: 2カラム（左424/右347）・横はみ出しなし・勝利オーバーレイ（結果シーケンス）が全画面fixedで正常。
  - 縦390×844: display=block・maxWidth640・sticky無し＝従来と同一。
  - 縦820×1180（境界）: 幅820あるがportraitのため1カラム ✓。
  - コンソールエラーなし。verify全PASS。
- ※突進（--dx:-46vw）の見え方: シーン幅640→605pxでほぼ同じはずだが、行き過ぎ/不足の体感は実機確認項目。
