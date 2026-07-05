// タイピングモード（P4）。段階1「ひらがな ことば」= フルヒント（綴り＋次キー点灯）
// 段階2=綴りヒントのみ／段階3=ヒントなし は チェックポイント承認後に実装
import { useState, useEffect, useRef, useCallback } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { TYPING_STAGES, TYPING_WORDS, WORDS_PER_SESSION } from "../data/typing.js";
import { startWord, typeChar, hintRest, nextKey, currentUnitIndex, segment } from "../typing/romaji.js";
import TypingKeyboard from "./TypingKeyboard.jsx";
import HowTo from "./HowTo.jsx";
import ParentGuide from "./ParentGuide.jsx";
import { TYPING_GUIDE } from "../data/parent-guide.js";
import { SFX } from "../sound.js";
import { today } from "../storage.js";
import { XP, applyXp, addCoins, COIN } from "../growth.js";

function pickWords(list, n) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; }
  return a.slice(0, n);
}

const strip = w => w.replace(/\s+/g, "");

function TypingPlay({ stage, save, update, onBack }) {
  const sound = save.settings.sound;
  const [words] = useState(() => pickWords(TYPING_WORDS[stage.id], WORDS_PER_SESSION));
  const [wi, setWi] = useState(0);
  const [st, setSt] = useState(() => startWord(strip(words[0])));
  const [miss, setMiss] = useState(0);
  const [good, setGood] = useState(0);
  const [flash, setFlash] = useState(false);
  const [helpShown, setHelpShown] = useState(false); // 段階3: まちがえたら その語だけヒント表示
  const [result, setResult] = useState(null);
  const startRef = useRef(null);
  const stRef = useRef(st); stRef.current = st;

  const onKey = useCallback(e => {
    if (result) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const ch = e.key.toLowerCase();
    if (!/^[a-z-]$/.test(ch)) return;
    e.preventDefault();
    if (startRef.current === null) startRef.current = Date.now();
    const r = typeChar(stRef.current, ch);
    if (!r.ok) {
      setMiss(m => m + 1); setFlash(true); setTimeout(() => setFlash(false), 180);
      setHelpShown(true);
      SFX.fail(sound);
      return;
    }
    setGood(g => g + 1); SFX.tap(sound);
    if (r.state.done) {
      SFX.star(sound);
      const nextWi = wi + 1;
      if (nextWi < words.length) {
        setWi(nextWi); setSt(startWord(strip(words[nextWi]))); setHelpShown(false);
      } else {
        // けっか: 正確率と 1分あたりの文字数
        const totalGood = good + 1;
        const sec = Math.max(1, (Date.now() - startRef.current) / 1000);
        const acc = Math.round(100 * totalGood / (totalGood + miss));
        const kpm = Math.round(totalGood * 60 / sec);
        setResult({ acc, kpm });
        SFX.win(sound);
        update(s => {
          const b = s.typing.best[stage.id] || {};
          const isBest = kpm > (b.kpm || 0) || acc > (b.acc || 0); // 自己ベスト更新か
          s.typing.best[stage.id] = { acc: Math.max(b.acc || 0, acc), kpm: Math.max(b.kpm || 0, kpm) };
          const d = today(); s.log[d] = s.log[d] || {}; s.log[d].typing = (s.log[d].typing || 0) + 1;
          addCoins(s, COIN.typingClear + (isBest ? COIN.typingBest : 0));
          applyXp(s, XP.typing());
          return s;
        });
      }
    } else {
      setSt(r.state);
    }
  }, [result, sound, wi, words, good, miss, update, stage.id]);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  if (result) {
    const best = save.typing.best[stage.id] || {};
    return (
      <div className="panel pop" style={{ margin: "20px 16px", padding: 26, textAlign: "center" }}>
        <div style={{ fontSize: 54 }}>🎉</div>
        <div className="pl-display" style={{ fontSize: 26 }}>できた！</div>
        <div style={{ fontWeight: 900, fontSize: 18, margin: "10px 0" }}>
          せいかくりつ {result.acc}％ ／ 1ぷんに {result.kpm}もじ
        </div>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#6B6265", marginBottom: 14 }}>
          じこベスト: せいかくりつ {best.acc || 0}％・1ぷんに {best.kpm || 0}もじ
        </div>
        <Btn big bg={C.leaf} onClick={onBack}>タイピングの へやへ もどる</Btn>
      </div>
    );
  }

  const word = words[wi];
  const cur = currentUnitIndex(st);
  const rest = hintRest(st);
  const key = nextKey(st);
  const showSpell = stage.hint === "full" || stage.hint === "spell" || (stage.hint === "none" && helpShown);
  const showKey = stage.hint === "full";
  const isSentence = stage.id !== "kotoba";

  // 分かち書き表示: トークンごとに単位へ分け、通し番号で進捗ハイライト
  let unitOffset = 0;
  const tokens = word.split(/\s+/).filter(Boolean).map(tk => {
    const us = segment(tk);
    const start = unitOffset; unitOffset += us.length;
    return { us, start };
  });

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px 30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "8px 0" }}>
        <Btn bg="#fff" onClick={onBack}>◀ もどる</Btn>
        <div style={{ fontWeight: 900 }}>{stage.emoji} {stage.name}　{wi + 1} / {words.length}こめ</div>
        <div style={{ marginLeft: "auto", fontWeight: 800, fontSize: 13 }}>ミス {miss}</div>
      </div>
      <div style={{ marginBottom: 10 }}><HowTo id={`typing-${stage.id}`} /></div>

      {/* おだい */}
      <div className={"panel " + (flash ? "shake" : "")} style={{ padding: "18px 14px", textAlign: "center", background: flash ? "#FFF1F4" : "#fff" }}>
        <div style={{ fontSize: isSentence ? 26 : 40, fontWeight: 900, letterSpacing: isSentence ? 2 : 6, lineHeight: 1.6 }}>
          {tokens.map((tk, ti) => (
            <span key={ti} style={{ display: "inline-block", marginRight: isSentence ? 12 : 0 }}>
              {tk.us.map((u, i) => {
                const gi = tk.start + i;
                return (
                  <span key={i} style={{
                    color: gi < cur ? "#B9B0A6" : C.ink,
                    background: gi === cur ? "#FFF3C4" : "none",
                    borderRadius: 8, padding: "0 2px",
                  }}>{u}</span>
                );
              })}
            </span>
          ))}
        </div>
        {showSpell ? (
          <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: 3, marginTop: 6, fontFamily: "ui-monospace, monospace" }}>{rest}</div>
        ) : (
          <div style={{ fontWeight: 700, fontSize: 12, color: "#B9B0A6", marginTop: 6 }}>ノーヒントで ちょうせんちゅう（まちがえると ヒントが でるよ）</div>
        )}
      </div>

      {/* キーボード図 */}
      <div style={{ marginTop: 12 }}>
        <TypingKeyboard highlight={showKey ? key : null} />
      </div>
      <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", textAlign: "center", marginTop: 8 }}>
        キーボードで うってみよう！（がめんは さわらなくて いいよ）
      </div>
      {/* おうちの方へ（共通ガイド＋今の段階の補足・モーダル）。入力途中でも開閉で状態は消えない */}
      <ParentGuide guide={TYPING_GUIDE.common} extra={TYPING_GUIDE[stage.id]} />
    </div>
  );
}

export default function Typing({ save, update, go, onSound }) {
  const [stageId, setStageId] = useState(null);
  const stage = TYPING_STAGES.find(s => s.id === stageId);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="⌨️ タイピング" onHome={() => go("home")} onSound={onSound} />
      {stage
        ? <TypingPlay key={stage.id} stage={stage} save={save} update={update} onBack={() => setStageId(null)} />
        : (
          <div style={{ display: "grid", gap: 14, padding: "0 16px" }}>
            {TYPING_STAGES.map((s, i) => {
              const ready = TYPING_WORDS[s.id].length > 0;
              const best = save.typing.best[s.id];
              return (
                <button key={s.id} className="pbtn slide" disabled={!ready} onClick={() => setStageId(s.id)}
                  style={{ background: ready ? "#fff" : "#F1EDE4", padding: 16, display: "flex", gap: 14, alignItems: "center", textAlign: "left", animationDelay: `${i * 0.05}s` }}>
                  <span style={{ fontSize: 38, background: ready ? C.sky : "#CFC8BA", border: `3px solid ${C.ink}`, borderRadius: 16, padding: "6px 10px" }}>{ready ? s.emoji : "🔒"}</span>
                  <span style={{ flex: 1 }}>
                    <span className="pl-display" style={{ fontSize: 19, display: "block" }}>{s.name}</span>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{ready ? s.desc : "じゅんびちゅう…おたのしみに！"}</span>
                  </span>
                  {best && (
                    <span className="panel" style={{ padding: "6px 10px", borderRadius: 12, fontWeight: 900, fontSize: 12 }}>
                      {best.acc}％・{best.kpm}もじ/ぷん
                    </span>
                  )}
                </button>
              );
            })}
            <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", textAlign: "center" }}>
              ⌨️ そとづけキーボードを つかってね
            </div>
          </div>
        )}
    </div>
  );
}
