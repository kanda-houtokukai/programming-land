// 効果音（v1から移植）。AudioContextは最初の操作音で初期化される＝自動再生制限対策
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
export const SFX = {
  tap: on => on && tone(600, 0.08),
  step: on => on && tone(440, 0.07),
  star: on => on && (tone(880, 0.12), tone(1320, 0.15, 0.1)),
  win: on => on && [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, i * 0.13)),
  fail: on => on && (tone(300, 0.18), tone(220, 0.25, 0.15)),
  badge: on => on && [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.2, i * 0.11, "sine", 0.14)),
  levelup: on => on && [660, 880, 1100].forEach((f, i) => tone(f, 0.12, i * 0.09)),
  evolve: on => on && [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.22, i * 0.14, "sine", 0.15)),
};
