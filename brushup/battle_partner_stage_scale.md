# バトルの相棒サイズを進化で変える（小改修・v2.3-b4c）

日付: 2026-07-12 ／ 起点: v2.3-b4b ／ 対象: `src/components/Battle.jsx`

## 指示（Chatより）

対象: Battle.jsx の相棒スプライトの size
土台: monsters.js に共有スケール `partnerStageScale = {1:1.0, 2:1.2, 3:1.45}` が導入済み（b4b・部屋側は適用済み）。

- バトル画面の相棒スプライトの size に `partnerStageScale[stage]` を掛ける
  （バトルの基準サイズ × partnerStageScale[stage]・stage = stageForLevel(partner.level)）。
  `import { partnerStageScale, stageForLevel } from "../data/monsters.js"`（未importなら追加）。
  ＝進化すると 部屋（実装済み）・バトル 両方で相棒が大きくなる（体感統一）。
- 掛け方・バトル基準サイズは初期値でよい。実機で「大きすぎ/小さすぎ」なら1箇所で調整。

★境界（壊さない）: 演出が触った箇所は編集しない——命中解決 168–197・dmgPop等のstate・
メッセージパネル 361–362・突進コンテナの className 303・theme.js pl-dmgfloat/pl-anticip。
維持: 上記以外は不変。絵文字アイコン不採用のまま。
検証: npm run verify＋roundtrip（表示のみ・スキーマ不変）。手動: stage1/2/3 で相棒が段々大きくなる／
演出（タイプライター/ヒットストップ/浮遊ダメージ/予備動作）が従来どおり動く。
version b4b→b4c。npm run deploy（push＋SHA指定raw確認）。

## 実装記録（Code）

- ★調査で判明した構造: バトルの相棒は `.fitArt`（theme.js: `svg { width:100%; height:auto }`）で
  **コンテナ幅（位置決めdivの `width:"24%"`）が表示サイズを決めており、`MonsterArt` の `size={200}` prop は
  表示に効いていない**。よって「size に掛ける」の実体は**コンテナ幅に掛ける**実装にした
  （size prop に掛けても見た目が変わらないため）。
- 変更点（3ファイル・演出境界は不変）:
  1. `Battle.jsx` import に `partnerStageScale` 追加
  2. `Battle.jsx` に基準定数 `PARTNER_BASE_W = 20` 新設（コメントつき・★実機調整はここ1箇所）
  3. 相棒の位置決めdiv（突進コンテナの親・旧 `width:"24%"`）を
     `width: ${PARTNER_BASE_W * (partnerStageScale[pstage] || 1)}%` に変更
     → **stage1=20% / stage2=24% / stage3=29%**（初期値。stage2≒従来の24%＝中間段を現行の見た目に合わせた）
- 副次効果（設計どおり・追加コードなし）: 足元アンカー（bottom:4%）は不変＝接地線維持・
  `GroundShadow w="70%"` はコンテナ幅比例で影も一緒に拡大・突進距離（--dx/--dy=vw単位）は不変。
- HudPill（あいぼうLv表示）は zIndex6 ＞ 相棒 z4 のため stage3 で重なっても上に描画される。
- 触っていない: 命中解決168–197・dmgPop等state・メッセージパネル・突進コンテナのclassName・
  theme.js の pl-dmgfloat/pl-anticip・battle.js の数値・保存スキーマ。
