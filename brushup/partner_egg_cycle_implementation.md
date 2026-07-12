# 相棒 たまごサイクル刷新 — 実装記録（v2.3-b4j）

日付: 2026-07-12 ／ 起点: v2.3-b4i ／ 指示書: Chat「相棒 たまごサイクル刷新 — 実装指示（Fable 5・1パス）」

## 実装サマリ（確定仕様どおり）

- **レベルは相棒ごと**: `partner = { active, owned:[{id, level, xp}…], egg: null|{xp} }`（xpも各自・従来から継続）。
  `EVOLVE_LEVELS`不変（stage3=Lv12）。`activeMon(partner)`ヘルパーをgrowth.jsに新設し全表示が参照。
- **付与=即時**: `applyXp`でアクティブが stage3 へ「新たに到達」（旧stage<3→3）した瞬間、
  未所持あり＆卵なしのとき `egg={xp:0}`＋トースト「たまごが とどいた！ あそんで あたためよう」＝卵は常に1個。
- **孵化**: 以後の`applyXp`のたび `egg.xp += amount`（★届いた瞬間のXPは二重計上しない）。
  `egg.xp >= EGG_HATCH_XP` で未所持からランダム1体を **Lv1** で追加・卵消費・
  トースト「たまごが かえって 〇〇が なかまに なった！（おうちで きりかえられるよ）」＝**自動きりかえはしない**
  （バトル中の孵化でスプライトが突然変わる事故を避けた・切替はロアモーダルから＝初期挙動・実機で調整可）。
- **EGG_HATCH_XP = 40**（growth.jsに集約・初期値。BATTLE_XP easy12/normal16/hard22→やさしいバトル3〜4回ぶん）。
- **卵欄**（HomeRoom）: `egg.png`＋孵化ゲージバー＋文言（<50%「たまごを あたためてる」/<90%「あと ちょっと」/
  ≧90%「もうすぐ！」）。卵が無いときは非表示。タップ操作なし（見守り表示）。
- **廃止**: 旧`EGG_LEVELS[5,12,18,24]`・`pendingEggs`導出・タップ開封モーダル（b4i）。egg.png・いわ入替は維持。

## スキーマ移行（storage.js・SCHEMA_VERSION 2→3）

- `migratePartner`が3世代を吸収: ①最新（素通し・欠損補完）②b4f〜b4i `owned:[id…]＋共有level/xp`→
  **各ownedに共有level/xpを引き継ぎ**（見た目の退行なし）・egg=null ③b4f以前 `{species,level,xp}`。
  旧ID読み替え（moko→mori/shizuku→mizu/hoshi→denki）継続。
- ★移行では egg を付与しない（付与は到達イベント限定）→ 既にstage3のセーブに卵が湧かない。
- roundtripに4ケース（旧々移行・旧ID・共有Lv13→全員引き継ぎ＋egg=null・最新形式素通し）＝全PASS。

## 変更ファイル

storage.js（移行・schema3）／growth.js（applyXp刷新・activeMon・EGG_HATCH_XP）／
battle.js（battleUnlockedをactive参照・自己完結）／App.jsx（差分検知=進化/レベルアップ/卵到着/孵化トースト・
スターター新形式）／Battle.jsx（pmon参照3箇所のみ・演出ロジック不変）／HomeRoom.jsx（卵欄・ロア/きりかえの
相棒ごとLv表示・旧たまごモーダル削除）／PartnerCard・ProfileSelect・WorldMap・Dex（activeMon/owned objects対応）／
monsters.js（旧EGG_LEVELS削除）／test-roundtrip.mjs。

## 検証記録

- verify全PASS・roundtrip全PASS。
- プレビュー実プレイ: b4i形式セーブ（共有Lv11）が移行され2体ともLv11引き継ぎ／バトルHUDがactiveの個別Lv／
  勝利+12XPで **Lv12到達→進化演出→即 egg={xp:0}**（mizuはLv11のまま＝個別レベル動作）／
  次の勝利でゲージ 12/40・部屋の卵欄=egg.png＋「たまごを あたためてる」＋バー30%／
  egg.xp=35から+12XPで **iwa がランダム孵化・Lv1追加・egg=null**。
- ロジック直検（Vite動的importでapplyXpを直接実行）: 5体所持でstage3到達→卵付与なし／
  4体→到達付与→+40で唯一の未所持denki孵化→5体後は+100XPでも何も起きない。
- バトル演出（タイプライター/かいしん/ヒットストップ等）は実プレイ中も従来どおり。コンソールエラーなし。
