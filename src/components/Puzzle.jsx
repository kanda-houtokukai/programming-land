// ロボットパズル（v1から移植。盤面ルールは engine.js と共通）
import { useState, useEffect, useRef } from "react";
import { C } from "../theme.js";
import { Btn, Header, StarRow } from "./common.jsx";
import { STAGES } from "../data/stages.js";
import { WORLD_META, WORLD_PALETTE, WORLD_HINTS, BLOCK_DEFS } from "../data/worlds.js";
import { parseStage, countBlocks, DX, DY, MAX_BLOCKS } from "../engine.js";
import { SFX } from "../sound.js";
import { today } from "../storage.js";

function BlockChip({ b, activeUid, onRemove, onSelect, openRepeat, onCount }) {
  const d = BLOCK_DEFS[b.type];
  const active = activeUid === b.uid;
  if (b.type === "repeat") {
    const open = openRepeat === b.uid;
    return (
      <div className="panel" style={{
        padding: 8, borderRadius: 14, background: open ? "#FFE9A8" : C.sun,
        outline: active ? `4px solid ${C.sakura}` : "none", display: "inline-flex",
        alignItems: "center", gap: 6, flexWrap: "wrap", maxWidth: "100%",
      }}>
        <button className="pbtn" style={{ padding: "4px 8px", background: "#fff", fontSize: 14 }}
          onClick={() => onSelect(b.uid)}>🔁 {open ? "ここに いれてね▼" : "くりかえし"}</button>
        <button className="pbtn" style={{ padding: "2px 8px", background: "#fff" }} onClick={() => onCount(b.uid, -1)}>−</button>
        <b style={{ fontSize: 18 }}>{b.count}かい</b>
        <button className="pbtn" style={{ padding: "2px 8px", background: "#fff" }} onClick={() => onCount(b.uid, 1)}>＋</button>
        <span style={{ display: "inline-flex", gap: 4, flexWrap: "wrap" }}>
          {b.children.map(c => (
            <BlockChip key={c.uid} b={c} activeUid={activeUid} onRemove={onRemove} onSelect={onSelect} openRepeat={openRepeat} onCount={onCount} />
          ))}
          {b.children.length === 0 && <span style={{ fontSize: 12, fontWeight: 700, opacity: .6 }}>（からっぽ）</span>}
        </span>
        <button className="pbtn" aria-label="けす" style={{ padding: "2px 8px", background: "#FFB3B3" }} onClick={() => onRemove(b.uid)}>✖</button>
      </div>
    );
  }
  return (
    <button className="pbtn" onClick={() => onRemove(b.uid)}
      style={{
        padding: "6px 10px", background: d.color, fontSize: 15, borderRadius: 12,
        outline: active ? `4px solid ${C.sakura}` : "none",
      }}>
      {d.emoji} {d.label} <span style={{ opacity: .5, fontSize: 12 }}>✖</span>
    </button>
  );
}

function PuzzlePlay({ stage, save, update, onBack, onNext, hasNext }) {
  const info = parseStage(stage);
  const sound = save.settings.sound;
  const [prog, setProg] = useState([]);
  const [openRepeat, setOpenRepeat] = useState(null);
  const [bot, setBot] = useState(info.start);
  const [collected, setCollected] = useState({});
  const [running, setRunning] = useState(false);
  const [activeUid, setActiveUid] = useState(null);
  const [crash, setCrash] = useState(false);
  const [msg, setMsg] = useState(null);
  const [result, setResult] = useState(null);
  const [hint, setHint] = useState(false);
  const runIdRef = useRef(0);
  const uidRef = useRef(0);

  useEffect(() => { // ステージが かわったら リセット
    runIdRef.current++;
    setProg([]); setOpenRepeat(null); setBot(info.start); setCollected({});
    setRunning(false); setActiveUid(null); setCrash(false); setMsg(null); setResult(null); setHint(false);
  }, [stage.id]);

  const isWall = (x, y) => x < 0 || y < 0 || x >= info.w || y >= info.h || info.cells[y][x] === "#";

  function addBlock(type) {
    if (running) return;
    if (countBlocks(prog) >= MAX_BLOCKS) { setMsg("ブロックが いっぱいだよ！🔁くりかえしを つかうと みじかく なるかも"); return; }
    SFX.tap(sound);
    const nb = { uid: ++uidRef.current, type };
    if (type === "repeat") { nb.count = 3; nb.children = []; setProg(p => [...p, nb]); setOpenRepeat(nb.uid); return; }
    if (openRepeat) {
      setProg(p => p.map(b => b.uid === openRepeat ? { ...b, children: [...b.children, nb] } : b));
    } else setProg(p => [...p, nb]);
  }
  function removeBlock(uid) {
    if (running) return;
    SFX.tap(sound);
    if (openRepeat === uid) setOpenRepeat(null);
    setProg(p => p.filter(b => b.uid !== uid).map(b => b.type === "repeat" ? { ...b, children: b.children.filter(c => c.uid !== uid) } : b));
  }
  function changeCount(uid, d) {
    if (running) return;
    setProg(p => p.map(b => b.uid === uid ? { ...b, count: Math.max(2, Math.min(9, b.count + d)) } : b));
  }
  function selectRepeat(uid) { if (!running) setOpenRepeat(o => o === uid ? null : uid); }

  function resetBot() {
    runIdRef.current++;
    setBot(info.start); setCollected({}); setRunning(false);
    setActiveUid(null); setCrash(false); setMsg(null);
  }

  async function run() {
    if (running) return;
    if (prog.length === 0) { setMsg("したの ブロックを タップして ならべてみよう！"); return; }
    const my = ++runIdRef.current;
    let st = { ...info.start }; let col = {};
    setBot(st); setCollected({}); setCrash(false); setMsg(null); setRunning(true);
    const delay = ms => new Promise(r => setTimeout(r, ms));
    await delay(350);
    const doPrim = async b => {
      if (runIdRef.current !== my) return "abort";
      setActiveUid(b.uid);
      const ahead = { x: st.x + DX[st.dir], y: st.y + DY[st.dir] };
      const wallAhead = isWall(ahead.x, ahead.y);
      if (b.type === "left") { st = { ...st, dir: (st.dir + 3) % 4 }; setBot(st); SFX.step(sound); }
      else if (b.type === "right") { st = { ...st, dir: (st.dir + 1) % 4 }; setBot(st); SFX.step(sound); }
      else if (b.type === "smartR" && wallAhead) { st = { ...st, dir: (st.dir + 1) % 4 }; setBot(st); SFX.step(sound); }
      else if (b.type === "smartL" && wallAhead) { st = { ...st, dir: (st.dir + 3) % 4 }; setBot(st); SFX.step(sound); }
      else if (wallAhead) {
        setCrash(true); SFX.fail(sound);
        setMsg("かべに ぶつかっちゃった！ もういちど かんがえてみよう 💪");
        return "fail";
      } else {
        st = { ...st, x: ahead.x, y: ahead.y }; setBot(st);
        const key = `${st.x},${st.y}`;
        if (info.cells[st.y][st.x] === "*" && !col[key]) {
          col = { ...col, [key]: true }; setCollected(col); SFX.star(sound);
          if (Object.keys(col).length === info.stars.length) { await delay(420); return "win"; }
        } else SFX.step(sound);
      }
      await delay(430);
      return runIdRef.current === my ? "ok" : "abort";
    };
    let status = "ok";
    outer:
    for (const b of prog) {
      if (b.type === "repeat") {
        for (let i = 0; i < b.count; i++) for (const c of b.children) {
          const r = await doPrim(c); if (r !== "ok") { status = r; break outer; }
        }
      } else {
        const r = await doPrim(b); if (r !== "ok") { status = r; break outer; }
      }
    }
    if (runIdRef.current !== my) return;
    setActiveUid(null); setRunning(false);
    if (status === "win") {
      SFX.win(sound);
      const n = countBlocks(prog);
      const starN = n <= stage.par ? 3 : n <= stage.par + 2 ? 2 : 1;
      setResult({ stars: starN, n });
      update(s => {
        s.puzzle.stars[stage.id] = Math.max(s.puzzle.stars[stage.id] || 0, starN);
        const d = today(); s.log[d] = s.log[d] || {}; s.log[d].puzzle = (s.log[d].puzzle || 0) + 1;
        return s;
      });
    } else if (status === "ok") {
      SFX.fail(sound);
      setMsg("うごきは できたけど、ほしが のこっているよ。ブロックを たしてみよう！");
    }
  }

  const cell = Math.min(56, Math.floor(320 / info.w));
  const world = WORLD_META[stage.world];
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 14px 30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0", flexWrap: "wrap" }}>
        <Btn bg="#fff" onClick={onBack}>◀ もどる</Btn>
        <div className="pl-display" style={{ fontSize: 20, flex: 1 }}>{world.emoji} {stage.name}</div>
        <StarRow n={save.puzzle.stars[stage.id] || 0} size={20} />
      </div>
      <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 8 }}>
        ⭐3つの めやす：ブロック {stage.par}こ いか（いま {countBlocks(prog)}こ）
      </div>

      {/* ばんめん */}
      <div className="panel" style={{ padding: 14, display: "flex", justifyContent: "center", background: "#FBFDFF" }}>
        <div className={crash ? "shake" : ""} style={{ position: "relative", width: cell * info.w, height: cell * info.h }}>
          {info.cells.map((row, y) => row.map((c, x) => (
            <div key={`${x},${y}`} style={{
              position: "absolute", left: x * cell, top: y * cell, width: cell - 4, height: cell - 4,
              margin: 2, borderRadius: 10, border: `2px solid ${C.ink}`,
              background: c === "#" ? "#8FBF7F" : (x + y) % 2 ? "#FFF3D6" : "#FFFBEF",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: cell * 0.55,
            }}>
              {c === "#" ? "🌳" : c === "*" && !collected[`${x},${y}`] ? "⭐" : ""}
            </div>
          )))}
          <div style={{
            position: "absolute", left: bot.x * cell, top: bot.y * cell, width: cell, height: cell,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "left .3s, top .3s", zIndex: 5,
          }}>
            <span style={{ fontSize: cell * 0.6, position: "relative" }}>
              🤖
              <span style={{
                position: "absolute", top: "50%", left: "50%", fontSize: cell * 0.3, color: C.sakura,
                transform: `translate(-50%,-50%) rotate(${bot.dir * 90}deg) translateX(${cell * 0.42}px)`,
              }}>▶</span>
            </span>
          </div>
        </div>
      </div>

      {msg && <div className="panel slide" style={{ padding: 12, marginTop: 10, background: "#FFF1F4", fontWeight: 800 }}>{msg}</div>}
      {hint && <div className="panel slide" style={{ padding: 12, marginTop: 10, background: "#EAF7FF", fontWeight: 800 }}>💡 {WORLD_HINTS[stage.world]}</div>}

      {/* プログラム */}
      <div className="panel" style={{ padding: 12, marginTop: 12, minHeight: 58 }}>
        <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 6 }}>📜 プログラム（タップで けせるよ）</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {prog.length === 0 && <span style={{ fontWeight: 700, opacity: .5 }}>ここに めいれいが ならぶよ</span>}
          {prog.map(b => (
            <BlockChip key={b.uid} b={b} activeUid={activeUid} onRemove={removeBlock}
              onSelect={selectRepeat} openRepeat={openRepeat} onCount={changeCount} />
          ))}
        </div>
      </div>

      {/* パレット */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
        {WORLD_PALETTE[stage.world].map(t => (
          <Btn key={t} bg={BLOCK_DEFS[t].color} disabled={running || (t === "repeat" && openRepeat !== null)}
            onClick={() => addBlock(t)} style={{ fontSize: 15 }}>
            {BLOCK_DEFS[t].emoji} {BLOCK_DEFS[t].label}
          </Btn>
        ))}
        {openRepeat && <Btn bg="#fff" onClick={() => setOpenRepeat(null)}>✅ くりかえし おわり</Btn>}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <Btn big bg={C.leaf} onClick={run} disabled={running}>▶️ うごかす！</Btn>
        <Btn bg="#fff" onClick={resetBot}>🔄 さいしょから</Btn>
        <Btn bg={C.sun} onClick={() => { setHint(h => !h); SFX.tap(sound); }}>💡 ヒント</Btn>
      </div>

      {/* クリアがめん */}
      {result && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(58,51,53,.45)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel pop" style={{ padding: 26, textAlign: "center", maxWidth: 380, background: "#FFFDF5" }}>
            <div style={{ fontSize: 54 }}>🎉</div>
            <div className="pl-display" style={{ fontSize: 26 }}>クリア！</div>
            <StarRow n={result.stars} size={38} />
            <div style={{ fontWeight: 800, margin: "8px 0" }}>
              ブロック {result.n}こで クリア！
              {result.stars < 3 && <><br />（{stage.par}こ いかで ⭐3つに なるよ）</>}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 10 }}>
              <Btn bg="#fff" onClick={() => { setResult(null); resetBot(); }}>🔁 もういちど</Btn>
              {hasNext
                ? <Btn big bg={C.leaf} onClick={onNext}>つぎへ ▶</Btn>
                : <Btn big bg={C.leaf} onClick={onBack}>ステージへ もどる</Btn>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Puzzle({ save, update, go, onSound }) {
  const [world, setWorld] = useState(1);
  const [stageId, setStageId] = useState(null);
  const stages = STAGES.filter(s => s.world === world);
  const clearedIn = w => STAGES.filter(s => s.world === w && (save.puzzle.stars[s.id] || 0) > 0).length;
  const unlockedWorld = w => w === 1 || clearedIn(w - 1) >= 3;
  const unlockedStage = i => i === 0 || (save.puzzle.stars[stages[i - 1].id] || 0) > 0;
  const stage = STAGES.find(s => s.id === stageId);

  if (stage) {
    const idx = stages.findIndex(s => s.id === stage.id);
    const next = stages[idx + 1];
    return (
      <div>
        <Header save={save} title="🤖 ロボット パズル" onHome={() => go("home")} onSound={onSound} />
        <PuzzlePlay stage={stage} save={save} update={update}
          onBack={() => setStageId(null)}
          hasNext={!!next}
          onNext={() => setStageId(next ? next.id : null)} />
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="🤖 ロボット パズル" onHome={() => go("home")} onSound={onSound} />
      <div style={{ display: "flex", gap: 8, padding: "0 16px", flexWrap: "wrap" }}>
        {Object.keys(WORLD_META).map(Number).map(w => {
          const un = unlockedWorld(w);
          return (
            <Btn key={w} bg={world === w ? WORLD_META[w].color : "#fff"} disabled={!un}
              onClick={() => setWorld(w)} style={{ fontSize: 14 }}>
              {un ? WORLD_META[w].emoji : "🔒"} ワールド{w}
            </Btn>
          );
        })}
      </div>
      <div className="panel slide" style={{ margin: "14px 16px", padding: 16, background: "#fff" }}>
        <div className="pl-display" style={{ fontSize: 22 }}>{WORLD_META[world].emoji} {WORLD_META[world].name}</div>
        <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 12 }}>みにつく ちから：{WORLD_META[world].skill}</div>
        <div style={{ display: "grid", gap: 10 }}>
          {stages.map((s, i) => {
            const st = save.puzzle.stars[s.id] || 0;
            const un = unlockedStage(i);
            return (
              <button key={s.id} className="pbtn" disabled={!un} onClick={() => setStageId(s.id)}
                style={{ background: st > 0 ? "#F1FFF0" : "#fff", padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
                <span style={{ fontSize: 26 }}>{un ? (st > 0 ? "✅" : "🎯") : "🔒"}</span>
                <span style={{ flex: 1, fontWeight: 900, fontSize: 16 }}>ステージ {s.id}　{s.name}</span>
                <StarRow n={st} size={18} />
              </button>
            );
          })}
        </div>
        {world < Object.keys(WORLD_META).length && clearedIn(world) < 3 && (
          <div style={{ fontWeight: 800, fontSize: 13, marginTop: 10 }}>
            🔓 つぎの ワールドは、この ワールドを 3ステージ クリアすると ひらくよ！（いま {clearedIn(world)}こ）
          </div>
        )}
      </div>
    </div>
  );
}
