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

const SRC = {                 // 生成済みのkeyだけ。battle/studioは曲が来たら足す
  home: homeUrl, myhome: myhomeUrl, shop: shopUrl, puzzle: puzzleUrl,
  quiz: quizUrl, typing: typingUrl, art: artUrl, powers: powersUrl,
};

const BGM_VOL = 0.5;          // ← 初期値（実機で微調整するのはこの1箇所）
const FADE_MS = 450;          // 切替のフェード長（初期値）

const players = {};           // key -> HTMLAudioElement（遅延生成・使い回し＝再入場で即時＆キャッシュ）
let current = null;           // 今のkey
let wantOn = false;           // settings.sound の最新値
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
  fade(a, BGM_VOL, FADE_MS);
}

// App から呼ぶ唯一のAPI。key=null は無音。on=settings.sound。
export function setBgm(key, on) {
  wantOn = on;
  if (!on || !key || !SRC[key]) {                 // 音OFF or 曲なし → 今の曲を消す
    if (current && players[current]) {
      const a = players[current];
      fade(a, 0, FADE_MS, () => { a.pause(); });
    }
    current = key && SRC[key] ? key : null;        // battle等でも current は覚える（解錠後に鳴らすため）
    return;
  }
  if (key === current) {                           // 同じ曲 → 鳴っていることを保証
    const a = el(key);
    if (a.paused) start(key); else fade(a, BGM_VOL, FADE_MS);
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
