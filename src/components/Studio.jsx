// つくるスタジオ（段階0: ブロック見本画面＝見た目ゲート）。
// ★brushup/studio-block-prototype.html 第11版の1:1移植（studio-design.md §11 が数値の正本）。
// 機能範囲: パレット / 掴むと下が束で外れる / 磁石スナップ / 救済スナップ / 入れ子深さ2 /
// きっかけ各1本制限 / 数値ステッパー / おと切替 / たなへ捨てる / 効果音。上演ステージは段階1。
// アクセスは #studio-dev の一時ルートのみ（main.jsx・マップ導線は段階3）。
// DOM戦略もプロトタイプ準拠: ブロック=絶対配置div+SVGパス・位置はtransform・隙間はレイアウト再計算+CSS transition。
// ドラッグはPointer Events直書き（D&Dライブラリ不使用）・touch-action:none・最初の1本指のみ・
// 初回pointerdownでAudioContext解錠。★matchMedia/ResizeObserverは使わない（過去2件の障害実績）。
import { useReducer, useRef, useState, useEffect, useCallback } from "react";
import { DEFS, PALORDER, SOUNDS, isTrigger, isContainer, makeBlock } from "../data/studio-blocks.js";
import { G, ANIM, pathBody, pathHat, pathC, chipY, blockH, stackH, containerDepth } from "../studio/geometry.js";
import StudioBlock from "./StudioBlock.jsx";

/* ============ サウンド（プロトタイプのWebAudio簡易音を1:1移植・Suno差し替えは段階3） ============ */
let AC = null;
function ac() { if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)(); return AC; }
function tone(freq, dur, type, vol, slide) {
  try {
    const c = ac(), o = c.createOscillator(), g = c.createGain();
    o.type = type || "sine"; o.frequency.value = freq;
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, c.currentTime + dur);
    g.gain.value = vol || 0.18;
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + dur);
  } catch (e) { /* 音は失敗しても操作を止めない */ }
}
const sndSnap = () => { tone(1500, 0.045, "square", 0.1); tone(600, 0.07, "sine", 0.14); };
const sndPick = () => tone(900, 0.05, "sine", 0.08);
const sndPoof = () => tone(320, 0.16, "sine", 0.16, 90);
const sndTick = () => tone(1100, 0.04, "square", 0.07);
const sndNo = () => tone(180, 0.12, "sine", 0.15);
export const SND = [
  () => tone(440, 0.16, "sine", 0.2),
  () => { tone(880, 0.09, "sine", 0.16); setTimeout(() => tone(1320, 0.14, "sine", 0.16), 70); },
  () => tone(120, 0.22, "sine", 0.28),
];

/* ============ 見本画面のCSS（プロトタイプのstyleを .studio-root 配下にスコープして移植） ============ */
const STUDIO_CSS = `
  .studio-root { position: fixed; inset: 0; z-index: 200; display: flex; flex-direction: column;
    background: #2e2237; user-select: none; -webkit-user-select: none; overflow: hidden;
    font-family: 'M PLUS Rounded 1c','Hiragino Maru Gothic ProN','Yu Gothic',sans-serif; }
  .studio-root header { display: flex; align-items: center; gap: 12px; padding: 10px 16px; background: #241a2c; color: #f5eddf; }
  .studio-root header .mark { width: 30px; height: 30px; border-radius: 8px; background: #f2b23a;
    display: flex; align-items: center; justify-content: center;
    box-shadow: inset 0 2px 0 rgba(255,255,255,.45), 0 2px 0 rgba(0,0,0,.35); }
  .studio-root header h1 { font-size: 15px; font-weight: 900; letter-spacing: .06em; }
  .studio-root header .sub { font-size: 11px; opacity: .65; font-weight: 500; }
  .studio-root header button { font-family: inherit; font-weight: 700; font-size: 12px;
    color: #f5eddf; background: #4a3a58; border: none; border-radius: 999px; padding: 7px 16px;
    box-shadow: inset 0 1.5px 0 rgba(255,255,255,.18), 0 2px 0 rgba(0,0,0,.3); cursor: pointer; }
  .studio-root header button:active { transform: translateY(1px); box-shadow: inset 0 1.5px 0 rgba(255,255,255,.18); }
  .studio-wrap { flex: 1; display: flex; min-height: 0; }
  .studio-pal { width: 300px; flex-shrink: 0; background: linear-gradient(180deg, #8a5a33, #6f4526);
    border-right: 4px solid #543317; padding: 10px 10px; position: relative; z-index: 5;
    transition: background .15s; touch-action: none; }
  .studio-pal .shelf-title { color: #f7e6c8; font-size: 12px; font-weight: 900; text-align: center;
    letter-spacing: .12em; margin-bottom: 8px; text-shadow: 0 1px 0 rgba(0,0,0,.4); }
  .studio-pal .palgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
  .studio-pal.del { background: linear-gradient(180deg, #a03a35, #7c2723); border-right-color: #5c1512; }
  .studio-pal.del .pal { opacity: .25; }
  .studio-pal .delmsg { position: absolute; inset: 0; display: none; align-items: center; justify-content: center;
    color: #ffe9e2; font-weight: 900; font-size: 14px; text-align: center; line-height: 1.6; pointer-events: none; }
  .studio-pal.del .delmsg { display: flex; }
  .studio-pal .pal { background: rgba(255, 244, 220, .12); border: 2px solid rgba(255, 244, 220, .18);
    border-radius: 12px; padding: 7px 6px 5px; cursor: grab; touch-action: none;
    transition: transform .12s, opacity .15s; }
  .studio-pal .pal:active { transform: scale(.96); }
  .studio-pal .pal.off { opacity: .35; }
  @keyframes sbPalNo { 0%,100% { transform: none; } 25% { transform: translateX(4px); } 60% { transform: translateX(-4px); } }
  .studio-pal .pal.no { animation: sbPalNo .25s; }
  .studio-pal .pal svg { display: block; margin: 0 auto; }
  .studio-pal .pal .pname { text-align: center; color: #f7e6c8; font-size: 10px; font-weight: 700; margin-top: 2px; }
  .studio-stage { flex: 1; position: relative; overflow: hidden;
    background:
      radial-gradient(circle at 50% -10%, rgba(255, 224, 150, .25), transparent 55%),
      repeating-linear-gradient(0deg, transparent 0 34px, rgba(120, 90, 60, .05) 34px 35px),
      repeating-linear-gradient(90deg, transparent 0 34px, rgba(120, 90, 60, .05) 34px 35px),
      #fdf6e8;
    touch-action: none; }
  .studio-stage::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 10px;
    background: linear-gradient(180deg, rgba(84, 51, 23, .0), rgba(84, 51, 23, .25)); pointer-events: none; }
  .studio-stage .hint { position: absolute; left: 14px; bottom: 14px; right: 14px;
    color: #8a6b4a; font-size: 11px; font-weight: 700; line-height: 1.7; pointer-events: none; }
  .studio-root .blk { position: absolute; left: 0; top: 0;
    transition: transform ${ANIM.shift}; touch-action: none; cursor: grab;
    filter: drop-shadow(0 1.5px 0 rgba(90, 60, 20, .28)); }
  .studio-root .blk.noanim { transition: none; }
  .studio-root .blk svg { display: block; overflow: visible; }
  .studio-root .blk .lbl { position: absolute; display: flex; align-items: center; gap: 7px;
    color: #fff; font-weight: 900; font-size: 14px; text-shadow: 0 1.5px 0 rgba(0,0,0,.28);
    pointer-events: none; white-space: nowrap; }
  .studio-root .pill { pointer-events: auto; background: rgba(255,255,255,.94); border-radius: 999px;
    padding: 1px 11px; font-size: 14px; font-weight: 900; box-shadow: inset 0 -2px 0 rgba(0,0,0,.14);
    cursor: pointer; min-width: 32px; text-align: center; }
  .studio-root .pill:active { transform: scale(.94); }
  .studio-fly { position: absolute; left: 0; top: 0; z-index: 60; pointer-events: none; transform-origin: 24px 20px; }
  .studio-fly.lift { animation: sbLift .14s ease-out forwards; }
  @keyframes sbLift { to { rotate: ${ANIM.liftRot}deg; scale: ${ANIM.liftScale}; } }
  .studio-fly .blk { transition: none; filter: drop-shadow(0 7px 9px rgba(60, 30, 10, .32)); }
  @keyframes sbLand { 0% { scale: 1 1; } 40% { scale: 1.04 .88; } 70% { scale: .98 1.05; } 100% { scale: 1 1; } }
  .studio-root .blk.land { animation: sbLand .2s ease-out; transform-origin: 30px 100%; }
  .studio-ghost { position: absolute; z-index: 1; border-radius: 10px; background: rgba(255, 200, 60, .28);
    outline: 2.5px dashed rgba(214, 148, 20, .75); outline-offset: -2px;
    transition: transform ${ANIM.shift}; pointer-events: none; }
  @keyframes sbPoof { to { scale: .2; opacity: 0; rotate: 14deg; } }
  .studio-fly.poof { animation: sbPoof .22s ease-in forwards; }
  .studio-pop { position: absolute; z-index: 90; background: #fffdf6; border-radius: 16px;
    box-shadow: 0 6px 18px rgba(60, 30, 10, .3), inset 0 2px 0 #fff; padding: 8px 10px;
    display: flex; align-items: center; gap: 10px; }
  .studio-pop button { width: 46px; height: 46px; border-radius: 50%; border: none;
    font-size: 26px; font-weight: 900; font-family: inherit; color: #fff; cursor: pointer;
    box-shadow: inset 0 -3px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.15); }
  .studio-pop button:active { transform: translateY(2px); box-shadow: inset 0 -1px 0 rgba(0,0,0,.2); }
  .studio-pop .minus { background: #e0704f; }
  .studio-pop .plus { background: #58a839; }
  .studio-pop .val { font-size: 26px; font-weight: 900; color: #4a3520; min-width: 40px; text-align: center; }
  .studio-pop::after { content: ""; position: absolute; left: 50%; bottom: -8px; width: 16px; height: 16px;
    background: #fffdf6; transform: translateX(-50%) rotate(45deg); border-radius: 3px; }
`;

/* ============ 見本の初期シーン（プロトタイプ initialScene を1:1移植） ============ */
function initialScene() {
  const hat = makeBlock("hat");
  const mv = makeBlock("move"); mv.n = 3;
  const rep = makeBlock("repeat"); rep.n = 2;
  const u = makeBlock("moveU"); u.n = 2;
  const j = makeBlock("jump"); j.n = 1;
  const dn = makeBlock("moveD"); dn.n = 2;
  const so = makeBlock("sound"); so.s = 0;
  rep.children = [u, j, dn, so];
  return [
    { x: 70, y: 40, blocks: [hat, mv, rep] },
    { x: 400, y: 86, blocks: [makeBlock("forever")] },
  ];
}

/* fly（持ち上げ中の束）の描画用: グループをフラットな配置リストに展開（プロトタイプ renderFly と同じ計算） */
function flattenGroup(group) {
  const out = [];
  const walk = (list, x, y) => {
    let yy = y;
    for (const b of list) {
      const mouth = isContainer(b.type) ? (b.children.length ? stackH(b.children) : G.MOUTH) : 0;
      out.push({ b, x, y: yy, mouth });
      if (isContainer(b.type)) walk(b.children, x + G.AW, yy + G.TB);
      yy += blockH(b);
    }
  };
  walk(group, 0, 0);
  return out;
}

export default function Studio() {
  const [, force] = useReducer(x => x + 1, 0);
  const stacksRef = useRef(initialScene());
  const dragRef = useRef(null);      // { group, fromPalette, ox, oy, slot, groupH, committing }
  const pendingRef = useRef(null);   // { x0, y0, id, grab, pointerId }
  const pointerIdRef = useRef(null); // 最初の1本指のみ有効（多点タッチ対策）
  const nodesRef = useRef([]);       // 直近レイアウトのノード（救済スナップの重なり判定用）
  const slotsRef = useRef([]);
  const stageRef = useRef(null);
  const flyRef = useRef(null);
  const palRef = useRef(null);
  const [flyGroup, setFlyGroup] = useState(null); // flyの中身（描画トリガ）
  const [landId, setLandId] = useState(null);     // 着地ぷにっ対象
  const [delHover, setDelHover] = useState(false);
  const [popTarget, setPopTarget] = useState(null); // { id, x, y } 数値ステッパー

  /* ==== レイアウト（プロトタイプ layList/layoutAll の1:1移植） ==== */
  const layoutAll = () => {
    const nodes = [], slots = [];
    const drag = dragRef.current;
    const gapAt = (list, i) => drag && drag.slot && drag.slot.list === list && drag.slot.index === i;
    const layList = (list, x, y, depth) => {
      let cy = y;
      list.forEach((b, i) => {
        const allowSlot = depth > 0 || i > 0;
        const afterFlat = i > 0 && DEFS[list[i - 1].type].flat;
        if (allowSlot && !afterFlat) slots.push({ list, index: i, x, y: cy, depth, len: list.length });
        if (gapAt(list, i)) cy += drag.groupH;
        const node = { b, x, y: cy, depth };
        nodes.push(node);
        if (isContainer(b.type)) {
          const inner = layList(b.children, x + G.AW, cy + G.TB, depth + 1);
          node.mouth = Math.max(inner, G.MOUTH);
          node.h = G.TB + node.mouth + G.BB;
        } else node.h = blockH(b);
        cy += node.h;
      });
      const endFlat = list.length && DEFS[list[list.length - 1].type].flat;
      if ((depth > 0 || list.length > 0) && !endFlat)
        slots.push({ list, index: list.length, x, y: cy, depth, len: list.length });
      if (gapAt(list, list.length)) cy += drag.groupH;
      return cy - y;
    };
    for (const st of stacksRef.current) layList(st.blocks, st.x, st.y, 0);
    nodesRef.current = nodes;
    slotsRef.current = slots;
    return { nodes, slots };
  };

  /* ==== スナップ先の探索（1:1移植・きっかけ型/flat容器へ一般化） ==== */
  const eligibleSlot = (px, py, range) => {
    const drag = dragRef.current;
    const head = drag.group[0].type;
    if (isTrigger(head)) return null; // きっかけ（帽子型）は上に接続不可＝スロットに刺せない
    const gDepth = containerDepth(drag.group);
    const tailFlat = !!DEFS[drag.group[drag.group.length - 1].type].flat;
    const headFlat = !!DEFS[head].flat;
    let best = null, bestD = range || G.SNAP;
    for (const s of slotsRef.current) {
      if (s.depth + gDepth > G.MAXDEPTH) continue;
      if ((headFlat || tailFlat) && s.index !== s.len) continue; // ずっと＝リスト末尾のみ
      const dx = px - s.x, dy = (py - s.y) * G.SNAPWY; // 横ずれに寛容な楕円判定
      const dist = Math.hypot(dx, dy);
      if (dist < bestD) { bestD = dist; best = s; }
    }
    return best;
  };
  const overlapsAnyBlock = (fx, fy, group) => {
    const gw = DEFS[group[0].type].w, gh = stackH(group);
    for (const n of nodesRef.current) {
      const nw = DEFS[n.b.type].w, nh = n.h || blockH(n.b);
      if (fx < n.x + nw && fx + gw > n.x && fy < n.y + nh && fy + gh > n.y) return true;
    }
    return false;
  };

  /* ==== ドラッグ本体（1:1移植） ==== */
  const stagePos = e => {
    const r = stageRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const findBlock = (list, id) => {
    for (let i = 0; i < list.length; i++) {
      const b = list[i];
      if (b.id === id) return { list, index: i };
      if (isContainer(b.type)) { const f = findBlock(b.children, id); if (f) return f; }
    }
    return null;
  };
  const hasTrigger = type =>
    stacksRef.current.some(st => st.blocks[0] && st.blocks[0].type === type)
    || (dragRef.current && dragRef.current.group && dragRef.current.group[0] && dragRef.current.group[0].type === type);

  const beginDrag = (e, group, fromPalette, grabOffset) => {
    dragRef.current = { group, fromPalette, ox: grabOffset.x, oy: grabOffset.y, slot: null, groupH: stackH(group) };
    setFlyGroup(flattenGroup(group));
    const p = stagePos(e);
    const fly = flyRef.current;
    fly.style.display = "block";
    fly.style.transition = "";
    fly.style.transform = `translate(${p.x - grabOffset.x}px, ${p.y - grabOffset.y}px)`;
    fly.classList.remove("lift", "poof");
    void fly.offsetWidth;
    fly.classList.add("lift");
    sndPick();
    force();
  };
  const moveDrag = e => {
    const drag = dragRef.current;
    if (!drag) return;
    const p = stagePos(e);
    const fx = p.x - drag.ox, fy = p.y - drag.oy;
    flyRef.current.style.transform = `translate(${fx}px, ${fy}px)`;
    const pr = palRef.current.getBoundingClientRect();
    const overPal = e.clientX < pr.right && !drag.fromPalette;
    setDelHover(overPal);
    const prevSlot = drag.slot;
    drag.slot = overPal ? null : eligibleSlot(fx, fy);
    if (drag.slot !== prevSlot) { force(); if (drag.slot) sndTick(); }
  };
  const commitTo = (slot, group) => {
    // 磁石: 吸着アニメ → 挿入（1:1移植）
    const fly = flyRef.current;
    fly.classList.remove("lift");
    fly.style.transition = `transform ${ANIM.suck}ms ease-out, rotate ${ANIM.suck}ms, scale ${ANIM.suck}ms`;
    fly.style.transform = `translate(${slot.x}px, ${slot.y}px)`;
    dragRef.current.committing = true;
    setTimeout(() => {
      fly.style.transition = "";
      fly.style.display = "none";
      slot.list.splice(slot.index, 0, ...group);
      dragRef.current = null;
      setFlyGroup(null);
      force();
      sndSnap();
      setLandId(group[0].id);
      setTimeout(() => setLandId(null), ANIM.land + 40);
    }, ANIM.suck);
  };
  const endDrag = e => {
    const d = dragRef.current;
    if (!d) return;
    const p = stagePos(e);
    setDelHover(false);
    const pr = palRef.current.getBoundingClientRect();
    const overPal = e.clientX < pr.right && !d.fromPalette;

    if (overPal) {
      // たなへ捨てる: ポフッ
      const fly = flyRef.current;
      fly.classList.add("poof");
      sndPoof();
      d.slot = null; d.committing = true;
      setTimeout(() => {
        fly.classList.remove("poof");
        fly.style.display = "none";
        dragRef.current = null;
        setFlyGroup(null);
        force();
      }, 220);
      force();
      return;
    }
    if (d.slot) { commitTo(d.slot, d.group); return; }
    // 感知圏外だがブロックに重なって落ちた → 近くの接続先へ救済スナップ
    const fx = p.x - d.ox, fy = p.y - d.oy;
    if (overlapsAnyBlock(fx, fy, d.group)) {
      const rescue = eligibleSlot(fx, fy, G.RESCUE);
      if (rescue) { d.slot = rescue; commitTo(rescue, d.group); return; }
    }
    // どこでもない → 新しいスタックとして置く
    const nx = Math.max(6, fx), ny = Math.max(6, fy);
    stacksRef.current.push({ x: nx, y: ny, blocks: d.group });
    flyRef.current.style.display = "none";
    dragRef.current = null;
    setFlyGroup(null);
    force();
    setLandId(d.group[0].id);
    setTimeout(() => setLandId(null), ANIM.land + 40);
  };

  /* ==== ポインタ配線（documentへネイティブ登録・最初の1本指のみ） ==== */
  useEffect(() => {
    const onMove = e => {
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
      const pending = pendingRef.current;
      if (pending && !dragRef.current) {
        if (Math.hypot(e.clientX - pending.x0, e.clientY - pending.y0) > 6) {
          // 掴んだブロックから下をまとめて外す（束）
          let found = null;
          for (const st of stacksRef.current) { found = findBlock(st.blocks, pending.id); if (found) break; }
          if (found) {
            const group = found.list.splice(found.index);
            stacksRef.current = stacksRef.current.filter(st => st.blocks.length);
            beginDrag(e, group, false, pending.grab);
          }
          pendingRef.current = null;
        }
      }
      if (dragRef.current && !dragRef.current.committing) moveDrag(e);
    };
    const onUp = e => {
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
      pointerIdRef.current = null;
      pendingRef.current = null;
      if (dragRef.current && !dragRef.current.committing) endDrag(e);
    };
    const onCancel = e => {
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
      pointerIdRef.current = null;
      const d = dragRef.current;
      if (d && !d.committing && d.group) stacksRef.current.push({ x: 60, y: 60, blocks: d.group });
      pendingRef.current = null;
      dragRef.current = null;
      if (flyRef.current) flyRef.current.style.display = "none";
      setFlyGroup(null);
      force();
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onCancel);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onCancel);
    };
  }, []); // ハンドラはすべてrefを参照＝依存なしで安定

  /* ==== ステージ上のブロックを掴む ==== */
  const onStagePointerDown = e => {
    setPopTarget(null);
    ac(); // 初回pointerdownでAudioContext解錠
    if (pointerIdRef.current !== null) return; // 最初の1本指のみ
    const blkEl = e.target.closest(".blk");
    if (!blkEl || blkEl.closest(".studio-fly")) return;
    const id = +blkEl.dataset.id;
    const node = nodesRef.current.find(n => n.b.id === id);
    if (!node) return;
    pointerIdRef.current = e.pointerId;
    const p = stagePos(e);
    pendingRef.current = { x0: e.clientX, y0: e.clientY, id, grab: { x: p.x - node.x, y: p.y - node.y } };
  };

  /* ==== パレットから新規ブロック ==== */
  const onPalPointerDown = (e, type) => {
    e.preventDefault();
    ac();
    if (pointerIdRef.current !== null) return;
    if (isTrigger(type) && hasTrigger(type)) {
      // きっかけは1キャラにつき各1本＝プルッと拒否（音付き）。
      // プロトタイプと同じDOM直接操作（remove→reflow→add）＝拒否時は再レンダーが無いため安全
      const item = e.currentTarget;
      item.classList.remove("no"); void item.offsetWidth; item.classList.add("no");
      setTimeout(() => item.classList.remove("no"), 300);
      sndNo();
      return;
    }
    pointerIdRef.current = e.pointerId;
    const b = makeBlock(type);
    beginDrag(e, [b], true, { x: DEFS[type].w / 2, y: 20 });
  };

  /* ==== ピル（数値ステッパー／おと切替） ==== */
  const onPill = useCallback((e, b) => {
    ac();
    const d = DEFS[b.type];
    if (d.pill === "s") { // おとは タップで切り替え＋試聴
      b.s = (b.s + 1) % SOUNDS.length;
      SND[b.s]();
      force();
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const sr = stageRef.current.getBoundingClientRect();
    const px = Math.max(8, Math.min(sr.width - 160, rect.left - sr.left + rect.width / 2 - 76));
    const py = Math.max(6, rect.top - sr.top - 76);
    setPopTarget({ id: b.id, x: px, y: py });
  }, []);
  const stepVal = dir => {
    if (!popTarget) return;
    let found = null;
    for (const st of stacksRef.current) { found = findBlock(st.blocks, popTarget.id); if (found) break; }
    if (!found) return;
    const b = found.list[found.index];
    const d = DEFS[b.type];
    const nv = Math.max(d.min, Math.min(d.max, b.n + dir));
    if (nv !== b.n) { b.n = nv; sndTick(); }
    force();
  };
  const popVal = (() => {
    if (!popTarget) return null;
    for (const st of stacksRef.current) { const f = findBlock(st.blocks, popTarget.id); if (f) return f.list[f.index].n; }
    return null;
  })();

  /* ==== 描画 ==== */
  const { nodes } = layoutAll();
  const drag = dragRef.current;
  const ghost = drag && drag.slot ? {
    w: DEFS[drag.group[0].type].w,
    h: drag.groupH - 4,
    x: drag.slot.x, y: drag.slot.y,
  } : null;

  return (
    <div className="studio-root">
      <style>{STUDIO_CSS}</style>
      <header>
        <div className="mark">
          <svg width="17" height="17" viewBox="0 0 17 17"><path d="M2 15V2h9l-2.6 3.4L11 9H4.2" fill="none" stroke="#4a2c05" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" /></svg>
        </div>
        <div>
          <h1>つくるスタジオ ブロック見本（段階0）</h1>
          <div className="sub">18種を つかむ・つなぐ・はずす（#studio-dev 開発用ルート）</div>
        </div>
        <button style={{ marginLeft: "auto" }} onClick={() => {
          stacksRef.current = initialScene();
          dragRef.current = null; setFlyGroup(null); setPopTarget(null); force();
        }}>さいしょから</button>
        <button onClick={() => { window.location.hash = ""; }}>◀ アプリへ</button>
      </header>
      <div className="studio-wrap">
        {/* こうぐだな（18種・カテゴリ順）。プロトタイプの縦1列は18種で画面に収まらないため2列に（見た目・挙動は同一） */}
        <div className={"studio-pal" + (delHover ? " del" : "")} ref={palRef}>
          <div className="shelf-title">こうぐだな</div>
          <div className="delmsg">ここで はなすと<br />けせるよ</div>
          <div className="palgrid">
            {PALORDER.map(t => {
              const d = DEFS[t];
              const mouth = d.shape === "c" ? G.MOUTH : 0;
              const hh = d.shape === "hat" ? G.HATH : d.shape === "c" ? G.TB + mouth + G.BB : G.H;
              const pChipY = chipY(t);
              const pOff = (G.CHIP - G.ICON) / 2;
              const off = isTrigger(t) && hasTrigger(t);
              return (
                <div key={t} className={"pal" + (off ? " off" : "")}
                  onPointerDown={e => onPalPointerDown(e, t)}>
                  <svg width="128" height={(hh + G.TD + 8) * 0.5} viewBox={`-1 ${d.shape === "hat" ? -6 : -2} ${d.w + 4} ${hh + G.TD + 10}`}>
                    <path d={d.shape === "hat" ? pathHat(d.w) : d.shape === "c" ? pathC(d.w, mouth, !!d.flat) : pathBody(d.w)}
                      fill={d.fill} stroke={d.edge} strokeWidth="2.5" />
                    <rect x={G.CHIPX} y={pChipY} width={G.CHIP} height={G.CHIP} rx="11" fill="#FFFDF6" stroke="rgba(0,0,0,.10)" strokeWidth="1" />
                    <image href={d.icon} x={G.CHIPX + pOff} y={pChipY + pOff} width={G.ICON} height={G.ICON} />
                    <text x={G.LABELX} y={d.shape === "hat" ? 42 : 32} fill="#fff" fontSize="21" fontWeight="900"
                      fontFamily="'M PLUS Rounded 1c', sans-serif">{d.label}</text>
                  </svg>
                  <div className="pname">{d.cat}</div>
                </div>
              );
            })}
          </div>
        </div>
        {/* 組み立てステージ */}
        <div className="studio-stage" ref={stageRef} onPointerDown={onStagePointerDown}>
          <div className="hint">
            かくにん: 18種のブロックを つかむ・つなぐ・はずす ／ 数字タップで −＋ ／ おとタップで切替 ／
            けすときは たなへ ドラッグ ／ きっかけは 各1本まで
          </div>
          {/* スナップ先ゴースト（常設・transitionで滑る） */}
          <div className="studio-ghost" style={{
            display: ghost ? "block" : "none",
            width: ghost ? ghost.w : 0, height: ghost ? ghost.h : 0,
            transform: ghost ? `translate(${ghost.x}px, ${ghost.y}px)` : undefined,
          }} />
          {/* ブロック（絶対配置・zIndexは並び順） */}
          {nodes.map((n, order) => (
            <StudioBlock key={n.b.id} b={n.b} mouth={n.mouth || 0} x={n.x} y={n.y} z={10 + order}
              land={landId === n.b.id} onPill={onPill} />
          ))}
          {/* 数値ステッパー */}
          {popTarget && popVal !== null && (
            <div className="studio-pop" style={{ left: popTarget.x, top: popTarget.y }}
              onPointerDown={e => e.stopPropagation()}>
              <button className="minus" onClick={() => stepVal(-1)}>−</button>
              <div className="val">{popVal}</div>
              <button className="plus" onClick={() => stepVal(1)}>＋</button>
            </div>
          )}
          {/* 持ち上げ中の束 */}
          <div className="studio-fly" ref={flyRef} style={{ display: "none" }}>
            {flyGroup && flyGroup.map(f => (
              <StudioBlock key={"fly" + f.b.id} b={f.b} mouth={f.mouth} x={f.x} y={f.y} z={1} inFly />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
