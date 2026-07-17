// つくるスタジオ: 実行エンジン（段階1・studio-design.md §5/§6 が仕様の正本）。
// ★UI非依存の純ロジック＝画像・DOM・React を一切 import しない（node で単体テスト可能: tools/test-studio-engine.mjs）。
// 時間も持たない: UI が TICK ごとに tick() を呼ぶ「拍ベース」の同期ステッパー（テストは tick() 連打で決定的に検証できる）。
// 状態変化はすべてコールバックで通知（onUpdate/onFx/onGlow/onDone）。
//
// 拍のきまり（§6）:
// - 1拍=1マス移動。ジャンプ・まわるは 1回=2拍。おと/まつ1/もとのばしょへ/みため各種=1拍。
// - ▶で全キャラの「はた」スタックが同時開始（並行実行）。同拍の処理順: はた→タップ→ぶつかり（キャラは配列順）。
// - 端に着いたら残り歩数を捨てて次のカードへ（端の拍は「ぶつかり演出」で1拍消費）。
// - きえていてもプログラムは走り続ける。タップ・ぶつかりの対象からは外れる。
// - ぶつかったら: 同マスに重なった瞬間のみ双方で発火。重なり継続中は再発火せず、離れて再接触で再発火。
//   ▶時点で重なっているペアは「継続中」扱い（開始と同時には発火しない）。
// - タップ/ぶつかりのスタックは発火のたび先頭から再スタート（実行中に再発火したら上書き）。
// - 自然終了: 走っているスレッドが無くなったとき。ただしタップ/ぶつかりのきっかけを持つキャラが
//   1体でもいる間は「上演中（待ち受け）」を続け、■でのみ終わる。自然終了時は位置維持（次の▶で初期化）。
//
// 実装メモ: 各ブロックは最後の拍のあいだ cur={b, left:0} の「余韻」で残り、次の拍の頭で
// 消灯→次ブロックへ進む（同じ拍のうちに次ブロックが実行される＝拍数は仕様どおり、発光は全拍見える）。

export const TICK = 400;            // 1拍(ms)（§11・変更禁止）
export const LCOLS = 12, LROWS = 8; // 論理ステージ（固定・全端末で同じ広さ）
export const SIZE_STEPS = [0.5, 0.75, 1, 1.5, 2]; // おおきさ5段階（§5）
export const SIZE_INIT = 2;         // 初期=1倍（index）

const TRIGGERS = ["hat", "tap", "bump"];      // 同拍競合の処理順もこの順
const CONTAINERS = ["repeat", "forever"];
export const isTriggerType = t => TRIGGERS.includes(t);
const isContainerType = t => CONTAINERS.includes(t);

// うごきカードの方向（row は下=0・うえへ=+1。プロトタイプと同じ）
const DIRS = { move: [1, 0], moveL: [-1, 0], moveU: [0, 1], moveD: [0, -1] };

/* charDefs: [{ key, x, y, stacks: [{ blocks: [...] }, …] }]
   （stacks はエディタのスタック群そのまま。先頭が きっかけ のものだけ実行対象＝浮きスタック合法）
   cb: {
     onUpdate(state, cause)  … cause: "reset"|"move"|"home"|"size"|"show"|"hide"
     onFx(key, fx)           … fx: {type:"hop"|"spin"|"bump"} | {type:"sound", s}
     onGlow(blockId, on)     … 実行中ブロックの発光（入れ子の容器も点灯）
     onDone(natural)         … 上演終了（natural=true: 自然終了＝位置維持 / false: ■＝初期化済み）
   } */
export function createEngine(charDefs, cb = {}) {
  const chars = charDefs.map((c, i) => {
    const triggers = {}; // kind -> {head, body}
    for (const st of c.stacks || []) {
      const head = st.blocks && st.blocks[0];
      if (head && isTriggerType(head.type) && !triggers[head.type]) {
        triggers[head.type] = { head, body: st.blocks.slice(1) };
      }
    }
    return {
      key: c.key, order: i, init: { x: c.x, y: c.y }, triggers,
      x: c.x, y: c.y, sizeIdx: SIZE_INIT, visible: true,
    };
  });
  const byKey = new Map(chars.map(c => [c.key, c]));

  let running = false;
  let threads = [];            // {char, kind, stack, cur, headBlock, headGlow, done}
  let prevOverlap = new Set(); // "aKey|bKey"（order順で連結）
  const glowing = new Set();

  const emitUpdate = (ch, cause) => { if (cb.onUpdate) cb.onUpdate(ch, cause); };
  const emitFx = (key, fx) => { if (cb.onFx) cb.onFx(key, fx); };
  const glowOn = id => { if (!glowing.has(id)) { glowing.add(id); if (cb.onGlow) cb.onGlow(id, true); } };
  const glowOff = id => { if (glowing.delete(id)) { if (cb.onGlow) cb.onGlow(id, false); } };
  const clearAllGlow = () => { for (const id of [...glowing]) glowOff(id); };

  const resetChar = ch => {
    ch.x = ch.init.x; ch.y = ch.init.y; ch.sizeIdx = SIZE_INIT; ch.visible = true;
    emitUpdate(ch, "reset");
  };

  const overlapNow = () => {
    const set = new Set();
    for (let i = 0; i < chars.length; i++) {
      for (let j = i + 1; j < chars.length; j++) {
        const a = chars[i], b = chars[j];
        if (a.visible && b.visible && a.x === b.x && a.y === b.y) set.add(`${a.key}|${b.key}`);
      }
    }
    return set;
  };

  const makeThread = (ch, kind) => {
    const t = ch.triggers[kind];
    const th = {
      char: ch, kind,
      stack: [{ list: t.body, i: 0, type: "root", block: null, loops: 0, beats: 0 }],
      cur: null, headBlock: t.head, headGlow: true, done: false,
    };
    glowOn(t.head.id); // きっかけブロックが光る（最初の拍で消灯＝プロトタイプの hat 0.5拍点灯の対応）
    return th;
  };

  // 既存の同種スレッドを終わらせてから先頭から再スタート（タップ/ぶつかりの再発火）
  const startThread = (ch, kind) => {
    if (!ch.triggers[kind]) return;
    const old = threads.find(t => t.char === ch && t.kind === kind && !t.done);
    if (old) killThread(old);
    threads.push(makeThread(ch, kind));
  };
  const killThread = th => {
    if (th.headGlow) glowOff(th.headBlock.id);
    if (th.cur) glowOff(th.cur.b.id);
    for (const f of th.stack) if (f.block) glowOff(f.block.id);
    th.stack = []; th.cur = null; th.done = true;
  };

  /* ---- 1拍の消費 ---- */
  const markBeat = th => { for (const f of th.stack) if (f.type === "forever") f.beats++; };

  const moveStep = th => {
    const ch = th.char, c = th.cur;
    const [dx, dy] = DIRS[c.b.type];
    const nx = ch.x + dx, ny = ch.y + dy;
    if (nx < 0 || nx >= LCOLS || ny < 0 || ny >= LROWS) {
      emitFx(ch.key, { type: "bump" });
      c.left = 0; // 端: 残り歩数は捨てて次のカードへ（この拍は消費・余韻へ）
      return;
    }
    ch.x = nx; ch.y = ny;
    emitUpdate(ch, "move");
    c.left--;
  };

  const beginBlock = (th, b) => {
    glowOn(b.id);
    const ch = th.char;
    if (DIRS[b.type]) { th.cur = { b, left: b.n }; moveStep(th); return; }
    if (b.type === "jump" || b.type === "spin") {
      th.cur = { b, half: b.n * 2, left: 1 }; // left>0 のあいだ half で管理（half=残り半拍）
      emitFx(ch.key, { type: b.type === "jump" ? "hop" : "spin" });
      th.cur.half--;
      if (th.cur.half <= 0) th.cur.left = 0;
      return;
    }
    if (b.type === "wait") { th.cur = { b, left: b.n }; th.cur.left--; return; }
    if (b.type === "home") { ch.x = ch.init.x; ch.y = ch.init.y; emitUpdate(ch, "home"); th.cur = { b, left: 0 }; return; }
    if (b.type === "sound") { emitFx(ch.key, { type: "sound", s: b.s || 0 }); th.cur = { b, left: 0 }; return; }
    if (b.type === "grow" || b.type === "shrink") {
      const ni = ch.sizeIdx + (b.type === "grow" ? 1 : -1);
      if (ni >= 0 && ni < SIZE_STEPS.length) { ch.sizeIdx = ni; emitUpdate(ch, "size"); } // 上下限では何もせず次へ
      th.cur = { b, left: 0 }; return;
    }
    if (b.type === "hide" || b.type === "show") {
      ch.visible = b.type === "show";
      emitUpdate(ch, ch.visible ? "show" : "hide");
      th.cur = { b, left: 0 }; return;
    }
    th.cur = { b, left: 0 }; // 未知カード: 1拍で素通し（第2期の器）
  };

  const continueCur = th => {
    const c = th.cur, b = c.b;
    if (c.left <= 0) { // 余韻あけ: 消灯して次のブロックへ（この同じ拍で実行）
      glowOff(b.id); th.cur = null;
      advance(th);
      return;
    }
    if (DIRS[b.type]) { moveStep(th); return; }
    if (b.type === "jump" || b.type === "spin") {
      c.half--;
      if (c.half > 0 && c.half % 2 === 1) emitFx(th.char.key, { type: b.type === "jump" ? "hop" : "spin" });
      if (c.half <= 0) c.left = 0;
      return;
    }
    if (b.type === "wait") { c.left--; return; }
    c.left = 0;
  };

  // 次の実行ブロックを探して1拍消費（0拍の容器出入りはここで畳む）
  const advance = th => {
    while (true) {
      const top = th.stack[th.stack.length - 1];
      if (!top) { finishThread(th); return; }
      if (top.i >= top.list.length) {
        if (top.type === "repeat") {
          top.loops--;
          if (top.loops > 0) { top.i = 0; continue; }
          glowOff(top.block.id); th.stack.pop(); continue;
        }
        if (top.type === "forever") {
          if (top.beats === 0) { top.i = 0; markBeat(th); return; } // 空の周回: 1拍待つ（無限ループガード＝プロトタイプ準拠）
          top.i = 0; top.beats = 0; continue;
        }
        th.stack.pop(); continue; // root の終わり
      }
      const b = top.list[top.i++];
      if (isContainerType(b.type)) {
        glowOn(b.id);
        th.stack.push({ list: b.children || [], i: 0, type: b.type, block: b, loops: b.type === "repeat" ? b.n : 0, beats: 0 });
        continue;
      }
      markBeat(th);
      beginBlock(th, b);
      return;
    }
  };

  const finishThread = th => {
    if (th.headGlow) { glowOff(th.headBlock.id); th.headGlow = false; }
    th.done = true;
  };

  const stepThread = th => {
    if (th.done) return;
    if (th.headGlow) { glowOff(th.headBlock.id); th.headGlow = false; }
    if (th.cur) { markBeat(th); continueCur(th); return; }
    advance(th);
  };

  /* ---- 公開API ---- */
  const hasAnyTrigger = () => chars.some(c => TRIGGERS.some(k => c.triggers[k]));
  const hasListeners = () => chars.some(c => c.triggers.tap || c.triggers.bump);

  return {
    // ▶: 全キャラを初期化してから「はた」を同時開始。きっかけが1つも無ければ false（UI側で拒否演出）
    start() {
      if (!hasAnyTrigger()) return false;
      running = true;
      threads = [];
      for (const ch of chars) resetChar(ch);
      prevOverlap = overlapNow(); // 開始時に重なっているペアは「継続中」扱い
      for (const ch of chars) if (ch.triggers.hat) threads.push(makeThread(ch, "hat"));
      return true;
    },

    // 1拍すすめる（UI が TICK ごとに呼ぶ。テストは連打で決定的に検証）
    tick() {
      if (!running) return;
      // 同拍の処理順: はた→タップ→ぶつかり、キャラは配列順（このtick開始時点のスレッドだけ）
      const snapshot = threads.filter(t => !t.done)
        .sort((a, b) => (a.char.order - b.char.order) || (TRIGGERS.indexOf(a.kind) - TRIGGERS.indexOf(b.kind)));
      for (const th of snapshot) stepThread(th);
      threads = threads.filter(t => !t.done);
      // ぶつかり判定（この拍の移動がすべて済んでから・新規に重なったペアだけ双方で発火）
      const now = overlapNow();
      for (const pk of now) {
        if (!prevOverlap.has(pk)) {
          const [ak, bk] = pk.split("|");
          startThread(byKey.get(ak), "bump");
          startThread(byKey.get(bk), "bump");
        }
      }
      prevOverlap = now;
      // 自然終了: スレッドが尽きて、待ち受け（タップ/ぶつかり）も無いとき（位置は維持）
      if (!threads.length && !hasListeners()) {
        running = false;
        clearAllGlow();
        if (cb.onDone) cb.onDone(true);
      }
    },

    // 実行中に当該キャラをタップした瞬間（きえている間は発火しない）
    tap(key) {
      if (!running) return;
      const ch = byKey.get(key);
      if (!ch || !ch.visible || !ch.triggers.tap) return;
      startThread(ch, "tap");
    },

    // ■=カット!: 全停止＋全キャラ初期化（位置/大きさ/表示）
    stop() {
      if (!running) return;
      running = false;
      for (const th of threads) killThread(th);
      threads = [];
      clearAllGlow();
      for (const ch of chars) resetChar(ch);
      if (cb.onDone) cb.onDone(false);
    },

    isRunning: () => running,
    getChar: key => byKey.get(key),
    chars,
    hasAnyTrigger,
  };
}
