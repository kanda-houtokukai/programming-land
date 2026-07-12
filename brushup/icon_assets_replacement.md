# 専用アイコンの配置・差し替え（小改修・v2.3-b4d）

日付: 2026-07-12 ／ 起点: v2.3-b4c ／ 対象: HomeRoom.jsx・Battle.jsx（★見た目だけ・ロジック/配置ルール不変）

## 指示（Chatより）

アセット（6点）を src/assets/ へ配置:
icon_stat_star.png / icon_stat_coin.png / icon_stat_badge.png / icon_stat_days.png（各256px透過PNG）
icon_tower.png（256px透過PNG）／ bg_auto.webp（800×450）

① プロフィールのステータスplate（HomeRoom.jsx の SVG 仮アイコン4種 star/coin/badge/calendar）
   → img に差し替え。表示は現行の 22–28px のまま。
② もちものの「おまかせ」（equipped.bg=null の CSS 仮サムネ）
   → bg_auto.webp の img に差し替え（他の背景サムネと同じサイズ・16:9枠に収める）。
③ バトルのタワー入口（タワーカードの 🗼 相当の仮）
   → icon_tower.png の img に差し替え（他の拠点/敵アイコンと同サイズ）。

維持: 出題/採点/記録/難易度・配置ルール・バトル演出境界（168–197/dmgPop等/303/pl-*）は不変。絵文字は除去。
検証: npm run verify＋roundtrip。version繰り上げ。npm run deploy（push＋SHA指定raw確認）。

## 実装記録（Code）

- アセット6点を `src/assets/` に配置（受領サイズのまま・既存作法の256px級）。
- ① `MiniIcon`（HomeRoom.jsx）: SVG仮図形4種を削除→ `STAT_ICONS` マップ＋`<img>` 1本に集約。
  表示は従来どおり **22×22px**（`objectFit:contain`）。呼び出し側（plate 4行 map）は無変更。
- ② おまかせサムネ: CSS 3色グラデ div（文字「おまかせ」入り）→ `bg_auto.webp` の `<img>`。
  スタイルは他の背景サムネと完全同一（width100%・aspectRatio16/9・cover・radius8・枠2px）。
  下のラベル「むずかしさで かわる{✓}」は不変。bg_auto は 800×450=ちょうど16:9 なので cover で欠けなし。
- ③ タワー入口カード: `<span fontSize:34>🗼</span>` → `icon_tower.png` の `<img>` **44×44px**
  （同じリストの敵アイコン `EnemyIcon size={44}` に合わせた）。解放判定・onClick は不変。
- ★スコープ外メモ（Chatの判断待ち）: バトル中の 🗼 絵文字は3箇所残っている——
  フロア表示ピル「🗼 Nかい」（Battle.jsx 内ヘッダー）・勝利オーバーレイの🗼（48px）・
  敗北メッセージ「🗼 Nかいまで のぼった！」。指示③はタワー「入口」のみだったため据え置き。
  揃えるなら次の小改修で同アセットに差し替え可能。
- 触っていない: 演出境界（命中解決/dmgPop/メッセージパネル/突進className/pl-*）・保存スキーマ・文言。
