# 実装指示書: つくるスタジオ 段階3（教育接続＋マップ設置＋正規導線）

作成: 2026-07-17 ／ 対象: Claude Code ／ 設計の正本: `brushup/studio-design.md` §8
前提: 段階2（v2.3-b5f / SHA `cf2dd9c`）が**実機確認合格済み**。
**音の差し替えは本段階から除外**（本線の音作業とまとめて後日。WebAudio簡易音のまま）。

本指示書の数値・API名は、Chat が SHA固定 raw で既存実装（growth.js / badges.js / dressup.js /
powers.js / parent-guide.js / App.jsx）を読んで確定させたもの。**推測ではない**。

---

## 0. 着手順序

1. §1 教育接続（storage → growth → works → badges → dressup → powers → きろく）
2. §2 正規導線＋マップ設置
3. §3 保護者ガイド＋演出仕上げ
4. かんとくベレーの**画像は完成済み**（`head_kantoku_beret.png`・512×512・透過・アンカー決定済み）。
   神田さんが `src/assets/` に置く。**無ければ dressup の項だけ残して報告**し、他を完了させてよい。

## 1. 教育接続

### 1-1. storage.js — マイルストーンの永続化（SCHEMA_VERSION +1）

初入れ子・初3キャラは works を消しても達成済みであり続ける必要があるため、フラグで持つ。

- `studio` に `milestones: {}` を追加（key: 達成id → true）。
- **SCHEMA_VERSION を上げる前に現在値を確認**（Chat確認時点では 4）。4 なら 5 へ。
  コメントに `// b5g: studio.milestones（コイン節目の永続化）` を残す。
- デフォルト値マージ・`tools/test-roundtrip.mjs` に milestones の往復＋旧セーブ補完を追加。

### 1-2. growth.js — レバー追加（既存の作法どおり定数集約）

```js
export const XP = {
  ...既存,
  studioSave: () => 10,   // 新規作品の初回保存のみ（作り直し保存では出ない）。初期値
};
export const COIN = {
  ...既存,
  // つくるスタジオ: 作品ごとの付与ゼロ・初回マイルストーンのみ（量産で稼げない・設計§8）。初期値
  studio: { first: 15, works5: 20, works10: 30, firstNest: 15, firstCast3: 15 },
};
```

### 1-3. src/studio/works.js — 付与の実装（保存の一本道に集約）

`saveWork`（新規追加の経路。上書き=origin:work は対象外）で:

1. 空作品ガード（§2 の自動退避と同じ判定関数を再利用）を通った新規保存のみ:
   - `applyXp(profile, XP.studioSave())`
   - マイルストーン判定 → 未達成のものに `addCoins` ＋ `milestones[id]=true`:
     - `first`: works.length が 0→1 になった
     - `works5` / `works10`: works.length が 5 / 10 に到達
     - `firstNest`: 保存した作品に**容器の中の容器**がある（`isContainer` を
       `studio-blocks-defs.js` から import して木を走査）
     - `firstCast3`: 保存した作品のキャラが3体以上
2. 戻り値に `{ xp, coins, hit: [達成id...] }` を返し、エディタの「ほぞん」完了演出（§3）が表示に使う。
3. **きろく**: `profile.log[today()].studio = (…|| 0) + 1`（新規保存のみカウント。
   Art.jsx の `log[d].art` と同じ作法・today() は storage.js の既存関数）。

※XPによる相棒レベルアップ・進化の検知は App 側の既存 effect が担う（各モードは applyXp を
呼ぶだけ、という既存の分業。App.jsx L83 コメント参照）。スタジオは App の外で storage に直接
書くため、**§2 の「もどったら再読込」でこの検知が正しく1回だけ走ること**を受け入れ条件に含める。

### 1-4. badges.js — 3種追加（既存26個の形式に完全準拠）

既存バッジは全て `emoji` フィールドでアイコンを持つ宣言形式（check(save) が真なら取得・
一度取得したら App が集合に足すので後から偽に戻っても消えない）。**この既存形式に合わせる**
（絵文字禁止ルールの例外＝クイズ選択肢と同じ「既存システムの継続」扱い。勝手に画像化して
バッジ画面の表示を壊さない）。

```js
{ id: "studio1", emoji: "🎬", name: "はじめての かんとく",
  desc: "つくるスタジオで さくひんを 1つ つくった",
  check: s => ((s.studio && s.studio.works) || []).length >= 1 },
{ id: "studioRemix", emoji: "🎞️", name: "リミックスめいじん",
  desc: "みほんを つくりかえて じぶんの さくひんに した",
  check: s => ((s.studio && s.studio.works) || []).some(w => w.remixOf) },
{ id: "studioNest", emoji: "🪆", name: "いれこの たつじん",
  desc: "くりかえしの なかに くりかえしを いれた さくひんを つくった",
  check: s => hasNestedContainer(s) },  // isContainer で木を走査するヘルパーを badges.js 内に
```

`isContainer` は `./studio-blocks-defs.js` から import（node安全層なので badges.js から安全）。

### 1-5. dressup.js — かんとくベレー（★画像到着後）

```js
{ id: "head_kantoku", slot: "head", name: "かんとくベレー", skillTie: "create",
  img: headKantokuBeret,  // src/assets/head_kantoku_beret.png（Chat支給・512×512・描画433x281）
  // ★初期値（2026-07-17 Chatが主人公へ実合成して決定・神田さん承認済み）:
  //   帽子系(top:1.6/width:31.3)では小さすぎたため 1.55倍に拡大し、つばの下端 19.98% は同じ位置に固定。
  //   top が負なのは正常（画像の箱が上へ出るだけ・ベレーの絵自体は上端+0.08%でキャンバス内に収まる）。
  //   これが下端固定で収まる上限（1.7倍は絵が上に1.84%はみ出すため不採用）。実機FBで調整可。
  anchor: { top: -8.52, left: 50, width: 48.52 },
  acquire: { type: "achievement", condition: "studio_all_cards",
             label: "つくるスタジオで 18しゅるいの カードを ぜんぶ つかうと もらえる" },
  flavor: "18まいの カードを つかいこなした かんとくの あかし" },
```

`ACHIEVEMENT_CHECKS.studio_all_cards`: 保存済み works 全体で使われたブロック type の集合が、
`studio-blocks-defs.js` のブロック18種を**すべて**含むか（カテゴリ定義は除外。18種のリストは
defs 層の実 export 名に合わせる — verify-studio.mjs が既に同じ判定をしているので流用可）。
解放の付与タイミングは既存どおり `checkAchievementUnlocks`（App 側の既存呼び出しが拾う）。

### 1-6. powers.js — 「つくる」の水源拡張＋ループ少量加点

`computePowers` の該当2行を差し替え（**係数はすべて初期値としてコメントを残す**）:

```js
// つくる = おえかき(最大50) + スタジオ(最大50)。スタジオ側=作品数+カード網羅+入れ子（設計§8）
const sWorks = ((save.studio && save.studio.works) || []);
const covered = /* works 全体で使ったブロックtype数（studio_all_cards と同じ走査） */;
const createArt = Math.min(50, (save.art.gallery || []).length * 10);
const createStudio = Math.min(50, sWorks.length * 6 + Math.round(14 * covered / 18)
                                  + (save.studio?.milestones?.firstNest ? 6 : 0));
const create = Math.min(100, createArt + createStudio);
// ループ = 島2 + スタジオでくりかえし/ずっとを使った作品数の少量加点（上限10）
const loopWorks = sWorks.filter(w => /* repeat か forever を含む */).length;
const repeat = Math.min(100, islandPct(save, 2) + Math.min(10, loopWorks * 2));
```

`POWERS` の create の `grows` を
`「おえかきのへや」や「つくるスタジオ」で さくひんを つくると そだつよ` に更新
（go/goLabel は art のまま＝変更最小）。

### 1-7. きろく（保護者側の表示）

保護者ダッシュボード／おうちの日記で `log[d].art` を表示している箇所を探し、同じ作法で
`log[d].studio` を追加（文言例: 「つくるスタジオで さくひんを {n}こ つくった」）。
**設計からの縮小（差異として報告）**: 「はじめて いれこを つかった」等の初回系の日記行は
実装しない。初回の節目はコイン・バッジ・ベレーの演出が既に担っており、日記は日次の量だけを
淡々と記録する（logに初回情報を持たせない＝データを増やさない）。

## 2. 正規導線＋マップ設置

### 2-1. WorldMap.jsx（段階0からの不可侵をここで初めて解除）

`brushup/studio-map-placement.md` の確定値をそのまま適用:
- AREAS に **studio**（short「つくる」/ place「つくるスタジオ」/ img=studio-building /
  tall / left:59.5 / top:12.4）
- **じゅんびちゅう看板**（img=sign-junbichu / left:69.5 / top:34.13 / 通常62%）。
  **非対話**（button にしない・タップで何も起きない）。板の中央に「じゅんびちゅう」を
  アプリのフォントで重畳（画像に文字はない）。既存装飾のふわふわアニメ等の扱いは
  他の建物と揃える。
- ★import パスは `../assets/studio-assets/…`（直下ではない）。

### 2-2. App.jsx — mode "studio"

- WorldMap で studio を選ぶと `<Studio />` を全画面で表示（既存モードの出し分けに合わせる）。
- **もどったとき（onExit）に App が storage からプロファイルを再読込**して state を更新する
  （スタジオは storage へ直接書くため。既存の読み込みAPIを使う）。再読込により、
  バッジ判定・achievement解放・相棒レベルアップ検知の既存 effect が走る。
  **二重付与・二重演出が起きないこと**をテストで確認（XPを跨いだ往復で1回だけ祝われる）。
- `#studio-dev` の一時ルートは開発用バックドアとして**残す**（main.jsx のコメントに明記）。
- Studio 側: `onExit` prop を受けたらマップへ戻る（Home の「マップへ」ボタン。
  hash 運用時は従来どおり）。

## 3. 保護者ガイド＋演出仕上げ

### 3-1. parent-guide.js に STUDIO_GUIDE を追加（原稿=下記を一字一句そのまま）

```js
// つくるスタジオ（正解のない創作モード）— 設計§8の骨子を全文化（原稿はChat作成・2026-07-17）
export const STUDIO_GUIDE = {
  title: "この スタジオで そだつ ちから",
  skill: "意図の実現・イベント・並行処理 — 自分の「こうしたい」をプログラムにする力",
  body: [
    "つくるスタジオには、正解も点数もありません。ここは、パズルのように与えられた問題を解く場所ではなく、お子さん自身の「こうしたい」から出発する場所です。文部科学省の言うプログラミング的思考は「意図した一連の活動を実現するために、どんな組み合わせが必要かを論理的に考える力」。その“意図”そのものを自分で決めるのが、このモードの学びです。",
    "ここで初めて登場する考え方が2つあります。ひとつは「〜されたら動く」というイベント（タップされたら・ぶつかったら）。いまのアプリやゲームはほぼすべてこの仕組みで動いています。もうひとつは並行処理——キャラクターごとにプログラムを持たせると、複数のプログラムが同時に動きます。2体が別々のリズムで踊る様子は、この考え方の最初の体験です。",
    "声かけはひとつで十分です。作品を見せてくれたら「どうやって動かしたの?」と聞いてください。自分の組んだプログラムを言葉で説明することが、理解をいちばん深めます。思いどおりに動かないときは「どのカードのせいだと思う?」——動いているカードは光るので、目で追いながら一緒に犯人さがしをしてみてください。これはデバッグ（不具合の原因を探して直すこと）の練習そのものです。",
    "本物のScratchと比べると、座標の数字が出ない・数は1〜10まで・カードは18種類だけ、と、あえて機能を絞っています。低学年でも迷子にならず、試行錯誤が止まらないようにするための設計で、ここで組み方の感覚をつかんだ子は、Scratchにスムーズに進めます。何をしていいか迷っているときは「みほんのたな」を開いて、中身を一緒にのぞいて、数字をひとつ変えてみるところから始めてください。",
  ],
  tip: "コツ: 作品の出来を評価せず「どうやって動かしたの?」と仕組みを聞く。説明できたら、それが学びの証です。",
};
```

- Studio の Home に「おうちのかたへ」の導線を追加（他モードがガイドモーダルを出している
  既存の作法に合わせる。出し方の実装は既存踏襲）。

### 3-2. ほぞん完了の演出

「かんせい!」の完了表示に、works.js の戻り値から **+XP／獲得コイン／達成マイルストーン名**を
出す（初回だけ賑やか・2回目以降はXPのみ、が自然に実現される）。新規バッジ・ベレー解放の
祝いは App 側の既存演出（もどった再読込時）が担うので、スタジオ内では作らない。

## 4. 受け入れ条件（段階3完了の定義）

- マップに「つくる」建物が確定座標で出て、タップでスタジオが開き、もどるとマップへ戻る
- じゅんびちゅう看板が確定座標に出る（非対話・文字はフォント重畳）
- 新規保存で XP+10・初回マイルストーンのコインが**1回だけ**付く（上書き保存では付かない・
  作品を消して作り直しても first は再付与されない）
- バッジ3種・かんとくベレー（18種網羅）・「つくる」「ループ」の到達度がそれぞれ機能する
- おうちの日記に「さくひんを Nこ つくった」が出る
- スタジオ往復で二重付与・二重演出なし（XP跨ぎテスト）
- STUDIO_GUIDE が原稿どおり入り、Home から開ける
- verify 6本 全PASS（roundtrip に milestones 追加済み）・§11の24値不変・
  エディタの手触りコード無変更
- 【停止】神田さんが実機確認 → **合格で本モード完成・本線合流へ**

## 5. 報告フォーマット

実装ファイル一覧 / 設計との差異（あれば理由）/ SCHEMA_VERSION をいくつからいくつへ /
調整値の最終値（レバー類） / verify・テスト結果 / コミットSHA。Chat が SHA固定 raw で裏取りする。
