// かんがえるクイズ（P3: 5カテゴリ×3難易度・5問シャッフル出題）
import { useState } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { QUIZ_CATEGORIES, QUIZ_DIFFS, SESSION_SIZE, buildSession, bestKey, poolFor } from "../data/quizzes.js";
import { SFX } from "../sound.js";
import { today } from "../storage.js";
import { XP, applyXp } from "../growth.js";
import HowTo from "./HowTo.jsx";

function QuizPlay({ session, save, update, onBack }) {
  const sound = save.settings.sound;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const qs = session.qs;
  const q = qs[i];
  function pick(idx) {
    if (picked !== null) return;
    setPicked(idx);
    const ok = idx === q.a;
    if (ok) { setScore(s => s + 1); SFX.star(sound); } else SFX.fail(sound);
  }
  function next() {
    SFX.tap(sound);
    if (i + 1 < qs.length) { setI(i + 1); setPicked(null); }
    else {
      const final = score;
      setDone(true); SFX.win(sound);
      update(s => {
        s.quiz.best[session.key] = Math.max(s.quiz.best[session.key] || 0, final);
        const d = today(); s.log[d] = s.log[d] || {}; s.log[d].quiz = (s.log[d].quiz || 0) + 1;
        applyXp(s, XP.quizSet(final));
        return s;
      });
    }
  }
  if (done) {
    const perfect = score === qs.length;
    return (
      <div className="panel pop" style={{ margin: "20px 16px", padding: 26, textAlign: "center" }}>
        <div style={{ fontSize: 54 }}>{perfect ? "🏆" : "🎉"}</div>
        <div className="pl-display" style={{ fontSize: 26 }}>{qs.length}もん中 {score}もん せいかい！</div>
        <div style={{ fontWeight: 800, margin: "8px 0" }}>
          {perfect ? "まんてん！すごい！！" : "もんだいは まいかい かわるよ。また ちょうせんしてね！"}
        </div>
        <Btn big bg={C.leaf} onClick={onBack}>クイズの へやへ もどる</Btn>
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px 30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "8px 0" }}>
        <Btn bg="#fff" onClick={onBack}>◀ もどる</Btn>
        <div style={{ fontWeight: 900 }}>{session.emoji} {session.name}　{i + 1} / {qs.length}もんめ</div>
      </div>
      <div style={{ marginBottom: 12 }}><HowTo id={`quiz-${session.catId}`} /></div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {qs.map((_, k) => (
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
              <Btn big bg={C.leaf} onClick={next}>{i + 1 < qs.length ? "つぎの もんだい ▶" : "けっかを みる 🏁"}</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Quiz({ save, update, go, onSound }) {
  const diff = save.quiz.difficulty || "easy";
  const [session, setSession] = useState(null);

  function setDiff(d) {
    SFX.tap(save.settings.sound);
    setSession(null);
    update(s => { s.quiz.difficulty = d; return s; });
  }
  function start(cat) {
    SFX.tap(save.settings.sound);
    setSession({
      key: bestKey(cat.id, diff), catId: cat.id, name: cat.name, emoji: cat.emoji, color: cat.color,
      qs: buildSession(cat.id, diff),
    });
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="💡 かんがえる クイズ" onHome={() => go("home")} onSound={onSound} />
      {session
        ? <QuizPlay key={session.key + session.qs[0].id} session={session} save={save} update={update} onBack={() => setSession(null)} />
        : (
          <>
            <div style={{ display: "flex", gap: 8, padding: "0 16px", flexWrap: "wrap", marginBottom: 4 }}>
              {QUIZ_DIFFS.map(d => (
                <Btn key={d.id} bg={diff === d.id ? C.sun : "#fff"} onClick={() => setDiff(d.id)} style={{ fontSize: 14 }}>
                  {d.label}
                </Btn>
              ))}
            </div>
            <div style={{ display: "grid", gap: 14, padding: "10px 16px 0" }}>
              {QUIZ_CATEGORIES.map((cat, i) => {
                const best = save.quiz.best[bestKey(cat.id, diff)];
                const n = poolFor(cat.id, diff).length;
                return (
                  <button key={cat.id} className="pbtn slide" onClick={() => start(cat)}
                    style={{ background: "#fff", padding: 16, display: "flex", gap: 14, alignItems: "center", textAlign: "left", animationDelay: `${i * 0.05}s` }}>
                    <span style={{ fontSize: 38, background: cat.color, border: `3px solid ${C.ink}`, borderRadius: 16, padding: "6px 10px" }}>{cat.emoji}</span>
                    <span style={{ flex: 1 }}>
                      <span className="pl-display" style={{ fontSize: 19, display: "block" }}>{cat.name}</span>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{cat.desc}（もんだい {n}こ から {SESSION_SIZE}もん）</span>
                    </span>
                    <span className="panel" style={{ padding: "6px 10px", borderRadius: 12, fontWeight: 900, fontSize: 13, background: best === SESSION_SIZE ? C.sun : "#fff" }}>
                      {best === undefined ? "はじめて" : best === SESSION_SIZE ? "🏆 まんてん" : `ベスト ${best}/${SESSION_SIZE}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
    </div>
  );
}
