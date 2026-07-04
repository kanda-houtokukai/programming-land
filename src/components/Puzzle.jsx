// ロボットパズル（P2: 6つの島マップ＋難易度3段階）。盤面ルールは engine.js と共通
import { useState, useEffect, useRef } from "react";
import { C } from "../theme.js";
import { Btn, Header, StarRow } from "./common.jsx";
import { STAGES, stagesFor } from "../data/stages.js";
import { ISLANDS, DIFFICULTIES } from "../data/islands.js";
import { BLOCK_DEFS } from "../data/blocks.js";
import { parseStage, countBlocks, DX, DY, MAX_BLOCKS } from "../engine.js";
import { SFX } from "../sound.js";
import { today } from "../storage.js";
import { XP, applyXp } from "../growth.js";
import HowTo from "./HowTo.jsx";
import robotUrl from "../assets/robot.png";
import worldmapDay from "../assets/worldmap.webp";
import worldmapSunset from "../assets/worldmap-sunset.webp";
import worldmapNight from "../assets/worldmap-night.webp";

// 難易度別のマップ背景（同一構図・時間帯違い。拠点座標 ISLAND_POS は3枚共通）
const MAP_BG = { easy: worldmapDay, normal: worldmapSunset, hard: worldmapNight };

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
  const island = ISLANDS[stage.island];
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

  // 下部固定コントローラーの高さを実測し、その分だけ本文に余白を空ける（内容が隠れない）
  const controllerRef = useRef(null);
  const [ctrlH, setCtrlH] = useState(150);
  useEffect(() => {
    const el = controllerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setCtrlH(el.offsetHeight));
    ro.observe(el);
    setCtrlH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

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
        applyXp(s, XP.puzzleWin(starN));
        return s;
      });
    } else if (status === "ok") {
      SFX.fail(sound);
      setMsg("うごきは できたけど、ほしが のこっているよ。ブロックを たしてみよう！");
    }
  }

  const cell = Math.min(56, Math.floor(320 / info.w));
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 14px", paddingBottom: ctrlH + 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0", flexWrap: "wrap" }}>
        <Btn bg="#fff" onClick={onBack}>◀ もどる</Btn>
        <div className="pl-display" style={{ fontSize: 20, flex: 1 }}>{stage.name}</div>
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
            <span style={{ position: "relative", display: "inline-flex" }}>
              {/* ロボットは正面固定。向きは まわりの ▶矢印で しめす（robot.pngはドット絵＝pixelated） */}
              <img src={robotUrl} alt="ロボット" draggable="false" style={{
                width: cell * 0.78, height: cell * 0.78, display: "block",
                imageRendering: "pixelated",
              }} />
              <span style={{
                position: "absolute", top: "50%", left: "50%", fontSize: cell * 0.3, color: C.sakura,
                transform: `translate(-50%,-50%) rotate(${bot.dir * 90}deg) translateX(${cell * 0.5}px)`,
              }}>▶</span>
            </span>
          </div>
        </div>
      </div>

      {/* プログラム */}
      <div className="panel" style={{ padding: 12, marginTop: 12 }}>
        <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
          <span>📜 プログラム（タップで けせるよ）</span>
          <span style={{ opacity: .55 }}>{countBlocks(prog)}こ</span>
        </div>
        {/* 命令が増えても枠は広がらない: 最大高さ＋スクロール（タブレットで画面を圧迫しない） */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", minHeight: 40, maxHeight: 132, overflowY: "auto" }}>
          {prog.length === 0 && <span style={{ fontWeight: 700, opacity: .5 }}>ここに めいれいが ならぶよ</span>}
          {prog.map(b => (
            <BlockChip key={b.uid} b={b} activeUid={activeUid} onRemove={removeBlock}
              onSelect={selectRepeat} openRepeat={openRepeat} onCount={changeCount} />
          ))}
        </div>
      </div>

      {/* 下部固定コントローラー: 命令ブロック＋実行ボタンを 画面下に常時固定（いつも同じ場所で押せる） */}
      <div ref={controllerRef} style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 30,
        width: "100%", maxWidth: 640, margin: "0 auto",
        padding: "10px 14px calc(12px + env(safe-area-inset-bottom))",
        background: "#FFF9EF", borderTop: `3px solid ${C.ink}`, borderRadius: "18px 18px 0 0",
        boxShadow: "0 -5px 14px rgba(58,51,53,.16)",
      }}>
        {msg && <div className="slide" style={{ padding: "8px 12px", marginBottom: 8, background: "#FFF1F4", border: `2px solid ${C.ink}`, borderRadius: 12, fontWeight: 800, fontSize: 14 }}>{msg}</div>}
        {hint && <div className="slide" style={{ padding: "8px 12px", marginBottom: 8, background: "#EAF7FF", border: `2px solid ${C.ink}`, borderRadius: 12, fontWeight: 800, fontSize: 14 }}>💡 {island.hint}</div>}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {island.palette.map(t => (
            <Btn key={t} bg={BLOCK_DEFS[t].color} disabled={running || (t === "repeat" && openRepeat !== null)}
              onClick={() => addBlock(t)} style={{ fontSize: 15 }}>
              {BLOCK_DEFS[t].emoji} {BLOCK_DEFS[t].label}
            </Btn>
          ))}
          {openRepeat && <Btn bg="#fff" onClick={() => setOpenRepeat(null)}>✅ くりかえし おわり</Btn>}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Btn big bg={C.leaf} onClick={run} disabled={running}>▶️ うごかす！</Btn>
          <Btn bg="#fff" onClick={resetBot}>🔄 さいしょから</Btn>
          <Btn bg={C.sun} onClick={() => { setHint(h => !h); SFX.tap(sound); }}>💡 ヒント</Btn>
        </div>
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

/* 1枚絵ワールドマップ。クリアで つぎの拠点への みちが ともる（worldmap-指示.md 準拠） */
// 拠点の座標（背景画像に対する％）。実機で微調整する時はここだけ触る
// 2026-07-04 実装時にブラウザで背景と照合して補正:
//   絵の丸い空き地は道順に (14.4,77.5)→(28,65.5)→(32.8,49.5)→(58.6,40)→(75.3,45.3)→(78,26)。
//   開始値の②③は上下が逆で、③(36,60)は水辺に乗るため、道順どおり②=下・③=上に割り当て直した
const ISLAND_POS = {
  1: { left: 14.4, top: 77.5 },
  2: { left: 28, top: 65.5 },
  3: { left: 34, top: 47.5 },
  4: { left: 58.7, top: 39.5 },
  5: { left: 76, top: 44.8 },
  6: { left: 79, top: 25.5 },
};

function IslandMap({ save, diff, onEnter }) {
  const clearedIn = i => stagesFor(i, diff).filter(s => (save.puzzle.stars[s.id] || 0) > 0).length;
  const starsIn = i => stagesFor(i, diff).reduce((a, s) => a + (save.puzzle.stars[s.id] || 0), 0);
  const unlocked = i => i === 1 || clearedIn(i - 1) >= 3;
  // SVGは％座標をそのまま使う（viewBox 100×56.25 = 16:9）
  const P = i => ({ x: ISLAND_POS[i].left, y: ISLAND_POS[i].top * 0.5625 });
  return (
    <div style={{ margin: "14px 16px", position: "relative", aspectRatio: "16 / 9",
      border: `3px solid ${C.ink}`, borderRadius: 22, boxShadow: "5px 5px 0 rgba(58,51,53,.9)",
      overflow: "hidden", background: "#7FC8F8" }}>
      <img src={MAP_BG[diff] || worldmapDay} alt="ワールドマップ" draggable="false"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      {/* みち: 解放済み区間は明るく、未解放区間は暗く */}
      <svg viewBox="0 0 100 56.25" preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {[1, 2, 3, 4, 5].map(i => {
          const a = P(i), b = P(i + 1);
          const open = unlocked(i + 1);
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - 3;
          return (
            <path key={i} d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
              fill="none"
              stroke={open ? "rgba(255,236,160,.95)" : "rgba(40,34,36,.38)"}
              strokeWidth={open ? 1.1 : 0.8}
              strokeDasharray={open ? "0.3 1.7" : "0.2 1.9"}
              strokeLinecap="round" />
          );
        })}
      </svg>
      {[1, 2, 3, 4, 5, 6].map(i => {
        const un = unlocked(i);
        const cleared = clearedIn(i);
        const total = stagesFor(i, diff).length;
        const done = un && cleared === total;
        const glowing = un && !done;
        return (
          <button key={i} disabled={!un} onClick={() => onEnter(i)}
            className={glowing ? "glow" : ""}
            aria-label={ISLANDS[i].name}
            style={{
              position: "absolute", left: `${ISLAND_POS[i].left}%`, top: `${ISLAND_POS[i].top}%`,
              transform: "translate(-50%,-50%)",
              width: "11%", aspectRatio: "1", borderRadius: "50%",
              border: `3px solid ${C.ink}`, cursor: un ? "pointer" : "not-allowed",
              background: un ? "rgba(255,253,245,.92)" : "rgba(210,204,192,.72)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "clamp(16px, 4.6vw, 30px)", padding: 0,
              filter: un ? "none" : "grayscale(1)",
            }}>
            {un ? ISLANDS[i].emoji : "🔒"}
            {done && <span style={{ position: "absolute", top: "-12%", right: "-12%", fontSize: "clamp(11px,2.6vw,16px)" }}>✅</span>}
            {/* 島名ラベル */}
            <span style={{
              position: "absolute", top: "104%", left: "50%", transform: "translateX(-50%)",
              whiteSpace: "nowrap", fontWeight: 900, fontSize: "clamp(8px, 1.9vw, 12px)",
              background: "rgba(255,255,255,.92)", border: `2px solid ${C.ink}`, borderRadius: 999,
              padding: "1px 7px", color: C.ink, lineHeight: 1.5,
            }}>
              {un
                ? `${ISLANDS[i].name.replace("の しま", "")}${done ? ` ⭐${starsIn(i)}` : ` ${cleared}/${total}`}`
                : ISLANDS[i].name.replace("の しま", "")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Puzzle({ save, update, go, onSound }) {
  const diff = save.puzzle.difficulty || "easy";
  const [island, setIsland] = useState(null);
  const [stageId, setStageId] = useState(null);
  const stages = island ? stagesFor(island, diff) : [];
  const unlockedStage = i => i === 0 || (save.puzzle.stars[stages[i - 1].id] || 0) > 0;
  const stage = STAGES.find(s => s.id === stageId);

  function setDiff(d) {
    SFX.tap(save.settings.sound);
    setIsland(null); setStageId(null);
    update(s => { s.puzzle.difficulty = d; return s; });
  }

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
      {/* むずかしさ えらび */}
      <div style={{ display: "flex", gap: 8, padding: "0 16px", flexWrap: "wrap" }}>
        {DIFFICULTIES.map(d => (
          <Btn key={d.id} bg={diff === d.id ? C.sun : "#fff"} onClick={() => setDiff(d.id)} style={{ fontSize: 14 }}>
            {d.label}
          </Btn>
        ))}
      </div>

      {island === null ? (
        <IslandMap save={save} diff={diff} onEnter={setIsland} />
      ) : (
        <div style={{ padding: "14px 16px", display: "grid", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Btn bg="#fff" onClick={() => setIsland(null)} style={{ fontSize: 13, padding: "6px 10px" }}>🗺️ マップ</Btn>
            <div className="pl-display" style={{ fontSize: 21 }}>{ISLANDS[island].emoji} {ISLANDS[island].name}</div>
          </div>
          <HowTo id={`island-${island}`} />
          <div className="panel slide" style={{ padding: 16, background: "#fff" }}>
          <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 12 }}>みにつく ちから：{ISLANDS[island].skill}</div>
          <div style={{ display: "grid", gap: 10 }}>
            {stages.map((s, i) => {
              const st = save.puzzle.stars[s.id] || 0;
              const un = unlockedStage(i);
              return (
                <button key={s.id} className="pbtn" disabled={!un} onClick={() => setStageId(s.id)}
                  style={{ background: st > 0 ? "#F1FFF0" : "#fff", padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
                  <span style={{ fontSize: 26 }}>{un ? (st > 0 ? "✅" : "🎯") : "🔒"}</span>
                  <span style={{ flex: 1, fontWeight: 900, fontSize: 16 }}>ステージ {i + 1}</span>
                  <StarRow n={st} size={18} />
                </button>
              );
            })}
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
