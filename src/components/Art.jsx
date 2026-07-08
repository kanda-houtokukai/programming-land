// おえかきコード（メモ08 b3i: レイアウト刷新＋キャンバス固定・2026-07-08）
// b3h の機能（ペン上下/45°/名前入力/全消し確認/上限100/保護者ガイド改訂）は維持。
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

const CMD_LIMIT = 100; // B3: 命令の上限

/* ② 固定キャンバス（自動フィット廃止・b3iで刷新）。
   横長4:3でパネル枠いっぱいに使う。数値は初期値＝実機で微調整:
   - CANVAS: viewBox の大きさ（4:3・端まで描ける）
   - START: 開始位置（中央やや下・上向きスタートの据わり）
   - WALL: カメが枠外に出ない内側マージン（カメの見た目ぶん） */
const CANVAS = { w: 480, h: 360 };
const START = { x: 240, y: 220 };
const WALL = 14;
const STEP = 34;

/* 前進の壁クランプ: 次位置が枠を超えるなら、進行方向を保ったまま ふちで止める
   （軸別クランプだと斜め45°の向きが変わるため、進める割合 t で縮める） */
function clampStep(x, y, nx, ny) {
  const lo = WALL, hiX = CANVAS.w - WALL, hiY = CANVAS.h - WALL;
  let t = 1;
  if (nx < lo) t = Math.min(t, (lo - x) / (nx - x));
  if (nx > hiX) t = Math.min(t, (hiX - x) / (nx - x));
  if (ny < lo) t = Math.min(t, (lo - y) / (ny - y));
  if (ny > hiY) t = Math.min(t, (hiY - y) / (ny - y));
  t = Math.max(0, t);
  return { x: x + (nx - x) * t, y: y + (ny - y) * t };
}

// 旧作品互換: 旧ID（fwd/right/left/color）の挙動は不変。新IDは追加のみ。
function turtleSegs(cmds) {
  let x = START.x, y = START.y, ang = -90, ci = 0, pen = true; // ペンは初期=下（B1）
  const segs = [];
  for (const t of cmds) {
    if (t === "fwd") {
      const rawX = x + Math.cos(ang * Math.PI / 180) * STEP;
      const rawY = y + Math.sin(ang * Math.PI / 180) * STEP;
      const p = clampStep(x, y, rawX, rawY); // ② ふちで止まる＝カメは常に画面内
      if (pen && (p.x !== x || p.y !== y)) segs.push({ x1: x, y1: y, x2: p.x, y2: p.y, c: ART_COLORS[ci] });
      x = p.x; y = p.y;
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

/* ③ 命令リストの圧縮表示: 連続する同じ命令を ×N にまとめる（表示のみ・データ不変） */
function compressCmds(cmds) {
  const out = [];
  for (const t of cmds) {
    const last = out[out.length - 1];
    if (last && last.t === t) last.n++;
    else out.push({ t, n: 1 });
  }
  return out;
}

function ArtSVG({ cmds, width = "100%", reveal = Infinity, showTurtle = true }) {
  const { segs, x, y, ang } = turtleSegs(cmds);
  const shown = segs.slice(0, reveal);
  const cur = shown.length ? shown[shown.length - 1] : null;
  const done = reveal >= segs.length;
  const tx = done ? x : cur ? cur.x2 : START.x;
  const ty = done ? y : cur ? cur.y2 : START.y;
  // カメの向き: 完成形は実ang（ペン上げ移動でも向きが合う）・再生中は直前の線分の向き（45°刻み）
  const deg = done ? ang : cur ? Math.round(Math.atan2(cur.y2 - cur.y1, cur.x2 - cur.x1) * 180 / Math.PI / 45) * 45 : -90;
  return (
    <svg width={width} viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} style={{ display: "block", maxWidth: "100%", height: "auto" }}>
      <rect x="0" y="0" width={CANVAS.w} height={CANVAS.h} fill="#FFFFFF" rx="14" />
      {shown.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.c} strokeWidth="7" strokeLinecap="round" />
      ))}
      {showTurtle && <TurtleSprite deg={deg} tx={tx} ty={ty} />}
    </svg>
  );
}

/* カメ（右向きドット絵・固定サイズ）。45°刻みの向きに対応:
   左半分(135/180/225)はミラー＋差分回転で逆さにしない。見え方は実機FBで微調整 */
function TurtleSprite({ deg, tx, ty }) {
  const a = ((Math.round(deg / 45) * 45) % 360 + 360) % 360; // 0=右 90=下 180=左 270=上
  const half = 18;
  let tf = "";
  if (a === 135 || a === 180 || a === 225) {
    tf = `translate(${tx} ${ty}) rotate(${a - 180}) scale(-1 1) translate(${-tx} ${-ty})`;
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

/* ① 右カラムの命令ボタン（ゲームパッド風・コンパクト: アイコン＋小ラベル） */
function PadBtn({ t, onAdd, big = false, bg = "#fff" }) {
  const d = ART_CMDS[t];
  return (
    <button className="pbtn" onClick={() => onAdd(t)}
      style={{ background: bg, padding: big ? "8px 4px" : "6px 2px", display: "grid", justifyItems: "center", gap: 1, minWidth: 0 }}>
      <span style={{ fontSize: big ? 22 : 17, lineHeight: 1 }}>{d.emoji}</span>
      <span style={{ fontSize: 9, fontWeight: 900 }}>{d.label}</span>
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
  const [naming, setNaming] = useState(null);              // A4
  const [palette, setPalette] = useState(false);           // 色ポップアップ
  const playRef = useRef(0);
  const state = turtleSegs(cmds);
  const segsN = state.segs.length;

  function add(t) {
    if (cmds.length >= CMD_LIMIT) { setSavedMsg("めいれいが いっぱいだよ！"); return; }
    SFX.tap(sound); setSavedMsg(null);
    // 上限ガードは関数型更新の内側にも（連打時のstale closureで100を超えない）
    setCmds(c => (c.length >= CMD_LIMIT ? c : [...c, t])); setReveal(Infinity);
  }
  // 色パレット: いまの色から目的の色まで🎨を必要数つむ（コマンド列の考え方は不変）
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
    const finalName = (name || "").trim() || fallback;
    SFX.badge(sound);
    update(s => {
      const d = today();
      s.art.gallery.push({ id: Date.now(), date: d, cmds: [...cmds], name: finalName });
      s.log[d] = s.log[d] || {}; s.log[d].art = (s.log[d].art || 0) + 1;
      awardArtCoins(s, d);
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
  const packed = compressCmds(cmds);
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="🎨 おえかき コード" onBack={() => go("home")} onSound={onSound} onOpenHome={openHome} />
      <div style={{ padding: "0 16px", display: "grid", gap: 14 }}>
        <HowTo id="art" />
        {/* ① キャンバス左・操作右（狭い画面は縦積み＝theme.js .artgrid） */}
        <div className="artgrid">
          {/* 左: キャンバス（パネル枠いっぱい・固定4:3） */}
          <div className="panel" style={{ padding: 8 }}>
            <ArtSVG cmds={cmds} reveal={reveal === Infinity ? segsN : reveal} />
          </div>
          {/* 右: 操作カラム */}
          <div style={{ display: "grid", gap: 8 }}>
            {/* 1. 方向パッド: すすむ＋2×2（45/90） */}
            <div className="panel" style={{ padding: 8, display: "grid", gap: 6 }}>
              <PadBtn t="fwd" onAdd={add} big bg={C.leaf} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <PadBtn t="left45" onAdd={add} bg="#EAF4FF" />
                <PadBtn t="right45" onAdd={add} bg="#EAF4FF" />
                <PadBtn t="left" onAdd={add} bg={C.sky} />
                <PadBtn t="right" onAdd={add} bg={C.sky} />
              </div>
              {/* 2. ペン＋いろ */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <button className="pbtn" onClick={() => add(state.pen ? "penup" : "pendown")}
                  style={{ background: "#fff", padding: "6px 4px", fontSize: 11, fontWeight: 900 }}>
                  {state.pen ? "🖐️ ペンを あげる" : "✍️ ペンを おろす"}
                </button>
                <button className="pbtn" onClick={() => { SFX.tap(sound); setPalette(p => !p); }}
                  style={{ background: "#fff", padding: "6px 4px", fontSize: 11, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                  🎨 いろ
                  <span style={{ width: 15, height: 15, borderRadius: "50%", background: ART_COLORS[state.ci], border: `2px solid ${C.ink}`, display: "inline-block" }} />
                </button>
              </div>
              {palette && (
                <div className="panel slide" style={{ padding: 6, display: "flex", gap: 5, justifyContent: "center", background: "#FFFDF4" }}>
                  {ART_COLORS.map((col, k) => (
                    <button key={col} className="pbtn" onClick={() => pickColor(k)} aria-label={`いろ ${k + 1}`}
                      style={{ width: 26, height: 26, borderRadius: "50%", background: col, padding: 0, border: `3px solid ${k === state.ci ? C.ink : "#fff"}` }} />
                  ))}
                </div>
              )}
            </div>
            {/* 3. 命令リスト（③ 連続する同じ命令は ×N に圧縮・表示のみ） */}
            <div className="panel" style={{ padding: 8 }}>
              <div style={{ fontWeight: 900, fontSize: 12, marginBottom: 4 }}>📜 めいれい（{cmds.length}こ）</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", minHeight: 22, maxHeight: 96, overflowY: "auto", alignContent: "flex-start" }}>
                {cmds.length === 0 && <span style={{ fontWeight: 700, opacity: .5, fontSize: 12 }}>ここに ならぶよ</span>}
                {packed.map((p, i) => (
                  <span key={i} style={{ fontSize: 15, fontWeight: 900, background: "#F7FBFF", border: `1.5px solid ${C.ink}`, borderRadius: 8, padding: "1px 5px", whiteSpace: "nowrap" }}>
                    {ART_CMDS[p.t].emoji}{p.n > 1 && <span style={{ fontSize: 11 }}> ×{p.n}</span>}
                  </span>
                ))}
              </div>
            </div>
            {/* 4. 操作アイコン（小さく横並び） */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
              <button className="pbtn" onClick={replay} disabled={playing}
                style={{ background: C.leaf, padding: "7px 2px", display: "grid", justifyItems: "center", gap: 1 }}>
                <span style={{ fontSize: 16, lineHeight: 1 }}>▶️</span><span style={{ fontSize: 9, fontWeight: 900 }}>さいせい</span>
              </button>
              <button className="pbtn" onClick={undo} disabled={cmds.length === 0}
                style={{ background: "#fff", padding: "7px 2px", display: "grid", justifyItems: "center", gap: 1 }}>
                <span style={{ fontSize: 16, lineHeight: 1 }}>↩️</span><span style={{ fontSize: 9, fontWeight: 900 }}>もどす</span>
              </button>
              <button className="pbtn" onClick={() => { SFX.tap(sound); setConfirmClear(true); }} disabled={cmds.length === 0}
                style={{ background: "#fff", padding: "7px 2px", display: "grid", justifyItems: "center", gap: 1 }}>
                <span style={{ fontSize: 16, lineHeight: 1 }}>🧽</span><span style={{ fontSize: 9, fontWeight: 900 }}>けす</span>
              </button>
              <button className="pbtn" onClick={askSave}
                style={{ background: C.sun, padding: "7px 2px", display: "grid", justifyItems: "center", gap: 1 }}>
                <span style={{ fontSize: 16, lineHeight: 1 }}>💾</span><span style={{ fontSize: 9, fontWeight: 900 }}>ほぞん</span>
              </button>
            </div>
            {savedMsg && <div className="panel slide" style={{ padding: 8, background: "#FFFBE0", fontWeight: 800, fontSize: 12 }}>{savedMsg}</div>}
          </div>
        </div>
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
                  <ArtSVG cmds={a.cmds} showTurtle={false} />
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
