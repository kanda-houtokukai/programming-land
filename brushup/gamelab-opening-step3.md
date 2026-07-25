# 実装指示書: 開店フェーズ 便③（教育接続 ─ XP・コイン・きろく）

作成: 2026-07-25 ／ 対象: Code
置き場所案: `brushup/gamelab-opening-step3.md`
起点: `origin/main` HEAD `a2c0014`。公開中は **v2.3-b6h**（便② マップ開店・**実機OK**）。
正本: `brushup/gamelab-opening-design.md` §D（神田さん承認済み）
本書は**便③のみ**。ガイド／BGM（便④）・区切り⑤ clone には手を出さない。

**現状**: `src/gamelab/works.js` の `grantForNewSave()` が **常に `null`** を返す。
＝ こうぼうで作品を保存しても **XPもコインも記録も一切増えない**。スタジオは保存で10XP入るので、並べると差が出ている。

---

## §0. ★着手前に必ず読む: `growth.js` を素朴に import すると verify が壊れる

**Chat が実証済みの制約。**

- `src/gamelab/works.js` の冒頭コメントに「**growth.js に依存せず、このファイルは node からも読める（verify-gamelab が使える）**」とある
- `src/studio/works.js` は `growth.js` を import しており、コメントに「**画像import連鎖あり**」＝ node から読めない、と明記されている
- 実測: `growth.js` → `data/monsters.js` → `import monMori1 from "../assets/mon_mori_1.png"`。
  node で読むと **`Unknown file extension ".png"`** で落ちる（Chat が実行して確認）

**したがって `gamelab/works.js` に `import { applyXp, addCoins, XP, COIN } from "../growth.js"` をそのまま足すと、`tools/verify-gamelab.mjs` が動かなくなる可能性がある。**

### 0-1. まず確認して報告すること（コード変更なし）

1. `tools/verify-gamelab.mjs` が `gamelab/works.js` を**直接または間接に** import しているか
   （Chat が見た範囲では `gamelab-samples.js` / `studio-blocks-defs.js` / `engine.js` の3本のみで**直接は読んでいない**。ただし間接の連鎖は未確認）
2. `verify` チェーンの**他の8本**が `gamelab/works.js` を読んでいないか
3. 読んでいなければ、**studio と同じ形（素直に import）でよい**
4. 読んでいれば、**注入の形にする**（下記 0-2）

**この確認を飛ばして実装しないこと。** verify が落ちてから原因を探すと遠回りになる。

### 0-2. 読まれていた場合の回避策（採る場合のみ）

`grantForNewSave` を works.js に直書きせず、**呼び出し側（ブラウザ側）から渡す**形にすれば `growth.js` への依存を works.js から切り離せる。
ただし **`saveWork` / `stashDraft` / `deleteWork` の export の形（関数名・引数・戻り値）は変えないこと** ── 利用側（エディタ／Home）を無変更に保つのが `works.js` 分離時の約束（studio 側のコメントに明記）。

**どちらの形を採ったか、理由とともに報告すること。**

---

## §1. 付与ルール（設計書 §D・確定）

### 1-1. XP

**`XP.gamelabSave() = 10`** を `src/growth.js` に追加。スタジオと同額。
モードで差を付けると「得な方だけやる」誘因になるため。

**新規作品の初回保存のみ**（作り直し保存では出ない）。studio と同じ作法。

### 1-2. コイン（マイルストーン初達成時のみ）

`src/growth.js` の `COIN` に **`gamelab`** を追加する。

| id | 条件 | コイン |
|---|---|---|
| `first` | 初めて1本作った | 15 |
| `works5` | 5本作った | 20 |
| `works10` | 10本作った | 30 |
| **`firstOperable`** | **`dpad` か `tapMove` を使った** | 15 |
| **`firstClear`** | **クリア条件を「なし」以外にした** | 15 |

後半2つが**こうぼう固有**。スタジオの `firstNest` / `firstCast3` をそのまま流用すると、こうぼうで学ぶこと（人が操作するものを作った／勝ち負けを設計した）を拾えない。

**判定の手がかり**:
- `firstOperable` … 保存された作品のブロックに `dpad` または `tapMove` の型が含まれるか
- `firstClear` … `work.gameConfig.clear.type !== "none"`（みほんの実例: `{ scoreShow, clear: { type:"score", param:10 } }`）
  ⚠️ `gameConfig` は `store.js` で **presence ガード**付きで載る（`"gameConfig" in scene`）。**無い場合に落ちないこと**

### 1-3. ★マイルストーンの保存先を分ける

**`gamelab.milestones` に持つこと**（`studio.milestones` と別）。

`studio/works.js` は `studio.milestones` に `first` / `works5` / `works10` を書いている。**同じ id を同じ場所に書くと、スタジオでの達成がこうぼうにも効いてしまう**（＝こうぼうで1本も作っていないのにコインが出ない、あるいは逆）。

### 1-4. きろく（日別ログ）

`profile.log[今日].gamelab` を**新規保存のみ**カウント。studio が `log[d].studio` を使っているのと同じ作法。

### 1-5. 空作品ガード

`sceneNonEmpty(work.chars)` が偽なら **XP・コイン・きろくすべて対象外**。studio と同じ。

---

## §2. 「かんせい！」演出との接続

`WorkshopEditor.jsx` に `saveDone.grant`（`{ xp, coins, hit }`）を受けて演出する仕組みが**すでにある**（b5u で実装済み・`grant.coins > 0` で表示）。
`grantForNewSave` が `null` でなくなれば、**そのまま動くはず**。

**確認すること**: 保存時に「かんせい！」でXPとコインが実際に出るか。出なければ配線を追う。

## §3. 便②で通した `exitWorkshop` 経路の確認

便②で `exitStudio` → `exitWorkshop` に改名し、こうぼうからマップへ戻る経路を通した。この経路は
`loadProfile` → `update()` → `setScreen("home")` で、**レベルアップ・進化・たまごの検知と演出**を走らせる。

便②の時点では付与が `null` だったので**空振りしていた**。本便で初めて意味を持つ。

**確認すること**: こうぼうで作品を保存 → マップへ戻る → **レベルアップ演出やバッジが出る**（XPが実際にプロフィールへ入っている）。

---

## §4. あわせてやる: 忘れないための手当て（★軽作業・先にやる）

「ゲームのせってい」の再設計は**設計もモックも完成しているのに、リポジトリに何も残っていない**。
台帳でも b6a の版エントリ内の申し送り1行だけで、**その版がアーカイブへ移れば消える**。

1. **添付のモック2本を `brushup/` に置く**
   - `gamecfg-mock1.html`（現行／案1 ルールカード／案2 めじるしタイルの比較）
   - `gamecfg-fit-sim.html`（右カラム全体の縦予算シミュレータ・1画面に収まるか判定つき）
2. **台帳の「未完了タスク」に項目を追加**（版エントリではなく、消えない場所へ）:

```
- ゲームのせってい 再設計（★設計・モック済み・未実装）
  モック: brushup/gamecfg-mock1.html（案1 採用）／ brushup/gamecfg-fit-sim.html
  ⚠️ 未決2件: ①背景の方針（案あ 遠景＋床2層／案い 新規生成／案う 無地）
              ②縦予算（下記のとおり当時より悪化）
  ⚠️ 縦予算の再計算が必要: シミュレータはじゅうじキーが無かった頃のもの。現在は
     .dpadbox 約144px（上演中・操作可能キャラがいるとき通常画面にも出る）＋
     こうぐだな 24%→21% でプレビュー約+12px。当時の案1Cでも収まらない。
     有力案＝「上演中は .gamecfg を隠す」（全画面で隠したのと同じ理屈・追加UI不要）
```

**これを最初の区切りとして単独 push する**（文書のみ・挙動不変）。

---

## §5. 変えないもの

- `studio/works.js` の付与ルール・`studio.milestones`・`COIN.studio`（**スタジオは完全無変化**）
- `saveWork` / `stashDraft` / `deleteWork` の export の形（関数名・引数・戻り値）
- `DEFS`・`geometry.js`・`engine.js`・ベースライン
- こうぐだなの寸法・全画面レイアウト・`OP_MS`・`CFG.MOVE_MS`
- マップ（`WorldMap.jsx`）・`App.jsx` の配線（便②で確定）
- **ゲームのせっていの見た目**（本便では触らない・§4 は記録だけ）

---

## §6. 検証

- `npm run verify` 全PASS。**`--update` は実行しない**。
  本件は付与ロジックのみで `DEFS` に触れないため、**ベースラインは1バイトも動かないはず**。動いたら**手を止めて報告**
- **★`verify-gamelab.mjs` が引き続き動くこと**（§0 の制約）。落ちたら §0-2 の形に切り替える
- **deploy 前に必ずブラウザで表示を確認**（便①の TDZ の教訓）
- **`studio.milestones` と `gamelab.milestones` が混ざっていないこと**を実測して報告
  （例: studio で5本作った状態から、こうぼうで1本目を保存して `first` が出るか）

### 実機ゲート（神田さん・iPad／studio・gamelab 両方）

1. こうぼうで作品を保存すると「**かんせい！**」でXPとコインが出る
2. **2回目以降の同じ作品の保存ではXPが出ない**（新規初回のみ）
3. **じゅうじキーかタップいどうを使った作品**で `firstOperable` のコインが出る
4. **クリア条件をスコア/じかんにした作品**で `firstClear` のコインが出る
5. マップへ戻ると**レベルアップ演出やバッジ**が正しく出る（§3）
6. **スタジオでの達成がこうぼうに影響していない**（逆も）
7. スタジオの付与が b6h と変わっていない

---

## §7. 中間報告ポイント

① **§4 の手当て**（モック2本配置＋未完了タスク追記・**文書のみ・単独 push**）
② **§0 の確認報告**（`verify-gamelab` が works.js を読むか・採る形と理由）
③ §1 付与ルールの実装 ＋ §2・§3 の接続確認
→ 版を **v2.3-b6i** に上げる → **版上げ → build → deploy を一度で**
→ 本番反映を確認 → 台帳に「deploy済み・実機確認待ち」で記帳

⚠️ 台帳は現在 **30,544字（`wc -m`）／10版**。b6i を足す前に維持規則に従い、**最古の b5y をアーカイブへ原文のまま移す**こと。

各区切りで push して sha を報告。**Chat は git を触らない**（読み取り検証のみ）。
