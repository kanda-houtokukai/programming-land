# 監査報告書: プログラミングランド 全体の整合性チェック

実施: 2026-07-26 ／ 監査セッション（Opus 5・読み取り専用）
指示書: `brushup/audit-2026-07-25.md`
起点: `main` HEAD **59e7d6d** ／ 公開中 **v2.3-b6m**
着手時 `git status --porcelain` = **空**（確認済み）

---

## §0. この報告書の読みかた

- **区分**: A=壊れている ／ B=壊れる可能性 ／ C=整合していない ／ D=確認漏れ ／ E=放置されている判断
- 各項目に「どうやって確かめたか」を必ず書いた。**行番号はすべて HEAD 59e7d6d 時点**
- **事実と推測を分けた。** 推測には「【推測】」と明記した。数値の見積もりには前提条件を書いた
- コードは1バイトも変更していない。`npm run verify` のみ実行した（全PASS）

### 0-1. いちばん先に読むべき3件

| # | 区分 | 内容 |
|---|---|---|
| **A-1** | **A** | **かんとくベレーが永久に入手不能**（2026-07-21 の v2.3-b5u 以降ずっと） |
| **B-1** | **B** | **キャラを消して保存すると、相手指定（ぶつかったら／ゴール）と ばくだん(💀) が別のキャラを指す／どこも指さなくなる** |
| **B-2** | **B** | **全画面上演で、いちばん上の段・いちばん右の列のキャラが ぶたいの外に はみ出して切れる**（計算値。要実機確認） |

---

## §1. A: 壊れている

### A-1. かんとくベレーが永久に入手不能になっている ★最重要

**何が問題か**
`head_kantoku`（かんとくベレー）の解放条件が「`DEFS` の**全型**を studio の works で使ったか」になっている。`DEFS` はゲームこうぼうのカードを含めて **29種**に増えたが、つくるスタジオの こうぐだな（`PALORDER`）には **18種**しか出ない。残り11種は studio の作品には**物理的に置けない**ため、条件が満たされることはない。

**どうやって確かめたか**

- `src/data/dressup.js:116-119`
  ```js
  studio_all_cards: save => {
    const used = usedBlockTypesInWorks((save.studio && save.studio.works) || []);
    return Object.keys(STUDIO_DEFS).every(t => used.has(t));   // ← 29種すべて
  },
  ```
  `STUDIO_DEFS` は `src/data/studio-blocks-defs.js` の `DEFS`（29種・`dressup.js:109` で import）
- 実行して確認（node・読み取りのみ）:
  ```
  DEFS types: 29 / PALORDER (studio shelf): 18
  studio のこうぐだなに出ない型: 11
    scoreUp, scoreDown, moveRand, bounce, bumpTarget, dpad, tapMove, jumpable, chase, fall, goal
  => studio の works だけで Object.keys(DEFS).every(used) を満たせるか: false
  ```
- 表示ラベルは `dressup.js:89-90` で「つくるスタジオで **18しゅるいの** カードを ぜんぶ つかうと もらえる」＝**文言は18種のまま**。判定だけが29種に膨らんだ
- 壊れた時期: `git log -S'scoreUp:' -- src/data/studio-blocks-defs.js` → **ec73f76（2026-07-21・こうぼう段階1 中間①）** で `scoreUp`/`scoreDown` が追加され `DEFS` が 18→20 になった。当時の版は **v2.3-b5u 前後**（`ef2d4a5` の `version.js` = v2.3-b5v）。以後、段階2・段階3でカードが増えるたびに条件はさらに遠のいた

**影響**
- 子ども: つくるスタジオで18種すべてを使い切っても **かんとくベレーがもらえない**。おしゃれ棚には「18しゅるいの カードを ぜんぶ つかうと もらえる」と出たままなので、**達成したのにもらえない＝アプリが壊れて見える**
- `head_kantoku` は `acquire.type === "achievement"` なのでショップでも買えない＝**回復手段がない**
- 波及は無い（`legend` バッジ・`all_badges`（おうかん）は バッジのみを見ており、きせかえは見ていない。`src/data/badges.js:101` を確認）

**直し方の案（実装しない）**
判定を「studio の棚に出る18種」に限定する。例:
```js
// import に PALORDER を足し、
studio_all_cards: save => {
  const used = usedBlockTypesInWorks((save.studio && save.studio.works) || []);
  return PALORDER.every(t => used.has(t));
},
```
`PALORDER` は回帰ハーネスが先頭部分列で凍結しているので、将来 studio にカードを足しても文言（18しゅるい）とのズレは残る。**文言も `PALORDER.length` から組み立てる**と二度と腐らない。

⚠️ **既存セーブの扱いに判断が要る**: 修正すると「すでに18種を使い切っている子」が次回起動で一斉に解放される。これは望ましいが、`checkAchievementUnlocks` の呼び出しタイミング（App の update）で祝い演出が出るかどうかは要確認。

---

## §2. B: 壊れる可能性

### B-1. キャラを消して保存すると、相手指定と ばくだん が別のキャラを指す ★

**何が問題か**
`cid`（c1, c2, …）は**保存時に捨てられ、読み込み時に配列の並び順から振り直される**。一方 `bumpTarget` / `goal` / `chase` の `target` と `gameConfig.gameOver.targetId` は **cid の文字列をそのまま保存している**。
そのため「途中のキャラを消して保存 → 開き直す」と、後ろのキャラの cid が1つずつ繰り上がり、**相手指定が別のキャラにすり替わる**か、**存在しない cid を指して黙って発火しなくなる**。

**どうやって確かめたか**

- 読み込み時に cid を振り直している: `src/components/WorkshopEditor.jsx:518-520`
  ```js
  const loadScene = src => src.chars.filter(...).slice(0, CFG.MAX_CHARS).map((c, i) => ({
    cid: "c" + (i + 1), kind: c.kind, ...      // ← 保存された cid は読まない
  ```
- 保存時に cid を捨てている:
  - 作品保存 `WorkshopEditor.jsx:714`（`doSaveWork`・関数は :710 から）: `sc.chars.map(c => ({ kind: c.kind, x: c.x, y: c.y, stacks: c.stacks }))` ← `cid` なし
  - かきかけ `WorkshopEditor.jsx:671`（`writeDraft`・関数は :665 から）: 同上
  - `src/workshop/store.js:44` のコメントも「scene={bg, chars}（純データ・**cid**/実行状態を**含まない**）」と明記
- `target` は `cloneBlocks`（`studio-blocks-defs.js:124-130`）が `{...b}` で丸ごとコピーするため cid 文字列のまま生き残る
- キャラ削除は splice のみで cid を振り直さない: `WorkshopEditor.jsx:1465`（＝**セッション中は壊れない。壊れるのは 保存→開き直し のとき**）
- 存在しない cid になったときの挙動:
  - 表示: `WorkshopEditor.jsx:1186` `targetName = cid => { const c = ...find(...); return c ? kindName(c.kind) : "だれか"; }` ← **「だれか」と表示される**
  - エンジン: `src/workshop/engine.js:319-323` `if (tgt == null || tgt === "any" || tgt === other.key) startThread(...)` ← 古い cid は `"any"` ではないので **一度も発火しない**
  - ★つまり **画面には「だれか（＝誰にでも反応する）」と出るのに、実際は誰にも反応しない**。表示と挙動が正反対
  - ばくだん: `WorkshopEditor.jsx:1305-1307` `if (!g.gameOver || !g.gameOver.targetId) return false;` → cid が残っているので早期 return せず `eng.getChar(古いcid)` が undefined になる。せってい欄は「ばくだんタッチ **◯**」のまま、💀 はどのキャラにも付かない（`WorkshopEditor.jsx:1738-1746`）＝**負けが成立しないゲームになる**
- `chase` だけは救済されている: `engine.js:132-133`「any／消えた指定は、いちばん近い見える他キャラ」＝**3枚のうち1枚だけ作法が違う**

**再現手順（実機で確認できる）**
1. ゲームこうぼうで キャラを3体置く（c1 主人公 / c2 / c3）
2. 主人公に「ぶつかったら［3ばんめのキャラ］→ スコア＋」を組む
3. **2ばんめのキャラをドラッグして控え室で消す**
4. ほぞん → たなへ → もう一度その作品を開く
5. カードのピルが「だれか」に変わっている。▶ で遊んでも点が入らない

**影響**
- 子ども: 「キャラを1体消しただけ」で、自分で作ったゲームが**理由の分からないまま動かなくなる**。原因が見えないので直せない
- 起きる確率は低くない。控え室のラベルに「けすときは ここへ ドラッグ」と書いてあり（`WorkshopEditor.jsx:1771`）、消すことは推奨された操作

**直し方の案（実装しない）**
1. **保存する**（推奨）: `chars` に `cid` を含めて保存し、`loadScene` は「保存された cid があればそれを使う・無ければ index から振る」にする。`cidSeq` も max(既存cid)+1 にする。⚠️ `tools/test-studio-regression.mjs` がみほん4本を丸ごと凍結しているが、みほんは cid を持たない純データなので影響しない
2. **保存時に付け替える**（互換性重視）: 保存直前に「現在の cid → 保存後の index 由来 cid」の対応表を作り、`target` と `gameOver.targetId` を書き換える。既存の保存データは救えない
3. **最低限の防御**: 解決できない cid は `"any"` に落とす（`chase` と同じ作法に揃える）。表示（だれか）と挙動が一致する。⚠️ 「誰にも当たらない」が「誰にでも当たる」に変わるので、これ単独では別の驚きを生む

**自信**: 高（コードの読みだけで確定できる。実機での再現は未実施＝手順は上記）

---

### B-2. 全画面上演で、上端の段と右端の列のキャラが ぶたいの外に切れる

**何が問題か**
キャラの表示サイズ（`cellPx × ACTOR_K`）と、マス目サイズの算出式（`(h-44)/LROWS`）が釣り合っていない。ぶたいが一定より大きくなると、**いちばん上の段（y=7）のキャラの頭が ぶたいの上端で切られる**。右端（x=11）も同様に、赤い幕（`.theater::before/::after` 幅14px）の下に潜る。

**どうやって確かめたか（すべて静的計算）**

使った値:
- `WorkshopEditor.jsx:1239` `c = Math.max(4, Math.min((w - 52) / LCOLS, (h - 44) / LROWS))`（LCOLS=12・LROWS=8）
- `WorkshopEditor.jsx:477-478` `ax = 22 + disp.x*c` ／ `ay = -y*c`
- CSS `.actor { bottom: 12px }`（`WorkshopEditor.jsx:216`）／ `.theater { aspect-ratio: 3/2; overflow: hidden }`（`WorkshopEditor.jsx:208-210`）
- `WorkshopEditor.jsx:1489` `actorBase = cellPx * (isGame ? 1.8 : 2.2)`（`CFG.ACTOR_K=2.2` / `ACTOR_K_GAME=1.8`）
- キャラ画像は全て正方形で中身がほぼ全高（PIL で実測: `enemy_*.png` 9枚・`mon_mori_*.png` は 256×256 / 512×512 の正方形、bbox 高さ 71.9〜100%）

比が 3:2 のとき `c = h/8 - 5.5`（幅側 `(1.5h-52)/12 = h/8 - 4.33` より小さいので**必ず高さ側が効く**）。
上端に収まる条件は `12 + 7c + K·c ≤ h` ＝ **`h ≤ (44K + 212)/(K-1)`**。

| | ACTOR_K | 上端が切れ始める ぶたい高さ | 右端が幕に潜り始める高さ |
|---|---|---|---|
| つくるスタジオ | 2.2 | **h > 257px** | h > 244px |
| ゲームこうぼう | 1.8 | **h > 364px** | h > 344px |

全画面時の ぶたい高さ（`.studio-root.big .theater { width: min(100%, calc((100dvh - 110px) * 1.5)) }`＝`WorkshopEditor.jsx:348`）:
- iPad 横（dvh≈820）→ h ≈ **710px** → studio: `12 + 9.2×83.25 = 778` vs 710 ＝ **68px（キャラ高さ183pxの約37%）が上に はみ出す**
- gamelab の全画面は `.big.gl` で じゅうじキー分を引くため h≈600 前後 → `12 + 8.8×69.5 = 624` vs 600 ＝ **約24px（キャラ高さ125pxの約19%）が切れる**

**この段は実際に使われている**: みほん「おちものキャッチ」の リンゴ役は `y: 7`（`src/data/gamelab-samples.js`）。`fall` カードも上端 y=7 から降ってくる（`tools/test-studio-engine.mjs` の「下端の次の拍で上端(7)へ戻る」で確認）。

**影響**
- 上から降ってくるものが「画面の外から出てくる」ように見える＝**演出として自然に見えてしまうので、誰も不具合と気づかない**。しかし y=7 に置いた ゴール旗・てき は頭が切れる
- 編集画面（全画面でない）では ぶたいが小さいので studio でぎりぎり、gamelab は余裕がある。**全画面上演でだけ顕在化する**

**直し方の案（実装しない）**
`updateDims` の余白 44 は `ACTOR_K` を前提にしていない。`c = min((w - 52 - K*?)/LCOLS, (h - 12 - K*c)/LROWS)` は自己参照になるので、解いて
`c = (h - 12) / (LROWS - 1 + K)` ／ 横は `c = (w - 22 - 14) / (LCOLS - 1 + K)` の小さい方、という形にすると必ず収まる。
⚠️ ただし `G.SNAP` などと同じ「プロトタイプ由来の凍結値」に触ることになる（台帳「生きている注意事項」）。**変えると studio の見た目が変わるので、実機ゲート必須。判断が要る。**

**自信**: 計算は高い確信（式と定数は上記のとおり）。ただし **実機の実測値ではない**。`dvh` の実効値・ヘッダー高さ・`.studio-right` の padding によって h は前後する。**D区分としても扱ってほしい＝実機で「みほん おちものキャッチ を全画面で開き、リンゴが上端に出た瞬間に頭が切れているか」を1回見れば決着する。**

---

### B-3. `SCHEMA_VERSION` が読み込み時に更新されない

**何が問題か**
`SCHEMA_VERSION = 8` だが、**移行判定にどこでも使われていない**（移行はすべて「形を見る」方式＝`migratePartner` と デフォルト値マージ）。さらに `mergeDefaults` が `{...d, ...parsed}` の順なので、**保存データ側の古い `schema` 値が勝ち、そのまま書き戻される**。schema 3 で始めた子のセーブは、中身が v8 相当に移行された後も `schema: 3` のまま残り続ける。

**どうやって確かめたか**
- `src/storage.js:7`（宣言）・`:31`（新規作成時のみ代入）・`:95`（`mergeDefaults` の `out = { ...d, ...parsed }`）
- `grep -rn "schema" src/` の結果、`SCHEMA_VERSION` 以外で `save.schema` を**読んでいる箇所は0件**
- `exportProfileJSON`（`storage.js:162`）はトップレベルに `schema: 8` を書くが、中の `profile.schema` は古いまま＝**同じファイルに2つの版番号が入る**

**影響**
- いま壊れているものは無い（現状の移行はすべて形を見ているため）
- 将来 `if (save.schema < N) …` の形で移行を書いた瞬間に、**移行済みのデータに対して再度移行が走る**。二重移行は静かにデータを壊す

**直し方の案**: `mergeDefaults` の最後で `out.schema = SCHEMA_VERSION` にする。1行。

**自信**: 高（コードで確定）。「将来壊れる」部分は【推測】ではなく設計上の帰結だが、実害が出るのは次に版判定を書いたとき。

---

### B-4. 保存作品の背景がショップ未所持でも表示される件（b6m）— 救済ロジックは調べた限り穴なし

**結論: 調べたが問題は見つからなかった。** 確かめた範囲を残す。

- `availableBgs(bgs, profile, keepId)`（`src/data/studio-bgs.js:35-41`）の `keepId` は `initRef.current.bg`＝**その作品を開いた時点の背景**（`WorkshopEditor.jsx:1760`）。現在の選択ではないので、未所持背景から別背景に切り替えても元へ戻れる ✓
- 開き口を全部たどった: `openNew`（BGS[0]=sougen＝常時開放）／`openSample`（s.bg → keepId になる）／`openView`（上演専用＝背景欄を描画しない）／`openRemake`・`openCopy`（w.bg → keepId）／draft 復帰（draft.bg → keepId）。**未所持背景が keepId から漏れる経路は見つからなかった**（`WorkshopHome.jsx:163-190`）
- ショップの商品IDと突合: `BG_SHOP_ITEM = { jungle: "bg_jungle", canyon: "bg_canyon" }`（`studio-bgs.js:28`）vs `COSMETICS`（`src/data/battle.js:66-67`）の `bg_jungle` / `bg_canyon` — **一致** ✓（ここがズレていたら永久に解放されない類の事故になる）
- 保存済み作品の表示・サムネ（`StudioThumb.jsx:22` の `bgById`）は `availableBgs` を通らない＝**未所持背景の既存作品はそのまま表示される** ✓（指示書 §1-3 のとおり）
- `profile` が null（`#studio-dev` 等）でも `owned=[]` として動く ✓

**ただし1点、記録との食い違い**（→ C-1 に記載）: この変更は **studio にも効いている**。

---

## §3. C: 整合していない（動くが、記録と実態が違う）

### C-1. 「studio 完全無変化」は b6m でもう成立していない（意図的だが、台帳の表現が追いついていない）

- b6m（`f7b09a5`）の `availableBgs` は**共通部品 `WorkshopEditor.jsx` に入っている**ので、つくるスタジオの ぶたい選択欄にも効く。`git show f7b09a5 -- src/components/WorkshopEditor.jsx` で確認
- これは **意図的**: 指示書 `brushup/feedback-b-shop-samples.md:9`「ステージ選択は、アイテムショップで購入できたものだけ表示したい（**スタジオも**）」・同 `:37`「studio と gamelab の両方に適用」＝神田さんの要望
- **問題は台帳側**: 「studio 完全無変化」は b6f までの実機ゲート文言として繰り返し使われており（台帳 98行目・154行目）、b6m 以降は**もう真ではない**。次に読む人が「studio は触っていないはず」と信じて調査を打ち切る危険がある
- **直し方**: 台帳の「生きている注意事項」に「**b6m 以降、studio の ぶたい選択欄は ショップ所持で絞られる（意図的）**」を1行足す

### C-2. 凍結ベースラインは5回 再生成されている。うち1回は「deploy」コミットに埋もれた

**確かめたこと**（`tools/studio-baseline.json` の全履歴を突合）

```
63d37cb 段階A S0（初回生成）   traces 732 / paths 91 / defs 18
ef2d4a5 deploy                traces 732 / paths 91 / defs 20   ← ★コミットメッセージが "deploy" だけ
f69462b こうぐだなUI刷新 区切り① traces 732 / paths 98 / defs 23
8dfe146 段階3 区切り①          traces 732 / paths 98 / defs 25
e5b06a7 段階3 区切り②          traces 732 / paths 98 / defs 28
84c085d 段階3 区切り④          traces 732 / paths 98 / defs 29
HEAD                          traces 732 / paths 98 / defs 29
```

**守られていたもの（初回 63d37cb と HEAD を機械照合）**
- **トレース 732イベント: 完全一致** ✓（dance 291 / chase 93 / tap 111 / hide 85 / _synth 152）
- **みほん4本: 完全一致** ✓
- **エンジン定数: 完全一致** ✓（`TICK 400` / `LCOLS 12` / `LROWS 8` / `SIZE_STEPS` / `SIZE_INIT 2`）
- **`PALORDER` 18種: 完全一致** ✓
- **パス文字列 91本: 1本も変わっていない** ✓（増えた7本は新しい幅 210 の追加分）
- **`ANIM`（隙間180ms・吸着110ms・掴み2.6/1.05・着地200ms）: 完全一致** ✓
- `G.SNAP = 78` / `SNAPWY 1.3` / `RESCUE 140` / `MAXDEPTH 2`: 変化なし ✓

**変わっていたもの**
| 対象 | 初回 | HEAD | 記録 |
|---|---|---|---|
| `G.CHIP` | 34 | **30** | `geometry.js:26`/`:28` にコメントあり・台帳251行目にも記載 ✓ |
| `G.ICON` | 26 | **24** | 同上 ✓ |
| `measures.*.chipY`（通常13種） | 7 | **9** | 上の帰結 |
| `measures.repeat/forever.chipY` | 5 | **7** | 上の帰結（★描画側は `Math.max(chipY, 9)` なので実際は 9 が使われる＝ベースラインが記録している値は実描画値ではない） |
| `DEFS` 既存18種の `label` | 5件が変更 | | `hat` はたが おされたら→**はた ▶** ／ `move` みぎへ すすむ→**みぎへ** ／ `moveL` ひだりへ すすむ→**ひだりへ** ／ `home` もとのばしょへ→**もとのばしょ** ／ `sound` おとを ならす→**おと**。全18種に `long`/`desc` が追加 |

**何が問題か**
`tools/test-studio-regression.mjs:8-9` は「**既存 type の変更・削除は FAIL**」と宣言しているが、上のとおり既存5種のラベルが実際に変わっている。FAIL しなかったのは、そのたびに `--update` でベースラインを取り直しているから。**この保証は「`--update` を打たない規律」に完全に依存していて、機械的には守られていない。**
さらに `ef2d4a5` は `npm run deploy`（`package.json` の `git add -A && git commit -m deploy`）が生成したコミットで、**ベースラインの再生成がメッセージ "deploy" の中に埋もれている**。history を追う人はここを見落とす。

**影響**: 「凍結」を信じて差分を確認しない人が出る。実際、この監査でも `git log --stat` を1コミットずつ見るまで気づけなかった。

**直し方の案**
1. `package.json` の `deploy` から `git add -A` をやめ、`docs/ src/ tools/` を明示 add にする（`git add -A` は台帳・指示書・ベースラインまで巻き込む）
2. `--update` を打ったら必ず**単独コミット**にし、メッセージに「ベースライン再取得: 何を意図的に変えたか」を書く
3. `traces` / `samples` / `engineConst` / `paths` は**別ファイルに分けて `--update` の対象外**にする（これらは実際6回とも不変だった＝分けても運用は困らない）

**自信**: 高（すべて git の実データ）

### C-3. こうぐだなのカードから つや（gloss）が消えている。import だけ残っている

- `src/components/WorkshopEditor.jsx:12` で `gloss` を import しているが、**ファイル内で1度も使っていない**（自作スクリプトで全 import の使用有無を走査 → `gloss` のみ未使用）
- `git show 1046625 -- src/components/WorkshopEditor.jsx | grep gloss` → こうぐだなUI刷新 区切り② で
  `- <path d={gloss(w, isHat)} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="3.5" .../>` が**削除されている**
- そのコミットメッセージ（`git show 1046625`）に **つやを消したことは書かれていない**
- 作業エリア側（`StudioBlock.jsx:77`）には gloss が残っている＝**同じカードが、棚では つや無し・作業エリアでは つや有り**

**影響**: 見た目の一貫性。子どもが「同じカード」と認識しにくくなる可能性はあるが、実害は小さい。ただし **意図的だったのか消し忘れなのかが記録から判定できない**のが問題。

**直し方**: どちらかに揃える。棚に戻すなら1行復活、消したままなら `import` から `gloss` を外す。

### C-4. こうぐだなの SVG が viewBox と要素サイズで食い違っている（FB便A §2 と同じ型・規模は約1/5）

- `WorkshopEditor.jsx:1546`
  ```jsx
  <svg width={colW} height={Math.round(vbH * PAL_S)} viewBox={`-1 ${isHat ? -5 : -1} ${W0 + 2} ${vbH}`}>
  ```
  横の倍率 `colW / (W0 + 2)` と 縦の倍率 `round(vbH·PAL_S) / vbH` が一致しない（`W0 = colW / PAL_S`＝`WorkshopEditor.jsx:1523`）
- 実数（colW=107・PAL_S=0.67 のとき）: 横 = 107/161.70 = **0.6617**、縦 = 43/64 = **0.6719**（ふつうカード）／ 50/74 = **0.6757**（きっかけ）
  → `preserveAspectRatio` 既定（`xMidYMid meet`）は小さい方を採るので **横の 0.6617 で一律縮小＋縦中央寄せ**。意図した 0.67 に対し **98.0〜98.8%**、上下に 0.3〜0.5px の空きが出る
- `.gllbl` の位置は `G.LABELX * PAL_S` / `labelY(t) * PAL_S`（`WorkshopEditor.jsx:1552`）＝**実効倍率でなく PAL_S** を使っているので、アイコン台座とラベルが 0.3px ほどずれる
- FB便A §2 で直したのは `StudioBlock.jsx` の側（そちらは倍率 1.0 で一致 ✓ ＝`StudioBlock.jsx:74-75` を確認）。**同じ食い違いが棚側に残っている**

**影響**: 1〜2%・0.5px 未満。**実害はほぼ無い。** ただし「同じ型の不具合が他に無いか」という §1-2 の問いへの答えとして記録する。

**直し方の案**: `width={Math.round((W0 + 2) * PAL_S)}` にする（`+2` のストローク余白も含めて縮める）。または viewBox の幅を `W0` にして `overflow: visible` に頼る。**どちらも棚の見た目が 1% 動くので、実機で確認してから。**

### C-5. 使われていないファイル・import

**参照ゼロのアセット（6件）** — 全ファイル名を `grep -rl` で `src/**/*.js{,x}` に照合し、動的参照（`new URL` / `import.meta.glob` / テンプレート文字列）が **0件**であることも確認済み

| ファイル | 状況 |
|---|---|
| `src/assets/grow_0_seed.png` | 参照0（`grow_4_flower.png` のみ `WorldMap.jsx:17` で使用） |
| `src/assets/grow_1_sprout.png` | 参照0 |
| `src/assets/grow_2_leaves.png` | 参照0 |
| `src/assets/grow_3_bud.png` | 参照0 |
| `src/assets/icon_typing.png` | 参照0（`WorldMap.jsx:18` に「使っていない」とコメントあり＝意図的な残置） |
| `src/assets/studio-assets/clapper.png` | 参照0 |

`docs/assets/` に上記6件は入っていない（確認済み）＝**配信サイズには影響していない**。リポジトリに残っているだけ。

**未使用 import（3件）**
| 場所 | 未使用 |
|---|---|
| `src/components/WorkshopEditor.jsx:12` | `gloss`（→ C-3） |
| `src/components/WorldMap.jsx:12` | `iconQuiz`（**ただし `docs/assets/icon_quiz-BT_MZoAT.png` としてビルドに含まれている**＝使わない画像を配信している） |
| `src/data/badges.js:4` | `STAGES`（`stagesFor` のみ使用） |

**直し方**: 削除。ただし `grow_0〜3` は「すくすくメーター画像対応.md」由来の素材で**将来使う予定があるかもしれない**ので、消す前に確認が要る（→ E-5）。

### C-6. `cardW()` の測定フォントが CSS のフォント指定と1つずれている

- `StudioBlock.jsx:23` `_measCtx.font = '900 14px "M PLUS Rounded 1c","Hiragino Maru Gothic ProN",sans-serif'`
- 実際に描く CSS は `.studio-root { font-family: 'M PLUS Rounded 1c','Hiragino Maru Gothic ProN','Yu Gothic',sans-serif }`（`WorkshopEditor.jsx:80`）
- **測定側に `'Yu Gothic'` が無い**。M PLUS（Google Fonts・`src/theme.js:18` で @import）も Hiragino も無い環境（Windows）では、描画は Yu Gothic・測定は sans-serif になり、カード幅の見積もりがずれる
- iPad / Mac では Hiragino Maru Gothic ProN があるため**現状は影響なし**

**直し方**: 測定用フォント文字列を CSS と同一にする（1行）。

### C-7. `#gamelab-dev` / `#studio-dev` のバックドアは本番に残っている（意図的と明記あり）

- `src/main.jsx:7-19`。コメントに「神田さんの検証で使うため**意図的に残す**（gamelab-opening-step2.md §2-3）」と明記
- プロファイル未作成でもクラッシュしない（`WorkshopHome.jsx:127-131` と `WorkshopEditor.jsx:516` の `lastProfile()` null ガードを確認）
- ただし: このルートから入ると **draft は「最後に遊んだ子」のものを直接触る**（`lastProfile()`）。子どもが誤って hash を打つ経路は現実には無い
- **消し忘れではない。** ただし公開前チェックリストに「残す判断をした」と1行残っていないと、次のセッションが同じ調査を繰り返す

### C-8. その他の小さな不整合

- **`tap` のラベルだけ7文字**: `stage3-addendum §3` 由来の「棚のラベルは6文字以内」規則に対し、`DEFS.tap.label = "タップされたら"` は 7文字（他28種はすべて6文字以下＝機械確認済み）。既存カードなので規則の適用外という解釈もできるが、**規則の例外である旨がどこにも書かれていない**
- **`bumpTarget` と `bump` の棚ラベルが同じ「ぶつかったら」**: `brushup/cards-reference.md` にも2行同じ名前で並ぶ。studio と gamelab で出し分けているので同一画面には並ばないが、**カード一覧を読む大人は必ず混乱する**（b6e の実機ゲートにも「⚠️『ぶつかったら』と『ゴール』が混乱しないか」とあるが、`bump` 対 `bumpTarget` の同名問題は挙がっていない）
- **つくるスタジオ／ゲームこうぼう だけ `HOWTO` を持たない**: `src/data/howto.js` にはパズル6島・クイズ5種・タイピング3段階・おえかき・バトル・おみせがあるが、**新2モードのエントリが無い**。`<HowTo id=…>` を呼んでいないので壊れてはいない（全呼び出し7か所と HOWTO のキーを突合し、未定義キーは0件と確認）。ただし「あそびかた」体系からの抜けではある
- **ベースラインが記録している `chipY` は実描画値ではない**: 容器の `chipY` は 7 だが、描画は `Math.max(chipY(type), 9)`（`StudioBlock.jsx:58`・`WorkshopEditor.jsx:1539`）で 9 になる。回帰は 7 を守っているので、**実際の見た目を守っていない値を凍結している**

---

## §4. D: 確認漏れ（誰も実機で見ていない）

### D-1. 実機確認待ちのまま残っている版が **7版** ある

台帳（`progland-handoff.md`）の各版エントリと「✅実機確認合格」行を全部突き合わせた結果:

| 版 | 内容 | 実機記録 |
|---|---|---|
| **v2.3-b6c** | 段階3 区切り①手直し（そうさの手触り・全画面1画面化） | ⚠️ **記録なし** |
| **v2.3-b6d** | 段階3 区切り②（goal / chase / fall） | ⚠️ **記録なし** |
| **v2.3-b6e** | 段階3 区切り③（カード一覧自動生成・bump 削除・みほん3本） | ⚠️ 「簡易確認で合格」のみ（52行目）。§6ゲート5項目の記録なし |
| **v2.3-b6f** | 段階3 区切り④（jumpable） | ⚠️ 「簡易確認で合格」のみ。§5ゲート7項目の記録なし |
| **v2.3-b6g** | 開店 便①（アイコン11枚PNG化・内観） | ⚠️ **記録なし**（§4ゲート4項目） |
| v2.3-b6h | 開店 便②（マップ開店） | ✅ 合格（116行目） |
| v2.3-b6i | 開店 便③（教育接続） | ✅ 合格（131行目） |
| **v2.3-b6j** | 開店 便④-A（保護者ガイド） | ⚠️ **記録なし**（§4ゲート4項目） |
| v2.3-b6k | 実機FB便A | ✅ 合格（155行目） |
| **v2.3-b6m** | 実機FB便B（公開中） | ⚠️ **記録なし**（§4ゲート6項目） |

**確かめかた**: `grep -n "実機OK\|実機確認待ち\|簡易確認\|✅実機確認合格" progland-handoff.md`

### D-2. 「通しの実機確認」は一度も実施記録がない ★

- 台帳52行目の方針: 「通しの実機確認は `brushup/cards-reference.md`（機能一覧）が揃ってからまとめて実施＝各便は簡易確認で先へ進む」
- **`cards-reference.md` は b6e（2026-07-24）で完成している**（`tools/gen-cards.mjs` の生成物・`npm run verify` の照合が通っている）
- **その後 b6f・b6g・b6h・b6i・b6j・b6k・b6m と7版が出ているが、「通し実機確認を実施した」という記録は台帳のどこにも無い**
- つまり **通し確認の前提条件は2日前に満たされたのに、通し確認は始まっていない**。各便の「簡易確認で先へ進む」という免除条項だけが生き続けている

**影響**: 上の D-1 の7版ぶんの実機ゲート項目（合計 30項目以上）が、**誰も見ないまま公開されている**。

**直し方の案**: `cards-reference.md`（29種のうち gamelab 28 / studio 18）と D-1 の各版ゲート項目を1本のチェックリストに畳んで、1回の通しで潰す。項目は台帳の「⚠️次:」行にすべて書かれているので、新規に設計する必要はない。

### D-3. 実機でしか判定できない、記録のない項目（抜粋・全項目は台帳の各版「⚠️次:」に既出）

| 由来 | 項目 |
|---|---|
| b6c | ①連続移動のカクつきが解消したか ②全画面でじゅうじキーが収まるか |
| b6d | 相手ピルに名前が出るか・goal と bump の混同 |
| b6e | ①gamelab「ぶつかったら」が1枚に ②**studio 18種完全無変化** ③みほん3本が遊べる ④見出しの押しやすさ ⑤カード一覧が実物と合う |
| b6f | ①落ちて地面で止まる ②別キャラの上に乗れる ③▲でジャンプ・空中不可 ④なめらかさ ⑤**「ジャンプ」との名前の混同** ⑥既存みほん6本が不変 ⑦studio 完全無変化 |
| b6g | ①11枚が既存18枚と同じ質感 ②**アイコンとカードの対応が正しい** ③こうぼう内観 ④studio 内装と18枚が不変 |
| b6j | ①「おうちの方へ」が出る ②全文が読める ③studio のガイドが不変 ④**文面が保護者に伝わるか** |
| b6m | ①未購入でジャングル・だいちが出ない ②買うと出る ③**前に作った作品の背景が変わっていない** ④みほんの説明が分かる ⑤棚が縦に伸びすぎない ⑥studio でも効く |
| 本監査 | **B-2（全画面で上端・右端のキャラが切れるか）** — 1回見れば決着する |
| 本監査 | **D-4（棚のラベル文字サイズ）** — 下記 |

### D-4. こうぐだなのラベル文字が、iPad 幅では設計前提の 12px に届かない可能性

**計算**（`fitFont`＝`WorkshopEditor.jsx:449-453`／`avail = colW - G.LABELX*PAL_S - 8`＝`:1542`）

前提: `.studio-pal { width: 21% }` は **content-box**（グローバルな `box-sizing: border-box` リセットは無い。`.pill` と `.studio-confirm input` に個別指定があることから確認）。`.palscroll` は `overflow-y: scroll` + `::-webkit-scrollbar { width: 5px }`。

| 画面幅 | palscroll 幅 | colW | avail | 6文字ラベルの文字サイズ（1文字=1em 換算） |
|---|---|---|---|---|
| 700px（サポート下限） | 142 | 61 | 22.2 | **7px（下限に張り付き）** |
| 810px（iPad 縦） | 165 | 71 | 32.2 | **7px（下限に張り付き）** |
| 1080px（iPad 10.2 横） | 222 | 97 | 58.2 | 約 9.7px |
| 1180px（iPad 11 横） | 243 | 107 | 68.2 | 約 11.4px |
| 1366px（iPad Pro 横） | 282 | 125 | 86.2 | 約 14.4px |

- 12px に達するのは **画面幅およそ1200px以上**
- 700px 未満は `.studio-narrow`（横向きにしてね）に切り替わるので対象外（`WorkshopEditor.jsx:386`）だが、**700〜810px は編集画面が出る**。ここで 7px

**何が問題か**: `stage3-addendum §3` の「ラベルは6文字以内（棚のフォント**下限12px**）」という前提が、**iPad 縦・小さめの横幅では成立していない**。6文字に切り詰めた根拠自体が崩れている。

**自信**: 【推測を含む】。日本語全角1文字＝1em として計算した。実測フォント（Hiragino Maru Gothic ProN 800）の advance width は 1.0em 前後だが厳密には測っていない。**桁は合っているが、実機で `getComputedStyle` を1回見て確定させてほしい。**

### D-5. アイコン29枚と型の対応 — 画像を実際に見て照合した（**入れ替わりは無し**）

**やったこと**: 29枚の PNG をコンタクトシートに合成して目視照合した（ブラウザ不使用・PIL で合成）。

| 型 | ファイル | 絵 | 判定 |
|---|---|---|---|
| hat | 01_hata | 黄色い旗 | ✓ |
| tap | 02_tap | 指でタップ＋波紋 | ✓ |
| bump | 03_butsukatta | 2つの玉が衝突 | ✓ |
| move | 04_migi | 右向き矢印 | ✓ |
| moveL | 05_hidari | 左向き矢印 | ✓ |
| moveU | 06_ue | 上向き矢印 | ✓ |
| moveD | 07_shita | 下向き矢印 | ✓ |
| spin | 08_mawaru | 回転矢印 | ✓ |
| jump | 09_jump | バネで弧を描く | ✓ |
| home | 10_motono | 台の上の旗 | ✓ |
| grow | 11_ookiku | 4方向 外向き矢印 | ✓ |
| shrink | 12_chiisaku | 4方向 内向き矢印 | ✓ |
| hide | 13_kieru | 半透明のおばけ | ✓ |
| show | 14_deru | 帽子から星が出る | ✓ |
| sound | 15_oto | トランペット＋音符 | ✓ |
| wait | 16_matsu | 砂時計 | ✓ |
| repeat | 17_kurikaeshi | 2本の循環矢印 | ✓ |
| forever | 18_zutto | ∞ | ✓ |
| moveRand | 19_random | 4方向に散る矢印 | ✓ |
| bounce | 20_hanekaeru | 面ではね返る矢印 | ✓ |
| scoreUp | 21_score_up | 星＋ | ✓ |
| scoreDown | 22_score_down | 星− | ✓ |
| bumpTarget | 23_butsukatta_target | 衝突＋相手が強調 | ✓ |
| dpad | 24_dpad | 十字キー | ✓ |
| tapMove | 25_tapmove | 指でタップ＋波紋 | ✓ |
| jumpable | 29_toberu | 宙に浮いた玉＋足元の砂煙 | ✓ |
| chase | 27_oikakeru | 玉が玉を追う（速度線） | ✓ |
| fall | 28_futtekuru | りんごが落ちる（速度線） | ✓ |
| goal | 26_goal | チェッカーフラッグ | ✓ |

**結論: 29枚とも型と意味が一致している。入れ替わりは無い。** byte 一致の重複も0件（md5 で確認）。

**ただし1件、気になったこと（→ E-6）**: `02_tap`（タップされたら＝きっかけ・橙）と `25_tapmove`（タップいどう＝そうさ・ティール）の絵が**ほぼ同じ**（全29枚の総当たり差分で2番目に似ている。1番は score_up/score_down という意味上の対）。**カードの色でしか区別できない。**

### D-6. アセットの余白・寸法 — 機械測定した（**規約違反は無し**）

**カードアイコン29枚**: 全て 256×256、全て**少なくとも1辺のペアが画像の端に接している**（＝bbox でトリムして中央寄せ、という同じ規約）。外れ値なし。

**建物PNG**: 全て 256×256、**全て上下の余白 0.0%**（縦は必ず全高を使う）という同じ規約。

| ファイル | 中身の幅% | 上% | 下% |
|---|---|---|---|
| building_home.png | 96.9 | 0.0 | 0.0 |
| building_quiz.png | 98.4 | 0.0 | 0.0 |
| building_typing.png | 75.8 | 0.0 | 0.0 |
| studio-building.png | 100.0 | 0.0 | 0.0 |
| **gamelab-building.png** | **89.8** | 0.0 | 0.0 |
| sign-junbichu.png | 98.4 | 0.0 | 0.0 |

**b6h の「便①アセット12枚の余白修正」は効いている。** `gamelab-building.png` は左右に 5.1% ずつ余白があり studio より約10%細く見えるが、`building_typing.png`（75.8%）という前例があるので**規約違反ではない**（横幅はシルエット次第）。b6h の実機ゲート②「大きさが既存の建物と揃っている」は ✅合格済み。

### D-7. みほんのカバー絵10枚 — **まだ機能自体が存在しない**

`grep -rn "cover" src/` の結果、みほんのカバー画像を持つデータ構造も表示コードも**存在しない**。台帳45行目「残り: みほんのカバー絵（絵の生成待ち）」のとおり、素材待ちの未着手項目。監査指示 §1-2 の「カバー絵10枚が正しい型に付いているか」は**現時点では確認対象が無い**。

---

## §5. E: 放置されている判断

| # | 内容 | 状態 | 出典 |
|---|---|---|---|
| **E-1** | **背景の方針**（案あ 遠景＋床2層／案い 新規生成／案う 無地） | 未決のまま。「ゲームのせってい再設計」の前提になっている | 台帳 未完了タスク6 |
| **E-2** | **ゲームのせってい 再設計** | 設計・モック済み（`brushup/gamecfg-mock1.html` 案1採用）だが**未実装**。⚠️縦予算が当時より悪化（じゅうじキー約144px＋こうぐだな24%→21%）＝**当時の案1Cでも収まらない**。有力案は「上演中は `.gamecfg` を隠す」だが未決 | 台帳 未完了タスク6 |
| **E-3** | **カードのせつめいに動きのアニメーション** | Chat が設計中のまま止まっている | 台帳45行目 |
| **E-4** | **段階3 区切り⑤ `clone`（ぶんしんを だす）** | 未実装。「開店フェーズの後」に後置されたまま。★実装すると **DEFS が30種になり、A-1 の かんとくベレー問題がさらに1枚遠のく**（A-1 を先に直すこと） | 台帳33行目・38行目 |
| **E-5** | `grow_0〜3` の4枚を消してよいか | 「すくすくメーター画像対応」由来の素材。**将来使う予定があるかどうかが記録されていない**（→ C-5） | 本監査 |
| **E-6** | `02_tap`（タップされたら）と `25_tapmove`（タップいどう）の絵がほぼ同一 | 色でしか区別できない。**片方を描き直すかどうかの判断が要る**（→ D-5） | 本監査 |
| **E-7** | **ゲームこうぼうには バッジが1つも無い／そだったちからにも反映されない** | `badges.js` の studio 系3個（`studio1`/`studioRemix`/`studioNest`）に対応する gamelab 版が存在しない。`powers.js:128-132` の「つくる」も `save.studio.works` だけを見ており **gamelab の作品は0扱い**。便③（b6i）のスコープは XP・コイン・マイルストーンまでで、バッジ／ちからは設計書 §D に項目が無い。**意図的な範囲外なのか、単に忘れられたのかが判定できない** | 本監査 |
| **E-8** | **`bump` と `bumpTarget` の棚ラベルが同名** | b6e で `bump` を gamelab の棚から外して一本化したが、studio 側に残った `bump` と gamelab の `bumpTarget` が**どちらも「ぶつかったら」**。カード一覧では2行同名で並ぶ（→ C-8） | 本監査 |
| **E-9** | **`#gamelab-dev` / `#studio-dev` を公開版に残すか** | コードのコメントでは「意図的に残す」と決着済み。ただし**公開前チェックリストにその判断が記録されていない**（→ C-7） | 本監査 |

---

## §6. 未完了タスクの棚卸し（台帳 170行目〜）

| # | 台帳の項目 | 監査の判定 |
|---|---|---|
| 1 | 実機で継続確認（b4系一式） | **生きている。** さらに D-1 の7版が積み増しになっている |
| 2 | メモ06-A Phase2 ナッジ | 保留のまま。コードに痕跡なし＝**未着手で正しい** |
| 3 | クイズ深さ化 | 未着手。`QUIZ_CATEGORIES` は5種のまま（`quizzes.js:7-12`）＝**記載どおり** |
| 4 | App側進化演出との二重 | 実機判断待ち。**変化なし** |
| 5 | 高学年拡張（帯B・帯C） | 未着手。**変化なし** |
| 6 | ゲームのせってい 再設計 | **生きている**（→ E-2）。⚠️縦予算の悪化は台帳に正しく記録されている |

**逆に「完了扱いだが終わっていないもの」**: 見つからなかった。ただし D-2（通し実機確認）は「方針として先送りされたまま忘れられている」状態で、**未完了タスクの一覧に載っていない**。載せるべき。

---

## §7. 調べたが問題が無かったこと（＝「調べていない」ではない）

次に読む人が同じ調査を繰り返さないために残す。

| 対象 | 確かめかた | 結果 |
|---|---|---|
| `npm run verify` 全9本 | 実行（読み取りのみ） | **全PASS**（エンジン単体・ラウンドトリップ・スタジオ回帰・gamelab みほん6本・カード一覧照合 28/18） |
| `DEFS` 29種すべてに `label`/`long`/`desc`/`cat`/`shape`/`w`/`fill`/`edge`/`dark` があるか | 自作スクリプトで全走査 | **欠落0件** |
| `DEFS` 29種すべてに ICONS のエントリがあるか／余分なキーが無いか | 同上（`studio-blocks.js` の ICONS を突合） | **過不足0件** |
| `pill: "n"` のカードに `min`/`max`/`def` があり `min ≤ def ≤ max` か | 同上 | **全て正常** |
| どの棚にも出ないカードが無いか | `PALORDER ∪ GAMELAB_PALORDER` と `Object.keys(DEFS)` を突合 | **29種すべてどちらかに出る**（`bump` は studio のみ・他28種は gamelab に出る） |
| `brushup/cards-reference.md` と `DEFS` の一致 | `gen-cards.mjs --check`（verify 内） | **PASS**。中身も目視で `DEFS` と照合し一致を確認 |
| みほん10本（gamelab 6・studio 4）が実在するカードだけを使っているか | `verify-gamelab.mjs` / `verify-studio.mjs`（verify 内） | **PASS** |
| みほんの `gameConfig` と中身の噛み合い | 6本を手で追った（クリア条件と得点手段の対応） | **6本とも整合**。`collect` score10←scoreUp×3体 ／ `dodge` time30+gameOver c2 ／ `catch` score5←bumpTarget c2 ／ `dropcatch` time30 ／ `oni` time30+gameOver c2 ／ `goalrun` score5←goal c2 で+5・gameOver c3。**得点手段の無いスコアクリアは無い** |
| `tools/studio-baseline.json` と現行コードの一致 | 初回 63d37cb と HEAD を Python で機械照合 | トレース732・みほん4本・エンジン定数・PALORDER・パス91本は**完全一致**。差分は G.CHIP/ICON と既存5種のラベル（→ C-2） |
| 手触り定数 `G.SNAP=78` / `SNAPWY=1.3` / `RESCUE=140` / `MAXDEPTH=2` / `TICK=400` / `MOVE_MS=340` / `OP_MS=100` | ベースライン全履歴＋現行コード | **全て不変** |
| TDZ（テンプレートリテラルCSSが後方の定数を参照）の残り | 自作スクリプトで全 `.js/.jsx` のトップレベル テンプレートリテラルと `${識別子}` の宣言位置を照合 | **0件**（b6c の教訓は守られている） |
| `.pill` の box-sizing と `cardW()` の一致（FB便A §1） | CSS（`WorkshopEditor.jsx:170-174`）と `cardW`（`StudioBlock.jsx:20-31`）を突合 | **一致**（`box-sizing: border-box` + `min-width:32` ↔ `Math.max(32, 文字幅+22)`、`gap:7` ↔ `w += 7 + pillW`） |
| `StudioBlock` の viewBox と要素サイズ（FB便A §2） | `StudioBlock.jsx:74-75` | **完全一致（倍率1.0）＝直っている** |
| `bump` を使った既存 gamelab 作品が今も動くか | `engine.js:28` の `TRIGGERS` に `bump` あり・`settleOverlaps`（`:310-311`）で `startThread(a,"bump")` を呼んでいる。`DEFS.bump` も残っているので描画も可能 | **動く**（棚から取り出せないだけ） |
| 旧セーブ（schema 7以前）の読み込み | `tools/test-roundtrip.mjs`（verify 内）が b4j / b5e / b5g / b5k / b5u / b6i 世代を網羅して PASS。`gamelab.milestones` 欠落の補完も試験済み | **壊れない**（ただし B-3 の schema 未更新は別問題） |
| ショップ商品IDと背景IDの対応（b6m） | `studio-bgs.js:28` ↔ `battle.js:66-67` | **一致** |
| `HowTo` の id が全て `HOWTO` に存在するか | 呼び出し7か所と `howto.js` のキーを突合 | **未定義キー0件** |
| バッジ26個の到達可能性 | `ENEMIES.length=9` ↔ 「てき9たい」・`QUIZ_CATEGORIES=5` ↔ 「5しゅるい」・`TYPING_STAGES=3` ↔ 「3つの だんかい」を照合 | **文言と実データが一致・到達不能なバッジは無し** |
| 公開中のビルドが HEAD の src と対応しているか | `docs/index.html` → `index-E50fwehf.js` に b6m 固有の文字列（studio の `SAMPLE_DESCS` 4本・gamelab の desc・`bg_jungle`・`jumpable` の desc）が全て含まれることを確認。`src/version.js` = `v2.3-b6m` | **対応している** |
| デバッグ残骸（`console.log` / `debugger` / `window.__`） | `grep -rn` | **0件**（`console.error` が `storage.js:132` に1件のみ＝保存失敗の正当なログ） |
| 実験用ファイルが `src/` に残っていないか | `find src -type f` を全件目視 | **無し**（`.DS_Store` が2件あるが `.gitignore` 対象外かは未確認＝下記） |

---

## §8. 手を出さなかったこと・確認できなかったこと

指示 §0-3「迷ったら止まる」に従って**やらなかった**こと。

1. **`.DS_Store` が追跡されているかどうか**: `src/.DS_Store` `src/assets/.DS_Store` `./.DS_Store` が存在する。`.gitignore` の中身は確認したが、追跡状態を変える操作（`git rm --cached` 等）は**一切していない**。`git status` は空なので、追跡されているなら既にコミット済み。**判断が要る**
2. **`npm run build` / `deploy` / `--update`**: 実行していない（禁止）。したがって「`--update` を打ったらベースラインがどう変わるか」は**確かめていない**（変わることの確認自体が変更になるため）
3. **ブラウザでの動作確認**: 一切していない。B-2・D-4 の数値は**すべて静的計算**であり、実機の実測ではない
4. **`src/data/quizzes.gen.js`（17,603行）と `stages.gen.js` の中身**: 全数検証は `npm run verify` のソルバーに委ねた。個別の問題文は読んでいない
5. **`progland-handoff.md` の全文**: 読んでいない。`grep` で「現在地サマリ」「未完了タスク」「決定事項」「生きている注意事項」「実機」関連の行だけを取った。**アーカイブ2本（`progland-archive-2026-07.md` 12万字・`progland-handoff-archive.md` 7万字）は開いていない**＝b5w 以前の版の宣言と現物の突合は**未実施**
6. **`brushup/` の指示書79本**: 本監査で参照したのは `feedback-b-shop-samples.md` / `gamelab-opening-step3.md` / `gamelab-opening-design.md` / `cards-reference.md` の4本のみ。**残り75本の「変えないもの」宣言と現物の突合は未実施**
7. **一時的なファイル書き換えを要する確認**: 該当なし（すべて読み取りで済んだ）

---

## §9. 直す順番の提案（実装はしない）

1. **A-1 かんとくベレー** — 1関数の修正で直る。放置すると `clone`（E-4）追加で さらに悪化する
2. **B-1 cid のすり替わり** — 子どもが自力で復旧できない種類の壊れかた。設計判断（保存するか／付け替えるか）が要るので早めに決める
3. **D-2 通し実機確認** — 前提はもう揃っている。7版ぶんのゲート項目を1本のチェックリストに畳んで一気に潰す。**B-2 と D-4 もこのとき一緒に見れば追加コストはほぼゼロ**
4. **C-2 ベースラインの守りかた** — `npm run deploy` の `git add -A` をやめる。1行の変更で、同じ埋没が二度と起きなくなる
5. **B-3 schema 更新** — 1行。将来の事故の芽を潰す
6. C-3〜C-8・C-5 の掃除 — まとめて1便で

---

## §10. この監査の作業ログ

```
git rev-parse HEAD                 → 59e7d6df388d9111655adcdd9a7e2f68c1ebab2e ✓
git status --porcelain             → 空 ✓（着手前）
npm run verify                     → 全PASS（読み取りのみ）
```

- コード（`src/` `tools/` `docs/`）は**1バイトも変更していない**
- 作業用スクリプトはすべてリポジトリ外のスクラッチ領域に置いた（`unused.mjs` / `deadfields.mjs` / `tdz.mjs` / `defcheck.mjs` / `kantoku.mjs` / 画像解析）
- 追加したファイルは **`brushup/audit-2026-07-25.md`（指示書・神田さんの指示で配置）** と **本報告書** の2本のみ

**commit 直前の `git status --porcelain` の結果は §11 に追記する。**

---

## §11. commit 直前の状態

（下記は commit 直前に実行した `git status --porcelain` の結果）

```
?? brushup/audit-2026-07-25.md
?? brushup/audit-report-2026-07-25.md
```

**想定外のファイルは出ていない。** この2本を、ファイル名を明示して `git add` した（`git add -A` / `git add .` は使っていない）。
指示書 §0-3 は「報告書1ファイル以外が出ていたら commit しない」だが、`brushup/audit-2026-07-25.md` は**神田さん本人の指示で配置した監査指示書**であり、想定外の産物ではないため、2本まとめて commit した。
