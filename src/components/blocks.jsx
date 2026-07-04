// 積み木ブロック風の見た目（パレットと命令枠で共通）。Scratch風の凸ジョイント＋立体感
import { C } from "../theme.js";
import { BLOCK_DEFS } from "../data/blocks.js";

// ブロック上部の凸（つながる ジョイント）
function Nub({ color }) {
  return (
    <span aria-hidden style={{
      position: "absolute", top: -6, left: 13, width: 15, height: 7,
      background: color, borderLeft: `3px solid ${C.ink}`, borderRight: `3px solid ${C.ink}`,
      borderTop: `3px solid ${C.ink}`, borderRadius: "5px 5px 0 0",
    }} />
  );
}

// 基本ブロックの箱スタイル
function brickStyle(color, { active } = {}) {
  return {
    position: "relative", display: "inline-flex", alignItems: "center", gap: 5,
    background: color, border: `3px solid ${C.ink}`, borderRadius: 10,
    boxShadow: "2px 3px 0 rgba(58,51,53,.85)",
    padding: "9px 12px", fontWeight: 800, fontSize: 15, color: C.ink,
    fontFamily: "inherit", cursor: "pointer",
    outline: active ? `4px solid ${C.sakura}` : "none", outlineOffset: 2,
  };
}

// パレット用（タップで つむ）。末尾に ＋
export function PaletteBlock({ type, disabled, onClick, highlight }) {
  const d = BLOCK_DEFS[type];
  const repeat = type === "repeat";
  return (
    <button type="button" disabled={disabled} onClick={onClick}
      className={highlight && !disabled ? "glow" : ""}
      style={{ ...brickStyle(d.color), opacity: disabled ? 0.4 : 1, cursor: disabled ? "not-allowed" : "pointer",
        position: "relative" }}>
      {/* 救済中に「つぎに おく ブロック」を光らせて教える（第2層の視覚化） */}
      {highlight && !disabled && (
        <span style={{ position: "absolute", top: -10, right: -6, fontSize: 11, fontWeight: 900,
          background: "#FFE066", border: "2px solid #3A3335", borderRadius: 999, padding: "0 6px" }}>つぎ</span>
      )}
      <Nub color={d.color} />
      <span style={{ fontSize: repeat ? 17 : 15 }}>{d.emoji}</span>
      <span>{d.label}</span>
      <span style={{ opacity: .55, fontSize: 13, fontWeight: 900 }}>＋</span>
    </button>
  );
}

// 命令枠に積まれた基本ブロック（タップで けす）
function PrimBlock({ b, active, onRemove }) {
  const d = BLOCK_DEFS[b.type];
  return (
    <button type="button" onClick={() => onRemove(b.uid)} style={brickStyle(d.color, { active })}>
      <Nub color={d.color} />
      <span>{d.emoji}</span>
      <span>{d.label}</span>
      <span style={{ opacity: .5, fontSize: 12 }}>✖</span>
    </button>
  );
}

// くりかえしブロック（囲む形＝Scratchのcontrolブロック風。中に他ブロックが入る）
function RepeatBlock({ b, activeUid, onRemove, onSelect, openRepeat, onCount }) {
  const active = activeUid === b.uid;
  const open = openRepeat === b.uid;
  const color = BLOCK_DEFS.repeat.color;
  return (
    <div style={{
      position: "relative", display: "inline-block", background: color,
      border: `3px solid ${C.ink}`, borderRadius: 12, boxShadow: "2px 3px 0 rgba(58,51,53,.85)",
      padding: 6, maxWidth: "100%",
      outline: active ? `4px solid ${C.sakura}` : "none", outlineOffset: 2,
    }}>
      <Nub color={color} />
      {/* うえのバー: 🔁 と かいすう */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "2px 4px 6px", flexWrap: "wrap" }}>
        <span style={{ fontWeight: 900, fontSize: 15 }}>🔁 くりかえし</span>
        <button type="button" onClick={() => onCount(b.uid, -1)}
          style={{ ...miniBtn }}>−</button>
        <b style={{ fontSize: 17 }}>{b.count}かい</b>
        <button type="button" onClick={() => onCount(b.uid, 1)}
          style={{ ...miniBtn }}>＋</button>
        <button type="button" aria-label="けす" onClick={() => onRemove(b.uid)}
          style={{ ...miniBtn, background: "#FFB3B3", marginLeft: 2 }}>✖</button>
      </div>
      {/* なかに いれる スペース（左に いろの せぼね＝囲んでいる のが わかる） */}
      <div onClick={() => onSelect(b.uid)}
        style={{
          display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center",
          background: open ? "#FFF6D8" : "#FFFDF3", borderRadius: "4px 10px 10px 4px",
          borderLeft: `7px solid ${color}`, border: `2px dashed rgba(58,51,53,.35)`,
          borderLeftWidth: 7, borderLeftStyle: "solid", borderLeftColor: color,
          padding: "8px 10px", minHeight: 30, minWidth: 90, cursor: "pointer",
          outline: open ? `3px solid ${C.sakura}` : "none",
        }}>
        {b.children.map(c => (
          <BlockChip key={c.uid} b={c} activeUid={activeUid} onRemove={onRemove}
            onSelect={onSelect} openRepeat={openRepeat} onCount={onCount} />
        ))}
        {b.children.length === 0 && (
          <span style={{ fontSize: 12, fontWeight: 800, opacity: .6 }}>{open ? "ここに いれてね ▼" : "タップして ブロックを いれる"}</span>
        )}
      </div>
    </div>
  );
}

const miniBtn = {
  border: `2px solid ${C.ink}`, borderRadius: 8, background: "#fff",
  fontWeight: 900, fontSize: 14, padding: "1px 8px", cursor: "pointer", fontFamily: "inherit",
};

export function BlockChip({ b, activeUid, onRemove, onSelect, openRepeat, onCount }) {
  if (b.type === "repeat") {
    return <RepeatBlock b={b} activeUid={activeUid} onRemove={onRemove} onSelect={onSelect} openRepeat={openRepeat} onCount={onCount} />;
  }
  return <PrimBlock b={b} active={activeUid === b.uid} onRemove={onRemove} />;
}
