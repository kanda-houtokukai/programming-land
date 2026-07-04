// おえかきコード（v1から移植）
import { useState, useRef } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { ART_COLORS, ART_CMDS, ART_CHALLENGES } from "../data/art.js";
import { SFX } from "../sound.js";
import { today } from "../storage.js";
import { XP, applyXp } from "../growth.js";
import turtleUrl from "../assets/turtle.png";

function turtleSegs(cmds) {
  let x = 160, y = 215, ang = -90, ci = 0;
  const segs = [];
  for (const t of cmds) {
    if (t === "fwd") {
      const nx = x + Math.cos(ang * Math.PI / 180) * 34;
      const ny = y + Math.sin(ang * Math.PI / 180) * 34;
      segs.push({ x1: x, y1: y, x2: nx, y2: ny, c: ART_COLORS[ci] });
      x = nx; y = ny;
    } else if (t === "right") ang += 90;
    else if (t === "left") ang -= 90;
    else if (t === "color") ci = (ci + 1) % ART_COLORS.length;
  }
  return { segs, x, y, ang };
}

function ArtSVG({ cmds, size = 320, reveal = Infinity, showTurtle = true }) {
  const { segs, x, y } = turtleSegs(cmds);
  const shown = segs.slice(0, reveal);
  const cur = shown.length ? shown[shown.length - 1] : null;
  const tx = reveal >= segs.length ? x : cur ? cur.x2 : 160;
  const ty = reveal >= segs.length ? y : cur ? cur.y2 : 215;
  return (
    <svg width={size} height={size} viewBox="0 0 320 320" style={{ display: "block", maxWidth: "100%" }}>
      <rect x="0" y="0" width="320" height="320" fill="#FFFFFF" rx="16" />
      {shown.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.c} strokeWidth="7" strokeLinecap="round" />
      ))}
      {showTurtle && <TurtleSprite cur={cur} tx={tx} ty={ty} />}
    </svg>
  );
}

/* カメ（右向きドット絵）。進む向きに合わせて 左右はミラー・上下は回転（指示書どおり簡易表現） */
function TurtleSprite({ cur, tx, ty }) {
  const deg = cur
    ? Math.round(Math.atan2(cur.y2 - cur.y1, cur.x2 - cur.x1) * 180 / Math.PI / 90) * 90
    : -90; // まだ描いていない=初期は うえむき
  const a = ((deg % 360) + 360) % 360; // 0=右 90=下 180=左 270=上
  const half = 18;
  let tf = "";
  if (a === 180) tf = `translate(${tx} ${ty}) scale(-1 1) translate(${-tx} ${-ty})`; // 左は反転で 逆さにしない
  else if (a !== 0) tf = `rotate(${a} ${tx} ${ty})`;
  return (
    <g transform={tf}>
      <image href={turtleUrl} x={tx - half} y={ty - half} width={half * 2} height={half * 2}
        style={{ imageRendering: "pixelated" }} />
    </g>
  );
}

export default function Art({ save, update, go, onSound }) {
  const sound = save.settings.sound;
  const [cmds, setCmds] = useState([]);
  const [reveal, setReveal] = useState(Infinity);
  const [playing, setPlaying] = useState(false);
  const [savedMsg, setSavedMsg] = useState(null);
  const playRef = useRef(0);
  const segsN = turtleSegs(cmds).segs.length;

  function add(t) {
    if (cmds.length >= 60) { setSavedMsg("めいれいが いっぱいだよ！"); return; }
    SFX.tap(sound); setSavedMsg(null);
    setCmds(c => [...c, t]); setReveal(Infinity);
  }
  function undo() { SFX.tap(sound); setCmds(c => c.slice(0, -1)); setReveal(Infinity); }
  function clearAll() { SFX.tap(sound); setCmds([]); setReveal(Infinity); setSavedMsg(null); }
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
  function saveArt() {
    if (segsN === 0) { setSavedMsg("まだ なにも かいて いないよ！✏️で かいてみよう"); return; }
    if (save.art.gallery.length >= 12) { setSavedMsg("びじゅつかんが いっぱい！ふるい さくひんを けしてから ほぞんしてね"); return; }
    SFX.badge(sound);
    update(s => {
      s.art.gallery.push({ id: Date.now(), date: today(), cmds: [...cmds], name: `さくひん ${s.art.gallery.length + 1}` });
      const d = today(); s.log[d] = s.log[d] || {}; s.log[d].art = (s.log[d].art || 0) + 1;
      applyXp(s, XP.artSave());
      return s;
    });
    setSavedMsg("🖼️ びじゅつかんに ほぞんしたよ！");
  }
  function delArt(id) {
    SFX.tap(sound);
    update(s => { s.art.gallery = s.art.gallery.filter(a => a.id !== id); return s; });
  }
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="🎨 おえかき コード" onHome={() => go("home")} onSound={onSound} />
      <div style={{ padding: "0 16px", display: "grid", gap: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 14 }}>めいれいを ならべて、カメさんに えを かかせよう！</div>
        <div className="panel" style={{ padding: 10, display: "flex", justifyContent: "center" }}>
          <ArtSVG cmds={cmds} reveal={reveal === Infinity ? segsN : reveal} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.entries(ART_CMDS).map(([t, d]) => (
            <Btn key={t} bg={t === "color" ? C.sakura : t === "fwd" ? C.leaf : C.sky} onClick={() => add(t)} style={{ fontSize: 15 }}>
              {d.emoji} {d.label}
            </Btn>
          ))}
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
          <Btn bg="#fff" onClick={clearAll} disabled={cmds.length === 0}>🧽 ぜんぶ けす</Btn>
          <Btn bg={C.sun} onClick={saveArt}>💾 ほぞんする</Btn>
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
    </div>
  );
}
