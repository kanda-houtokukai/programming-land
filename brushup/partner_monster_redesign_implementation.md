# 相棒モンスター 全面刷新 — 実装記録（v2.3-b4f）

日付: 2026-07-12 ／ 起点: v2.3-b4e ／ 指示書: Chat「相棒モンスター 全面刷新 — 実装指示（Fable 5・まとめて1パス）」
設計準拠: partner_monster_redesign_design.md ／ partner_monster_15_detail_prompts.md（いずれもChat側）

## 実装サマリ（指示①〜⑤すべて実施）

1. **データ＋アート**: `monsters.js`を5タイプ×3進化＝15体に刷新（mori/mizu/hono/denki/iwa・lore・
   スプライトimport・`typeEmoji`廃止・`monsterImg()`新設・`DEX_ENTRIES`=15）。
   `MonsterArt`はCSS/SVG描画→スプライト`<img>`に置換（**props互換**＝呼び出し側は自動で新絵）。
   `monster-art.js`（旧SVG定義）は削除。
2. **図鑑15**: 所持タイプ=3すがたカラー表示＋タップでロア／未所持=シルエット？？？＋「たまごから なかまに」。
   コンプ表示=「なかまに した タイプ: n/5」。STAGE_LABELの「たまご」→「あかちゃん」（たまごは収集要素と紛れるため）。
3. **ロア画面**: 部屋のactive相棒タップ→ロアモーダル（大きめ画像150・なまえ・タイプ+Lvピル・lore・
   つぎのレベルまで・**きりかえ**（owned>1時・共有stageのサムネから選択）・ずかん導線）。図鑑エントリからも同内容。
4. **たまご収集＋スキーマ移行**:
   - `save.partner` = `{active, owned:[…], level, xp}`（level/**xp**共有。指示のlevelに加えxpも従来から継続）
   - `EGG_LEVELS=[5,12,18,24]`（初期値）。**未開封たまご数=導出式**（`pendingEggs`=到達節目数−孵化数(owned-1)、
     未所持数でクランプ）＝**保存スキーマにたまごフィールドを追加しない**（過去の節目も取りこぼさない）
   - 節目到達時にトースト「たまごが とどいた！ おうちで あけてみよう」（バトル進行を中断しない設計）
   - 部屋の床に たまご（**SVG仮図形**・斑点つき・絵文字不使用）→タップで「たまごが とどいた！」→
     未所持から選択→孵化祝福（現到達stageで登場・図鑑登録は現stageまで一括）→「この こに きりかえる」導線
   - スターター選択を5体に（タイプピル・lore一文・「えらばなかった なかまも たまごで」）
5. **進化**: level共有＝owned全員が一緒に進化。applyXpの図鑑登録をowned全員ぶんに拡張。

## ★実装上の判断（Chatの実機確認で裏取りしてほしい2点）

- **アセットのstage順リネーム**: 受領zipの `mizu_1↔mizu_2`・`denki_1↔denki_3` は実絵と進化順が逆と判断し
  （雫の赤ちゃん顔=ポチャ／黄色い電気玉の赤ちゃん=ピカ／結晶の竜=ライオウ）、**配置時にリネームして正した**。
  → 実機で各タイプの進化順（ずかん）を確認してほしい。
- **旧タイプIDの読み替え**: 既存セーブの旧3タイプは `moko(もり)→mori`／`shizuku(うみ)→mizu`／
  **`hoshi(そら)→denki`（雲・空つながりで最近縁）**。save.dex の旧キーも同時読み替え。

## 技術メモ

- **移行はstorage.jsに自己完結**（`migratePartner`+`OLD_SPECIES_MAP`・mergeDefaults内で適用＝load/import両経路）。
  monsters.jsは画像importを含みnodeから読めないため、storage.jsに依存させない（roundtrip試験の保護・既知事故と同型回避）。
- ★**バトルの.fitArtとinline widthの罠**: MonsterArtが`<img>`にinline width/heightを持つと、
  `.fitArt img { width:100% }`（コンテナ幅=進化スケール・b4c）より**inlineが勝って固定pxになる**。
  → MonsterArtに`size={null}`=「寸法をCSSに任せる」モードを追加し、バトルはnullで呼ぶ。
  進化スケールは従来どおり外側divの幅（`PARTNER_BASE_W×partnerStageScale`）が決める。
- 演出境界は不変（命中解決168–197・dmgPop・突進コンテナclassName・メッセージパネル・pl-*）。
  差し替えたのは.fitArt内の絵1個のみ。

## 検証記録

- `npm run verify`全PASS・roundtrip全PASS（**追加**: 旧{species:moko}→新{active:mori,owned,level,xp}／
  旧ID shizuku→mizu・hoshi→denki（dex込み）／新形式素通し／partner=null維持）
- プレビュー実測: 5体スターター選択→hono選択（owned/active正常）／部屋=新スプライト+進化スケール／
  相棒タップ→ロア／Lv5でたまご出現→ポチャ選択→ミズチ（共有stage2）で孵化祝福→きりかえ（active=mizu）／
  ずかん=2/5・所持2タイプ3すがた・未所持シルエット・ロアポップアップ／
  バトル=mon_mizu_2スプライト・コンテナ24%駆動・**演出実測**（anticip 0→lunge+119ms→「-1」+521ms）・勝利／
  Lv11→12で**進化演出**（ミズチ→ウズリュウ・溜め→渦→登場→祝福）・owned全員のstage3が図鑑登録／
  旧形式セーブ（moko Lv12）が選択画面でモリガルド表示＝移行成功。コンソールエラーなし。
