# バトルエリア（入口画面）を全画面背景に — 実装記録（v2.3-b4q）

日付: 2026-07-13 ／ 起点: v2.3-b4p ／ 対象: `src/components/Battle.jsx` default export（入口画面＝難易度/敵/タワー選択）

## 指示（Chatより）
- `battle-arena.webp`（1600×900）を src/assets/ へ。入口画面に全画面背景として敷く（おうち/ひろば/ワールドマップと同じ作法）。
- 技術: コンテナに `<img position:absolute inset:0 width/height:100% objectFit:cover>` を最背面に置き、その上に既存の Header/難易度タブ/敵カード/タワー入口 を重ねる。
- スマホ: objectFit:cover＋center。アリーナ中央が空いているのでUIが土俵に乗る。狭幅は左右クロップで成立。
- 可読性: カード群は既存背景色があるのでそのまま（scrimは初期なし・実機判断）。
- ★戦闘中(BattleFight)の背景(BATTLE_BG)・戦闘/演出/結果シーケンスは不変。

## 実装（Code）
- アセット配置。Battle.jsx に `import battleArena`。
- 入口画面の return を全画面ラッパに再構成:
  - 外側 `div{ position:relative; minHeight:100vh }`
  - 最背面 `img{ position:absolute; inset:0; width/height:100%; objectFit:cover; objectPosition:center; zIndex:0 }`
  - 既存コンテンツを `div{ position:relative; zIndex:1; maxWidth:640; margin:0 auto; paddingBottom:30 }` で包んで上に重ねた（Header/タブ/敵カード/タワー/ParentGuide はそのまま・戻る導線不変）。
- scrimは入れていない（初期＝無し・実機で判断）。カードは既存の白/淡色背景で可読。
- ★境界: BattleFight（戦闘中）は別関数・今回のreturnの外＝背景BATTLE_BG等は不変。演出・結果シーケンス・アイコンは不変。

## 検証
- verify全PASS。手動（プレビュー＋375px）: 入口が全画面アリーナ背景／難易度タブ・敵カード・タワーが読める・押せる／狭幅で崩れず土俵にUIが乗る／戦闘中の背景は従来どおり。
