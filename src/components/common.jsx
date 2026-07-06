// 共通の小さな部品（v1から移植）
import { C } from "../theme.js";
import { puzzleStarsTotal } from "../data/badges.js";

export function Btn({ children, onClick, bg = C.sun, style = {}, className = "", disabled, big }) {
  return (
    <button className={"pbtn " + className} disabled={disabled}
      style={{ background: bg, padding: big ? "16px 26px" : "10px 16px", fontSize: big ? 22 : 16, ...style }}
      onClick={onClick}>{children}</button>
  );
}

export function StarRow({ n, size = 26 }) {
  return (
    <span style={{ fontSize: size, letterSpacing: 2 }}>
      {[1, 2, 3].map(i => <span key={i} style={{ opacity: i <= n ? 1 : 0.22 }}>⭐</span>)}
    </span>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="panel pop" style={{
      position: "fixed", top: 18, left: "50%", transform: "translateX(-50%)",
      zIndex: 90, padding: "12px 22px", background: C.sun, fontWeight: 900, fontSize: 18,
      display: "flex", alignItems: "center", gap: 10, maxWidth: "90vw",
    }}>
      <span style={{ fontSize: 30 }}>{toast.emoji}</span>
      <span>{toast.text}</span>
    </div>
  );
}

// 戻る導線は「◀ もどる」1つ＝1階層だけ戻る（メモ03で全画面統一。🏠ホーム等の二重ボタンは廃止）。
// onBack には「1つ前の画面」に戻す関数を渡す。プレイ中など画面内に自前の◀もどるがある場合は渡さない。
// onOpenHome を渡すと、名前パネル（相棒アバター＋名前）タップで おうちモーダルが開く（第2波 メモ01）。
export function Header({ save, onBack, onSound, title, onOpenHome }) {
  const stars = puzzleStarsTotal(save);
  // 名前パネル: onOpenHome があれば button（タップでおうち）、なければ従来の表示用 div
  const profileInner = (
    <>
      <span style={{ fontSize: 22 }}>{save.avatar}</span>
      <b>{save.name}</b>
      <span style={{ fontWeight: 900 }}>⭐{stars}</span>
      <span style={{ fontWeight: 900 }}>🪙{save.coins || 0}</span>
    </>
  );
  const panelStyle = { padding: "6px 14px", display: "flex", gap: 8, alignItems: "center", borderRadius: 999 };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", flexWrap: "wrap" }}>
      {onBack && <Btn bg={C.white} onClick={onBack} style={{ fontSize: 16 }}>◀ もどる</Btn>}
      {/* タイトルが空（マップ等）のときは minWidth を持たせない＝右側グループを押し出して折り返させない */}
      <div className="pl-display" style={{ fontSize: 20, fontWeight: 900, flex: 1, minWidth: title ? 120 : 0 }}>{title}</div>
      {/* 名前ピル＋音量は1グループ＝折り返すときも一緒に動く（音量だけ孤立して落ちない） */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {onOpenHome
          ? <button className="pbtn" onClick={onOpenHome} aria-label={`${save.name}の おうちを ひらく`}
              style={{ ...panelStyle, background: "#fff" }}>{profileInner}</button>
          : <div className="panel" style={panelStyle}>{profileInner}</div>}
        <Btn bg={C.white} onClick={onSound} aria-label="おとの おんおふ">{save.settings.sound ? "🔊" : "🔇"}</Btn>
      </div>
    </div>
  );
}
