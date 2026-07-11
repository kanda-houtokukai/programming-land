// かんがえるクイズ（P3: 5カテゴリ×3難易度・5問シャッフル出題）
// カテゴリ選択は「クイズのひろば」マップ（お祭り広場・パズル島と同じ背景＋%座標方式・2026-07-11）
import { useState } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { QUIZ_CATEGORIES, QUIZ_DIFFS, SESSION_SIZE, buildSession, bestKey, poolFor } from "../data/quizzes.js";
import { SFX } from "../sound.js";
import { today } from "../storage.js";
import { XP, applyXp, addCoins, COIN } from "../growth.js";
import HowTo from "./HowTo.jsx";
import ParentGuide from "./ParentGuide.jsx";
import { QUIZ_GUIDE } from "../data/parent-guide.js";
import plazaDay from "../assets/quizplaza-day.webp";
import plazaSunset from "../assets/quizplaza-sunset.webp";
import plazaNight from "../assets/quizplaza-night.webp";
import iconJunban from "../assets/icon_quiz_junban.png";
import iconKimari from "../assets/icon_quiz_kimari.png";
import iconNakama from "../assets/icon_quiz_nakamawake.png";
import iconRobot from "../assets/icon_quiz_robot.png";
import iconYomitori from "../assets/icon_quiz_yomitori.png";

// 難易度別のひろば背景（同一構図・時間帯違い。拠点座標 PLAZA_POS は3枚共通＝パズル島 MAP_BG と同方式）
const PLAZA_BG = { easy: plazaDay, normal: plazaSunset, hard: plazaNight };
// 拠点の%座標＋アイコン＋短い名前（指示書の実測値・3枚共通で空き地に乗ることを検証済み）。
// 中央(50, 41)は電球モニュメント（装飾・タップ無し）。座標微調整はここだけ触ればよい。
const PLAZA_POS = {
  // 実機FBで四隅4拠点を中心(50,41)へ寄せた（当初から各軸3pt・b3t・2026-07-11）。よみとりはぴったりで不変
  junban: { left: 27.5, top: 29.5, img: iconJunban, short: "じゅんばん" },
  kimari: { left: 72.5, top: 29.5, img: iconKimari, short: "きまり" },
  nakama: { left: 19.5, top: 57.0, img: iconNakama, short: "なかまわけ" }, // 実機FBで +2pt(b3u)→さらに+1pt 下（b3v）
  robot: { left: 79.5, top: 54.0, img: iconRobot, short: "ロボット" },     // 実機FBで -1pt 左（b3u）
  yomitori: { left: 50.0, top: 79.0, img: iconYomitori, short: "よみとり" },
};

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
        const prevBest = s.quiz.best[session.key] || 0;
        s.quiz.best[session.key] = Math.max(prevBest, final);
        const d = today(); s.log[d] = s.log[d] || {}; s.log[d].quiz = (s.log[d].quiz || 0) + 1;
        addCoins(s, Math.max(0, final - prevBest) * COIN.quizCorrect); // ベスト更新分だけ（周回で稼げない・06-C）
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
      {/* おうちの方へ（カテゴリ別・モーダル）。回答途中でも開閉で状態は消えない */}
      <ParentGuide guide={QUIZ_GUIDE[session.catId]} />
    </div>
  );
}

export default function Quiz({ save, update, go, onSound, openHome }) {
  const diff = save.quiz.difficulty || "easy";
  const [session, setSession] = useState(null);
  const [popup, setPopup] = useState(null); // タップ中のカテゴリid（ポップアップ→はじめる）

  function setDiff(d) {
    SFX.tap(save.settings.sound);
    setSession(null);
    update(s => { s.quiz.difficulty = d; return s; });
  }
  function start(cat) {
    SFX.tap(save.settings.sound);
    setPopup(null);
    setSession({
      key: bestKey(cat.id, diff), catId: cat.id, name: cat.name, emoji: cat.emoji, color: cat.color,
      qs: buildSession(cat.id, diff),
    });
  }

  const popCat = popup && QUIZ_CATEGORIES.find(c => c.id === popup);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      {/* プレイ中の戻りは QuizPlay 内の「◀ もどる」1つ。一覧では ◀もどる=ワールドマップへ（1階層） */}
      <Header save={save} title="💡 かんがえる クイズ" onBack={session ? undefined : () => go("home")} onSound={onSound} onOpenHome={openHome} />
      {session
        ? <QuizPlay key={session.key + session.qs[0].id} session={session} save={save} update={update} onBack={() => setSession(null)} />
        : (
          <>
            {/* むずかしさ えらび: タブ（色＋言葉。★は成績専用＝メモ03）。切替でひろばが昼→夕→夜に */}
            <div style={{ display: "flex", gap: 8, padding: "0 16px", marginBottom: 4 }}>
              {QUIZ_DIFFS.map(d => (
                <Btn key={d.id} bg={diff === d.id ? d.color : "#fff"} onClick={() => setDiff(d.id)}
                  style={{ fontSize: 14, flex: 1, padding: "10px 6px", opacity: diff === d.id ? 1 : 0.75 }}>
                  {d.label}
                </Btn>
              ))}
            </div>
            <div style={{ fontWeight: 700, fontSize: 13, textAlign: "center", margin: "6px 0" }}>あそびたい クイズを タップしてね</div>
            {/* クイズのひろば（背景＋%座標の拠点・ワールドマップ/パズル島と同じ作法） */}
            <div style={{ margin: "0 14px", position: "relative", aspectRatio: "16 / 9",
              border: `3px solid ${C.ink}`, borderRadius: 22, boxShadow: "5px 5px 0 rgba(58,51,53,.9)",
              overflow: "hidden", background: "#8ED1F2" }}>
              <img src={PLAZA_BG[diff] || plazaDay} alt="クイズのひろば" draggable="false"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              {QUIZ_CATEGORIES.map((cat, i) => {
                const pos = PLAZA_POS[cat.id];
                const floatDelay = `${((i * 0.53) % 2.4).toFixed(2)}s`;
                const floatDur = `${(2.8 + (i % 3) * 0.5).toFixed(1)}s`;
                return (
                  <button key={cat.id} className="mapicon" onClick={() => { SFX.tap(save.settings.sound); setPopup(cat.id); }}
                    aria-label={cat.name}
                    style={{ position: "absolute", left: `${pos.left}%`, top: `${pos.top}%`,
                      transform: "translate(-50%,-50%)", width: "15%", aspectRatio: "1",
                      border: "none", background: "transparent", cursor: "pointer", padding: 0,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
                    <img src={pos.img} alt="" draggable="false" className="mapfloat"
                      style={{ width: "72%", height: "72%", objectFit: "contain", display: "block",
                        animationDelay: floatDelay, animationDuration: floatDur,
                        filter: "drop-shadow(1px 2px 2px rgba(20,15,25,.45))" }} />
                    {/* 短い名前チップ（白地・ひらがな＝パズル島のラベルと同じ作法） */}
                    <span style={{ whiteSpace: "nowrap", marginTop: 1, fontWeight: 900, fontSize: "clamp(8px,2vw,12px)",
                      background: "rgba(255,255,255,.92)", border: `2px solid ${C.ink}`, borderRadius: 999,
                      padding: "1px 7px", color: C.ink, lineHeight: 1.5 }}>{pos.short}</span>
                  </button>
                );
              })}
            </div>
            {/* タップ時ポップアップ: フル名前＋説明＋問題数＋はじめて/ベスト → はじめる（1階層ずつ） */}
            {popCat && (() => {
              const best = save.quiz.best[bestKey(popCat.id, diff)];
              const n = poolFor(popCat.id, diff).length;
              return (
                <div role="dialog" aria-modal="true" onClick={() => setPopup(null)} className="fadein"
                  style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(58,51,53,.45)",
                    display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
                  <div className="panel softpop" onClick={e => e.stopPropagation()}
                    style={{ maxWidth: 320, width: "100%", padding: 20, textAlign: "center", background: "#FFFDF5" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
                      <img src={PLAZA_POS[popCat.id].img} alt="" draggable="false" style={{ width: 84, height: 84, objectFit: "contain" }} />
                    </div>
                    <div className="pl-display" style={{ fontSize: 23 }}>{popCat.name}</div>
                    <div style={{ fontWeight: 800, fontSize: 14, margin: "8px 0 2px" }}>{popCat.desc}</div>
                    <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265" }}>もんだい {n}こ から {SESSION_SIZE}もん</div>
                    <div style={{ margin: "8px 0" }}>
                      <span className="panel" style={{ display: "inline-block", padding: "4px 12px", borderRadius: 12, fontWeight: 900, fontSize: 13,
                        background: best === SESSION_SIZE ? C.sun : "#fff" }}>
                        {best === undefined ? "はじめて" : best === SESSION_SIZE ? "🏆 まんてん" : `ベスト ${best}/${SESSION_SIZE}`}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 8 }}>
                      <Btn big bg={C.leaf} onClick={() => start(popCat)}>▶ はじめる</Btn>
                      <Btn bg="#fff" onClick={() => setPopup(null)}>とじる</Btn>
                    </div>
                  </div>
                </div>
              );
            })()}
          </>
        )}
    </div>
  );
}
