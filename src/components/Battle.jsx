// クイズバトル（P6・フェーズ1.5: 演出フルセット）
// 背景に相棒と敵が切り抜きで立つ定番構図（相棒=左下・敵=右上）。
// 正解→相棒が突進→敵がヒット（白フラッシュ＋💥＋画面ゆれ）→HPバーがすっと減る。
// 不正解→敵が突進→相棒がのけぞりハートがパリンと割れる。かいしんは文字ポップ＋強ゆれ。
// 勝利=敵ダウン→相棒ジャンプ→「かった！」→キラキラ。敗北=しょんぼり＋励まし（罰なし）。
// アイテム演出（回復/メガネ/パワー/たて）も実装済み（購入はフェーズ2。所持0なら欄ごと出ない）。
// 実装方式は進化演出と同じ CSS keyframe ＋ React state の段階制御。アニメ中は入力ロック。
import { useState, useRef, useEffect } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import HowTo from "./HowTo.jsx";
import ParentGuide from "./ParentGuide.jsx";
import { BATTLE_GUIDE } from "../data/parent-guide.js";
import { DIFFICULTIES } from "../data/islands.js";
import { battlePool } from "../data/quizzes.js";
import {
  PLAYER_HEARTS, HP_BY_DIFF, NORMAL_DAMAGE, CRIT_DAMAGE, critChance, BATTLE_XP,
  BATTLE_BG, ITEMS, enemiesFor, enemyUnlocked, equippedBgImg,
  TOWER_START_FLOOR, towerHp,
} from "../data/battle.js";
import { applyXp, addCoins, COIN } from "../growth.js";
import { today } from "../storage.js";
import { SFX } from "../sound.js";
import { stageForLevel, partnerStageScale } from "../data/monsters.js";
import MonsterArt from "./MonsterArt.jsx";
import iconTower from "../assets/icon_tower.png";

/* ---- 部品 ---- */

// 敵の絵（選択画面・勝利画面用の枠つき）。locked=🔒
function EnemyIcon({ enemy, size, locked }) {
  const boxBg = locked ? "#D2CCC0" : enemy.color;
  return (
    <span style={{ display: "inline-flex", background: boxBg, border: `3px solid ${C.ink}`, borderRadius: 18,
      padding: 4, lineHeight: 0, filter: locked ? "grayscale(1)" : "none" }}>
      {locked
        ? <span style={{ fontSize: size * 0.7, lineHeight: 1, padding: "2px 6px" }}>🔒</span>
        : <img src={enemy.img} alt={enemy.name} draggable="false" style={{ width: size, height: size, display: "block" }} />}
    </span>
  );
}

// 接地影（キャラが背景から浮かないように）
function GroundShadow({ w }) {
  return <div style={{ width: w, height: "12%", margin: "-6% auto 0", borderRadius: "50%",
    background: "radial-gradient(ellipse, rgba(30,20,25,.35) 0%, transparent 70%)" }} />;
}

// HUDピル（名前・HP/ハート）
function HudPill({ children, style }) {
  return <div style={{ position: "absolute", zIndex: 6, background: "rgba(255,255,255,.92)",
    border: `2px solid ${C.ink}`, borderRadius: 999, padding: "3px 10px", fontWeight: 900, fontSize: 12,
    display: "flex", alignItems: "center", gap: 6, ...style }}>{children}</div>;
}

// タワーの小アイコン（b4e: バトル中の🗼絵文字置換・テキスト高に合わせるinline img。大きさ調整はここ1箇所）
function TowerMini() {
  return <img src={iconTower} alt="" draggable="false"
    style={{ width: "1.1em", height: "1.1em", display: "inline-block", verticalAlign: "-0.18em", objectFit: "contain" }} />;
}

/* ---- バトル本体 ---- */

const T = { windup: 680, impact: 320, atkEnd: 780, fxClear: 980, heartGone: 900, downEnd: 950, overlay: 2150 };

// 相棒スプライトの基準幅%（stage1）。表示幅＝これ × partnerStageScale[stage]（20/24/29%・stage2≒従来の24%）。
// 実機で大きすぎ/小さすぎならこの1箇所を調整
const PARTNER_BASE_W = 20;

// tower=🗼タワーモード（06-A）: maxHpはtowerHpで上書き・勝敗コールバック差し替え・コイン/討伐/best/ずかんに触れない。
// 非tower（名前つき戦）は従来どおり不変。
function BattleFight({ enemy, diff, save, update, go, onBack, openHome, tower = false, floor = 1, maxHpOverride = 0, onFloorClear, onTowerLose, onTowerRetry }) {
  const sound = save.settings.sound;
  const maxHp = tower ? maxHpOverride : HP_BY_DIFF[diff];
  const [queue] = useState(() => battlePool(diff));
  const [qi, setQi] = useState(0);
  const [hearts, setHearts] = useState(PLAYER_HEARTS);
  const [enemyHp, setEnemyHp] = useState(maxHp);
  const [picked, setPicked] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle→atk/eatk→fb ／ down→victory ／ lose
  const [msg, setMsg] = useState(null);
  const [fx, setFx] = useState({});           // {hit:'enemy'|'partner', crit, shield, sparkle, critPop, won}
  const [shakeCls, setShakeCls] = useState("");
  const [breakingIdx, setBreakingIdx] = useState(null);
  const [buffs, setBuffs] = useState({ power: false, shield: false });
  const [critAtk, setCritAtk] = useState(false); // かいしん確定（予兆〜突進〜命中まで演出を派手に）
  const [heal, setHeal] = useState(false);
  const [fadedIdx, setFadedIdx] = useState(null);
  const [itemUsed, setItemUsed] = useState(false);
  const [overlay, setOverlay] = useState(null); // 'win' | 'lose'
  const [firstKill, setFirstKill] = useState(false);
  const [dmgPop, setDmgPop] = useState(null); // 演出磨き③: 浮遊ダメージ数字 {value, crit, id}（reduced-motionでは出さない）
  const timers = useRef([]);
  const granted = useRef(false);
  // 演出磨き①（06-A Phase2）: メッセージのタイプライター表示。1文字ずつ・タップで即全表示。
  // reduced-motion は即時全表示（プロジェクト既定の尊重）
  const reducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [typedLen, setTypedLen] = useState(0);
  const [typedFor, setTypedFor] = useState(null);
  const typeTimer = useRef(null);
  if (msg !== typedFor) { // msg が変わった描画で即リセット（effect待ちだと前の長さで一瞬全文が見える）
    setTypedFor(msg);
    setTypedLen(!msg || reducedMotion ? (msg || "").length : 0);
  }
  useEffect(() => {
    if (typeTimer.current) { clearInterval(typeTimer.current); typeTimer.current = null; }
    if (!msg || reducedMotion) return;
    const step = Math.max(1, Math.ceil(msg.length / 25)); // 1文字≈28ms・全文≈700ms以内（長文は文字数/ tickを増やす）
    typeTimer.current = setInterval(() => {
      setTypedLen(n => {
        const nn = Math.min(msg.length, n + step);
        if (nn >= msg.length && typeTimer.current) { clearInterval(typeTimer.current); typeTimer.current = null; }
        return nn;
      });
    }, 28);
    return () => { if (typeTimer.current) { clearInterval(typeTimer.current); typeTimer.current = null; } };
  }, [msg, reducedMotion]);
  const skipType = () => { // パネルをタップで即全表示
    if (typeTimer.current) { clearInterval(typeTimer.current); typeTimer.current = null; }
    if (msg) setTypedLen(msg.length);
  };
  const q = queue[qi % queue.length];
  const pstage = stageForLevel(save.partner.level);
  // 第3波②: 相棒の飾り(deco)は廃止（着せ替えは主人公へ移行・dressup.js）。舞台はショップの画像背景で上書き
  const bgImg = equippedBgImg(save); // きせかえ舞台（画像）があれば 難易度背景を上書き

  const later = (ms, fn) => { timers.current.push(setTimeout(fn, ms)); };
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearTimers, []);

  function startWin() {
    setPhase("down"); SFX.down(sound);
    if (!granted.current) {
      granted.current = true;
      if (tower) {
        // 🗼フロアクリア: XPのみ（コイン無し=周回防止・06-C準拠。討伐/best/ずかんも触れない）。到達フロアをベスト記録
        update(s => {
          applyXp(s, BATTLE_XP[diff]);
          const d = today(); s.log[d] = s.log[d] || {}; s.log[d].battle = (s.log[d].battle || 0) + 1;
          s.battle.towerBest = s.battle.towerBest || {};
          s.battle.towerBest[diff] = Math.max(s.battle.towerBest[diff] || 0, floor);
          return s;
        });
      } else {
        setFirstKill(!save.battle.defeated.includes(enemy.id));
        update(s => {
          applyXp(s, BATTLE_XP[diff]);
          const isFirstKill = !s.battle.defeated.includes(enemy.id);
          if (isFirstKill) {
            addCoins(s, COIN.battle[diff]); // 初撃破のみ（再戦は0・周回で稼げない・06-C）
            s.battle.defeated.push(enemy.id);
          }
          s.battle.best[diff] = (s.battle.best[diff] || 0) + 1;
          const d = today(); s.log[d] = s.log[d] || {}; s.log[d].battle = (s.log[d].battle || 0) + 1;
          return s;
        });
      }
    }
    later(T.downEnd, () => { setPhase("victory"); setFx(f => ({ ...f, sparkle: true, won: true })); SFX.win(sound); });
    later(T.overlay, () => setOverlay("win"));
  }
  function startLose() {
    setPhase("lose"); // 罰なし: セーブは何も変えない（タワーは到達フロアのベストだけ記録）
    if (tower && onTowerLose) onTowerLose(floor);
    later(1100, () => setOverlay("lose"));
  }

  function pick(idx) {
    if (picked !== null || phase !== "idle") return;
    setPicked(idx);
    if (idx === q.a) {
      // かいしんは正解確定の時点で事前判定し、突進の前に「予兆」から演出を分岐する（推奨A）。
      // 予兆=相棒が光って構える(charge)→期待が高まってから 大きい突進→派手なヒット。
      const isCrit = Math.random() < critChance(save.partner.level);
      const dmg = (isCrit ? CRIT_DAMAGE : NORMAL_DAMAGE) * (buffs.power ? 2 : 1);
      const powered = buffs.power;
      const nhp = Math.max(0, enemyHp - dmg);
      // 演出磨き④: 通常攻撃の予備動作＝突進の直前に≈110msの「引き」（かいしんは既存の溜めがあるので二重にしない）
      const pre = (isCrit || reducedMotion) ? 0 : 110;
      const delay = isCrit ? T.windup : pre; // かいしんは溜め・通常は予備動作のぶん 後ろへずれる
      setCritAtk(isCrit);
      if (isCrit) {
        setPhase("windup");
        SFX.charge(sound);
        setMsg("⚡ なにか くるぞ…！");
        later(T.windup, () => setPhase("atk"));
      } else if (pre) {
        setPhase("ready");
        later(pre, () => setPhase("atk"));
      } else {
        setPhase("atk");
      }
      // 演出磨き②: ヒットストップ＝命中の瞬間は💥だけ出して一瞬固め、止めの後に揺れ・ダメージ・メッセージを解放。
      // かいしんは止めを長くして「重み」の差を出す。reduced-motion は止めなし。後続タイマも止めのぶん後ろへ。
      const stop = reducedMotion ? 0 : (isCrit ? 140 : 90);
      later(delay + T.impact, () => {
        (isCrit ? SFX.crit : SFX.star)(sound);
        setFx({ hit: "enemy", crit: isCrit, critPop: isCrit });
      });
      later(delay + T.impact + stop, () => {
        setShakeCls(isCrit || dmg >= 2 ? "shake2" : "shake");
        setEnemyHp(nhp);
        if (!reducedMotion) setDmgPop({ value: dmg, crit: isCrit, id: Date.now() }); // 演出磨き③: ヒットストップ解放と同時に数字が飛ぶ
        if (powered) setBuffs(b => ({ ...b, power: false }));
        setMsg(`${isCrit ? "⚡ かいしんの いちげき！" : "こうげき せいこう！"}${powered ? "（💪 2ばい）" : ""} ${dmg}ダメージ！`);
      });
      later(delay + T.atkEnd + stop, () => { if (nhp <= 0) startWin(); else setPhase("fb"); });
      later(delay + T.fxClear + stop, () => { setFx(f => ({ ...f, hit: null })); setShakeCls(""); setCritAtk(false); setDmgPop(null); });
    } else if (buffs.shield) {
      setPhase("eatk");
      later(T.impact, () => {
        SFX.shield(sound);
        setFx({ shield: true });
        setBuffs(b => ({ ...b, shield: false }));
        setMsg("🛡️ たてが こうげきを ふせいだ！");
      });
      later(T.atkEnd, () => setPhase("fb"));
      later(T.fxClear, () => setFx(f => ({ ...f, shield: false })));
    } else {
      const nh = Math.max(0, hearts - 1);
      setPhase("eatk");
      later(T.impact, () => {
        SFX.fail(sound);
        setFx({ hit: "partner" });
        setShakeCls("shake");
        setBreakingIdx(hearts - 1);
        setMsg("ミス！ てきの こうげき！");
      });
      later(T.heartGone, () => { setHearts(nh); setBreakingIdx(null); });
      later(T.fxClear, () => {
        setFx(f => ({ ...f, hit: null })); setShakeCls("");
        if (nh <= 0) startLose(); else setPhase("fb");
      });
    }
  }

  function next() {
    SFX.tap(sound); clearTimers();
    setPicked(null); setMsg(null); setFx({}); setShakeCls(""); setCritAtk(false); setDmgPop(null);
    setFadedIdx(null); setItemUsed(false); setQi(v => v + 1); setPhase("idle");
  }

  // アイテム使用（自分のターン前に1個だけ）
  function useItem(id) {
    if (phase !== "idle" || picked !== null || itemUsed || (save.items[id] || 0) <= 0) return;
    if (id === "drink" && hearts >= PLAYER_HEARTS) return;
    if (id === "glasses" && fadedIdx !== null) return;
    update(s => { s.items[id] = Math.max(0, (s.items[id] || 0) - 1); return s; });
    setItemUsed(true);
    if (id === "drink") { setHearts(h => Math.min(PLAYER_HEARTS, h + 1)); setHeal(true); SFX.heal(sound); later(950, () => setHeal(false)); setMsg("🧃 ハートが 1つ かいふく！"); }
    if (id === "power") { setBuffs(b => ({ ...b, power: true })); SFX.power(sound); setMsg("💪 つぎの せいかいは 2ばい ダメージ！"); }
    if (id === "shield") { setBuffs(b => ({ ...b, shield: true })); SFX.shield(sound); setMsg("🛡️ つぎの ミスを ふせぐよ！"); }
    if (id === "glasses") {
      const wrongs = q.opts.map((_, i) => i).filter(i => i !== q.a);
      setFadedIdx(wrongs[Math.floor(Math.random() * wrongs.length)]);
      SFX.hint(sound); setMsg("👓 こたえじゃない ものが 1つ きえた！");
    }
  }

  const ownedItems = ITEMS.filter(it => (save.items[it.id] || 0) > 0);
  const locked = phase !== "idle" || picked !== null;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 14px 30px" }}>
      {/* バトル中の戻りは「◀ にげる」1つ（1階層＝てき選びへ。ヘッダーには置かない＝二重にしない） */}
      <Header save={save} title="⚔️ クイズバトル" onSound={() => {}} onOpenHome={openHome} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "8px 0" }}>
        <Btn bg="#fff" onClick={onBack} disabled={!!overlay}>◀ にげる</Btn>
        <div style={{ fontWeight: 900 }}>{DIFFICULTIES.find(d => d.id === diff).short} {tower ? "タワー" : "バトル"}</div>
        {tower && <div style={{ fontWeight: 900, fontSize: 13, background: "#EFE7FF", border: `2px solid ${C.ink}`, borderRadius: 999, padding: "2px 10px" }}><TowerMini /> {floor}かい</div>}
      </div>

      {/* ===== バトルシーン（背景に切り抜きキャラが立つ） ===== */}
      <div className={shakeCls} style={{ border: `3px solid ${C.ink}`, borderRadius: 20, overflow: "hidden",
        boxShadow: "5px 5px 0 rgba(58,51,53,.9)" }}>
        <div style={{ position: "relative", aspectRatio: "16 / 9",
          ...{ backgroundImage: `url(${bgImg || BATTLE_BG[diff]})` },
          backgroundSize: "cover", backgroundPosition: "center" }}>

          {/* 敵HUD（右上） */}
          <HudPill style={{ top: "4%", right: "3%" }}>
            <span>{enemy.name}</span>
            <span style={{ display: "inline-block", width: 74, height: 10, border: `2px solid ${C.ink}`, borderRadius: 999, background: "#fff", overflow: "hidden" }}>
              <span style={{ display: "block", height: "100%", width: `${(enemyHp / maxHp) * 100}%`, background: "#FF5B6E", transition: "width .5s ease" }} />
            </span>
            <span>{enemyHp}/{maxHp}</span>
          </HudPill>

          {/* 敵（右上寄り）: 位置→突進→被弾/ダウン→待機ゆれ の層 */}
          <div style={{ position: "absolute", right: "8%", top: "16%", width: "28%", zIndex: 3 }}>
            <div className={phase === "eatk" ? "lunge" : ""} style={{ "--dx": "-46vw", "--dy": "9vw", maxWidth: "100%" }}>
              <div className={fx.hit === "enemy" ? "hitflash" : phase === "down" || (fx.won && enemyHp <= 0) ? "fall" : ""}>
                <div className={overlay || phase === "down" ? "" : "idle"}>
                  <img src={enemy.img} alt={enemy.name} draggable="false" style={{ width: "100%", display: "block" }} />
                </div>
              </div>
            </div>
            {phase !== "down" && !fx.won && <GroundShadow w="72%" />}
          </div>

          {/* 相棒HUD（左下のキャラの横） */}
          <HudPill style={{ bottom: "5%", left: "32%" }}>
            <span>あいぼう Lv.{save.partner.level}</span>
            <span style={{ fontSize: 14, letterSpacing: 1 }}>
              {Array.from({ length: PLAYER_HEARTS }, (_, i) =>
                i === breakingIdx
                  ? <span key={i} className="heartbreak">💔</span>
                  : <span key={i}>{i < hearts ? "💗" : "🤍"}</span>)}
            </span>
          </HudPill>

          {/* 相棒（左下寄り）。かいしん時は 溜め(charge)→大きい突進(--lsc)。幅は進化スケール適用（.fitArtがコンテナ幅で表示） */}
          <div style={{ position: "absolute", left: "5%", bottom: "4%", width: `${PARTNER_BASE_W * (partnerStageScale[pstage] || 1)}%`, zIndex: 4 }}>
            <div className={phase === "atk" ? "lunge" : phase === "ready" ? "anticip" : ""}
              style={{ "--dx": critAtk ? "48vw" : "44vw", "--dy": critAtk ? "-12vw" : "-10vw", "--lsc": critAtk ? 1.22 : 1.06, maxWidth: "100%" }}>
              <div className={[
                phase === "windup" ? "charge" : "",
                fx.hit === "partner" ? "hitflash" : "",
                phase === "victory" ? "victory" : "",
                phase === "lose" ? "droop" : "",
                heal ? "healglow" : "",
                buffs.power && phase !== "windup" ? "aura" : "",
              ].filter(Boolean).join(" ")}>
                <div className={overlay || phase === "lose" ? "" : "idle2"} style={{ position: "relative" }}>
                  <div className="fitArt"><MonsterArt species={save.partner.species} stage={pstage} size={200} /></div>
                  {/* 相棒の飾り(deco)は第3波②で廃止（着せ替えは主人公へ） */}
                </div>
              </div>
            </div>
            <GroundShadow w="70%" />
          </div>

          {/* かいしんの予兆⚡（溜め中、相棒の頭上に立ちのぼる） */}
          {phase === "windup" && (
            <>
              <span className="riseup" style={{ position: "absolute", left: "10%", bottom: "34%", fontSize: 30, zIndex: 5 }}>⚡</span>
              <span className="riseup" style={{ position: "absolute", left: "20%", bottom: "30%", fontSize: 24, animationDelay: ".22s", zIndex: 5 }}>⚡</span>
              <span className="riseup" style={{ position: "absolute", left: "15%", bottom: "38%", fontSize: 20, animationDelay: ".44s", zIndex: 5 }}>✨</span>
            </>
          )}
          {/* 命中エフェクト💥（かいしんは大きく） */}
          {fx.hit === "enemy" && <div className="hitfx" style={{ position: "absolute", right: "16%", top: "26%", fontSize: fx.crit ? "min(14vw,84px)" : "min(9vw,56px)", zIndex: 5 }}>💥</div>}
          {/* 演出磨き③: 浮遊ダメージ数字（かいしんは大きめ・金色＝「かいしん！」ポップと同系色） */}
          {dmgPop && <div key={dmgPop.id} className="dmgfloat" style={{ position: "absolute", right: "17%", top: "18%", zIndex: 6,
            fontWeight: 900, fontSize: dmgPop.crit ? "min(11vw,64px)" : "min(7.5vw,44px)",
            color: dmgPop.crit ? "#FFD447" : "#fff",
            textShadow: `2px 2px 0 ${C.ink}, -2px 2px 0 ${C.ink}, 2px -2px 0 ${C.ink}, -2px -2px 0 ${C.ink}` }}>-{dmgPop.value}</div>}
          {fx.hit === "partner" && <div className="hitfx" style={{ position: "absolute", left: "12%", bottom: "24%", fontSize: "min(9vw,56px)", zIndex: 5 }}>💥</div>}
          {/* まもりのたてバリア */}
          {fx.shield && <div className="shieldpop" style={{ position: "absolute", left: "10%", bottom: "18%", fontSize: "min(11vw,64px)", zIndex: 5 }}>🛡️</div>}
          {/* かいしん！の文字ポップ */}
          {fx.critPop && <div className="critpop" style={{ position: "absolute", right: "18%", top: "8%", zIndex: 6,
            fontWeight: 900, fontSize: "min(7vw,38px)", color: "#FFD447",
            textShadow: `2px 2px 0 ${C.ink}, -2px 2px 0 ${C.ink}, 2px -2px 0 ${C.ink}, -2px -2px 0 ${C.ink}` }}>かいしん！</div>}
          {/* 勝利: かった！＋キラキラ */}
          {fx.won && (
            <>
              <div className="pop" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 7 }}>
                <span style={{ fontWeight: 900, fontSize: "min(12vw,64px)", color: "#fff",
                  textShadow: `3px 3px 0 ${C.ink}, -3px 3px 0 ${C.ink}, 3px -3px 0 ${C.ink}, -3px -3px 0 ${C.ink}` }}>かった！</span>
              </div>
              {[12, 30, 50, 68, 84, 40].map((x, i) => (
                <span key={i} className="riseup" style={{ position: "absolute", left: `${x}%`, bottom: "18%", fontSize: 26,
                  animationDelay: `${i * 0.14}s`, zIndex: 6 }}>{i % 2 ? "✨" : "⭐"}</span>
              ))}
            </>
          )}
        </div>
      </div>

      {/* たたかいメッセージ（演出磨き①: 1文字ずつ表示・タップで即全表示） */}
      {msg && <div className="panel slide" onClick={skipType} style={{ padding: "8px 12px", marginTop: 8, textAlign: "center", fontWeight: 900, fontSize: 14,
        background: fx.crit ? "#FFF0B3" : fx.hit === "partner" ? "#FFE6EA" : "#FFFDF5", minHeight: 21, cursor: "pointer" }}>{msg.slice(0, typedLen)}</div>}

      {/* アイテム（もっている ときだけ・1もんに 1こ） */}
      {ownedItems.length > 0 && !overlay && (
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontWeight: 900, fontSize: 12 }}>アイテム:</span>
          {ownedItems.map(it => (
            <button key={it.id} className="pbtn" onClick={() => useItem(it.id)}
              disabled={locked || itemUsed || (it.id === "drink" && hearts >= PLAYER_HEARTS) || (it.id === "glasses" && fadedIdx !== null)}
              title={it.desc}
              style={{ background: "#fff", padding: "6px 10px", fontSize: 14 }}>
              <img src={it.img} alt={it.emoji} draggable="false" style={{ width: 22, height: 22, objectFit: "contain", verticalAlign: "-4px" }} /> ×{save.items[it.id]}
            </button>
          ))}
          {itemUsed && <span style={{ fontWeight: 700, fontSize: 11, color: "#6B6265" }}>（この もんだいでは もう つかったよ）</span>}
        </div>
      )}

      {/* もんだい */}
      <div className="panel slide" style={{ padding: 16, marginTop: 10 }} key={qi}>
        <div style={{ fontWeight: 900, fontSize: 17, whiteSpace: "pre-line", marginBottom: 12 }}>{q.q}</div>
        <div style={{ display: "grid", gap: 10 }}>
          {q.opts.map((o, idx) => {
            let bg = "#fff";
            if (picked !== null) { if (idx === q.a) bg = "#D7F5D9"; else if (idx === picked) bg = "#FFD6DC"; }
            return (
              <button key={idx} className={"pbtn" + (idx === fadedIdx ? " fadeopt" : "")} onClick={() => pick(idx)}
                disabled={locked || idx === fadedIdx}
                style={{ background: bg, padding: "12px 14px", fontSize: 17, textAlign: "left" }}>
                {o}{picked !== null && idx === q.a && " ⭕"}{picked !== null && idx === picked && idx !== q.a && " ❌"}
              </button>
            );
          })}
        </div>
        {phase === "fb" && (
          <div className="slide" style={{ marginTop: 12 }}>
            {q.why && <div style={{ fontWeight: 800, fontSize: 13, background: "#EAF7FF", border: `2px solid ${C.ink}`, borderRadius: 12, padding: 10, marginBottom: 10 }}>{q.why}</div>}
            <div style={{ textAlign: "center" }}>
              <Btn big bg={C.leaf} onClick={next}>つぎの もんだい ▶</Btn>
            </div>
          </div>
        )}
      </div>

      {/* ===== 勝敗オーバーレイ ===== */}
      {overlay === "win" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel pop" style={{ padding: 24, textAlign: "center", maxWidth: 400, background: "#FFFDF5" }}>
            <div style={{ fontSize: 48 }}>{tower ? <TowerMini /> : "🎉"}</div>
            <div className="pl-display" style={{ fontSize: 25 }}>{tower ? `${floor}かいを クリア！` : `${enemy.name}に かった！`}</div>
            <div style={{ margin: "10px 0", display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
              <EnemyIcon enemy={enemy} size={64} /><span style={{ fontSize: 34 }}>✨</span>
            </div>
            <div style={{ fontWeight: 800, fontSize: 14 }}>
              {tower ? <>けいけんち ＋{BATTLE_XP[diff]} XP</> : <>けいけんち ＋{BATTLE_XP[diff]} XP ／ 🪙 {firstKill ? `＋${COIN.battle[diff]}！` : "＋0（たおしたことのある あいて）"}</>}
              {!tower && firstKill && <><br />🆕 あたらしい あいてを ずかんに とうろく！</>}
              {tower && <><br />うえの かいは てきが つよくなるよ！</>}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
              {tower
                ? <Btn big bg={C.leaf} onClick={() => onFloorClear && onFloorClear()}>つぎの フロアへ ▶</Btn>
                : <Btn big bg={C.leaf} onClick={onBack}>つぎの てきへ ▶</Btn>}
              <Btn bg="#fff" onClick={() => go("home")}>ホームへ</Btn>
            </div>
          </div>
        </div>
      )}
      {overlay === "lose" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel pop" style={{ padding: 24, textAlign: "center", maxWidth: 400, background: "#F3F7FF" }}>
            <div style={{ fontSize: 48 }}>💧</div>
            <div className="pl-display" style={{ fontSize: 23 }}>
              {tower ? <><TowerMini /> {floor}かいまで のぼった！</> : "おしかった！ また ちょうせんしよう"}
            </div>
            <div style={{ fontWeight: 800, fontSize: 14, margin: "10px 0" }}>
              {tower && <>さいこうきろく: {Math.max((save.battle.towerBest || {})[diff] || 0, floor)}かい<br /></>}
              まちがえた もんだいを おぼえたら つぎは かてるよ。
              {diff !== "easy" && <><br />「やさしい」で れんしゅうするのも いいね。</>}
              {ITEMS.some(it => (save.items[it.id] || 0) > 0) && <><br />アイテムを つかうと らくに なるよ。</>}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 10 }}>
              {tower
                ? <Btn big bg={C.leaf} onClick={() => onTowerRetry && onTowerRetry()}>もういちど（1かいから）</Btn>
                : <Btn big bg={C.leaf} onClick={onBack}>もういちど</Btn>}
              <Btn bg="#fff" onClick={() => go("home")}>ホームへ</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- 入口（難易度→敵選択） ---- */

export default function Battle({ save, update, go, onSound, openHome }) {
  const [diff, setDiff] = useState("easy");
  const [fight, setFight] = useState(null);
  const [tower, setTower] = useState(false);        // 🗼タワー起動中か（06-A）
  const [floor, setFloor] = useState(TOWER_START_FLOOR);
  const [towerRun, setTowerRun] = useState(0);      // もういちど用（floor1同士でもremountさせる）
  const defeated = (save.battle && save.battle.defeated) || [];
  const towerBest = (save.battle && save.battle.towerBest) || {};
  const list = enemiesFor(diff);

  if (tower) {
    // 🗼タワー: 帯の3体を巡回・フロアが上がるほどHP増（towerHp）・クイズは帯の難易度のまま
    const e = list[(floor - 1) % list.length];
    return <BattleFight key={`tower-${diff}-${towerRun}-${floor}`} enemy={e} diff={diff} save={save} update={update} go={go}
      tower floor={floor} maxHpOverride={towerHp(diff, floor)}
      onFloorClear={() => setFloor(f => f + 1)}
      onTowerLose={fl => update(s => { s.battle.towerBest = s.battle.towerBest || {}; s.battle.towerBest[diff] = Math.max(s.battle.towerBest[diff] || 0, fl); return s; })}
      onTowerRetry={() => { setFloor(TOWER_START_FLOOR); setTowerRun(r => r + 1); }}
      onBack={() => { setTower(false); setFloor(TOWER_START_FLOOR); }} openHome={openHome} />;
  }

  if (fight) {
    return <BattleFight key={fight.id + diff} enemy={fight} diff={diff} save={save} update={update} go={go}
      onBack={() => setFight(null)} openHome={openHome} />;
  }
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="⚔️ クイズバトル" onBack={() => go("home")} onSound={onSound} onOpenHome={openHome} />
      {/* むずかしさ えらび: タブ（色＋言葉。★は成績専用＝メモ03） */}
      <div style={{ display: "flex", gap: 8, padding: "0 16px" }}>
        {DIFFICULTIES.map(d => (
          <Btn key={d.id} bg={diff === d.id ? d.color : "#fff"} onClick={() => { SFX.tap(save.settings.sound); setDiff(d.id); }}
            style={{ fontSize: 14, flex: 1, padding: "10px 6px", opacity: diff === d.id ? 1 : 0.75 }}>
            {d.label}
          </Btn>
        ))}
      </div>
      <div style={{ padding: "12px 16px 0", display: "grid", gap: 12 }}>
        <HowTo id="battle" />
        <div style={{ fontWeight: 800, fontSize: 13 }}>てきを えらんで バトル！（1体 たおすと つぎが でるよ）</div>
        {list.map((e, i) => {
          const un = enemyUnlocked(diff, i, defeated);
          const done = defeated.includes(e.id);
          return (
            <button key={e.id} className="pbtn" disabled={!un}
              onClick={() => { SFX.tap(save.settings.sound); setFight(e); }}
              style={{ background: done ? "#F1FFF0" : "#fff", padding: 14, display: "flex", gap: 14, alignItems: "center", textAlign: "left", opacity: un ? 1 : 0.5 }}>
              <EnemyIcon enemy={e} size={44} locked={!un} />
              <span style={{ flex: 1 }}>
                <span className="pl-display" style={{ fontSize: 19, display: "block" }}>{un ? e.name : "？？？"}</span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>HP {HP_BY_DIFF[diff]}　{done ? "✅ たおした" : un ? "ちょうせんできる！" : "まだ あらわれない"}</span>
              </span>
              {done && <span style={{ fontSize: 22 }}>✅</span>}
            </button>
          );
        })}
        {/* 🗼タワー入口（06-A）: 帯の3体を全撃破で解放。どこまで のぼれるか＝towerBest */}
        {(() => {
          const allDefeated = list.every(e => defeated.includes(e.id));
          const best = towerBest[diff] || 0;
          return (
            <button className="pbtn" disabled={!allDefeated}
              onClick={() => { SFX.tap(save.settings.sound); setFloor(TOWER_START_FLOOR); setTowerRun(r => r + 1); setTower(true); }}
              style={{ background: allDefeated ? "#F5EFFF" : "#fff", padding: 14, display: "flex", gap: 14, alignItems: "center", textAlign: "left", opacity: allDefeated ? 1 : 0.5 }}>
              <img src={iconTower} alt="" draggable="false" style={{ width: 44, height: 44, display: "block", objectFit: "contain" }} />
              <span style={{ flex: 1 }}>
                <span className="pl-display" style={{ fontSize: 19, display: "block" }}>タワー</span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>
                  {allDefeated
                    ? <>どこまで のぼれるか ちょうせん！ うえの かいほど てきが つよいよ{best > 0 && <>　🏅 さいこう {best}かい</>}</>
                    : "3体 たおすと あらわれる"}
                </span>
              </span>
            </button>
          );
        })()}
        <ParentGuide guide={BATTLE_GUIDE} />
      </div>
    </div>
  );
}
