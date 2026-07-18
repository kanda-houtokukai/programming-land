// 色・共通CSS（v1から移植）
// ※旧・動物アバター（AVATARS）は第3波①で廃止（主人公=男女の探検家キャラクターに置き換え・data/dressup.js参照）

export const C = {
  bg: "#FFF9EF",
  ink: "#3A3335",
  sky: "#7FC8F8",
  sun: "#FFD447",
  sakura: "#FF8FAB",
  leaf: "#6BCB77",
  grape: "#9D7BD8",
  white: "#FFFFFF",
};

// 低学年の可読性を優先し、手書き風フォントは全廃。全画面を丸ゴシック(M PLUS Rounded 1c)に統一。
// Googleフォントはオンライン時のみ読み込まれ、オフライン時はOS内蔵の丸ゴシックにフォールバックする
export const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;900&display=swap');
  .pl-root {
    font-family: 'M PLUS Rounded 1c','Hiragino Maru Gothic ProN','Yu Gothic',sans-serif;
    background:
      radial-gradient(circle at 15% 10%, #FFECC7 0 120px, transparent 130px),
      radial-gradient(circle at 85% 85%, #DFF3FF 0 160px, transparent 170px),
      ${C.bg};
    min-height: 100vh; color: ${C.ink};
    -webkit-user-select: none; user-select: none;
  }
  /* 見出し用。本文と同じ丸ゴシックを最大ウェイトで（手書き風は廃止） */
  .pl-display { font-family: inherit; font-weight: 900; letter-spacing: .01em; }
  .panel {
    background: #fff; border: 3px solid ${C.ink}; border-radius: 22px;
    box-shadow: 5px 5px 0 rgba(58,51,53,.9);
  }
  .pbtn {
    border: 3px solid ${C.ink}; border-radius: 18px; cursor: pointer;
    box-shadow: 4px 4px 0 rgba(58,51,53,.9);
    transition: transform .06s, box-shadow .06s;
    font-family: inherit; font-weight: 800; color: ${C.ink};
  }
  .pbtn:active { transform: translate(3px,3px); box-shadow: 1px 1px 0 rgba(58,51,53,.9); }
  /* ワールドマップの台紙なしアイコン: 押すと少し縮む（centeringのtranslateを保つため!important） */
  .mapicon { transition: transform .08s; }
  .mapicon:active { transform: translate(-50%,-50%) scale(.9) !important; }
  .pbtn:focus-visible { outline: 4px solid ${C.sakura}; outline-offset: 2px; }
  .pbtn:disabled { opacity: .4; cursor: not-allowed; }
  @keyframes pl-pop { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
  @keyframes pl-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
  @keyframes pl-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes pl-slide { from{transform:translateY(24px);opacity:0} to{transform:translateY(0);opacity:1} }
  .pop { animation: pl-pop .4s ease; }
  .shake { animation: pl-shake .3s ease 2; }
  .bounce { animation: pl-bounce 1.2s ease infinite; }
  .slide { animation: pl-slide .3s ease; }
  @keyframes pl-glow {
    0%,100% { box-shadow: 0 0 0 3px #fff, 0 0 12px 5px rgba(255,212,71,.95); }
    50% { box-shadow: 0 0 0 3px #fff, 0 0 20px 9px rgba(255,212,71,.45); }
  }
  .glow { box-shadow: 0 0 0 3px #fff, 0 0 12px 5px rgba(255,212,71,.9); animation: pl-glow 1.6s ease infinite; }
  /* ---- バトル演出（P6・フェーズ1.5）。transform/opacity/filter中心＝タブレットで軽い ---- */
  .fitArt svg, .fitArt img { width: 100%; height: auto; display: block; }
  /* 待機: ふわふわ上下（生きている感）。相棒と敵で位相をずらす */
  @keyframes pl-idle { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-7px) } }
  .idle { animation: pl-idle 2.4s ease-in-out infinite; }
  .idle2 { animation: pl-idle 2.4s ease-in-out -1.2s infinite; }
  /* 突進（--dx/--dy で方向指定・45〜60%で命中位置に滞留→戻る） */
  @keyframes pl-lunge {
    0%{ transform: translate(0,0) } 45%{ transform: translate(var(--dx), var(--dy)) scale(var(--lsc,1.06)) }
    60%{ transform: translate(var(--dx), var(--dy)) scale(var(--lsc,1.06)) } 100%{ transform: translate(0,0) }
  }
  .lunge { animation: pl-lunge .7s cubic-bezier(.3,.7,.4,1); }
  /* 被弾: 白フラッシュ＋小刻み振動 */
  @keyframes pl-hitflash {
    0%,100%{ filter:none; transform: translateX(0) }
    15%{ filter: brightness(2.6) saturate(.4); transform: translateX(-6px) }
    35%{ filter: brightness(2.1); transform: translateX(6px) }
    55%{ filter: brightness(1.7); transform: translateX(-4px) }
    75%{ filter: brightness(1.3); transform: translateX(3px) }
  }
  .hitflash { animation: pl-hitflash .55s ease; }
  /* 画面ゆれ（かいしん用の強いほう） */
  @keyframes pl-shake2 { 0%,100%{transform:translate(0,0)} 20%{transform:translate(-10px,4px)} 40%{transform:translate(9px,-5px)} 60%{transform:translate(-7px,3px)} 80%{transform:translate(6px,-2px)} }
  .shake2 { animation: pl-shake2 .45s ease; }
  /* 命中エフェクト（💥がはじける） */
  @keyframes pl-hitfx { 0%{ transform: scale(.2) rotate(-15deg); opacity: 0 } 25%{ transform: scale(1.5) rotate(8deg); opacity: 1 } 100%{ transform: scale(1) rotate(0); opacity: 0 } }
  .hitfx { animation: pl-hitfx .6s ease forwards; }
  /* かいしん！の文字ポップ */
  @keyframes pl-critpop { 0%{ transform: scale(0) rotate(-8deg); opacity:0 } 30%{ transform: scale(1.35) rotate(3deg); opacity:1 } 70%{ transform: scale(1.1) rotate(-2deg); opacity:1 } 100%{ transform: scale(1); opacity:0 } }
  .critpop { animation: pl-critpop .9s ease forwards; }
  /* 06-A Phase2 演出磨き: 浮遊ダメージ数字（オーバーシュート拡大→上昇フェード） */
  @keyframes pl-dmgfloat {
    0%   { transform: translateY(0) scale(.3); opacity: 0 }
    18%  { transform: translateY(-4px) scale(1.25); opacity: 1 }
    32%  { transform: translateY(-10px) scale(1); opacity: 1 }
    100% { transform: translateY(-56px) scale(1); opacity: 0 }
  }
  .dmgfloat { animation: pl-dmgfloat .9s cubic-bezier(.2,.7,.3,1) forwards; }
  /* 06-A Phase2 演出磨き: 通常攻撃の予備動作（突進前に少し引いてかがむ・かいしんは既存の溜めがあるので対象外） */
  @keyframes pl-anticip {
    0%   { transform: translate(0,0) }
    60%,100% { transform: translate(-7px,4px) scale(.97) }
  }
  .anticip { animation: pl-anticip .12s ease-out forwards; }
  /* ハートが割れる */
  @keyframes pl-heartbreak { 0%{ transform: scale(1) } 30%{ transform: scale(1.5) rotate(-12deg) } 100%{ transform: scale(.2) rotate(20deg) translateY(14px); opacity: 0 } }
  .heartbreak { display:inline-block; animation: pl-heartbreak .6s ease forwards; }
  /* 敵ダウン（しぼんで消える） */
  @keyframes pl-fall { 0%{ transform: none; opacity:1 } 100%{ transform: scale(.15) rotate(18deg) translateY(30px); opacity: 0 } }
  .fall { animation: pl-fall .9s ease forwards; }
  /* 勝利ジャンプ */
  @keyframes pl-victory { 0%,100%{ transform: translateY(0) } 20%{ transform: translateY(-26px) } 40%{ transform: translateY(0) } 60%{ transform: translateY(-16px) } 80%{ transform: translateY(0) } }
  .victory { animation: pl-victory 1.1s ease; }
  /* しょんぼり（敗北・罰なし） */
  @keyframes pl-droop { 0%{ transform:none; filter:none } 100%{ transform: translateY(10px) scale(.92,.85); filter: saturate(.5) brightness(.92) } }
  .droop { animation: pl-droop .8s ease forwards; }
  /* ごほうびのキラキラ（上へ舞って消える） */
  @keyframes pl-riseup { 0%{ transform: translateY(0) scale(.6); opacity:0 } 20%{ opacity:1 } 100%{ transform: translateY(-70px) scale(1.15); opacity:0 } }
  .riseup { animation: pl-riseup 1.3s ease forwards; }
  /* パワーバンドのオーラ（次の攻撃が光る予兆） */
  @keyframes pl-aura { 0%,100%{ filter: drop-shadow(0 0 4px rgba(255,212,71,.9)) } 50%{ filter: drop-shadow(0 0 14px rgba(255,150,40,.95)) } }
  .aura { animation: pl-aura 1.2s ease-in-out infinite; }
  /* まもりのたてバリア */
  @keyframes pl-shieldpop { 0%{ transform: scale(.3); opacity:0 } 30%{ transform: scale(1.2); opacity:1 } 70%{ transform: scale(1); opacity:.9 } 100%{ transform: scale(1.1); opacity:0 } }
  .shieldpop { animation: pl-shieldpop .8s ease forwards; }
  /* かいふくのキラキラ */
  @keyframes pl-healglow { 0%{ filter:none } 40%{ filter: drop-shadow(0 0 12px rgba(120,255,150,.95)) brightness(1.25) } 100%{ filter:none } }
  .healglow { animation: pl-healglow .9s ease; }
  /* ヒントメガネ: 選択肢がふっと消える（動きなし・opacityのみ） */
  .fadeopt { opacity: .12 !important; pointer-events: none; transition: opacity .5s ease; }
  /* ---- 予兆・進化演出（P6b）。かいしんの溜めと進化の溜めで共用（durationは style で上書き） ---- */
  /* 溜め: だんだん強く光る＋わずかに震えて構える（「何か来るぞ」の期待） */
  @keyframes pl-charge {
    0%{ filter: drop-shadow(0 0 2px rgba(255,230,120,.5)); transform: scale(1) }
    30%{ filter: drop-shadow(0 0 8px rgba(255,220,90,.8)); transform: scale(1.03) translateX(-2px) }
    55%{ filter: drop-shadow(0 0 14px rgba(255,190,60,.9)); transform: scale(1.05) translateX(2px) }
    80%{ filter: drop-shadow(0 0 20px rgba(255,160,40,.95)); transform: scale(1.08) translateX(-2px) }
    100%{ filter: drop-shadow(0 0 26px rgba(255,140,30,1)); transform: scale(1.1) }
  }
  .charge { animation: pl-charge .65s ease-in forwards; }
  /* 変身: 光の渦（回転する光の円盤） */
  @keyframes pl-spin { to { transform: rotate(360deg) } }
  .spinlight { animation: pl-spin 1s linear infinite; border-radius: 50%;
    background: conic-gradient(rgba(255,255,210,0) 0deg, rgba(255,250,180,.95) 70deg, rgba(255,255,210,0) 140deg,
      rgba(255,250,180,.75) 210deg, rgba(255,255,210,0) 280deg, rgba(255,250,180,.9) 350deg); }
  /* 変身中のシルエット: ゆらゆら形が変わっていく */
  @keyframes pl-morph { 0%{ transform: scale(.92) rotate(-6deg) } 50%{ transform: scale(1.08) rotate(6deg) } 100%{ transform: scale(.95) rotate(-4deg) } }
  .morph { animation: pl-morph .7s ease-in-out infinite alternate; }
  /* 登場: 「ドン」（大→バウンド→定位置・最初は白く光る） */
  @keyframes pl-slam {
    0%{ transform: scale(2.4); opacity: 0; filter: brightness(3) }
    40%{ transform: scale(.9); opacity: 1; filter: brightness(1.7) }
    65%{ transform: scale(1.14); filter: none }
    82%{ transform: scale(.97) }
    100%{ transform: scale(1) }
  }
  .slam { animation: pl-slam .75s cubic-bezier(.2,.8,.3,1.2) forwards; }
  /* 画面全体の白フラッシュ（登場の瞬間） */
  @keyframes pl-whiteflash { 0%{ opacity: .95 } 100%{ opacity: 0 } }
  .whiteflash { animation: pl-whiteflash .55s ease-out forwards; pointer-events: none; }
  /* 紙吹雪（ひらひら落ちる） */
  @keyframes pl-confetti {
    0%{ transform: translateY(-30px) rotate(0deg); opacity: 0 }
    12%{ opacity: 1 }
    100%{ transform: translateY(260px) rotate(560deg); opacity: 0 }
  }
  .confetti { animation: pl-confetti 1.9s ease-in forwards; display: inline-block; }
  /* ---- ワールドマップ フェーズ2（世界に命を吹き込む やさしい微演出） ---- */
  /* ポップアップ: 背景ふわっと＋パネルを軽くスケールイン（低学年向けに ゆっくり・派手すぎず） */
  @keyframes pl-fadein { from { opacity: 0 } to { opacity: 1 } }
  .fadein { animation: pl-fadein .2s ease; }
  @keyframes pl-softpop { 0% { transform: scale(.86); opacity: 0 } 100% { transform: scale(1); opacity: 1 } }
  .softpop { animation: pl-softpop .26s cubic-bezier(.2,.8,.3,1.1); }
  /* マップアイコンのふわふわ（生きている世界感）。数pxを ゆっくり・位相はインラインのdelay/durでばらす＝同位相で酔うのを防ぐ
     振れ幅は実機確認で -5px→-3px に縮小（2026-07-07・大きく感じるとのFB） */
  @keyframes pl-mapfloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
  .mapfloat { animation: pl-mapfloat 3s ease-in-out infinite; will-change: transform; }
  /* ---- そだったちから フェーズ2（育った瞬間の やさしい祝い・1-3と同じトーン） ---- */
  /* 植物が「にゅっ」と育つ（下から伸びる＝根が張る向き）。段階アップは強め版で上書き */
  @keyframes pl-growpop { 0% { transform: scale(.3) translateY(14px); opacity: 0 } 60% { transform: scale(1.12) translateY(-4px); opacity: 1 } 100% { transform: scale(1) translateY(0) } }
  .growpop { animation: pl-growpop .7s cubic-bezier(.2,.8,.3,1.2) both; transform-origin: bottom center; }
  .growpop.big { animation-duration: .95s; }
  /* キラキラ（そのばで ちいさく またたく・上へ舞わない＝優しい） */
  @keyframes pl-sparkle { 0%,100% { transform: scale(.5); opacity: 0 } 40% { transform: scale(1.15); opacity: 1 } }
  .sparkle { animation: pl-sparkle 1.1s ease-in-out infinite; }
  /* ---- おうちRPG部屋・おみせのタップ領域。
     旧: 四角い光る枠(roomhot)は「半透明の箱」に見えて世界観から浮くため廃止（実機FB 2026-07-07）。
     新: 透明のタップ領域(tapzone)＋RPG風の吹き出しラベル(bubble)を目印にする ---- */
  .tapzone { transition: transform .08s; }
  .tapzone:active { transform: translate(-50%,-50%) scale(.94) !important; }
  /* RPG看板調ラベル（UI改修①・2026-07-11／可読性FB・2026-07-12）: 温かい紙/木の色＋下向きの三角しっぽ。
     可読性の定石: 不透明で部屋より明るい地＋ドロップシャドウで分離＋文字の細い縁取り（太い縁は小字で潰れる）。
     おうち/お店の全ラベル共通 */
  .bubble {
    position: relative; display: inline-block; background: #FFF9EC;
    border: 2.5px solid #BA7517; border-radius: 9px; padding: 3px 11px;
    font-weight: 900; color: #59300A; white-space: nowrap;
    box-shadow: 0 2px 4px rgba(60,40,20,.35), inset 0 1px 0 rgba(255,255,255,.7);
    text-shadow: 0 1px 0 rgba(255,255,255,.6), 0 1px 2px rgba(0,0,0,.25);
  }
  .bubble::after { content: ""; position: absolute; left: 50%; bottom: -11px; transform: translateX(-50%);
    border: 6px solid transparent; border-top: 7px solid #BA7517; }
  .bubble::before { content: ""; position: absolute; left: 50%; bottom: -6px; transform: translateX(-50%);
    border: 5px solid transparent; border-top: 6px solid #FFF9EC; z-index: 1; }
  /* ラベル/ヒントの誘導＝うっすら優しい点滅（UI改修④・上下ふわふわから変更。キャラの揺れには使わない） */
  @keyframes pl-pulse { 0%,100% { opacity: 1 } 50% { opacity: .7 } }
  .pulse { animation: pl-pulse 2.6s ease-in-out infinite; }
  /* おえかき: キャンバス左・操作右の2カラム（狭い画面は縦積みフォールバック・メモ08 b3i） */
  .artgrid { display: grid; grid-template-columns: 1fr; gap: 12px; align-items: start; }
  @media (min-width: 700px) {
    .artgrid { grid-template-columns: 1fr 232px; }
  }
  /* バトル画面の外枠（実機FB第3便・b5a: Battle.jsx の inline style から移設。
     横画面で縦長の問題だと答えるときにバトルシーンが画面外に消える件の対策。
     ★向きの判定は CSS @media に任せる＝JSの matchMedia(b4b誤発火)/ResizeObserver(b4l不発火)は使わない */
  .battleWrap { max-width: 640px; margin: 0 auto; padding: 0 14px 30px; }
  /* マップ3画面の最大化（FB4便⑥・ワールドマップ/クイズのひろば/パズルのしま）。
     「横幅いっぱい。ただし画面の高さに収まる幅まで」＝地図(16:9)がスクロールなしで全体表示。
     %座標オーバーレイはコンテナ基準なので拡大してもズレない（既定の堅牢パターンのまま）。
     --mapReserve=地図以外のUIの高さぶん（画面別に指定・初期値・実機で微調整）。1100pxも初期値 */
  /* 面（画面）切替のフェードイン（FB5便②）。App.jsx の keyed ラッパーに適用＝keyが変わるたび新画面がふわっと出る。
     往復の暗転（前画面アウト→新画面イン）は両画面同時マウントが必要で重いため今回はフェードインのみ。.32s は初期値 */
  @keyframes pl-screenin { from { opacity: 0 } to { opacity: 1 } }
  .screenIn { animation: pl-screenin .32s ease; }
  /* おうちモーダルの拡大（FB5便③）。.mapMax と同型＝16:9の部屋画像が画面の高さに収まる幅まで。
     150px=モーダル余白＋ヘッダー行＋枠・1100px上限とも初期値 */
  .homePanel { width: min(96vw, calc((100vh - 150px) * 16 / 9)); max-width: 1100px; }
  @supports (height: 100dvh) {
    .homePanel { width: min(96vw, calc((100dvh - 150px) * 16 / 9)); }
  }
  /* お店の店内画像の拡大（FB5便④）。幅と高さの両方に収める（縦横比は画像naturalのまま保持）。
     270px=ヘッダー＋下部（あそびかた等）ぶん・初期値 */
  .shopImg { display: block; width: auto; height: auto; max-width: 100%; max-height: calc(100vh - 270px); }
  @supports (height: 100dvh) { .shopImg { max-height: calc(100dvh - 270px); } }
  .mapPage { max-width: min(96vw, 1100px); margin: 0 auto; }
  .mapMax  { width: min(100%, calc((100vh - var(--mapReserve, 240px)) * 16 / 9));
             margin-left: auto; margin-right: auto; }
  @supports (height: 100dvh) {
    .mapMax { width: min(100%, calc((100dvh - var(--mapReserve, 240px)) * 16 / 9)); }
  }
  /* 横画面かつ十分な幅のときだけ2カラム（左=バトルシーン sticky・右=もんだい）。縦画面は何も効かない＝現状のまま */
  @media (orientation: landscape) and (min-width: 820px) {
    .battleWrap  { max-width: 1120px; }
    .battleSplit { display: flex; align-items: flex-start; gap: 14px; }
    .battleSplit > .bsLeft  { flex: 0 0 54%; position: sticky; top: 8px; }
    .battleSplit > .bsRight { flex: 1 1 46%; min-width: 0; }
  }
  /* ===== バトル後・結果シーケンスv2（b4n）＝すべて新名 pl-seq*。既存keyframeは不変。
     世界観: あたたかい・やわらかい・急かさない（光/ふわっ/ころん。稲妻やシェイクは使わない）。
     進化の“ゆっくり暗転1.2s”はオーバーレイ背景のtransitionで実装（pl-seqDim相当） ===== */
  @keyframes pl-seqFloatUp { from{ transform: translateY(24px); opacity:0 } to{ transform: translateY(0); opacity:1 } }
  .seqFloatUp { animation: pl-seqFloatUp .45s ease-out both; }
  @keyframes pl-seqPunchUp { 0%{ transform: translateY(90px); opacity:0 } 70%{ transform: translateY(-8px); opacity:1 } 100%{ transform: translateY(0); opacity:1 } }
  .seqPunchUp { animation: pl-seqPunchUp .55s cubic-bezier(0.2,1.4,0.4,1) both; }
  @keyframes pl-seqTick { 0%{ opacity:0; transform: scale(1) } 40%{ opacity:1; transform: scale(1.15) } 100%{ opacity:1; transform: scale(1) } }
  .seqTick { animation: pl-seqTick .2s ease-out both; }
  @keyframes pl-seqGlowPulse { 0%,100%{ opacity:.45; filter: drop-shadow(0 0 6px rgba(255,255,255,.35)) } 50%{ opacity:.95; filter: drop-shadow(0 0 22px rgba(255,255,255,.9)) } }
  .seqGlowPulse { animation: pl-seqGlowPulse 1.2s ease-in-out 2; }
  @keyframes pl-seqBurst { 0%{ transform: scale(.3); opacity:.9 } 100%{ transform: scale(1.7); opacity:0 } }
  .seqBurst { animation: pl-seqBurst .42s ease-out both; }
  @keyframes pl-seqRiseIn { from{ transform: translateY(40px) scale(.8); opacity:0 } to{ transform: translateY(0) scale(1); opacity:1 } }
  .seqRiseIn { animation: pl-seqRiseIn .6s ease-out both; }
  @keyframes pl-seqDrift { 0%{ transform: translateY(-8px); opacity:0 } 25%{ opacity:.9 } 100%{ transform: translateY(64px); opacity:0 } }
  .seqDrift { animation: pl-seqDrift 2.8s ease-in-out infinite; }
  @keyframes pl-seqDropBounce { 0%{ transform: translateY(-120px); opacity:0 } 45%{ transform: translateY(0); opacity:1 } 62%{ transform: translateY(-26px) } 78%{ transform: translateY(0) } 88%{ transform: translateY(-10px) } 100%{ transform: translateY(0) } }
  .seqDropBounce { animation: pl-seqDropBounce .7s ease-in both; }
  @keyframes pl-seqWiggle { 0%,100%{ transform: rotate(0deg) } 25%{ transform: rotate(-6deg) } 75%{ transform: rotate(6deg) } }
  .seqWiggle { animation: pl-seqWiggle .28s ease-in-out 2; }
  @keyframes pl-seqPopJump { 0%{ transform: scale(0) translateY(0); opacity:0 } 55%{ transform: scale(1.1) translateY(0); opacity:1 } 75%{ transform: scale(1) translateY(-14px) } 100%{ transform: scale(1) translateY(0) } }
  .seqPopJump { animation: pl-seqPopJump .55s ease-out both; }
  @media (prefers-reduced-motion: reduce) {
    .pop,.shake,.bounce,.slide,.glow { animation: none; }
    .seqFloatUp,.seqPunchUp,.seqTick,.seqGlowPulse,.seqBurst,.seqRiseIn,.seqDrift,.seqDropBounce,.seqWiggle,.seqPopJump { animation: none; }
    .idle,.idle2,.lunge,.hitflash,.shake2,.hitfx,.critpop,.heartbreak,.fall,.victory,.droop,.riseup,.aura,.shieldpop,.healglow { animation: none; }
    .dmgfloat,.anticip { animation: none; }
    .charge,.spinlight,.morph,.slam,.whiteflash,.confetti { animation: none; }
    .fadein,.softpop,.mapfloat,.growpop,.sparkle,.pulse { animation: none; }
    .whiteflash { opacity: 0; }
    .pbtn { transition: none; }
  }
`;
