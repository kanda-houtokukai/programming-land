// BGM。場面ごとに1曲を遅延生成してループ再生。既存の settings.sound に相乗り。
// 自動再生制限（iPad Safari）対策: play() が弾かれたら最初のユーザー操作で開始。
// App から呼ぶ唯一のAPI = setBgm(key, on)。曲追加は SRC（と App の TRACK）に1行ずつ。
// 音源は -19 LUFS 統一・継ぎ目焼き込み済み（HTML5 loop で回すだけで継ぎ目が出ない）。
import homeUrl   from "./assets/bgm/home.m4a";
import myhomeUrl from "./assets/bgm/myhome.m4a";
import shopUrl   from "./assets/bgm/shop.m4a";
import puzzleUrl from "./assets/bgm/puzzle.m4a";
import quizUrl   from "./assets/bgm/quiz.m4a";
import typingUrl from "./assets/bgm/typing.m4a";
import artUrl    from "./assets/bgm/art.m4a";
import powersUrl from "./assets/bgm/powers.m4a";
import battleUrl from "./assets/bgm/battle.m4a";
import studioUrl from "./assets/bgm/studio.m4a";

const SRC = {                 // 10曲（b5t: battle/studio 接続で無音マッピング解消）
  home: homeUrl, myhome: myhomeUrl, shop: shopUrl, puzzle: puzzleUrl,
  quiz: quizUrl, typing: typingUrl, art: artUrl, powers: powersUrl,
  battle: battleUrl, studio: studioUrl,
};

// FB5便①: 音量3段階+ミュート。index=settings.musicVol（0=ミュート/1=小/2=中/3=大）。
// 3=0.5 は b5j の BGM_VOL と同値＝既定の体感は不変。値はすべて初期値（実機で微調整するのはこの1箇所）
const BGM_LEVELS = [0, 0.12, 0.35, 0.6]; // FB6便④: 隣接+9dB/+4.7dB＝はっきり分かる差に拡大（旧[0,0.2,0.35,0.5]は差が地味）。この4値だけが調整ノブ
const FADE_MS = 450;          // 切替のフェード長（初期値）

const players = {};           // key -> HTMLAudioElement（遅延生成・使い回し＝再入場で即時＆キャッシュ）
let current = null;           // 今のkey
let wantOn = false;           // 音楽が鳴るべきか（musicVol > 0）
let wantVol = BGM_LEVELS[3];  // いまの目標音量（musicVol の段に対応）
let unlockArmed = false;      // 自動再生解錠リスナーを張ったか

function el(key) {
  if (!players[key]) {
    const a = new Audio(SRC[key]);
    a.loop = true; a.preload = "auto"; a.volume = 0;
    players[key] = a;
  }
  return players[key];
}

function fade(a, to, ms, onEnd) {
  if (a._raf) cancelAnimationFrame(a._raf);
  const from = a.volume, t0 = performance.now();
  const tick = now => {
    const k = Math.min(1, (now - t0) / ms);
    a.volume = from + (to - from) * k;
    if (k < 1) a._raf = requestAnimationFrame(tick);
    else { a._raf = null; if (onEnd) onEnd(); }
  };
  a._raf = requestAnimationFrame(tick);
}

function armUnlock() {
  if (unlockArmed) return;
  unlockArmed = true;
  const go = () => {
    document.removeEventListener("pointerdown", go);
    document.removeEventListener("touchstart", go);
    document.removeEventListener("keydown", go);
    unlockArmed = false;
    if (wantOn && current && SRC[current]) start(current);
  };
  document.addEventListener("pointerdown", go, { once: true });
  document.addEventListener("touchstart", go, { once: true });
  document.addEventListener("keydown", go, { once: true });
}

function start(key) {
  const a = el(key);
  const p = a.play();
  if (p && p.catch) p.catch(() => armUnlock()); // 未解錠なら次の操作で
  fade(a, wantVol, FADE_MS);
}

// App から呼ぶ唯一のAPI。key=null は無音。level=settings.musicVol（0〜3・0=ミュート）。
export function setBgm(key, level) {
  const vol = BGM_LEVELS[level] ?? 0;
  const on = vol > 0;
  wantVol = vol;
  wantOn = on;
  if (!on || !key || !SRC[key]) {                 // ミュート or 曲なし → 今の曲を消す
    if (current && players[current]) {
      const a = players[current];
      fade(a, 0, FADE_MS, () => { a.pause(); });
    }
    current = key && SRC[key] ? key : null;        // battle等でも current は覚える（解錠後に鳴らすため）
    return;
  }
  if (key === current) {                           // 同じ曲 → 鳴っていることを保証（音量段だけ変えた時もここで新volへ）
    const a = el(key);
    if (a.paused) start(key); else fade(a, wantVol, FADE_MS);
    return;
  }
  // 別の曲 → クロスフェード（旧を下げてpause・新を0から上げる）
  if (current && players[current]) {
    const old = players[current];
    fade(old, 0, FADE_MS, () => { old.pause(); });
  }
  current = key;
  start(key);
}

/* ===== ジングル（b5t）: ループしない一発再生（完成演出などの締め） ===== */
import kanseiUrl from "./assets/bgm/jingle_kansei.m4a";
const JINGLES = { kansei: kanseiUrl };
let jingleEl = null;

// 一発再生。on=音が出る設定か（settings.musicVol>0）。ミュート時は鳴らさない（全音オフと一貫）。
// BGMとは別要素なので、BGMを止めずに上に重なる（2.3sの締め。ダッキングは今回入れない＝指示書）。
export function playJingle(key, on) {
  if (!on || !JINGLES[key]) return;
  if (!jingleEl) jingleEl = new Audio();
  jingleEl.src = JINGLES[key];
  jingleEl.volume = 0.8;                 // -16 LUFS素材＝BGMの上で映える。初期値
  jingleEl.currentTime = 0;
  const p = jingleEl.play();
  if (p && p.catch) p.catch(() => {});   // 保存ボタン後＝解錠済みのはずだが握りつぶす
}
