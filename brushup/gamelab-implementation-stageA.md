# 実装指示書: ゲームこうぼう 段階A（スタジオ共通化リファクタ・機能追加ゼロ）

作成: 2026-07-19 ／ 状態: **正本（段階Aの実装指示書）**
設計の正本: `brushup/gamelab-design.md` §8・§11 ／ スタジオ設計: `brushup/studio-design.md`（§11 の数値は変更禁止）
前提: 台帳 `progland-handoff.md` の現在地サマリを読んでから着手すること。

---

## §0 ゴールと絶対条件

### ゴール

つくるスタジオの実装（エディタ・ブロック描画・実行エンジン・棚UI・保存モデル）を
**「モード非依存の共通部品（workshop）＋スタジオ薄皮」** に分離する。
以後の「ゲームこうぼう」（段階1〜3）は、この共通部品＋こうぼう薄皮として実装できる状態にする。

### 絶対条件（1つでも破れば段階A失敗）

1. **見た目・挙動は1pxも変えない**（等価変換のみ）。文言・CSS数値・タイミング・音・
   保存データの形、すべて現状のまま。
2. **SCHEMA_VERSION は 6 のまま**。storage のキー・形を変えない（`gamelab` キーの追加は段階1）。
3. **機能追加ゼロ**。gameConfig・新カード・HUD・カセットだな等、こうぼう固有物は一切入れない。
4. `studio-design.md` §11 の24値・`geometry.js` の定数・`engine.js` の拍仕様は不変。
5. **既知の教訓コードをそのまま引き継ぐ**（設計§8）。特に:
   - b5m の下書き修正（`doSaveWork` 末尾の draft=null 化＋`writeDraft` の「同一内容なら書かない」ガード）
   - 幅ゲート（`@media (max-width: 699px)` の案内表示・JS向き検出なし）
   - matchMedia / ResizeObserver 不使用（過去2件の障害実績）
6. 回帰は**機械保証**する（§2 のハーネス）。「目視で同じに見える」を根拠にしない。

---

## §1 作業の骨子（順序を守る）

**先に物差しを作り、それから動かす。** リファクタ前の現行コードでベースライン（正解データ）を
固定し、リファクタ後も同じ出力になることを機械照合する。

- **S0**: 回帰ハーネス＋ベースライン fixture を「現行コードのまま」作成 → 全PASS → コミット【中間報告①】
- **S1**: 保存モデルの分離（works.js → 共通核＋スタジオ薄皮）
- **S2**: エディタの分離（StudioEditor → WorkshopEditor＋mode注入）【中間報告②】
- **S3**: 棚UIの分離（StudioHome → WorkshopHome＋mode注入）
- **S4**: 境界の機械チェック追加（共通部品がスタジオ固有物を import していないこと）
- **S5**: 総仕上げ（verify全本・build・ブラウザ機械実測・deploy）【最終報告】

各ステップの終わりに `npm run verify` 全PASS を確認してから次へ（小さく確実に・鉄則3）。
⚠️ dev サーバ稼働中に `npm run build` を実行しない（CLAUDE.md の既知事故）。

---

## §2 S0: 回帰ハーネス（tools/test-studio-regression.mjs）

### §2-0 前提の小修正（これだけは S0 でコードに触る・等価変換）

`src/studio/geometry.js` L4 の import を
`../data/studio-blocks.js` → `../data/studio-blocks-defs.js` に差し替える。
geometry が DEFS から使うのは `shape` だけ（blockH/chipY/labelY で実測確認済み）で、
blocks.js の DEFS は defs-core＋icon を足しただけ＝**完全に等価**。
これで geometry.js が node 安全になり、パス文字列を機械検証できるようになる。

### §2-1 新規 `tools/test-studio-regression.mjs` ＋ `tools/studio-baseline.json`

node で現行実装から以下を採取し、fixture（baseline）として**コミットする**。
テストは「現在の実装の出力 == baseline」を照合し、不一致で終了コード1。

1. **みほん4本のシリアライズ一致**（設計§8の明示要件）:
   `SAMPLES` の JSON 完全一致。
2. **カード定義**: `studio-blocks-defs.js` の DEFS（現行18種）・SOUNDS・STUDIO_BG_IDS・PALORDER。
   照合の向きは「**既存の変更・削除は FAIL／追加は許容**」（段階1で新カードが増えても
   スタジオの18種が不変であることを守るテストにする。PALORDER は現行の並びが
   先頭部分列として保たれていること）。
3. **ブロック描画のジオメトリ**: G・ANIM・CHIP_STYLE の全定数、
   `pathBody/pathHat/pathC/gloss` の代表幅数点（例: w=140/180/220、pathC は mouth=G.MOUTH と
   子入り相当・flatBottom 両方）のパス文字列、全18 type の `blockH`（容器は空と子2個入り）・
   `chipY`・`labelY`。SVGパス文字列が一致すれば「ブロックの形」は機械的に等価。
4. **エンジントレース**: みほん4本それぞれを createEngine に投入し **60拍** tick して、
   全コールバックのイベント列（onUpdate の cause＋全キャラの x/y/size/visible、onFx の key と fx、
   onGlow の on/off、onDone）を記録・JSON一致。
   - ブロックIDは採番順に依存するので、**イベント側で「初出のID→連番」に正規化**してから比較する。
   - 投入の作法は verify-studio.mjs のスモーク実行に合わせる（cloneBlocks等でIDを振る）。
   - スタジオの18種に乱数カードは無いのでトレースは決定的。tap/bump 発火も固定拍で
     `engine.tap(...)` を注入して1本以上トレースに含める（みほん tap/hide が対象）。
5. **意図的に更新する手段**: `--update` フラグで baseline を再生成できるようにする
   （将来仕様を変えるときだけ使う。段階A中に使ったら等価変換違反＝使用禁止）。

### §2-2 verify チェーンへの追加

`package.json` の verify に **7本目**として追加:
`... && node tools/test-studio-regression.mjs`

### §2-3 S0 の完了条件

- 現行コード（リファクタ前）で verify 7本全PASS。
- ここで一度コミット（baseline を物差しとして固定）。
- 【中間報告①】: baseline に何を収めたか・イベント数の規模・PASS結果を報告して続行。

---

## §3 分離の設計（目標ファイル構成）

### §3-1 目標の全体像

```
共通部品（モード非依存・こうぼうも使う）
  src/workshop/engine.js        ← src/studio/engine.js を移動（中身不変）
  src/workshop/geometry.js      ← src/studio/geometry.js を移動（§2-0 の import 差し替え済み）
  src/workshop/cast.js          ← src/studio/cast.js を移動（控え室は両モード共通・設計§4）
  src/workshop/store.js         ← 新規: works.js の共通核（§3-2）
  src/components/WorkshopEditor.jsx ← StudioEditor.jsx を改名し mode 注入化（§3-3）
  src/components/WorkshopHome.jsx   ← StudioHome.jsx を改名し mode 注入化（§3-4）
  src/components/StudioBlock.jsx    ← 既にモード非依存（DEFSをpropsで受ける形を確認・原則そのまま）
  src/components/StudioThumb.jsx    ← 既にモード非依存（bg/chars/profileだけ・そのまま）

共有カタログ（データ・両モードから参照可＝「studio」の名前でも共通扱い）
  src/data/studio-blocks-defs.js / studio-blocks.js / studio-bgs.js
  （改名しない。設計§5「新カード=データ追加」の器はこのファイルのまま使う）

スタジオ薄皮（スタジオ固有物はすべてここに集める）
  src/components/Studio.jsx     ← ルーター兼「mode設定の注入点」（§3-5）
  src/studio/works.js           ← store.js に委譲する薄皮（export の形は現状維持・§3-2）
  src/studio/mode.jsx           ← 新規: STUDIO_MODE 設定オブジェクト（§3-5）
  src/data/studio-samples.js    ← みほん（スタジオ固有）
```

- ファイル移動に伴う import 更新対象（調査済み・漏れ確認はビルドと grep で）:
  `StudioEditor(→WorkshopEditor)` / `StudioThumb` / `StudioHome(→WorkshopHome)` /
  `tools/verify-studio.mjs` / `tools/test-studio-engine.mjs` / `tools/test-roundtrip.mjs`（studio木の往復）/
  `§2の regression`。
- `src/data/powers.js`・`dressup.js`・`badges.js` は `studio-blocks-defs.js` 参照のみ＝**無傷**。
- `App.jsx`・`main.jsx`・`WorldMap.jsx`・`bgm.js`・`storage.js`・`growth.js` は**触らない**
  （Studio.jsx の外側インターフェース `<Studio onExit/>` と `#studio-dev` は不変）。

### §3-2 保存モデルの分離（S1）

`src/workshop/store.js`（**node 安全・純ロジック**。growth.js / storage.js を import しない）:

- 「モード空間」記述子 `space` を引数に取る形に一般化する:
  `{ key, worksMax, nameMax, namePrefix }`（スタジオ= `{key:"studio", worksMax:30, nameMax:8, namePrefix:"さくひん"}`）
- 現 works.js から移すもの: `ensureSpace(profile, space)`・`sceneNonEmpty`・
  `nextWorkName(works, prefix)`・`newWorkId`・`saveWork`・`stashDraft`・`deleteWork` の**骨格**。
- 副作用は注入で受ける: `saveWork(profile, space, scene, name, origin, hooks)` の
  `hooks = { persist(profile), grantForNewSave(profile, work, spaceData) }`。
  永続化（saveProfile）と教育接続（XP/コイン/きろく/マイルストーン）は呼び出し側の仕事にする。

`src/studio/works.js`（薄皮）:

- **export の形（関数名・引数・戻り値）は現状と完全に同一に保つ**
  （saveWork/stashDraft/deleteWork/ensureStudio/sceneNonEmpty/nextWorkName/newWorkId/
  WORKS_MAX/NAME_MAX/MILESTONE_NAMES）。中身が store.js に委譲するだけ。
- `grantForNewSave`（XP.studioSave/COIN.studio/log.studio/milestones）は**この薄皮に残す**
  ＝growth.js 依存（ブラウザ専用）もこの層に留まり、store.js は node で試験可能になる。

S1 完了時の追加テスト: store.js が node 安全になったので、§2 の regression に
**保存モデルの純ロジック試験**を足す（合成 profile で: 空作品ガード／新規=連番命名／
上書き=名前維持・grant なし／棚満杯 full／stashDraft の退避と黙殺／deleteWork）。
baseline 不要（期待値を直書きするユニットテスト形式でよい）。

### §3-3 エディタの分離（S2）

`StudioEditor.jsx` → `WorkshopEditor.jsx` に改名し、props を
`{ mode, open, showOnly, onExit }` にする。**手触りコード（ドラッグ・スナップ・実行・
発光・§11数値・CFG）は1行も変えない**。変えるのは「スタジオ固有物への直参照」を
`mode` 経由に置き換える箇所だけ。調査済みの注入点:

| 現在の直参照 | mode 経由に |
|---|---|
| `saveWork/nextWorkName/NAME_MAX/MILESTONE_NAMES`（works.js） | `mode.works.*` |
| `prof.studio` の draft 読み書き（初期化 L337付近・writeDraft L432-455・保存 L477-495） | `mode.space` のアクセサ（`getSpace(prof)` / draft の get/set） |
| `BGS`（studio-bgs.js） | `mode.bgs` |
| `DEFS/PALORDER/SOUNDS`（studio-blocks.js） | `mode.blocks.*` |
| ヘッダーの題字・サブ文言・マークSVG | `mode.texts` / `mode.mark`（ReactNode） |

- 実装中に上記以外の直参照が見つかったら、同じ作法（mode 経由）で置き換え、
  **差異として最終報告に列挙**する（★実装判断の作法）。
- CSS文字列（STUDIO_CSS）は WorkshopEditor に置いたままでよい（両モード同一の骨格。
  こうぼう固有の色替え等が要るときは段階1で `mode.css` 追記口を作る＝今はやらない）。
- WebAudio 簡易音・SND は共通のまま。

### §3-4 棚UIの分離（S3）

`StudioHome.jsx` → `WorkshopHome.jsx` に改名し、props を `{ mode, onOpen, onExitApp }` に。
構造（かきかけカード／あたらしく つくる／作品だな／みほんのたな／4択メニュー／けす確認／
トースト／狭幅ガード）は共通の骨格として残し、スタジオ固有物を注入に置き換える:

- `mode.space`（works/draft アクセサ・stashDraft/deleteWork/WORKS_MAX/NAME_MAX は `mode.works.*`）
- `mode.samples`（SAMPLES）・`mode.guide`（STUDIO_GUIDE）・`mode.homeBg`（studio-interior）
- `mode.texts`（題字「つくるスタジオ」・サブ・棚題「フィルムだな」「みほんのたな」・
  空メッセージ・ヒント等、画面上の全文言）・`mode.mark`
- CSS はそのまま WorkshopHome に置く。フィルム風フレーム（.film-frame）も現状のまま
  （カセットだなの差別化は段階2の課題。今は「同じ見た目」が正）。

### §3-5 スタジオ薄皮の注入点

`src/studio/mode.jsx`（新規）に `STUDIO_MODE` を1か所で定義:
works（studio/works.js の束）・space アクセサ（`prof.studio`）・blocks・bgs・samples・guide・
texts・mark・homeBg。**スタジオ固有の import はこのファイルと works.js だけに現れる**状態が理想形。

`Studio.jsx` は現行の薄いルーターのまま、WorkshopHome / WorkshopEditor に
`mode={STUDIO_MODE}` を渡す配線だけにする（onExit・key 再マウント・seq の作法は不変）。

---

## §4 S4: 境界の機械チェック

`tools/test-studio-regression.mjs` に静的スキャンを追加する:

- `src/workshop/*.js`・`WorkshopEditor.jsx`・`WorkshopHome.jsx` の import 行を読み、
  **禁止 import** が無いこと: `src/studio/`（works/mode）・`data/studio-samples.js`・
  `growth.js`・`data/parent-guide.js`・`assets/studio-assets/studio-interior`。
- **許容 import**: `data/studio-blocks*.js`・`data/studio-bgs.js`（共有カタログ扱い）・
  `storage.js` の汎用関数（lastProfile/saveProfile）・React・共通コンポーネント。
- 違反があれば FAIL＝「共通部品にスタジオ固有物が漏れたら機械で止まる」を恒久化する。

---

## §5 ブラウザ機械実測チェックリスト（S5・等価確認）

verify が守るのは node で見える範囲。ブラウザ側は過去の実機ゲート項目から代表点を再実測する
（b5d〜b5g・b5m の合格項目の再現。合成 PointerEvent の既存作法）:

1. **エディタ手触り**: パレット18種2列／束外し／磁石スナップ＋ゴースト／救済140／入れ子深さ2／
   きっかけ各1本制限（プルッ拒否）／ステッパー端停止／おと切替／長押しコピー／とりけし・やりなおし／
   たなへ捨てる。
2. **実行**: ▶で並行実行・発光・端停止・■初期化・タップ発火・ぶつかり発火・ひろげる=編集UI消灯。
3. **保存モデル（storage 実測）**: 新規保存→works+1・**draft=null**（b5m④の再確認）／
   みほんリミックス→「かんせい!」＋remixOf 記録＋マイルストーン付与／上書き保存→付与ゼロ・演出なし／
   かきかけ→リロード復元＋トースト／みほんを開くと自動退避「さくひん連番」／上限30で「たなが いっぱい!」／
   みる（showOnly）で draft 不変。
4. **棚UI**: フィルムだな表示・4択・けす確認・みほん4本・初回ヒント・狭幅ガード（699px以下）。
5. **教育接続の非破壊**: 保存で XP+10・初回コイン・log.studio・バッジ/ベレー判定が従来どおり
   （powers/dressup/badges は defs 参照のみ＝コード無傷を grep でも確認）。
6. **コンソールエラーゼロ**（dev と build 後の両方）。

---

## §6 完了条件と最終報告

- `npm run verify` **7本全PASS**（regression 含む）。
- `npm run build` 成功 → §5 全項目PASS → `npm run deploy` → コミットハッシュ報告。
- 最終報告に含める: ①新旧ファイル対応表 ②mode 注入点の一覧（指示書§3-3/3-4 との差異があれば明記）
  ③regression の規模（照合イベント数等） ④★実装判断（指示書と実態の相違・判断で埋めた行間）
  ⑤神田さんの実機確認の観点。
- **【実機確認】ゲート（神田さん・段階Aの合格判定）**: 見るべきは「何も変わっていないこと」。
  - マップ→スタジオ→みほん1本を開いて▶上演→とじる
  - あたらしく つくる→カードを2〜3枚組んで▶→ほぞん→棚に増える
  - かきかけが復元される・以前作った作品が全部残っている
- 台帳更新は最終報告時に文案を提示（b5系の作法どおり・段階A完了の行＋教訓）。

---

## §7 やらないこと（スコープ外・触ってはいけない）

- gameConfig・スコアカード・HUD・クリア判定・カセットだな・こうぼう建物/マップ変更（段階1〜3）。
- SCHEMA_VERSION 変更・`gamelab` キー追加（段階1）。
- スタジオの文言・CSS数値・音・タイミングの「ついで改善」（気づいた改善点は提案として報告のみ）。
- `engine.js` の仕様変更（移動のみ）。`data/studio-blocks*.js` の中身変更（§2-0 の geometry 側
  import 差し替えを除く）。
- `App.jsx`・`storage.js`・`growth.js`・`powers.js`・`dressup.js`・`badges.js`・
  `progland-実装指示書.md`（正本・承認なし編集禁止）・`programming-land.jsx`（参照専用）。
- 実機確認前の段階1着手。

---

## §8 参考: 今回の調査で確認済みの事実（Code の再調査を省くためのメモ）

- StudioEditor.jsx は1250行。スタジオ固有の直参照は §3-3 の表の範囲（grep 実測）。
  手触りコードとCSSが大半＝改名＋注入点置換で済む構造。
- works.js は growth.js 依存のためブラウザ専用（ファイル冒頭に明記あり）。分離で純ロジック部が
  node に降りる＝§3-2 の追加テストが可能になる。
- geometry.js が DEFS から使うのは shape のみ（blockH/chipY/labelY）＝§2-0 は等価。
- StudioBlock.jsx / StudioThumb.jsx は既にモード非依存（前者は DEFS を props で受けるか要確認。
  直 import なら mode 経由 or props 化のどちらか軽い方でよい＝★実装判断で報告）。
- verify チェーンは現在6本（verify/quiz/typing/studio/engine/roundtrip）。
- roundtrip の studio 系チェック（完全往復・旧世代補完）はそのまま生きる＝スキーマ不変の保証側。
