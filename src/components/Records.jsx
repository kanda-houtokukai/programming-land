// きろくの へや（v1から移植・保護者向けにプロファイル管理と書き出し/読み込みを追加）
import { useState, useRef } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { STAGES } from "../data/stages.js";
import { QUIZ_CATEGORIES, QUIZ_DIFFS, SESSION_SIZE } from "../data/quizzes.js";
import { DIFFICULTIES } from "../data/islands.js";
import { BADGES, puzzleStarsTotal, daysPlayed, clearedInDiff, star3InDiff } from "../data/badges.js";
import { lastNDays } from "../storage.js";
import { APP_VERSION, BUILD_DATE } from "../version.js";
import PartnerCard from "./PartnerCard.jsx";
import { equippedDeco } from "../data/battle.js";

function skillProgress(save) {
  const w = islandId => {
    const st = STAGES.filter(s => s.island === islandId);
    const got = st.reduce((a, s) => a + (save.puzzle.stars[s.id] || 0), 0);
    return Math.round(100 * got / (st.length * 3));
  };
  const quizTotal = QUIZ_CATEGORIES.length * QUIZ_DIFFS.length * SESSION_SIZE;
  const quizGot = Object.entries(save.quiz.best)
    .filter(([k]) => k.includes(":")) // 新形式のキーのみ（v1のq1〜q4は集計外）
    .reduce((a, [, v]) => a + v, 0);
  return [
    { name: "じゅんじょ（順次）", note: "めいれいを 正しい順番に組み立てる力", pct: w(1), color: C.leaf },
    { name: "くりかえし（反復）", note: "同じ処理をまとめて考える力", pct: w(2), color: C.sky },
    { name: "じょうけん（分岐）", note: "「もし〜なら」で場合分けする力", pct: w(3), color: C.grape },
    { name: "よそうする力（クイズ）", note: "きまり発見・順序立て・分類", pct: Math.round(100 * quizGot / quizTotal), color: C.sun },
    { name: "つくる力（創造）", note: "命令を組み合わせて作品を作る", pct: Math.min(100, save.art.gallery.length * 20), color: C.sakura },
    { name: "キーボード入力", note: "ローマ字タイピングの速さ（60もじ/分で100%）", pct: Math.min(100, Math.round(100 * Math.max(0, ...Object.values(save.typing.best).map(b => b.kpm || 0)) / 60)), color: "#FF9F43" },
  ];
}

// 難易度別の到達度（各難易度=全54面）。クリア面数・★3面数・獲得スター率
function diffBreakdown(save) {
  return DIFFICULTIES.map(d => {
    const total = STAGES.filter(s => s.difficulty === d.id).length;
    const cleared = clearedInDiff(save, d.id);
    const star3 = star3InDiff(save, d.id);
    return { id: d.id, label: d.short, total, cleared, star3, pct: Math.round(100 * cleared / total) };
  });
}

export default function Records({ save, profiles = [], go, onSound, onExport, onImportFile, onDeleteRequest, unlockAll, setUnlockAll }) {
  const [tab, setTab] = useState("kid");
  const [gate, setGate] = useState(false);
  const [ans, setAns] = useState("");
  const [ioMsg, setIoMsg] = useState(null);
  const fileRef = useRef(null);
  const skills = skillProgress(save);
  const days = lastNDays(14);
  const counts = days.map(d => {
    const l = save.log[d]; return l ? (l.puzzle || 0) + (l.quiz || 0) + (l.art || 0) + (l.battle || 0) : 0;
  });
  const maxC = Math.max(1, ...counts);
  const diffs = diffBreakdown(save);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 40 }}>
      <Header save={save} title="📖 きろくの へや" onHome={() => go("home")} onSound={onSound} />
      <div style={{ display: "flex", gap: 10, padding: "0 16px", marginBottom: 14 }}>
        <Btn bg={tab === "kid" ? C.sun : "#fff"} onClick={() => setTab("kid")}>🧒 わたしの きろく</Btn>
        <Btn bg={tab === "parent" ? C.sun : "#fff"} onClick={() => { setTab("parent"); setGate(false); setAns(""); setIoMsg(null); }}>👪 おうちのひとへ</Btn>
      </div>

      {tab === "kid" && (
        <div style={{ display: "grid", gap: 16, padding: "0 16px" }}>
          <div className="panel slide" style={{ padding: 18, textAlign: "center" }}>
            <span style={{ fontSize: 50 }}>{save.avatar}</span>
            <div className="pl-display" style={{ fontSize: 24 }}>{save.name} の ぼうけん</div>
            <div style={{ fontWeight: 800, marginTop: 6 }}>⭐ {puzzleStarsTotal(save)}こ ／ 🏅 バッジ {save.badges.length}こ ／ 🔥 {daysPlayed(save)}にち あそんだ</div>
          </div>
          <PartnerCard partner={save.partner} size={80} deco={equippedDeco(save)} />
          <div className="panel" style={{ padding: 18 }}>
            <div className="pl-display" style={{ fontSize: 20, marginBottom: 10 }}>🏅 バッジ コレクション</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 }}>
              {BADGES.map(b => {
                const got = save.badges.includes(b.id);
                return (
                  <div key={b.id} className="panel" style={{ padding: 10, textAlign: "center", borderRadius: 14, background: got ? C.sun : "#F5F2EC", opacity: got ? 1 : 0.85 }}>
                    <div style={{ fontSize: 30, filter: got ? "none" : "grayscale(1)", opacity: got ? 1 : 0.5 }}>{got ? b.emoji : "❔"}</div>
                    {got
                      ? <><div style={{ fontWeight: 900, fontSize: 13 }}>{b.name}</div>
                        <div style={{ fontSize: 11, fontWeight: 700 }}>{b.desc}</div></>
                      : <div style={{ fontSize: 11, fontWeight: 700, color: "#A49E95" }}>{b.desc}</div>}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="panel" style={{ padding: 18 }}>
            <div className="pl-display" style={{ fontSize: 20, marginBottom: 10 }}>💪 そだった ちから</div>
            {skills.map(s => (
              <div key={s.name} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 900, fontSize: 14 }}>{s.name} <span style={{ float: "right" }}>{s.pct}%</span></div>
                <div style={{ height: 16, border: `3px solid ${C.ink}`, borderRadius: 999, overflow: "hidden", background: "#fff" }}>
                  <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, transition: "width .4s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "parent" && !gate && (
        <div className="panel slide" style={{ margin: "0 16px", padding: 20, textAlign: "center" }}>
          <div style={{ fontWeight: 900, fontSize: 17 }}>👪 おうちのひと むけの がめんです</div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>「さん かける よん」の こたえを すうじで いれてください</div>
          <input value={ans} inputMode="numeric" onChange={e => setAns(e.target.value)}
            style={{ fontSize: 24, width: 90, textAlign: "center", padding: 8, border: `3px solid ${C.ink}`, borderRadius: 12, fontFamily: "inherit", fontWeight: 800 }} />
          <div style={{ marginTop: 12 }}>
            <Btn bg={C.leaf} onClick={() => { if (ans.trim() === "12") setGate(true); }}>ひらく</Btn>
          </div>
        </div>
      )}

      {tab === "parent" && gate && (
        <div style={{ display: "grid", gap: 16, padding: "0 16px" }}>
          <div className="panel" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 6 }}>学びの見える化（文部科学省「プログラミング的思考」対応）</div>
            <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 12px" }}>
              小学校で育成をめざす「順次・反復・分岐」の考え方を、3つの遊びに分解して練習しています。バーは到達度の目安です。
            </p>
            {skills.map(s => (
              <div key={s.name} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 900, fontSize: 14 }}>{s.name} <span style={{ float: "right" }}>{s.pct}%</span></div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#6B6265" }}>{s.note}</div>
                <div style={{ height: 12, border: `2px solid ${C.ink}`, borderRadius: 999, overflow: "hidden", background: "#fff", marginTop: 4 }}>
                  <div style={{ width: `${s.pct}%`, height: "100%", background: s.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* 難易度別の到達度（やさしい/ふつう/むずかしい） */}
          <div className="panel" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 6 }}>難易度べつの ようす</div>
            <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 12px" }}>
              パズルは同じ「順次・反復・分岐」を3つの難しさで用意しています。まずは「やさしい」で成功体験を、慣れたら少しずつ上へ——という順で大丈夫です。
            </p>
            {diffs.map(d => (
              <div key={d.id} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 900, fontSize: 14 }}>
                  ⭐{"⭐".repeat(DIFFICULTIES.findIndex(x => x.id === d.id))} {d.label}
                  <span style={{ float: "right" }}>{d.cleared}/{d.total}面（★3が {d.star3}面）</span>
                </div>
                <div style={{ height: 12, border: `2px solid ${C.ink}`, borderRadius: 999, overflow: "hidden", background: "#fff", marginTop: 4 }}>
                  <div style={{ width: `${d.pct}%`, height: "100%", background: d.id === "easy" ? C.leaf : d.id === "normal" ? C.sky : C.grape }} />
                </div>
              </div>
            ))}
          </div>

          <div className="panel" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>直近14日の取り組み</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 110 }}>
              {days.map((d, i) => (
                <div key={d} style={{ flex: 1, textAlign: "center" }}>
                  <div title={`${d}: ${counts[i]}回`} style={{
                    height: `${(counts[i] / maxC) * 90}px`, minHeight: counts[i] ? 8 : 2,
                    background: counts[i] ? C.sky : "#E8E2D6", border: counts[i] ? `2px solid ${C.ink}` : "none",
                    borderRadius: 6,
                  }} />
                  <div style={{ fontSize: 9, fontWeight: 700, marginTop: 2 }}>{d.slice(8)}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, marginTop: 6 }}>棒の高さ＝その日の活動回数（パズルクリア・クイズ・作品保存・バトルの合計）</div>
          </div>

          {/* プロファイル別（お子さんが複数いる場合。それぞれの進み具合） */}
          {profiles.length > 1 && (
            <div className="panel" style={{ padding: 18 }}>
              <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 6 }}>お子さんべつの ようす</div>
              <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 12px" }}>
                このタブレットで あそんでいる お子さんごとの進み具合です。比べるためではなく、それぞれのペースを見守る目安にしてください。
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {profiles.map(p => {
                  const isMe = p.id === save.id;
                  const cleared = STAGES.filter(s => (p.puzzle.stars[s.id] || 0) > 0).length;
                  return (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                      border: `2px solid ${C.ink}`, borderRadius: 12, background: isMe ? "#FFF7E6" : "#fff" }}>
                      <span style={{ fontSize: 26 }}>{p.avatar}</span>
                      <span style={{ flex: 1, fontWeight: 900, fontSize: 14 }}>{p.name}{isMe && <span style={{ fontSize: 11, color: "#6B6265" }}>（いま えらんでいる子）</span>}</span>
                      <span style={{ fontWeight: 800, fontSize: 12, textAlign: "right", lineHeight: 1.5 }}>
                        パズル {cleared}面 ・ ⭐{puzzleStarsTotal(p)}<br />
                        🏅{p.badges.length} ・ 🔥{daysPlayed(p)}日
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="panel" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 6 }}>データの管理（{save.name} さんの記録）</div>
            <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px" }}>
              記録は<b>この端末のブラウザ内にのみ</b>保存されます。タブレットとPCの間で記録は共有されません。
              端末の引き継ぎ・故障への備えとして、ときどき「書き出し」でファイルに保存してください（読み込みは新しいプロファイルとして追加されます）。
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Btn bg={C.sky} onClick={() => { onExport(); setIoMsg("💾 きろくファイルをダウンロードしました"); }}>⬇️ きろくの かきだし</Btn>
              <Btn bg={C.leaf} onClick={() => fileRef.current && fileRef.current.click()}>⬆️ きろくの よみこみ</Btn>
              <input ref={fileRef} type="file" accept=".json,application/json" style={{ display: "none" }}
                onChange={async e => {
                  const f = e.target.files && e.target.files[0];
                  e.target.value = "";
                  if (!f) return;
                  const msg = await onImportFile(f);
                  setIoMsg(msg);
                }} />
              <Btn bg="#FFB3B3" onClick={onDeleteRequest}>⚠️ このプロファイルを けす</Btn>
            </div>
            {ioMsg && <div className="panel slide" style={{ padding: 10, marginTop: 10, background: "#FFFBE0", fontWeight: 800, fontSize: 13 }}>{ioMsg}</div>}
            {/* 確認モード（開発・実機確認用）: 全パズル面を一時解放。保存しないのでリロードでオフに戻る */}
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px dashed ${C.ink}55` }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={!!unlockAll} onChange={e => setUnlockAll(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: C.leaf }} />
                <span style={{ fontWeight: 900, fontSize: 14 }}>🔧 かくにんモード（ぜんステージ解放）</span>
              </label>
              <p style={{ fontSize: 12, fontWeight: 700, margin: "6px 0 0", color: "#6B6265" }}>
                実機確認用。オンにするとパズルの島・面がすべて開きます。<b>保存されません</b>（アプリを閉じる／リロードでオフに戻ります）。
              </p>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: .55, marginTop: 12 }}>{APP_VERSION}（{BUILD_DATE}）</div>
          </div>
        </div>
      )}
    </div>
  );
}
