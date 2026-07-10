# 実装指示書: バトル演出の質感改善（メモ06-A Phase 2「演出磨き」）

作成: 2026-07-10 ／ 設計の正本: この指示書 ／ 対象バージョン基準: v2.3-b3o
担当分担: 本件（バトル戦闘中の演出）専任。メモ06-A Phase 2 の「ナッジ」・タワー構造・数値は対象外。
モデル: Opus 4.8（範囲限定・反復的なUI磨き）。

## 0. 触るファイル
- `src/components/Battle.jsx` … ロジックと描画。
- `src/theme.js` の `CSS` 文字列（App.jsx が `<style>{CSS}</style>` で注入）… 新規 @keyframes はここ。
  ※指示書原文は「App.jsx の CSS」とあったが、実体は theme.js（App.jsx は import して注入するだけ）。
- **`battle.js`（数値集約）・タワー/フロア・レベル選択ナッジには一切触れない。**

## 1. スコープ（4点）
1. メッセージのタイプライター表示 ／ 2. 命中時のヒットストップ ／ 3. 浮遊ダメージ数字 ／ 4. 通常攻撃の予備動作。
かいしんの溜めは既存実装で十分＝任意の微増幅のみ（§5）。

## フェーズ1: タイプライター＋ヒットストップ →【停止して実機確認】
- 1-A: 1文字≈28ms・全文≈700ms以内（長文は1tickの文字数を増やす）・パネルタップで即全表示・
  reduced-motion は即時全表示。msg変更/next()/アンマウントでタイマ確実クリア。
- 1-B: 命中時にまず💥だけ出して固め、通常≈90ms／かいしん≈140ms後に揺れ＋ダメージ＋メッセージを解放。
  後続タイマ（atkEnd/fxClear）も止めのぶん後ろへ。reduced-motion は止めなし。
- 停止ポイント1: タイプ速度・止めの長さを神田さんがiPad実機で確認→微調整→フェーズ2へ。

## フェーズ2: 浮遊ダメージ数字＋予備動作 →【停止して実機確認】（★未着手）
- 2-A: 命中位置に「-1」／かいしん「-2」（大きめ・金色）をオーバーシュート拡大→上昇フェード。
  `dmgPop` state＋theme.js に `@keyframes dmgfloat`。
- 2-B: 通常突進の直前に≈110msの「引き」（`ready`フェーズ＋`anticip`クラス）。毎ターン+120ms以内。
  かいしんは既存の溜めがあるので二重にしない。
- 停止ポイント2: 実機微調整→デプロイ。

## 5. 任意: かいしん溜めの微増幅（実機を見てから・不要なら省略）
## 6. やらないこと
ロジック・バランス（HP/ダメージ/確率/コイン/タワー/ナッジ）不変。Battle.jsx の構造を作り替えない。
勝利/敗北/防御/アイテム演出は現行のまま。
## 7. 検証と落とし穴
iPad Safariで滑らか（transform/opacity中心）。prefers-reduced-motion 尊重。タイマ後始末。プレビュー成功≠完成。

---

## 実装記録

### フェーズ1（Code・2026-07-10・v2.3-b3p）実装済み・実機確認待ち
- **1-A タイプライター**: `typedLen`/`typedFor` state＋`typeTimer` ref。msg変更時は**render-phase調整**
  （effect待ちだと前の長さで一瞬全文が見えるフラッシュを防止）。`step=ceil(len/25)` で全文≈700ms以内。
  パネル onClick=skipType。reduced-motion（matchMedia）は即時全表示。effect cleanup＋完了時にタイマ解放。
  全メッセージ（攻撃/ミス/たて/かいしん予兆/アイテム）が対象。
- **1-B ヒットストップ**: 正解命中の解決を2段に分割＝impactで SFX＋💥(fx/hitflash/critPop)のみ→
  `stop`（通常90ms/かいしん140ms/reduced-motion 0）後に shake＋enemyHp＋メッセージ。
  atkEnd/fxClear も `+stop` 後ろへ。ミス/たて側は現行のまま（スコープ=正解時の命中）。
- **検証**: verify全PASS・roundtrip全一致。プレビュー実測＝💥345ms→揺れ424ms（止め79ms・25ms
  ポーリング精度内で設定90msと整合）／メッセージ長が4→17へ1文字ずつ漸増／タイプ中タップで
  3→13文字即全表示／誤答後の進行・ハート減も正常。
- **触った箇所（本線への申し送り用）**: Battle.jsx=タイプライターstate一式（timers/granted直後）・
  msg描画（onClick+slice）・正解時の命中解決（stop分割）。theme.js/App.jsx は未変更（フェーズ1は
  新規keyframes不要）。

### フェーズ2（Code・2026-07-10・v2.3-b3q）実装済み・実機確認待ち
- **2-A 浮遊ダメージ数字**: `dmgPop` state（{value,crit,id}）をヒットストップ解放と同時にセット→
  💥の少し上（right17%/top18%・zIndex6）に「-1」／かいしん「-2」（大きめ・金`#FFD447`＝critpopと同系・
  通常は白）を `pl-dmgfloat`（theme.js新設: scale .3→1.25オーバーシュート→上昇56px＋フェード・0.9s）で表示。
  fxClear/next()でクリア。reduced-motionは出さない（JS skip＋CSS animation:none の二重）。
- **2-B 通常攻撃の予備動作**: 突進の直前に`ready`フェーズ（**110ms**）→相棒の外側divに`anticip`クラス
  （`pl-anticip`: translate(-7px,4px) scale(.97)＝少し引いてかがむ・theme.js新設）。`delay`を
  `isCrit ? T.windup : pre` に変更＝通常のみ全タイマが+110ms（かいしんは既存の溜めがあり二重にしない）。
  reduced-motionは pre=0。毎ターン追加は110ms＝上限120ms以内。
- **検証**: verify全PASS・roundtrip全一致。プレビュー実測＝anticip 23ms→lunge 129ms（**引き106ms**）→
  💥447ms→dmgfloat 531ms（**止め84ms**）・数字「-1」・1194msで消滅（fxClear）。進行・勝敗フロー正常。
- **触った箇所（本線への申し送り用・フェーズ1と合算）**: Battle.jsx=タイプライターstate一式・msg描画
  （onClick+slice）・pick()正解ブランチ（pre/ready・stop分割・dmgPopセット/クリア）・next()のdmgPopクリア・
  相棒外側divのclassName（ready→anticip）・浮遊数字の描画（💥ブロック直後）。
  theme.js=`pl-dmgfloat`/`.dmgfloat`・`pl-anticip`/`.anticip` 新設＋reduced-motionリストに追加。
- **§5（かいしん溜めの微増幅）は未実施**（実機を見てから・不要なら省略の方針どおり）。
