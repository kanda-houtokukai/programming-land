# おうち／お店 UI改修 ①〜④ — 実装指示（Fable 5・1パス）

作成: 2026-07-11 ／ 起点: v2.3-b3v ／ 実装: v2.3-b3w ／ 承認モック: ouchi_ui_redesign_mockup 準拠
編集: HomeRoom.jsx（主）／Shop.jsx（はなしかけるバブル・initialStage）／theme.js（.bubble・.pulse のみ）／
HowTo.jsx（おしてね点滅）／App.jsx（配線）／battle.js（DEFAULT_BG_CHOICES・equippedBgImg拡張）

## 境界（遵守）
- バトル演出は別ライン担当＝Battle.jsx・theme.jsのバトル演出keyframe（pl-dmgfloat/pl-anticip/pl-idle等）は不変。
  theme.jsで触ったのは .bubble の作り替えと .pulse 新設（＋reduced-motionリスト）のみ。
- デフォルト絵文字アイコン不採用: どうぐ=既存バトル消耗品イラスト流用／ステータス=SVGの仮アイコン
  （星・コイン・バッジ・カレンダー figures＝MiniIcon。後で専用イラストに差し替え）。

## 実装記録（Code・2026-07-11・v2.3-b3w）

### ① ラベル＝RPG看板調・対象の「上」
- `.bubble` を看板調に作り替え: 地 #FAEEDA・枠 #BA7517(2.5px)・字 #633806・角丸9px・
  下向き三角しっぽ（::after/::before の色も更新）。おうち/お店の全ラベル共通（一括反映）。
- 配置: FURNITURE ラベル=タップ領域の上（absolute bottom:calc(100%+2px)）／あいぼう・アバター=スプライトの上／
  お店の「はなしかける」=店主の頭の上（top:6% translateY(-100%)・💬絵文字は除去）。

### ② たからばこ＝もちもの
- FEAT chest → nested "chest" モーダル（一時メッセージ廃止）。
- どうぐ: 所持数>0 のバトル消耗品を数つきグリッド（イラスト流用）。0個なら「まだ なにも ないよ」。
- バトルのはいけい切替: 〔おまかせ（null=難易度自動・CSSグラデの仮サムネ）／既定3枚（そうげん/ゆうひ/よる＝
  battle.js に DEFAULT_BG_CHOICES 新設・id=bgdef_*）／購入済み舞台（ジャングル/だいち）〕のサムネを並べ、
  タップで equipped.bg を切替（選択中✓印）。equippedBgImg を拡張（cosmeticById || DEFAULT_BG_CHOICES 検索）。
  **既存の equipped.bg 文字列を流用＝保存スキーマ不変**（roundtrip 追加不要）。

### ③ プロフィール＝アバター導線＋画面刷新
- 導線: FURNITURE から profile（額縁52/22）を除去（コメントで座標保持・額縁は装飾に）。
  あいぼう（left42/top66に微移動）の横 left60/top66 に自分のアバター（PlayerAvatar full size78・dressup反映・
  mapfloat）を配置→タップでプロフィール。
- 画面: 左=PlayerAvatar full 130＋「👗きせかえ」ボタン（→ Shop の dressup 棚へ直行）／
  右=名前＋4つのステータスplate（枠つき・MiniIcon=SVG仮アイコン・ほし/コイン/バッジ/あそんだ）。
- きせかえ直行の配線: App に shopInit state＋openDressup（HomeRoom の onDressup prop）。
  Shop は initialStage prop で初期棚を開き、マウント時に onConsumeInit で消費（次回入店は通常front）。

### ④ ふわふわ→うっすら点滅
- `.pulse` 新設（opacity 1↔.7・2.6s ease-in-out・reduced-motionで無効）。
- ラベル（bubble）と HowTo「おしてね」（旧bounce）を pulse に変更。
- キャラの揺れは点滅にしない: 部屋の相棒・アバターのスプライトは mapfloat 据え置き。
  WorldMap のアイコン mapfloat・pl-mapfloat 定義も不変。

## 検証（全PASS）
- verify全PASS・roundtrip全一致（スキーマ不変）。
- プレビュー: ラベル5つが看板調（#FAEEDA/9px/#633806）＋pulse（mapfloatなし）／もちもの=drink×2・
  glasses×1（イラスト・絵文字なし）・背景choices=おまかせ✓＋既定3＋購入ジャングルのみ（だいち非表示）・
  ゆうひ選択→equipped.bg="bgdef_normal"保存・おまかせ→null／プロフィール=plate4種・SVG仮アイコン・
  絵文字ステータスなし・きせかえ→「きみの おしゃれ」棚直行・もどる1階層／部屋スクショ=ラベルが対象の上・
  アバター（帽子反映）が相棒の横に立つ。

## 実機確認待ち（→OK後にChatが正本反映）
バブルの質感・配置／もちもののどうぐ・背景切替の据わり／プロフィールのplate／アバターの立ち位置(60/66)・
大きさ(78px)／点滅の強さ(0.7)・周期(2.6s)。

---

## 実機FB調整（b3x・2026-07-11）

① **きせかえ＝おみせに行かせない**: 着せ替え棚を共通コンポーネント `DressupShelf.jsx` に抽出
   （購入/装備トグルのロジック集約・メッセージ文言は onBought/onPoor コールバックで呼び出し側が決める）。
   - おみせ: dressup 棚を DressupShelf 呼び出しに置換（店員セリフで包む・挙動不変）。
   - プロフィール: 「きせかえ」→部屋内ネストモーダル（nested="dressup"）で棚を直接開く。
     ◀もどる→プロフィールへ戻る。**Shop への遷移なし**＝b3w の App shopInit／Shop initialStage 配線は廃止。
② **プロフィールのアバター2倍**: PlayerAvatar size 130→**260**（モーダル maxWidth 430→560・
   flexWrap で狭幅は縦積み）。部屋のアバター(78px)は不変。
③ **ずかん・きろくのラベルを少し下に**: FURNITURE に `labelDy`（下方向オフセットpx）＝
   dex **16** / records **12** / chest 0。対象の上のまま transform で下げる。
- 検証: verify全PASS・roundtrip全一致。プレビュー=labelDy反映(16/12/0px)／プロフィールアバター224×298
  （≒2倍）／きせかえ棚モーダルで購入（コイン100→45・head_compass装備・メッセージ表示）→もどる→
  プロフィールのplateに戻る（Shop遷移なし）。
