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
  BATTLE_BG, ITEMS, enemiesFor, enemyUnlocked,
} from "../data/battle.js";
import { applyXp } from "../growth.js";
import { today } from "../storage.js";
import { SFX } from "../sound.js";
import { stageForLevel } from "../data/monsters.js";
import MonsterArt from "./MonsterArt.jsx";

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

/* ---- バトル本体 ---- */

const T = { windup: 680, impact: 320, atkEnd: 780, fxClear: 980, heartGone: 900, downEnd: 950, overlay: 2150 };

function BattleFight({ enemy, diff, save, update, go, onBack }) {
  const sound = save.settings.sound;
  const maxHp = HP_BY_DIFF[diff];
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
  const timers = useRef([]);
  const granted = useRef(false);
  const q = queue[qi % queue.length];
  const pstage = stageForLevel(save.partner.level);

  const later = (ms, fn) => { timers.current.push(setTimeout(fn, ms)); };
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearTimers, []);

  function startWin() {
    setPhase("down"); SFX.down(sound);
    if (!granted.current) {
      granted.current = true;
      setFirstKill(!save.battle.defeated.includes(enemy.id));
      update(s => {
        applyXp(s, BATTLE_XP[diff]);
        if (!s.battle.defeated.includes(enemy.id)) s.battle.defeated.push(enemy.id);
        s.battle.best[diff] = (s.battle.best[diff] || 0) + 1;
        const d = today(); s.log[d] = s.log[d] || {}; s.log[d].battle = (s.log[d].battle || 0) + 1;
        return s;
      });
    }
    later(T.downEnd, () => { setPhase("victory"); setFx(f => ({ ...f, sparkle: true, won: true })); SFX.win(sound); });
    later(T.overlay, () => setOverlay("win"));
  }
  function startLose() {
    setPhase("lose"); // 罰なし: セーブは何も変えない
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
      const delay = isCrit ? T.windup : 0; // かいしんだけ 溜めのぶん 後ろへずれる
      setCritAtk(isCrit);
      if (isCrit) {
        setPhase("windup");
        SFX.charge(sound);
        setMsg("⚡ なにか くるぞ…！");
        later(T.windup, () => setPhase("atk"));
      } else {
        setPhase("atk");
      }
      later(delay + T.impact, () => {
        (isCrit ? SFX.crit : SFX.star)(sound);
        setFx({ hit: "enemy", crit: isCrit, critPop: isCrit });
        setShakeCls(isCrit || dmg >= 2 ? "shake2" : "shake");
        setEnemyHp(nhp);
        if (powered) setBuffs(b => ({ ...b, power: false }));
        setMsg(`${isCrit ? "⚡ かいしんの いちげき！" : "こうげき せいこう！"}${powered ? "（💪 2ばい）" : ""} ${dmg}ダメージ！`);
      });
      later(delay + T.atkEnd, () => { if (nhp <= 0) startWin(); else setPhase("fb"); });
      later(delay + T.fxClear, () => { setFx(f => ({ ...f, hit: null })); setShakeCls(""); setCritAtk(false); });
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
    setPicked(null); setMsg(null); setFx({}); setShakeCls(""); setCritAtk(false);
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
      <Header save={save} title="⚔️ クイズバトル" onHome={() => go("home")} onSound={() => {}} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "8px 0" }}>
        <Btn bg="#fff" onClick={onBack} disabled={!!overlay}>◀ にげる</Btn>
        <div style={{ fontWeight: 900 }}>{DIFFICULTIES.find(d => d.id === diff).short} バトル</div>
      </div>

      {/* ===== バトルシーン（背景に切り抜きキャラが立つ） ===== */}
      <div className={shakeCls} style={{ border: `3px solid ${C.ink}`, borderRadius: 20, overflow: "hidden",
        boxShadow: "5px 5px 0 rgba(58,51,53,.9)" }}>
        <div style={{ position: "relative", aspectRatio: "16 / 9",
          backgroundImage: `url(${BATTLE_BG[diff]})`, backgroundSize: "cover", backgroundPosition: "center" }}>

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

          {/* 相棒（左下寄り）。かいしん時は 溜め(charge)→大きい突進(--lsc) */}
          <div style={{ position: "absolute", left: "5%", bottom: "4%", width: "24%", zIndex: 4 }}>
            <div className={phase === "atk" ? "lunge" : ""}
              style={{ "--dx": critAtk ? "48vw" : "44vw", "--dy": critAtk ? "-12vw" : "-10vw", "--lsc": critAtk ? 1.22 : 1.06, maxWidth: "100%" }}>
              <div className={[
                phase === "windup" ? "charge" : "",
                fx.hit === "partner" ? "hitflash" : "",
                phase === "victory" ? "victory" : "",
                phase === "lose" ? "droop" : "",
                heal ? "healglow" : "",
                buffs.power && phase !== "windup" ? "aura" : "",
              ].filter(Boolean).join(" ")}>
                <div className={overlay || phase === "lose" ? "" : "idle2"}>
                  <div className="fitArt"><MonsterArt species={save.partner.species} stage={pstage} size={200} /></div>
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

      {/* たたかいメッセージ */}
      {msg && <div className="panel slide" style={{ padding: "8px 12px", marginTop: 8, textAlign: "center", fontWeight: 900, fontSize: 14,
        background: fx.crit ? "#FFF0B3" : fx.hit === "partner" ? "#FFE6EA" : "#FFFDF5" }}>{msg}</div>}

      {/* アイテム（もっている ときだけ・1もんに 1こ） */}
      {ownedItems.length > 0 && !overlay && (
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontWeight: 900, fontSize: 12 }}>アイテム:</span>
          {ownedItems.map(it => (
            <button key={it.id} className="pbtn" onClick={() => useItem(it.id)}
              disabled={locked || itemUsed || (it.id === "drink" && hearts >= PLAYER_HEARTS) || (it.id === "glasses" && fadedIdx !== null)}
              title={it.desc}
              style={{ background: "#fff", padding: "6px 10px", fontSize: 14 }}>
              {it.emoji} ×{save.items[it.id]}
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
            <div style={{ fontSize: 48 }}>🎉</div>
            <div className="pl-display" style={{ fontSize: 25 }}>{enemy.name}に かった！</div>
            <div style={{ margin: "10px 0", display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
              <EnemyIcon enemy={enemy} size={64} /><span style={{ fontSize: 34 }}>✨</span>
            </div>
            <div style={{ fontWeight: 800, fontSize: 14 }}>
              けいけんち ＋{BATTLE_XP[diff]} XP！
              {firstKill && <><br />🆕 あたらしい あいてを ずかんに とうろく！</>}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
              <Btn big bg={C.leaf} onClick={onBack}>つぎの てきへ ▶</Btn>
              <Btn bg="#fff" onClick={() => go("home")}>ホームへ</Btn>
            </div>
          </div>
        </div>
      )}
      {overlay === "lose" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel pop" style={{ padding: 24, textAlign: "center", maxWidth: 400, background: "#F3F7FF" }}>
            <div style={{ fontSize: 48 }}>💧</div>
            <div className="pl-display" style={{ fontSize: 23 }}>おしかった！ また ちょうせんしよう</div>
            <div style={{ fontWeight: 800, fontSize: 14, margin: "10px 0" }}>
              まちがえた もんだいを おぼえたら つぎは かてるよ。
              {diff !== "easy" && <><br />「やさしい」で れんしゅうするのも いいね。</>}
              {ITEMS.some(it => (save.items[it.id] || 0) > 0) && <><br />アイテムを つかうと らくに なるよ。</>}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 10 }}>
              <Btn big bg={C.leaf} onClick={onBack}>もういちど</Btn>
              <Btn bg="#fff" onClick={() => go("home")}>ホームへ</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- 入口（難易度→敵選択） ---- */

export default function Battle({ save, update, go, onSound }) {
  const [diff, setDiff] = useState("easy");
  const [fight, setFight] = useState(null);
  const defeated = (save.battle && save.battle.defeated) || [];

  if (fight) {
    return <BattleFight key={fight.id + diff} enemy={fight} diff={diff} save={save} update={update} go={go}
      onBack={() => setFight(null)} />;
  }

  const list = enemiesFor(diff);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="⚔️ クイズバトル" onHome={() => go("home")} onSound={onSound} />
      <div style={{ display: "flex", gap: 8, padding: "0 16px", flexWrap: "wrap" }}>
        {DIFFICULTIES.map(d => (
          <Btn key={d.id} bg={diff === d.id ? C.sun : "#fff"} onClick={() => { SFX.tap(save.settings.sound); setDiff(d.id); }} style={{ fontSize: 14 }}>
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
        <ParentGuide guide={BATTLE_GUIDE} />
      </div>
    </div>
  );
}
