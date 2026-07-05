// 色・アバター・共通CSS（v1から移植）
export const AVATARS = ["🐻", "🐰", "🦊", "🐼", "🐸", "🦄"];

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
    0%{ transform: translate(0,0) } 45%{ transform: translate(var(--dx), var(--dy)) scale(1.06) }
    60%{ transform: translate(var(--dx), var(--dy)) scale(1.06) } 100%{ transform: translate(0,0) }
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
  @media (prefers-reduced-motion: reduce) {
    .pop,.shake,.bounce,.slide,.glow { animation: none; }
    .idle,.idle2,.lunge,.hitflash,.shake2,.hitfx,.critpop,.heartbreak,.fall,.victory,.droop,.riseup,.aura,.shieldpop,.healglow { animation: none; }
    .pbtn { transition: none; }
  }
`;
