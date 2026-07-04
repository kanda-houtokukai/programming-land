// かんがえるクイズ（v1から移植）
import { useState } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { QUIZ_SETS } from "../data/quizzes.js";
import { SFX } from "../sound.js";
import { today } from "../storage.js";
import { XP, applyXp } from "../growth.js";

function QuizPlay({ set, save, update, onBack }) {
  const sound = save.settings.sound;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = set.qs[i];
  function pick(idx) {
    if (picked !== null) return;
    setPicked(idx);
    const ok = idx === q.a;
    if (ok) { setScore(s => s + 1); SFX.star(sound); } else SFX.fail(sound);
  }
  function next() {
    SFX.tap(sound);
    if (i + 1 < set.qs.length) { setI(i + 1); setPicked(null); }
    else {
      const final = score;
      setDone(true); SFX.win(sound);
      update(s => {
        s.quiz.best[set.id] = Math.max(s.quiz.best[set.id] || 0, final);
        const d = today(); s.log[d] = s.log[d] || {}; s.log[d].quiz = (s.log[d].quiz || 0) + 1;
        applyXp(s, XP.quizSet(final));
        return s;
      });
    }
  }
  if (done) {
    const perfect = score === set.qs.length;
    return (
      <div className="panel pop" style={{ margin: "20px 16px", padding: 26, textAlign: "center" }}>
        <div style={{ fontSize: 54 }}>{perfect ? "🏆" : "🎉"}</div>
        <div className="pl-display" style={{ fontSize: 26 }}>{set.qs.length}もん中 {score}もん せいかい！</div>
        <div style={{ fontWeight: 800, margin: "8px 0" }}>
          {perfect ? "まんてん！すごい！！" : "また ちょうせんすると まんてんに なれるよ！"}
        </div>
        <Btn big bg={C.leaf} onClick={onBack}>クイズの へやへ もどる</Btn>
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px 30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "8px 0" }}>
        <Btn bg="#fff" onClick={onBack}>◀ もどる</Btn>
        <div style={{ fontWeight: 900 }}>{set.emoji} {set.name}　{i + 1} / {set.qs.length}もんめ</div>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {set.qs.map((_, k) => (
          <div key={k} style={{ flex: 1, height: 10, borderRadius: 999, border: `2px solid ${C.ink}`, background: k < i ? C.leaf : k === i ? C.sun : "#fff" }} />
        ))}
      </div>
      <div className="panel slide" style={{ padding: 20 }} key={i}>
        <div style={{ fontWeight: 900, fontSize: 19, whiteSpace: "pre-line", marginBottom: 16 }}>{q.q}</div>
        <div style={{ display: "grid", gap: 10 }}>
          {q.opts.map((o, idx) => {
            let bg = "#fff";
            if (picked !== null) {
              if (idx === q.a) bg = "#D7F5D9";
              else if (idx === picked) bg = "#FFD6DC";
            }
            return (
              <button key={idx} className="pbtn" onClick={() => pick(idx)}
                style={{ background: bg, padding: "14px 16px", fontSize: 19, textAlign: "left" }}>
                {o} {picked !== null && idx === q.a && " ⭕"}{picked !== null && idx === picked && idx !== q.a && " ❌"}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className="slide" style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 800, background: "#EAF7FF", border: `3px solid ${C.ink}`, borderRadius: 14, padding: 12 }}>
              {picked === q.a ? "🎉 せいかい！" : "💪 おしい！"} {q.why}
            </div>
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <Btn big bg={C.leaf} onClick={next}>{i + 1 < set.qs.length ? "つぎの もんだい ▶" : "けっかを みる 🏁"}</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Quiz({ save, update, go, onSound }) {
  const [setId, setSetId] = useState(null);
  const set = QUIZ_SETS.find(s => s.id === setId);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="💡 かんがえる クイズ" onHome={() => go("home")} onSound={onSound} />
      {set
        ? <QuizPlay key={set.id} set={set} save={save} update={update} onBack={() => setSetId(null)} />
        : (
          <div style={{ display: "grid", gap: 14, padding: "0 16px" }}>
            {QUIZ_SETS.map((s, i) => {
              const best = save.quiz.best[s.id];
              return (
                <button key={s.id} className="pbtn slide" onClick={() => setSetId(s.id)}
                  style={{ background: "#fff", padding: 16, display: "flex", gap: 14, alignItems: "center", textAlign: "left", animationDelay: `${i * 0.05}s` }}>
                  <span style={{ fontSize: 38, background: s.color, border: `3px solid ${C.ink}`, borderRadius: 16, padding: "6px 10px" }}>{s.emoji}</span>
                  <span style={{ flex: 1 }}>
                    <span className="pl-display" style={{ fontSize: 19, display: "block" }}>{s.name}</span>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{s.desc}</span>
                  </span>
                  <span className="panel" style={{ padding: "6px 10px", borderRadius: 12, fontWeight: 900, fontSize: 13, background: best === s.qs.length ? C.sun : "#fff" }}>
                    {best === undefined ? "はじめて" : best === s.qs.length ? "🏆 まんてん" : `ベスト ${best}/${s.qs.length}`}
                  </span>
                </button>
              );
            })}
          </div>
        )}
    </div>
  );
}
