# プログラミングランド v2 — 台帳（handoff）

最終更新: 2026-07-25（**v2.3-b6i 開店フェーズ 便③=教育接続（XP10・コイン5種・きろく）＝deploy済み・⚠️実機確認待ち**。**これでこうぼうの作品が XP・コイン・きろくにつながった**（便②の `exitWorkshop` 経路が本便で初めて意味を持つ）。便②（b6h）は**実機OK**。段階3 区切り①〜④（b6b〜b6f）・便①（b6g）は実機確認待ち。**次=便④ ガイド＋BGM**（`brushup/gamelab-opening-design.md`）。**区切り⑤ clone は開店フェーズの後**。実機確認は `brushup/cards-reference.md`（機能一覧）到達後にまとめて実施の方針＝各便は簡易確認で先行。段階3カード追加分=`brushup/gamelab-implementation-stage3.md`＋区切り④指示書 `brushup/stage3-step4-jumpable.md`＋カード一覧 `brushup/cards-reference.md`）

> 過去の版ごとの詳細ログは月別アーカイブへ（読むのは必要なときだけ）: **v2.3-b4e〜b5w** = `progland-archive-2026-07.md` ／ **v2.3-b4d 以前**（＋過去フェーズの教訓の詳細）= `progland-handoff-archive.md`。

> ### ★台帳の維持規則（2026-07-24 制定・全セッション厳守）
> **「今どこか」の版エントリは直近10版まで。** 11版目を足すときは、**最も古い1版を `progland-archive-YYYY-MM.md` へ移してから**追記する（原文のまま・要約しない。アーカイブは月ごとに分ける）。
> **台帳が 3.2万文字を超えたら、まず「今どこか」の版エントリ数を数える。**
> - **10版以下** → 規則は守られている。重い版が続いただけ。**何もしない**
> - **11版以上** → 最も古い版をアーカイブへ**原文のまま**移す
>
> ⚠️ **要約・圧縮による削減は禁止**（アーカイブは原文保存が目的）。
> 全セッションが起動時に台帳を読むため、肥大はそのままコンテキストの浪費になる（2026-07-24 に 76,059字→26,930字へ分離した経緯）。

---

## 現在地サマリ（毎セッション冒頭にここだけ読む）

### 次にやること（★ここが最優先・便③完了で更新 2026-07-25）

**次＝ゲームこうぼう 開店フェーズ**。正本＝`brushup/gamelab-opening-design.md`（全項目 神田さん承認済み）。便で分けて進める:

```
便① 素材差し替え（アイコン11枚PNG化・内観・建物PNG配置）… ✅完了 v2.3-b6g（deploy済み・⚠️実機確認待ち）
便② マップ開店（看板①→建物・名前・導線）… ✅完了 v2.3-b6h（**実機OK**）
便③ 教育接続（XP・コイン・マイルストーン）… ✅完了 v2.3-b6i（deploy済み・⚠️実機確認待ち）
便④ ガイド＋BGM … ★次はここ
※ 区切り⑤ clone（ぶんしんを だす）は開店フェーズの後に回す
```

- **実機確認の方針**: b6e/b6f は神田さん簡易確認で合格。通しの実機確認は `brushup/cards-reference.md`（機能一覧）が揃ってからまとめて実施＝各便は簡易確認で先へ進む。
- **便④で足すもの**: ①ガイド＝`gamelab/mode.jsx` の `guide` が `null`（保護者ガイド原稿は `brushup/gamelab-parent-guide.md` に用意済み）②BGM＝`App.jsx` の `TRACK` に `gamelab: null, // 便④で接続` の行を用意済み＝`bgm.js` の `SRC` に曲を1行足して、この `null` を曲キーに変えるだけ。**BGM 2本は `gamelab-asset-prompts.md` のプロンプトで未生成**（先に生成が要る）。
- ★**node で読めないファイル**（便③§0で確定・付与や成長まわりを触るとき必ず読む）: `growth.js` は `data/monsters.js`→`.png` の連鎖で **node から import できない**。これを import しているファイル（`studio/works.js`・**便③以降は `gamelab/works.js` も**）は**ブラウザ専用**で、`tools/` の verify から読ませてはいけない。node から試験したいロジックは共通核 `workshop/store.js` や `data/studio-blocks-defs.js` 側に置く（便③の `workUsesAnyType` はそうした）。
- 開店フェーズの関連文書（すべて brushup/）: 設計正本 `gamelab-opening-design.md`／保護者ガイド原稿 `gamelab-parent-guide.md`（便④で使う）／アセット生成プロンプト `gamelab-asset-prompts.md`（BGM 2本が未生成）／便①指示書 `gamelab-opening-step1.md`／便②指示書 `gamelab-opening-step2.md`／便③指示書 `gamelab-opening-step3.md`。
- ★**アセットの余白規約**（便②§0で確定・次に絵を足すとき必ず読む）: 256×256 の透過PNGで **`min(pad)=0`＝絵がキャンバスのどこか1辺に接している**こと。縦横比が正方形でない絵は、比が決める側の軸だけが0になる（「上下も左右も0」は成立しない）。守らないと `objectFit:contain` の枠に対して絵が小さくなり、マップ上で既存より小さく見える（便①で約7%の不具合が実際に発生）。詳細=`brushup/studio-map-placement.md`。

### 開店フェーズ 確定事項（2026-07-24・神田さん承認＝設計書 §確定事項の要約）

1. **マップの置き場所** = じゅんびちゅう**看板①（69.5, 34.13）を建物に差し替え**。看板②は残す（`tall:true`／縦余白 上0下0／左右反転不要）
2. **名前** = `short:"ゲーム"` ／ `place:"ゲームこうぼう"`（スタジオ＝「つくる」と区別）
3. **開放条件** = **なし**（`areaLocked` に手を入れない・スタジオと同じ無制限）
4. **教育接続** = XP **10**（新規保存の初回のみ）／マイルストーン5種（`first`・`works5`・`works10`・`firstOperable`・`firstClear`）／**保存先は `gamelab.milestones`（スタジオの `studio.milestones` と分離＝混ざると達成が相互汚染）**

### 今どこか

- **公開URL: https://kanda-houtokukai.github.io/programming-land/**（リポジトリ kanda-houtokukai/programming-land）
- **設計書の版**: `feature-spec.md`・`roadmap.md` とも **b5h 時点へ追随済み**（2026-07-18・feature-spec に §10 つくるスタジオを新設＋§1/§2/§7-2/§9 を追随・roadmap を b5h 現在地へ全置換）
- **新モード「ゲームこうぼう」設計確定（2026-07-19・帯B着工）**: 正本=`brushup/gamelab-design.md`。スタジオとエンジン共有・勝ち負けあり（スコア=変数・柱⑤初実装）。段階A=完了（b5s）・段階1=完了（b5u）・こうぐだな共通修正=完了（b5v）・段階2=完了（b5w）・**b5x〜b6a=実機OK → 段階3 着手**。段階3=新カード7枚（`brushup/gamelab-implementation-stage3.md`＋差分メモ `brushup/gamelab-stage3-addendum.md`・基準モック=`brushup/palette-29-structure.html`・`brushup/dpad-play-mock.html`）。**区切り①（dpad＋tapMove）=b6b→手直し=b6c(実機OK)→区切り②（goal＋chase＋fall＋相手ピル）=b6d(実機OK)→区切り③（カード一覧生成＋bump削除＋みほん3本）=完了（b6e・⚠️実機確認待ち）→**【3-B】区切り④（jumpable とべるように）=完了（b6f・deploy済み・⚠️実機確認待ち）**。段階3のカード追加は6/7枚完了（残り clone）。**次は開店フェーズ（上の「次にやること」参照）＝区切り⑤ clone は開店フェーズの後**。指示書=段階A `stageA.md`・段階1 `stage1.md`・段階2 `stage2.md`・UI刷新 `palette-ui-overhaul.md`（正本・操作基準=`palette-mock2.html`）・段階3 `gamelab-implementation-stage3.md`（すべて brushup/）。
- **v2.3-b5z（2026-07-23・こうぐだなの指ドラッグが無言で消える不具合の修正＝実機OK・神田さん実機確認合格／deploy済み 1b45019）**: 指示書=`brushup/palette-drag-touch-fix.md`（正本）。不具合の単独便。**§0 由来: b5x のながおし操作と一緒に入ったもの＝b5y は無罪**。指示書配置=ea67118・修正=4b16c96（deploy=1b45019）。studio/gamelab 共通（共有部品）
  - **不具合**（神田さん iPad 実機・2026-07-23）: 棚のカードを指で作業エリアへドラッグしても何も置かれず無言で消える／断続的／きっかけ（最上段）は成功しやすく下のカテゴリはほぼ来ない／マウスは100%成功／studio・gamelab 両方
  - **§3-1/3-2 方向判定**: 取り出しを「時間ベースの静止門（旧 `PAL_PRE_MOVE=7` を150ms保持）」から**方向ロック**へ。最初の明確な移動（`CFG.PAL_DIR_LOCK=8`px超）が**横優勢なら即ドラッグ**（pan-y は横スクロールしない＝Safari に横取りされない）／**縦優勢ならスクロールに譲る**。静止したままなら従来どおり150msで ながおし成立→せつめいふきだし（教育導線=維持）。`resolvePalPending` を方向判定に書換＋ドラッグ開始を `startPalDrag` に抽出
  - **§3-3 touchmove抑止**: ドラッグ成立中だけ（`dragRef.current`）document の `touchmove` を非パッシブ `preventDefault`＝Safari が touch-action:pan-y でジェスチャを縦スクロールに横取り（→`pointercancel`→`onCancel`→`dropLastSnapshot` で無言消失）するのを止める。**ドラッグ中のみ＝棚の縦スクロールは従来どおり**（常時抑止は過去失敗）
  - **★§3-4 しきい値判断（報告）**: 旧 `PAL_PRE_MOVE`（静止門）を廃し `PAL_DIR_LOCK=8`（方向判定）に置換。方向判定を入れると静止門自体が不要（横=衝突せず即ドラッグ／縦=譲る）。**`pointerType` 分岐は不要と判断**＝同一しきい値で指/マウス両方成立（マウスは touch-action 非適用で従来どおり成功・横移動で即ドラッグ化）
  - ★重要な限界（正直に記録）: **この開発環境では実機タッチ再現ができなかった**（Xcode/シミュレータ未導入で `simctl` 不可・iPad 手元になし・Chromium プレビューは `maxTouchPoints:0` でタッチ入力なし＝touch-action のスクロール横取り→pointercancel を発火させられない）。代わりに **§1 の推定5点すべてを現行コードで裏取り**（`touch-action:pan-y` 存在・無言消失は `pointercancel`→`onCancel` の1経路のみ・`pointerType`/`touchstart`/`touchmove` 0箇所・`PAL_PRE_MOVE=7`/`PAL_LONGPRESS=150`）＝矛盾なし。合成ポインタ（mouse）で**新経路の実挙動を検証**（20msで横移動→即ドラッグ→配置成功／静止150ms→lift＋ふきだし表示／縦移動→ドラッグせず誤配置なし）。**真の確認は神田さんの iPad 実機（§5ゲート）**
  - 検証: **verify 8本全PASS**（`--update` なし＝**732イベント・パス98本・DEFS23種 byte不変**＝§4凍結を維持）・ビルドOK・本番URLで b5z バンドル（`index-DxKGwzeJ.js`）配信確認・コンソールエラーゼロ
  - ✅実機確認合格（2026-07-23・神田さん・iPad Pro 11 よこ）: §5ゲート5項目すべてOK（全カテゴリ指ドラッグ・縦スクロール・ふきだし・磁石・マウス退行なし）。b5y+b5z をまとめて実機OK。実機FB=「こうぐだな/カードをもう少し小さく（特にずっと/くりかえし）・形は変えずサイズだけ」「おいたよ!トーストが上部で見切れる」→ `brushup/palette-shrink-toast-fix.md`（→b6a）で対応
- **v2.3-b6a（2026-07-23・こうぐだな縮小＋おいたよ!トーストの見切れ修正＝実機OK・神田さん実機確認合格／deploy済み f15b4ba）**: 指示書=`brushup/palette-shrink-toast-fix.md`（正本）。微調整の便。studio/gamelab 共通。§0台帳記帳=c41d21a・§1縮小=2279497・§2トースト=a8b811e（deploy=f15b4ba）
  - **§1 こうぐだな縮小**: `.studio-pal` 幅 24%→**21%**・`PAL_S` 0.76→**0.67**（`PAL_GAP_RATIO`=0.92 据え置き）。**同率で下げて形を保つ**（幅は colW、高さは PAL_S で決まる）。形の不変は **W0=colW/PAL_S** で機械確認＝実測 W0=**162.7**（1194px）／before 167.1＝差 **2.6%（3%以内）**。実測: studio/gamelab 両方 2列維持・colW 109・18/23種維持・指ドラッグ配置も従来どおり
  - **★§1 フォントの申し送り**: 6文字ラベルが Chromium 実測 **11.70px**（指示書の 12px 下限をわずかに下回る）。原因は colW=109 が指示書の iPad 実測値 111 より2px小さいため＝Chromium/Safari のレイアウト差（枠/スクロールバー/サブピクセル約4px）。指示書の colW=111/12px は iPad 実測由来なので**実機では12px見込み**。神田さん決定値（21%/0.67）は変えず、**実機ゲート#3（小1の読みやすさ）で最終確認**とした。もし実機で小さすぎれば こうぐだな幅を+1%する余地あり（W0 は範囲内を維持できる）
  - **§2 トースト見切れ修正**: `.studio-wrap` に `position:relative`＝トーストの基準を画面上端からヘッダー下へ。トーストを `.studio-root` 直下から **`.studio-wrap` の中**へ移動（`top` 64px→12px）＝ヘッダー高が将来変わっても壊れない。**★`.studio-asm` 基準にしない**（全画面 `.big` で asm=`display:none` だがトーストは残すべき→wrap は big でも残る。実測: big で wrap 1194×754 表示・asm none）。ヘッダーと同系色（RGB 36,26,44）に溶けないよう**白いリング** box-shadow を追加。実測（1194px）: toast top92／header下端80＝**12px下・重なりなし**・親=studio-wrap
  - 検証: **verify 8本全PASS**（`--update` なし＝**732イベント・パス98本・DEFS23種 byte不変**＝§3凍結を維持）・ビルドOK・本番URLで b6a バンドル（`index-CC8XCtWl.js`）配信確認・コンソールエラーゼロ
  - ⚠️申し送り（次便＝ゲームのせってい再設計）: こうぐだな 24%→21% で余った3%が作業/プレビューへ分配され、プレビュー（aspect 3/2）は幅増で**高さ約+12px**。右カラムは iPad で既に約40pxはみ出し（はいゆうひかえしつが下で切れる）＝**この変更で約12px悪化**。せってい再設計（A-4）で縦予算にこの12pxを織り込むこと。本便では未対処（指示書§6）
  - ✅実機確認合格（2026-07-23・神田さん・iPad Pro 11 よこ）: §4ゲート6項目すべてOK（小さくすっきり・形不変・文字読める〔11.70px 実機で問題なし〕・指ドラッグOK・トースト重ならない・全画面でもトースト出る）。次=段階3
- **v2.3-b6b（2026-07-23・ゲームこうぼう段階3 区切り①=dpad＋tapMove＋そうさカテゴリ新設＋短縮ラベル＝⚠️実機確認待ち／deploy済み cfcf36e）**: 指示書=`brushup/gamelab-implementation-stage3.md`＋差分メモ `brushup/gamelab-stage3-addendum.md`（正本）。studio/gamelab 共有部品に追加だが **gamelab のみに出す**。指示書配置=ea67118/97597b6・区切り①=8dfe146（deploy=cfcf36e）
  - **そうさカテゴリ新設（ティール #2FB4A6・edge #1B8478）**: `COL.ctrlpad` 追加。DEFS に `dpad`「じゅうじキー」/`tapMove`「タップいどう」（body・ピルなし・cat そうさ・ラベル6文字＝b6a のカード縮小に合わせ short・意味は long/desc が担う）。`w=206` は既存値を再利用（ベースライン増分を DEFS だけに抑える）。`GAMELAB_PALORDER` の きっかけ↔かず 間（b5x 予約位置）へ挿入。studio `PALORDER`(18種)は不変
  - **エンジン（拍を待たない操作・§1）**: `dpad` 実行→`ch.operable=true`（1回で有効化・以後ずっと）／`tapMove` 実行→`ch.tapMovable=true`。`nudge(dx,dy)`=操作可能キャラを1マス／`bgTap(gx,gy)`=タップ移動の目的地／`tapMoveStep()`=目的地へ1マス／`gridMove` で盤内クランプ／`resetChar` で ▶ ごとに操作フラグ初期化／`onFx` operable・tapmove で通知／`hasOperable()`
  - **UI**: `opLoop`（~100ms=`OP_MS`）で押下中の連続移動＋タップ移動を拍(400ms)と別に進める。じゅうじキー(▲◀▶▼)を **`.studio-right`（全画面 `.big` でも残る・addendum §5）** のステージ下に固定＝mode.isGame＋上演中＋操作可能キャラがいる時だけ表示。背景タップ（キャラ以外）で `bgTap`＝タップ移動（キャラtapと分離・§1 A-2）
  - **★ベースライン再取得（段階3で初）**: `--update` 実施。**diff を機械確認＝blocks.defs に dpad/tapMove の2種＋geometry.measures に同2種のみ追加。traces 732イベント・geometry.paths 98本・widths・studio palorder は byte 不変**（studio エンジン挙動無傷）。以後の段階3区切りも同様に「新カード追加＝defs/measures だけ増える・traces732不変」を確認する
  - **★§3-4 フォント報告**: gamelab 全25枚を1194pxで実測。新カード じゅうじキー/タップいどう=**11.7px**＝既存6文字（ぶつかったら・もとのばしょ）と同値＝b6a で神田さん実機OK水準（新規の悪化なし）。⚠️既存 `tap`「タップされたら」(7文字)=**10.03px** が最小＝b6a既存・本便スコープ外（studio 共有カードのため短縮は別便判断）。神田さんへ要報告
  - 検証: **verify 8本全PASS**（DEFS25種）・ビルドOK・本番 b6b バンドル（`index-DXoLMWyU.js`）配信確認・コンソールエラーゼロ・ブラウザ実測（1194px）=そうさ配置(きっかけ↔かず)／じゅうじキー各方向1マス正確・操作可能キャラのみ移動・盤内クランプ／タップ移動は背景タップ先へ200ms以内に動き到達で停止／じゅうじキーは `.studio-right` 内（全画面生存）／**studio は そうさ無し・18種で無影響**
  - ⚠️次: 神田さんの iPad 実機確認 → **FB2件で b6c に手直し**（下記）
- **v2.3-b6c（2026-07-23・段階3 区切り①手直し=そうさの手触り修正＋全画面1画面化＝⚠️実機確認待ち／deploy済み 6e4ed0c）**: 指示書=`brushup/stage3-op-feel-fullscreen.md`（正本）。実機FB=①連続移動が小刻みにカクカク揺れる②全画面で十字キー等が収まらない。表示・CSS・操作ループのみ（DEFS不変）。指示書配置=dfd00a6・①+②=3bf30c5（deploy=6e4ed0c）
  - **§1 連続移動の手触り**: `.actor` に `op` クラス（操作可能/タップ移動キャラの時だけ）。`.actor.op` の transition を `OP_MS(100ms)`・`linear` に＝移動間隔と一致し途中中断が起きず等速に滑る（原因A）＋`.actor.op .sp-in.stepA{animation:none}` で連続移動中は足踏み演出を再発火させない（原因B＝揺れ）。**★1拍ごとの移動（みぎへ 等・非opキャラ・studio共有）は `.actor` のまま=340ms ease+stepA 不変**（実測: 非op=0.34s cubic-bezier／op=0.1s linear）。`OP_MS=100` 維持（§1-3・モック50msからあえて外す判断＝実装は340msイージング前提で瞬間移動のモックと別物・小1の指で行き過ぎ防止・1.2秒で横断）。**★`OP_MS` 宣言を STUDIO_CSS の前へ移動**（`.actor.op` が `${OP_MS}` 参照＝後ろだと TDZ でモジュール読込失敗→画面真っ黒。node verify では捕捉不可＝ブラウザ確認で発見）
  - **§2 全画面1画面化（★gamelab のみ・studio 完全無変化）**: §2-2 `.studio-root.big.gl .gamecfg` 非表示。**§2-3【方式=flex・報告】**新しい固定px値を足さず `.big.gl` の studio-right を縦flex＝じゅうじキー `flex:0 0 auto`（自然高さ）／プレビュー `flex:1 1 0`（残りを埋める・max-width:100%で3:2維持）。じゅうじキーの有無で予備が自動配分（実測 有:theater586h+dpad148／無:742h）。**★`.gl` スコープ限定＝studio の全画面は従来 `calc((100dvh-110px)*1.5)` のまま**（実測: studio big flex-grow0・width1086px＝完全無変化）
  - ★教訓: **テンプレートリテラル（STUDIO_CSS）で参照する定数は、その宣言より前に置く**（TDZ で `Cannot access 'X' before initialization`→React が描画されず画面真っ黒。node の verify は通るため、ブラウザ実機確認でしか気づけない）
  - 検証: verify 8本全PASS（DEFS25・traces732・paths98 不変＝ベースライン1バイト不変）・ビルドOK・本番 b6c（`index-CZxrI6xP.js`）配信確認・コンソールエラーゼロ・実測(1194px)=①op=0.1s linear/非op=0.34s ease②gamelab big=dpad全可視/theater3:2/gamecfg非表示・studio big=従来サイズ不変
  - ⚠️次: 神田さんの iPad 実機確認 → **合格 → 区切り②（b6d）へ**
- **v2.3-b6d（2026-07-23・段階3 区切り②=goal／chase／fall＋相手ピル名前表示＝⚠️実機確認待ち／deploy済み d2abced）**: 指示書=`brushup/stage3-step2-goal-chase-fall.md`（正本）。新カード3枚は gamelab 専用。指示書配置=437c714・実装=e5b06a7（deploy=d2abced）
  - **新カード3枚**: `chase`「おいかける」（うごき青・ピル=あいて・w206再利用）=指定相手へ1拍1マス寄る（差の大きい軸／any・消えた指定は最も近い見えるキャラ／同マスで停止＝重なって暴れない）。`fall`「ふってくる」（うごき青・w206）=1拍1マス下・下端で上端へ戻る。`goal`「ゴール」（きっかけ橙・ピル=あいて・w210再利用）=挙動は `bumpTarget` と共通（相手に重なったら発火）だが**別カード**（[DECISION] 指示書§1-1: 「ぶつかったら→クリア」は子に不自然・「たどりつく」用途を desc で差別化）。エンジン=TRIGGERS に goal 追加・`fireBumpTarget`→`fireTargetTrigger(kind)` 一般化・hasListeners に goal
  - **[DECISION] fall の横ランダム化（§1-3報告）**: 上端リスポーン時に x をランダム化。理由=同じ列に落ち続けると主人公が真下で待つだけでゲームにならない（基準モックも random spawn）＝落ちものキャッチが成立
  - **§2 相手ピルの内部ID表示バグ修正**: `WorkshopEditor`→`StudioBlock`(nodes/fly)＋`cardW` に `targetName` を伝達。**bumpTarget/goal/chase の3枚まとめて名前表示**に（実測: だれか→タップ→「きのこちゃん」）。消えた相手は「だれか」に落とす（内部ID を出さない）
  - **★ベースライン再取得（§4・25→28種）**: `--update`。diff機械確認＝blocks.defs に goal/chase/fall の3種＋geometry.measures 同3種のみ追加。**traces732イベント・geometry.paths98本・widths・studio palorder は byte不変**（studio エンジン無傷）
  - 検証: エンジン単体テストに chase(寄る方向・到達・同マス停止)/fall(下へ・下端で上端へ)/goal(到達発火) 追加＝全PASS・verify 8本全PASS（DEFS28）・ビルドOK・本番 b6d（`index-D-X04Vmw.js`）配信確認・コンソールエラーゼロ・ブラウザ実測(1194px)=28枚・新カード配置/色正しい・font 全て≥12px(ゴール16/おいかける14/ふってくる14)・相手ピル名前表示・ふってくるで主人公が下へ移動
  - ⚠️次: 神田さんの iPad 実機確認 → **合格 → 区切り③（b6e）へ**
- **v2.3-b6e（2026-07-24・段階3 区切り③=カード一覧の自動生成／bump を gamelab から削除／みほん3本＝⚠️実機確認待ち／deploy済み 8e4d62a）**: 指示書=`brushup/stage3-step3-cards-samples.md`（正本）。指示書配置＋§0=38aa166・②③=4a6f26c（deploy=8e4d62a）
  - **§0 カード一覧の自動生成**: `tools/gen-cards.mjs`（`npm run cards`）が `DEFS`/`PALORDER`/`GAMELAB_PALORDER` から `brushup/cards-reference.md` を生成（手書きせず実装から・docs/ には出さない）。**★§0-3: 照合を verify に統合**（`gen-cards.mjs --check`＝出力を完全決定的にし安定・高速に動作確認＝一覧が古いまま deploy されない）
  - **§1 bump を gamelab のこうぐだなから削除（28→27種）**: `GAMELAB_PALORDER` から `bump` を外し「ぶつかったら」は `bumpTarget` 1枚に一本化。**DEFS には残す・studio `PALORDER` 18種は不変・エンジンは引き続き bump 解釈**（既存 gamelab 作品が壊れない）
  - **★§2 枚数バッジ=入れない判断**: `palette-ui-overhaul.md` にバッジ仕様なし＝b5x のバッジ無し見出しが実機OK済み。追加は実機OK済みの見た目を変えるため見送り（神田さん希望なら後便で容易に追加可）
  - **§3 みほん3本追加（既存3本は残す・計6本）**: おちものキャッチ（主人公=じゅうじキー＋ぶつかったら[リンゴ]→スコア＋／リンゴ=ずっと→ふってくる／じかん30）・おにごっこ（主人公=じゅうじキー／鬼=ずっと→おいかける[主人公]＋ばくだん／じかん30逃げ切り）・ゴールまで いこう（★正本のめいろを差し替え=§3-3: 現状ばくだんは1体しか指定できず壁1つ＝迷路にならないため。主人公=じゅうじキー＋ゴール[旗]→スコア＋5／いわ=ばくだん／クリア=スコア5。★score は5刻み制約で param=5・ゴール到達で+5=1回で達成）。verify-gamelab に §3-4 検証追加（カードが GAMELAB_PALORDER 実在・クリア=スコアなら scoreUp あり・本数6）
  - **§4 ベースライン不変**: bump は DEFS に残るため `--update` 不要＝`traces`732/`paths`98/`defs`28/studio `palorder`18 すべて byte 不変（確認済み）
  - 検証: verify 8本全PASS（みほん6本・カード一覧照合27/18）・ビルドOK・本番 b6e（`index-DIIyzi1J.js`）配信確認・コンソールエラーゼロ・ブラウザ実測(1194px)=gamelab 27種／「ぶつかったら」1枚／studio 18種で bump あり・gamelabカード無し／6みほん表示・ゴールまで いこう ロードOK（ゴール[きのこちゃん]→スコア＋5・名前表示）
  - ⚠️次: 神田さんの iPad 実機確認（§6ゲート: ①gamelab「ぶつかったら」1枚②studio 18種完全無変化③みほん3本が遊べる〔おちものキャッチ/おにごっこ/ゴールまで いこう〕④見出しの押しやすさ不変⑤`brushup/cards-reference.md` の内容が実物と合う。⚠️「ぶつかったら」と「ゴール」が混乱しないか＝§1-1）
- **v2.3-b6f（2026-07-24・段階3 区切り④=`jumpable`「とべるように」（重力・着地・足場・ジャンプ）＝⚠️実機確認待ち／deploy済み b9aeb8b）**: 指示書=`brushup/stage3-step4-jumpable.md`（正本）。gamelab 専用・そうさカテゴリ3枚目・`w=206` 再利用。指示書配置=b18da73・実装=84c085d（deploy=b9aeb8b）
  - **[DECISION] §0-2 整数マスのまま実装**（小数座標を入れない）＝`ch.x/ch.y` を使う全箇所への波及と 732イベント凍結へのリスクを避ける。重力・ジャンプはすべて**操作ループ（`OP_MS=100`）で1ステップ1マス**＝拍を待たない
  - **エンジン**: `beginBlock("jumpable")`→`ch.jumpable=true`（`resetChar` で ▶ ごとに `jumpRise` ごと初期化）／`isSupported`＝地面 or 真下に別キャラ／`gravityStep()`＝上昇中は1マス上・支え無しなら1マス下／`tryJump()`＝接地かつ操作可能なキャラだけ `JUMP_CELLS=3` 上昇（空中・上昇中は不可＝二段にならない）／`nudge()` は jumpable キャラの**たて入力を無視**（縦は重力/ジャンプ担当・よこは空中でも操舵可）
  - **★指示書との相違（要記憶）**: 指示書§1-2 は「地面=`y=LROWS-1`」「足場=`y+1`」だが、**このエンジンは `y=0` が盤の下端**（`moveU=[0,+1]`／`fall` は `y-=1` で下降し `y<=0` で上端へ／CharSprite は `ay=-y*cellPx`）。意図（盤の一番下・真下のマス）どおり **地面=`y===0`・足場=`(x, y-1)`** で実装した
  - **★§1-3 判断報告**: ジャンプ高さ=**3マス**（12×8盤で2マス上の足場に届く・`OP_MS=100` で上り300ms＋下り300msと軽快）。**▼＝何もしない**（重力が下方向を担うため追加移動は落下速度が二重になり予測しづらい。小1には「▲でとぶ・◀▶で動く・下は勝手に落ちる」の3つに絞る）
  - **★§2 よこスクロールは実装に無い**（カメラ・ワールド座標が無く盤は12×8固定）＝「よこから見た1画面のジャンプゲーム」と読み替え。**みほん追加は区切り⑤でまとめて**
  - エンジン単体テスト追加: 空中→地面で停止／3マス上昇→重力で戻る／空中では跳べない／足場の上で停止／足場消滅で再落下＝全PASS
  - **★ベースライン再取得（28→29種）**: diff機械確認＝`blocks.defs` に `jumpable` 1つ＋`geometry.measures` 同1つのみ追加。**traces732イベント・paths98本・widths・studio palorder は byte不変**
  - 検証: verify 8本全PASS（DEFS29・みほん6本・カード一覧28種）・本番 b6f（`index-DF1xy6tM.js`）配信確認・コンソールエラーゼロ・ブラウザ実測=そうさ3枚目「とべるように」font13.03px（≥12）・**実ブラウザビルドでエンジンを直接駆動して確認**（落下 y3→0で停止／◀で横移動／接地でジャンプ→3マス上昇→重力で復帰／空中ジャンプ不可／▲は縦移動しない）
  - ★教訓（プレビュー環境）: **プレビューペインが非表示だと `setTimeout` の拍ループが抑制され、キャラが動かないように見える**（b5k/b5l の rAF 停止と同型・実機フォアグラウンドでは起きない）。エンジンを手動 tick して切り分けること
  - ⚠️次: 神田さんの iPad 実機確認（§5ゲート: ①落ちて地面で止まる②別キャラの上に乗れる③▲でジャンプ・空中では跳べない④落ちる/跳ぶがなめらか⑤うごきの「ジャンプ」（その場演出）と混同しないか〔混同するなら名前を練り直す〕⑥既存みほん6本が不変⑦studio 完全無変化）。**合格後は開店フェーズ（上の「次にやること」参照）。区切り⑤ clone は開店フェーズの後**
- **v2.3-b6g（2026-07-24・開店フェーズ 便①=素材差し替え〔暫定SVGアイコン11枚をPNG化＋こうぼう内観を専用画像へ〕＝⚠️実機確認待ち／deploy済み 168348c）**: 指示書=`brushup/gamelab-opening-step1.md`（正本）・設計正本=`brushup/gamelab-opening-design.md`。開店フェーズ文書4本配置＋台帳更新=9d7d209・実装=874a5e4（deploy=168348c）
  - **§2-1 アイコン11枚PNG化**: `src/data/studio-blocks.js` の暫定 `svgGlyph`（iconMoveRand/Bounce/ScoreUp/ScoreDown/BumpTarget/Dpad/TapMove/Goal/Chase/Fall/Jumpable）を `card_icon_19〜29` の PNG import に置換（既存18枚と同じ import 方式に統一）。`svgGlyph` ヘルパー＋関連コメントを全廃（未使用コード掃除）。**ICONS の型↔アイコン結び付き・DEFS の中身/並び/ラベル/色は不変＝アイコンの絵だけが変わる**
  - **§2-2 内観差し替え**: gamelab `src/gamelab/mode.jsx` の `homeBg` を studio-interior 流用→`gamelab-interior.webp`（1600×900）へ。「段階1はスタジオ流用」コメントも実態に更新。**★studio 側 `src/studio/mode.jsx` の homeBg は不変**（studio-interior のまま）
  - **建物PNG**: `gamelab-building.png` を `src/assets/studio-assets/` に配置＝**便②用で未配線**（未参照のため build で docs/assets に出ない＝Vite が未使用アセットを除外）。マップ（`WorldMap.jsx`）は未着手
  - **★実測照合（verify では拾えないため必須・全PASS）**: dev で全11型のラベル↔アイコンを実測＝ランダム→19/はねかえる→20/スコア＋→21/スコア－→22/ぶつかったら→23/じゅうじキー→**24_dpad**/タップいどう→25/ゴール→26/おいかける→**27_oikakeru**/ふってくる→28/とべるように→**29_toberu**＝**入れ替わりゼロ**。studio=18枚（01〜18）・gamelab カード(19〜29)混入なし・data-URIグリフ残存ゼロ・studio homeBg=studio-interior のまま
  - 検証: **verify 8本全PASS（`--update` なし＝DEFS29・トレース732イベント・パス98本 byte不変**＝画像差し替えのみで DEFS 不変を機械確認）・ビルドOK（js gzip 208KB・アイコンは別ハッシュアセット出力）・本番 b6g（`index-DcmuNQai.js`）＋新アセット（`card_icon_24_dpad`・`gamelab-interior`）を 200 で配信確認・コンソールエラーゼロ・ブラウザ実測でこうぐだなに11枚が既存質感で表示
  - ⚠️次: 神田さんの iPad 実機確認（§4実機ゲート・studio/gamelab 両方）: ①こうぐだな11枚が既存18枚と同じ質感②アイコンとカードの対応が正しい（じゅうじキーのカードに十字キーの絵 等）③こうぼうのカセットだな背景が工房内観に変わっている④studio の内装と18枚は不変。通し実機は `cards-reference.md` 到達後にまとめて（各便は簡易確認で先行）。合格後 便②マップ開店へ
  - ⚠️**この便の12枚は余白規約に反していた（b6h の §0 で発覚・b6h で全枚修正済み）**。下の b6h 参照
- **v2.3-b6h（2026-07-25・開店フェーズ 便②=マップ開店〔看板①→建物・画面登録・退出配線〕＋便①アセット12枚の余白修正＝⚠️実機確認待ち／deploy済み 24e3739）**: 指示書=`brushup/gamelab-opening-step2.md`（正本）・設計正本=`brushup/gamelab-opening-design.md` §A。指示書配置=80ad5bd・アセット修正=b182824・§1マップ=b30dea3・§2配線=04510f1・版上げ=5f264c0（deploy=24e3739）
  - **★§0 で Chat の想定との食い違いを1件検出（着手を止めて報告→神田さん判断で修正）**: 指示書は「建物PNGの縦余白は加工済み・確認だけでよい」としていたが、**現物は上下9pxの透明余白あり**＝マップ上で既存4棟より **約7.0%小さく表示**される状態だった（`studio-map-placement.md` 記録の既知不具合と同型）。神田さんが作り直した12枚（建物1＋`card_icon_19〜29`）で差し替え。**規約の実体は「min(pad)=0＝絵がキャンバスの端に接する」**（既存18枚を実測。正方形でない絵は縦横比が決める側の軸だけが0になる＝「上下も左右も0」は成立しない）。差し替え後、全12枚 256×256・min(pad)=0 を機械確認
  - **§1 マップ（`WorldMap.jsx`）**: `SIGNS` 1枚目(69.5, 34.13)を削除し、同座標へ `AREAS` 末尾に `{key:"gamelab", short:"ゲーム", place:"ゲームこうぼう", tall:true}` を追加。**末尾追加＝既存エリアのふわふわ位相を変えない**（floatDelay/Dur が index 依存）。**看板②(47.3, 29.25)は残す**（「まだ増える」予告の維持）。`flip` は使わない＝光源を実測して左光源と確認（gamelab **+13.5**／既存 quiz +5.8・home +22.6・typing +41.2・studio +1.5＝全て正の値で一致）
  - **§2 導線（`App.jsx`）**: `Gamelab` を import＋`screen==="gamelab"` の1行を studio の直後に追加。**★`exitStudio`→`exitWorkshop` に改名して studio/gamelab で共用**（判断の根拠: 中身は `loadProfile`→`update`→`setScreen("home")` の3行のみで **studio 固有の処理をひとつも持たない**）。`TRACK` に `gamelab: null, // 便④で接続` を追加（`TRACK[screen] ?? null` なのでキー無しと**挙動は完全に同一**＝記録目的の1行）。**`#gamelab-dev` は残す**（`main.jsx` 不変・神田さんの検証用）
  - 受け皿は便①までに揃っていた: `Gamelab.jsx` は既に `onExit` を受ける形（Studio.jsx と同形）・`WorkshopHome` が `onExitApp` の有無で「◀ マップへ」／「◀ アプリへ」を自動で切替・`WorldMap` の `go(area.key)` は `setScreen` そのもの＝**追加は実質2行**で通った
  - 検証: **verify 8本全PASS（`--update` なし＝`tools/studio-baseline.json` が git 差分ゼロ＝DEFS29・トレース732イベント・パス98本 1バイト不変**＝マップと画面登録のみで DEFS に触れていないことを機械確認）・**`gamelab-building-NYUkkDdc.png` が `docs/assets` に出現＝配線された証拠**（便①では未参照で出ていなかった）・本番 b6h（`index-4GvXsIJE.js`）＋建物PNG を 200 で配信確認・コンソールエラーゼロ
  - ブラウザ実測（dev 1280px）: マップに11エリア（末尾=ゲームこうぼう）・**看板は1枚**・建物の img ボックス 87.3×87.3＝**既存 tall 4棟と同値**（余白0なので絵も同じ高さを占める）・ラベル「ゲーム」・ポップアップ「ゲームこうぼう へ いく」・▶いく！→**カセットだな(0/30)が開く**・ヘッダーが**「◀ マップへ」**（＝`onExit` が渡っている証拠）→押すとマップへ復帰・`#gamelab-dev` は従来どおり「◀ アプリへ」で不変
  - ★台帳の副次修正: b5y ブロックの末尾2行（検証・⚠️次）が b6g の後に迷子になっていた（2026-07-24 のスリム化時に発生・HEAD `f833db5` で確認）ので、**原文のまま** b5y ブロックへ戻した
  - ⚠️次: 神田さんの iPad 実機確認（§4実機ゲート7項目）: ①建物が出て看板が1枚に減っている②**大きさが既存の建物と揃っている**③ラベル「ゲーム」・タップで「ゲームこうぼう へ いく」④入れる／戻れる⑤スタジオの「つくる」と紛らわしくないか（**名前の最終判断**）⑥座標の微調整要否（重なり・草地）⑦studio・他エリアが不変。合格後 **便③ 教育接続**（`exitWorkshop` 経路が効くことをそこで確認する）
  - ✅実機確認合格（2026-07-25・神田さん）
- **v2.3-b6i（2026-07-25・開店フェーズ 便③=教育接続〔XP10・コイン5種・きろく〕＝⚠️実機確認待ち／deploy済み 821fa63）**: 指示書=`brushup/gamelab-opening-step3.md`（正本）・設計正本=`brushup/gamelab-opening-design.md` §D。§4手当て＝7984894・§1実装=f042913・版上げ=8ce0a4a相当（deploy=821fa63）
  - **★§0 の制約（Chat が事前に警告・確認して回避）**: `growth.js` は `data/monsters.js`→`mon_mori_1.png` の連鎖で **node から読めない**（`Unknown file extension ".png"`・実測で確認）。よって `gamelab/works.js` に素直に import すると、node で走る verify が壊れうる。**verify チェーン9本の import を推移的に全走査した結果、`gamelab/works.js` を読むツールは直接・間接とも0件**（各ツールの根から辿れる src は最大5ファイル）。→ 指示書 §0-1-3 に従い **studio と同じ形（素直に import）を採用**（§0-2 の注入形は不要）。`verify-gamelab.mjs` は実際に単体でも PASS することを実行して確認。★ただし works.js は**ブラウザ専用になった**ので、冒頭コメントを studio/works.js と同じ趣旨へ更新（次に node から触ろうとする人向け）
  - **§1-1 XP**: `growth.js` に `XP.gamelabSave() = 10` を追加（**studio と同額**＝モードで差を付けると「得な方だけやる」誘因になるため）。**新規作品の初回保存のみ**
  - **§1-2 コイン**: `COIN.gamelab = { first:15, works5:20, works10:30, firstOperable:15, firstClear:15 }`。**後半2つが こうぼう固有**（studio の firstNest/firstCast3 では「人が操作するものを作った」「勝ち負けを設計した」を拾えない）。判定=`firstOperable` は **`workUsesAnyType(work, ["dpad","tapMove"])`**（`studio-blocks-defs.js` に新設・**容器の中まで再帰的に探す**・node安全）／`firstClear` は `work.gameConfig?.clear?.type !== "none"` を**全段オプショナルで**辿る（`gameConfig` は store.js の presence ガード付きで載るため無い作品がある）
  - **§1-3 保存先の分離**: `gamelab.milestones`（`studio.milestones` と別）。`storage.js` の既定に `milestones: {}` を追加＋**`SCHEMA_VERSION` 7→8**（b5g で studio.milestones を足したときと同型）。既存セーブは2階層デフォルトマージで自動補完＝**移行コード不要**。付与側にも `gamelab.milestones || (= {})` の自己修復あり
  - **§1-4/1-5**: きろく=`profile.log[今日].gamelab` を新規保存のみカウント／空作品ガード=`sceneNonEmpty` が偽なら XP・コイン・きろくすべて対象外（studio と同じ）
  - **検証の追加（`tools/test-roundtrip.mjs`）**: ①milestones 込みの完全往復 ②gamelab の無い旧セーブに `{works:[],draft:null,milestones:{}}` が補完される ③**b5u〜b6h 世代（gamelab はあるが milestones なし）にも補完される** ④**studio の達成が gamelab.milestones に漏れない** の4本。CLAUDE.md の「セーブ項目を増やしたら往復試験に足す」に従った
  - 検証: **verify 9本全PASS（`--update` なし＝`tools/studio-baseline.json` の git 差分ゼロ＝DEFS29・トレース732イベント・パス98本 1バイト不変**＝付与ロジックのみで DEFS に触れていないことを機械確認）・本番 b6i（`index-DRwRA-32.js`）配信＋版表示 v2.3-b6i を確認・コンソールエラーゼロ
  - **ブラウザ実測（付与ロジックを実モジュールで直接駆動・6ケース）**: ①1本目（そうさ無し・クリア`none`）→ `{xp:10, coins:15, hit:["first"]}`＝**`clear:"none"` では firstClear が出ない**②同じ作品の上書き→**`null`**（付与なし）③dpad＋クリアscore→`{xp:10, coins:30, hit:["firstOperable","firstClear"]}`④3本目 tapMove＋time→`{xp:10, coins:0, hit:[]}`（再付与なし）⑤**`gameConfig` 無しの scene でも落ちない**⑥空作品（きっかけのみ）→`null`。`workUsesAnyType` は単体8ケース（容器2段の中の dpad・chars/stacks undefined 等）で期待どおり
  - **★§6 相互汚染の実測**: studio で5本保存（`studio.milestones={first,works5}`）した profile で **こうぼう1本目→`first` が出た**（`gamelab.milestones={first}`／studio 側は不変）。`log` も `{studio:5, gamelab:1}` で分離
  - **§2 かんせい!演出（実UI）**: みほん「おちものキャッチ」を保存→**「かんせい!」に けいけんち +10／🪙+45／ピル3枚**（はじめての ゲーム・はじめて うごかせる ゲーム・はじめての かちまけ）。2本目「おにごっこ」は **XPのみでピル・コインなし**＝初回だけ賑やかになる設計どおり
  - **§3 exitWorkshop 経路（実UI）**: こうぼうで保存→◀マップへ→**ヘッダーのコインが 0→45 に更新**（App state が storage の最新で置き換わった）・相棒 **Lv1→Lv3**・さらに **「⚔️ バトルが あそべるように なったよ！」のトーストが発火**してマップのバトルが解錠。便②で通した経路が本便で初めて意味を持つことを確認
  - ★申し送り（文言の最終判断）: マイルストーン表示名は `firstOperable`=**「はじめて うごかせる ゲーム」**／`firstClear`=**「はじめての かちまけ」**とした（ピル表示・13px。studio の「はじめての いれこ」等と同じ長さ感に揃えた）。小1に伝わるかは実機ゲートで判断
  - ⚠️次: 神田さんの iPad 実機確認（§6実機ゲート7項目）: ①保存で「かんせい!」にXPとコインが出る②2回目以降の同じ作品ではXPが出ない③じゅうじキー/タップいどうを使った作品で `firstOperable`④クリア条件をスコア/じかんにした作品で `firstClear`⑤マップへ戻るとレベルアップ演出やバッジが出る⑥スタジオの達成がこうぼうに影響しない（逆も）⑦スタジオの付与が b6h と変わっていない。合格後 **便④ ガイド＋BGM**
- 検証体制: `npm run verify` ＝ パズル162面（★3最短＋難易度カーブ）＋クイズ360問（正解一意＋難易度タグ照合＋ループ回数表記禁止）＋ローマ字128件。FAILだと `npm run deploy` で公開されない

### 未完了タスク（backlog・roadmap.md §2 と同期）

1. **実機で継続確認**（大きな刷新が続いたため・各版の⚠️次を参照。**b5w 以前の版の⚠️次は `progland-archive-2026-07.md`**）: **クイズ改修b4u（関所B）**・相棒/たまごサイクル（孵化テンポ `EGG_HATCH_XP=40`・b4s卵欄）・結果シーケンスのタメ（SEQ定数）・バトル入口背景・タイピングのタップ入力・なかまわけ新形式（b4t）ほか b4系一式
2. **メモ06-A Phase2 ナッジ**（タワーのレベル選択の後押し）… 保留（タワーの手応えが実機で落ち着いてから）
3. **クイズ深さ化** … 後回し（必要な帯だけ）
4. **App側進化演出との二重**（結果シーケンスの進化が山場になったので、二重がクドければ「バトル中はApp側を抑制」）… 実機判断
5. **高学年拡張**（未着手・着手前にChatで設計）: 帯B 変数・イベント／帯C 自由制作・デバッグ・コード橋渡し
6. **ゲームのせってい 再設計**（★設計・モック済み・未実装。b6a の申し送りが版エントリ内にしか無く、アーカイブ移動で消えるためここへ移設 2026-07-25）
   - モック: `brushup/gamecfg-mock1.html`（現行／案1 ルールカード／案2 めじるしタイルの比較・**案1 採用**）／`brushup/gamecfg-fit-sim.html`（右カラムの縦予算シミュレータ・1画面に収まるか判定つき）
   - ⚠️ 未決2件: ①**背景の方針**（案あ 遠景＋床2層／案い 新規生成／案う 無地）②**縦予算**（下記のとおり当時より悪化）
   - ⚠️ **縦予算の再計算が必要**: シミュレータは じゅうじキーが無かった頃のもの。現在は `.dpadbox` 約144px（上演中・操作可能キャラがいるとき**通常画面にも出る**）＋ こうぐだな 24%→21%（b6a）でプレビュー約+12px。**当時の案1Cでも収まらない**。有力案＝**「上演中は `.gamecfg` を隠す」**（b6c で全画面に対してやったのと同じ理屈・追加UIが要らない）

### 次の一手

1. **神田さんの実機確認**（上記1の一覧）→ FBに応じて定数1箇所ずつ微調整
2. 更新の出し方: `npm run deploy` 一発（verify→build→docs/→push。devサーバは止めてから）。文書のみのコミットは手動 `git push origin main` まで
3. 調整値の場所: 経験値・レベル曲線・孵化=`src/growth.js` ／ バトル=`src/data/battle.js` ／ 結果シーケンス=`Battle.jsx` SEQ ／ クイズ生成=`tools/quizgen.mjs`（N・NAKAMA_ODD）＋素材=`tools/quiz-data.mjs` ／ パズル生成基準=`tools/criteria.mjs` ／ 島拠点座標=`Puzzle.jsx` ISLAND_POS ／ クイズひろば座標=`Quiz.jsx` PLAZA_POS

### ファイルの地図

| ファイル | 役割 |
|---|---|
| `progland-実装指示書.md` | **指示書の正本（第2版・2026-07-04改訂）**。第1版はgit履歴。承認なしに編集しない |
| `worldmap-指示.md` | P2追補: 島マップ1枚絵化の指示（親: 実装指示書） |
| `worldmap-難易度別-指示.md` | P2追補2: 難易度別マップ背景（昼/夕/夜）の指示 |
| `icon差し替え-指示.md` | P3追補: 絵文字→オリジナル画像差し替えの指示 |
| `icon_typing差し替え-指示.md` | P4追補: タイピングアイコン差し替えの指示 |
| `src/data/howto.js` | 各モード・島・カテゴリの「あそびかた」説明文 |
| `src/components/HowTo.jsx` | あそびかた折りたたみ部品（A4で既定閉じ＋「おしてね」誘導） |
| `src/components/blocks.jsx` | 積み木ブロック風の命令ブロック（パレット＋命令枠共通・くりかえしC字形・A5でパレットhighlight追加） |
| `tools/curve.mjs` | 難易度カーブ検証（par単調・段差・新概念1つずつ・verify統合） |
| `tools/curate.mjs` | 選抜つき生成（プール→par分布追従の均等選抜）＝量産の核 |
| `tools/solve.mjs` | ソルバー（最短par＋最短解sol抽出・メモ化） |
| `tools/gen-moshimo-easy.mjs` | もしも easy 9面の段階設計生成（A5）。`moshimo-段階設計-案.md`=承認済み設計 |
| `tools/gen-staged.mjs` | **段階設計セルの正本ジェネレータ（A6）**: 島3normal/hard・島4全・島5全の8セルを再生成（導入面＋回数キャップ＋parランプ）。⚠️`generate.mjs --write`全再生成は段階設計を失うので使わない |
| `src/data/badges.js` | バッジ26個の定義と自動判定（P5）。追加はここに `check(save)` を足す。既存IDは消さない（獲得済みは和集合で保持） |
| `tools/test-roundtrip.mjs` | 書き出し/読み込みの往復試験（localStorageシム）。セーブ項目を増やしたら必ずここに検証を足して実行 |
| `p6-battle-shop-設計.md`／`p6-実装指示書.md` | P6の設計正本と実装手順（フェーズ1/2/3・停止ポイント） |
| `バトル演出-指示.md`／`画像対応.md` | P6追補: 演出フルセットの指示（フェーズ1.5）／敵9体・アイコンのファイル対応表 |
| `src/data/battle.js` | バトル設定の集約（敵9体・HP・かいしん率・XP・コイン/アイテム定義）。数値調整はここだけ |
| `src/components/Battle.jsx` | バトル画面（選択→シーン演出→勝敗）。演出はCSS keyframe＋段階制御 |
| `src/components/ParentGuide.jsx` ＋ `src/data/parent-guide.js` | 「おうちの方へ」モーダル（A7で全モード展開: パズル島1〜6・クイズ5カテゴリ・タイピング・おえかき）。**`src/data/parent-guide.js` が唯一の正本**（Chat原稿は取り込み済みで削除。キー名は原稿flow/stage1-3→実装yomitori/kotoba等に変換済み） |
| `quiz-書き起こし基準.md` | クイズ素材の人手作成基準（P6e以降は `tools/quiz-data.mjs` の素材に適用） |
| `tools/quiz-data.mjs` | クイズ素材の正本（因果チェーン・なかまわけタグ辞書・絵文字プール・フロー素材）。問題を増やす＝ここに素材を足して `node tools/quizgen.mjs --write` |
| `project-charter.md` | 設計書: 案件憲章（Chat側作成） |
| `education-curriculum.md` | 設計書: 学習カリキュラム設計（Chat側作成） |
| `roadmap.md` | 設計書: ロードマップ（Chat側作成） |
| `feature-spec.md` | 設計書: 機能仕様（Chat側作成） |
| `progland-handoff.md` | 本台帳（引き継ぎの入口はここ1本） |
| `progland-archive-2026-07.md` | 台帳アーカイブ（**b4e〜b5w の45版ログ**・2026-07-24分割。⚠️過去の記録＝現在の計画ではない。通常セッションでは読まない） |
| `progland-handoff-archive.md` | 台帳アーカイブ（b4d以前の版ログ・過去フェーズの教訓。⚠️過去の記録＝現在の計画ではない） |
| `CLAUDE.md` | Code用の案件前提・固有注意 |
| `brushup/` | **ブラッシュアップ設計パックの新規ドキュメント**（2026-07-06振り分け）。実装の波の地図=`03_code_guide_by_wave.md`（波ごとの使うファイル＋指示文）・`01_roadmap_implementation.md`・`02_handoff.md`、新規実装指示=memo04(おうち部屋)/memo05(ショップ)/worldmap_home_design。配置経緯は`brushup/_配置メモ.md`。※P6等の重複.md9本は既存日本語名ドキュメントが正本のため取り込まず |
| `brushup/shop_dressup/dressup_asset_baseline.md` | **着せ替え・アイテム作成の恒久基準**（画風・後処理・確定アンカー・微調整目安。実装値の正は`dressup.js`。§8=プロンプトファイル一覧）。同フォルダに生成プロンプト原本9点＋レイヤー図を収載（2026-07-08・原本は`~/progland-brushup/20260707_shop_dressup/docs/`）。⚠️恒久文書を`docs/`に置かない（deploy毎に`rm -rf docs`で消える）。★ベース人物は`character_base_prompts.md`=初期試作(無地・不使用)／`adventure_base_prompts.md`=探検家基本形2体(実採用・Chat復元)／`backpack_variant_prompts.md`=リュック4体、の3本に分かれる |
| （保管・リポジトリ外） | メモ08/09の統合待ち.js（`art_guide_revised.js`=第4波おえかき・`parent_intro.js`=第2波③理念文・`parent_guide_full.js`=参考）は `~/progland-brushup/js統合待ち/` に保管（Downloads一括削除の対象外・リポジトリ外）。波が来たら統合。新規画像 room-home.webp/shop-interior.webp は `src/assets/` へ配置済み |
| `programming-land.jsx` | v1移植元。参照専用・編集しない |
| `src/data/` | ステージ・クイズ・おえかき・バッジのデータ（ハードコード禁止の受け皿） |
| `src/engine.js` | パズル実行ルール（UIとソルバーの共通仕様） |
| `src/storage.js` | localStorage保存・プロファイル管理・書き出し/読み込み |
| `src/version.js` | バージョン表示（リリースごとに手で上げる） |
| `tools/verify.mjs` | ステージ全数検証ソルバー（`npm run verify`） |
| `docs/` | ビルド成果物（Pages配信元。`npm run deploy` が自動生成） |


### 決定事項（要点。詳細は指示書第2版を参照）

- [DECISION] Vite + React 静的ビルド。**配布はGitHub Pages公開**（2026-07-04に単一HTML配布から変更）。アカウント kanda-houtokukai・無料・push→Actions自動デプロイ・アプリ内バージョン表示
- [DECISION] **マルチプロファイル最大4人**。記録・相棒・バッジは人ごとに完全分離、書き出し/読み込みもプロファイル単位
- [DECISION] **育成ゲーム化**: オリジナルモンスター（実在IP禁止・自作SVG）。相棒3体から1体→経験値→3段階進化。島マップ・ずかん・クイズバトル（P6）
- [DECISION] 難易度3段階を全モード共通。記録は難易度別、解放条件は難易度内で完結
- [DECISION] フェーズ再編（第2版）: P0きばん → P1そだてる基盤 → P2パズル増量＋島マップ → P3クイズ増量 → P4タイピング → P5きろく・バッジ・ずかん拡張 → P6クイズバトル。**以後フェーズは番号＋名前で呼ぶ**
- [DECISION] P2ステージは手作業で作らず、ジェネレータ＋ソルバー自動検証（`npm run verify` 全数PASS）で量産
- [DECISION] やらないこと: オンライン対戦含む通信機能・広告・外部連携、サーバ・DB（拡張余地のみ残す）、実在キャラ素材/名前、UIトーン刷新
- [DECISION]（2026-07-08・メモ06-C）**コインは「進歩したぶんだけ」＝周回では増えない設計**。クイズ/バトル/タイピングも、パズル同様に new-best／初撃破／初クリアのみ付与へ統一（満点クイズ再挑戦=0・討伐済み敵の再戦=0・タイピング非更新の再挑戦=0）。日次上限は今回入れない（周回が止まるため）。将来アイテム増で稼ぎが不足したら**健全な順**に: ①新アイテムに新しい稼ぎどころ（新モード/新ステージ＝新★・初クリア）を一緒に付ける（憲章§4-9）→②既存マイルストーンの単価を上げる（`growth.js` の COIN 1か所）→③おえかきの日次上限を上げる（＝日次収入増・上限付きなので青天井にならない）→④最終手段: 進歩ベースを一部ゆるめる場合も「1日1回だけ再挑戦でコイン」等、必ず日次上限とセット。★**禁止**: 「周回で無制限に稼げる」に戻すこと。上限“付き”で増やすのはOK、上限“無し”に戻すのはNG


### 生きている注意事項

- ★ **文書のみのコミットは push されない**（push は `npm run deploy` が唯一の通常経路のため、docsだけのコミットはローカルに滞留する）。文書コミット後は必ず `git push origin main` まで実行し、raw URL で反映確認（2026-07-08、正本4ファイル差し替えコミットが未pushで版ズレ再発しかけた教訓）
- ★ **「プロジェクトナレッジ（Claude.aiプロジェクト）」と「リポジトリ（ローカル＋GitHub）」は別の入れ物で、自動同期しない**。両者の一致は手動（神田さんがプロジェクトナレッジへ手で配置）で保っている。2026-07-08の版ズレの真因は上記「文書のみのコミットのpush忘れ」＝リポジトリ内部の話であって、プロジェクトナレッジとの取り違えではなかった（プロジェクトナレッジは最初から07-07版で、GitHub版とbyte一致を確認済み）。この2つは別物、と前提を明記して混乱を防ぐ。なお Chat は raw.githubusercontent.com で GitHub の実ファイルを読め、プロジェクトナレッジ版との差分照合まで可能（版ズレ調査の手段）
- ★ dev サーバ稼働中に `npm run build` しない（ビルド破損の既知事故と同型）
- ★ AudioContext はユーザー操作後に初期化（v1は対策済み・踏襲）
- ★ 保存データはバージョン番号つき、`{...newSave(), ...parsed}` のデフォルト値マージ。形式変更時はマイグレーション同梱
- ★ プレビュー成功≠完成。フェーズ完了時は公開URLで実機確認（PC Safari＋タブレット）。Pages反映はpush後1〜2分・シークレットウィンドウで確認
- ★ セーブスキーマは相棒・経験値・ずかん・難易度別記録をP0から予約しておく
- ★ **向きの判定は CSS `@media` のみ。JS の向き検出（`matchMedia`／`ResizeObserver`／`orientation`）は使わない**（b4b の matchMedia 誤発火・b4l の ResizeObserver 不発火＝b5a で確立。バトルの横画面2カラム〔landscape かつ 820px以上〕が現行仕様）
- ★ **こうぼう/スタジオの「手触り」定数は `geometry.js` に集約。プロトタイプ由来の値を勝手に変えない**（磁石78/1.3/140・隙間180ms cubic-bezier(.25,.9,.35,1.25)・吸着110ms・掴み2.6deg/1.05・着地200ms＝b5d の移植基準。※チップは b5w で `G.CHIP` 34→30・`ICON` 26→24 に是正済み）。変更したら実機ゲート必須
- ★ **検証環境の癖**: プレビューペインが非描画だと rAF／setTimeout の拍が止まり、「音量が0のまま」「キャラが動かない」ように見える（b5k/b5l/b5r で観測・**実機フォアグラウンドでは起きない**）。ペインを前面にするか rAF を自前ポンプしてから判定する。dev サーバの接続断→自動リロードで `location.hash` が落ちることもある（開発環境事象・本番Pagesは無関係）
- 中間報告ポイント: P0完了時・P1完了時・P2ジェネレータ＋ソルバー完成時（量産前）・各フェーズ完了時

### 今も効く教訓（過去フェーズから集約。詳細はアーカイブ）

- ★ 背景＋%座標オーバーレイは「imgに高さを決めさせる」方式（display:block/width:100%/height:auto）が堅牢。`aspectRatio+cover` は幅依存でズレる（b2c）
- ★ ランダム選択・状態参照はコールバック/ループの外で1回（filter内のpickで毎アイテム再抽選=b4t／連打時のstale closureで上限超過=b3h／Reactのkeyに`Date.now()`はコンポーネント作り直し=P4）
- ★ 生成コンテンツは「機械が解けるか」だけでなく「人が図から一意に読めるか」も基準化（くりかえし図の回数表記禁止=P4後）
- ★ 部分改修は専用スクリプトで該当セルだけ差し替える（共有RNGの全再生成は下流まで変わる）。展開の前にまず診断して対象を絞る（A5/A6）
- ★ parは概念的な重さを表さない。重い入口は導入面（teach:true）で開ける（A5）
- ★ 実素材を見てから実装方法を確定する（robot.png回転の撤回=P3／透過素材は配置前にbbox確認=b4a）
- ★ 背景＋%座標に絵を置くときは**底基準アンカー**（bottom基準）で足元を地面に乗せる。中心アンカーは浮く（b3zの罠→b5b もりのシーンで確立）
- ★ **CSS の `width:100%` は img の inline width に負ける**。寸法をCSSに任せたい場所には inline size を渡さない（`.fitArt`／MonsterArt `size=null`＝b4f）
- ★ **TDZ でマウント時に白画面**（consoleは error boundary 警告のみで原因が出ない）。宣言より前を参照しないこと＝useEffect の deps に後方宣言の変数（b4n）／テンプレートリテラル内で参照する定数（段階3）。挿入位置は宣言順を守る
- ★ 一発アニメ（拒否のプルッ等）は React state 経由だと不安定 → `remove`→reflow→`add` の DOM 直接操作にする（b5d）
- ★ `git add -A` の巻き添え混入に注意＝add前に `git status`（zip混入=P3）
- ★ GitHub Pagesのデプロイはときどき失敗する→空コミットをpushして再デプロイ（P0）
- ★ バッジ等の獲得判定は「和集合」で保持（構成変更で獲得済みが消える事故防止=P2）
- ★ スキーマ移行を伴う変更は roundtrip に移行ケースを足して機械確認（b4f/b4j）
