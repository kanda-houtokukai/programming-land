/* つくるスタジオ 実行エンジンの単体テスト（段階1の完了条件・指示書§3-4）。
   engine.js は UI非依存の純ロジック＝node から直接 import し、tick() 連打で決定的に検証する。
   実行: node tools/test-studio-engine.mjs
   必須5項目:
   ① 端で残り歩数を捨てて次へ ② 入れ子くりかえしの実行回数 ③ ずっとの停止
   ④ 並行2スタックの拍整合 ⑤ ぶつかりの再発火条件（重なり継続中は再発火せず・離れて再接触で発火） */

import { createEngine, TICK, LCOLS, LROWS, SIZE_STEPS, SIZE_INIT } from "../src/workshop/engine.js";

let fail = 0;
const ok = (cond, msg) => { console.log(`${cond ? "✓" : "✗ FAIL"} ${msg}`); if (!cond) fail++; };

let _id = 1;
const mk = (type, extra = {}) => ({ id: _id++, type, ...extra });
const hatStack = (...body) => ({ blocks: [mk("hat"), ...body] });

function record() {
  const ev = [];
  let beat = 0;
  const cb = {
    onFx: (key, fx) => ev.push({ beat, key, ...fx }),
    onUpdate: (ch, cause) => { if (cause !== "reset") ev.push({ beat, key: ch.key, type: cause, x: ch.x, y: ch.y }); },
    onDone: natural => ev.push({ beat, type: "done", natural }),
  };
  return { ev, cb, tickTo: (eng, n) => { while (beat < n) { beat++; eng.tick(); } }, curBeat: () => beat };
}

/* ---- 定数の正本値（§11） ---- */
ok(TICK === 400 && LCOLS === 12 && LROWS === 8, "定数: TICK=400 / 論理12×8");
ok(SIZE_STEPS.join() === "0.5,0.75,1,1.5,2" && SIZE_STEPS[SIZE_INIT] === 1, "定数: 大きさ5段階・初期1倍");

/* ---- ① 端で残り歩数を捨てて次へ ---- */
{
  const r = record();
  const eng = createEngine([{ key: "a", x: 10, y: 0, stacks: [hatStack(mk("move", { n: 5 }), mk("sound", { s: 0 }))] }], r.cb);
  ok(eng.start() === true, "① start（はたあり）");
  r.tickTo(eng, 10);
  const a = eng.getChar("a");
  ok(a.x === 11 && a.y === 0, `① x=10から みぎへ5 → 端(11)で停止（実測 x=${a.x}）`);
  const bump = r.ev.find(e => e.type === "bump");
  const snd = r.ev.find(e => e.type === "sound");
  ok(bump && bump.beat === 2, `① 端の拍=2拍目にぶつかり演出（実測 ${bump && bump.beat}拍目）`);
  ok(snd && snd.beat === 3, `① 残り歩数を捨てて 3拍目に次のカード（おと）（実測 ${snd && snd.beat}拍目）`);
  ok(r.ev.some(e => e.type === "done" && e.natural), "① 自然終了する（待ち受けなし）");
}

/* ---- ② 入れ子くりかえしの実行回数 ---- */
{
  const r = record();
  const inner = mk("repeat", { n: 2, children: [mk("sound", { s: 1 })] });
  const outer = mk("repeat", { n: 3, children: [inner] });
  const eng = createEngine([{ key: "a", x: 0, y: 0, stacks: [hatStack(outer)] }], r.cb);
  eng.start();
  r.tickTo(eng, 20);
  const n = r.ev.filter(e => e.type === "sound").length;
  ok(n === 6, `② くりかえし3×くりかえし2 → おと6回（実測 ${n}回）`);
  const beats = r.ev.filter(e => e.type === "sound").map(e => e.beat).join();
  ok(beats === "1,2,3,4,5,6", `② 6回が1〜6拍に連続（実測 ${beats}）`);
}

/* ---- ③ ずっとの停止（■まで走り続け、■で初期化） ---- */
{
  const r = record();
  const eng = createEngine([{ key: "a", x: 0, y: 0, stacks: [hatStack(mk("forever", { children: [mk("move", { n: 1 })] }))] }], r.cb);
  eng.start();
  r.tickTo(eng, 8);
  ok(eng.isRunning() && eng.getChar("a").x === 8, `③ ずっと{みぎへ1}が8拍で8マス進み走り続ける（実測 x=${eng.getChar("a").x}）`);
  ok(!r.ev.some(e => e.type === "done"), "③ 自然終了しない");
  eng.stop();
  ok(!eng.isRunning() && eng.getChar("a").x === 0, "③ ■で停止し初期位置へ初期化");
  const moves = r.ev.filter(e => e.type === "move").length;
  r.tickTo(eng, 12);
  ok(r.ev.filter(e => e.type === "move").length === moves, "③ 停止後は tick しても動かない");
  // 空の「ずっと」が無限ループしない（1周=1拍のガード）
  const eng2 = createEngine([{ key: "a", x: 0, y: 0, stacks: [hatStack(mk("forever", { children: [] }))] }], {});
  eng2.start();
  for (let i = 0; i < 5; i++) eng2.tick(); // ハングしなければOK
  ok(eng2.isRunning(), "③ 空のずっとも1周1拍で安全に回る（ハングしない）");
  eng2.stop();
}

/* ---- ④ 並行2スタックの拍整合 ---- */
{
  // A: みぎへ2 → おと ／ B: まつ2 → おと。どちらも3拍目におとが鳴れば拍が揃っている
  const r = record();
  const eng = createEngine([
    { key: "a", x: 0, y: 0, stacks: [hatStack(mk("move", { n: 2 }), mk("sound", { s: 0 }))] },
    { key: "b", x: 0, y: 4, stacks: [hatStack(mk("wait", { n: 2 }), mk("sound", { s: 2 }))] },
  ], r.cb);
  eng.start();
  r.tickTo(eng, 6);
  const sa = r.ev.find(e => e.type === "sound" && e.key === "a");
  const sb = r.ev.find(e => e.type === "sound" && e.key === "b");
  ok(sa && sb && sa.beat === 3 && sb.beat === 3, `④ みぎへ2とまつ2が同じ3拍目に次カードへ（実測 a=${sa && sa.beat} b=${sb && sb.beat}）`);
  // ジャンプ=2拍の整合: C: ジャンプ2 → おと（5拍目）／ D: まつ4 → おと（5拍目）
  const r2 = record();
  const eng2 = createEngine([
    { key: "c", x: 0, y: 0, stacks: [hatStack(mk("jump", { n: 2 }), mk("sound", { s: 0 }))] },
    { key: "d", x: 0, y: 4, stacks: [hatStack(mk("wait", { n: 4 }), mk("sound", { s: 1 }))] },
  ], r2.cb);
  eng2.start();
  r2.tickTo(eng2, 8);
  const hops = r2.ev.filter(e => e.type === "hop").map(e => e.beat).join();
  const sc = r2.ev.find(e => e.type === "sound" && e.key === "c");
  const sd = r2.ev.find(e => e.type === "sound" && e.key === "d");
  ok(hops === "1,3", `④ ジャンプ2回は1拍目と3拍目に発火（1回=2拍・実測 ${hops}）`);
  ok(sc && sd && sc.beat === 5 && sd.beat === 5, `④ ジャンプ2(4拍)とまつ4が同じ5拍目に揃う（実測 c=${sc && sc.beat} d=${sd && sd.beat}）`);
}

/* ---- ⑤ ぶつかりの再発火条件 ---- */
{
  // A(0,0): みぎへ2 → ひだりへ1 → みぎへ1 → まつ3 ／ B(2,0): 静止・ぶつかったら{おと}
  // 2拍目: A(2,0)=重なり→発火(1回目)。3拍目: 離れる。4拍目: 再接触→再発火(2回目)。以後重なり継続=再発火なし
  const r = record();
  const eng = createEngine([
    { key: "a", x: 0, y: 0, stacks: [hatStack(mk("move", { n: 2 }), mk("moveL", { n: 1 }), mk("move", { n: 1 }), mk("wait", { n: 3 }))] },
    { key: "b", x: 2, y: 0, stacks: [{ blocks: [mk("bump"), mk("sound", { s: 0 })] }] },
  ], r.cb);
  eng.start();
  r.tickTo(eng, 10);
  const sounds = r.ev.filter(e => e.type === "sound" && e.key === "b");
  ok(sounds.length === 2, `⑤ 発火は「接触の瞬間」2回だけ＝重なり継続中は再発火しない（実測 ${sounds.length}回）`);
  ok(sounds[0] && sounds[0].beat === 3 && sounds[1] && sounds[1].beat === 5,
    `⑤ 2拍目接触→3拍目おと / 4拍目再接触→5拍目おと（実測 ${sounds.map(s => s.beat).join()}拍目）`);
  // 双方で発火: 両方に ぶつかったら スタックがあれば両方鳴る
  const r2 = record();
  const eng2 = createEngine([
    { key: "a", x: 1, y: 0, stacks: [hatStack(mk("move", { n: 1 })), { blocks: [mk("bump"), mk("sound", { s: 0 })] }] },
    { key: "b", x: 2, y: 0, stacks: [{ blocks: [mk("bump"), mk("sound", { s: 1 })] }] },
  ], r2.cb);
  eng2.start();
  r2.tickTo(eng2, 4);
  ok(r2.ev.filter(e => e.type === "sound").length === 2, "⑤ 同マス重なりの瞬間に双方で発火");
  eng2.stop();
  // ▶時点で重なっているペアは発火しない（継続中扱い）
  const r3 = record();
  const eng3 = createEngine([
    { key: "a", x: 3, y: 3, stacks: [hatStack(mk("wait", { n: 2 }))] },
    { key: "b", x: 3, y: 3, stacks: [{ blocks: [mk("bump"), mk("sound", { s: 0 })] }] },
  ], r3.cb);
  eng3.start();
  r3.tickTo(eng3, 4);
  ok(!r3.ev.some(e => e.type === "sound"), "⑤ ▶時点で重なっているペアは発火しない");
  eng3.stop();
}

/* ---- 補: きえる/でる・タップ・もとのばしょへ・大きさ ---- */
{
  // きえていても走り続ける＋きえている間はぶつかり対象外
  const r = record();
  const eng = createEngine([
    { key: "a", x: 0, y: 0, stacks: [hatStack(mk("hide"), mk("move", { n: 2 }), mk("show"))] },
    { key: "b", x: 2, y: 0, stacks: [{ blocks: [mk("bump"), mk("sound", { s: 0 })] }] },
  ], r.cb);
  eng.start();
  r.tickTo(eng, 3); // 1:きえる 2:みぎ(1,0) 3:みぎ(2,0)=重なるが aは非表示
  ok(eng.getChar("a").x === 2 && !eng.getChar("a").visible, "補: きえていてもプログラムは走り続ける");
  ok(!r.ev.some(e => e.type === "sound"), "補: きえている間はぶつかり対象外");
  r.tickTo(eng, 4); // 4:でる → この拍の判定で重なり成立
  r.tickTo(eng, 6);
  ok(r.ev.some(e => e.type === "sound"), "補: でる で再び対象になり接触発火");
  eng.stop();
  // タップ: 実行中のみ・きえている間は発火しない・再タップで先頭から
  const r2 = record();
  const eng2 = createEngine([
    { key: "a", x: 0, y: 0, stacks: [hatStack(mk("forever", { children: [mk("wait", { n: 1 })] })), { blocks: [mk("tap"), mk("sound", { s: 1 })] }] },
  ], r2.cb);
  eng2.tap("a"); // 実行前は無効
  eng2.start();
  eng2.tap("a");
  r2.tickTo(eng2, 2);
  ok(r2.ev.filter(e => e.type === "sound").length === 1, "補: タップされたら が実行中のタップで発火");
  eng2.tap("a");
  r2.tickTo(eng2, 4);
  ok(r2.ev.filter(e => e.type === "sound").length === 2, "補: 再タップで先頭から再発火");
  eng2.stop();
  // もとのばしょへ＝位置のみ（大きさ・表示は戻さない）
  const r3 = record();
  const eng3 = createEngine([
    { key: "a", x: 5, y: 5, stacks: [hatStack(mk("move", { n: 2 }), mk("grow"), mk("home"))] },
  ], r3.cb);
  eng3.start();
  r3.tickTo(eng3, 6);
  const a3 = eng3.getChar("a");
  ok(a3.x === 5 && a3.y === 5 && SIZE_STEPS[a3.sizeIdx] === 1.5, "補: もとのばしょへ は位置のみ戻す（大きさ1.5は維持）");
  // 大きさは上下限で止まる（何もせず次へ）
  const eng4 = createEngine([
    { key: "a", x: 0, y: 0, stacks: [hatStack(mk("grow"), mk("grow"), mk("grow"), mk("grow"), mk("shrink"))] },
  ], {});
  eng4.start();
  for (let i = 0; i < 8; i++) eng4.tick();
  ok(SIZE_STEPS[eng4.getChar("a").sizeIdx] === 1.5, "補: おおきく×4は上限2倍で止まり ちいさく で1.5へ");
}

/* ---- b5u ゲームこうぼう段階1: スコアカード（stage1 §4/§10） ---- */
{
  // スコアは器が持つ＝エンジンは onFx{type:"score",delta} を出すだけ・1拍消費
  const r = record();
  const eng = createEngine([
    { key: "a", x: 0, y: 0, stacks: [{ blocks: [mk("tap"), mk("scoreUp", { n: 3 }), mk("scoreDown", { n: 2 }), mk("sound", { s: 0 })] }] },
  ], r.cb);
  ok(eng.start() === true, "b5u start（tapのみでも開始できる=待ち受け）");
  eng.tap("a");
  r.tickTo(eng, 3);
  const sc = r.ev.filter(e => e.type === "score");
  ok(sc.length === 2 && sc[0].delta === 3 && sc[1].delta === -2,
    `b5u tap→スコア＋3/−2 が onFx{type:"score",delta} で通知される（実測 ${JSON.stringify(sc.map(e => e.delta))}）`);
  ok(sc[0].beat === 1 && sc[1].beat === 2 && r.ev.find(e => e.type === "sound").beat === 3,
    "b5u スコアカードは1拍で消費（＋が1拍目・−が2拍目・おとが3拍目）");
  eng.stop();
}

console.log(fail === 0 ? "\n✅ エンジン単体テスト 全PASS" : `\n❌ ${fail}件 FAIL`);
process.exit(fail === 0 ? 0 : 1);
