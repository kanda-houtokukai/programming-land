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
import ParentGuide from "./ParentGuide.jsx";
import { BlockChip, PaletteBlock } from "./blocks.jsx";
import robotUrl from "../assets/robot.png";
import worldmapDay from "../assets/worldmap.webp";
import worldmapSunset from "../assets/worldmap-sunset.webp";
import worldmapNight from "../assets/worldmap-night.webp";

// 難易度別のマップ背景（同一構図・時間帯違い。拠点座標 ISLAND_POS は3枚共通）
const MAP_BG = { easy: worldmapDay, normal: worldmapSunset, hard: worldmapNight };

/* 救済ヒント＝「その面の こたえ（最短解 sol）」の段階開示。
   💡ヒント（自分で押す・島の一般論）とは役割を分け、一般論は絶対に出さない。
   1手 = 上位ブロック1つ。くりかえしは「🔁3かい［⬆️まえへ→↪️みぎをむく］」の形で1手として見せる */
function stepLabel(b, maskCount = false) {
  if (b.type === "repeat") {
    const inner = b.children.map(c => `${BLOCK_DEFS[c.type].emoji}${BLOCK_DEFS[c.type].label}`).join("→");
    return `🔁${maskCount ? "なんかいか" : `${b.count}かい`}［${inner}］`;
  }
  return `${BLOCK_DEFS[b.type].emoji}${BLOCK_DEFS[b.type].label}`;
}

// 失敗回数に応じて 開示する手数を増やす（考える余地を残す段階開示）
function rescueFor(failCount, stage, hasNext) {
  const sol = stage.sol;
  if (failCount < 2 || !sol || !sol.length) return null;
  if (failCount >= 4) {
    return {
      strong: true,
      text: `こたえの てじゅん：${sol.map(b => stepLabel(b)).join(" → ")}`,
      sub: hasNext ? "むずかしかったら、つぎの ステージに すすんでも いいよ！あとで もどってこれるよ。" : null,
    };
  }
  if (failCount === 3) {
    const n = Math.max(1, Math.ceil(sol.length / 2));
    return {
      strong: false,
      text: `おたすけ：とちゅうまで みせるね。${sol.slice(0, n).map(b => stepLabel(b)).join(" → ")} …つづきは かんがえてみよう！`,
      sub: null,
    };
  }
  // failCount === 2: さいしょの1〜2手だけ。1手目がくりかえしなら 回数は かくして 考える余地を残す
  const n = sol.length <= 2 ? 1 : 2;
  return {
    strong: false,
    text: `おたすけ：さいしょは ${sol.slice(0, n).map(b => stepLabel(b, true)).join(" → ")} から はじめてみよう。`,
    sub: null,
  };
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
  const [failCount, setFailCount] = useState(0); // この面で失敗した回数（救済ヒントの段階）
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
    setRunning(false); setActiveUid(null); setCrash(false); setMsg(null); setResult(null); setHint(false); setFailCount(0);
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
      setFailCount(0); // クリアしたら救済カウントはリセット
      const n = countBlocks(prog);
      const starN = n <= stage.par ? 3 : n <= stage.par + 2 ? 2 : 1;
      setResult({ stars: starN, n });
      update(s => {
        s.puzzle.stars[stage.id] = Math.max(s.puzzle.stars[stage.id] || 0, starN);
        const d = today(); s.log[d] = s.log[d] || {}; s.log[d].puzzle = (s.log[d].puzzle || 0) + 1;
        applyXp(s, XP.puzzleWin(starN));
        return s;
      });
    } else {
      // かべ衝突(fail) or ほし残り(ok) → 失敗。何度も失敗したら救済ヒントを手厚くする
      setFailCount(f => f + 1);
      if (status === "ok") { SFX.fail(sound); setMsg("うごきは できたけど、ほしが のこっているよ。ブロックを たしてみよう！"); }
    }
  }

  const cell = Math.min(56, Math.floor(320 / info.w));
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 14px", paddingBottom: ctrlH + 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "10px 0", flexWrap: "wrap" }}>
        <Btn bg="#fff" onClick={onBack}>◀ もどる</Btn>
        <div className="pl-display" style={{ fontSize: 20, flex: 1, minWidth: 100 }}>{stage.name}</div>
        <StarRow n={save.puzzle.stars[stage.id] || 0} size={20} />
        {/* ③ こまったら: ヒントは 操作ボタンから はずして ヘッダーに小さく置く */}
        <Btn bg={hint ? C.sun : "#fff"} onClick={() => { setHint(h => !h); SFX.tap(sound); }} style={{ fontSize: 14, padding: "8px 12px" }}>💡 ヒント</Btn>
      </div>
      <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 8 }}>
        ⭐3つの めやす：ブロック {stage.par}こ いか（いま {countBlocks(prog)}こ）
      </div>

      {hint && <div className="panel slide" style={{ padding: 12, marginBottom: 10, background: "#EAF7FF", fontWeight: 800, fontSize: 14 }}>💡 {island.hint}</div>}

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

      {/* 救済ヒント: 何回か失敗したら 自動で 手厚いヒントが でる（同じ面で 何度も つまずく前に助ける） */}
      {(() => {
        const r = rescueFor(failCount, stage, hasNext);
        if (!r) return null;
        return (
          <div className="panel slide" style={{ padding: 12, marginTop: 10, background: r.strong ? "#FFF3D6" : "#FFF9E0", fontWeight: 800, fontSize: 14 }}>
            <div>{r.strong ? "🆘 " : "💪 "}{r.text}</div>
            {r.sub && <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", marginTop: 6 }}>{r.sub}</div>}
          </div>
        );
      })()}

      {/* おうちの方へ（保護者向け・折りたたみ）。プレイ画面内なので開いても解きかけは消えない */}
      <ParentGuide island={stage.island} />

      {/* ① くみたてる ゾーン: 命令ブロックを つんで プログラムを つくる（積み木ブロック風・パレットと同じ見た目） */}
      <div className="panel" style={{ padding: 12, marginTop: 12, background: "#FFFDF6" }}>
        <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 17 }}>🧩</span><span>くみたてる</span>
          <span style={{ fontWeight: 700, fontSize: 12, opacity: .6 }}>— ブロックを タップして つもう</span>
        </div>
        {/* つんだ プログラム（タップで けせる）。増えても 枠は広がらない: 最大高さ＋スクロール */}
        <div style={{
          display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start",
          minHeight: 48, maxHeight: 150, overflowY: "auto",
          background: "#fff", border: `2px dashed rgba(58,51,53,.3)`, borderRadius: 12, padding: 10,
        }}>
          {prog.length === 0 && <span style={{ fontWeight: 700, opacity: .5, alignSelf: "center" }}>ここに ブロックが つみあがるよ</span>}
          {prog.map(b => (
            <BlockChip key={b.uid} b={b} activeUid={activeUid} onRemove={removeBlock}
              onSelect={selectRepeat} openRepeat={openRepeat} onCount={changeCount} />
          ))}
        </div>
        {/* パレット（えらぶ側）。つんだ ブロックと 同じ見た目 */}
        <div style={{ fontWeight: 800, fontSize: 12, opacity: .7, margin: "10px 0 6px" }}>したから えらぶ ▾</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {island.palette.map(t => (
            <PaletteBlock key={t} type={t}
              disabled={running || (t === "repeat" && openRepeat !== null)}
              onClick={() => addBlock(t)} />
          ))}
          {openRepeat && <Btn bg="#fff" onClick={() => setOpenRepeat(null)} style={{ fontSize: 14 }}>✅ くりかえし おわり</Btn>}
        </div>
      </div>

      {/* ② うごかす ゾーン（下部固定）: 実行系だけ。組み立てとは 色・場所で はっきり分ける */}
      <div ref={controllerRef} style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 30,
        width: "100%", maxWidth: 640, margin: "0 auto",
        padding: "10px 14px calc(12px + env(safe-area-inset-bottom))",
        background: "#E9F7E6", borderTop: `3px solid ${C.ink}`, borderRadius: "18px 18px 0 0",
        boxShadow: "0 -5px 14px rgba(58,51,53,.16)",
      }}>
        {msg && <div className="slide" style={{ padding: "8px 12px", marginBottom: 8, background: "#FFF1F4", border: `2px solid ${C.ink}`, borderRadius: 12, fontWeight: 800, fontSize: 14 }}>{msg}</div>}
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
          <Btn big bg={C.leaf} onClick={run} disabled={running}
            style={{ fontSize: 24, padding: "16px 34px", flex: "0 1 auto" }}>▶️ うごかす！</Btn>
          <Btn bg="#fff" onClick={resetBot}
            style={{ fontSize: 13, padding: "10px 14px" }}>🔄 さいしょ<br />から</Btn>
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
  // 迂回できる解放: 1面 詰まっても となりの面に すすめる。
  // クリア数＋1 まで解放（＝つまずいた面を1つ飛ばして先へ／もどるのは自由）。
  const clearedInStages = stages.filter(s => (save.puzzle.stars[s.id] || 0) > 0).length;
  const unlockedStage = i => i <= clearedInStages + 1;
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
