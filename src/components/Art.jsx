// おえかきコード（v1から移植・メモ08で大改善: 自動フィット/ペン上下/45°/UIコンパクト・2026-07-08）
import { useState, useRef } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { ART_COLORS, ART_CMDS, ART_CHALLENGES } from "../data/art.js";
import { SFX } from "../sound.js";
import { today } from "../storage.js";
import { XP, applyXp, awardArtCoins } from "../growth.js";
import turtleUrl from "../assets/turtle.png";
import HowTo from "./HowTo.jsx";
import ParentGuide from "./ParentGuide.jsx";
import { ART_GUIDE } from "../data/parent-guide.js";

const CMD_LIMIT = 100; // B3: 60→100（自動フィットで大きい絵も収まる）

// 旧作品互換: 旧ID（fwd/right/left/color）の挙動は不変。新IDは追加のみ。
function turtleSegs(cmds) {
  let x = 160, y = 215, ang = -90, ci = 0, pen = true; // ペンは初期=下（B1）
  const segs = [];
  for (const t of cmds) {
    if (t === "fwd") {
      const nx = x + Math.cos(ang * Math.PI / 180) * 34;
      const ny = y + Math.sin(ang * Math.PI / 180) * 34;
      if (pen) segs.push({ x1: x, y1: y, x2: nx, y2: ny, c: ART_COLORS[ci] });
      x = nx; y = ny;
    } else if (t === "right") ang += 90;
    else if (t === "left") ang -= 90;
    else if (t === "right45") ang += 45;
    else if (t === "left45") ang -= 45;
    else if (t === "penup") pen = false;
    else if (t === "pendown") pen = true;
    else if (t === "color") ci = (ci + 1) % ART_COLORS.length;
  }
  return { segs, x, y, ang, ci, pen };
}

/* A1: 全線分＋カメ現在地のバウンディングボックス → 正方形viewBox（余白20・最小320で拡大しすぎない）。
   常に「完成形」の cmds から計算するため、再生中（reveal変化）も viewBox は安定 */
function fitBox(segs, x, y) {
  let minX = x, maxX = x, minY = y, maxY = y;
  for (const s of segs) {
    minX = Math.min(minX, s.x1, s.x2); maxX = Math.max(maxX, s.x1, s.x2);
    minY = Math.min(minY, s.y1, s.y2); maxY = Math.max(maxY, s.y1, s.y2);
  }
  const pad = 20;
  minX -= pad; maxX += pad; minY -= pad; maxY += pad;
  const size = Math.max(320, maxX - minX, maxY - minY);
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  return { x: cx - size / 2, y: cy - size / 2, size };
}

function ArtSVG({ cmds, size = 320, reveal = Infinity, showTurtle = true }) {
  const { segs, x, y, ang } = turtleSegs(cmds);
  const box = fitBox(segs, x, y); // ギャラリー小表示（showTurtle=false）も同じフィット
  const shown = segs.slice(0, reveal);
  const cur = shown.length ? shown[shown.length - 1] : null;
  const done = reveal >= segs.length;
  const tx = done ? x : cur ? cur.x2 : 160;
  const ty = done ? y : cur ? cur.y2 : 215;
  // カメの向き: 完成形は実ang（ペン上げ移動でも向きが合う）・再生中は直前の線分の向き（45°刻み）
  const deg = done ? ang : cur ? Math.round(Math.atan2(cur.y2 - cur.y1, cur.x2 - cur.x1) * 180 / Math.PI / 45) * 45 : -90;
  return (
    <svg width={size} height={size} viewBox={`${box.x} ${box.y} ${box.size} ${box.size}`} style={{ display: "block", maxWidth: "100%" }}>
      <rect x={box.x} y={box.y} width={box.size} height={box.size} fill="#FFFFFF" rx={box.size * 0.05} />
      {shown.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.c} strokeWidth="7" strokeLinecap="round" />
      ))}
      {showTurtle && <TurtleSprite deg={deg} tx={tx} ty={ty} />}
    </svg>
  );
}

/* カメ（右向きドット絵）。45°刻みの向きに対応（C）:
   右半分(0/45/315)と真上下(90/270)は回転、左半分(135/180/225)はミラー＋回転で逆さにしない。
   見え方が不自然なら実機FBで微調整 */
function TurtleSprite({ deg, tx, ty }) {
  const a = ((Math.round(deg / 45) * 45) % 360 + 360) % 360; // 0=右 90=下 180=左 270=上
  const half = 18;
  let tf = "";
  if (a === 135 || a === 180 || a === 225) {
    tf = `translate(${tx} ${ty}) rotate(${a - 180}) scale(-1 1) translate(${-tx} ${-ty})`; // 左向きは反転で 逆さにしない
  } else if (a !== 0) {
    tf = `rotate(${a} ${tx} ${ty})`;
  }
  return (
    <g transform={tf}>
      <image href={turtleUrl} x={tx - half} y={ty - half} width={half * 2} height={half * 2}
        style={{ imageRendering: "pixelated" }} />
    </g>
  );
}

/* E: コンパクトな命令ボタン（アイコン主体＋小さな文字ラベル） */
function CmdBtn({ t, onAdd, big = false, bg = "#fff" }) {
  const d = ART_CMDS[t];
  return (
    <button className="pbtn" onClick={() => onAdd(t)}
      style={{ background: bg, padding: big ? "10px 6px" : "8px 4px", display: "grid", justifyItems: "center", gap: 2, minWidth: 0 }}>
      <span style={{ fontSize: big ? 26 : 20, lineHeight: 1 }}>{d.emoji}</span>
      <span style={{ fontSize: 10, fontWeight: 900 }}>{d.label}</span>
    </button>
  );
}

export default function Art({ save, update, go, onSound, openHome }) {
  const sound = save.settings.sound;
  const [cmds, setCmds] = useState([]);
  const [reveal, setReveal] = useState(Infinity);
  const [playing, setPlaying] = useState(false);
  const [savedMsg, setSavedMsg] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false); // A3
  const [naming, setNaming] = useState(null);              // A4: null | 入力中の名前
  const [palette, setPalette] = useState(false);           // E: 色ポップアップ
  const playRef = useRef(0);
  const state = turtleSegs(cmds);
  const segsN = state.segs.length;

  function add(t) {
    if (cmds.length >= CMD_LIMIT) { setSavedMsg("めいれいが いっぱいだよ！"); return; }
    SFX.tap(sound); setSavedMsg(null);
    // 上限ガードは関数型更新の内側にも（連打時のstale closureで100を超えない）
    setCmds(c => (c.length >= CMD_LIMIT ? c : [...c, t])); setReveal(Infinity);
  }
  // E/A2: パレットで色を選ぶ＝いまの色から目的の色まで🎨を必要数つむ（コマンド列の考え方は不変）
  function pickColor(k) {
    const n = (k - state.ci + ART_COLORS.length) % ART_COLORS.length;
    setPalette(false);
    if (n === 0) return;
    if (cmds.length + n > CMD_LIMIT) { setSavedMsg("めいれいが いっぱいだよ！"); return; }
    SFX.tap(sound); setSavedMsg(null);
    setCmds(c => (c.length + n > CMD_LIMIT ? c : [...c, ...Array(n).fill("color")])); setReveal(Infinity);
  }
  function undo() { SFX.tap(sound); setCmds(c => c.slice(0, -1)); setReveal(Infinity); }
  function clearAll() { SFX.tap(sound); setCmds([]); setReveal(Infinity); setSavedMsg(null); setConfirmClear(false); }
  async function replay() {
    if (playing || segsN === 0) return;
    const my = ++playRef.current;
    setPlaying(true);
    for (let k = 0; k <= segsN; k++) {
      if (playRef.current !== my) return;
      setReveal(k); SFX.step(sound);
      await new Promise(r => setTimeout(r, 240));
    }
    setPlaying(false); SFX.win(sound);
  }
  function askSave() { // A4: 保存前に名前入力
    if (segsN === 0) { setSavedMsg("まだ なにも かいて いないよ！✏️で かいてみよう"); return; }
    if (save.art.gallery.length >= 12) { setSavedMsg("びじゅつかんが いっぱい！ふるい さくひんを けしてから ほぞんしてね"); return; }
    SFX.tap(sound);
    setNaming(`さくひん ${save.art.gallery.length + 1}`);
  }
  function saveArt(name) {
    const fallback = `さくひん ${save.art.gallery.length + 1}`;
    const finalName = (name || "").trim() || fallback; // 空なら初期値（スキーマ不変）
    SFX.badge(sound);
    update(s => {
      const d = today();
      s.art.gallery.push({ id: Date.now(), date: d, cmds: [...cmds], name: finalName });
      s.log[d] = s.log[d] || {}; s.log[d].art = (s.log[d].art || 0) + 1;
      awardArtCoins(s, d); // 1日の上限内でコイン付与
      applyXp(s, XP.artSave());
      return s;
    });
    setNaming(null);
    setSavedMsg("🖼️ びじゅつかんに ほぞんしたよ！");
  }
  function delArt(id) {
    SFX.tap(sound);
    update(s => { s.art.gallery = s.art.gallery.filter(a => a.id !== id); return s; });
  }
  const modalBg = { position: "fixed", inset: 0, background: "rgba(60,50,40,.45)", display: "grid", placeItems: "center", zIndex: 60 };
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="🎨 おえかき コード" onBack={() => go("home")} onSound={onSound} onOpenHome={openHome} />
      <div style={{ padding: "0 16px", display: "grid", gap: 14 }}>
        <HowTo id="art" />
        <div className="panel" style={{ padding: 10, display: "flex", justifyContent: "center" }}>
          <ArtSVG cmds={cmds} reveal={reveal === Infinity ? segsN : reveal} />
        </div>
        {/* E: 十字キー風の命令パッド（すすむ中央・45/90が左右）＋ペン・いろ */}
        <div className="panel" style={{ padding: 10, display: "grid", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.3fr 1fr 1fr", gap: 6 }}>
            <CmdBtn t="left" onAdd={add} bg={C.sky} />
            <CmdBtn t="left45" onAdd={add} bg="#EAF4FF" />
            <CmdBtn t="fwd" onAdd={add} big bg={C.leaf} />
            <CmdBtn t="right45" onAdd={add} bg="#EAF4FF" />
            <CmdBtn t="right" onAdd={add} bg={C.sky} />
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {/* B1: ペンは現在の状態に合わせて「あげる/おろす」を出し分け（押すと該当めいれいが つまれる） */}
            <button className="pbtn" onClick={() => add(state.pen ? "penup" : "pendown")}
              style={{ background: "#fff", padding: "8px 14px", fontSize: 13, fontWeight: 900 }}>
              {state.pen ? "🖐️ ペンを あげる" : "✍️ ペンを おろす"}
            </button>
            {/* A2/E: いまの色スウォッチ＝タップでパレット */}
            <button className="pbtn" onClick={() => { SFX.tap(sound); setPalette(p => !p); }}
              style={{ background: "#fff", padding: "8px 14px", fontSize: 13, fontWeight: 900, display: "flex", alignItems: "center", gap: 6 }}>
              🎨 いろ
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: ART_COLORS[state.ci], border: `2px solid ${C.ink}`, display: "inline-block" }} />
            </button>
          </div>
          {palette && (
            <div className="panel slide" style={{ padding: 8, display: "flex", gap: 8, justifyContent: "center", background: "#FFFDF4" }}>
              {ART_COLORS.map((col, k) => (
                <button key={col} className="pbtn" onClick={() => pickColor(k)} aria-label={`いろ ${k + 1}`}
                  style={{ width: 34, height: 34, borderRadius: "50%", background: col, padding: 0, border: `3px solid ${k === state.ci ? C.ink : "#fff"}` }} />
              ))}
            </div>
          )}
        </div>
        <div className="panel" style={{ padding: 10 }}>
          <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 6 }}>📜 めいれい（{cmds.length}こ）</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", minHeight: 26 }}>
            {cmds.length === 0 && <span style={{ fontWeight: 700, opacity: .5 }}>ここに めいれいが ならぶよ</span>}
            {cmds.map((t, i) => <span key={i} style={{ fontSize: 20 }}>{ART_CMDS[t].emoji}</span>)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Btn big bg={C.leaf} onClick={replay} disabled={playing}>▶️ さいせい</Btn>
          <Btn bg="#fff" onClick={undo} disabled={cmds.length === 0}>↩️ ひとつ もどす</Btn>
          <Btn bg="#fff" onClick={() => { SFX.tap(sound); setConfirmClear(true); }} disabled={cmds.length === 0}>🧽 ぜんぶ けす</Btn>
          <Btn bg={C.sun} onClick={askSave}>💾 ほぞんする</Btn>
        </div>
        {savedMsg && <div className="panel slide" style={{ padding: 12, background: "#FFFBE0", fontWeight: 800 }}>{savedMsg}</div>}
        <div className="panel" style={{ padding: 14 }}>
          <div className="pl-display" style={{ fontSize: 18, marginBottom: 8 }}>🎯 ちょうせん してみよう</div>
          <div style={{ display: "grid", gap: 8 }}>
            {ART_CHALLENGES.map(c => (
              <div key={c.name} style={{ fontWeight: 800, fontSize: 14, background: "#F7FBFF", border: `2px solid ${C.ink}`, borderRadius: 12, padding: 10 }}>
                {c.emoji} <b>{c.name}</b>：{c.hint}
              </div>
            ))}
          </div>
        </div>
        {/* おうちの方へ（モーダル）。開閉しても かきかけの作品は消えない */}
        <ParentGuide guide={ART_GUIDE} />
        {save.art.gallery.length > 0 && (
          <div className="panel" style={{ padding: 14 }}>
            <div className="pl-display" style={{ fontSize: 18, marginBottom: 8 }}>🖼️ わたしの びじゅつかん</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 10 }}>
              {save.art.gallery.map(a => (
                <div key={a.id} className="panel" style={{ padding: 8, borderRadius: 14, textAlign: "center" }}>
                  <ArtSVG cmds={a.cmds} size={110} showTurtle={false} />
                  <div style={{ fontWeight: 900, fontSize: 12 }}>{a.name}</div>
                  <div style={{ fontSize: 10, fontWeight: 700 }}>{a.date}</div>
                  <button className="pbtn" style={{ padding: "2px 8px", background: "#FFB3B3", fontSize: 11, marginTop: 4 }}
                    onClick={() => delArt(a.id)}>✖ けす</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* A3: 全消し確認モーダル */}
      {confirmClear && (
        <div style={modalBg} onClick={() => setConfirmClear(false)}>
          <div className="panel slide" style={{ padding: 18, maxWidth: 280, textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 12 }}>🧽 ぜんぶ けす？</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <Btn bg="#FFB3B3" onClick={clearAll}>はい、けす</Btn>
              <Btn bg="#fff" onClick={() => setConfirmClear(false)}>やめる</Btn>
            </div>
          </div>
        </div>
      )}
      {/* A4: 保存の名前入力モーダル（空なら初期値のまま） */}
      {naming !== null && (
        <div style={modalBg} onClick={() => setNaming(null)}>
          <div className="panel slide" style={{ padding: 18, maxWidth: 320, width: "88%" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 10, textAlign: "center" }}>💾 さくひんの なまえ</div>
            <input value={naming} onChange={e => setNaming(e.target.value)} maxLength={12}
              style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", fontSize: 16, fontWeight: 800, border: `3px solid ${C.ink}`, borderRadius: 12, marginBottom: 12, fontFamily: "inherit" }} />
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <Btn bg={C.sun} onClick={() => saveArt(naming)}>ほぞんする</Btn>
              <Btn bg="#fff" onClick={() => setNaming(null)}>やめる</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
