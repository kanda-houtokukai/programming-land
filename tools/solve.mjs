/* 高速ソルバー（P2）
   ルールは src/engine.js の simulate と完全に同じ（v1準拠）:
   - move: 前が壁なら失敗 / left,right: 回転 / smartR,smartL: 壁なら回転・壁でなければ前進
   - repeat: 基本ブロック列を count(2..9) 回。入れ子なし（UIで作れない）
   - 星を全部取った瞬間に勝ち
   手法:
   - くりかえし無しのパレット → 状態空間BFS（最短ブロック数＝最短手数。厳密・高速・盤面サイズ無制限）
   - くりかえし有り → 反復深化DFS＋状態メモ。repeat本体は先頭反復を実行しながら列挙し、
     打ち切り規則（逆回転・3連回転の禁止 / 1周目でのクラッシュ・勝利は枝刈り）で全探索を保つ */

const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];

export function compile(stage) {
  const cells = stage.grid.map(r => r.split(""));
  const h = cells.length, w = cells[0].length;
  const wall = new Uint8Array(w * h);
  const starBit = new Int8Array(w * h).fill(-1);
  let start = null, nStars = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const c = cells[y][x];
    if (c === "#") wall[y * w + x] = 1;
    if (c === "S") start = { x, y };
    if (c === "*") { starBit[y * w + x] = nStars; nStars++; }
  }
  const starMul = 1 << nStars;
  const fullMask = starMul - 1;
  const enc = (x, y, dir, mask) => ((y * w + x) * 4 + dir) * starMul + mask;
  return { w, h, wall, starBit, nStars, starMul, fullMask,
    startState: enc(start.x, start.y, stage.dir, 0), enc };
}

// action: 0=move 1=left 2=right 3=smartR 4=smartL
export const ACT = { move: 0, left: 1, right: 2, smartR: 3, smartL: 4 };

/* 1ブロック実行。返り値: -1=クラッシュ / それ以外=次state（勝利はmask===fullMaskで判定） */
export function step(env, state, a) {
  const { w, h, wall, starBit, starMul } = env;
  const mask = state % starMul;
  const rest = (state - mask) / starMul;
  const dir = rest % 4;
  const cell = (rest - dir) / 4;
  const x = cell % w, y = (cell - x) / w;
  const ax = x + DX[dir], ay = y + DY[dir];
  const blocked = ax < 0 || ay < 0 || ax >= w || ay >= h || wall[ay * w + ax] === 1;
  if (a === 1) return env.enc(x, y, (dir + 3) % 4, mask);
  if (a === 2) return env.enc(x, y, (dir + 1) % 4, mask);
  if (a === 3 && blocked) return env.enc(x, y, (dir + 1) % 4, mask);
  if (a === 4 && blocked) return env.enc(x, y, (dir + 3) % 4, mask);
  if (blocked) return -1; // move で壁
  let m = mask;
  const b = starBit[ay * w + ax];
  if (b >= 0) m |= (1 << b);
  return env.enc(ax, ay, dir, m);
}

const isWin = (env, s) => s % env.starMul === env.fullMask;

/* 状態空間BFS: 最短の「まっすぐな」プログラム長（repeat無しパレットの厳密最短ブロック数） */
export function bfsMin(env, actions) {
  if (env.nStars === 0) return null;
  const dist = new Map([[env.startState, 0]]);
  let frontier = [env.startState];
  let d = 0;
  while (frontier.length) {
    const next = [];
    d++;
    for (const s of frontier) for (const a of actions) {
      const t = step(env, s, a);
      if (t === -1 || dist.has(t)) continue;
      if (isWin(env, t)) return d;
      dist.set(t, d); next.push(t);
    }
    frontier = next;
    if (d > 4000) return null; // 保険（実際は状態数で必ず止まる）
  }
  return null;
}

/* くりかえし込みの厳密最短ブロック数。cap を超えるなら null */
export function minBlocks(env, prims, useRepeat, cap) {
  if (!useRepeat) {
    const m = bfsMin(env, prims);
    return m !== null && m <= cap ? m : null;
  }
  for (let B = 1; B <= cap; B++) {
    const memo = new Set();
    if (dfs(env, prims, env.startState, B, cap, memo)) return B;
  }
  return null;
}

function dfs(env, prims, state, budget, cap, memo) {
  if (budget <= 0) return false;
  const key = state * (cap + 1) + budget;
  if (memo.has(key)) return false;
  for (const a of prims) {
    const t = step(env, state, a);
    if (t === -1) continue;
    if (isWin(env, t)) return true;
    if (dfs(env, prims, t, budget - 1, cap, memo)) return true;
  }
  if (budget >= 2 && bodyDfs(env, prims, [], state, budget, cap, memo)) return true;
  memo.add(key);
  return false;
}

/* repeat本体を1ブロックずつ伸ばしながら、1周目を実行して探索する。
   - 1周目でクラッシュ → その本体は何回まわしても同じ場所で壊れるので枝刈り
   - 1周目で勝ち → repeatを使わない短い解が先に見つかっているはずなので枝刈り
   - 本体が1個以上あれば count=2..9 を順に再生し、各countの直後から続きを探索 */
function bodyDfs(env, prims, body, cur, budget, cap, memo) {
  const L = body.length;
  if (L >= 1) {
    const cost = 1 + L;
    if (cost <= budget) {
      let st = cur;
      counts:
      for (let c = 2; c <= 9; c++) {
        for (const a of body) {
          const t = step(env, st, a);
          if (t === -1) break counts;       // c回目で壊れた → それ以上のcountも同じ
          if (isWin(env, t)) return true;   // 周回の途中で勝ち
          st = t;
        }
        if (dfs(env, prims, st, budget - cost, cap, memo)) return true;
      }
    }
  }
  if (L < budget - 1) {
    const last = body[L - 1], last2 = body[L - 2];
    for (const a of prims) {
      // 回転の無駄手を禁止: 左右の打ち消し・同回転3連
      if ((a === 1 && last === 2) || (a === 2 && last === 1)) continue;
      if ((a === 1 || a === 2) && a === last && a === last2) continue;
      const t = step(env, cur, a);
      if (t === -1) continue;               // 1周目で壁
      if (isWin(env, t)) continue;          // 1周目で勝ち → まっすぐな解のほうが安い
      body.push(a);
      if (bodyDfs(env, prims, body, t, budget, cap, memo)) { body.pop(); return true; }
      body.pop();
    }
  }
  return false;
}

/* パレット定義から solve する入口 */
export function solveStage(stage, palette, cap = 16) {
  const env = compile(stage);
  const prims = palette.filter(p => p !== "repeat").map(p => ACT[p]);
  return minBlocks(env, prims, palette.includes("repeat"), cap);
}
