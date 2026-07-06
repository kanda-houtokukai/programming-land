# 00 このパックの中身と使い方（まずこれを読む）

プログラミングランド ブラッシュアップ設計パック（2026-07-06）
※ファイル名は英数字にしてあります（Windowsでの文字化け防止）。中身は日本語です。

---

## ★ プロジェクト（Claude.ai）に入れるファイル ★

プロジェクトのファイル欄は「次のClaudeが読んで文脈を把握するため」のもの。
以下を入れれば、次のClaudeが今日の設計を全把握して実装を進められる。
（画像は実装するローカルのCodeが使うもの。プロジェクトには入れなくてよい）

### 必ず入れる（引き継ぎの中核・3ファイル）
- 02_handoff.md … 【最重要】次のClaudeがまず読む。今日の全経緯・9メモ・教訓
- 01_roadmap_implementation.md … 実装順序の全体像（なぜこの順か）
- 03_code_guide_by_wave.md … 波ごとに「使うファイル」と「Codeに渡す指示文」

### 入れると便利（各メモの設計書・実装指示・文章）
- design/p6_battle_shop_design.md
- design/p6_implementation.md
- design/memo_sodatta_chikara_design.md
- design/worldmap_home_design.md
- design/worldmap_home_implementation.md
- room/memo04_home_room_implementation.md
- shop/memo05_shop_implementation.md
- skill/sodatta_chikara_implementation.md
- skill/sukusuku_meter_images.md
- battle/battle_effects_guide.md
- battle/building_swap_map.md
- battle/battle_images_map.md
- guide/art_guide_revised.js … おえかき保護者ガイド（メモ08）
- guide/parent_intro.js … 保護者向け理念文（メモ09）
- parent/parent_guide_full.js … 全モード保護者ガイド展開版（参考）

### 入れなくてよい（画像・ローカル用）
- design/worldmap-home.webp, room/room-home.webp, shop/shop-interior.webp
- skill/grow_*.png, battle/*.png, battle/*.webp
  → これらは実装するときにローカル（~/programming-land/src/assets/）に置く。

---

## 別途（既に対応済み）: リポジトリ／プロジェクトの正本4ファイル
以下は「正本更新」フォルダ（別途お渡し）の更新版に差し替え済みのはず:
- project-charter.md / education-curriculum.md / roadmap.md / feature-spec.md

---

## ファイル名の対応（英語名 → 日本語の意味）

| 英語ファイル名 | 意味 |
|---|---|
| 00_README.md | このファイル |
| 01_roadmap_implementation.md | 実装ロードマップ |
| 02_handoff.md | 引き継ぎ書 |
| 03_code_guide_by_wave.md | Code実装ガイド（波ごと） |
| design/p6_battle_shop_design.md | P6バトル＋ショップ設計 |
| design/p6_implementation.md | P6実装指示書 |
| design/memo_sodatta_chikara_design.md | そだったちから設計 |
| design/worldmap_home_design.md | ワールドマップ設計 |
| design/worldmap_home_implementation.md | ワールドマップ実装指示 |
| room/memo04_home_room_implementation.md | メモ04 おうちRPG部屋 実装指示 |
| shop/memo05_shop_implementation.md | メモ05 ショップRPG店 実装指示 |
| skill/sodatta_chikara_implementation.md | そだったちから実装指示 |
| skill/sukusuku_meter_images.md | すくすくメーター画像対応表 |
| battle/battle_effects_guide.md | バトル演出指示 |
| battle/building_swap_map.md | 建物差し替え対応表 |
| battle/battle_images_map.md | バトル画像対応表 |
| guide/art_guide_revised.js | おえかき保護者ガイド改訂 |
| guide/parent_intro.js | 保護者向け理念文 |
| parent/parent_guide_full.js | 全モード保護者ガイド展開版 |

## 画像ファイル（ローカルのsrc/assetsへ）
| 英語ファイル名 | 意味 |
|---|---|
| design/worldmap-home.webp | ワールドマップ背景 |
| room/room-home.webp | おうち部屋の背景 |
| shop/shop-interior.webp | ショップ店内の背景 |
| skill/grow_0_seed〜grow_4_flower.png | そだったちから 植物5段階 |
| battle/enemy_*.png（9枚） | バトルの敵9体 |
| battle/bg_battle_easy/normal/hard.webp | バトル背景3枚 |
| battle/icon_battle.png, icon_shop.png | マップのアイコン |
| battle/building_home/quiz/typing.png | ワールドマップの建物3枚 |
