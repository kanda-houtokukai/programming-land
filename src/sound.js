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
  crit: on => on && [1046, 1318, 1568].forEach((f, i) => tone(f, 0.1, i * 0.05, "square", 0.1)), // かいしんのいちげき
  // バトル演出（P6・フェーズ1.5）
  down: on => on && [392, 294, 196].forEach((f, i) => tone(f, 0.22, i * 0.14)),                    // 敵ダウン（下降）
  heal: on => on && [660, 880, 1100].forEach((f, i) => tone(f, 0.14, i * 0.1, "sine", 0.12)),      // かいふく
  shield: on => on && (tone(220, 0.2, 0, "square", 0.08), tone(520, 0.25, 0.08, "sine", 0.12)),    // たてで防いだ
  power: on => on && [330, 440, 587].forEach((f, i) => tone(f, 0.12, i * 0.08, "square", 0.08)),   // パワーアップ
  hint: on => on && tone(988, 0.09, 0, "sine", 0.12),                                              // 選択肢が消える
  charge: on => on && [330, 392, 494, 587, 698].forEach((f, i) => tone(f, 0.1, i * 0.11, "square", 0.07)), // 予兆の溜め（上昇）
  fanfare: on => on && [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, i >= 5 ? 0.34 : 0.16, i * 0.13, "sine", 0.15)), // しんかの祝福



  evolve: on => on && [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.22, i * 0.14, "sine", 0.15)),
};
