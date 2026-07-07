// 保護者向け総合案内「おうちのひとへ」（第2波 段階③・メモ09）。
// 入口=ワールドマップ最下部の帯 → 保護者ゲート（Recordsから移設・判定不変）→ 総合案内。
// 構成（parent-index.js の実装メモどおり・上から順）:
//   1. 理念文 PARENT_INTRO（全文） 2. モード一覧 GUIDE_SECTIONS（アコーディオン・初期全閉）
//   3. RECORDS_GUIDE（記録の見方） 4. 既存ダッシュボード（到達度・14日・プロファイル別・データ管理・確認モード）
// 本文は parent-guide.js（唯一の正本）を ref で参照。文章は変えない・構成と見せ方だけ。
import { useState, useRef } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { STAGES } from "../data/stages.js";
import { QUIZ_CATEGORIES, QUIZ_DIFFS, SESSION_SIZE } from "../data/quizzes.js";
import { DIFFICULTIES } from "../data/islands.js";
import { clearedInDiff, star3InDiff, puzzleStarsTotal, daysPlayed } from "../data/badges.js";
import { lastNDays } from "../storage.js";
import { APP_VERSION, BUILD_DATE } from "../version.js";
import { PARENT_INTRO } from "../data/parent-intro.js";
import { GUIDE_SECTIONS, RECORDS_GUIDE } from "../data/parent-index.js";
import { PARENT_GUIDE, QUIZ_GUIDE, TYPING_GUIDE, ART_GUIDE } from "../data/parent-guide.js";
import PlayerAvatar from "./PlayerAvatar.jsx";

// 保護者向けトーン（ParentGuide.jsx と同じ配色＝うすむらさき・落ち着いた見た目）
const INK = "#3A3335";
const PANEL_BG = "#EEEAF5";
const ACCENT = "#6B5B95";

// ref（parent-index.js）→ 本文（parent-guide.js）の解決。source名→エクスポートの対応はここ1か所。
const SOURCES = { PARENT_GUIDE, QUIZ_GUIDE, TYPING_GUIDE, ART_GUIDE };
function resolveGuide(ref) {
  const src = SOURCES[ref.source];
  const g = ref.key === null || ref.key === undefined ? src : src[ref.key];
  if (!g) return null;
  // タイピング: 段階1〜3の一言（実装キー kotoba/tanbun/bunshou）を本文の後に併記
  const stages = ref.appendStages
    ? [TYPING_GUIDE.kotoba, TYPING_GUIDE.tanbun, TYPING_GUIDE.bunshou].map((t, i) => `段階${i + 1}: ${t}`)
    : null;
  return { ...g, stages };
}

// 学びの見える化（Records から移設・計算は不変）
function skillProgress(save) {
  const w = islandId => {
    const st = STAGES.filter(s => s.island === islandId);
    const got = st.reduce((a, s) => a + (save.puzzle.stars[s.id] || 0), 0);
    return Math.round(100 * got / (st.length * 3));
  };
  const quizTotal = QUIZ_CATEGORIES.length * QUIZ_DIFFS.length * SESSION_SIZE;
  const quizGot = Object.entries(save.quiz.best)
    .filter(([k]) => k.includes(":"))
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
// 難易度別の到達度（Records から移設・計算は不変）
function diffBreakdown(save) {
  return DIFFICULTIES.map(d => {
    const total = STAGES.filter(s => s.difficulty === d.id).length;
    const cleared = clearedInDiff(save, d.id);
    const star3 = star3InDiff(save, d.id);
    return { id: d.id, label: d.short, color: d.color, total, cleared, star3, pct: Math.round(100 * cleared / total) };
  });
}

export default function ParentHub({ save, profiles = [], go, onSound, onExport, onImportFile, onDeleteRequest, unlockAll, setUnlockAll }) {
  const [gate, setGate] = useState(false);
  const [ans, setAns] = useState("");
  // 2タブ: 縦の長さ対策（読み物と記録は利用頻度が違う）。既定=about＝理念ファースト（メモ09の核）を維持
  const [tab, setTab] = useState("about"); // "about"=このアプリについて / "records"=きろくとデータ
  const [openIds, setOpenIds] = useState([]);      // 開いているモード（複数可・初期全閉）
  const [reading, setReading] = useState(null);    // 本文モーダル { label, guide }
  const [ioMsg, setIoMsg] = useState(null);
  const fileRef = useRef(null);
  const skills = skillProgress(save);
  const diffs = diffBreakdown(save);
  const days = lastNDays(14);
  const counts = days.map(d => {
    const l = save.log[d]; return l ? (l.puzzle || 0) + (l.quiz || 0) + (l.art || 0) + (l.battle || 0) : 0;
  });
  const maxC = Math.max(1, ...counts);
  const toggle = id => setOpenIds(ids => ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 40 }}>
      <Header save={save} title="👪 おうちのひとへ" onBack={() => go("home")} onSound={onSound} />

      {/* 保護者ゲート（Recordsから移設・判定不変） */}
      {!gate && (
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

      {gate && (
        <div style={{ display: "grid", gap: 16, padding: "0 16px" }}>
          {/* タブ切り替え: 読み物（低頻度・じっくり）と記録（高頻度・繰り返し）を分けて縦の長さを解消。
              既定=about＝ゲートを開けた保護者が最初に理念文を見る（メモ09の理念ファースト維持） */}
          <div style={{ display: "flex", gap: 8 }}>
            {[["about", "📖 このアプリについて"], ["records", "📊 きろくとデータ"]].map(([id, label]) => (
              <button key={id} type="button" onClick={() => setTab(id)}
                style={{ flex: 1, padding: "10px 8px", borderRadius: 14, cursor: "pointer", fontFamily: "inherit",
                  fontWeight: 900, fontSize: 13.5, color: INK,
                  background: tab === id ? PANEL_BG : "#fff",
                  border: tab === id ? `2px solid ${ACCENT}` : `2px solid ${INK}44` }}>
                {label}
              </button>
            ))}
          </div>

          {tab === "about" && (<>
          {/* 1. 理念文（PARENT_INTRO 全文・アプリの顔） */}
          <div className="panel" style={{ padding: "18px 18px 14px", background: "#FDFCFF" }}>
            <div style={{ fontWeight: 900, fontSize: 18, color: INK, marginBottom: 8 }}>{PARENT_INTRO.title}</div>
            <p style={{ fontSize: 14, lineHeight: 1.8, fontWeight: 700, color: ACCENT, margin: "0 0 12px" }}>{PARENT_INTRO.lead}</p>
            {PARENT_INTRO.sections.map(sec => (
              <div key={sec.heading} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 900, fontSize: 14, color: INK, background: PANEL_BG, borderRadius: 8, padding: "5px 10px", marginBottom: 6 }}>{sec.heading}</div>
                {sec.body.map((p, i) => (
                  <p key={i} style={{ fontSize: 13, lineHeight: 1.75, margin: "0 0 8px", fontWeight: 500, color: "#4A4446" }}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          {/* 2. モード一覧（アコーディオン・初期全閉・複数同時開可） */}
          <div className="panel" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, fontSize: 16, color: INK, marginBottom: 10 }}>{PARENT_INTRO.guideListLead}</div>
            <div style={{ display: "grid", gap: 8 }}>
              {GUIDE_SECTIONS.map(sec => {
                const open = openIds.includes(sec.id);
                return (
                  <div key={sec.id} style={{ border: `2px solid ${INK}`, borderRadius: 14, overflow: "hidden", background: "#fff" }}>
                    {/* 第1層: モード見出し＋一言サマリ（タップで開閉） */}
                    <button type="button" onClick={() => toggle(sec.id)} aria-expanded={open}
                      style={{ width: "100%", background: open ? PANEL_BG : "#fff", border: "none", cursor: "pointer",
                        padding: "10px 12px", textAlign: "left", fontFamily: "inherit", color: INK }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{sec.icon}</span>
                        <span style={{ flex: 1, fontWeight: 900, fontSize: 14 }}>{sec.label}</span>
                        <span style={{ fontSize: 13, opacity: .6, transform: open ? "rotate(90deg)" : "none", transition: "transform .15s" }}>▶</span>
                      </div>
                      <div style={{ fontSize: 12, lineHeight: 1.6, fontWeight: 500, color: "#4A4446", marginTop: 4 }}>{sec.summary}</div>
                    </button>
                    {/* 第2層: 項目一覧（label + skill・タップで本文モーダル） */}
                    {open && (
                      <div className="slide" style={{ borderTop: `2px solid ${INK}22`, padding: "6px 8px", display: "grid", gap: 4 }}>
                        {sec.items.map(item => (
                          <button key={item.label} type="button"
                            onClick={() => { const g = resolveGuide(item.ref); if (g) setReading({ label: item.label, guide: g }); }}
                            style={{ width: "100%", background: "#FDFCFF", border: `1.5px solid ${ACCENT}55`, borderRadius: 10,
                              cursor: "pointer", padding: "8px 10px", textAlign: "left", fontFamily: "inherit", color: INK,
                              display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ flex: 1 }}>
                              <span style={{ fontWeight: 900, fontSize: 13, display: "block" }}>{item.label}</span>
                              <span style={{ fontWeight: 600, fontSize: 11.5, color: ACCENT }}>{item.skill}</span>
                            </span>
                            <span style={{ fontSize: 12, opacity: .5 }}>›</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. 記録の見方（固定文・そのまま見せる） */}
          <div className="panel" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, fontSize: 16, color: INK, marginBottom: 8 }}>📖 {RECORDS_GUIDE.title}</div>
            {RECORDS_GUIDE.body.map((p, i) => (
              <p key={i} style={{ fontSize: 13, lineHeight: 1.75, margin: "0 0 8px", fontWeight: 500, color: "#4A4446" }}>{p}</p>
            ))}
          </div>
          </>)}

          {tab === "records" && (<>
          {/* いま見ている子（sticky＝長いスクロール中も常に見える）。切替機能は付けない＝交代は港に一本化（段階②） */}
          <div style={{ position: "sticky", top: 8, zIndex: 5, display: "flex", alignItems: "center", gap: 10,
            background: PANEL_BG, border: `2px solid ${ACCENT}`, borderRadius: 999, padding: "8px 16px",
            boxShadow: "0 2px 8px rgba(58,51,53,.18)" }}>
            <PlayerAvatar character={save.character} avatar={save.avatar} dressup={save.dressup} size={30} />
            <span style={{ fontWeight: 900, fontSize: 14, color: INK }}>👀 いま見ているのは <b>{save.name}</b> さんの きろく</span>
          </div>

          {/* 4. ダッシュボード（Recordsから移設・中身は不変） */}
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
                {/* 難易度は色＋言葉で表示（メモ03）。★は成績（★3が◯面）だけに使う */}
                <div style={{ fontWeight: 900, fontSize: 14 }}>
                  <span style={{ display: "inline-block", width: 11, height: 11, borderRadius: 999,
                    background: d.color, border: `2px solid ${C.ink}`, marginRight: 6 }} />
                  {d.label}
                  <span style={{ float: "right" }}>{d.cleared}/{d.total}面（★3が {d.star3}面）</span>
                </div>
                <div style={{ height: 12, border: `2px solid ${C.ink}`, borderRadius: 999, overflow: "hidden", background: "#fff", marginTop: 4 }}>
                  <div style={{ width: `${d.pct}%`, height: "100%", background: d.color }} />
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
                      <PlayerAvatar character={p.character} avatar={p.avatar} dressup={p.dressup} size={32} />
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
          </>)}
        </div>
      )}

      {/* 本文モーダル（既存 ParentGuide と同じトーン・skill→body→(段階補足)→tip） */}
      {reading && (
        <div role="dialog" aria-modal="true" aria-label={reading.label} onClick={() => setReading(null)}
          style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(58,51,53,.5)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="pop" onClick={e => e.stopPropagation()}
            style={{ background: "#FDFCFF", border: `3px solid ${INK}`, borderRadius: 20,
              boxShadow: "5px 5px 0 rgba(58,51,53,.9)", maxWidth: 480, width: "100%",
              maxHeight: "85vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px",
              background: PANEL_BG, borderBottom: `2px solid ${INK}` }}>
              <span style={{ fontSize: 18 }}>👨‍👩‍👧</span>
              <span style={{ flex: 1, fontWeight: 900, fontSize: 15, color: INK }}>{reading.label}</span>
              <button type="button" onClick={() => setReading(null)} aria-label="とじる"
                style={{ width: 34, height: 34, borderRadius: "50%", border: `2px solid ${INK}`, background: "#fff",
                  cursor: "pointer", fontSize: 17, fontWeight: 900, lineHeight: 1, color: INK,
                  display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>✕</button>
            </div>
            <div style={{ padding: "14px 16px 16px", overflowY: "auto" }}>
              <div style={{ fontWeight: 900, fontSize: 13, color: ACCENT, marginBottom: 8 }}>{reading.guide.skill}</div>
              {reading.guide.body.map((p, i) => (
                <p key={i} style={{ fontSize: 13, lineHeight: 1.75, margin: "0 0 8px", fontWeight: 500, color: "#4A4446" }}>{p}</p>
              ))}
              {reading.guide.stages && reading.guide.stages.map((s, i) => (
                <div key={i} style={{ fontSize: 13, lineHeight: 1.75, fontWeight: 500, color: "#4A4446",
                  background: "#F4F1FA", border: `2px solid ${ACCENT}`, borderRadius: 12, padding: "8px 12px", margin: "0 0 8px" }}>
                  📍 {s}
                </div>
              ))}
              {reading.guide.tip && (
                <div style={{ fontSize: 13, fontWeight: 700, background: "#FFF7E6", border: `2px solid ${INK}`, borderRadius: 12, padding: "8px 12px", marginTop: 4 }}>
                  💡 {reading.guide.tip}
                </div>
              )}
              <button type="button" onClick={() => setReading(null)}
                style={{ marginTop: 14, width: "100%", background: PANEL_BG, border: `2px solid ${INK}`, borderRadius: 12,
                  cursor: "pointer", padding: "9px 14px", fontSize: 14, fontWeight: 900, color: INK, fontFamily: "inherit" }}>とじる</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
