# メモ06-A Phase 1 — バトルタワーの核（実装指示・Code）

作成: 2026-07-09 ／ 対象: memo06-A（拡張バトル進行）Phase 1 ／ 起点: v2.3-b3n ／ 実装: v2.3-b3o
編集: `src/components/Battle.jsx`（主）／ `src/data/battle.js`（数値集約）／ 保存スキーマ（`towerBest` 追加）
設計: `memo06a_battle_tower_design.md` 準拠。**既存の戦闘UI・画像は変えない**（戦闘を「フロアで包む」だけ）。

## Phase 1 スコープ（タワーの核のみ・ナッジは Phase 2）
帯（difficulty）ごとに、**その帯の名前つき3体を全部倒すとタワーが解放**。タワー＝同じ戦闘をフロアで連鎖。**フロアが上がるほど敵HPが増える（帯の中で）**。クイズは**帯の難易度のまま**（＝発達段階に適切・帯を超えて難しくしない）。**最高到達フロアを記録**・**負けても罰なし**・**フロアごとのコインは無し**（周回防止・06-C準拠）。

## 実装（v2.3-b3o・実装記録込み）

1. **保存スキーマ**: `storage.js` の battle デフォルトに `towerBest: {}` を追加（難易度別最高フロア・`|| 0` で読む）。
   旧セーブはデフォルト値マージで `{}` 補完（roundtrip に往復＋補完の2チェックを追加済み）。
2. **battle.js（数値集約・★実機調整箇所）**:
   - `TOWER_START_FLOOR = 1`
   - `towerFloorBonus(floor) = Math.floor((floor-1)/2)` … 2フロアごとに +1（控えめ・初期値）
   - `towerHp(diff, floor) = HP_BY_DIFF[diff] + towerFloorBonus(floor)`
3. **選択画面（Battle default export）**: 難易度タブ＝レベル選択として流用。敵リストの後に🗼タワーカード。
   `list.every(defeated)` で解放（紫背景・「どこまで のぼれるか ちょうせん！…🏅 さいこう ○かい」）／
   未達はロック表示「3体 たおすと あらわれる」（disabled・薄表示）。
4. **タワー進行**: 状態 `tower`/`floor`/`towerRun`（もういちど用のremountカウンタ）。敵＝帯3体を巡回
   `list[(floor-1)%3]`。`BattleFight` を `key=tower-{diff}-{run}-{floor}` でフロアごとに remount。
5. **BattleFight のタワーモード**（props: `tower`/`floor`/`maxHpOverride`/`onFloorClear`/`onTowerLose`/`onTowerRetry`）:
   - `maxHp = tower ? maxHpOverride : HP_BY_DIFF[diff]`。クイズは `battlePool(diff)` のまま（帯の難易度）。
   - 勝利（tower）: XPのみ（`BATTLE_XP[diff]`）＋日別log。**コイン/討伐/best/ずかんに触れない**。
     towerBest を「クリアしたフロア」で即更新（クリア後にホームへ抜けても記録が残る）。
     オーバーレイ=「🗼 ○かいを クリア！＋うえの かいは てきが つよくなるよ！＋つぎの フロアへ ▶」。
   - 敗北（tower）: `onTowerLose(floor)`＝到達フロアでベスト更新（指示どおり）。罰なし。
     オーバーレイ=「🗼 ○かいまで のぼった！＋さいこうきろく＋もういちど（1かいから）／ホームへ」。
   - 画面上部に「🗼 ○かい」バッジ・タイトル「○○ タワー」。
   - **非tower（名前つき戦）は従来どおり**。※1点だけ表示の正確化: 勝利オーバーレイのコイン行が
     06-C後も常に「＋N」と表示していたのを `firstKill ? ＋N : ＋0（たおしたことのある あいて）` に修正
     （付与ロジックはb3gから初撃破のみ・表示が実態とズレていたのを合わせた）。

## 発達段階の要（崩さない）
**クイズは帯の難易度のまま**。歯応えは HP・長さ（＋高フロアでアイテムが効く）で出す。

## 検証（Code・2026-07-09・全PASS）
- verify全PASS・roundtrip全一致（towerBest往復＋旧セーブ`{}`補完の新チェック2件含む）。
- プレビュー実測（fiberから正答を特定して自動プレイ）:
  - easy3体撃破セーブ（towerBest無し=旧形式）→🗼入口解放・ふつうタブはロック表示
  - フロア1: HP3/3・勝利=XPのみ・コイン50不変・「つぎの フロアへ」
  - フロア2: 敵巡回（ぷにスライム→きのこちゃん）・HP3/3（+1は3階から）・towerBest{easy:1}保存
  - 敗北: 「2かいまで のぼった！・さいこうきろく2かい」・towerBest{easy:2}・コイン不変（罰なし）
  - もういちど（1かいから）: floor1・スライム・HP3/3 に remount
  - 選択画面に「🏅 さいこう 2かい」
  - 名前つき戦（討伐済み再戦）: 従来どおり勝利・best.easy 3→4・コイン+0・「＋0（たおしたことのある あいて）」表示・「つぎの てきへ」
- ★完了報告は「実機確認をお願いします」で（タワーの手応え・スケール・入口の見せ方は実機調整）。
