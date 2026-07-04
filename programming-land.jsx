import { useState, useEffect, useRef } from "react";

/* ================================================================
   プログラミングランド — 小1〜2向け総合プログラミング学習ゲーム
   モード: ロボットパズル / クイズ / おえかきコード ＋ きろく(保護者画面)
   保存: window.storage (永続)
================================================================ */

const SAVE_KEY = "progland:save:v1";

const AVATARS = ["🐻", "🐰", "🦊", "🐼", "🐸", "🦄"];

const C = {
  bg: "#FFF9EF",
  ink: "#3A3335",
  sky: "#7FC8F8",
  sun: "#FFD447",
  sakura: "#FF8FAB",
  leaf: "#6BCB77",
  grape: "#9D7BD8",
  white: "#FFFFFF",
};

const WORLD_META = {
  1: { name: "じゅんばんの もり", emoji: "🌳", color: C.leaf, skill: "じゅんばんに めいれいする ちから" },
  2: { name: "くりかえしの うみ", emoji: "🌊", color: C.sky, skill: "おなじことを くりかえす ちから" },
  3: { name: "もしもの やま", emoji: "⛰️", color: C.grape, skill: "「もしも」で かんがえる ちから" },
};

/* ---------- パズル ステージ定義 ----------
   grid: '.'=ゆか '#'=きのかべ '*'=ほし 'S'=スタート
   dir: 0=→ 1=↓ 2=← 3=↑   par: ★3の ブロックすう */
const STAGES = [
  { id: "1-1", world: 1, name: "はじめの いっぽ", dir: 0, par: 3,
    grid: ["S..*", "....", "...."] },
  { id: "1-2", world: 1, name: "まがりかど", dir: 0, par: 5,
    grid: ["S...", "....", "..*."] },
  { id: "1-3", world: 1, name: "ほしを ふたつ", dir: 0, par: 4,
    grid: [".....", "S*.*.", "....."] },
  { id: "1-4", world: 1, name: "ジグザグ", dir: 0, par: 8,
    grid: ["S.*..", ".....", "..*.*"] },
  { id: "1-5", world: 1, name: "かべを よけて", dir: 0, par: 11,
    grid: ["S.#.*", "..#..", "....."] },
  { id: "2-1", world: 2, name: "くりかえしの ちから", dir: 0, par: 2,
    grid: ["......", "S....*", "......"] },
  { id: "2-2", world: 2, name: "かいだん", dir: 0, par: 5,
    grid: [".....", "...*.", "..*..", ".*...", "S...."] },
  { id: "2-3", world: 2, name: "しかくの みち", dir: 0, par: 5,
    grid: ["S..*", "....", "....", "*..*"] },
  { id: "2-4", world: 2, name: "ななめの ほしぞら", dir: 0, par: 6,
    grid: ["S.....", ".*....", "..*...", "...*..", "....*.", ".....*"] },
  { id: "2-5", world: 2, name: "おおきな しかく", dir: 0, par: 6,
    grid: ["S.*.*", "....*", "....*", "*....", "..*.*"] },
  { id: "3-1", world: 3, name: "かしこい ブロック", dir: 0, par: 2,
    grid: ["S....", ".....", ".....", "....*"] },
  { id: "3-2", world: 3, name: "ふたつの かど", dir: 0, par: 4,
    grid: ["S....", ".....", ".....", ".....", "*...."] },
  { id: "3-3", world: 3, name: "ひだりまわり", dir: 2, par: 4,
    grid: ["....S", ".....", ".....", ".....", "....*"] },
  { id: "3-4", world: 3, name: "こうさてん", dir: 0, par: 5,
    grid: ["S....", ".....", "..*..", ".....", "....."] },
  { id: "3-5", world: 3, name: "だいめいろ", dir: 0, par: 6,
    grid: ["S....", "#....", "..*..", ".....", "....."] },
];

const BLOCK_DEFS = {
  move: { emoji: "⬆️", label: "まえへ", color: C.leaf },
  left: { emoji: "↩️", label: "ひだりを むく", color: C.sky },
  right: { emoji: "↪️", label: "みぎを むく", color: C.sky },
  repeat: { emoji: "🔁", label: "くりかえし", color: C.sun },
  smartR: { emoji: "🧠", label: "かべ？→みぎ", color: C.grape },
  smartL: { emoji: "🧠", label: "かべ？→ひだり", color: C.grape },
};
const WORLD_PALETTE = {
  1: ["move", "left", "right"],
  2: ["move", "left", "right", "repeat"],
  3: ["move", "left", "right", "repeat", "smartR", "smartL"],
};
const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];

/* ---------- クイズ定義 ---------- */
const QUIZ_SETS = [
  { id: "q1", name: "じゅんばん クイズ", emoji: "🍛", color: C.leaf,
    desc: "ただしい じゅんばんを かんがえよう",
    qs: [
      { q: "カレーを つくるよ。さいしょに することは？", opts: ["🔪 やさいを きる", "🍽️ たべる", "🍛 おさらに もる"], a: 0, why: "たべるまえに、まず ざいりょうを きるんだね" },
      { q: "はを みがくよ。さいごに することは？", opts: ["🪥 はブラシを もつ", "💧 うがいを する", "🦷 ゴシゴシ みがく"], a: 1, why: "みがいたあとに うがいを するよ" },
      { q: "がっこうに いくよ。いちばん さいしょは？", opts: ["🚪 いえを でる", "⏰ おきる", "👟 くつを はく"], a: 1, why: "おきないと なにも はじまらないね" },
      { q: "おにぎりを つくるよ。2ばんめに することは？\n① ごはんを たく → ② ？ → ③ のりを まく", opts: ["🍙 ぎゅっと にぎる", "🍚 ごはんを たく", "😋 たべる"], a: 0, why: "たいた ごはんを にぎってから のりを まくよ" },
      { q: "おふろに はいるよ。さいしょに することは？", opts: ["🛁 おゆに つかる", "👕 ふくを ぬぐ", "🧴 かみを あらう"], a: 1, why: "ふくを きたまま おふろは はいれないね" },
    ] },
  { id: "q2", name: "きまり みつけ", emoji: "🔍", color: C.sky,
    desc: "ならびかたの きまりを みつけよう",
    qs: [
      { q: "つぎに くるのは？\n🍎 🍌 🍎 🍌 ❓", opts: ["🍎", "🍌", "🍇"], a: 0, why: "りんご→バナナの くりかえしだね" },
      { q: "つぎに くるのは？\n🔴 🔴 🔵 🔴 🔴 🔵 🔴 🔴 ❓", opts: ["🔴", "🔵", "🟡"], a: 1, why: "あか・あか・あお の くりかえしだよ" },
      { q: "つぎに くるのは？\n⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ⭐ ❓", opts: ["🌙", "⭐", "☀️"], a: 1, why: "ほし・ほし・つき の くりかえし。ほしは まだ 1こめだね" },
      { q: "つぎに くるのは？\n🐜 🐘 🐜 🐘 🐜 ❓", opts: ["🐜", "🐘", "🐟"], a: 1, why: "ちいさい→おおきいの くりかえしだね" },
      { q: "きまりが ちがうのは どれ？", opts: ["🍓🍈🍓🍈🍓🍈", "🍓🍈🍓🍈🍈🍓", "🍈🍓🍈🍓🍈🍓"], a: 1, why: "まんなかだけ とちゅうで じゅんばんが くずれているよ" },
    ] },
  { id: "q3", name: "なかまわけ クイズ", emoji: "📦", color: C.sun,
    desc: "なかまはずれを みつけよう",
    qs: [
      { q: "なかまはずれは どれ？", opts: ["🐶 いぬ", "🐱 ねこ", "🚗 くるま"], a: 2, why: "くるまだけ いきものじゃ ないね" },
      { q: "なかまはずれは どれ？", opts: ["🍎 りんご", "⚽ ボール", "🍌 バナナ"], a: 1, why: "ボールだけ たべものじゃ ないよ" },
      { q: "なかまはずれは どれ？", opts: ["✈️ ひこうき", "🐦 とり", "🐢 かめ"], a: 2, why: "かめだけ そらを とばないね" },
      { q: "なかまはずれは どれ？", opts: ["🔺 さんかく", "🟦 しかく", "🍩 ドーナツ"], a: 2, why: "ドーナツだけ かたちの なまえじゃ ないよ" },
      { q: "なかまはずれは どれ？", opts: ["☀️ たいよう", "🔦 かいちゅうでんとう", "🌑 よるの そら"], a: 2, why: "よるの そらだけ ひかって いないね" },
    ] },
  { id: "q4", name: "ロボット めいれい", emoji: "🤖", color: C.grape,
    desc: "ロボットの うごきを よそうしよう",
    qs: [
      { q: "みぎを むいている ロボットに「まえへ 1ぽ」。どっちに すすむ？", opts: ["➡️ みぎ", "⬅️ ひだり", "⬆️ うえ"], a: 0, why: "むいている ほうこうに すすむよ" },
      { q: "うえを むいている ロボットが「みぎを むく」。どっちを むく？", opts: ["⬅️ ひだり", "➡️ みぎ", "⬇️ した"], a: 1, why: "うえから みぎに くるっと まわるね" },
      { q: "「まえへ」を 3かい。なんマス すすむ？", opts: ["1マス", "2マス", "3マス"], a: 2, why: "1かいで 1マス。3かいなら 3マスだね" },
      { q: "「🔁3かい くりかえし［まえへ・まえへ］」。ぜんぶで なんぽ あるく？", opts: ["3ぽ", "6ぽ", "2ほ"], a: 1, why: "2ほ×3かい＝6ぽ。くりかえしは べんりだね" },
      { q: "「もしも まえが かべなら みぎを むく」。まえに かべが ないときは？", opts: ["みぎを むく", "とまる", "むきを かえない"], a: 2, why: "かべが あるときだけ みぎを むくんだね" },
    ] },
];

/* ---------- おえかき ---------- */
const ART_COLORS = ["#FF6B6B", "#FF9F43", "#FFD447", "#6BCB77", "#54A0FF", "#9D7BD8"];
const ART_CMDS = {
  fwd: { emoji: "✏️", label: "すすんで かく" },
  right: { emoji: "↪️", label: "みぎへ まがる" },
  left: { emoji: "↩️", label: "ひだりへ まがる" },
  color: { emoji: "🎨", label: "いろを かえる" },
};
const ART_CHALLENGES = [
  { name: "しかくに ちょうせん", hint: "✏️→↪️ を 4かい ならべてみよう", emoji: "🟨" },
  { name: "かいだんに ちょうせん", hint: "✏️→↪️→✏️→↩️ を くりかえすと…？", emoji: "🪜" },
  { name: "にじいろの みち", hint: "🎨を はさむと いろが かわるよ", emoji: "🌈" },
];

/* ---------- バッジ ---------- */
function puzzleStarsTotal(s) { return Object.values(s.puzzle.stars).reduce((a, b) => a + b, 0); }
function worldDone(s, w) { return STAGES.filter(st => st.world === w).every(st => (s.puzzle.stars[st.id] || 0) > 0); }
function daysPlayed(s) { return Object.keys(s.log).length; }
const BADGES = [
  { id: "first", emoji: "🎉", name: "はじめての クリア", desc: "パズルを 1つ クリアした", check: s => Object.keys(s.puzzle.stars).length >= 1 },
  { id: "w1", emoji: "🌳", name: "もりの たんけんか", desc: "ワールド1を ぜんぶ クリア", check: s => worldDone(s, 1) },
  { id: "w2", emoji: "🌊", name: "うみの ぼうけんか", desc: "ワールド2を ぜんぶ クリア", check: s => worldDone(s, 2) },
  { id: "w3", emoji: "⛰️", name: "やまの マスター", desc: "ワールド3を ぜんぶ クリア", check: s => worldDone(s, 3) },
  { id: "star10", emoji: "🌟", name: "きらきら コレクター", desc: "ほしを 10こ あつめた", check: s => puzzleStarsTotal(s) >= 10 },
  { id: "starAll", emoji: "👑", name: "スター おうさま", desc: "ほしを ぜんぶ（45こ）あつめた", check: s => puzzleStarsTotal(s) >= 45 },
  { id: "quiz1", emoji: "💡", name: "クイズ ちょうせんしゃ", desc: "クイズを 1セット やった", check: s => Object.keys(s.quiz.best).length >= 1 },
  { id: "quizAll", emoji: "🎓", name: "クイズ はかせ", desc: "ぜんぶの クイズで まんてん", check: s => QUIZ_SETS.every(q => (s.quiz.best[q.id] || 0) >= q.qs.length) },
  { id: "art1", emoji: "🎨", name: "みならい アーティスト", desc: "さくひんを 1つ ほぞんした", check: s => s.art.gallery.length >= 1 },
  { id: "art5", emoji: "🖼️", name: "びじゅつかんの たつじん", desc: "さくひんを 5つ ほぞんした", check: s => s.art.gallery.length >= 5 },
  { id: "days3", emoji: "🔥", name: "こつこつさん", desc: "3にち あそんだ", check: s => daysPlayed(s) >= 3 },
  { id: "days7", emoji: "🏆", name: "まいにち チャンピオン", desc: "7にち あそんだ", check: s => daysPlayed(s) >= 7 },
  { id: "allmode", emoji: "🗺️", name: "ランドの たんけんか", desc: "3つの あそびを ぜんぶ やった", check: s => Object.keys(s.puzzle.stars).length > 0 && Object.keys(s.quiz.best).length > 0 && s.art.gallery.length > 0 },
  { id: "legend", emoji: "🦸", name: "でんせつの プログラマー", desc: "ほかの バッジを ぜんぶ あつめた", check: s => BADGES.filter(b => b.id !== "legend").every(b => b.check(s)) },
];

/* ---------- ほぞん ---------- */
function newSave() {
  return {
    profile: null,
    settings: { sound: true },
    puzzle: { stars: {} },
    quiz: { best: {} },
    art: { gallery: [] },
    badges: [],
    log: {},
  };
}
async function loadSave() {
  try {
    const r = await window.storage.get(SAVE_KEY);
    if (r && r.value) return { ...newSave(), ...JSON.parse(r.value) };
  } catch (e) { /* まだ ほぞんが ない */ }
  return newSave();
}
async function persistSave(s) {
  try { await window.storage.set(SAVE_KEY, JSON.stringify(s)); }
  catch (e) { console.error("save failed", e); }
}
function today() { return new Date().toISOString().slice(0, 10); }

/* ---------- おと ---------- */
let _ctx = null;
function tone(freq, dur, delay = 0, type = "triangle", vol = 0.12) {
  try {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    const t = _ctx.currentTime + delay;
    const o = _ctx.createOscillator(); const g = _ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(_ctx.destination); o.start(t); o.stop(t + dur);
  } catch (e) { /* おとが でない かんきょう */ }
}
const SFX = {
  tap: on => on && tone(600, 0.08),
  step: on => on && tone(440, 0.07),
  star: on => on && (tone(880, 0.12), tone(1320, 0.15, 0.1)),
  win: on => on && [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, i * 0.13)),
  fail: on => on && (tone(300, 0.18), tone(220, 0.25, 0.15)),
  badge: on => on && [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.2, i * 0.11, "sine", 0.14)),
};

/* ---------- スタイル ---------- */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;900&family=Hachi+Maru+Pop&display=swap');
  .pl-root {
    font-family: 'M PLUS Rounded 1c','Hiragino Maru Gothic ProN','Yu Gothic',sans-serif;
    background:
      radial-gradient(circle at 15% 10%, #FFECC7 0 120px, transparent 130px),
      radial-gradient(circle at 85% 85%, #DFF3FF 0 160px, transparent 170px),
      ${C.bg};
    min-height: 100vh; color: ${C.ink};
    -webkit-user-select: none; user-select: none;
  }
  .pl-display { font-family: 'Hachi Maru Pop','M PLUS Rounded 1c',sans-serif; }
  .panel {
    background: #fff; border: 3px solid ${C.ink}; border-radius: 22px;
    box-shadow: 5px 5px 0 rgba(58,51,53,.9);
  }
  .pbtn {
    border: 3px solid ${C.ink}; border-radius: 18px; cursor: pointer;
    box-shadow: 4px 4px 0 rgba(58,51,53,.9);
    transition: transform .06s, box-shadow .06s;
    font-family: inherit; font-weight: 800; color: ${C.ink};
  }
  .pbtn:active { transform: translate(3px,3px); box-shadow: 1px 1px 0 rgba(58,51,53,.9); }
  .pbtn:focus-visible { outline: 4px solid ${C.sakura}; outline-offset: 2px; }
  .pbtn:disabled { opacity: .4; cursor: not-allowed; }
  @keyframes pl-pop { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
  @keyframes pl-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
  @keyframes pl-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes pl-slide { from{transform:translateY(24px);opacity:0} to{transform:translateY(0);opacity:1} }
  .pop { animation: pl-pop .4s ease; }
  .shake { animation: pl-shake .3s ease 2; }
  .bounce { animation: pl-bounce 1.2s ease infinite; }
  .slide { animation: pl-slide .3s ease; }
  @media (prefers-reduced-motion: reduce) {
    .pop,.shake,.bounce,.slide { animation: none; }
    .pbtn { transition: none; }
  }
`;

/* ================= 共通ちいさな部品 ================= */
function Btn({ children, onClick, bg = C.sun, style = {}, className = "", disabled, big }) {
  return (
    <button className={"pbtn " + className} disabled={disabled}
      style={{ background: bg, padding: big ? "16px 26px" : "10px 16px", fontSize: big ? 22 : 16, ...style }}
      onClick={onClick}>{children}</button>
  );
}
function StarRow({ n, size = 26 }) {
  return (
    <span style={{ fontSize: size, letterSpacing: 2 }}>
      {[1, 2, 3].map(i => <span key={i} style={{ opacity: i <= n ? 1 : 0.22 }}>⭐</span>)}
    </span>
  );
}
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="panel pop" style={{
      position: "fixed", top: 18, left: "50%", transform: "translateX(-50%)",
      zIndex: 90, padding: "12px 22px", background: C.sun, fontWeight: 900, fontSize: 18,
      display: "flex", alignItems: "center", gap: 10, maxWidth: "90vw",
    }}>
      <span style={{ fontSize: 30 }}>{toast.emoji}</span>
      <span>バッジ ゲット！「{toast.name}」</span>
    </div>
  );
}
function Header({ save, onHome, onSound, title, onRecords }) {
  const stars = puzzleStarsTotal(save);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", flexWrap: "wrap" }}>
      {onHome && <Btn bg={C.white} onClick={onHome} style={{ fontSize: 18 }}>🏠 ホーム</Btn>}
      <div className="pl-display" style={{ fontSize: 20, fontWeight: 900, flex: 1, minWidth: 120 }}>{title}</div>
      {save.profile && (
        <div className="panel" style={{ padding: "6px 14px", display: "flex", gap: 8, alignItems: "center", borderRadius: 999 }}>
          <span style={{ fontSize: 22 }}>{save.profile.avatar}</span>
          <b>{save.profile.name}</b>
          <span style={{ fontWeight: 900 }}>⭐{stars}</span>
        </div>
      )}
      {onRecords && <Btn bg={C.sakura} onClick={onRecords}>📖 きろく</Btn>}
      <Btn bg={C.white} onClick={onSound} aria-label="おとの おんおふ">{save.settings.sound ? "🔊" : "🔇"}</Btn>
    </div>
  );
}

/* ================= はじめてがめん ================= */
function Onboarding({ onDone }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const ok = name.trim().length > 0 && avatar;
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: 20, textAlign: "center" }}>
      <div className="bounce" style={{ fontSize: 64, marginTop: 30 }}>🤖</div>
      <h1 className="pl-display" style={{ fontSize: 34, margin: "8px 0 4px" }}>プログラミングランド</h1>
      <p style={{ fontWeight: 700, marginBottom: 20 }}>あそびながら プログラミングの あたまを きたえよう！</p>
      <div className="panel slide" style={{ padding: 22, textAlign: "left" }}>
        <label style={{ fontWeight: 900, display: "block", marginBottom: 8 }}>なまえを いれてね</label>
        <input value={name} maxLength={10} onChange={e => setName(e.target.value)}
          placeholder="れい：ひなた"
          style={{ width: "100%", boxSizing: "border-box", fontSize: 22, padding: "10px 14px", border: `3px solid ${C.ink}`, borderRadius: 14, fontFamily: "inherit", fontWeight: 700 }} />
        <div style={{ fontWeight: 900, margin: "18px 0 8px" }}>すきな どうぶつを えらんでね</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {AVATARS.map(a => (
            <button key={a} className="pbtn" onClick={() => setAvatar(a)}
              style={{ fontSize: 34, padding: "8px 14px", background: avatar === a ? C.sun : "#fff" }}>{a}</button>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 22 }}>
          <Btn big bg={C.leaf} disabled={!ok} onClick={() => onDone(name.trim(), avatar)}>ぼうけんに しゅっぱつ！ 🚀</Btn>
        </div>
      </div>
    </div>
  );
}

/* ================= ホーム ================= */
function Home({ save, go, onSound }) {
  const stars = puzzleStarsTotal(save);
  const quizDone = Object.keys(save.quiz.best).length;
  const badges = save.badges.length;
  const modes = [
    { key: "puzzle", emoji: "🤖", name: "ロボット パズル", desc: "ブロックで ロボットを うごかそう", color: C.leaf, sub: `⭐ ${stars} / 45` },
    { key: "quiz", emoji: "💡", name: "かんがえる クイズ", desc: "プログラミングの あたまで こたえよう", color: C.sky, sub: `${quizDone} / ${QUIZ_SETS.length} セット` },
    { key: "art", emoji: "🎨", name: "おえかき コード", desc: "めいれいで えを かこう", color: C.sakura, sub: `さくひん ${save.art.gallery.length} こ` },
  ];
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="" onSound={onSound} onRecords={() => go("records")} />
      <div style={{ textAlign: "center", margin: "6px 0 18px" }}>
        <h1 className="pl-display" style={{ fontSize: 32, margin: 0 }}>🗺️ プログラミングランド</h1>
        <div style={{ fontWeight: 700 }}>きょうは どこで あそぶ？</div>
      </div>
      <div style={{ display: "grid", gap: 16, padding: "0 16px" }}>
        {modes.map((m, i) => (
          <button key={m.key} className="pbtn slide" onClick={() => go(m.key)}
            style={{ background: "#fff", textAlign: "left", padding: 18, display: "flex", gap: 16, alignItems: "center", animationDelay: `${i * 0.06}s` }}>
            <span style={{ fontSize: 46, background: m.color, border: `3px solid ${C.ink}`, borderRadius: 18, padding: "8px 12px" }}>{m.emoji}</span>
            <span style={{ flex: 1 }}>
              <span className="pl-display" style={{ fontSize: 22, display: "block" }}>{m.name}</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{m.desc}</span>
            </span>
            <span className="panel" style={{ padding: "6px 10px", fontWeight: 900, fontSize: 13, borderRadius: 12, background: m.color }}>{m.sub}</span>
          </button>
        ))}
        <button className="pbtn" onClick={() => go("records")}
          style={{ background: C.sun, padding: 14, fontSize: 17 }}>
          🏅 バッジ {badges} / {BADGES.length} こ ・ きろくを みる
        </button>
      </div>
    </div>
  );
}

/* ================= きろく（こども＋おうちのひと） ================= */
function skillProgress(save) {
  const w = wid => {
    const st = STAGES.filter(s => s.world === wid);
    const got = st.reduce((a, s) => a + (save.puzzle.stars[s.id] || 0), 0);
    return Math.round(100 * got / (st.length * 3));
  };
  const quizTotal = QUIZ_SETS.reduce((a, q) => a + q.qs.length, 0);
  const quizGot = QUIZ_SETS.reduce((a, q) => a + (save.quiz.best[q.id] || 0), 0);
  return [
    { name: "じゅんじょ（順次）", note: "めいれいを 正しい順番に組み立てる力", pct: w(1), color: C.leaf },
    { name: "くりかえし（反復）", note: "同じ処理をまとめて考える力", pct: w(2), color: C.sky },
    { name: "じょうけん（分岐）", note: "「もし〜なら」で場合分けする力", pct: w(3), color: C.grape },
    { name: "よそうする力（クイズ）", note: "きまり発見・順序立て・分類", pct: Math.round(100 * quizGot / quizTotal), color: C.sun },
    { name: "つくる力（創造）", note: "命令を組み合わせて作品を作る", pct: Math.min(100, save.art.gallery.length * 20), color: C.sakura },
  ];
}
function lastNDays(n) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}
function Records({ save, go, onSound, onReset }) {
  const [tab, setTab] = useState("kid");
  const [gate, setGate] = useState(false);
  const [ans, setAns] = useState("");
  const skills = skillProgress(save);
  const days = lastNDays(14);
  const counts = days.map(d => {
    const l = save.log[d]; return l ? (l.puzzle || 0) + (l.quiz || 0) + (l.art || 0) : 0;
  });
  const maxC = Math.max(1, ...counts);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 40 }}>
      <Header save={save} title="📖 きろくの へや" onHome={() => go("home")} onSound={onSound} />
      <div style={{ display: "flex", gap: 10, padding: "0 16px", marginBottom: 14 }}>
        <Btn bg={tab === "kid" ? C.sun : "#fff"} onClick={() => setTab("kid")}>🧒 わたしの きろく</Btn>
        <Btn bg={tab === "parent" ? C.sun : "#fff"} onClick={() => { setTab("parent"); setGate(false); setAns(""); }}>👪 おうちのひとへ</Btn>
      </div>

      {tab === "kid" && (
        <div style={{ display: "grid", gap: 16, padding: "0 16px" }}>
          <div className="panel slide" style={{ padding: 18, textAlign: "center" }}>
            <span style={{ fontSize: 50 }}>{save.profile.avatar}</span>
            <div className="pl-display" style={{ fontSize: 24 }}>{save.profile.name} の ぼうけん</div>
            <div style={{ fontWeight: 800, marginTop: 6 }}>⭐ {puzzleStarsTotal(save)}こ ／ 🏅 バッジ {save.badges.length}こ ／ 🔥 {daysPlayed(save)}にち あそんだ</div>
          </div>
          <div className="panel" style={{ padding: 18 }}>
            <div className="pl-display" style={{ fontSize: 20, marginBottom: 10 }}>🏅 バッジ コレクション</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 }}>
              {BADGES.map(b => {
                const got = save.badges.includes(b.id);
                return (
                  <div key={b.id} className="panel" style={{ padding: 10, textAlign: "center", borderRadius: 14, background: got ? C.sun : "#F1EDE4", opacity: got ? 1 : 0.55 }}>
                    <div style={{ fontSize: 30, filter: got ? "none" : "grayscale(1)" }}>{got ? b.emoji : "❓"}</div>
                    <div style={{ fontWeight: 900, fontSize: 13 }}>{b.name}</div>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>{b.desc}</div>
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
            <div style={{ fontSize: 12, fontWeight: 700, marginTop: 6 }}>棒の高さ＝その日の活動回数（パズルクリア・クイズ・作品保存の合計）</div>
          </div>
          <div className="panel" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 6 }}>データの管理</div>
            <p style={{ fontSize: 13, fontWeight: 700 }}>記録はこのアプリ内に自動保存され、次回開いたときも続きから遊べます。</p>
            <Btn bg="#FFB3B3" onClick={onReset}>⚠️ きろくを ぜんぶ けす（さいしょから）</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= ロボット パズル ================= */
function parseStage(st) {
  const cells = st.grid.map(r => r.split(""));
  let start = { x: 0, y: 0, dir: st.dir };
  const stars = [];
  cells.forEach((row, y) => row.forEach((c, x) => {
    if (c === "S") { start = { x, y, dir: st.dir }; }
    if (c === "*") stars.push(`${x},${y}`);
  }));
  return { cells, start, stars, w: cells[0].length, h: cells.length };
}
function countBlocks(prog) {
  return prog.reduce((a, b) => a + (b.type === "repeat" ? 1 + countBlocks(b.children) : 1), 0);
}
function BlockChip({ b, activeUid, onRemove, onSelect, openRepeat, onCount }) {
  const d = BLOCK_DEFS[b.type];
  const active = activeUid === b.uid;
  if (b.type === "repeat") {
    const open = openRepeat === b.uid;
    return (
      <div className="panel" style={{
        padding: 8, borderRadius: 14, background: open ? "#FFE9A8" : C.sun,
        outline: active ? `4px solid ${C.sakura}` : "none", display: "inline-flex",
        alignItems: "center", gap: 6, flexWrap: "wrap", maxWidth: "100%",
      }}>
        <button className="pbtn" style={{ padding: "4px 8px", background: "#fff", fontSize: 14 }}
          onClick={() => onSelect(b.uid)}>🔁 {open ? "ここに いれてね▼" : "くりかえし"}</button>
        <button className="pbtn" style={{ padding: "2px 8px", background: "#fff" }} onClick={() => onCount(b.uid, -1)}>−</button>
        <b style={{ fontSize: 18 }}>{b.count}かい</b>
        <button className="pbtn" style={{ padding: "2px 8px", background: "#fff" }} onClick={() => onCount(b.uid, 1)}>＋</button>
        <span style={{ display: "inline-flex", gap: 4, flexWrap: "wrap" }}>
          {b.children.map(c => (
            <BlockChip key={c.uid} b={c} activeUid={activeUid} onRemove={onRemove} onSelect={onSelect} openRepeat={openRepeat} onCount={onCount} />
          ))}
          {b.children.length === 0 && <span style={{ fontSize: 12, fontWeight: 700, opacity: .6 }}>（からっぽ）</span>}
        </span>
        <button className="pbtn" aria-label="けす" style={{ padding: "2px 8px", background: "#FFB3B3" }} onClick={() => onRemove(b.uid)}>✖</button>
      </div>
    );
  }
  return (
    <button className="pbtn" onClick={() => onRemove(b.uid)}
      style={{
        padding: "6px 10px", background: d.color, fontSize: 15, borderRadius: 12,
        outline: active ? `4px solid ${C.sakura}` : "none",
      }}>
      {d.emoji} {d.label} <span style={{ opacity: .5, fontSize: 12 }}>✖</span>
    </button>
  );
}
function PuzzlePlay({ stage, save, update, onBack, onNext, hasNext }) {
  const info = parseStage(stage);
  const sound = save.settings.sound;
  const [prog, setProg] = useState([]);
  const [openRepeat, setOpenRepeat] = useState(null);
  const [bot, setBot] = useState(info.start);
  const [collected, setCollected] = useState({});
  const [running, setRunning] = useState(false);
  const [activeUid, setActiveUid] = useState(null);
  const [crash, setCrash] = useState(false);
  const [msg, setMsg] = useState(null);
  const [result, setResult] = useState(null);
  const [hint, setHint] = useState(false);
  const runIdRef = useRef(0);
  const uidRef = useRef(0);

  useEffect(() => { // ステージが かわったら リセット
    runIdRef.current++;
    setProg([]); setOpenRepeat(null); setBot(info.start); setCollected({});
    setRunning(false); setActiveUid(null); setCrash(false); setMsg(null); setResult(null); setHint(false);
  }, [stage.id]);

  const isWall = (x, y) => x < 0 || y < 0 || x >= info.w || y >= info.h || info.cells[y][x] === "#";

  function addBlock(type) {
    if (running) return;
    if (countBlocks(prog) >= 16) { setMsg("ブロックが いっぱいだよ！🔁くりかえしを つかうと みじかく なるかも"); return; }
    SFX.tap(sound);
    const nb = { uid: ++uidRef.current, type };
    if (type === "repeat") { nb.count = 3; nb.children = []; setProg(p => [...p, nb]); setOpenRepeat(nb.uid); return; }
    if (openRepeat) {
      setProg(p => p.map(b => b.uid === openRepeat ? { ...b, children: [...b.children, nb] } : b));
    } else setProg(p => [...p, nb]);
  }
  function removeBlock(uid) {
    if (running) return;
    SFX.tap(sound);
    if (openRepeat === uid) setOpenRepeat(null);
    setProg(p => p.filter(b => b.uid !== uid).map(b => b.type === "repeat" ? { ...b, children: b.children.filter(c => c.uid !== uid) } : b));
  }
  function changeCount(uid, d) {
    if (running) return;
    setProg(p => p.map(b => b.uid === uid ? { ...b, count: Math.max(2, Math.min(9, b.count + d)) } : b));
  }
  function selectRepeat(uid) { if (!running) setOpenRepeat(o => o === uid ? null : uid); }

  function resetBot() {
    runIdRef.current++;
    setBot(info.start); setCollected({}); setRunning(false);
    setActiveUid(null); setCrash(false); setMsg(null);
  }

  async function run() {
    if (running) return;
    if (prog.length === 0) { setMsg("したの ブロックを タップして ならべてみよう！"); return; }
    const my = ++runIdRef.current;
    let st = { ...info.start }; let col = {};
    setBot(st); setCollected({}); setCrash(false); setMsg(null); setRunning(true);
    const delay = ms => new Promise(r => setTimeout(r, ms));
    await delay(350);
    const doPrim = async b => {
      if (runIdRef.current !== my) return "abort";
      setActiveUid(b.uid);
      const ahead = { x: st.x + DX[st.dir], y: st.y + DY[st.dir] };
      const wallAhead = isWall(ahead.x, ahead.y);
      if (b.type === "left") { st = { ...st, dir: (st.dir + 3) % 4 }; setBot(st); SFX.step(sound); }
      else if (b.type === "right") { st = { ...st, dir: (st.dir + 1) % 4 }; setBot(st); SFX.step(sound); }
      else if (b.type === "smartR" && wallAhead) { st = { ...st, dir: (st.dir + 1) % 4 }; setBot(st); SFX.step(sound); }
      else if (b.type === "smartL" && wallAhead) { st = { ...st, dir: (st.dir + 3) % 4 }; setBot(st); SFX.step(sound); }
      else if (wallAhead) {
        setCrash(true); SFX.fail(sound);
        setMsg("かべに ぶつかっちゃった！ もういちど かんがえてみよう 💪");
        return "fail";
      } else {
        st = { ...st, x: ahead.x, y: ahead.y }; setBot(st);
        const key = `${st.x},${st.y}`;
        if (info.cells[st.y][st.x] === "*" && !col[key]) {
          col = { ...col, [key]: true }; setCollected(col); SFX.star(sound);
          if (Object.keys(col).length === info.stars.length) { await delay(420); return "win"; }
        } else SFX.step(sound);
      }
      await delay(430);
      return runIdRef.current === my ? "ok" : "abort";
    };
    let status = "ok";
    outer:
    for (const b of prog) {
      if (b.type === "repeat") {
        for (let i = 0; i < b.count; i++) for (const c of b.children) {
          const r = await doPrim(c); if (r !== "ok") { status = r; break outer; }
        }
      } else {
        const r = await doPrim(b); if (r !== "ok") { status = r; break outer; }
      }
    }
    if (runIdRef.current !== my) return;
    setActiveUid(null); setRunning(false);
    if (status === "win") {
      SFX.win(sound);
      const n = countBlocks(prog);
      const starN = n <= stage.par ? 3 : n <= stage.par + 2 ? 2 : 1;
      setResult({ stars: starN, n });
      update(s => {
        s.puzzle.stars[stage.id] = Math.max(s.puzzle.stars[stage.id] || 0, starN);
        const d = today(); s.log[d] = s.log[d] || {}; s.log[d].puzzle = (s.log[d].puzzle || 0) + 1;
        return s;
      });
    } else if (status === "ok") {
      SFX.fail(sound);
      setMsg("うごきは できたけど、ほしが のこっているよ。ブロックを たしてみよう！");
    }
  }

  const cell = Math.min(56, Math.floor(320 / info.w));
  const world = WORLD_META[stage.world];
  const hints = {
    1: "⬆️まえへ で すすんで、↩️↪️で むきを かえよう。ロボットの むいている ほうこうに ちゅうもく！",
    2: "おなじ ブロックが つづくときは 🔁くりかえしに いれると ブロックが へって ⭐が ふえるよ！",
    3: "🧠かべ？ブロックは「まえが かべなら まがる・かべじゃないなら すすむ」。🔁と くみあわせると さいきょう！",
  };
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 14px 30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0", flexWrap: "wrap" }}>
        <Btn bg="#fff" onClick={onBack}>◀ もどる</Btn>
        <div className="pl-display" style={{ fontSize: 20, flex: 1 }}>{world.emoji} {stage.name}</div>
        <StarRow n={save.puzzle.stars[stage.id] || 0} size={20} />
      </div>
      <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 8 }}>
        ⭐3つの めやす：ブロック {stage.par}こ いか（いま {countBlocks(prog)}こ）
      </div>

      {/* ばんめん */}
      <div className="panel" style={{ padding: 14, display: "flex", justifyContent: "center", background: "#FBFDFF" }}>
        <div className={crash ? "shake" : ""} style={{ position: "relative", width: cell * info.w, height: cell * info.h }}>
          {info.cells.map((row, y) => row.map((c, x) => (
            <div key={`${x},${y}`} style={{
              position: "absolute", left: x * cell, top: y * cell, width: cell - 4, height: cell - 4,
              margin: 2, borderRadius: 10, border: `2px solid ${C.ink}`,
              background: c === "#" ? "#8FBF7F" : (x + y) % 2 ? "#FFF3D6" : "#FFFBEF",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: cell * 0.55,
            }}>
              {c === "#" ? "🌳" : c === "*" && !collected[`${x},${y}`] ? "⭐" : ""}
            </div>
          )))}
          <div style={{
            position: "absolute", left: bot.x * cell, top: bot.y * cell, width: cell, height: cell,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "left .3s, top .3s", zIndex: 5,
          }}>
            <span style={{ fontSize: cell * 0.6, position: "relative" }}>
              🤖
              <span style={{
                position: "absolute", top: "50%", left: "50%", fontSize: cell * 0.3, color: C.sakura,
                transform: `translate(-50%,-50%) rotate(${bot.dir * 90}deg) translateX(${cell * 0.42}px)`,
              }}>▶</span>
            </span>
          </div>
        </div>
      </div>

      {msg && <div className="panel slide" style={{ padding: 12, marginTop: 10, background: "#FFF1F4", fontWeight: 800 }}>{msg}</div>}
      {hint && <div className="panel slide" style={{ padding: 12, marginTop: 10, background: "#EAF7FF", fontWeight: 800 }}>💡 {hints[stage.world]}</div>}

      {/* プログラム */}
      <div className="panel" style={{ padding: 12, marginTop: 12, minHeight: 58 }}>
        <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 6 }}>📜 プログラム（タップで けせるよ）</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {prog.length === 0 && <span style={{ fontWeight: 700, opacity: .5 }}>ここに めいれいが ならぶよ</span>}
          {prog.map(b => (
            <BlockChip key={b.uid} b={b} activeUid={activeUid} onRemove={removeBlock}
              onSelect={selectRepeat} openRepeat={openRepeat} onCount={changeCount} />
          ))}
        </div>
      </div>

      {/* パレット */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
        {WORLD_PALETTE[stage.world].map(t => (
          <Btn key={t} bg={BLOCK_DEFS[t].color} disabled={running || (t === "repeat" && openRepeat !== null)}
            onClick={() => addBlock(t)} style={{ fontSize: 15 }}>
            {BLOCK_DEFS[t].emoji} {BLOCK_DEFS[t].label}
          </Btn>
        ))}
        {openRepeat && <Btn bg="#fff" onClick={() => setOpenRepeat(null)}>✅ くりかえし おわり</Btn>}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <Btn big bg={C.leaf} onClick={run} disabled={running}>▶️ うごかす！</Btn>
        <Btn bg="#fff" onClick={resetBot}>🔄 さいしょから</Btn>
        <Btn bg={C.sun} onClick={() => { setHint(h => !h); SFX.tap(sound); }}>💡 ヒント</Btn>
      </div>

      {/* クリアがめん */}
      {result && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(58,51,53,.45)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel pop" style={{ padding: 26, textAlign: "center", maxWidth: 380, background: "#FFFDF5" }}>
            <div style={{ fontSize: 54 }}>🎉</div>
            <div className="pl-display" style={{ fontSize: 26 }}>クリア！</div>
            <StarRow n={result.stars} size={38} />
            <div style={{ fontWeight: 800, margin: "8px 0" }}>
              ブロック {result.n}こで クリア！
              {result.stars < 3 && <><br />（{stage.par}こ いかで ⭐3つに なるよ）</>}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 10 }}>
              <Btn bg="#fff" onClick={() => { setResult(null); resetBot(); }}>🔁 もういちど</Btn>
              {hasNext
                ? <Btn big bg={C.leaf} onClick={onNext}>つぎへ ▶</Btn>
                : <Btn big bg={C.leaf} onClick={onBack}>ステージへ もどる</Btn>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function Puzzle({ save, update, go, onSound }) {
  const [world, setWorld] = useState(1);
  const [stageId, setStageId] = useState(null);
  const stages = STAGES.filter(s => s.world === world);
  const clearedIn = w => STAGES.filter(s => s.world === w && (save.puzzle.stars[s.id] || 0) > 0).length;
  const unlockedWorld = w => w === 1 || clearedIn(w - 1) >= 3;
  const unlockedStage = i => i === 0 || (save.puzzle.stars[stages[i - 1].id] || 0) > 0;
  const stage = STAGES.find(s => s.id === stageId);

  if (stage) {
    const idx = stages.findIndex(s => s.id === stage.id);
    const next = stages[idx + 1];
    return (
      <div>
        <Header save={save} title="🤖 ロボット パズル" onHome={() => go("home")} onSound={onSound} />
        <PuzzlePlay stage={stage} save={save} update={update}
          onBack={() => setStageId(null)}
          hasNext={!!next}
          onNext={() => setStageId(next ? next.id : null)} />
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="🤖 ロボット パズル" onHome={() => go("home")} onSound={onSound} />
      <div style={{ display: "flex", gap: 8, padding: "0 16px", flexWrap: "wrap" }}>
        {[1, 2, 3].map(w => {
          const un = unlockedWorld(w);
          return (
            <Btn key={w} bg={world === w ? WORLD_META[w].color : "#fff"} disabled={!un}
              onClick={() => setWorld(w)} style={{ fontSize: 14 }}>
              {un ? WORLD_META[w].emoji : "🔒"} ワールド{w}
            </Btn>
          );
        })}
      </div>
      <div className="panel slide" style={{ margin: "14px 16px", padding: 16, background: "#fff" }}>
        <div className="pl-display" style={{ fontSize: 22 }}>{WORLD_META[world].emoji} {WORLD_META[world].name}</div>
        <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 12 }}>みにつく ちから：{WORLD_META[world].skill}</div>
        <div style={{ display: "grid", gap: 10 }}>
          {stages.map((s, i) => {
            const st = save.puzzle.stars[s.id] || 0;
            const un = unlockedStage(i);
            return (
              <button key={s.id} className="pbtn" disabled={!un} onClick={() => setStageId(s.id)}
                style={{ background: st > 0 ? "#F1FFF0" : "#fff", padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
                <span style={{ fontSize: 26 }}>{un ? (st > 0 ? "✅" : "🎯") : "🔒"}</span>
                <span style={{ flex: 1, fontWeight: 900, fontSize: 16 }}>ステージ {s.id}　{s.name}</span>
                <StarRow n={st} size={18} />
              </button>
            );
          })}
        </div>
        {world < 3 && clearedIn(world) < 3 && (
          <div style={{ fontWeight: 800, fontSize: 13, marginTop: 10 }}>
            🔓 つぎの ワールドは、この ワールドを 3ステージ クリアすると ひらくよ！（いま {clearedIn(world)}こ）
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= かんがえる クイズ ================= */
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
function Quiz({ save, update, go, onSound }) {
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

/* ================= おえかき コード ================= */
function turtleSegs(cmds) {
  let x = 160, y = 215, ang = -90, ci = 0;
  const segs = [];
  for (const t of cmds) {
    if (t === "fwd") {
      const nx = x + Math.cos(ang * Math.PI / 180) * 34;
      const ny = y + Math.sin(ang * Math.PI / 180) * 34;
      segs.push({ x1: x, y1: y, x2: nx, y2: ny, c: ART_COLORS[ci] });
      x = nx; y = ny;
    } else if (t === "right") ang += 90;
    else if (t === "left") ang -= 90;
    else if (t === "color") ci = (ci + 1) % ART_COLORS.length;
  }
  return { segs, x, y, ang };
}
function ArtSVG({ cmds, size = 320, reveal = Infinity, showTurtle = true }) {
  const { segs, x, y, ang } = turtleSegs(cmds);
  const shown = segs.slice(0, reveal);
  const cur = shown.length ? shown[shown.length - 1] : null;
  const tx = reveal >= segs.length ? x : cur ? cur.x2 : 160;
  const ty = reveal >= segs.length ? y : cur ? cur.y2 : 215;
  return (
    <svg width={size} height={size} viewBox="0 0 320 320" style={{ display: "block", maxWidth: "100%" }}>
      <rect x="0" y="0" width="320" height="320" fill="#FFFFFF" rx="16" />
      {shown.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.c} strokeWidth="7" strokeLinecap="round" />
      ))}
      {showTurtle && <text x={tx} y={ty + 8} fontSize="26" textAnchor="middle">🐢</text>}
    </svg>
  );
}
function Art({ save, update, go, onSound }) {
  const sound = save.settings.sound;
  const [cmds, setCmds] = useState([]);
  const [reveal, setReveal] = useState(Infinity);
  const [playing, setPlaying] = useState(false);
  const [savedMsg, setSavedMsg] = useState(null);
  const playRef = useRef(0);
  const segsN = turtleSegs(cmds).segs.length;

  function add(t) {
    if (cmds.length >= 60) { setSavedMsg("めいれいが いっぱいだよ！"); return; }
    SFX.tap(sound); setSavedMsg(null);
    setCmds(c => [...c, t]); setReveal(Infinity);
  }
  function undo() { SFX.tap(sound); setCmds(c => c.slice(0, -1)); setReveal(Infinity); }
  function clearAll() { SFX.tap(sound); setCmds([]); setReveal(Infinity); setSavedMsg(null); }
  async function replay() {
    if (playing || segsN === 0) return;
    const my = ++playRef.current;
    setPlaying(true);
    for (let k = 0; k <= segsN; k++) {
      if (playRef.current !== my) return;
      setReveal(k); SFX.step(sound);
      await new Promise(r => setTimeout(r, 240));
    }
    setPlaying(false); SFX.win(sound);
  }
  function saveArt() {
    if (segsN === 0) { setSavedMsg("まだ なにも かいて いないよ！✏️で かいてみよう"); return; }
    if (save.art.gallery.length >= 12) { setSavedMsg("びじゅつかんが いっぱい！ふるい さくひんを けしてから ほぞんしてね"); return; }
    SFX.badge(sound);
    update(s => {
      s.art.gallery.push({ id: Date.now(), date: today(), cmds: [...cmds], name: `さくひん ${s.art.gallery.length + 1}` });
      const d = today(); s.log[d] = s.log[d] || {}; s.log[d].art = (s.log[d].art || 0) + 1;
      return s;
    });
    setSavedMsg("🖼️ びじゅつかんに ほぞんしたよ！");
  }
  function delArt(id) {
    SFX.tap(sound);
    update(s => { s.art.gallery = s.art.gallery.filter(a => a.id !== id); return s; });
  }
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="🎨 おえかき コード" onHome={() => go("home")} onSound={onSound} />
      <div style={{ padding: "0 16px", display: "grid", gap: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 14 }}>めいれいを ならべて、カメさんに えを かかせよう！</div>
        <div className="panel" style={{ padding: 10, display: "flex", justifyContent: "center" }}>
          <ArtSVG cmds={cmds} reveal={reveal === Infinity ? segsN : reveal} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.entries(ART_CMDS).map(([t, d]) => (
            <Btn key={t} bg={t === "color" ? C.sakura : t === "fwd" ? C.leaf : C.sky} onClick={() => add(t)} style={{ fontSize: 15 }}>
              {d.emoji} {d.label}
            </Btn>
          ))}
        </div>
        <div className="panel" style={{ padding: 10 }}>
          <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 6 }}>📜 めいれい（{cmds.length}こ）</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", minHeight: 26 }}>
            {cmds.length === 0 && <span style={{ fontWeight: 700, opacity: .5 }}>ここに めいれいが ならぶよ</span>}
            {cmds.map((t, i) => <span key={i} style={{ fontSize: 20 }}>{ART_CMDS[t].emoji}</span>)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Btn big bg={C.leaf} onClick={replay} disabled={playing}>▶️ さいせい</Btn>
          <Btn bg="#fff" onClick={undo} disabled={cmds.length === 0}>↩️ ひとつ もどす</Btn>
          <Btn bg="#fff" onClick={clearAll} disabled={cmds.length === 0}>🧽 ぜんぶ けす</Btn>
          <Btn bg={C.sun} onClick={saveArt}>💾 ほぞんする</Btn>
        </div>
        {savedMsg && <div className="panel slide" style={{ padding: 12, background: "#FFFBE0", fontWeight: 800 }}>{savedMsg}</div>}
        <div className="panel" style={{ padding: 14 }}>
          <div className="pl-display" style={{ fontSize: 18, marginBottom: 8 }}>🎯 ちょうせん してみよう</div>
          <div style={{ display: "grid", gap: 8 }}>
            {ART_CHALLENGES.map(c => (
              <div key={c.name} style={{ fontWeight: 800, fontSize: 14, background: "#F7FBFF", border: `2px solid ${C.ink}`, borderRadius: 12, padding: 10 }}>
                {c.emoji} <b>{c.name}</b>：{c.hint}
              </div>
            ))}
          </div>
        </div>
        {save.art.gallery.length > 0 && (
          <div className="panel" style={{ padding: 14 }}>
            <div className="pl-display" style={{ fontSize: 18, marginBottom: 8 }}>🖼️ わたしの びじゅつかん</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 10 }}>
              {save.art.gallery.map(a => (
                <div key={a.id} className="panel" style={{ padding: 8, borderRadius: 14, textAlign: "center" }}>
                  <ArtSVG cmds={a.cmds} size={110} showTurtle={false} />
                  <div style={{ fontWeight: 900, fontSize: 12 }}>{a.name}</div>
                  <div style={{ fontSize: 10, fontWeight: 700 }}>{a.date}</div>
                  <button className="pbtn" style={{ padding: "2px 8px", background: "#FFB3B3", fontSize: 11, marginTop: 4 }}
                    onClick={() => delArt(a.id)}>✖ けす</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= ルート ================= */
export default function ProgrammingLand() {
  const [save, setSave] = useState(null);
  const [screen, setScreen] = useState("loading");
  const [toast, setToast] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    loadSave().then(s => { setSave(s); setScreen(s.profile ? "home" : "onboard"); });
  }, []);

  function update(fn) {
    setSave(prev => {
      const next = fn(JSON.parse(JSON.stringify(prev)));
      const earned = BADGES.filter(b => { try { return b.check(next); } catch (e) { return false; } }).map(b => b.id);
      const news = earned.filter(id => !prev.badges.includes(id));
      next.badges = earned;
      if (news.length > 0) {
        const b = BADGES.find(x => x.id === news[0]);
        SFX.badge(next.settings.sound);
        setToast(b); setTimeout(() => setToast(null), 2800);
      }
      persistSave(next);
      return next;
    });
  }
  const onSound = () => update(s => { s.settings.sound = !s.settings.sound; return s; });
  async function doReset() {
    try { await window.storage.delete(SAVE_KEY); } catch (e) { /* なくても OK */ }
    const s = newSave(); setSave(s); setConfirmReset(false); setScreen("onboard");
  }

  if (screen === "loading" || !save) {
    return (
      <div className="pl-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <style>{CSS}</style>
        <div style={{ textAlign: "center", fontWeight: 900 }}>
          <div className="bounce" style={{ fontSize: 60 }}>🤖</div>
          よみこみちゅう…
        </div>
      </div>
    );
  }
  return (
    <div className="pl-root">
      <style>{CSS}</style>
      <Toast toast={toast} />
      {screen === "onboard" && (
        <Onboarding onDone={(name, avatar) => {
          update(s => { s.profile = { name, avatar, createdAt: today() }; return s; });
          setScreen("home");
        }} />
      )}
      {screen === "home" && <Home save={save} go={setScreen} onSound={onSound} />}
      {screen === "puzzle" && <Puzzle save={save} update={update} go={setScreen} onSound={onSound} />}
      {screen === "quiz" && <Quiz save={save} update={update} go={setScreen} onSound={onSound} />}
      {screen === "art" && <Art save={save} update={update} go={setScreen} onSound={onSound} />}
      {screen === "records" && (
        <Records save={save} go={setScreen} onSound={onSound} onReset={() => setConfirmReset(true)} />
      )}
      {confirmReset && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(58,51,53,.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel pop" style={{ padding: 24, maxWidth: 360, textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>⚠️</div>
            <div style={{ fontWeight: 900, fontSize: 17, margin: "6px 0" }}>ほんとうに ぜんぶ けしますか？</div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 14 }}>ほし・バッジ・さくひん・きろくが すべて きえます。もとに もどせません。</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <Btn bg="#fff" onClick={() => setConfirmReset(false)}>やめる</Btn>
              <Btn bg="#FFB3B3" onClick={doReset}>けす</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
