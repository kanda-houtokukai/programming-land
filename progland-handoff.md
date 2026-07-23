# プログラミングランド v2 — 台帳（handoff）

最終更新: 2026-07-23（**v2.3-b6b 段階3 区切り①=dpad＋tapMove＋そうさカテゴリ＝deploy済み・⚠️実機確認待ち**。b6a まで実機OK。次=①b6b の実機確認→合格で②段階3 区切り②（goal＋chase＋fall）。段階3=`brushup/gamelab-implementation-stage3.md`＋差分メモ `brushup/gamelab-stage3-addendum.md`）

> 過去の版ごとの詳細ログ（v2.3-b4d 以前）・過去フェーズの教訓の詳細は `progland-handoff-archive.md` へ（読むのは必要なときだけ）。

---

## 現在地サマリ（毎セッション冒頭にここだけ読む）

### 今どこか

- **公開URL: https://kanda-houtokukai.github.io/programming-land/**（リポジトリ kanda-houtokukai/programming-land）
- **設計書の版**: `feature-spec.md`・`roadmap.md` とも **b5h 時点へ追随済み**（2026-07-18・feature-spec に §10 つくるスタジオを新設＋§1/§2/§7-2/§9 を追随・roadmap を b5h 現在地へ全置換）
- **新モード「ゲームこうぼう」設計確定（2026-07-19・帯B着工）**: 正本=`brushup/gamelab-design.md`。スタジオとエンジン共有・勝ち負けあり（スコア=変数・柱⑤初実装）。段階A=完了（b5s）・段階1=完了（b5u）・こうぐだな共通修正=完了（b5v）・段階2=完了（b5w）・**b5x〜b6a=実機OK → 段階3 着手**。段階3=新カード7枚（`brushup/gamelab-implementation-stage3.md`＋差分メモ `brushup/gamelab-stage3-addendum.md`・基準モック=`brushup/palette-29-structure.html`・`brushup/dpad-play-mock.html`）。**区切り①（dpad＋tapMove＋そうさカテゴリ＋短縮ラベル）=完了（b6b・deploy済み・⚠️実機確認待ち）**／次は②区切り②（goal＋chase＋fall）→③こうぐだな29種再構成＋みほん3本→【3-B】④jumpable→⑤clone＋よこスクロール。指示書=段階A `stageA.md`・段階1 `stage1.md`・段階2 `stage2.md`・UI刷新 `palette-ui-overhaul.md`（正本・操作基準=`palette-mock2.html`）・段階3 `gamelab-implementation-stage3.md`（すべて brushup/）。
- **v2.3-b5x（2026-07-22・こうぐだな＆エディタUI刷新=2列・ながおし・せつめい＝実機OK・神田さん実機確認合格／deploy済み aa66929）**: 指示書=`brushup/palette-ui-overhaul.md`（正本・操作基準=`palette-mock2.html`＝実装前にブラウザで全挙動を確認済み）。**[DECISION] §7=神田さん判断で「studioの見た目も2列に揃える」**（操作と見た目はセット・棚描画1系統化。studioの茶の世界観・色はそのまま）。区切り①=f69462b・②=1046625・③=b978d8b（deploy=aa66929）
  - **①データ層**: DEFS全23種に short（=label流用）/long/desc（§6の表を一字一句）。ベースライン再取得＝変更はlabel/long/descのみ＋段階2カード3種の焼き込み（既存パス91本は1バイト不変・**トレース732イベント不変**を機械確認）
  - **②2列＋%レイアウト**: `.palscroll` 新設（scrollbar-gutter:stable・5pxバー・スクロールは棚の中だけ）・カード幅=floor((clientWidth−8)/2)・カテゴリ見出しタップ開閉（初期: みため/おと閉）・棚=みじかい名前のみ/ピルなし/縮尺0.76/fitFont自動最大化（上限16px・webフォント確定後再計測）・こうぐだな24%/作業・プレビュー半分ずつ・GAMELAB_PALORDERを頻度順へ（studio PALORDERは現行順・色分岐維持）
  - **③ながおし操作（tap-to-copy廃止）**: 150ms成立（scale1.14＋ふきだし=long+desc・押している間だけ）→6px超でドラッグ（ゴースト棚0.76→作業エリアで等倍＋hotdrop発光）→内で置く「おいたよ！」/外で「とりけし」（dropLastSnapshotでundo履歴無傷）・成立前7px超=pan-yスクロールに譲る・pointercancel全中止・タップは初回のみヒントトースト・プルッ拒否はドラッグ確定時
  - ★実装判断: 作業エリアの縮尺は§2の98%でなく**従来1倍のまま**（2%差より§11凍結値〔磁石78等〕の保護を優先・実機で気になれば調整）／せつめい文の新カード7枚ぶんは段階3で追加
  - 検証: verify 8本全PASS・回帰GREEN・ブラウザ実測=studio/gamelab両方で 2列（gamelab 23枚・studio 18枚）・開閉・スクロール・§5全状態遷移（タップ無効/ながおし/スクロール譲り/2段階ゴースト/置く/取り消し/プルッ/undo履歴無傷）・コンソールゼロ
  - ✅実機確認合格（2026-07-22・神田さん）。FB3件（棚カードのごちゃごちゃ感・作業エリアのカードが大きく空白あり・見出しが小さい）→ 微調整 b5y で対応
- **v2.3-b5y（2026-07-22・こうぐだな＆作業エリア微調整＝b5x実機FB反映＝実機OK・神田さん実機確認合格〔2026-07-23・b5z とまとめて〕／deploy済み 02e4bfa）**: 指示書=`brushup/palette-ui-tuning.md`（正本）・基準モック=`brushup/palette-mock3.html`（3つのつまみで確定値が初期値・実装前にブラウザで挙動と数値を確認済み）。**studio/gamelab 両方に適用**（b5x §7 決定の継続）。中間①=7c055ff・②=2ad90cf・③=79dda2b（deploy=e5f7d5c→版上げ 02e4bfa）
  - **①こうぐだなの余白（§1）**: カード幅=`floor(full×0.92)`（full=従来の「ぴったり2列」幅）。slack=実はば−幅×2 を `unit=max(4,floor(slack/3))` として `.glcards` の gap＋左右padding に均等配分＝両端と列間に余白。2列維持・fitFont据え置き（幅が縮むぶん文字は自動で少し小さく）。実測: palscroll302→カード135/unit10・studio 267→118/10
  - **②作業エリアを小さく＋空白除去（§2）**: **[DECISION] 方針A採用**（自動幅）。`StudioBlock` に `cardW(b)`（=LABELX46＋ラベル文字幅＋(ピルあれば gap7＋ピル幅)＋右14・下限96・論理px）を新設し、**描画と当たり判定（overlap/ghost/つかみ位置）で共用**＝b5x で残っていた長い名前カードの右空白を根絶（例 ランダム 206→118論理・タップされたら 200→160）。縮尺は `.asm-scaled`（`transform:scale(0.86)`・`transform-origin:0 0`）で**ブロック層だけ縮小**し、`asmPos` を `/CANVAS_S` で論理座標へ戻す＝**G.SNAP=78・保存座標 stack.x/y・パス幅は論理pxのまま凍結**（磁石・接続の当たり判定は不変）。ピル値エディタ(pop)は画面座標のままラッパー外＝指の当たりを維持。fly は棚→作業で 0.76→0.86（`scale(PAL_S/CANVAS_S)`）
  - **③見出しを押しやすく（§3）**: `.glsec-h` に `min-height:34px`＋`border-radius:8px`＋`padding:0 4px`＝押せる範囲を拡大。押下ハイライト studio=`rgba(255,244,220,.14)`／gl=`#e4eaf2`（モック準拠）。**文字サイズ・色・区切り線・ドットは不変**（「極端に変えない」を厳守）・開閉トグルは従来どおり
  - ★重要判断: **ベースライン再取得は不要だった**。方針A＋CSS transform が DEFS/geometry.js/engine を一切触らないため、`npm run verify` が `--update` なしで全PASS＝ジオメトリベースライン（パス98本・DEFS23種）も**エンジントレース732イベントも1バイト不変**を機械確認（指示書§5は「縮尺・幅が変わるので再取得必要」と想定していたが、実装方式で回帰GREENを保てた）。定数=`PAL_GAP_RATIO=0.92`・`CANVAS_S=0.86`（WorkshopEditor 冒頭）
  - ★発見（スコープ外・別タスク起票済み）: bumpTarget のピルが相手名でなく cid（「c2」）表示＝`targetName` が `StudioBlock` に未伝達の既存バグ（stage2/b5w 混入と推定）。今回は表示を変えず cardW を cid 基準で一致させた（表示修正は別便）
  - ✅実機確認合格（2026-07-23・神田さん・b5z とまとめて）: 余白・86%縮小・見出し34px＝OK
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
  - ⚠️次: 神田さんの iPad 実機確認（stage3 §5ゲート①: じゅうじキーで**もっさりせず**動く〔拍を待たない＝実機の手触りが要〕・押しっぱなしで連続移動・全画面でも出る／タップいどうが背景タップで動く／studio 無変化）。合格で区切り②（goal＋chase＋fall）へ
  - 検証: **verify 8本全PASS**（区切り①②③の各後で実行・毎回 732イベント不変）・**ブラウザ実測（dev）**=①studio/gamelab とも 2列で余白（gamelab 23枚・studio 18枚）②`.asm-scaled` scale 0.86・作業エリアのカードが内容ぴったり幅（screen幅=論理×0.86）③見出し全6/5個 34px・開閉トグル動作・押下色④**合成ポインタで実ドラッグ接続を検証＝gamelab「みぎへ」を既存スタックに接続成功／studio「はた▶」→「みぎへ」接続成功**＝縮尺変更後も磁石・接続が効く⑤コンソールエラーゼロ・本番URLで b5y バンドル配信確認
  - ⚠️次: 神田さんの実機確認（§5 ゲート iPad横+PC・studio/gamelab 両方）: ①こうぐだなが2列のまま余白で詰まって見えない②作業エリアのカードが小さく「はた ▶」「みぎへ」「おと」に右の空白がない③**ブロックの接続（磁石）が従来どおり効く**（縮尺の影響なし＝当たり判定の「反応する距離」が体感で狭すぎないか）④見出しが押しやすい／見た目は b5x と変わらない⑤ながおし・ドラッグ・スクロールは b5x のまま。合格で**段階3**へ
- **v2.3-b5w（2026-07-21・ゲームこうぼう段階2=ゲーム完成＋エディタ見た目作り直し＝実機OK・神田さん実機確認合格／deploy済み b5854ec）**: 指示書=`brushup/gamelab-implementation-stage2.md`（正本）・見た目基準=`gamelab-editor-mock.html`。スキーマ変更なし（gameConfig の枠は段階1予約分に中身を入れただけ）。中間①=21b614a・②=84e00e3・③=476746e・④=783020e（deploy=b5854ec）
  - **A ゲーム機能**: うごき3種（moveRand=範囲内4方向ランダム／bounce=向きへ1マス・端反転・dir保持／bumpTarget=相手指定ぶつかり・ピルタップで だれか→他キャラ循環）＝GAMELAB_PALORDER 23種化・**スタジオ18種不変**。ばくだんタッチ（gameOver={targetId}・💀キャラ選び）→ざんねん「おしい！ もういちど？」（紙吹雪なし=責めない）。じかんクリア（10〜60秒10刻み・⏱HUD毎拍更新・エンジン静止後も器の時計継続）→けっか「じかん たったよ！」（中立・スコア発表）。クリアなし（■のみ）。せってい=クリア3択セレクタ＋ばくだんトグル/キャラ選び。みほん3本（あつめ/よけ/キャッチ=設計§5全レシピ・キャッチはbumpTargetでスライムだけ点+きのこは はねかえるダミー）。全画面プレイ（big中HUD/結果画面・編集UI消灯）
  - **B 見た目作り直し（gamelabのみ）**: GAMELAB_CSS=`.studio-root.gl` オーバーライドのみ＝**studioに1pxも影響しない**。こうぐだな=枠なし・ジャンル見出し1回・自動幅・実寸凸凹カード（#f3f6fa）／キャンバス=淡いドット／ステージ額装＋白カード操作盤／ヘッダー明るいツール調。値はモック初期値=実機微調整可
  - ★実装判断: ①クリアとゲームオーバー同拍成立は**ゲームオーバー優先**（設計に明記なし・「触れたら負け」を守る） ②主人公の移動=「タップされたら→ランダムにうごく」で代替（designの「タップ移動」） ③よけの敵は1体（gameOverが単数指定） ④実測バグ修正=エンジンが同拍中に自然終了すると終了判定がスキップされる→判定をrunningRefガードの外へ（+じかん中の時計継続・時計待ち中の■対応）
  - 検証: **verify 8本全PASS**（エンジン7ケース・verify-gamelab拡張=time/gameOver/target妥当性・みほん3本）・**回帰GREEN**（732イベント不変・studio=gl無し/palgrid/pname18で無変化実測）・ブラウザ実測=乱数固定で敵突進→ざんねん／⏱10→8→けっか＋もういちどで復帰／全画面でbumpTarget発火⭐1／glパレットで横取り出し・プルッ・pan-y動作／コンソールエラーゼロ
  - ✅実機確認合格（2026-07-22・神田さん／b5x と同じビルド上で確認済み）
- **v2.3-b5v（2026-07-21・こうぐだな共通2点修正=チップ干渉解消＋タッチ縦スクロール＝実機OK・神田さん実機確認合格／deploy済み ef2d4a5）**: 指示書=`brushup/palette-fixes.md`（正本・段階1/2と独立の共通修正＝**studio と gamelab 両方に効く**・先行デプロイ）
  - **①チップ干渉解消**: `geometry.js` G.CHIP **34→30**・ICON **26→24**＋`StudioBlock`/パレット描画で `chipY` を **`max(_,9)` クランプ**＝メスのくぼみ底(TD=8)を全ブロックで回避（容器チップ 5→9・通常 7→9・はた14不変）。**★ベースライン再取得（`--update`）実施**: 変化は G.CHIP/ICON・既存15型の chipY・DEFSへの scoreUp/scoreDown 焼き込み（段階1分）だけ。**パス91本・幅・エンジントレース732イベント・ANIM・CHIP_STYLE は1バイト不変**（Python厳密比較で確認＝スタジオ挙動保証は維持）
  - **②タッチ縦スクロール**: `.studio-pal`/`.pal` の `touch-action` **none→pan-y**。`onPalPointerDown` を pointerdown即ドラッグ→**横しきい値確定**へ（`palPendingRef` 新設・グローバル onMove で「横>縦 かつ 横>6px」なら取り出し確定／縦優勢は pan-y でブラウザにスクロール譲る・pointercancel/up で保留破棄）。トリガのプルッ拒否も横確定時に判定
  - ★実装判断: **PCマウスも横しきい値経由**になる（pointerType 分岐なし＝指示書のレイアウト前提「取り出し=横／スクロール=縦」に従う。こうぐだな左・組み立て右なので実用上は横優勢）。実機でPCの取り出し感に難があれば pointerType 分岐を追加。回帰完了メッセージの「DEFS18種」ハードコードを動的化（→20種）
  - 検証: **verify 8本全PASS**・**回帰GREEN**・ビルドOK・ブラウザ実測=チップ全型 y≥9(はた14/通常9/容器9・幅30)／横10pxで取り出し(fly block・スタック0→1)／縦20pxで取り出さず(fly none・不変)／タップ不変／トリガ2本目=プルッ拒否(no・fly none)／**studio・gamelab 両方で成立**・コンソールエラーゼロ
  - ✅実機確認合格（2026-07-22・神田さん／b5x と同じビルド上で確認済み）
- **v2.3-b5u（2026-07-20・ゲームこうぼう段階1=ゲームの器・勝ち筋のみ＝実機OK扱い〔段階2指示書が完了前提〕／deploy済み e61f842）**: 指示書=`brushup/gamelab-implementation-stage1.md`（正本）。**SCHEMA 6→7**（`gamelab:{works,draft}` 既定追加・移行はデフォルトマージのみ=roundtripで機械確認）。中間①=ec73f76・②=254a55c・③=e61f842（deploy）
  - **モード骨格**: `#gamelab-dev` 仮導線（マップ開店は段階3）・GAMELAB_MODE（isGame/gameDefault・カセットだな/ゲーム{連番}）・gamelab/works.js は付与なし薄皮（教育接続は段階3）。共通部品への追加は**すべて mode.isGame ガード＝スタジオ経路に一切入らない**
  - **カード2枚**: scoreUp/scoreDown（かず・きいろ #F6C445・幅206・n 1..5）。GAMELAB_PALORDER 新設（**スタジオの PALORDER 不変**）。engine は `onFx{type:"score",delta}` 通知のみ＝スコア保持・下限0・判定は器（設計§6）
  - **ゲームの器**: gameConfig{scoreShow, clear:{type:"score",param 5〜50}, gameOver:null予約}を open/draft/保存で運搬（store.js は presence ガード=studio のシリアライズ不変）。せっていパネル（トグル＋±5刻み）・スコアHUD（⭐N・▶で0リセット・+でぽよん）・毎拍最後にクリア判定→**おいわい**（紙吹雪12・もういちど=再スタート/なおす=編集へ・showOnlyでは なおす非表示）
  - ★実装判断: ①スコアアイコンは**暫定グリフ**（data URI SVG・card_icon_19/20 未着=指示書許容・支給後は blocks.js の2定数差し替えのみ） ②新規保存の「かんせい!」演出は grant 前提のため段階1は静かなトースト（付与なし=指示書§6の帰結・演出は段階3で教育接続とともに） ③回帰ハーネスのジオメトリ比較を「既存18種の変更削除FAIL/追加許容」に明文化（新カードで物差しが壊れないように・ベースライン不変）
  - 検証: **verify 8本全PASS**（verify-gamelab 新設=gameConfig妥当性込み・エンジンにb5uスコア3ケース・roundtripにgamelab往復+旧セーブ補完・storeにpresenceガード試験）・**回帰GREEN**（732イベント不変）・ブラウザ実測=みほん開く→目標10→5→▶⭐0→タップ+1ぽよん→きえる/でる→**⭐5でおいわい**→もういちど⭐0/なおす→ほぞん（gameConfig込み・ゲーム1プレースホルダ）→かきかけ復元（せってい✕/⭐5込み）→みる=あそぶ専用（なおす非表示・draft不変）・**スタジオ完全無変化**（HUD/せってい非表示・18種）・コンソールエラーゼロ
  - ⚠️次: 神田さんの実機確認（§10ゲート: カセットだな→あつめゲーム→タップ→スコア10でおいわい→もういちど/なおす/■・新規作成→せってい→保存→再入場復元・スタジオ無変化）。合格で**段階2**（うごき3種・ばくだんタッチ・じかん/クリアなし・カセットだな装飾・みほん全部・全画面プレイ）へ
- **v2.3-b5t（2026-07-20・音差し込み=バトル/スタジオBGM接続＋かんせい!ジングル配線＝実機OK・神田さん実機確認合格／deploy済み a73fd15）**: 指示書=Chat支給（加工済み音源3点同梱）。スキーマ変更なし。アセット=battle.m4a(142.9s)/studio.m4a(60.2s)=-19 LUFS・jingle_kansei.m4a(2.35s)=-16 LUFS を `src/assets/bgm/` へ配置
  - **①BGM battle/studio を SRC+TRACK に接続**＝無音マッピング解消・**10曲化**（bgm.js の SRC＋App.jsx の TRACK に1行ずつ=b5j設計どおり。クロスフェード・音量段・ミュートは既存機構がそのまま働く）
  - **②かんせい!ジングル**: bgm.js に `playJingle(key, on)` 一発再生API新設（volume **0.8** 初期値・ループなし・BGMに重ねる=ダッキングなしは指示どおり）。WorkshopEditor の WebAudio簡易ファンファーレ（tone2発）を撤去・sndSnap「パシャッ」は残置。**WorkshopEditor共通配線＝将来こうぼう保存にも自動適用**。ミュート時（musicVol=0）はジングルも鳴らさない
  - ★実装判断: 指示書の `profile.settings?.musicVol` は doSaveWork の実変数 `prof` に読み替え（指示書と実DOMの相違報告の作法）。「verify 6本」は段階A後の**7本**（回帰含む）で実施
  - 検証: **verify 7本全PASS**・build後 docs/assets に battle/studio/jingle_kansei が**ハッシュ付き**で出力（static import有効）・ブラウザ実測=マップ→つくるで **studio.m4a(0.6)**・バトル解放後の入場で **battle.m4a(0.6)**＋home クロスフェード停止／新規保存で **jingle 0.8 がBGMに重なって再生**・上書き=静か（再再生なし）／**🔇で全BGM停止＋ミュート中の新規保存はかんせい!画面のみでジングル無音**・コンソールエラーゼロ（rAFフェードはプレビュー既知事象のため自前ポンプで実測=b5l申し送りの作法）
  - ⚠️次: 神田さんの実機確認（バトル/スタジオBGMの鳴り・音量バランス／ジングルの大きさ(0.8)とタイミング／ミュートで全部止まること）。こうぼう用BGM・他ジングル（しんか/クリア等）・ダッキングは対象外＝後日別便
- **v2.3-b5s（2026-07-19・ゲームこうぼう段階A=スタジオ共通化リファクタ完了＝実機OK／deploy済み 8550d85）**: 指示書=`brushup/gamelab-implementation-stageA.md`。機能追加ゼロ・スキーマ不変。共通部品 src/workshop/（engine/geometry/cast/store）＋WorkshopEditor/WorkshopHome、スタジオ薄皮=studio/works.js+mode.jsx（STUDIO_MODE）。verify 7本目に回帰ハーネス（ベースライン732イベント照合・保存モデル試験・境界スキャン）を恒久追加。★教訓: 自己テストの復元は git checkout でなく sed 逆適用（未コミット編集を2回巻き戻した）。実機合格で段階1（ゲームの器）へ＝新規Chatで指示書から。
- **v2.3-b5r（2026-07-19・実機FB第11便＝実機OK／deploy済み 8728954）**: 指示書=Chat支給（raw実測）。新規アセットなし・スキーマ変更なし。既存 `.mapPage`/`.mapMax`（b5i）を再利用
  - **①お絵描き下部の整理**（Art.jsx）: **①-a** `<ParentGuide>` を最下部へ移動＝並び「ちょうせん→びじゅつかん→おうちの方へ」（他ページと統一）。**①-b** ちょうせんを自前アコーディオン（`challengeOpen` state・**初期閉**・👆おしてね/▼▲・あそびかたHowToと同作法）に置換。**①-c** `ArtSVG` に `fill` prop 追加＝**閉じた形のみ**（`segs.length>2` かつ 始点⇔終点が1マス(G=34)以内）その作品色で `<polygon fillOpacity=.16 stroke=none>` を線の下に。呼び出しは**ギャラリーサムネ/拡大のみ** `fill` 付与（編集画面 grid付きは塗りなし）
  - **②ちからを端末最大化**（Powers/PowerPanel）: `Powers.jsx` 外枠を `maxWidth:640` → **`className="mapPage"`**。`PowerPanel.jsx` の16:9コンテナに **`className="mapMax"` ＋ `--mapReserve:230px`**。木/ラベルは%座標＝コンテナ基準でズレない（マップと同じ堅牢パターン）
  - **③タイピングのプレイ画面を最大化**（Typing.jsx）: TypingPlayコンテナ(L131)を `maxWidth 640→880`。**⚠️指示書の想定と実DOMが相違＝要修正だった**: L131は外枠(L181 `maxWidth:640`)の**子**で、640が上限を張り880が効かない（実測 actualWidth=640のまま）。**外枠を `maxWidth: stage ? 880 : 640` に変更**して解決＝プレイ時880・ステージ選択時640（指示書の「選択画面は対象外＝640」を維持）。指示書のL131=880も残置（自己文書化）
  - 検証: **`npm run verify` 6本全PASS**・ビルドOK・**ブラウザ幅別に実測**＝①下部順=ちょうせん(閉/おしてね)→びじゅつかん→おうちの方へ・アコーディオン開閉OK(aria-expanded)・閉じた四角サムネに `polygon fill-opacity 0.16`(実測)②375px mapMax幅333→**1180px 1055**(16:9維持・木5本%配置でズレなし)③**プレイ画面 1180pxで actualWidth 880**(修正前640)・ステージ選択は640維持。**コンソールエラーゼロ**
  - ⚠️次: 神田さんの実機確認（お絵描き=並び順/ちょうせん折りたたみ/図形の塗り濃さ(.16)や閉じ判定／ちから=最大化とズレ／タイピング=最大化の大きさ(880)）。値(reserve230/上限880/塗り.16)は初期値＝実機で微調整。`fill`外せば塗り即オフ
- **v2.3-b5q（2026-07-19・実機FB第10便追い=1件＝実機確認実質不要・b5p実機OK確認済み／deploy済み 4cb3dd5）**: 指示書=Chat支給（Codeの自発提案を採用）。theme.js 1行のみ・アセット/スキーマ/JSX変更なし。**`@media(prefers-reduced-motion: reduce)` の `animation:none` 群に `.tapPop` を追加**（`.fadein,.softpop,.mapfloat,.growpop,.sparkle,.pulse,.tapPop`）＝b5pの「タップ」バウンド`pl-tapbob`を動き抑制設定でも停止（既存.pulse等と一貫）。止めても色/フチ/大きさは維持＝機能不変。通常設定ではb5pと見た目同一。検証: verify6本全PASS・ビルドOK・CSSOM実測でreduced-motionルールに `.tapPop { animation:none }` 含有を確認・コンソールエラーゼロ
- **v2.3-b5p（2026-07-19・実機FB第10便=2件＝実機OK・神田さん実機確認合格／deploy 0651ee7）**: 指示書=Chat支給（raw実測＋モック承認）。新規アセットなし・スキーマ変更なし＝WorldMap.jsx 2箇所＋theme.js に小クラス1つ。神田さん承認=看板B（白文字＋こげ茶フチ）／副題は「タップ」の文字だけ効果B（オレンジ＋白フチ＋少し大きめ＋やさしくバウンド）・残りはプレーン
  - **①じゅんびちゅう看板の文字を白＋こげ茶フチに**（WorldMap.jsx SIGNS.map の文字span）: `color` を **#fff6e6**（生成り白）、`textShadow` を **#5a3410 の8方向1pxフチ＋やわらか影**に差し替え＝茶板の上でくっきり。他inline（position/left/top/transform/whiteSpace/fontWeight/fontSize=clamp(6px,1.35vw,11px)）は不変・SIGNS両方（flip側も文字はimgの兄弟で正立維持）
  - **②副題の「タップ」だけポップ＋バウンド**（WorldMap.jsx＋theme.js）: 副題を `いきたい ばしょを <span className="tapPop">タップ</span>してね` に（残りプレーン）。theme.js に **`.tapPop`**（inline-block・font-size17px・color #e07a15・#fff の8方向1.5pxフチ・`animation: pl-tapbob 1.6s`）＋ **`@keyframes pl-tapbob`**（translateY 0→-5px→0）。バウンドはtransform＝レイアウト非影響
  - 検証: **`npm run verify` 6本全PASS**（CSS＋文字周りのみ＝engine/roundtrip/typing 影響なし）・ビルドOK・**ブラウザ computed 実測**＝①看板span 2枚 color=rgb(255,246,230)（#fff6e6）・textShadow に rgb(90,52,16)（#5a3410）フチ／②`.tapPop` color=rgb(224,122,21)（#e07a15）・font-size17px・display inline-block・animationName **pl-tapbob**（keyframe定義済み・transform ty が 0→-2.5…と実際に上下＝バウンド動作）。**コンソールエラーゼロ**
  - ✅実機確認合格（神田さん）: ①看板の白文字＋フチの読みやすさ②「タップ」のポップの大きさ・オレンジ・バウンド＝OK。（reduced-motion対応は b5q で追加）
  - 💡自発提案（未実施・Chat判断待ち）: theme.js の `prefers-reduced-motion` ブロック（.fadein/.mapfloat/.pulse 等を animation:none）に **`.tapPop` を含めるか**。含めれば動きを抑えたい端末でバウンド停止＝既存の一貫性。指示書スコープ外のため据え置き
- **v2.3-b5o（2026-07-19・実機FB第9便=2件＝実機OK・神田さん実機確認合格／deploy 386e99a）**: 指示書=Chat支給（raw実測）。新規アセットなし・スキーマ変更なし＝theme.js＋HomeRoom.jsxの微修正のみ。**両方 @media(min-width:700px)＝PC/タブレット限定・スマホ(<700px)は一切不変**。神田さん指示=PC/タブレットで①ずかん・きろくをもう少し下へ②お店の話しかけをもう少し大きく（スマホは全部そのまま）
  - **①おうち ずかん(dex)/きろく(records)ラベルを≥700pxで少し下へ**（HomeRoom.jsx＋theme.js）: FURNITUREラベルspanの className に **`spot-{key}`** を追加＋transform を **`translate(-50%, calc({labelDy}px + var(--labelDown, 0px)))`** に。theme.js `@media(min-width:700px)` に **`.spot-dex, .spot-records { --labelDown: 12px }`**。CSS変数を同一spanに設定→同spanのinline transformが読む構造。既定=スマホは 0px（現状維持）・chestは対象外
  - **②お店の話しかけ選択肢`.paperbtn`を≥700pxで少し大きく**（theme.js）: 既存の shop `@media(min-width:700px)` ブロックに **`.paperbtn { font-size:21px; padding:15px 20px }`**（18→21px）・**`.paperbtn.small { font-size:18px; padding:13px 20px }`**（16→18px）を追記。paperbtnは`.shopOverlay`内＝≥700pxのみ表示＝スマホ不変（スマホは`.shopCard`で別物）
  - 検証: **`npm run verify` 6本全PASS**（CSS＋transform1行のみ＝engine/roundtrip/typing 影響なし）・ビルドOK・**幅別に computed 実測**（同一DOMを開いたまま resize して比較）＝**375px(<700)**: dexラベル transform ty=**16**（labelDy16+0）・records ty=**12**・chest ty=0・`--labelDown`未設定／paperbtn 18px・small16px（＝b5nと不変）。**1180px(≥700)**: dex `--labelDown:12px`・ty=**28**（16+12）・records ty=**24**（12+12）・chest ty=0（不変）／paperbtn **21px/15px 20px**・small **18px/13px 20px**・overlay=grid・cards=none。**コンソールエラーゼロ**
  - ⚠️次: 神田さんの実機確認（PC/タブレット=ずかん・きろくの下げ幅12px／お店選択肢の大きさ21/18px・スマホ=変化がないこと）。値は初期値＝実機で微調整（下げ量はこの1値・大きさはこの2値）
- **v2.3-b5n（2026-07-19・実機FB第8便=2件＝実機OK・神田さん実機確認合格／deploy 3737899）**: 指示書=Chat支給（raw実測＋モック案1承認）。新規アセットなし・スキーマ変更なし＝CSS＋Shop.jsxのレイアウトのみ。分岐は **@media(700px)**（既存 `.artgrid` と同じBP・JS/matchMedia不使用）。神田さん承認=お店スマホ=案1（絵の下に売り場カード2枚横ならび＋やめる小）／PC・タブレットは従来オーバーレイのまま／おうちラベルはスマホ元サイズ・PC/タブレットのみ1.5倍
  - **①おうちラベル`.bubbleLg`をレスポンシブ化**（theme.js）: 基底を **`clamp(8px,1.9vw,12px)`/padding 5px 13px**（＝スマホ=元の.bubbleラベル相当）に戻し、`@media(min-width:700px)` で **`clamp(13px,2.2vw,18px)`/padding 8px 18px**（約1.5倍）。HomeRoomのラベル5箇所は `bubbleLg` 付与済み＝変更不要
  - **②お店front-stageの選択肢をレスポンシブ化**（theme.js＋Shop.jsx）: **<700px=スマホ**＝絵の上にセリフ`.shopSerifPhone`だけ・選択肢は**絵の下**に `.shopCards`（`.shopCardRow`に売り場カード`.shopCard`2枚横ならび＋`.shopCancel`小）＝店主がまるごと見える・左右いっぱいにしない。`.shopCard` は角に小クギ`::before/::after`・min-height66pxで「バトルの どうぐ」も収まる。**≥700px=タブレット/PC**＝従来オーバーレイ`.shopOverlay`（絵の上に3 paperbtn・b5mと同一）を表示し `.shopCards`/`.shopSerifPhone` は display:none。Shop.jsx=旧オーバーレイdivに `className="shopOverlay"`（inline配置削除・中身の serif+paperbtn3つは不変）＋画像コンテナ内に shopSerifPhone＋コンテナ**外**に shopCards を追加。ハンドラ(enter/setTalking/setMsg)は全経路で不変
  - 検証: **`npm run verify` 6本全PASS**（CSS＋レイアウトのみ＝roundtrip/engine/typing 影響なし）・ビルドOK・**ブラウザ幅別に実測**＝375px: `.shopOverlay` display:none／`.shopCards` grid・売り場カード2枚(バトルの どうぐ/きせかえ)＋クギpseudo有・`.shopCancel`有・`.shopSerifPhone` block＝店主まるごと見える／カード「バトルの どうぐ」→itemsサブ画面へ遷移OK・おうちラベル `.bubbleLg` **font-size 8px**(元サイズ)。1180/768px(≥700): `.shopOverlay` grid(3 paperbtn 絵の上)／`.shopCards`・`.shopSerifPhone` display:none・おうちラベル `@media` で **clamp(13,2.2vw,18)** 適用(matchMedia(700)=true・CSSOM実測)＝約1.5倍。**コンソールエラーゼロ**
  - ⚠️次: 神田さんの実機確認（スマホ=お店カード2枚の大きさ/クギ有無/やめるの位置/店主の見え方・おうちラベルの小ささ／PC・タブレット=従来オーバーレイのまま・おうちラベル1.5倍）。色/厚み/角/座標は初期値＝実機で微調整
- **v2.3-b5m（2026-07-19・実機FB第7便=5件＝実機OK・神田さん実機確認合格／deploy c8f5b4f）**: 指示書=Chat支給（raw実測＋モック承認済み）。スキーマ変更なし・新規画像アセットなし（吹き出し/ボタンはCSS）。神田さん承認事項=木枠＋羊皮紙・三角なし／お店ボタンも同じ羊皮紙／おうちラベル約1.5倍／お店ボタン横の絵文字削除／タイピング+75
  - **①吹き出しを木枠＋羊皮紙・三角の尾なしに全面刷新**: `theme.js .bubble` 本体を差し替え・`.bubble::after`/`::before`（三角2枚）を**削除**（継ぎ目/ズレ/文字沈みの原因を撤去）。単一クラスなのでHomeRoom家具ラベル＋Shop吹き出しが1箇所で直る。border 3px #7a4f22・radius 8px・羊皮紙グラデ＋内側ハイライト。font-sizeは各使用箇所が持つ（未指定）
  - **おうちラベルだけ1.5倍**: `theme.js .bubbleLg { font-size: clamp(12px,2.85vw,18px); padding:8px 18px }` 新設。`HomeRoom.jsx` のラベル5箇所（家具map/あいぼう/たまご/プロフィール）を `bubble pulse bubbleLg` に＋各inlineの `fontSize` 削除（bubbleLgが持つ）。他style(position/transform/marginBottom/animationDelay)は維持
  - **②お店front-stageを羊皮紙ボタン化＋絵文字削除**: `theme.js .paperbtn`（＋`.small`/`:active`）新設＝冒険地図の掠れ紙・厚み(0 3px 0)＋押下でtranslateY(3px)。`Shop.jsx` の `{talking&&…}`（b5l浮遊ボタン）を `paperbtn` 3択に置換＝「バトルの どうぐ」「きせかえ」「やめる(small)」・🧃🎩削除・セリフは`.bubble`。items/dressupサブ画面のボタンは対象外
  - **③スタジオみほん棚の光る演出を削除**: `StudioHome.jsx` L229 の `+(firstVisit?" sparkle":"")` を撤去＝`className="film"`固定。`@keyframes shSparkle`＋`.film.sparkle .film-frame`（枠グロー脈動）を削除。「端末で大きくなったり小さく見える」の正体。誘導テキスト `.sh-hint`「みほんを ひらいてみよう」は残す
  - **④下書きが保存後も棚に残るバグ修正**: `StudioEditor.jsx` `doSaveWork` 末尾の `scheduleDraft()`（保存直後に現シーンを下書きへ書き戻し）を **`prof.studio.draft=null; clearTimeout(draftTimerRef); saveProfile(prof)`** に置換。加えて `writeDraft` に「開いているのが保存済み作品(origin.type=="work")で中身が同一(JSON一致)なら下書きを作らない/既存draftをnull化」ガードを追加＝離脱フラッシュ(L449/L1048)でも書き戻さない
  - **⑤タイピング出題+75**: `data/typing.js` の3配列末尾に追記＝kotoba+40/tanbun+20/bunshou+15（合計75→150相当）。全ひらがな・両ローマ字方式で完走可能。`verify-typing` の完走チェックが最終ゲート
  - 検証: **`npm run verify` 6本全PASS**（パズル162面/クイズ612問/タイピング**203件**/スタジオ4本/エンジン単体/roundtrip）・ビルドOK・ブラウザ実測=①`.bubble`は`::after/::before` content:none＝三角撤去・border 3px rgb(122,79,34)・radius8px・おうちラベルにbubbleLg適用(実測)②`.paperbtn`3択・**絵文字なし(実測)**・font18/16px・「バトルの どうぐ」→itemsサブ画面へ遷移OK③`.film`に`.sparkle`無し・film-frame animation-name=none・sh-hint保持④**実保存フローで storage 検証**＝ほぞん後 works=1「さくひん1」・**draft=null**／たなへ離脱後も draft=null維持（書きかけ棚が出ない）⑤203件PASS・**コンソールエラーゼロ**
  - ⚠️次: 神田さんの実機確認（①吹き出しの木枠色/掠れ/角/影・おうちラベル1.5倍の大きさと位置②お店ボタンの紙質と厚み③みほん棚の光り無し④下書き保存で消えること⑤出題数の体感）。色/線/影/座標は初期値＝実機で微調整
- **v2.3-b5l（2026-07-19・実機FB第6便=b5kの追い込み4件＝実機OK・神田さん実機確認合格）**: 指示書=Chat支給（raw実測）。スキーマ・アセット変更なし＝座標/CSS/定数/レイアウトのみ
  - **①看板2枚目を1.5pt「2時」方向へ**: `WorldMap.jsx SIGNS[1]` を (46,30)→**(47.3, 29.25)**（AREASの2時換算 単位ベクトル≈(+0.86,-0.50)/pt×1.5pt）。flip/位相は不変・1枚目(69.5/34.13)不変
  - **②お店の会話を「絵の上に浮かぶ中央寄せボタン」に**（b5kの塗りつぶし56%パネルを撤去）: `Shop.jsx` 会話ブロックを bottom4%・**width min(340px,82%)**・背景/borderなし・中央寄せの浮遊ボタン群に。セリフは小さな`.bubble`1つだけ。「はなしかける」は会話中消灯（既存維持）
  - **③画面フェードを延長**: `theme.js .screenIn` を .32s→**.7s**＋keyframeに頭22%の"間"（`0%{0} 22%{0} 100%{1}`）＝背景が一瞬見えてから現れる「ロード感」。おうちモーダルは従来
  - **④音量レンジ拡大**: `bgm.js BGM_LEVELS` を [0,0.2,0.35,0.5]→**[0,0.12,0.35,0.6]**（隣接 約+9dB/+4.7dB＝はっきり分かる差。大0.6は旧既定0.5より少し大きい）。配線はb5kで正常＝この4値のみ変更
  - 検証: verify6本全PASS・ビルドOK・ブラウザ実測=①看板 (47.3,29.25) 反転維持・文字正立・1枚目不変（DOM+スクショ）②浮遊ボタン=幅340px（コンテナ826pxの41%＝左右いっぱいでない）・背景transparent・中央・bottom4.5%・3ボタン＋セリフbubble・はなしかける消灯（スクショで店主が見えたまま絵の上にボタンが浮く）③`.screenIn` animationDuration=0.7s④**rAFポンプ実測で音量段=中0.35/小0.12/ミュート0+pause/大0.6**・アイコン🔉🔈🔇🔊追従・sound=musicVol>0同期・musicVol2のままクイズ遷移でも0.35維持・**コンソールエラーゼロ**
  - ★プレビュー環境の申し送り（b5kから継続・再確認）: rAF駆動のフェードがペイン非描画中に一時停止し「vol0のまま」に見える。**rAFを自前ポンプすれば新レンジ通りに到達する**ことを実測で確認済み＝実機フォアグラウンドでは起きない構造。おうち/場面の切替感は実機で最終判定
  - ✅実機確認合格（2026-07-19・神田さん）: ①看板(47.3,29.25)②浮遊ボタンのbottom4%・幅340px・セリフ③フェード.7s・頭の間22%④音量4値[0,0.12,0.35,0.6]＝全項目OK
- **v2.3-b5k（2026-07-18・実機FB第5便=6件＝実機確認合格済み・追い込みは b5l）**: 指示書=Chat支給（raw実測・神田さん全項目承認済み）
  - **①音楽の音量3段階+ミュート**（[DECISION] **音量は3段階＋ミュートの4段循環・旧saveは sound から導出**）: `settings.musicVol`(0〜3)新設＝**SCHEMA_VERSION 5→6**。スピーカータップで 大→中→小→ミュート→大 と循環・アイコン🔊🔉🔈🔇が追従（既存絵文字の踏襲・共通Header 1箇所=WorldMapも共用）。`sound=(musicVol>0)`を同期＝既存SFXの呼び出し側は一切不変。bgm.js=`BGM_LEVELS [0,0.2,0.35,0.5]`（3=旧BGM_VOLと同値＝既定の体感不変・初期値）・`setBgm(key,level)`に。★実装判断: 指示書の「out側で musicVol===undefined 判定」はデフォルトマージが先に3を埋めるため機能しない→**parsed（生データ）側で判定**に修正（sound:false の旧saveがミュート維持になる・roundtripに導出2ケース追加=確認済み）
  - **②面フェード**: `.screenIn`（0.32s・初期値）＋App.jsxの keyed ラッパー1枚＝新画面がふわっとフェードイン。おうちモーダル/EvolutionOverlay等のオーバーレイはラッパー外（独自の出方を維持）。往復の暗転は今回スコープ外（フェードインのみ）
  - **③おうち拡大**: `.homePanel`（min(96vw,(100vh-150px)×16/9)・上限1100px・dvh対応）＝モーダルのまま端末サイズへ。「どこからでも開いて元に戻る」不変・sizeK上限1のまま（%座標不変）
  - **④お店拡大+会話オーバーレイ**: `.mapPage`+`.shopImg`（max-height 100vh-270px・縦横比保持）・コンテナ fit-content 中央寄せ＝**img駆動のままタップ枠51%/40%が絵と一致**。会話中は選択肢を**画像の下半分にオーバーレイ**（maxHeight56%・不透明度94%・角丸クリップ・「はなしかける」吹き出しは会話中消灯）＝RPGの会話ウィンドウ風
  - **⑤看板2枚目**: SIGN→`SIGNS`配列化。中央上の空き地(46,30・初期値)に**imgだけ scaleX(-1) でCSS反転**（新規画像なし・.mapfloatは別要素で無干渉・「じゅんびちゅう」文字は正立）。位相は2枚別値（1.27s/3.3s・2.1s/3.6s）
  - **⑥総問題数**: バトルの保護者ガイドを「全612問・難易度ごとに204問ずつ」に是正（ParentHubの進捗分母は元から正しいので不変）
  - **doc追随**（同便・b5g〜b5j実機OKぶん）: roadmap=b5k現在地（スタジオ完成・本線合流／FB4便・BGM 8曲を実装済みへ／残音=battle・studio＋スタジオ短尺のみ）・feature-spec=BGM/音量段/§2スキーマ6/格子ベース[DECISION]/難易度入場リセット/最大化系を追随
  - 検証: **verify6本全PASS**（roundtripに b5k 3チェック追加: musicVol往復/sound:true→3導出/sound:false→0導出）・ビルドOK・ブラウザ実測=①4段循環（アイコン・storage・実音量 0.5→0.35→0.2→0/pause→0.5 全一致・SFXゲート同期・musicVol2のままクイズへ→0.35で鳴る=場面跨ぎで跳ねない・旧save(sound:true)が🔊/0.5で起動）②screenInラッパー適用③おうち=iPad横1130px（上限1100+枠）・狭幅は96vw側④店内820×550・比率保持・タップ枠(51,40.1)一致・オーバーレイ下半分47%・吹き出し消灯⑤2枚目(46,30)反転・文字正立・1枚目不変⑥ガイドに全612問表示・**コンソールエラーゼロ**
  - ★プレビュー環境の申し送り: rAFフェードがペイン非描画中に一時停止し「vol0のまま」に見える事象を1回観測（同手順で再現せず・実機フォアグラウンドでは起きない構造）。実機確認の観点に「おうち開閉の切替感」があるためそこで最終判定
  - ⚠️次: 神田さんの実機確認（音量段[0,0.2,0.35,0.5]・循環の向き・フェード.32s・おうちreserve150px/上限1100px・お店reserve270px/オーバーレイ56%/94%・スマホの窮屈さ・看板座標(46,30)と位相・ガイド文面）
- **v2.3-b5j（2026-07-18・BGM 8曲実装＝実機確認合格済み・音ロードマップ§2消化）**: 指示書=Chat支給（bgm_out加工済み・raw実測に基づく）
  - **新規 `src/bgm.js`**: 場面ごと1曲を遅延生成してループ再生。**static import で URL 取得**（Vite が base補正・ハッシュ・buildコピー＝`/programming-land/` を直書きしない）。クロスフェード（FADE_MS 450）・自動再生解錠（iPad Safari対策=play()却下時 最初のpointerdown/touchstart/keydownで開始）。定数=**BGM_VOL 0.5 / FADE_MS 450**（初期値・調整は冒頭1箇所）
  - **集約は App.jsx の effect 1本**（`useEffect([screen, home, save&&sound], () => setBgm(trackFor(...), sound))`）＝画面遷移／おうち開閉／スピーカーON・OFF すべてに追従。**各コンポーネントは一切不変**・onSound配線も現状のまま。`TRACK` map（screen→曲key・未割当null）＋`trackFor`（おうちオーバーレイは myhome 優先）
  - **BGMは新スイッチを足さず既存 `settings.sound` に相乗り**＝スキーマ変更なし・**SCHEMA_VERSION据え置き**（roundtrip影響なし）
  - 8曲=home(ワールドマップ)/myhome(おうち＋ずかん流用)/shop/puzzle/quiz/typing/art/powers。全曲 -19 LUFS 統一・**継ぎ目焼き込み済み**（HTML5 loop で回すだけ）・AAC 48kHz 96k・計13MB。**battle/studio は無音**（TRACK=null・曲が来たら bgm.js SRC と App TRACK に1行ずつ）
  - 検証: verify6本全PASS・build後 **dist/assets に .m4a 8つ（ハッシュ付＝static import が効いている）**・ブラウザ実測（audio要素をprototype patchで観測）=①最初の実クリックで home 解錠再生（vol0.5/loop/paused false）②各場面で正しい曲が1本だけ（quiz/puzzle/art/typing/shop/powers）③おうち開=home→myhome の**クリーンなクロスフェード**（t200 home0.29+myhome0.21→t600 myhome単独0.5・他は全paused/0）④閉=home復帰⑤ずかん=myhome流用⑥バトル/スタジオ=無音（全paused/0・エラー無し）⑦スタジオ戻り=home復帰⑧スピーカーOFF=全フェードアウト(sound false)・ON=home復帰・**コンソールエラーゼロ**
  - 実装注意: 「曲追加は bgm.js SRC と App.jsx TRACK に1行ずつ」「音源は -19 LUFS 統一・継ぎ目焼き込み済み（再生成時は指示書§6のレシピ=本編ループ点+2.0sクロスフェード→EBU R128 -19LUFS→AAC96k で同条件に揃える・battle/studioが来たらChatが同パイプラインで渡す）」。スキーマ・ID挙動・演出バウンダリいずれも不変＝[DECISION]不要
  - 次: 実機確認**合格済み**（2026-07-18）→ 音量まわりは b5k で3段階化
- **v2.3-b5i（2026-07-18・実機FB第4便=6件＝実機確認合格済み）**: 指示書=Chat支給（jikki_fb4系・raw実測に基づく）
  - **①難易度は「入り直したら やさしい」に統一**: Quiz/Puzzle の difficulty をローカルstate化（バトルと同型）。モード内の行き来（ひろば↔出題・島↔ステージ）では保持・マップへ出て入り直すとリセット。[DECISION] **難易度は入場リセットに統一**（3モードで挙動一致）。storage の `quiz/puzzle.difficulty` フィールドは残存（もう読まない・スキーマ不変・roundtrip影響なし）
  - **②みなとアイコン 50%→85%**（width/height・初期値・タップ範囲13%不変）。実測=img/btn比0.85・クリップなし
  - **③相棒スプライト15枚を左右反転**: `sips --flip horizontal`（ファイル反転・**CSS scaleX(-1)不使用**=バトルのtransform群と同居させない＝演出バウンダリ無傷）。md5全15枚変化・512×512不変・コード変更ゼロ＝ずかん/進化演出/スタジオ控え室/おうち まで全表示が自動で右向きに
  - **④バトル入口「✅ たおした」→「たおした」**（右端の大きい✅だけ残す=1カード1チェック）。実測=✅1つ
  - **⑤おえかきを格子ベースに（[DECISION]・設計変更）**: 「すすむ=向きに34px」だと斜め45°が24.04pxになり格子と噛み合わずズレが永続する件の根治。**34px格子（12×9マス・ORIGIN(36,27)・START(240,231)）の格子点にすべての位置を固定**し、斜め1歩=マスの対角線（±G,±G）に。`clampStep`（部分前進）と`WALL`廃止・範囲外の歩は「その場に留まる」・`canStepFrom`は格子内判定に単純化。**エディタだけ薄い方眼ガイド**（rgba(58,51,53,.08)・grid prop・ギャラリー/拡大には出ない=作品はコマンド列保存で構造的に乗らない）。[DECISION] **旧作品の見え方が変わる例外**: ①斜め線は長さ約1.41倍 ②壁ぎわの部分クランプ線は消える（第1便⑤の壁打ち切り廃止と同性質・神田さん了承済み前提）。通常の縦横のみの作品は START が y+11px 動く以外は同形
  - **⑥マップ3画面を端末に応じて最大化（CSSのみ）**: theme.js に `.mapPage`（min(96vw,1100px)）+`.mapMax`（width=min(100%, (100vh−mapReserve)×16/9)・dvh対応）。ワールドマップ/クイズひろば/パズル島に適用（mapReserve 250/240/240=初期値）。★実装注意: **14pxの側余白はコンテナ自身のpaddingでなく外側ラッパーへ**（%座標の基準を変えないため）。matchMedia/RO不使用の既定どおり
  - 検証: verify6本全PASS・ビルドOK・ブラウザ実測=①クイズ（旧セーブhard→入場やさしい・出題往復でむずかしい保持・storageのhard不変）＋パズル（同型・島往復でふつう保持）／②0.85／③おうちで相棒が主人公の方（右）を向くスクショ確認／④✅1つ／⑤**八角形(fwd×2→右45)×8=16歩で開始点(240,231)に厳密復帰（誤差0）**・縦横周回も復帰・上端6歩で27到達→7歩目不動+「🚧これ いじょう すすめないよ」・エディタ方眼23本・**ギャラリーサムネは方眼0本**／⑥1180×820=マップ842px/ひろば・島1037px（従来640超）でスクロールなし完全表示・%座標ズレなし（つくる59.4/12.9等）・390×844=従来同等・**プレビュー環境でviewport高さが一時0になる事象あり（.mapMaxが6pxに見える）＝計測タイミングの問題で実利用に影響なし**・コンソールエラーゼロ
  - 次: 実機確認**合格済み**（2026-07-18）
- **v2.3-b5h（2026-07-18・つくるスタジオ実機FB 1件=文言のみ＝⚠️実機確認待ち）**:
  - 症状: キャラの消し方（控え室へドラッグ）の告知が画面に無く発見不能（機能は正常・ブロック側にはhintあり）
  - 修正: `StudioEditor.jsx` 控え室ラベルに「けすときは ここへ ドラッグ」を追記（1箇所・機能無変更）。右ペイン最小300pxでも2行折返しで崩れなしを実測・コンソールエラーなし
  - 再発防止: `studio-design.md`§9 に「操作の告知は画面に書く。ドラッグ削除はブロック・キャラの両方でヒントを出す」を追記
- **★つくるスタジオ 完成サマリ（段階0〜3・2026-07-17）**: b5d見た目ゲート（18種ブロック1:1移植）→ b5e 3ペインエディタ+UI非依存エンジン+draft → b5f フィルムだな+みほん4本+リミックス+上演専用 → b5g 教育接続+マップ正規導線。正本=`brushup/studio-design.md`・指示書 stage01/2/3・プロトタイプ第11版。§11の24値は全段階不変。実機合格で本モード完成・本線合流
- **v2.3-b5g（2026-07-17・つくるスタジオ段階3=教育接続+マップ設置+正規導線＝⚠️実機確認待ち・合格で本モード完成）**:
  - 指示書=`brushup/studio-implementation-stage3.md`（§1〜§3全部）。段階2実機合格済み。**音の差し替えは除外**（本線とまとめて後日・WebAudio簡易音のまま）
  - **SCHEMA_VERSION 4→5**: `studio.milestones {}`（コイン節目の永続化＝worksを消しても再付与なし）。roundtripに往復+旧2世代補完（b5e以前=studio無し/b5e〜f=milestones無し）追加=全PASS
  - **§1 教育接続**: レバー=`growth.js` XP.studioSave()=10・COIN.studio{first15/works5 20/works10 30/firstNest15/firstCast3 15}（すべて初期値コメント付き）。**付与は works.js saveWork の「新規追加の一本道」に集約**（上書き=作り直し保存は対象外・自動退避も同じ道・空作品ガード再利用・戻り値 grant{xp,coins,hit}）。きろく=log[d].studio（新規のみ・Artと同作法）。**バッジ3種**（studio1/studioRemix/studioNest・既存26個のemoji宣言形式に準拠=絵文字例外）。**かんとくベレー**=`head_kantoku_beret.png`（画像は神田さん配置済み・anchor top:-8.52/left:50/width:48.52=Chat実合成の確定値）+`ACHIEVEMENT_CHECKS.studio_all_cards`（works全体で18種網羅）。**powers**: つくる=おえかき50+スタジオ50（作品数×6+網羅14×covered/18+入れ子6・初期値）／ループ=島2+loopWorks×2上限10。走査ヘルパーは`studio-blocks-defs.js`に集約（usedBlockTypesInWorks/containerNestDepth=node安全・ベレー/powers/バッジ/worksで共用）
  - **§2 正規導線**: WorldMap AREAS末尾に studio（59.5/12.4・tall・**studio-assets/パス**・既存のふわふわ位相不変）＋**じゅんびちゅう看板**（69.5/34.13・非対話div pointer-events:none・「じゅんびちゅう」フォント重畳=SIGN.textTop 40%初期値・ふわふわは板と文字が一緒に揺れるようラッパーに）。App.jsx mode "studio"＋**exitStudio=loadProfile→update(()=>fresh)**（スタジオはstorage直書きのため戻りで再読込。prev vs next比較を1回通す=バッジ/ベレー解放/レベルアップ・進化・たまご検知が1回だけ・XP加算はworks.js側=二重付与なし）。#studio-dev はバックドアとして残置（main.jsxコメント明記・onExit無し=hash運用）。Studio/StudioHomeに onExit/onExitApp（「◀ マップへ」/dev時「◀ アプリへ」）
  - **§3**: `STUDIO_GUIDE`（parent-guide.js・原稿一字一句そのまま4段落）+StudioHomeにParentGuideモーダル導線。**かんせい!演出**=saveWork戻り値から けいけんち+10/コイン（icon_stat_coin）/マイルストーン名（MILESTONE_NAMES）＝初回だけ賑やか・2回目以降XPのみが自然に実現。上書きは静かなトースト。バッジ/ベレーの祝いはApp側（戻り時）に一任
  - **設計からの差異**: ①日記の初回系文言（「はじめて いれこを つかった」等）は実装しない（指示書§1-7の縮小指示どおり・節目はコイン/バッジ/ベレーが担う） ②日次の文章行の表示場所が無かったため Records（きろくのへや）に「きょうの きろく」パネルを新設（puzzle/quiz/typing/art/battle/studio の当日行・あそんだ日だけ表示）＝「さくひんを Nこ つくった」の受け入れ条件を満たす最小追加 ③ParentHubの14日合算に (l.studio||0) を追加（typingは従来から未集計のため触らず）
  - 検証: **verify6本全PASS**・ビルドOK・ブラウザ実測（正規プロファイルでの通し）=マップに建物（つくる・タップ→スタジオ→◀マップへ）・看板（非対話・座標69.5/34.13・文字重畳）／みほんリミックス保存→**かんせい!**（+10XP・コイン+15・「はじめての さくひん」）→storage実測（coins15/milestones.first/xp+10/log.studio1/remixOf）／**上書き保存=付与ゼロ・演出なし**／戻りで**バッジトースト1回**→何もしない往復で**二重演出・二重付与なし**／3本目保存でXP30到達→**戻りで進化演出（モコ→モスガ）が1回だけ**・再往復で再発なし／18種網羅+入れ子作品→**studioNestバッジ+かんとくベレー解放トースト**・cosmetics.owned反映／そだちのもり=つくるの木が**め**（tree_tsukuru_2・38%相当）・grows文言に「つくるスタジオ」／きろくのへや=「つくるスタジオで さくひんを 3こ つくった」＋バッジ3種表示／works全消し→新規保存で**first再付与なし**（XPのみの静かな完成演出）／ガイド原稿6要素一致・**コンソールエラーゼロ**
  - ⚠️次: **神田さんの実機確認**（建物と看板の据わり=SIGN.textTop・ベレーの被り具合=anchor・かんせい!のテンポ・コイン/XPレバーの体感）。**合格で本モード完成・本線合流**（残: Suno音源差し替え=本線の音作業と一括）
- **v2.3-b5f（2026-07-17・つくるスタジオ段階2=フィルムだな+みほん4本+リミックス+上演専用＝実機確認合格済み）**:
  - 指示書=`brushup/studio-implementation-stage2.md`（§0〜§5全部）。段階1の実機ゲートは合格済み
  - **§0-1 背景名の是正**（Chatの設計ミス=同じ絵が別名・「だいち」が2つの絵を指していた）: ショップの既存命名を正とし **そうげん(bg_battle_easy・旧id daichi→sougen)/ジャングル/だいち(bg_battle_canyon・id canyonのまま名前のみ)/アリーナ/スタジオ** に統一。`studio-design.md`§4も是正済み。**§0-2 verifyチェーン拡張**: `npm run verify` = 従来3本 + **verify-studio + test-studio-engine + test-roundtrip**（以後deployのゲートに入った）
  - **§1 router化**: `Studio.jsx`=薄いルーター（view=home/edit/show・keyで再マウント）／**エディタ本体は`StudioEditor.jsx`へそのまま移動**（★実機合格済みの手触りコード=ドラッグ/スナップ/実行は不可触・props追加 open/showOnly/onExit と ほぞん のみ）。新規=`StudioHome.jsx`（入口）/`StudioThumb.jsx`（サムネ）/`studio-samples.js`（みほん）/`verify-studio.mjs`。**データ層分離**: `studio-blocks-defs.js`（node安全な純定義・STUDIO_BG_IDS含む）+`studio-blocks.js`（アイコン合成層・exportの形は不変）／`studio-bgs.js`（BGS共有）／`studio/cast.js`（控え室ヘルパー移動）／`studio/works.js`（保存モデル・WORKS_MAX30/NAME_MAX8）
  - **§2 保存モデル**（[DECISION] Chat決定の穴埋め）: draftに`origin {type:new|work|sample, id}`+name。**何かを開く前に draft が空作品ガードを通れば自動で棚へ退避**（origin=workなら上書き・new/sampleなら「さくひん連番」で新規追加+remixOf）・通らなければ黙って捨てる＝**かきかけは絶対に失われず確認ダイアログ不要**。ほぞんボタン: origin=work上書き/他は新規（棚満杯は「たなが いっぱい!」）
  - **§3 Home**: studio-interior背景・かきかけカード（あるときだけ）・あたらしく つくる・フィルムだな（新しい順・コマ風フレーム・タップで4択=みる/つくりなおす/コピーして つくる/けす〔確認つき〕・上限30でブロック）・みほんのたな4本（初回=works0のときだけ きらり+「みほんを ひらいてみよう」）。**サムネは画像を保存せずデータからミニ描画**（仮想ステージ300×200にステージ同一式で配置→transform:scale縮小＝正確なミニチュア・localStorage非圧迫）。作品名ひらがな8文字（maxLength+IME後slice=1便③の作法）
  - **§4 みる=上演専用**: 新しいプレイヤーは作らずエディタを`showOnly`で開く（big固定・編集UI/ひろげる非表示・▶■とタップ有効・とじるでHome・**draft不書込**=人の作品を見てもかきかけが壊れない）
  - **§5 みほん4本**=指示書の表のとおり（dance=ずっと並行/chase=まつ時間差/tap=タップみため/hide=ぶつかったら・キャラは最低保証4種のみ・★表のbg「daichi」は是正後の絵=id canyonとして実装）。`verify-studio.mjs`=bg実在/キャラ1..5/最低保証kind/座標範囲/型実在/パラメータ範囲/深さ≤2/ずっと末尾のみ/きっかけ種別1本/スタック≤30/**エンジン40拍スモーク**・FAILで終了コード1
  - 検証: **verify全PASS（6本チェーン）**・ブラウザ機械実測=Home表示（0/30空メッセージ・きらり）→みほんリミックス（5ブロック・▶発光・ほぞんprefill・**remixOf:"dance"記録**・origin→workへ切替）→あたらしく つくる（origin=work退避は上書き=棚増えず）→新規かきかけ→みほんを開くと**「さくひん1」自動退避**→みる（big+showonly固定・こうぐだな/組立/ひろげる非表示・ヘッダー「とじる」のみ・▶上演・■後もbig・**draft不変**）→つくりなおす（退避で「さくひん2」remixOf:chase・上書き保存で棚3本のまま内容更新）→コピー（新規4本目・9文字→8文字slice）→けす（やめる=残る/けす=消える）→つづきから（削除済みwork参照のdraftも安全に開く）→**上限30ブロック**（あたらしく/みほんとも「たなが いっぱい!」でHomeに留まる）→狭幅ガード（エディタ/Home両方）・**コンソールエラーゼロ**
  - ★実装知見: devサーバの接続断→自動リロードで location.hash が落ちて #studio-dev から本体に戻ることがある（開発環境事象・本番Pagesは無関係）。機械実測はステップごとに hash を確認して進める
  - 次: 実機確認**合格済み**（2026-07-17）→ 段階3（b5g）へ進行済み
- **v2.3-b5e（2026-07-17・つくるスタジオ段階1=3ペインエディタ+実行エンジン+かきかけ自動保存＝実機ゲート合格済み）**:
  - 指示書=`brushup/studio-implementation-stage01.md` §3。段階0の実機ゲートは合格済み。§11の数値・段階0のドラッグ系コードは1:1のまま温存し「選択中キャラのスタック」対象に一般化
  - **新規**: `src/studio/engine.js`（実行エンジン=**UI非依存の純ロジック**・画像/DOM/React無依存でnode単体テスト可・拍ベースの同期ステッパー=UIがTICKごとにtick()）／`tools/test-studio-engine.mjs`（必須5項目+補7項目）。**Studio.jsx全面改装**: 左こうぐだな（段階0の2列grid）/中央組み立て（選択キャラのプログラムのみ・選択チップ表示）/右ステージ `clamp(280px,36vw,620px)`・3:2・論理12×8固定・常に全体縮尺（式=プロトタイプ同一 `min((w-52)/12,(h-44)/8)`・window resizeのみ）＋ひろげる全画面上演（■で復帰）
  - **機能**: 背景5種（既存WebP配列・だいち=bg_battle_easy/ジャングル/キャニオン/アリーナ/スタジオ=studio-interior）・キャラ最大5（同種可・後置きが手前・足元スポットライト・格子スナップドラッグ）・控え室=主人公+partner.owned（現段階の姿）+battle.defeated（最低保証: 主人公+モコ+スライム+きのこ）・キャラ削除=控え室へドラッグ+**唯一の確認**（とりけしで復活も実測）・とりけし/やりなおし20手（ブロック増減/移動/数値/おと/キャラ増減/背景。連続ピル操作は1手に合体）・長押しコピー0.5s→バルーン→束複製（きっかけはコピー不可）・スタック上限30はスナップ候補から除外
  - **エンジン仕様の実装判断**（設計§5/§6の行間・Chatに要確認なら段階2で）: ①タップ/ぶつかりスタックは発火のたび先頭から再スタート ②▶時点で重なっているペアは「継続中」扱い=開始と同時には発火しない ③はたスタックが終わってもタップ/ぶつかり持ちキャラがいる間は上演継続（待ち受け）・どちらも無ければ自然終了=位置維持 ④空のずっとは1周1拍で安全（無限ループガード=プロトタイプ準拠） ⑤各ブロックは最後の拍に「余韻」で発光が全拍見える（拍数は仕様どおり）
  - **SCHEMA_VERSION 3→4**: `studio:{works:[],draft:null}` 追加（worksのUIは段階2・器のみ）。draft=編集のたび500msデバウンスで自動保存→再入場で復元+トースト「かきかけの さくひんが あるよ」（ダイアログなし）。`lastProfile()`ヘルパー新設（App外画面から今の子を取得）。roundtripに入れ子ブロック木の完全往復+旧セーブ補完の2チェック追加=全PASS
  - 検証: verify全PASS・roundtrip全PASS・**エンジン単体テスト全PASS**（①端で歩数破棄=2拍目bump/3拍目次カード ②入れ子3×2=おと6回が1〜6拍連続 ③ずっと=停止まで走り■で初期化 ④みぎへ2とまつ2が同拍/ジャンプ2(4拍)とまつ4が同拍 ⑤ぶつかり=接触の瞬間2回のみ・双方発火・▶時重なりは不発火 ＋きえる=走り続け対象外/でるで再接触発火/再タップ先頭から/もとのばしょへ=位置のみ/大きさ上下限）・**ブラウザ機械実測**（合成PointerEvent: 2キャラ並行実行の拍整合→端停止→自然終了・■初期化・再▶初期化・タップ発火の発光追跡6→7・磁石スナップ/新スタック/プルッ拒否/5体上限/ステッパー下限/おと切替/コピー/とりけし全対象/draft保存→リロード復元→トースト/キャラ格子ドラッグ/削除確認/ひろげる=編集UI消灯・■復帰/375px案内）・コンソールエラーゼロ
  - ★実装知見: 発光は engine の onGlow→DOM classList直接toggle（React再レンダーはclassName propが不変なら触らないため共存安全）。スナップ吸着は110ms非同期コミット＝機械検証は待ってから読む
  - 次: 実機ゲート**合格済み**（2026-07-17）→ 段階2（b5f）へ進行済み
- **v2.3-b5d（2026-07-17・つくるスタジオ段階0=ブロック見本画面＝実機ゲート合格済み）**:
  - 正本=`brushup/studio-design.md`（設計）・`brushup/studio-implementation-stage01.md`（指示）・`brushup/studio-block-prototype.html` 第11版（手触りの正本＝数値ごと1:1移植）。アセット22点は`src/assets/studio-assets/`に配置済み
  - **新規**: `src/data/studio-blocks.js`（18種定義・新カード=データ追加のみの形）／`src/studio/geometry.js`（G・ANIM・TICK400・パス生成・計測＝§11の数値を変更禁止で移植: 磁石78/1.3/140・チップ34/#FFFDF6/rx11・隙間180ms cubic-bezier(.25,.9,.35,1.25)・吸着110ms・掴み2.6deg/1.05・着地200ms）／`src/components/StudioBlock.jsx`（SVG+白チップ+アイコン+ラベル+ピル）／`src/components/Studio.jsx`（見本画面）
  - **入口**: `main.jsx`に`#studio-dev`の一時ルート（hashchange対応）＝**App.jsxは完全無傷**・マップ導線なし（段階3）。既存挙動不変
  - 機能=プロトタイプの全範囲をReactで再現: パレット18種（★縦1列は収まらないため**2列grid**に＝見た目/挙動は同一）・掴むと下が束で外れる・磁石スナップ（楕円判定+ゴースト+吸着110ms）・救済スナップ140・入れ子深さ2・**きっかけ3種は各1本制限**（off表示+プルッ拒否=プロトタイプのhat制限をtype別に一般化）・ステッパー（±・端で停止）・おと切替3種・たなへ捨てる（赤み+ポフッ）・WebAudio効果音（初回pointerdown解錠）・最初の1本指のみ（pointerId追跡）。matchMedia/RO不使用
  - ★実装知見: パレットのプルッ拒否はReact stateのrAF経由だと不安定→**プロトタイプ同様のDOM直接操作**（remove→reflow→add・拒否時は再レンダー無しのため安全）に
  - 検証（合成PointerEventで機械実測）: パレット→新スタック／束外し（fly内3個）／磁石スナップ（ゴースト表示→みぎへの直下に束挿入・並び正）／救済（感知圏外+重なり→(70,96)へ吸着）／深さ2（ずっと>くりかえし>くりかえし=x座標417/434で成立・3個目はdepth3にならずdepth1へ=451不存在）／はた1本制限（off・掴み拒否・プルッ・tapは独立）／ステッパー（3→+2→5・−10回→1で下限停止）／おと（ポン→キラン→ドン）／たな捨て（赤み+消滅）／#出入り。verify全PASS・**本番（Pages）でconsoleエラーゼロ**（devのcreateRoot警告はmain.jsx編集時のHMR再実行のみ＝本番非発生を確認）
  - 次: 実機ゲート**合格済み**（2026-07-17・別セッション）→ 段階1（b5e）へ進行済み
- **v2.3-b5c（2026-07-16・もりの配置とラベル調整＝実機FB・⚠️実機確認待ち）**: 指示書=`brushup/sodachinomori_layout_fb.md`
  - ①**5本を直線配置**（bottom統一20）。[DECISION] **もりは直線配置＝「木の大きさ＝育ち」が設計の芯。奥行きを変えると遠近でも大きさが変わり意味が二重になるため、同じ奥行きに置いてこそ大きさの差＝育ちの差として読める**（ジグザグは採らない）
  - ②看板を**木の足元**へ（top:100%・ボタンはbottom固定＝段階が変わっても看板が動かず5枚一直線） ③看板を**白ピル＋ink枠**（ひろば/パズル島と同じ・室内用.bubbleは草地に合わない） ④`TREE_H` 54%→**40%**上限（10/17/27/40＝1:1.7:2.7:4。54%は つくる大木がはみ出し+最大9%重なりで破綻）
  - ⑤最悪ケース実測: **全部おおきな き**=はみ出しゼロ・ボックス重なり最大3.5%（透明余白込み・実絵は枝先が触れる程度）・看板は375pxでも全ペアすき間3px以上＝b5bの看板近接は解消／**全部たね**=たね5種に個性があり寂しくない／**バラバラ**=段階差が明瞭。verify/roundtrip全PASS・コンソールエラーなし
  - ⚠️次:神田さんの実機確認（TREE_POS/TREE_Hは1箇所ずつ調整可）
- **v2.3-b5b（2026-07-16・そだちのもり刷新＝5つの鉢→5本の木＝⚠️実機確認待ち）**:
  - 指示書=`brushup/sodachinomori_redesign.md`（実装記録つき）。アセット21枚（木20=ちから別×4段階・bg_mori.webp 1600×900）を`src/assets/`へ。★b4a教訓のbbox確認で、たね3枚（keyboard/kurikaeshi/tsukuru の _1）に下余白31〜82pxを検出→**bbox+4pxでトリム**して他と統一（底基準アンカーで浮くのを防止）
  - **powers.js**: GROW_STAGES **5→4段階**（たね0/め10/わかぎ40/おおきな き80＝初期値）・**称号title廃止**（「じょうず（は）」の（は）漏れごと解消）・imgはちから別`TREE_IMG`/`treeImg()`へ・**POWERSのemojiフィールド削除**（絵文字不採用）・`POWER_DID`（できるようになったこと=段階ごとに増える）＋`STAGE_LINE`（%の代わりの段階の一言）新設。computePowers/growStageロジック・powers.prevスキーマは不変
  - **PowerPanel.jsx**: 鉢の横並び→**もりのシーン**（bg_mori cover 16:9・5本の木を%座標・★**底基準アンカー**=bottom基準で足元が地面に乗る〔中心アンカーはb3zの罠〕・高さ=`TREE_H`["14%","22%","36%","54%"]・看板=既存.bubble）。詳細モーダル刷新（**%バー・「そだちぐあいN%」・称号🏅・絵文字を廃止**→段階の一言+できるようになったこと〔たねは「あそぶと ここに ふえるよ」〕+grows+導線ボタン維持）。**「そだった！」演出（prev差分・初回は静かに基準化）はロジック維持**＝中の絵が木になっただけ
  - §6確認: PowerPanelは`Powers.jsx`専用画面のみで使用＝他画面のミニ表示なし→横並び温存不要。feature-specに**§7-2「そだった ちから（そだちのもり）」新設**（記載漏れ解消・§8以降の番号は不変）
  - 検証: verify/roundtrip全PASS・プレビュー実測=段階違い5本（め/たね/わかぎ/おおきな き/め）が指定座標で地面に立つ・看板5枚・**祝い演出発火**（3件だんかいアップ・prev更新後は再発火なし）・わかぎ/たねモーダル（%・称号・絵文字なし・できること段階連動・空表示）・導線遷移・375px・コンソールエラーなし
  - ⚠️次:神田さんの実機確認（木の据わり=`TREE_POS`・大きさ=`TREE_H`・しきい値0/10/40/80=`GROW_STAGES`の各1箇所で調整可。狭幅で「かんがえる」「キーボード」の看板がやや近接）
- **v2.3-b5a（2026-07-16・実機FB第3便=バトルの横画面2カラム＝⚠️実機確認待ち）**:
  - 指示書=`brushup/jikki_fb3_battle_landscape.md`（実装記録つき）。横画面で縦長の問題（ずのよみとり等）だと答えるときにバトルシーンが画面外に消える件
  - **横画面（landscape かつ 820px以上）だけ2カラム**: 左=バトルシーン＋たたかいメッセージ（`position:sticky; top:8px`）／右=アイテム＋もんだい。外枠は inline `maxWidth:640` → theme.js `.battleWrap` へ移設（★inlineはCSSより強く2カラム化を殺すため必ずclassで）。縦画面は何も効かない＝1カラム・maxWidth640で従来どおり。中身のJSXは不変＝包んだだけ・演出/結果シーケンス境界も不変（オーバーレイはfixed全画面＝分割の外）
  - ★**向きの判定はCSS @mediaのみ＝JSの向き検出（matchMedia/ResizeObserver/orientation）は使わない**（b4bのmatchMedia誤発火・b4lのResizeObserver不発火の教訓）
  - 検証: verify全PASS・プレビュー実測=横1180×820（2カラム・左605px/右501px・sticky top8px・回答演出が左に表示・縦長模擬spacerで最下部スクロールしてもシーンが貼り付き）／横844×390（2カラム・はみ出しなし・勝利オーバーレイ全画面）／縦390×844と縦820×1180（1カラム=従来どおり・境界のportraitも正しく1カラム）・コンソールエラーなし。feature-spec§8に1行追記済み
  - ⚠️次:神田さんの実機確認（iPad横での2カラムの体感・突進の見え方〔シーン幅640→605px〕・割合54/46・境界820px・sticky top8pxは初期値＝theme.js 1箇所ずつ調整可）
- **v2.3-b4z（2026-07-16・パズル島の拠点を個別に左へ＝⚠️実機確認待ち）**: b4yの一律3pt右を実機で見て**拠点ごとに個別に左へ戻した**（`ISLAND_POS` left: 1=16.4／2=29.5／3=35.5／4=59.7／5=76.5／6=81・戻し量は1〜2.5ptと不均一＝空き地の位置に合わせた追い込み）。top・`up:true`（3と6）・丸9%・ラベルの上下出し分け・「1〜2年」表記・データは不変。検証=3難易度（昼/夕/夜・座標共通）で6つの丸が空き地に乗りラベルが隣を覆わない・375px・コンソールエラーなし
- **v2.3-b4y（2026-07-16・パズル島の座標＋ラベル配置＝⚠️実機確認待ち）**: ①b4v で丸を11→9%に縮めた副作用で空き地からずれたため`ISLAND_POS`の**全6拠点を3pt右**へ（topは不変）。②上下に並んだ拠点で上側のラベルが下の丸を覆う件（3もしも→2くりかえし／6ちょうせん→5あたまのたいそう）を、`ISLAND_POS`に**`up:true`**を足しラベルを丸の上へ（`bottom:104%`＋**column-reverse**で「名前ピルが丸の近く・学年ピルが外側」の読み順を下配置と揃える）＝ラベル配置の集約点は`ISLAND_POS`1箇所に。丸9%・「1〜2年」表記・✅⭐・ISLANDSデータは不変。検証=**3難易度すべて**（昼/夕/夜・座標共通）で6つの丸が空き地に乗りラベルが隣を覆わない・375pxでも崩れなし・コンソールエラーなし
- **v2.3-b4x（2026-07-16・マップ座標もう一段〔3回目〕＝⚠️実機確認待ち）**: b4wの4点に前回と同じ差分を追加（quiz top18〔元値から計5pt上〕・art top39.5〔計2.5pt上〕・myhome 58.43/65.75〔計0.5pt2時〕・puzzle 85.87/71.5〔計1.0pt2時〕）。他5拠点不変をDOMで確認。プレビュー=4点とも空き地に乗ったまま重なりなし
- **v2.3-b4w（2026-07-16・マップ座標もう一段＝⚠️実機確認待ち）**: b4vの4点を同方向に当初移動量の倍だけ追加（quiz top20〔計3pt上〕・art top40.5〔計1.5pt上〕・myhome 58.26/65.85〔計0.3pt2時〕・puzzle 85.52/71.7〔計0.6pt2時〕）。他拠点不変。プレビュー=4点とも空き地に乗ったまま重なりなし
- **v2.3-b4v（2026-07-16・実機FB第1便＋第2便＝⚠️実機確認待ち）**:
  - 指示書=`brushup/jikki_fb1_map_logo_name_puzzle_art.md`・`brushup/jikki_fb2_perfect_badge_coin_daily.md`（実装記録つき）。※③バトル横画面は別便（未着手）
  - **1便①**: マップ座標4点（quiz 1pt上・art 0.5pt上・myhome/puzzle 2時方向に0.1/0.2pt）。**1便②**: タイトルロゴ80%＝3画面とも `min(72%,368px)`（実測368px）。**1便③**: 名前5文字（maxLength+IME後slice+「5もじまで」・既存10文字名は折返しで崩れなし）
  - **1便④**: パズル島の丸11→9%・学年ピル「1〜2年」表記（🎓廃止＝絵文字不採用）→デスクトップ/375pxとも6つの丸すべて可視・干渉なし
  - **1便⑤ おえかき**: 動けない「すすむ」は**入口で弾く**（`canStepFrom`試算・一部でも動くなら追加可・メッセージは入力時）＋**b3jの壁打ち切り（break/hitWall/haltIndex）廃止**（クランプ維持）＝**まがる→すすむで再開**。薄表示も撤去。実測=すすむ12連打→7個で停止＋メッセージ／右折後に再開。★要確認の報告: **壁打ち切り前提の旧作品は再生結果が変わる**（実測=fwd×8→right→fwd×3が直線→L字。通常作品は完全不変）＝テストデータのみの想定・対処要否は神田さん判断
  - **2便① 満点表示**: ひろばの名前チップ=その難易度のベスト5/5で金#FFD447＋icon_stat_star（難易度タブ連動・満点以外は何も出さない）。実測=満点セルのみ金＋星・タブ切替で消灯
  - **2便② コイン=その日ごとの進歩ベース**（★06-Cの方針更新）: `coinDay`（growth.js・日付が変われば作り直し・旧セーブは初回アクセスで生成＝移行不要）。クイズ=当日ベスト超過分／パズル=当日★基準／タイピング=きょう初クリア8・きょうのベスト+5／バトル=きょう初撃破のみ＋文言「＋0（きょう たおした あいて）」。**記録（生涯ベスト・ずかん・満点表示）は従来どおり**。[DECISION] **上限を設けない**（上限は「もう終わり」の合図になり反復を止めるため。遊べる量そのものが自然な上限）。割り切り: 端末日付の変更で再取得可＝一人用・課金なしのため対策しない
  - ★実装判断: Battleの表示は `dayFirstKill`（当日基準）を新設して**支払いと表示を一致**（生涯firstKillのままだと日跨ぎ再戦で＋N払うのに＋0表示になる）。ずかん登録案内は従来どおり生涯firstKill。save側のcoinDay読みはread-only（updateを通さない変異を回避）
  - 検証: verify全PASS・roundtrip全PASS（coinDay往復+旧セーブundefinedの2チェック追加）・プレビュー実測=1便①〜⑤全項目＋2便①（金チップ/連動）＋2便②（クイズ+5/+0/日跨ぎ+5・バトル「＋5！」/「＋0（きょう…）」・パズル+6/+0）・375px・コンソールエラーなし。※タイピングのみ実プレイ未実施（同一4行パターン・roundtripで担保）＝実機確認の観点に含む
  - ⚠️次:神田さんの実機確認（マップ座標の据わり・ロゴ80%・島ラベル・おえかきの新挙動と旧作品の変化・満点マークの見え方・**コインの貯まり方の体感**〔レートは growth.js COIN 1箇所〕）
- **v2.3-b4u（2026-07-16・クイズ改修 通し1本=重複防止/正解位置/在庫拡大/軸拡張＝⚠️実機確認待ち・関所B）**:
  - 指示書=`brushup/quiz_expansion_instructions_for_code.md`（実装記録つき）・設計=`brushup/quiz_expansion_design.md`（両文書のL3「改訂:07-13」は07-15の誤記→取り込み時に修正）
  - **③在庫 360→612問**（各難易度204・全セル狙い40〜50到達=kimari40/robot40/yomitori40/junban40/nakama44・**下限30への引き下げ不要**）: 因果チェーン27→45話・なかまわけアイテム70→100・きまりプール10→20・FLOWS/BRANCHES 各9→17・LOOP_ACTS 5→10・ロボットはパラメータ微拡張
  - **③なかまわけ軸 8→19**: concrete新設=いろ3＋かたち3（`group:"color"/"shape"`・**誤答は同グループの別prop持ちだけ**＝曖昧絵文字を機械排除・criteriaでも検証）／functional+4（のせてはこぶ・あし4ほん・みにつける・つちのなか）／abstract+1（ひとが つくった）＝hardの軸偏り62%→35%に緩和。「実は当てはまる」物に正直タグ（うま/ぞう=carry・いす/ベッド=fourlegs）。nakama=仲間外れ24＋軸名称20（NAKAMA_ODD機構不変）
  - **①1ゲーム内の重複防止**（`quizzes.js` buildSession）: R1文言+正解一致/R2選択肢セット/R3同chainId/R4アイテム2共有/R5同軸 を同席させない（フル制約10試行→R1R2緩和→レコード非重複・必ず5問）
  - **②正解位置の均等割当**: 選択肢数ごとに均等配分（3択2:2:1・4択2:1:1:1）→「全問おなじ位置」は構造的にゼロ。採点・記録不変・battlePool不変
  - 検証: verify全PASS（612問）・roundtrip全PASS・**機械ハーネス3万ゲーム**（scratchpad/session-harness.mjs: R1〜R5違反0・全問同位置0・5問充足/採点整合100%・位置分布均等）・実プレイ=なかまわけ3難易度＋じゅんばん/よみとり（新軸出題・位置分散・完走）・バトルスモーク（新プール出題→戦闘進行OK）・コンソールエラーなし
  - 文書: feature-spec§4=612問+①②③／quiz-書き起こし基準に軸追加ルール5項（qLabel鉄則・いろ軸・made副作用・同カテゴリ安全パターン）／howto・QUIZ_CATEGORIES descを2形式文言に（ParentGuideは一般文のため据え置き）
  - ⚠️次:神田さんの**iPad・スマホ実機確認（関所B＝これが唯一の完了ゲート）**: 新軸の手応え・色/形問題の見え方（旧端末の絵文字レンダリング含む）・重複が消えた体感・正解位置の散り方。比率/在庫は COUNTS・NAKAMA_ODD の定数1箇所で調整可
- **v2.3-b4t（2026-07-15・なかまわけ拡張「〇〇の なかま」＋feature-spec追随＋台帳分割＝⚠️実機確認待ち）**:
  - **①軸名称形式の追加**（教育設計: 仲間外れ=差を見つける操作／新形式=与えられた基準を当てはめる操作＝属性フィルタリング。同じ素材で認知の操作を変える）: 「〇〇の なかまは どれ？」を なかまわけに追加。軸は既存流用＝やさ=カテゴリ3択／ふつう=はたらき3択（なるべく同カテゴリ内で切る・soundのように切れない軸はまたぎで代替）／むず=抽象4択（誤答2カテゴリ以上）。`PROP_AXES`に出題用`qLabel`（water/draw/natural・labelはwhy用で不変）。natureは「しぜんの ものの なかま」と の が重なるため出題名から除外
  - **②問数**: nakama 24→32（仲間外れ24＋軸名称8=初期値・同プール混在＝`NAKAMA_ODD`定数）＝1難易度120・**総数336→360**。機械検証に「名指しした軸に当てはまる選択肢がちょうど1つ」を追加（複数正解の事故を排除・quiz-criteria kind="nakama-axis"）。難易度タグ照合は両形式共通
  - ★教訓: `filter(i => i.cat === pick(cats))` とfilter内でpickすると**毎アイテム再抽選**され同カテゴリ制約が壊れる（初回生成で発覚）→ランダム選択はコールバックの外で1回
  - **③文書**: feature-spec §4（360問＋新形式）・§7（b4s卵欄=たまごモーダル）を実装に追随。**④台帳分割**: b4d以前の版ログ・過去フェーズ教訓を `progland-handoff-archive.md` へ移設（冒頭に警告バナー）・本台帳スリム化
  - 検証: verify全PASS（クイズ360問・難易度タグ照合込み）・roundtrip全PASS・プレビュー=なかまわけ3難易度で新形式が混在出題・正答一意・why自然・既存形式/きまり/ロボット（再生成対象）従来どおり・コンソールエラーなし。指示書=`brushup/nakama_axis_docs_ledger_split.md`
  - ⚠️次:神田さんの実機確認（新形式の手応え・文言の据わり・混在比率8/32は初期値＝`NAKAMA_ODD`1箇所で調整可）
- **v2.3-b4s（2026-07-15・おうちの たまご欄を作り直し＝⚠️実機確認待ち）**:
  - b4jのたまご欄の3欠陥を解消（`HomeRoom.jsx`）: ⓐ`pointerEvents:"none"`で触れない ⓑ3〜4字用の`.bubble`に11字の状態文を入れ40px卵に130px超の看板が乗って崩れる ⓒ床に浮いた裸の白棒ゲージ（0%＝真っ白）
  - **①触れる**: 卵欄を他家具と同じ`tapzone`ボタンに（`tap("egg")`→新ネストモーダル`nested==="egg"`）。無反応を廃止
  - **②看板を揃える**: 看板文字を状態文→**「たまご」だけ**（ずかん/きろく/もちものと同じ`.bubble pulse`・しっぽ付き）＝はみ出しと幅の不釣り合いを解消
  - **③卵とゲージを世界観に**: `EggIcon` 40→**64**（*sizeK・初期値・相棒より小）／ゲージ＝卵足元の「巣の名札」風（幅=64*sizeK・枠#BA7517・地#FFF9EC・進捗#FFD447＝`.bubble`と同系色で**0%でも裸白棒に見せない**）／状態文（あたためてる/あとちょっと/もうすぐ！）はゲージ直下に小さく`seqSubStyle`（白＋ink白フチ・床でも読める・看板不要）＝Battle.jsxのb4r流用を`HomeRoom`にも定義
  - **④たまごモーダル**: タップで 卵120px＋ゲージ＋状態文＋「あそぶと あたたまるよ」＋とじる。★孵化は従来どおりEXPで自動（選択なし・`growth.js`不変）
  - 維持: たまごサイクルのロジック（付与/孵化/ゲージ計算 eggPct/eggMsg）・他ラベル・境界は不変。数値は定数（EggIcon size・幅64・seqSubStyle）で実機調整
  - 検証: verify全PASS（deploy経由）・プレビュー実測=egg profile注入（mori Lv12＋mizu Lv1・egg.xp4=10%）で ⓐ卵欄が`<button>`/pointerEvents auto/cursor pointer・タップでモーダル開く ⓑ看板「たまご」 ⓒ卵img64px・ゲージ枠rgb(186,117,23)/地rgb(255,249,236)/進捗rgb(255,212,71)・状態文color白+ink textShadow ⓓモーダル表示／375px狭幅でも部屋内に収まり看板はみ出さず崩れなし（状態文のみ2行折返し・床で可読）・コンソールエラーなし
  - ⚠️次:神田さんの実機確認（卵の大きさ64・ゲージの据わり・状態文の折返し〔長ければ`EggIcon size`/幅の定数1箇所〕・モーダルの文言）
- **v2.3-b4r まで公開済み（2026-07-13・バトル入口の案内文を背景の上で読めるように＝⚠️実機確認待ち）**:
  - 入口画面の地の文「てきを えらんで バトル！（…）」（背景対策なしでアリーナ背景に溶けていた1箇所）に `seqSubStyle`（白＋ink4方向白フチ・L106）を流用＝おうち/結果シーケンスの「背景の上の文字」と統一。他の入口地の文はこの1箇所のみ（タブ/カード/あそびかた/おうちの方へは下地ありで不変）
  - 検証: verify全PASS・プレビュー=案内文がアリーナ背景の上でくっきり（スクショ）・他不変・コンソールエラーなし
  - ⚠️次:神田さんの実機確認（案内文の可読性）
- **v2.3-b4q（2026-07-13・バトルエリア入口を全画面背景に＝⚠️実機確認待ち）**:
  - `battle-arena.webp`（1600×900）を src/assets/ へ。Battle.jsx の**入口画面**（default export・難易度/敵/タワー選択）を全画面アリーナ背景に（おうち/ひろば/ワールドマップと同じ作法）。外側`div{position:relative;minHeight:100vh}`＋最背面`img{position:absolute;inset:0;objectFit:cover;center}`＋既存UIを`zIndex:1`で重ねる。scrimは無し（初期・実機判断）
  - ★戦闘中(BattleFight)の背景(BATTLE_BG/そうげん等)・戦闘/演出/結果シーケンスは不変（別関数）
  - 検証: verify全PASS・プレビュー実測=入口が全画面アリーナ／難易度タブ・敵カード・タワー押下可／375pxで横あふれ0・cover・土俵にUIが乗る／戦闘突入でアリーナ背景は消えBATTLE_BGに戻る（別関数を機械確認）。指示書=`brushup/battle_arena_entry_bg.md`
  - ⚠️次:神田さんの実機確認（背景の据わり・カードの可読性。読みにくければカード群の後ろに薄いscrimを検討）
- **v2.3-b4p（2026-07-13・結果シーケンスに“間”＝⚠️実機確認待ち）**:
  - **①各ステップに“ため(HOLD)”**: 登場(LAND)が落ち着いてから HOLD の後に「つぎへ」——win=バー伸び1.7s+1.0s／levelup=0.75s+1.2s／進化=既存1.5s維持（最長・最大の山場）／egg=1.3s+1.0s／hatch=1.53s+1.2s
  - **②切替にひと呼吸**: つぎへ→現ステップふわっと消える(FADE_OUT 250ms)→**薄幕だけの間(STEP_GAP 300ms)**→次ステップ登場（`seqTrans`・連打ガードつき）
  - **③XPバー=過程**: かった!→小さな間400ms→**ゆっくり1.3s**で伸びる（XPBAR定数）。すべてSEQ定数1箇所
  - 検証: verify/roundtrip全PASS・実測=①シーケンス表示→つぎへ **ちょうど2700ms**（LAND+HOLD どおり）／切替=opacity 0.23→0（250ms）→薄幕300ms→レベルアップ登場→つぎへ再出現2500ms（750+1200+切替550）＝サンプリングで機械確認。演出・薄幕(b4o)・敗北/タワー不変
  - ⚠️次:神田さんの実機確認（“ため”のテンポの体感。長い/短いは SEQ.HOLD/LAND の数字1つずつで調整）
- **v2.3-b4o（2026-07-13・結果シーケンスの重なり修正＝⚠️実機確認待ち）**:
  - **①「かった！」の二重解消**: 勝利アニメのグレー「かった！」を `fx.won && !overlay` に＝シーケンス開始（overlay="win"）で消灯。以後は金の「かった！」だけ（DOM上も1つを機械確認）
  - **②薄幕を濃く**: `DIM_BASE 0.45→0.72`（①④⑤）／レベルアップ=0.82／`DIM_EVOLVE 0.60→0.85`（最暗=ドラマの暗転・裏のクイズが透けない）。SEQ定数1箇所・実機で微調整
  - 検証: verify/roundtrip全PASS・実プレイ=①でグレー「かった！」消滅・alpha 0.72/0.82実測・進化0.85でクイズ肢が沈む（スクショ）・演出/タメ/タップ送り/敗北・タワー不変
  - ⚠️次:神田さんの実機確認（薄幕の濃さの体感・特に進化0.85）
- **v2.3-b4n（2026-07-13・結果シーケンスv2＝演出リデザイン・⚠️実機確認待ち）**:
  - b4mの「同じポップアップの直線的連続」を刷新: **枠なし**（薄幕の上に金文字#FFD447＋ink白フチ＋絵だけ）・勝利アニメ後**0.8s余韻**・**各ステップの登場完了までボタン非表示**（畳みかけ防止）・「つぎへ」は小さく下
  - 固有演出（すべて新keyframe **pl-seq***・既存不変）: ①かった=ふわっ＋WinXpBar ②レベルアップ=薄幕+10%暗・突き上げオーバーシュート→Lv数字カチッ（旧すがた維持） ③しんか=**ゆっくり暗転60%（transition1.2s）→白シルエット明滅×2＋「…あれ？」→光がぱあっ→新すがたせり上がり→光点が木漏れ日ふうに舞う→+1.5sタメ** ④たまご=ささやき→ころんと落ちて2回バウンド ⑤なかま=ぷるぷる×2→光→ぽんっとジャンプ
  - **定数はSEQに集約**（Battle.jsx冒頭: BREATH800/DIM .45/+.10/.60/HOLD1500/各READY/内部タイムライン）＝★実機調整1箇所。reduced-motion=即時全表示
  - ★教訓: 新useEffectのdepsに**後方宣言のreducedMotionを書きTDZクラッシュ**（マウント時白画面・console はerror boundary警告のみ）→エフェクトを宣言の後ろへ移動で解消。挿入位置は宣言順に注意
  - 検証: verify/roundtrip全PASS・実プレイ4ステップ（金文字ふわっ→突き上げLv11→12→暗転からウズリュウ登場→たまご）＋**④を200msサンプリング実測**（ささやき0→ころん600ms→大文字1400ms→ボタン1600ms＝定数どおり）・最終ステップのみ従来遷移ボタン・戦闘中演出無傷・コンソールエラーなし。指示書=`brushup/battle_result_sequence_v2.md`
  - ⚠️次:神田さんの実機確認（**間・暗転率・文字サイズの体感が最終判断**＝SEQ定数で追い込む。App側進化演出との二重感はb4mから継続の申し送り）
- **v2.3-b4m（2026-07-13・バトル後の結果シーケンス＝b4nでリデザイン）**:
  - 勝利オーバーレイを**1ステップずつ・タップ送り**に再構成: ①かった！/クリア！（従来の報酬＋**けいけんちバー**が勝利前→後へ伸びる・レベルアップ回は満タンまで）→②レベルアップ！（**旧すがた**表示＋Lv◯→Lv◯＝新すがたは次で）→③しんかした！（新すがた大）→④たまごが とどいた！（egg.png）→⑤なかまが ふえた！（stage1）。**起きたものだけ**表示・「つぎへ▶」で送る・最終ステップは従来遷移（つぎの てき/フロアへ＋ホームへ）
  - 実装: `startWin`でapplyXpの前後を捕捉（新ref `winRes`＝戻り値+monId/lv/xp前後・タワーと共通の`grantXp`）・新state `winStep`・`WinXpBar`新設。**境界不変**（命中解決/突進/メッセージパネル/pl-*/勝利アニメ本体/敗北/付与ロジック）
  - ★申し送り（Chat判断）: **App側の進化演出（EvolutionOverlay）とトーストは従来どおり先に出る**（豪華版→シーケンスで復習の順）。二重が気になるなら「バトル中はApp側を抑制」が次の小改修候補
  - 検証: verify/roundtrip全PASS・実プレイ①Lv11→勝利=かった(バー満タン)→レベルアップ(旧すがた・Lv11→12)→しんかした(エンブレオ)→たまご（最終ボタン）＝4ステップ／実プレイ②Lv12+egg35=かった→なかまが ふえた（ゴロLv1）＝**スキップ動作**確認／戦闘中演出レコーダ発火・敗北不変。指示書=`brushup/battle_result_sequence.md`
  - ⚠️次:神田さんの実機確認（ステップの間・文言・バーの伸び0.9s・App側進化演出との二重感）
- **v2.3-b4l（2026-07-12・タイピング=タップ入力＋狭幅対応＝⚠️実機確認待ち）**:
  - **①タップ入力**: TypingKeyboardのキーをbutton化（`onKeyTap`）。Typing.jsxの入力を`handleInput(char)`に共通化＝物理keydown（従来どおり）とタップが同一処理（判定/採点/記録=romaji.js不変）。光ったキーをタップでも進む。`touchAction:manipulation`でダブルタップ拡大防止
  - **②狭幅で画面内に収める**: キー/gap/行段差をコンテナ実幅から計算（枠線2.5px×2はwidth外＝明示的に差し引く・最小キー18px）。狭幅(<430px)は指ラベル非表示。★**幅計測は三重化**（毎レンダー実測＋window resize＋ResizeObserver）＝**Browser paneでROが発火しない現象を実測**（b4bのmatchMedia誤発火と同族）→打鍵ごとの再レンダー実測が保険
  - **③案内文**: 「がめんは さわらなくて いいよ」→「キーを タップして うってね（そとづけキーボードでも OK）」／一覧の「そとづけキーボードを つかってね」→タップ可の文言に
  - 検証: verify全PASS（ローマ字128件込み）・プレビュー=タップ6打で1語クリア/合成keydownでも1語クリア/375px幅でキー20px・右端313px（はみ出しゼロ）・指ラベル非表示/幅復帰で29pxに自動拡大。キーサイズ・段差は初期値＝実機調整
  - ⚠️次:神田さんの実機確認（スマホ/iPadでタップの打ち心地・キーの大きさ・画面内に収まるか）
- **v2.3-b4k（2026-07-12・図鑑の解禁を到達段階ごとに＝⚠️実機確認待ち）**:
  - Dex.jsx のすがた解禁を「タイプ所持で3すがた全部」→**「到達記録ごと」**（`profile.dex` の `${id}-${stage}`）に。孵ったばかり=あかちゃんだけカラー・進化するたび その段階が解禁（silhouette/名前？？？/ロアボタンdisabledすべてreached判定）。タイプ見出し・未所持タイプの全？？？・dexへの登録ロジック（孵化=1・進化=2/3）は不変
  - 検証: verify/roundtrip全PASS・プレビュー=検証データ（hono到達3/mizu到達2/iwa孵化直後/mori・denki未所持）で 3すがた色／2すがた色＋影／1すがた色＋影／全影 を確認・未到達タイルはdisabled（ロア開かず）
  - ⚠️次:神田さんの実機確認（進化のたびに図鑑が埋まる体感）
- **v2.3-b4j（2026-07-12・たまごサイクル刷新＝⚠️実機確認待ち・スキーマ移行あり）**:
  - **レベルを相棒ごとに**: `partner={active, owned:[{id,level,xp}…], egg:null|{xp}}`（SCHEMA_VERSION 2→3）。`activeMon()`ヘルパー（growth.js）を全表示が参照（バトルHUD/部屋/カード/港/マップ/バトル解放判定）。EVOLVE_LEVELS不変（stage3=Lv12）
  - **たまご新サイクル**（旧EGG_LEVELS[5,12,18,24]方式・タップ開封モーダルは廃止）: アクティブが**stage3へ到達した瞬間に卵1個**（未所持あり＆卵なしのとき＝常に1個）→**アクティブが得るEXPで孵化ゲージ**（`EGG_HATCH_XP=40`・growth.jsに集約・★実機でテンポ調整）→満了で**未所持からランダム1体がLv1**で仲間に。孵化時トーストで きりかえを案内（**自動きりかえはしない**＝バトル中の孵化でスプライトが突然変わる事故回避・初期挙動）
  - **卵欄**（部屋）: egg.png＋ゲージバー＋文言（<50%あたためてる/<90%あと ちょっと/≧90%もうすぐ！）。卵なし=非表示・タップなし
  - **移行**: 3世代吸収（最新素通し/b4f〜i共有level→**各自に引き継ぎ**/旧々species）・旧ID読み替え継続・★移行でegg付与なし（既存stage3に卵が湧かない）。roundtripに移行4ケース＝全PASS
  - 検証: verify/roundtrip全PASS・実プレイ=移行後2体Lv11引き継ぎ→勝利でLv12到達→進化演出→**即egg{xp:0}**（他の子のLvは不変）→ゲージ12/40と卵欄表示→満了で**iwaがLv1孵化**・applyXp直検（Vite動的import）=5体でstage3到達しても付与なし/5体後は無反応。演出・図鑑・ロア不変。指示書=`brushup/partner_egg_cycle_implementation.md`
  - ⚠️次:神田さんの実機確認（孵化EXP=40のテンポ・卵欄の文言/ゲージの据わり・孵化時に自動きりかえしない初期挙動の是非）
- **v2.3-b4i（2026-07-12・いわの並び修正＋たまごランダム孵化＝b4jで方式刷新）**:
  - **①いわの並び**: `mon_iwa_2.png ↔ mon_iwa_3.png` を入替（でんきb4hと同じ方法・md5裏取り: 2=21b0…〔橙結晶ゴーレム=イワゴロ〕・3=d7af…〔苔の大ゴーレム=ガイオン〕）＝ゴロ→イワゴロ→ガイオン の正順に。iwa_1・ロジック不変
  - **②たまご=ランダム孵化**: 選択UI廃止→「たまごが とどいた！」→たまごをタップ（ぱかっ）→**未所持タイプからランダムで1体**→「〇〇が なかまに なった！」。未所持からのみ抽選＝必ず新しい仲間＝コンプ容易は維持。付与Lv（5/12/18/24）・未開封数の導出式・きりかえ導線は不変。「あとで あける」も残した
  - **③たまごの絵**: 仮SVG図形→`egg.png`（256px受領・部屋の床とモーダル共用・`EggIcon`をimg化＝調整1箇所）
  - 検証: verify全PASS・roundtrip全PASS・プレビュー=部屋にegg.png表示／タップ→未所持{mori,iwa}からmoriが抽選され「モリガルドが なかまに なった！」（Lv18=stage3で登場・図鑑登録3すがた）／いわ図鑑の画像順正常。deploy＋SHA raw（iwa両画像md5・egg.png 200）
  - ⚠️次:神田さんの実機確認（いわの進化順・ランダム孵化の体感・egg.pngの据わり）
- **v2.3-b4h（2026-07-12・でんきの並び修正＝⚠️実機確認待ち）**:
  - b4gの確認事項が解決（先に受領した2枚はChat側の保管データ破損による別画像＝見送りで正解・リポジトリの3枚は正常で並びだけ逆、と確定）
  - `mon_denki_2.png ↔ mon_denki_3.png` をファイル入替のみ（md5で入替を裏取り: 2=946d…〔結晶竜=イナズ〕・3=6b72…〔結晶獣=ライオウ〕）。denki_1（ピカ）・ロジック不変
  - ＝でんきの進化順: **ピカ（玉）→イナズ（小さな結晶竜）→ライオウ（大きな結晶獣）**
  - 検証: roundtrip全PASS・プレビュー=図鑑でんきが正順（imgs 1/2/3・名前対応）・deploy＋SHA raw（両画像のmd5一致確認）
  - ⚠️次:神田さんの実機確認（でんきの進化順が体感として自然か）
- **v2.3-b4g（2026-07-12・相棒取り違え修正＋ロアひらがな＋きろく画面＝⚠️実機確認待ち）**:
  - **①hono差し替え**: ポポ=丸い子（旧ヒノコの玉絵）／ヒノコ=二足の獣（旧ポポの竜絵）＝受領2点で上書き。図鑑の並びが あかちゃん→こども→せいちょう に
  - **⚠️②denki 2点は適用見送り（Chatに確認）**: 受領 `mon_denki_2.png` は**現ピカとバイト一致（md5同一）**・受領 `mon_denki_3.png` は**現イナズ（狼）とバイト一致**＝適用すると「ピカとイナズが同一画像」になるため梱包ミスと判断し、でんき系は現状維持（ピカ=玉／イナズ=狼／ライオウ=結晶竜）。**意図が「ライオウ=狼・竜は不使用」なら、新しいイナズの絵1点の受領が必要**
  - **③ロアひらがな化**: 5タイプのloreを指示の ひらがな主体文に差し替え（スターター選択の一文・ロアモーダル・図鑑に自動反映）。表示文字列の漢字残存なしをDOMで確認
  - **④きろくのへや**: プロフィール同様の左右レイアウト（左=PlayerAvatar full 200／右=「〇〇 の ぼうけん」＋ステータスplate3行=icon_stat_{star,badge,days}・絵文字⭐🏅🔥廃止）。flexWrapで狭幅は縦積み
  - 検証: verify全PASS・roundtrip全PASS（スキーマ不変）・プレビュー=きろく左右レイアウト/図鑑hono順/ひらがなロア確認・コンソールエラーなし
  - ⚠️次:神田さんの実機確認（honoの並び・きろくの据わり）＋**denkiの意図確認→新イナズ絵の用意**
- **v2.3-b4f（2026-07-12・相棒モンスター全面刷新＝⚠️実機確認待ち・大型）**:
  - **15体化**: `monsters.js`=5タイプ×3進化（mori/mizu/hono/denki/iwa・lore・スプライトpng 512px×15・typeEmoji廃止）。`MonsterArt`をCSS描画→`<img>`に刷新（**props互換**＝部屋/バトル/図鑑/進化演出/港カードが自動で新絵）。旧`monster-art.js`削除
  - **スキーマ移行**: `partner {species,level,xp}`→**`{active, owned:[…], level, xp}`**（level/xp共有）。旧ID読み替え **moko→mori／shizuku→mizu／★hoshi→denki（そら→でんき=最近縁と判断）**・save.dexの旧キーも読み替え。移行は`storage.js`に自己完結（`migratePartner`・monsters.js非依存＝node/roundtrip保護）。roundtripに移行4ケース追加・全PASS
  - **たまご収集**: `EGG_LEVELS=[5,12,18,24]`（初期値・★実機でテンポ調整）。**未開封数=導出式**（到達節目−孵化数＝スキーマにたまごフィールド無し・取りこぼし無し）。節目でトースト→部屋の床のたまご（SVG仮図形・絵文字不使用）→未所持から選んで孵化（現到達stageで登場・図鑑一括登録）→きりかえ導線。スターター選択は5体に
  - **図鑑15/ロア/きりかえ**: 図鑑=所持タイプ3すがた＋タップでロア・未所持シルエット・コンプ=5タイプ。部屋の相棒タップ→ロアモーダル（画像150・タイプ+Lv・lore・きりかえ=ownedサムネ・ずかん導線）
  - ★**受領アセットのstage順を2組リネームして配置**: `mizu_1↔2`・`denki_1↔3`は実絵と進化順が逆（雫の赤ちゃん=ポチャ・電気玉の赤ちゃん=ピカ・結晶竜=ライオウ）→**実機確認で各タイプの進化順を裏取りしてほしい**
  - ★技術教訓: `.fitArt`のwidth:100%は**imgのinline widthに負ける**→MonsterArtに`size=null`（寸法をCSSに任せる）を追加しバトルはnull＝b4cの進化スケール（コンテナ幅20/24/29%）を保全
  - 検証: verify全PASS・roundtrip全PASS・プレビュー=5体選択/部屋/ロア/たまご孵化→きりかえ/図鑑2/5表示/バトル演出実測（anticip0→lunge+119ms→-1+521ms）/進化演出（ミズチ→ウズリュウ）/owned全員の進化図鑑登録/旧セーブ（moko Lv12）が移行されモリガルド表示。演出境界・battle.js数値は不変。指示書=`brushup/partner_monster_redesign_implementation.md`
  - ⚠️次:神田さんの実機確認（15体の見た目と進化順・たまごのテンポ〔Lv5/12/18/24〕・ロアの据わり・部屋/バトルのサイズ感）。roadmap/feature-specの相棒項目更新はChatが別途
- **v2.3-b4e（2026-07-12・バトル中の🗼をtowerアイコンに統一＝⚠️実機確認待ち）**:
  - b4dの申し送り（バトル中に残っていた🗼絵文字3箇所）を消化: フロア表示ピル「Nかい」・勝利オーバーレイ・敗北メッセージ文中 → いずれも`icon_tower.png`のinline imgに置換
  - 実装: `TowerMini`部品を新設（Battle.jsx・**1.1em**のinline img・verticalAlign -0.18em＝テキスト高追従。★大きさ調整はこの1箇所）。3箇所とも同部品＝ピル14px級/オーバーレイ53px級が自動で出る。レイアウト・ロジック・文言・演出境界は不変
  - 検証: verify全PASS・プレビュー実測=タワー戦でピル（icon_tower.png・14.3px）／フロア1クリアで勝利オーバーレイの塔イラスト／わざと3敗で敗北オーバーレイ「（塔）2かいまで のぼった！」・**DOM上の🗼はゼロ**（残りはコードコメントのみ）。かいしん・ハート減・タイプライター等の演出も従来どおり動作
  - ⚠️次:神田さんの実機確認（3箇所のアイコンの大きさ・据わり→`TowerMini`の1.1emを1箇所調整）
- 検証体制: `npm run verify` ＝ パズル162面（★3最短＋難易度カーブ）＋クイズ360問（正解一意＋難易度タグ照合＋ループ回数表記禁止）＋ローマ字128件。FAILだと `npm run deploy` で公開されない

### 未完了タスク（backlog・roadmap.md §2 と同期）

1. **実機で継続確認**（大きな刷新が続いたため・各版の⚠️次を参照）: **クイズ改修b4u（関所B）**・相棒/たまごサイクル（孵化テンポ `EGG_HATCH_XP=40`・b4s卵欄）・結果シーケンスのタメ（SEQ定数）・バトル入口背景・タイピングのタップ入力・なかまわけ新形式（b4t）ほか b4系一式
2. **メモ06-A Phase2 ナッジ**（タワーのレベル選択の後押し）… 保留（タワーの手応えが実機で落ち着いてから）
3. **クイズ深さ化** … 後回し（必要な帯だけ）
4. **App側進化演出との二重**（結果シーケンスの進化が山場になったので、二重がクドければ「バトル中はApp側を抑制」）… 実機判断
5. **高学年拡張**（未着手・着手前にChatで設計）: 帯B 変数・イベント／帯C 自由制作・デバッグ・コード橋渡し

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
- 中間報告ポイント: P0完了時・P1完了時・P2ジェネレータ＋ソルバー完成時（量産前）・各フェーズ完了時

### 今も効く教訓（過去フェーズから集約。詳細はアーカイブ）

- ★ 背景＋%座標オーバーレイは「imgに高さを決めさせる」方式（display:block/width:100%/height:auto）が堅牢。`aspectRatio+cover` は幅依存でズレる（b2c）
- ★ ランダム選択・状態参照はコールバック/ループの外で1回（filter内のpickで毎アイテム再抽選=b4t／連打時のstale closureで上限超過=b3h／Reactのkeyに`Date.now()`はコンポーネント作り直し=P4）
- ★ 生成コンテンツは「機械が解けるか」だけでなく「人が図から一意に読めるか」も基準化（くりかえし図の回数表記禁止=P4後）
- ★ 部分改修は専用スクリプトで該当セルだけ差し替える（共有RNGの全再生成は下流まで変わる）。展開の前にまず診断して対象を絞る（A5/A6）
- ★ parは概念的な重さを表さない。重い入口は導入面（teach:true）で開ける（A5）
- ★ 実素材を見てから実装方法を確定する（robot.png回転の撤回=P3／透過素材は配置前にbbox確認=b4a）
- ★ `git add -A` の巻き添え混入に注意＝add前に `git status`（zip混入=P3）
- ★ GitHub Pagesのデプロイはときどき失敗する→空コミットをpushして再デプロイ（P0）
- ★ バッジ等の獲得判定は「和集合」で保持（構成変更で獲得済みが消える事故防止=P2）
- ★ スキーマ移行を伴う変更は roundtrip に移行ケースを足して機械確認（b4f/b4j）
