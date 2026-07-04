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

// Googleフォントはオンライン時のみ読み込まれ、オフライン時はOS内蔵の丸ゴシックにフォールバックする
export const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;900&family=Hachi+Maru+Pop&display=swap');
  .pl-root {
    font-family: 'M PLUS Rounded 1c','Hiragino Maru Gothic ProN','Yu Gothic',sans-serif;
    background:
      radial-gradient(circle at 15% 10%, #FFECC7 0 120px, transparent 130px),
      radial-gradient(circle at 85% 85%, #DFF3FF 0 160px, transparent 170px),
      ${C.bg};
    min-height: 100vh; color: ${C.ink};
    -webkit-user-select: none; user-select: none;
  }
  .pl-display { font-family: 'Hachi Maru Pop','M PLUS Rounded 1c',sans-serif; }
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
  @media (prefers-reduced-motion: reduce) {
    .pop,.shake,.bounce,.slide { animation: none; }
    .pbtn { transition: none; }
  }
`;
