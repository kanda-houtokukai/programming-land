// 共通部品: 作品エディタ本体（段階A §3-3 で StudioEditor.jsx から改名・モード注入化）。
// つくるスタジオ／ゲームこうぼう（段階1〜）が共有する。スタジオ固有物（保存モデル・棚の語彙・
// パレット構成・背景・文言・マーク）はすべて props の mode（src/studio/mode.jsx 等）経由で受ける。
// 仕様の正本: brushup/studio-implementation-stage01.md §3 ＋ stage2.md §1/§2/§4 ／ 設計: brushup/studio-design.md。
// ★段階Aの変更は「mode 注入への置換」のみ。ドラッグ・スナップ・実行まわりの手触りコードには
//   手を入れていない（等価変換・回帰ハーネスで機械保証）。§11の数値は変更禁止。
// ★matchMedia/ResizeObserverは使わない（過去2件の障害実績）。縮尺は window resize＋同一式のみ。
// ★実行エンジンは src/workshop/engine.js（UI非依存）。この画面は TICK ごとに tick() を呼び、
//   コールバック（位置更新/発光/効果音）を描画に反映するだけ。
import { useReducer, useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { isTrigger, isContainer, makeBlock, cloneBlocks } from "../data/studio-blocks.js";
import { G, ANIM, pathBody, pathHat, pathC, gloss, chipY, labelY, blockH, stackH, containerDepth } from "../workshop/geometry.js";
import { createEngine, TICK, LCOLS, LROWS, SIZE_STEPS, SIZE_INIT } from "../workshop/engine.js";
import { lastProfile, saveProfile } from "../storage.js";
import { playJingle } from "../bgm.js";
import { buildCast, kindImg, kindName, kindValid } from "../workshop/cast.js";
import iconCoin from "../assets/icon_stat_coin.png";
import PlayerAvatar from "./PlayerAvatar.jsx";
import StudioBlock from "./StudioBlock.jsx";

/* ============ 調整値（マジックナンバー集約・憲章§4-4） ============ */
const CFG = {
  MAX_CHARS: 5,        // キャラ最大（設計§4）
  STACK_MAX: 30,       // 1スタックのカード上限（設計§5）
  UNDO: 20,            // とりけし履歴（設計§9）
  DRAFT_DEBOUNCE: 500, // かきかけ自動保存のデバウンス(ms)
  LONGPRESS: 500,      // 長押しコピー(ms)（指示書§3-3）
  DRAG_START: 6,       // ドラッグ開始のしきい値(px)（プロトタイプ準拠）
  ACTOR_K: 2.2,        // キャラ表示幅 = cellPx×これ（プロトタイプ実測値）
  JUMP_K: 1.6,         // ジャンプ高さ = cellPx×これ（§11）
  MOVE_MS: 340,        // 1マス移動のtransition(ms)（プロトタイプ .34s）
  COPY_OFFSET: 26,     // コピーが「隣に出現」するずらし(px)
  TOAST_MS: 3500,      // かきかけトーストの表示時間(ms)
};
// 背景5種は src/data/studio-bgs.js（BGS）に移動（段階2 §0-1・Home/サムネと共有）

/* ============ サウンド（プロトタイプのWebAudio簡易音・Suno差し替えは段階3） ============ */
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
const sndClap = () => { tone(1050, 0.06, "square", 0.12); setTimeout(() => tone(700, 0.08, "square", 0.1), 60); }; // ▶=カチンコ
const sndCut = () => tone(500, 0.1, "sine", 0.14);                                                                // ■=カット!
export const SND = [
  () => tone(440, 0.16, "sine", 0.2),
  () => { tone(880, 0.09, "sine", 0.16); setTimeout(() => tone(1320, 0.14, "sine", 0.16), 70); },
  () => tone(120, 0.22, "sine", 0.28),
];

/* 控え室の顔ぶれ・キャラ種別ヘルパーは src/workshop/cast.js（段階2で分離・段階Aでworkshopへ・Home/サムネと共有） */

/* ============ CSS ============ */
const STUDIO_CSS = `
  .studio-root { position: fixed; inset: 0; z-index: 200; display: flex; flex-direction: column;
    background: #2e2237; user-select: none; -webkit-user-select: none; overflow: hidden;
    font-family: 'M PLUS Rounded 1c','Hiragino Maru Gothic ProN','Yu Gothic',sans-serif; }
  .studio-root header { display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: #241a2c; color: #f5eddf; }
  .studio-root header .mark { width: 30px; height: 30px; border-radius: 8px; background: #f2b23a; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    box-shadow: inset 0 2px 0 rgba(255,255,255,.45), 0 2px 0 rgba(0,0,0,.35); }
  .studio-root header h1 { font-size: 15px; font-weight: 900; letter-spacing: .06em; white-space: nowrap; }
  .studio-root header .sub { font-size: 11px; opacity: .65; font-weight: 500; }
  .studio-root header button { font-family: inherit; font-weight: 700; font-size: 12px;
    color: #f5eddf; background: #4a3a58; border: none; border-radius: 999px; padding: 7px 14px;
    box-shadow: inset 0 1.5px 0 rgba(255,255,255,.18), 0 2px 0 rgba(0,0,0,.3); cursor: pointer; white-space: nowrap; }
  .studio-root header button:active { transform: translateY(1px); box-shadow: inset 0 1.5px 0 rgba(255,255,255,.18); }
  .studio-root header button:disabled { opacity: .35; cursor: default; }
  .studio-wrap { flex: 1; display: flex; min-height: 0; }

  /* --- 左: こうぐだな（段階0のまま） --- */
  .studio-pal { width: 300px; flex-shrink: 0; background: linear-gradient(180deg, #8a5a33, #6f4526);
    border-right: 4px solid #543317; padding: 10px 10px; position: relative; z-index: 5;
    transition: background .15s; touch-action: pan-y; overflow-y: auto; } /* palette-fixes: 縦スワイプはブラウザにスクロールさせる（横はカード取り出し） */
  .studio-pal .shelf-title { color: #f7e6c8; font-size: 12px; font-weight: 900; text-align: center;
    letter-spacing: .12em; margin-bottom: 8px; text-shadow: 0 1px 0 rgba(0,0,0,.4); }
  .studio-pal .palgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
  .studio-pal.del { background: linear-gradient(180deg, #a03a35, #7c2723); border-right-color: #5c1512; }
  .studio-pal.del .pal { opacity: .25; }
  .studio-pal .delmsg { position: absolute; inset: 0; display: none; align-items: center; justify-content: center;
    color: #ffe9e2; font-weight: 900; font-size: 14px; text-align: center; line-height: 1.6; pointer-events: none; }
  .studio-pal.del .delmsg { display: flex; }
  .studio-pal .pal { background: rgba(255, 244, 220, .12); border: 2px solid rgba(255, 244, 220, .18);
    border-radius: 12px; padding: 7px 6px 5px; cursor: grab; touch-action: pan-y;
    transition: transform .12s, opacity .15s; }
  .studio-pal .pal:active { transform: scale(.96); }
  .studio-pal .pal.off { opacity: .35; }
  @keyframes sbPalNo { 0%,100% { transform: none; } 25% { transform: translateX(4px); } 60% { transform: translateX(-4px); } }
  .studio-pal .pal.no { animation: sbPalNo .25s; }
  .studio-pal .pal svg { display: block; margin: 0 auto; }
  .studio-pal .pal .pname { text-align: center; color: #f7e6c8; font-size: 10px; font-weight: 700; margin-top: 2px; }

  /* --- 中央: 組み立てエリア（段階0のステージと同じ作法） --- */
  .studio-asm { flex: 1; position: relative; overflow: hidden; min-width: 0;
    background:
      radial-gradient(circle at 50% -10%, rgba(255, 224, 150, .25), transparent 55%),
      repeating-linear-gradient(0deg, transparent 0 34px, rgba(120, 90, 60, .05) 34px 35px),
      repeating-linear-gradient(90deg, transparent 0 34px, rgba(120, 90, 60, .05) 34px 35px),
      #fdf6e8;
    touch-action: none; }
  .studio-asm::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 10px;
    background: linear-gradient(180deg, rgba(84, 51, 23, .0), rgba(84, 51, 23, .25)); pointer-events: none; }
  .studio-asm .hint { position: absolute; left: 14px; bottom: 14px; right: 14px;
    color: #8a6b4a; font-size: 11px; font-weight: 700; line-height: 1.7; pointer-events: none; }
  .studio-asm .selchip { position: absolute; left: 10px; top: 10px; z-index: 55; pointer-events: none;
    display: flex; align-items: center; gap: 7px; background: rgba(255,253,246,.92);
    border: 2px solid rgba(84,51,23,.25); border-radius: 999px; padding: 4px 14px 4px 6px;
    color: #6b4a26; font-size: 12px; font-weight: 900; }
  .studio-asm .selchip img, .studio-asm .selchip .pav { width: 26px; height: 26px; object-fit: contain; display: block; }
  .studio-root .blk { position: absolute; left: 0; top: 0;
    transition: transform ${ANIM.shift}; touch-action: none; cursor: grab;
    filter: drop-shadow(0 1.5px 0 rgba(90, 60, 20, .28)); }
  .studio-root .blk.noanim { transition: none; }
  .studio-root .blk svg { display: block; overflow: visible; }
  .studio-root .blk.exec svg { filter: drop-shadow(0 0 6px #ffd85e) drop-shadow(0 0 2px #ffb51e) brightness(1.12); }
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
  .copy-balloon { position: absolute; z-index: 95; background: #fffdf6; color: #6b4a26;
    border-radius: 999px; padding: 8px 20px; font-size: 14px; font-weight: 900; border: none;
    font-family: inherit; cursor: pointer; box-shadow: 0 6px 18px rgba(60, 30, 10, .3), inset 0 2px 0 #fff; }
  .copy-balloon::after { content: ""; position: absolute; left: 50%; bottom: -7px; width: 14px; height: 14px;
    background: #fffdf6; transform: translateX(-50%) rotate(45deg); border-radius: 3px; }
  .copy-balloon:active { transform: scale(.95); }

  /* --- 右: ステージペイン --- */
  .studio-right { width: clamp(280px, 36vw, 620px); flex-shrink: 0; display: flex; flex-direction: column;
    gap: 8px; padding: 10px; overflow-y: auto; }
  .theater { position: relative; width: 100%; aspect-ratio: 3 / 2; flex-shrink: 0; border-radius: 14px;
    border: 4px solid #241a2c; overflow: hidden; background: #1c1424; touch-action: none; }
  .theater .bgimg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
  .theater::before, .theater::after { content: ""; position: absolute; top: 0; bottom: 0; width: 14px; z-index: 40;
    background: repeating-linear-gradient(90deg, #8e3040 0 6px, #6e2130 6px 12px);
    box-shadow: 0 0 12px rgba(0,0,0,.5); pointer-events: none; }
  .theater::before { left: 0; border-radius: 0 8px 8px 0; }
  .theater::after { right: 0; border-radius: 8px 0 0 8px; }
  .actor { position: absolute; bottom: 12px; left: 0; will-change: transform;
    transition: transform ${CFG.MOVE_MS}ms cubic-bezier(.45, .05, .55, 1), opacity .25s; }
  .actor.noanim { transition: opacity .25s; }
  .actor .sp-spot { position: absolute; left: 50%; bottom: -5px; transform: translateX(-50%); z-index: -1;
    border-radius: 50%; background: radial-gradient(ellipse at center, rgba(255,230,120,.7), rgba(255,230,120,0) 72%);
    pointer-events: none; }
  .actor .sp-in { transform-origin: 50% 100%; }
  .actor .sp-spin { transform-origin: 50% 55%; }
  .actor .sp-scale { transform-origin: 50% 100%; transition: transform .3s ease-out; }
  @keyframes sbHop { 0% { transform: translateY(0); } 40% { transform: translateY(var(--hopH, -46px)) scaleY(1.06); }
    72% { transform: translateY(0) scaleY(.88) scaleX(1.09); } 100% { transform: none; } }
  .actor .sp-in.hopA { animation: sbHop ${TICK * 2}ms cubic-bezier(.35, 0, .35, 1); }
  @keyframes sbStep { 0%, 100% { transform: none; } 50% { transform: scaleY(.93) translateY(1.5px); } }
  .actor .sp-in.stepA { animation: sbStep .34s ease-out; }
  @keyframes sbBump { 0%, 100% { transform: none; } 30% { transform: translateX(6px) rotate(2deg); }
    60% { transform: translateX(-5px); } }
  .actor .sp-in.bumpA { animation: sbBump .3s ease-out; }
  @keyframes sbSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .actor .sp-spin.spinA { animation: sbSpin ${TICK * 2}ms linear; }
  /* --- ゲームの器（stage1）: スコアHUD。isGame のときだけ描画される＝studio には出ない --- */
  .theater .scoreHud { position: absolute; left: 50%; top: 10px; transform: translateX(-50%); z-index: 45;
    background: rgba(36,26,44,.78); color: #ffe9b8; font-size: 24px; font-weight: 900; letter-spacing: .04em;
    border-radius: 999px; padding: 6px 22px; pointer-events: none; }
  .theater .scoreHud.pop { animation: sbScorePop .3s; }
  @keyframes sbScorePop { 0% { transform: translateX(-50%) scale(1); } 40% { transform: translateX(-50%) scale(1.25); } 100% { transform: translateX(-50%) scale(1); } }

  /* --- ゲームの器（stage1）: せっていパネル・おいわい。isGame のときだけ描画される --- */
  .gamecfg { margin-top: 8px; }
  .gamecfg .gc-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .gamecfg .gc-toggle { font-family: inherit; font-weight: 900; font-size: 12px; color: #f5eddf;
    background: #4a3a58; border: none; border-radius: 999px; padding: 7px 14px; cursor: pointer;
    box-shadow: inset 0 1.5px 0 rgba(255,255,255,.18), 0 2px 0 rgba(0,0,0,.3); }
  .gamecfg .gc-toggle.on { background: #58a839; }
  .gamecfg .gc-toggle:active { transform: translateY(1px); }
  .gamecfg .gc-toggle:disabled, .gamecfg .gc-step:disabled { opacity: .4; cursor: default; }
  .gamecfg .gc-goal { display: inline-flex; align-items: center; gap: 7px; color: #f5eddf;
    font-size: 12px; font-weight: 900; background: rgba(36,26,44,.6); border-radius: 999px; padding: 4px 8px; }
  .gamecfg .gc-num { color: #ffe9b8; font-size: 14px; }
  .gamecfg .gc-step { width: 26px; height: 26px; border-radius: 50%; border: none; cursor: pointer;
    font-family: inherit; font-weight: 900; font-size: 15px; color: #fff; background: #4a7fc9;
    box-shadow: inset 0 -2px 0 rgba(0,0,0,.25); }
  .gamecfg .gc-step:active { transform: translateY(1px); }
  /* stage2: せってい拡張（クリア3択・ばくだん選び）。isGame のときだけ描画される */
  .gamecfg .gc-row + .gc-row { margin-top: 7px; }
  .gamecfg .gc-cap { color: #f5eddf; font-size: 12px; font-weight: 900; }
  .gamecfg .gc-seg { font-family: inherit; font-weight: 900; font-size: 12px; color: #f5eddf;
    background: #4a3a58; border: none; border-radius: 999px; padding: 6px 13px; cursor: pointer;
    box-shadow: inset 0 1.5px 0 rgba(255,255,255,.18), 0 2px 0 rgba(0,0,0,.3); }
  .gamecfg .gc-seg.on { background: #58a839; }
  .gamecfg .gc-seg:active { transform: translateY(1px); }
  .gamecfg .gc-seg:disabled { opacity: .4; cursor: default; }
  .gamecfg .gc-bombs { display: inline-flex; gap: 6px; }
  .gamecfg .gc-bomb { position: relative; width: 38px; height: 38px; border-radius: 10px; padding: 2px;
    border: 2px solid rgba(255,244,220,.25); background: rgba(255,244,220,.12); cursor: pointer; }
  .gamecfg .gc-bomb img { width: 100%; height: 100%; object-fit: contain; display: block; }
  .gamecfg .gc-bomb.on { border-color: #e0704f; background: rgba(224,112,79,.28); }
  .gamecfg .gc-bomb .skull { position: absolute; right: -7px; top: -9px; font-size: 14px; }
  .gamecfg .gc-bomb:disabled { opacity: .4; cursor: default; }
  .theater .gameclear { position: absolute; inset: 0; z-index: 60; display: flex; align-items: center;
    justify-content: center; background: rgba(30,20,40,.35); overflow: hidden; }
  .theater .gameclear .confetti { position: absolute; top: -12px; width: 9px; height: 14px; border-radius: 2px;
    animation: sbConfetti linear infinite; }
  @keyframes sbConfetti { 0% { transform: translateY(-14px) rotate(0deg); } 100% { transform: translateY(110%) rotate(540deg); } }
  .theater .gameclear .gc-box { background: #fffdf6; border-radius: 18px; padding: 16px 26px; text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,.4); }
  .theater .gameclear .gc-title { color: #4a3520; font-size: 20px; font-weight: 900; }
  .theater .gameclear .gc-score { color: #b8860b; font-size: 30px; font-weight: 900; margin: 8px 0 12px; }
  .theater .gameclear button { display: block; width: 100%; font-family: inherit; font-weight: 900; font-size: 14px;
    border: none; cursor: pointer; border-radius: 999px; padding: 10px 0; margin: 7px 0; color: #fff;
    box-shadow: inset 0 -3px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.15); }
  .theater .gameclear .gc-again { background: #58a839; }
  .theater .gameclear .gc-fix { background: #4a7fc9; }
  .theater .gameclear button:active { transform: translateY(2px); }

  .theater .roundbtn { position: absolute; z-index: 50; width: 42px; height: 42px; border-radius: 50%;
    border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
    box-shadow: inset 0 3px 0 rgba(255,255,255,.35), inset 0 -4px 0 rgba(0,0,0,.25), 0 3px 0 rgba(0,0,0,.4); }
  .theater .roundbtn:active { transform: translateY(2px); }
  .theater .runbtn { right: 12px; top: 12px; background: #58a839; }
  .theater .runbtn.stop { background: #d8553a; }
  .theater .bigbtn { right: 60px; top: 12px; background: #4a7fc9; }

  .bgrow, .castrow { flex-shrink: 0; }
  .rowtitle { color: rgba(245, 237, 223, .75); font-size: 11px; font-weight: 900; letter-spacing: .08em; margin-bottom: 4px; }
  .bgrow .thumbs { display: flex; gap: 6px; }
  .bgrow .bgthumb { position: relative; border: 2.5px solid rgba(255,244,220,.25); border-radius: 8px; padding: 0;
    background: none; cursor: pointer; overflow: hidden; flex: 1; min-width: 0; }
  .bgrow .bgthumb img { display: block; width: 100%; aspect-ratio: 16/10; object-fit: cover; }
  .bgrow .bgthumb .bgname { position: absolute; left: 0; right: 0; bottom: 0; font-family: inherit;
    background: rgba(36,26,44,.72); color: #f5eddf; font-size: 9px; font-weight: 700; text-align: center; padding: 1px 0; }
  .bgrow .bgthumb.on { border-color: #ffd447; box-shadow: 0 0 8px rgba(255,212,71,.5); }
  .castrow .strip { display: flex; gap: 6px; overflow-x: auto; padding: 6px; border-radius: 12px;
    background: rgba(255,244,220,.08); border: 2px solid rgba(255,244,220,.14); transition: background .15s; position: relative; }
  .castrow .strip.del { background: rgba(160,58,53,.55); border-color: #a03a35; }
  .castrow .strip.del .castchip { opacity: .3; }
  .castrow .strip .stripdelmsg { display: none; position: absolute; inset: 0; align-items: center; justify-content: center;
    color: #ffe9e2; font-size: 12px; font-weight: 900; pointer-events: none; }
  .castrow .strip.del .stripdelmsg { display: flex; }
  .castchip { flex-shrink: 0; width: 52px; border: 2px solid rgba(255,244,220,.2); border-radius: 10px;
    background: rgba(255,253,246,.12); padding: 3px 2px 2px; cursor: pointer; font-family: inherit; }
  .castchip:active { transform: scale(.94); }
  .castchip.no { animation: sbPalNo .25s; }
  .castchip img { display: block; width: 100%; height: 34px; object-fit: contain; }
  .castchip .cname { color: #f7e6c8; font-size: 8px; font-weight: 700; text-align: center; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis; margin-top: 1px; }
  .rcap { color: rgba(245, 237, 223, .55); font-size: 10px; font-weight: 700; line-height: 1.6; flex-shrink: 0; }

  /* --- 実行中: たな・組み立てを暗転＋操作ロック（発光追跡のみ動く） --- */
  .studio-root.running .studio-pal, .studio-root.running .bgrow, .studio-root.running .castrow, .studio-root.running .rcap,
  .studio-root.running .editbtn { filter: brightness(.55); pointer-events: none; }
  .studio-root.running .studio-asm { filter: brightness(.55); }
  .studio-root.running .studio-asm * { pointer-events: none; }
  .studio-root.running .blk { cursor: default; }

  /* --- ひろげる（全画面上演: 編集UI消灯） --- */
  .studio-root.big .studio-pal, .studio-root.big .studio-asm, .studio-root.big .bgrow,
  .studio-root.big .castrow, .studio-root.big .rcap, .studio-root.big .editbtn { display: none; }
  .studio-root.big .studio-right { width: auto; flex: 1; align-items: center; justify-content: center; }
  .studio-root.big .theater { width: min(100%, calc((100dvh - 110px) * 1.5)); }

  /* --- 確認モーダル（キャラ削除のみ・設計§9「ここだけ確認」）とトースト --- */
  .studio-confirm { position: absolute; inset: 0; z-index: 350; background: rgba(30,20,40,.55);
    display: flex; align-items: center; justify-content: center; }
  .studio-confirm .box { background: #fffdf6; border-radius: 18px; padding: 20px 24px; max-width: 320px;
    box-shadow: 0 10px 30px rgba(0,0,0,.4); text-align: center; }
  .studio-confirm .msg { color: #4a3520; font-size: 14px; font-weight: 900; line-height: 1.8; margin-bottom: 14px; }
  .studio-confirm button { font-family: inherit; font-weight: 900; font-size: 14px; border: none; cursor: pointer;
    border-radius: 999px; padding: 9px 22px; margin: 0 6px; color: #fff;
    box-shadow: inset 0 -3px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.15); }
  .studio-confirm .yes { background: #e0704f; }
  .studio-confirm .no { background: #8a9a55; }
  .studio-confirm .ok { background: #58a839; }
  .studio-confirm input { width: 100%; box-sizing: border-box; font-family: inherit; font-size: 20px;
    font-weight: 700; padding: 8px 12px; border: 3px solid #4a3520; border-radius: 12px;
    margin-bottom: 14px; text-align: center; background: #fff; color: #4a3520; }
  .studio-root header .savebtn { background: #58a839; }
  /* 上演専用（§4）: 全画面固定＝ひろげるボタンも出さない（編集UIはbigのCSSで消灯済み） */
  .studio-root.showonly .bigbtn { display: none; }
  .studio-toast { position: absolute; left: 50%; top: 64px; transform: translateX(-50%); z-index: 300;
    background: rgba(36,26,44,.92); color: #ffe9b8; font-size: 13px; font-weight: 900;
    border-radius: 999px; padding: 9px 22px; pointer-events: none; white-space: nowrap;
    box-shadow: 0 6px 18px rgba(0,0,0,.35); }

  /* --- 狭い画面: 案内のみ（判定はCSS幅のみ・向き検出JS禁止） --- */
  .studio-narrow { display: none; position: absolute; inset: 0; z-index: 400; background: #2e2237;
    align-items: center; justify-content: center; color: #f5eddf; font-size: 16px; font-weight: 900;
    text-align: center; line-height: 2; }
  @media (max-width: 699px) { .studio-narrow { display: flex; } .studio-wrap { display: none; } }
`;

/* ==== ゲームこうぼうの見た目（stage2 §B・基準=brushup/gamelab-editor-mock.html） ====
   .studio-root.gl のオーバーライドのみ＝studio には .gl が付かないので1pxも影響しない。
   方針（B-4・合意済み）: 地は「涼しく明るいツール」（スタジオの茶と別世界）。ただし角丸・ひらがな・
   柔らかい色で冷たくしない。値はすべてモックの初期値＝実機で微調整可。凸凹ブロックのパスは不変。 */
const GAMELAB_CSS = `
  .studio-root.gl { background: #e7ecf2; }
  .studio-root.gl header { background: #fbfcfe; border-bottom: 1px solid #dbe2ea; color: #33404f; }
  .studio-root.gl header .mark { background: #eaf1fb; box-shadow: inset 0 0 0 1.5px #cfe0f5; }
  .studio-root.gl header h1 { color: #33404f; }
  .studio-root.gl header .sub { color: #5b6675; opacity: 1; }
  .studio-root.gl header button { color: #33404f; background: #eef2f7;
    box-shadow: inset 0 -2px 0 rgba(0,0,0,.06); }
  .studio-root.gl header button.savebtn { background: #58a839; color: #fff; }
  .studio-root.gl header button:active { transform: translateY(1px); box-shadow: none; }

  /* --- 左: こうぐだな（B-1: 枠なし・見出し1回・自動幅・明るい涼しめ） --- */
  .studio-root.gl .studio-pal { width: 252px; background: #f3f6fa; border-right: 1px solid #dbe2ea; padding: 12px 12px 6px; }
  .studio-root.gl .studio-pal .shelf-title { color: #33404f; text-shadow: none; letter-spacing: .03em; margin-bottom: 11px; }
  .studio-root.gl .studio-pal.del { background: #fbe9e5; border-right-color: #e0704f; }
  .studio-root.gl .studio-pal .delmsg { color: #b3402f; }
  .glsec { margin-bottom: 13px; }
  .glsec-h { display: flex; align-items: center; gap: 7px; margin: 0 2px 8px; }
  .glsec-h .dot { width: 10px; height: 10px; border-radius: 3px; }
  .glsec-h .nm { font-size: 11px; font-weight: 900; color: #5b6675; letter-spacing: .05em; }
  .glsec-h .ln { flex: 1; height: 1px; background: #dbe2ea; }
  .glcards { display: flex; flex-wrap: wrap; gap: 9px 10px; align-items: flex-start; }
  .studio-root.gl .studio-pal .pal.glpal { background: none; border: none; padding: 0; border-radius: 0; position: relative; }
  .studio-root.gl .studio-pal .pal.glpal svg { margin: 0; display: block; }
  .gllbl { position: absolute; display: flex; align-items: center; gap: 6px; color: #fff; font-weight: 800;
    font-size: 14px; white-space: nowrap; pointer-events: none; text-shadow: 0 1px 1px rgba(0,0,0,.12); }
  .gllbl .glpill { background: rgba(255,255,255,.9); color: #2b2b2b; font-size: 11px; font-weight: 900;
    border-radius: 8px; padding: 1px 6px; text-shadow: none; }

  /* --- 中央: 組み立てキャンバス（B-2: 淡いドット・地だけ変更） --- */
  .studio-root.gl .studio-asm { background: #fcfdff;
    background-image: radial-gradient(#e3e9f1 1.3px, transparent 1.3px); background-size: 20px 20px; }
  .studio-root.gl .studio-asm::after { background: none; }
  .studio-root.gl .studio-asm .hint { color: #8b98a8; }
  .studio-root.gl .selchip { background: #fff; border: 1px solid #dbe2ea; color: #33404f;
    box-shadow: 0 1px 3px rgba(0,0,0,.06); }

  /* --- 右: ステージ額装＋操作盤（B-3: 白カード＋見出し） --- */
  .studio-root.gl .studio-right { background: #f3f6fa; border-left: 1px solid #dbe2ea; }
  .studio-root.gl .theater { border-radius: 15px;
    box-shadow: inset 0 0 0 3px #fff, 0 6px 16px rgba(0,0,0,.18); }
  .studio-root.gl .gamecfg, .studio-root.gl .bgrow, .studio-root.gl .castrow {
    background: #fff; border: 1px solid #dbe2ea; border-radius: 13px; padding: 11px 12px;
    margin-top: 12px; box-shadow: 0 1px 3px rgba(0,0,0,.05); }
  .studio-root.gl .rowtitle { color: #5b6675; text-shadow: none; }
  .studio-root.gl .rcap { color: #8b98a8; }
  .studio-root.gl .gamecfg .gc-cap { color: #33404f; }
  .studio-root.gl .gamecfg .gc-toggle, .studio-root.gl .gamecfg .gc-seg {
    color: #33404f; background: #eef2f7; box-shadow: inset 0 -2px 0 rgba(0,0,0,.06); }
  .studio-root.gl .gamecfg .gc-toggle.on, .studio-root.gl .gamecfg .gc-seg.on { background: #58a839; color: #fff; }
  .studio-root.gl .gamecfg .gc-goal { color: #33404f; background: #f1f4f8; }
  .studio-root.gl .gamecfg .gc-num { color: #b8860b; }
  .studio-root.gl .gamecfg .gc-bomb { border-color: #dbe2ea; background: #eef2f7; }
  .studio-root.gl .gamecfg .gc-bomb.on { border-color: #e0704f; background: rgba(224,112,79,.18); }
`;

/* fly（持ち上げ中の束）の描画用: グループをフラットな配置リストに展開（段階0と同じ） */
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
const countBlocks = list => (list || []).reduce((a, b) => a + 1 + (b.children ? countBlocks(b.children) : 0), 0);

/* ============ キャラ1体のステージ描画 ============ */
function CharSprite({ ch, disp, cellPx, base, selected, running, instant, profile, onRef }) {
  const w = base;
  const ax = 22 + disp.x * cellPx;   // プロトタイプ placeActor と同じ式（22はステージ左マージン）
  const ay = -disp.y * cellPx;
  return (
    <div className={"actor" + (instant ? " noanim" : "")} data-cid={ch.cid} ref={onRef}
      style={{ transform: `translate(${ax}px, ${ay}px)`, width: w, zIndex: 10 + ch.z,
        opacity: disp.visible ? 1 : 0, pointerEvents: disp.visible ? "auto" : "none",
        cursor: running ? "pointer" : "grab" }}>
      {selected && !running && <div className="sp-spot" style={{ width: w * 1.25, height: cellPx * 0.62 }} />}
      <div className="sp-in">
        <div className="sp-spin">
          <div className="sp-scale" style={{ transform: `scale(${SIZE_STEPS[disp.sizeIdx]})` }}>
            {ch.kind.type === "player"
              ? <PlayerAvatar character={(profile && profile.character) || "boy"} dressup={profile && profile.dressup} size={w} full />
              : <img src={kindImg(ch.kind)} alt="" draggable="false"
                  style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(1px 2px 2px rgba(20,15,25,.35))" }} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* props（段階2 §1＋段階A §3-3）:
   mode     … モード設定（src/studio/mode.jsx の STUDIO_MODE 等）。blocks/bgs/space/works/texts/mark
   open     … null=draftの続き ／ {bg, chars, name, origin} = 作品orみほんを開く（開いた瞬間コピー＝ID全振り直し・原本不変）
   showOnly … true=上演専用（編集UI非表示・big固定・draftに一切書かない・§4）
   onExit   … Home へ戻る */
export default function WorkshopEditor({ mode, open = null, showOnly = false, onExit }) {
  const [, force] = useReducer(x => x + 1, 0);
  // モード注入（段階A §3-3）: モード固有物はこの5行の先でだけ触る
  const { DEFS, PALORDER, SOUNDS } = mode.blocks;
  const BGS = mode.bgs;
  const { saveWork, nextWorkName, NAME_MAX, MILESTONE_NAMES } = mode.works;
  const space = mode.space;
  const TXT = mode.texts;

  /* ==== 初期化（プロファイル＋open／draft復帰） ==== */
  const initRef = useRef(null);
  if (!initRef.current) {
    const profile = lastProfile();
    // シーン読み込み共通: kind検証・位置クランプ・ブロックIDは全振り直し（cloneBlocks＝コピーとして開く）
    const loadScene = src => src.chars.filter(c => kindValid(c.kind)).slice(0, CFG.MAX_CHARS).map((c, i) => ({
      cid: "c" + (i + 1), kind: c.kind,
      x: Math.max(0, Math.min(LCOLS - 1, c.x | 0)), y: Math.max(0, Math.min(LROWS - 1, c.y | 0)),
      stacks: (c.stacks || []).map(s => ({ x: s.x || 20, y: s.y || 20, blocks: cloneBlocks(s.blocks || []) })),
    }));
    let chars = null, bg = BGS[0].id, sel = 0, toast = null, origin = { type: "new" }, name = "";
    // ゲームの器（stage1 §7a）: gameConfig は入口で必ず既定へ正規化（?? mode.gameDefault）。studio では null のまま
    let gameConfig = mode.isGame ? mode.gameDefault : null;
    if (open) {
      chars = loadScene(open);
      bg = BGS.some(b => b.id === open.bg) ? open.bg : BGS[0].id;
      origin = open.origin || { type: "new" };
      name = open.name || "";
      if (mode.isGame) gameConfig = open.gameConfig ?? mode.gameDefault;
    } else {
      const sp0 = profile && space.peek(profile);
      const draft = sp0 && sp0.draft;
      if (draft && Array.isArray(draft.chars) && draft.chars.length) {
        chars = loadScene(draft);
        if (chars.length) {
          bg = BGS.some(b => b.id === draft.bg) ? draft.bg : BGS[0].id;
          sel = Math.max(0, Math.min(chars.length - 1, draft.sel | 0));
          origin = draft.origin || { type: "new" };
          name = draft.name || "";
          if (mode.isGame) gameConfig = draft.gameConfig ?? mode.gameDefault;
          toast = "かきかけの さくひんが あるよ";  // 続きから再開（保存ダイアログは作らない・設計§7）
        } else chars = null;
      }
    }
    if (!chars || !chars.length) chars = [{ cid: "c1", kind: { type: "player" }, x: 5, y: 3, stacks: [] }];
    initRef.current = { profile, chars, bg, sel, toast: showOnly ? null : toast, origin, name, gameConfig, cidSeq: chars.length, cast: buildCast(profile) };
  }
  const profileRef = useRef(initRef.current.profile);
  const charsRef = useRef(initRef.current.chars);
  const selRef = useRef(initRef.current.sel);
  const bgRef = useRef(initRef.current.bg);
  const cidSeqRef = useRef(initRef.current.cidSeq);
  const castRef = useRef(initRef.current.cast);
  const originRef = useRef(initRef.current.origin); // draft.origin（§2: ほぞん時 work=上書き／new・sample=新規追加）
  const nameRef = useRef(initRef.current.name);     // 作品名（ほぞんモーダルのプリフィル）
  /* ==== ゲームの器（stage1 §7・mode.isGame のときだけ使う。studio では常に初期値のまま触られない） ==== */
  const gameConfigRef = useRef(initRef.current.gameConfig); // { scoreShow, clear:{type,param}, gameOver }
  const scoreRef = useRef(0);        // スコアの実体は器が持つ（エンジンは onFx 通知だけ・設計§6）
  const scoreHudRef = useRef(null);  // HUD の「ぽよん」用
  const timerRef = useRef(0);        // じかんクリアの残り拍（stage2・秒→拍換算。0=無効/切れ）

  /* ==== ブロックドラッグ（段階0の1:1移植・対象は選択中キャラのスタック） ==== */
  const dragRef = useRef(null);
  const pendingRef = useRef(null);
  const palPendingRef = useRef(null); // palette-fixes: パレット取り出しの保留（横しきい値超えで確定・縦はスクロール）
  const pointerIdRef = useRef(null); // 最初の1本指のみ有効（多点タッチ対策）
  const nodesRef = useRef([]);
  const slotsRef = useRef([]);
  const asmRef = useRef(null);
  const flyRef = useRef(null);
  const palRef = useRef(null);
  const [flyGroup, setFlyGroup] = useState(null);
  const [landId, setLandId] = useState(null);
  const [delHover, setDelHover] = useState(false);
  const [popTarget, setPopTarget] = useState(null);
  const [copyBalloon, setCopyBalloon] = useState(null); // { id, x, y }
  const copyTimerRef = useRef(null);

  /* ==== ステージ・実行 ==== */
  const theaterRef = useRef(null);
  const stripRef = useRef(null);
  const charElsRef = useRef(new Map());
  const [cellPx, setCellPx] = useState(22);
  const [big, setBig] = useState(!!showOnly); // 上演専用は最初から全画面固定（§4）
  const engineRef = useRef(null);
  const runningRef = useRef(false);
  const postRunRef = useRef(false);
  const tickTimerRef = useRef(null);
  const instantRef = useRef(new Set());   // 次の描画だけ transition なし（home/reset の瞬間移動）
  const pendingCharRef = useRef(null);    // { idx, x0, y0, grab, orig, moved }
  const [stripHover, setStripHover] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null); // { idx }
  const [toast, setToast] = useState(initRef.current.toast);
  const [saveOpen, setSaveOpen] = useState(false);    // ほぞんモーダル（段階2 §2）
  const [saveName, setSaveName] = useState("");
  const [saveDone, setSaveDone] = useState(null);     // かんせい!演出（段階3 §3-2）: { name, grant:{xp,coins,hit} }
  const [celebrate, setCelebrate] = useState(null);   // おいわい画面（ゲームの器・stage1 §7e）: { score }

  /* ==== とりけし/やりなおし（履歴20手・ブロック木＋キャラ配置のスナップショット） ==== */
  const histRef = useRef({ past: [], future: [] });
  const serializeScene = () => JSON.parse(JSON.stringify({
    bg: bgRef.current, sel: selRef.current,
    chars: charsRef.current.map(c => ({ cid: c.cid, kind: c.kind, x: c.x, y: c.y, stacks: c.stacks })),
  }));
  const takeSnapshot = tag => {
    const h = histRef.current;
    if (tag && h.past.length && h.past[h.past.length - 1].tag === tag) return; // 連続ピル操作は1手にまとめる
    h.past.push({ tag: tag || null, state: serializeScene() });
    if (h.past.length > CFG.UNDO) h.past.shift();
    h.future = [];
  };
  const dropLastSnapshot = () => { histRef.current.past.pop(); };
  const restoreScene = st => {
    bgRef.current = st.bg;
    selRef.current = st.sel;
    charsRef.current = st.chars.map(c => ({ ...c }));
    setPopTarget(null); setCopyBalloon(null);
  };
  const undo = () => {
    const h = histRef.current;
    if (!h.past.length || runningRef.current) return;
    h.future.push({ tag: null, state: serializeScene() });
    restoreScene(h.past.pop().state);
    afterEdit(); sndTick();
  };
  const redo = () => {
    const h = histRef.current;
    if (!h.future.length || runningRef.current) return;
    h.past.push({ tag: null, state: serializeScene() });
    restoreScene(h.future.pop().state);
    afterEdit(); sndTick();
  };

  /* ==== かきかけ自動保存（編集のたびデバウンス・ダイアログなし） ==== */
  const draftTimerRef = useRef(null);
  const writeDraft = () => {
    if (showOnly) return; // 上演専用: 人の作品を見ただけでかきかけを壊さない（§4）
    const prof = profileRef.current;
    if (!prof) return; // プロファイル未作成の端末では保存なしで遊べる（開発ルートの割り切り）
    const sp = space.ensure(prof);
    const sc = serializeScene();
    const scene = { bg: sc.bg, chars: sc.chars.map(c => ({ kind: c.kind, x: c.x, y: c.y, stacks: c.stacks })) };
    const o = originRef.current;
    if (o && o.type === "work") {                       // 保存済み作品と同一なら下書き不要（本FB）
      const w = sp.works.find(x => x.id === o.id);
      // ゲームでは gameConfig も比較に含める（せってい変更もかきかけ対象・stage1 §7g）。studio は従来比較のまま
      const same = w && (mode.isGame
        ? JSON.stringify({ bg: w.bg, chars: w.chars, gameConfig: w.gameConfig })
          === JSON.stringify({ ...scene, gameConfig: gameConfigRef.current })
        : JSON.stringify({ bg: w.bg, chars: w.chars }) === JSON.stringify(scene));
      if (same) {
        if (sp.draft) { sp.draft = null; saveProfile(prof); }
        return;
      }
    }
    sp.draft = { bg: sc.bg, sel: sc.sel, origin: o, name: nameRef.current, chars: scene.chars,
      ...(mode.isGame ? { gameConfig: gameConfigRef.current } : {}) };
    saveProfile(prof);
  };
  const scheduleDraft = () => {
    clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(writeDraft, CFG.DRAFT_DEBOUNCE);
  };
  useEffect(() => () => { clearTimeout(draftTimerRef.current); writeDraft(); }, []); // 離脱時フラッシュ

  // 編集が確定したら: 実行後の表示を捨て、draftを予約し、再描画
  const afterEdit = () => {
    engineRef.current = null;
    postRunRef.current = false;
    scheduleDraft();
    force();
  };

  /* ==== ほぞん（段階2 §2: origin=work なら上書き・new/sample なら新規追加＝remixOf記録） ==== */
  const openSave = () => {
    if (runningRef.current) return;
    setPopTarget(null); setCopyBalloon(null);
    setSaveName(nameRef.current || "");
    setSaveOpen(true);
  };
  const doSaveWork = () => {
    const prof = profileRef.current;
    if (!prof) { setSaveOpen(false); setToast("セーブデータが ないよ。さいしょの がめんで なまえを つくってね"); return; }
    const sc = serializeScene(); // JSON往復のディープクローン＝以後の編集と共有しない
    const scene = { bg: sc.bg, chars: sc.chars.map(c => ({ kind: c.kind, x: c.x, y: c.y, stacks: c.stacks })),
      ...(mode.isGame ? { gameConfig: gameConfigRef.current } : {}) }; // ゲームはせっていごと保存（stage1 §7f）
    const r = saveWork(prof, scene, saveName, originRef.current);
    if (!r.ok) { setSaveOpen(false); setToast("たなが いっぱい! どれか けしてから"); sndNo(); return; }
    const sp = space.ensure(prof);
    const w = sp.works.find(x => x.id === r.id);
    originRef.current = { type: "work", id: r.id }; // 以後の ほぞん は同じ作品への上書き
    nameRef.current = w ? w.name : "";
    setSaveOpen(false);
    if (r.grant) {
      // かんせい!演出（段階3 §3-2）: 新規保存のみ +XP/コイン/マイルストーン名。初回だけ賑やか・2回目以降はXPのみが自然に実現。
      // 新規バッジ・ベレー解放の祝いは App 側の既存演出（もどった再読込時）が担う＝スタジオ内では作らない
      setSaveDone({ name: nameRef.current, grant: r.grant });
      sndSnap(); // 保存の「パシャッ」は残す
      playJingle("kansei", (prof.settings?.musicVol ?? 3) > 0); // b5t: 本物のかんせい!ジングル（簡易ファンファーレ撤去）
    } else {
      setToast(TXT.savedToast); // 上書き保存（作り直し）は付与なし＝静かに
      sndSnap();
    }
    sp.draft = null;                       // 保存した作品は下書きから消す（本FB）
    clearTimeout(draftTimerRef.current);   // 予約済みの下書き書き込みを取消
    saveProfile(prof);
  };

  /* ==== ゲームのせってい（stage1 §7b・mode.isGame のみ）: 変更は gameConfigRef＋かきかけへ ==== */
  const setGameCfg = mut => {
    if (runningRef.current) return;
    const g = JSON.parse(JSON.stringify(gameConfigRef.current));
    mut(g);
    gameConfigRef.current = g;
    scheduleDraft(); sndTick(); force();
  };
  const bumpGoal = d => setGameCfg(g => { g.clear.param = Math.max(5, Math.min(50, g.clear.param + d)); }); // 5〜50・5刻み（設計§4）
  const bumpTime = d => setGameCfg(g => { g.clear.param = Math.max(10, Math.min(60, g.clear.param + d)); }); // 10〜60秒・10刻み（設計§4）
  const setClearType = t => setGameCfg(g => { g.clear.type = t; if (t === "score") g.clear.param = 10; if (t === "time") g.clear.param = 30; }); // 種別切替で param を既定へ（点↔秒で意味が変わるため）
  const toggleBomb = () => setGameCfg(g => { g.gameOver = g.gameOver ? null : { targetId: (charsRef.current[0] && charsRef.current[0].cid) || null }; });
  const setBomb = cid => setGameCfg(g => { g.gameOver = { targetId: cid }; }); // ばくだんにするキャラ（設計§4）

  const curChar = () => charsRef.current[selRef.current] || charsRef.current[0];
  const curStacks = () => (curChar() ? curChar().stacks : []);

  /* ==== レイアウト（段階0の1:1移植＋スタック上限30の容量つき） ==== */
  const layoutAll = () => {
    const nodes = [], slots = [];
    const drag = dragRef.current;
    const gapAt = (list, i) => drag && drag.slot && drag.slot.list === list && drag.slot.index === i;
    const layList = (list, x, y, depth, rootTotal) => {
      let cy = y;
      list.forEach((b, i) => {
        const allowSlot = depth > 0 || i > 0;
        const afterFlat = i > 0 && DEFS[list[i - 1].type].flat;
        if (allowSlot && !afterFlat) slots.push({ list, index: i, x, y: cy, depth, len: list.length, rootTotal });
        if (gapAt(list, i)) cy += drag.groupH;
        const node = { b, x, y: cy, depth };
        nodes.push(node);
        if (isContainer(b.type)) {
          const inner = layList(b.children, x + G.AW, cy + G.TB, depth + 1, rootTotal);
          node.mouth = Math.max(inner, G.MOUTH);
          node.h = G.TB + node.mouth + G.BB;
        } else node.h = blockH(b);
        cy += node.h;
      });
      const endFlat = list.length && DEFS[list[list.length - 1].type].flat;
      if ((depth > 0 || list.length > 0) && !endFlat)
        slots.push({ list, index: list.length, x, y: cy, depth, len: list.length, rootTotal });
      if (gapAt(list, list.length)) cy += drag.groupH;
      return cy - y;
    };
    for (const st of curStacks()) layList(st.blocks, st.x, st.y, 0, countBlocks(st.blocks));
    nodesRef.current = nodes;
    slotsRef.current = slots;
    return { nodes, slots };
  };

  /* ==== スナップ先の探索（段階0の1:1移植＋上限30） ==== */
  const eligibleSlot = (px, py, range) => {
    const drag = dragRef.current;
    const head = drag.group[0].type;
    if (isTrigger(head)) return null;
    const gDepth = containerDepth(drag.group);
    const gCount = countBlocks(drag.group);
    const tailFlat = !!DEFS[drag.group[drag.group.length - 1].type].flat;
    const headFlat = !!DEFS[head].flat;
    let best = null, bestD = range || G.SNAP;
    for (const s of slotsRef.current) {
      if (s.depth + gDepth > G.MAXDEPTH) continue;
      if ((headFlat || tailFlat) && s.index !== s.len) continue;
      if (s.rootTotal + gCount > CFG.STACK_MAX) continue; // 1スタック上限30
      const dx = px - s.x, dy = (py - s.y) * G.SNAPWY;
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

  /* ==== ブロックドラッグ本体（段階0の1:1移植） ==== */
  const asmPos = e => {
    const r = asmRef.current.getBoundingClientRect();
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
    curStacks().some(st => st.blocks[0] && st.blocks[0].type === type)
    || (dragRef.current && dragRef.current.group && dragRef.current.group[0] && dragRef.current.group[0].type === type);

  const beginDrag = (e, group, fromPalette, grabOffset) => {
    dragRef.current = { group, fromPalette, ox: grabOffset.x, oy: grabOffset.y, slot: null, groupH: stackH(group) };
    setFlyGroup(flattenGroup(group));
    setCopyBalloon(null);
    const p = asmPos(e);
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
    const p = asmPos(e);
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
      afterEdit();
      sndSnap();
      setLandId(group[0].id);
      setTimeout(() => setLandId(null), ANIM.land + 40);
    }, ANIM.suck);
  };
  const endDrag = e => {
    const d = dragRef.current;
    if (!d) return;
    const p = asmPos(e);
    setDelHover(false);
    const pr = palRef.current.getBoundingClientRect();
    const overPal = e.clientX < pr.right && !d.fromPalette;

    if (overPal) {
      const fly = flyRef.current;
      fly.classList.add("poof");
      sndPoof();
      d.slot = null; d.committing = true;
      setTimeout(() => {
        fly.classList.remove("poof");
        fly.style.display = "none";
        dragRef.current = null;
        setFlyGroup(null);
        afterEdit();
      }, 220);
      force();
      return;
    }
    if (d.slot) { commitTo(d.slot, d.group); return; }
    const fx = p.x - d.ox, fy = p.y - d.oy;
    if (overlapsAnyBlock(fx, fy, d.group)) {
      const rescue = eligibleSlot(fx, fy, G.RESCUE);
      if (rescue) { d.slot = rescue; commitTo(rescue, d.group); return; }
    }
    const nx = Math.max(6, fx), ny = Math.max(6, fy);
    curStacks().push({ x: nx, y: ny, blocks: d.group });
    flyRef.current.style.display = "none";
    dragRef.current = null;
    setFlyGroup(null);
    afterEdit();
    setLandId(d.group[0].id);
    setTimeout(() => setLandId(null), ANIM.land + 40);
  };

  /* ==== キャラのドラッグ（ステージ上・見えない格子スナップ／控え室で削除） ==== */
  const theaterPos = e => {
    const r = theaterRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, h: r.height };
  };
  const moveCharDrag = e => {
    const pc = pendingCharRef.current;
    if (!pc) return;
    if (!pc.moved) {
      if (Math.hypot(e.clientX - pc.x0, e.clientY - pc.y0) <= CFG.DRAG_START) return;
      pc.moved = true;
      takeSnapshot();
      engineRef.current = null; postRunRef.current = false; // 上演後の表示を捨てて編集位置に切り替え（ドラッグが見えるように）
    }
    const ch = charsRef.current[pc.idx];
    if (!ch) return;
    const p = theaterPos(e);
    const ax = p.x - pc.grab.dx;
    const ayTop = p.y - pc.grab.dy;
    ch.x = Math.max(0, Math.min(LCOLS - 1, Math.round((ax - 22) / cellPxRef.current)));
    ch.y = Math.max(0, Math.min(LROWS - 1, Math.round((p.h - 12 - ayTop) / cellPxRef.current)));
    const sr = stripRef.current && stripRef.current.getBoundingClientRect();
    setStripHover(!!sr && e.clientY > sr.top - 4 && e.clientY < sr.bottom + 4 && e.clientX > sr.left && e.clientX < sr.right);
    force();
  };
  const endCharDrag = e => {
    const pc = pendingCharRef.current;
    pendingCharRef.current = null;
    if (!pc) return;
    setStripHover(false);
    if (!pc.moved) { // タップ=キャラ選択
      if (selRef.current !== pc.idx) { selRef.current = pc.idx; sndPick(); force(); }
      return;
    }
    const sr = stripRef.current && stripRef.current.getBoundingClientRect();
    const overStrip = !!sr && e.clientY > sr.top - 4 && e.clientY < sr.bottom + 4 && e.clientX > sr.left && e.clientX < sr.right;
    if (overStrip) { setConfirmDel({ idx: pc.idx, orig: pc.orig }); force(); return; } // ここだけ確認（設計§9）
    afterEdit();
  };

  /* ==== ポインタ配線（documentへネイティブ登録・最初の1本指のみ） ==== */
  useEffect(() => {
    const onMove = e => {
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
      resolvePalPending(e); // palette-fixes: パレット取り出しを横しきい値で確定（縦はスクロールに譲る）
      const pending = pendingRef.current;
      if (pending && !dragRef.current) {
        if (Math.hypot(e.clientX - pending.x0, e.clientY - pending.y0) > CFG.DRAG_START) {
          clearTimeout(copyTimerRef.current);
          takeSnapshot(); // 束を外す前の状態を1手として記録
          let found = null;
          for (const st of curStacks()) { found = findBlock(st.blocks, pending.id); if (found) break; }
          if (found) {
            const group = found.list.splice(found.index);
            const c = curChar();
            c.stacks = c.stacks.filter(st => st.blocks.length);
            beginDrag(e, group, false, pending.grab);
          } else dropLastSnapshot();
          pendingRef.current = null;
        }
      }
      if (dragRef.current && !dragRef.current.committing) moveDrag(e);
      if (pendingCharRef.current) moveCharDrag(e);
    };
    const onUp = e => {
      if (palPendingRef.current && palPendingRef.current.pointerId === e.pointerId) palPendingRef.current = null; // 取り出し前に指を離した＝タップ（何もしない）
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
      pointerIdRef.current = null;
      pendingRef.current = null;
      clearTimeout(copyTimerRef.current);
      if (dragRef.current && !dragRef.current.committing) endDrag(e);
      if (pendingCharRef.current) endCharDrag(e);
    };
    const onCancel = e => {
      if (palPendingRef.current && palPendingRef.current.pointerId === e.pointerId) palPendingRef.current = null; // ブラウザが縦スクロールを取った＝取り出しを中断
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
      pointerIdRef.current = null;
      clearTimeout(copyTimerRef.current);
      const d = dragRef.current;
      if (d && !d.committing && d.group) curStacks().push({ x: 60, y: 60, blocks: d.group });
      pendingRef.current = null;
      dragRef.current = null;
      const pc = pendingCharRef.current;
      if (pc && pc.moved) { const ch = charsRef.current[pc.idx]; if (ch) { ch.x = pc.orig.x; ch.y = pc.orig.y; } dropLastSnapshot(); }
      pendingCharRef.current = null;
      setStripHover(false);
      if (flyRef.current) flyRef.current.style.display = "none";
      setFlyGroup(null);
      scheduleDraft();
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

  /* ==== 組み立てエリア: ブロックを掴む＋長押しコピー ==== */
  const onAsmPointerDown = e => {
    setPopTarget(null);
    setCopyBalloon(null);
    ac();
    if (runningRef.current) return;
    if (pointerIdRef.current !== null) return;
    const blkEl = e.target.closest(".blk");
    if (!blkEl || blkEl.closest(".studio-fly")) return;
    const id = +blkEl.dataset.id;
    const node = nodesRef.current.find(n => n.b.id === id);
    if (!node) return;
    pointerIdRef.current = e.pointerId;
    const p = asmPos(e);
    pendingRef.current = { x0: e.clientX, y0: e.clientY, id, grab: { x: p.x - node.x, y: p.y - node.y } };
    clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => {
      // 長押し0.5秒（動いたらドラッグ判定側でキャンセル済み）→「コピー」バルーン
      // きっかけは各1本＝コピー対象外（バルーンを出さない・そのままドラッグは可能）
      if (pendingRef.current && pendingRef.current.id === id && !dragRef.current && !isTrigger(node.b.type)) {
        pendingRef.current = null;
        pointerIdRef.current = null;
        setCopyBalloon({ id, x: node.x + 30, y: node.y });
        sndTick();
      }
    }, CFG.LONGPRESS);
  };
  const doCopy = id => {
    setCopyBalloon(null);
    let found = null, node = nodesRef.current.find(n => n.b.id === id);
    for (const st of curStacks()) { found = findBlock(st.blocks, id); if (found) break; }
    if (!found || !node) return;
    const group = found.list.slice(found.index); // 掴んだブロックから下＝束（ドラッグと同義）
    if (isTrigger(group[0].type)) { sndNo(); return; } // きっかけ各1本のためコピー不可
    takeSnapshot();
    const copy = cloneBlocks(group);
    curStacks().push({ x: node.x + CFG.COPY_OFFSET, y: node.y + CFG.COPY_OFFSET, blocks: copy });
    afterEdit();
    sndSnap();
    setLandId(copy[0].id);
    setTimeout(() => setLandId(null), ANIM.land + 40);
  };

  /* ==== パレットから新規ブロック（段階0の1:1移植＋palette-fixes: 横しきい値で取り出し確定） ==== */
  // palette-fixes: pointerdown では preventDefault せず保留だけ記録。最初の pointermove で
  // 横移動が優勢＆しきい値超えなら取り出し確定、縦優勢なら touch-action:pan-y でブラウザにスクロールさせる。
  const onPalPointerDown = (e, type) => {
    ac();
    if (runningRef.current) return;
    if (pointerIdRef.current !== null || palPendingRef.current) return;
    palPendingRef.current = { x0: e.clientX, y0: e.clientY, type, pointerId: e.pointerId, el: e.currentTarget };
  };
  // 保留中のパレット取り出しを横しきい値で確定する（グローバル onMove から呼ばれる）
  const resolvePalPending = e => {
    const pal = palPendingRef.current;
    if (!pal || pal.pointerId !== e.pointerId || dragRef.current) return;
    const dx = e.clientX - pal.x0, dy = e.clientY - pal.y0;
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > CFG.DRAG_START) { palPendingRef.current = null; return; } // 縦優勢=スクロールに譲る
    if (Math.abs(dx) <= CFG.DRAG_START) return; // まだしきい値未満＝判定保留
    e.preventDefault(); // 横確定＝ここからはアプリのドラッグ
    const { type, el } = pal;
    palPendingRef.current = null;
    if (isTrigger(type) && hasTrigger(type)) {
      // きっかけは1キャラにつき各1本＝プルッと拒否（DOM直接操作＝段階0の実装知見）
      if (el) { el.classList.remove("no"); void el.offsetWidth; el.classList.add("no"); setTimeout(() => el.classList.remove("no"), 300); }
      sndNo();
      return;
    }
    pointerIdRef.current = e.pointerId;
    takeSnapshot();
    const b = makeBlock(type);
    beginDrag(e, [b], true, { x: DEFS[type].w / 2, y: 20 });
  };

  // 相手キャラ名の解決（bumpTarget のピル表示／stage2）。any=だれか
  const targetName = cid => { const c = charsRef.current.find(x => x.cid === cid); return c ? kindName(c.kind) : cid; };

  /* ==== ピル（数値ステッパー／おと切替／相手指定） ==== */
  const onPill = useCallback((e, b) => {
    ac();
    if (runningRef.current) return;
    const d = DEFS[b.type];
    if (d.pill === "s") {
      takeSnapshot("pill" + b.id);
      b.s = (b.s + 1) % SOUNDS.length;
      SND[b.s]();
      afterEdit();
      return;
    }
    if (d.pill === "target") { // stage2: タップで だれか→他キャラ→…を循環（自分は除く）
      takeSnapshot("pill" + b.id);
      const self = curChar();
      const cands = ["any", ...charsRef.current.filter(c => !self || c.cid !== self.cid).map(c => c.cid)];
      const cur = Math.max(0, cands.indexOf(b.target));
      b.target = cands[(cur + 1) % cands.length];
      afterEdit(); sndTick();
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const sr = asmRef.current.getBoundingClientRect();
    const px = Math.max(8, Math.min(sr.width - 160, rect.left - sr.left + rect.width / 2 - 76));
    const py = Math.max(6, rect.top - sr.top - 76);
    setPopTarget({ id: b.id, x: px, y: py });
  }, []);
  const stepVal = dir => {
    if (!popTarget) return;
    let found = null;
    for (const st of curStacks()) { found = findBlock(st.blocks, popTarget.id); if (found) break; }
    if (!found) return;
    const b = found.list[found.index];
    const d = DEFS[b.type];
    const nv = Math.max(d.min, Math.min(d.max, b.n + dir));
    if (nv !== b.n) { takeSnapshot("pill" + b.id); b.n = nv; sndTick(); }
    afterEdit();
  };
  const popVal = (() => {
    if (!popTarget) return null;
    for (const st of curStacks()) { const f = findBlock(st.blocks, popTarget.id); if (f) return f.list[f.index].n; }
    return null;
  })();

  /* ==== ステージ縮尺（window resize＋同一式のみ・向き検出JS禁止） ==== */
  const cellPxRef = useRef(cellPx);
  cellPxRef.current = cellPx;
  const updateDims = useCallback(() => {
    const t = theaterRef.current;
    if (!t) return;
    const w = t.clientWidth, h = t.clientHeight;
    const c = Math.max(4, Math.min((w - 52) / LCOLS, (h - 44) / LROWS)); // プロトタイプ updateDims と同一式（下限は非表示時の負値ガード）
    if (Math.abs(c - cellPxRef.current) > 0.01) setCellPx(c);
  }, []);
  useLayoutEffect(() => { updateDims(); }, [big, updateDims]);
  useEffect(() => {
    const onResize = () => updateDims();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateDims]);

  /* ==== 実行（engine.js との配線） ==== */
  const replayEl = (key, sel, cls, dur) => {
    const root = charElsRef.current.get(key);
    if (!root) return;
    const el = sel ? root.querySelector(sel) : root;
    if (!el) return;
    el.classList.remove("hopA", "stepA", "bumpA", "spinA"); // アニメ衝突防止（後勝ち）
    void el.offsetWidth;
    if (dur) el.style.animationDuration = dur + "ms";
    el.classList.add(cls);
  };
  const engineCbs = {
    onUpdate: (ch, cause) => {
      if (cause === "home" || cause === "reset") instantRef.current.add(ch.key);
      if (cause === "move") replayEl(ch.key, ".sp-in", "stepA");
      force();
    },
    onFx: (key, fx) => {
      if (fx.type === "sound") SND[fx.s] ? SND[fx.s]() : SND[0]();
      else if (fx.type === "bump") { replayEl(key, ".sp-in", "bumpA"); tone(200, 0.12, "sine", 0.15); }
      else if (fx.type === "hop") {
        const root = charElsRef.current.get(key);
        if (root) { const el = root.querySelector(".sp-in"); if (el) el.style.setProperty("--hopH", (-cellPxRef.current * CFG.JUMP_K) + "px"); }
        replayEl(key, ".sp-in", "hopA", TICK * 2);
      }
      else if (fx.type === "spin") replayEl(key, ".sp-spin", "spinA", TICK * 2);
      else if (fx.type === "score") {
        // ゲームの器（stage1 §7c）: スコアの保持と下限0は器が担う。studio ではこの fx 自体が発生しない
        if (!mode.isGame) return;
        scoreRef.current = Math.max(0, scoreRef.current + fx.delta);
        const el = scoreHudRef.current; // HUD「ぽよん」（設計§5: +の瞬間スコア表示がぽよん）
        if (el) { el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
        force();
      }
    },
    onGlow: (id, on) => {
      const el = asmRef.current && asmRef.current.querySelector(`[data-id="${id}"]`);
      if (el) el.classList.toggle("exec", on);
    },
    onDone: natural => {
      // ゲームのじかんクリア中は、engine が自然終了（動く敵がいない等）してもタイマーを回し続ける（時間で終わる）
      if (natural && mode.isGame && gameConfigRef.current.clear.type === "time" && timerRef.current > 0) return; // runningRef 維持・tickLoop 継続
      runningRef.current = false;
      clearTimeout(tickTimerRef.current);
      if (natural) postRunRef.current = true;   // 自然終了: 位置維持（次の▶で初期化）
      else { engineRef.current = null; postRunRef.current = false; } // ■: 初期化済み
      force();
    },
  };
  /* ==== ゲーム終了（stage2 §A-2/A-3・mode.isGame のみ） ==== */
  const timerSec = () => Math.max(0, Math.ceil(timerRef.current * TICK / 1000)); // 残り拍→秒（HUD表示）
  // ばくだんタッチ判定: 指定ばくだん(targetId)が他キャラと重なったら負け（設計§4）
  const bombHit = () => {
    const g = gameConfigRef.current;
    if (!g.gameOver || !g.gameOver.targetId) return false;
    const eng = engineRef.current;
    const bomb = eng.getChar(g.gameOver.targetId);
    if (!bomb || !bomb.visible) return false;
    return eng.chars.some(c => c !== bomb && c.visible && c.x === bomb.x && c.y === bomb.y);
  };
  // result: "clear"（おいわい）/ "timeup"（けっか）/ "lose"（ざんねん）
  const endGame = result => {
    runningRef.current = false;
    clearTimeout(tickTimerRef.current);
    postRunRef.current = true; // 位置は保ったまま（画面の背景に最後の場面が見える）
    if (asmRef.current) asmRef.current.querySelectorAll(".exec").forEach(el => el.classList.remove("exec")); // 発光を消す
    setCelebrate({ result, score: scoreRef.current });
    if (result === "lose") { tone(300, 0.18, "sine", 0.15); setTimeout(() => tone(240, 0.22, "sine", 0.14), 130); } // 責めない下降音
    else { tone(660, 0.12, "sine", 0.18); setTimeout(() => tone(880, 0.12, "sine", 0.18), 110); setTimeout(() => tone(1320, 0.2, "sine", 0.18), 220); }
    force();
  };
  const tickLoop = () => {
    const eng = engineRef.current;
    if (!eng || !runningRef.current) return;
    eng.tick();
    // 終了判定は毎拍の最後（設計§6）。判定順=★ゲームオーバー優先（設計に明記なし・よけの核「触れたら負け」を守る）
    // ★runningRef ガードにしない: エンジンがこの拍の中で自然終了（onDoneでrunning=false）しても、
    //   同拍のばくだん接触・スコア到達は拾う（はた1枚だけの作品で1拍目に自然終了するケースの実測バグ対策）
    if (mode.isGame) {
      const g = gameConfigRef.current;
      if (bombHit()) { endGame("lose"); return; }                                          // ①ばくだんタッチ
      if (g.clear.type === "score" && scoreRef.current >= g.clear.param) { endGame("clear"); return; } // ②スコア到達
      if (g.clear.type === "time") { // ③時間切れ（エンジンが先に静止しても時計は進む・HUD更新のため毎拍force）
        timerRef.current -= 1;
        if (timerRef.current <= 0) { endGame("timeup"); return; }
        force();
      }
      // g.clear.type === "none" は自動終了なし（■でのみ止まる）
    }
    if (runningRef.current) tickTimerRef.current = setTimeout(tickLoop, TICK);
  };
  const startRun = () => {
    if (runningRef.current) return;
    const defs = charsRef.current.map(c => ({ key: c.cid, x: c.x, y: c.y, stacks: c.stacks }));
    const eng = createEngine(defs, engineCbs);
    if (!eng.hasAnyTrigger()) { sndNo(); return; } // きっかけブロックがない
    setPopTarget(null); setCopyBalloon(null);
    if (mode.isGame) { // ▶のたびスコア0から・タイマー初期化・結果画面を畳む（stage1 §7c/stage2）
      scoreRef.current = 0; setCelebrate(null);
      const g = gameConfigRef.current;
      timerRef.current = g.clear.type === "time" ? Math.round(g.clear.param * 1000 / TICK) : 0; // 秒→拍
    }
    engineRef.current = eng;
    postRunRef.current = false;
    runningRef.current = true;
    eng.start();
    sndClap();
    force();
    clearTimeout(tickTimerRef.current);
    tickTimerRef.current = setTimeout(tickLoop, TICK * 0.5); // プロトタイプ: はたの半拍おいて最初の拍
  };
  const stopRun = () => {
    const eng = engineRef.current;
    if (eng && runningRef.current) {
      eng.stop(); sndCut();
      if (runningRef.current) { // stage2: エンジンは自然終了済みで器の時計だけ回っている（じかん待ち）→ 器側で止める
        runningRef.current = false;
        clearTimeout(tickTimerRef.current);
        engineRef.current = null; postRunRef.current = false; // ■=初期化（編集位置に戻す）
        force();
      }
    }
    if (!showOnly) setBig(false); // ■で全画面からも復帰（指示書§3-1）。上演専用はbig固定（§4）
  };
  useEffect(() => () => { clearTimeout(tickTimerRef.current); }, []);
  useEffect(() => { instantRef.current.clear(); }); // 瞬間移動フラグは1描画かぎり

  /* ==== キャラの表示状態（実行中/自然終了後はエンジン・編集中は初期値） ==== */
  const dispOf = c => {
    const eng = engineRef.current;
    if (eng && (runningRef.current || postRunRef.current)) {
      const s = eng.getChar(c.cid);
      if (s) return s;
    }
    return { x: c.x, y: c.y, sizeIdx: SIZE_INIT, visible: true };
  };

  /* ==== ステージ操作（キャラ選択/ドラッグ/実行中タップ） ==== */
  const onTheaterPointerDown = e => {
    ac();
    const actorEl = e.target.closest(".actor");
    if (runningRef.current) {
      if (actorEl && engineRef.current) engineRef.current.tap(actorEl.dataset.cid); // タップされたら
      return;
    }
    if (big) return; // 上演モードでは編集しない
    if (pointerIdRef.current !== null) return;
    if (!actorEl) return;
    const cid = actorEl.dataset.cid;
    const idx = charsRef.current.findIndex(c => c.cid === cid);
    if (idx < 0) return;
    pointerIdRef.current = e.pointerId;
    const ch = charsRef.current[idx];
    const p = theaterPos(e);
    pendingCharRef.current = {
      idx, x0: e.clientX, y0: e.clientY, moved: false, orig: { x: ch.x, y: ch.y },
      grab: { dx: p.x - (22 + ch.x * cellPx), dy: p.y - (p.h - 12 - ch.y * cellPx) },
    };
  };

  /* ==== 控え室: 追加/削除 ==== */
  const addChar = (e, entry) => {
    ac();
    if (runningRef.current) return;
    if (charsRef.current.length >= CFG.MAX_CHARS) {
      const el = e.currentTarget;
      el.classList.remove("no"); void el.offsetWidth; el.classList.add("no");
      setTimeout(() => el.classList.remove("no"), 300);
      sndNo();
      return;
    }
    takeSnapshot();
    const spots = [[2, 2], [9, 2], [5, 4], [2, 5], [9, 5], [6, 1], [4, 6]];
    const used = new Set(charsRef.current.map(c => `${c.x},${c.y}`));
    const spot = spots.find(s => !used.has(`${s[0]},${s[1]}`)) || [5, 3];
    charsRef.current.push({
      cid: "c" + (++cidSeqRef.current), kind: entry.kind,
      x: spot[0], y: spot[1], stacks: [],
    });
    selRef.current = charsRef.current.length - 1;
    afterEdit();
    sndSnap();
  };
  const confirmRemove = yes => {
    const cd = confirmDel;
    setConfirmDel(null);
    if (!cd) return;
    const ch = charsRef.current[cd.idx];
    if (!yes) { // やめる: ドラッグ前の位置へ戻し、ドラッグ開始時のスナップショットも捨てる
      if (ch) { ch.x = cd.orig.x; ch.y = cd.orig.y; }
      dropLastSnapshot();
      force();
      return;
    }
    charsRef.current.splice(cd.idx, 1);
    if (!charsRef.current.length) charsRef.current.push({ cid: "c" + (++cidSeqRef.current), kind: { type: "player" }, x: 5, y: 3, stacks: [] });
    selRef.current = Math.max(0, Math.min(selRef.current, charsRef.current.length - 1));
    sndPoof();
    afterEdit();
  };

  /* ==== トースト自動消灯 ==== */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), CFG.TOAST_MS);
    return () => clearTimeout(t);
  }, [toast]);

  /* ==== 描画 ==== */
  const running = runningRef.current;
  const { nodes } = layoutAll();
  const drag = dragRef.current;
  const ghost = drag && drag.slot ? {
    w: DEFS[drag.group[0].type].w, h: drag.groupH - 4, x: drag.slot.x, y: drag.slot.y,
  } : null;
  const sel = selRef.current;
  const selC = curChar();
  const bgImg = (BGS.find(b => b.id === bgRef.current) || BGS[0]).img;
  const actorBase = cellPx * CFG.ACTOR_K;
  const hist = histRef.current;

  return (
    <div className={"studio-root" + (mode.isGame ? " gl" : "") + (running ? " running" : "") + (big ? " big" : "") + (showOnly ? " showonly" : "")}>
      <style>{STUDIO_CSS + (mode.isGame ? GAMELAB_CSS : "")}</style>
      <header>
        <div className="mark">{mode.mark}</div>
        <div style={{ minWidth: 0 }}>
          <h1>{TXT.title}</h1>
          <div className="sub">{showOnly ? TXT.showSub : TXT.editSub}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {!showOnly && <button className="editbtn" disabled={!hist.past.length || running} onClick={undo}>とりけし</button>}
          {!showOnly && <button className="editbtn" disabled={!hist.future.length || running} onClick={redo}>やりなおし</button>}
          {!showOnly && <button className="savebtn" disabled={running} onClick={openSave}>ほぞん</button>}
          <button onClick={() => { clearTimeout(draftTimerRef.current); writeDraft(); onExit && onExit(); }}>{showOnly ? "とじる" : "◀ たなへ"}</button>
        </div>
      </header>
      <div className="studio-wrap">
        {/* 左: こうぐだな。studio=段階0のまま（2列grid＋pname）／gamelab=Scratch寄り（stage2 B-1・モック基準:
            枠なし・ジャンル見出し1回・内容ぴったりの自動幅・実寸の凸凹カード）。プルッ拒否はDOM直接操作 */}
        <div className={"studio-pal" + (delHover ? " del" : "")} ref={palRef}>
          <div className="shelf-title">こうぐだな</div>
          <div className="delmsg">ここで はなすと<br />けせるよ</div>
          {mode.isGame ? (() => {
            // カテゴリごとにまとめる（PALORDER 順のまま・見出しはカテゴリの先頭で1回）
            const groups = [];
            for (const t of PALORDER) {
              const cat = DEFS[t].cat;
              if (!groups.length || groups[groups.length - 1].cat !== cat) groups.push({ cat, types: [] });
              groups[groups.length - 1].types.push(t);
            }
            const CAT_DOT = { "きっかけ": "#F2A227", "うごき": "#3E93E8", "みため": "#E8639C", "おと": "#7BB03B", "せいぎょ": "#8F7EEA", "かず": "#F6C445" };
            // 自動幅（モックの widthOf 相当・和文≈14px/半角≈7.5px の近似＝実測レイアウトは実機微調整前提）
            const textW = (s, jp, en) => [...s].reduce((a, c) => a + (c.charCodeAt(0) < 256 ? en : jp), 0);
            const pillTextOf = d => d.pill === "n" ? `×${d.def}` : d.pill === "s" ? SOUNDS[0] : d.pill === "target" ? "だれか" : null;
            const palW = d => {
              const pill = pillTextOf(d);
              return Math.max(88, Math.round(G.LABELX + textW(d.label, 14, 7.5) + (pill ? 12 + textW(pill, 11, 6) + 6 : 0) + 14));
            };
            return groups.map(g => (
              <div key={g.cat} className="glsec">
                <div className="glsec-h"><span className="dot" style={{ background: CAT_DOT[g.cat] || "#9aa" }} /><span className="nm">{g.cat}</span><span className="ln" /></div>
                <div className="glcards">
                  {g.types.map(t => {
                    const d = DEFS[t];
                    const w = palW(d);
                    const mouth = d.shape === "c" ? G.MOUTH : 0;
                    const hh = d.shape === "hat" ? G.HATH : d.shape === "c" ? G.TB + mouth + G.BB : G.H;
                    const isHat = d.shape === "hat";
                    const pChipY = Math.max(chipY(t), 9);
                    const pOff = (G.CHIP - G.ICON) / 2;
                    const off = isTrigger(t) && hasTrigger(t);
                    const pill = pillTextOf(d);
                    return (
                      <div key={t} className={"pal glpal" + (off ? " off" : "")}
                        onPointerDown={e => onPalPointerDown(e, t)}>
                        <svg width={w + 2} height={hh + G.TD + (isHat ? 9 : 6)}
                          viewBox={`-1 ${isHat ? -4 : -1} ${w + 2} ${hh + G.TD + (isHat ? 9 : 6)}`}>
                          <path d={isHat ? pathHat(w) : d.shape === "c" ? pathC(w, mouth, !!d.flat) : pathBody(w)}
                            fill={d.fill} stroke={d.edge} strokeWidth="2" />
                          <path d={gloss(w, isHat)} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="3.5" strokeLinecap="round" />
                          <rect x={G.CHIPX} y={pChipY} width={G.CHIP} height={G.CHIP} rx="10" fill="#FFFDF6" stroke="rgba(0,0,0,.10)" strokeWidth="1" />
                          <image href={d.icon} x={G.CHIPX + pOff} y={pChipY + pOff} width={G.ICON} height={G.ICON} />
                        </svg>
                        <div className="gllbl" style={{ left: G.LABELX, top: labelY(t) }}>
                          {d.label}{pill && <span className="glpill">{pill}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ));
          })() : (
          <div className="palgrid">
            {PALORDER.map(t => {
              const d = DEFS[t];
              const mouth = d.shape === "c" ? G.MOUTH : 0;
              const hh = d.shape === "hat" ? G.HATH : d.shape === "c" ? G.TB + mouth + G.BB : G.H;
              const pChipY = Math.max(chipY(t), 9); // palette-fixes: メスのくぼみ底 TD=8 を避ける（StudioBlockと同基準）
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
          )}
        </div>

        {/* 中央: 組み立てエリア（選択中キャラのプログラムのみ） */}
        <div className="studio-asm" ref={asmRef} onPointerDown={onAsmPointerDown}>
          {selC && (
            <div className="selchip">
              {selC.kind.type === "player"
                ? <span className="pav"><PlayerAvatar character={(profileRef.current && profileRef.current.character) || "boy"} dressup={profileRef.current && profileRef.current.dressup} size={26} /></span>
                : <img src={kindImg(selC.kind)} alt="" />}
              <span>{kindName(selC.kind)}の プログラム</span>
            </div>
          )}
          {!curStacks().length && (
            <div className="hint">
              たなから ブロックを ドラッグしてね ／ 「はたが おされたら」から はじめると ▶で うごくよ ／
              ながおしで コピー ／ けすときは たなへ ドラッグ
            </div>
          )}
          <div className="studio-ghost" style={{
            display: ghost ? "block" : "none",
            width: ghost ? ghost.w : 0, height: ghost ? ghost.h : 0,
            transform: ghost ? `translate(${ghost.x}px, ${ghost.y}px)` : undefined,
          }} />
          {nodes.map((n, order) => (
            <StudioBlock key={n.b.id} b={n.b} mouth={n.mouth || 0} x={n.x} y={n.y} z={10 + order}
              land={landId === n.b.id} onPill={onPill} />
          ))}
          {popTarget && popVal !== null && (
            <div className="studio-pop" style={{ left: popTarget.x, top: popTarget.y }}
              onPointerDown={e => e.stopPropagation()}>
              <button className="minus" onClick={() => stepVal(-1)}>−</button>
              <div className="val">{popVal}</div>
              <button className="plus" onClick={() => stepVal(1)}>＋</button>
            </div>
          )}
          {copyBalloon && (
            <button className="copy-balloon" style={{ left: copyBalloon.x, top: Math.max(6, copyBalloon.y - 46) }}
              onPointerDown={e => e.stopPropagation()} onClick={() => doCopy(copyBalloon.id)}>コピー</button>
          )}
          <div className="studio-fly" ref={flyRef} style={{ display: "none" }}>
            {flyGroup && flyGroup.map(f => (
              <StudioBlock key={"fly" + f.b.id} b={f.b} mouth={f.mouth} x={f.x} y={f.y} z={1} inFly />
            ))}
          </div>
        </div>

        {/* 右: ステージペイン（12×8を常に全体縮尺表示・3:2） */}
        <div className="studio-right">
          <div className="theater" ref={theaterRef} onPointerDown={onTheaterPointerDown}>
            <img className="bgimg" src={bgImg} alt="" draggable="false" />
            {/* スコア/タイマーHUD（ゲームの器・stage1 §7d/stage2 §A-3）: 上演中/終了後だけ・▶直後の⭐0が合図 */}
            {mode.isGame && gameConfigRef.current && (running || postRunRef.current)
              && (gameConfigRef.current.scoreShow || gameConfigRef.current.clear.type === "time") && (
              <div className="scoreHud" ref={scoreHudRef}>
                {gameConfigRef.current.scoreShow && <span>⭐ {scoreRef.current}</span>}
                {gameConfigRef.current.clear.type === "time" && (
                  <span style={{ marginLeft: gameConfigRef.current.scoreShow ? 16 : 0 }}>⏱ {timerSec()}</span>
                )}
              </div>
            )}
            {/* 結果画面（ゲームの器・stage1 §7e/stage2 §A-2/A-3）: clear=おいわい／timeup=けっか／lose=ざんねん */}
            {mode.isGame && celebrate && (() => {
              const rlt = celebrate.result || "clear";
              const lose = rlt === "lose";
              const title = lose ? "おしい！ もういちど？" : rlt === "timeup" ? "じかん たったよ！" : "クリア！ やったね！";
              return (
                <div className={"gameclear" + (lose ? " lose" : "")}>
                  {!lose && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => ( // 負けは紙吹雪なし（責めない・設計§4）
                    <i key={i} className="confetti" style={{
                      left: `${6 + i * 8}%`,
                      background: ["#f2b23a", "#e0704f", "#58a839", "#4a7fc9", "#8F7EEA", "#E8639C"][i % 6],
                      animationDelay: `${(i * 0.23) % 1.4}s`, animationDuration: `${1.6 + (i % 3) * 0.5}s`,
                    }} />
                  ))}
                  <div className="gc-box">
                    <div className="gc-title">{title}</div>
                    <div className="gc-score">⭐ {celebrate.score}</div>
                    <button className="gc-again" onClick={() => { ac(); sndTick(); startRun(); }}>もういちど</button>
                    {!showOnly && (
                      <button className="gc-fix" onClick={() => { ac(); sndTick(); setCelebrate(null);
                        engineRef.current = null; postRunRef.current = false; setBig(false); force(); }}>なおす</button>
                    )}
                  </div>
                </div>
              );
            })()}
            {charsRef.current.map((c, i) => {
              const disp = dispOf(c);
              return (
                <CharSprite key={c.cid} ch={{ ...c, z: i }} disp={disp} cellPx={cellPx} base={actorBase}
                  selected={i === sel} running={running} instant={instantRef.current.has(c.cid)}
                  profile={profileRef.current}
                  onRef={el => { if (el) charElsRef.current.set(c.cid, el); else charElsRef.current.delete(c.cid); }} />
              );
            })}
            <button className="roundbtn bigbtn" aria-label={big ? "もどす" : "ひろげる"}
              onPointerDown={e => e.stopPropagation()} onClick={() => { setPopTarget(null); setBig(b => !b); }}>
              {big
                ? <svg width="20" height="20" viewBox="0 0 20 20"><path d="M8 3 v5 H3 M12 3 v5 h5 M8 17 v-5 H3 M12 17 v-5 h5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : <svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 8 V3 h5 M17 8 V3 h-5 M3 12 v5 h5 M17 12 v5 h-5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
            <button className={"roundbtn runbtn" + (running ? " stop" : "")} aria-label={running ? "カット" : "うごかす"}
              onPointerDown={e => e.stopPropagation()} onClick={() => { ac(); running ? stopRun() : startRun(); }}>
              {running
                ? <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="2" width="14" height="14" rx="3" fill="#fff" /></svg>
                : <svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 2 L18 10 L5 18 Z" fill="#fff" /></svg>}
            </button>
          </div>
          {/* ゲームのせってい（stage1 §7b／stage2 §A-4・isGameのみ）: スコアひょうじ／クリア3種／ばくだんタッチ */}
          {mode.isGame && !showOnly && gameConfigRef.current && (() => {
            const g = gameConfigRef.current;
            return (
            <div className="gamecfg">
              <div className="rowtitle">ゲームの せってい</div>
              <div className="gc-row">
                <button className={"gc-toggle" + (g.scoreShow ? " on" : "")} disabled={running}
                  onClick={() => setGameCfg(gg => { gg.scoreShow = !gg.scoreShow; })}>
                  スコアを だす {g.scoreShow ? "◯" : "✕"}
                </button>
              </div>
              {/* クリアじょうけん 3択 */}
              <div className="gc-row">
                <span className="gc-cap">クリア:</span>
                <button className={"gc-seg" + (g.clear.type === "score" ? " on" : "")} disabled={running} onClick={() => setClearType("score")}>スコア</button>
                <button className={"gc-seg" + (g.clear.type === "time" ? " on" : "")} disabled={running} onClick={() => setClearType("time")}>じかん</button>
                <button className={"gc-seg" + (g.clear.type === "none" ? " on" : "")} disabled={running} onClick={() => setClearType("none")}>なし</button>
              </div>
              {g.clear.type === "score" && (
                <div className="gc-row"><span className="gc-goal">
                  <button className="gc-step" disabled={running} onClick={() => bumpGoal(-5)}>−</button>
                  <span className="gc-num">⭐{g.clear.param}</span> たまったら
                  <button className="gc-step" disabled={running} onClick={() => bumpGoal(5)}>＋</button>
                </span></div>
              )}
              {g.clear.type === "time" && (
                <div className="gc-row"><span className="gc-goal">
                  <button className="gc-step" disabled={running} onClick={() => bumpTime(-10)}>−</button>
                  <span className="gc-num">⏱{g.clear.param}びょう</span> まで
                  <button className="gc-step" disabled={running} onClick={() => bumpTime(10)}>＋</button>
                </span></div>
              )}
              {/* ばくだんタッチ（ゲームオーバー） */}
              <div className="gc-row">
                <button className={"gc-toggle" + (g.gameOver ? " on" : "")} disabled={running}
                  onClick={toggleBomb}>ばくだんタッチ {g.gameOver ? "◯" : "✕"}</button>
                {g.gameOver && (
                  <span className="gc-bombs">
                    {charsRef.current.map(c => (
                      <button key={c.cid} className={"gc-bomb" + (g.gameOver.targetId === c.cid ? " on" : "")}
                        disabled={running} onClick={() => setBomb(c.cid)} title="さわったら まけ">
                        {c.kind.type === "player"
                          ? <PlayerAvatar character={(profileRef.current && profileRef.current.character) || "boy"} dressup={profileRef.current && profileRef.current.dressup} size={26} />
                          : <img src={kindImg(c.kind)} alt="" draggable="false" />}
                        {g.gameOver.targetId === c.cid && <span className="skull">💀</span>}
                      </button>
                    ))}
                  </span>
                )}
              </div>
            </div>
            );
          })()}
          <div className="bgrow">
            <div className="rowtitle">ぶたい（はいけい）</div>
            <div className="thumbs">
              {BGS.map(b => (
                <button key={b.id} className={"bgthumb" + (b.id === bgRef.current ? " on" : "")}
                  onClick={() => { ac(); if (b.id !== bgRef.current) { takeSnapshot(); bgRef.current = b.id; afterEdit(); sndTick(); } }}>
                  <img src={b.img} alt="" draggable="false" />
                  <span className="bgname">{b.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="castrow">
            {/* 実機FB(2026-07-17): ドラッグ削除の告知が無く発見不能だった→ラベルに明記（ブロック側hintと対) */}
            <div className="rowtitle">はいゆうひかえしつ（タップで とうじょう・けすときは ここへ ドラッグ・キャラは {CFG.MAX_CHARS}にんまで）</div>
            <div className={"strip" + (stripHover ? " del" : "")} ref={stripRef}>
              <div className="stripdelmsg">ここで はなすと けせるよ</div>
              {castRef.current.map((entry, i) => (
                <button key={i} className="castchip" onPointerDown={e => e.stopPropagation()} onClick={e => addChar(e, entry)}>
                  {entry.kind.type === "player"
                    ? <span style={{ display: "flex", justifyContent: "center", height: 34 }}>
                        <PlayerAvatar character={(profileRef.current && profileRef.current.character) || "boy"} dressup={profileRef.current && profileRef.current.dressup} size={32} /></span>
                    : <img src={kindImg(entry.kind)} alt="" draggable="false" />}
                  <div className="cname">{entry.name}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="rcap">
            さくひん ぜんたい（{LCOLS}×{LROWS}マス）を いつも表示 ／ キャラを タップ=えらぶ・ドラッグ=おく ／
            ▶=うごかす ■=カット!
          </div>
        </div>
      </div>

      {/* ほぞんモーダル（作品名ひらがな8文字・既存の名前入力の作法=maxLength+IME確定後slice） */}
      {saveOpen && (
        <div className="studio-confirm">
          <div className="box">
            <div className="msg">さくひんの なまえを つけてね<br />
              <span style={{ fontSize: 11, color: "#8a7a60" }}>（{NAME_MAX}もじまで・そのままでも いいよ）</span></div>
            <input value={saveName} maxLength={NAME_MAX} onChange={e => setSaveName(e.target.value.slice(0, NAME_MAX))}
              placeholder={profileRef.current ? nextWorkName((space.peek(profileRef.current) || {}).works || []) : nextWorkName([])} />
            <button className="ok" onClick={doSaveWork}>ほぞんする</button>
            <button className="no" onClick={() => setSaveOpen(false)}>やめる</button>
          </div>
        </div>
      )}
      {/* かんせい!（段階3 §3-2・新規保存の完了演出） */}
      {saveDone && (
        <div className="studio-confirm">
          <div className="box">
            <div className="msg" style={{ fontSize: 20 }}>かんせい!</div>
            <div style={{ color: "#6b4a26", fontSize: 13, fontWeight: 900, marginBottom: 10 }}>
              「{saveDone.name}」を {TXT.shelfName}に ほぞんした</div>
            <div style={{ color: "#4a3520", fontSize: 15, fontWeight: 900, marginBottom: 6 }}>
              けいけんち +{saveDone.grant.xp}</div>
            {saveDone.grant.coins > 0 && (
              <div style={{ color: "#4a3520", fontSize: 15, fontWeight: 900, marginBottom: 6,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <img src={iconCoin} alt="コイン" style={{ width: 20, height: 20, objectFit: "contain" }} />
                +{saveDone.grant.coins}
              </div>
            )}
            {saveDone.grant.hit.map(id => (
              <div key={id} style={{ background: "#FFF3D0", border: "2px solid #C77E0C", borderRadius: 999,
                color: "#8F5606", fontSize: 13, fontWeight: 900, padding: "5px 14px", margin: "6px 0" }}>
                {MILESTONE_NAMES[id] || id}
              </div>
            ))}
            <button className="ok" style={{ marginTop: 8 }} onClick={() => setSaveDone(null)}>やったー!</button>
          </div>
        </div>
      )}
      {/* キャラ削除の確認（アプリ内で唯一の確認・設計§9） */}
      {confirmDel && (
        <div className="studio-confirm">
          <div className="box">
            <div className="msg">この こと プログラムを けす？<br />——とりけしで もどせるよ</div>
            <button className="yes" onClick={() => confirmRemove(true)}>けす</button>
            <button className="no" onClick={() => confirmRemove(false)}>やめる</button>
          </div>
        </div>
      )}
      {toast && <div className="studio-toast">{toast}</div>}
      <div className="studio-narrow">
        この あそびは<br />タブレットか パソコンで<br />あそんでね
      </div>
    </div>
  );
}
