/* パズルの盤面・実行ルール（UIとソルバーの共通仕様）
   dir: 0=→ 1=↓ 2=← 3=↑
   ブロックの意味は v1 と完全に同じ:
   - move: 前が壁なら失敗、そうでなければ1歩進む（星マスに乗ったら回収）
   - left/right: その場で回転
   - smartR/smartL: 前が壁なら回転、壁でなければ1歩進む
   - repeat: 子ブロック（基本ブロックのみ・入れ子なし）を count 回くりかえす
   星を全部集めた瞬間に勝ち。プログラムが終わって星が残っていれば未達成 */

export const DX = [1, 0, -1, 0];
export const DY = [0, 1, 0, -1];
export const MAX_BLOCKS = 16;

export function parseStage(st) {
  const cells = st.grid.map(r => r.split(""));
  let start = { x: 0, y: 0, dir: st.dir };
  const stars = [];
  cells.forEach((row, y) => row.forEach((c, x) => {
    if (c === "S") { start = { x, y, dir: st.dir }; }
    if (c === "*") stars.push(`${x},${y}`);
  }));
  return { cells, start, stars, w: cells[0].length, h: cells.length };
}

export function countBlocks(prog) {
  return prog.reduce((a, b) => a + (b.type === "repeat" ? 1 + countBlocks(b.children) : 1), 0);
}

// アニメーションなしの一括実行（ソルバー用）。返り値: "win" | "crash" | "incomplete"
export function simulate(stage, prog) {
  const info = parseStage(stage);
  const isWall = (x, y) => x < 0 || y < 0 || x >= info.w || y >= info.h || info.cells[y][x] === "#";
  let st = { ...info.start };
  const col = new Set();
  const doPrim = (b) => {
    const ax = st.x + DX[st.dir], ay = st.y + DY[st.dir];
    const wallAhead = isWall(ax, ay);
    if (b.type === "left") st.dir = (st.dir + 3) % 4;
    else if (b.type === "right") st.dir = (st.dir + 1) % 4;
    else if (b.type === "smartR" && wallAhead) st.dir = (st.dir + 1) % 4;
    else if (b.type === "smartL" && wallAhead) st.dir = (st.dir + 3) % 4;
    else if (wallAhead) return "crash";
    else {
      st.x = ax; st.y = ay;
      const key = `${st.x},${st.y}`;
      if (info.cells[st.y][st.x] === "*" && !col.has(key)) {
        col.add(key);
        if (col.size === info.stars.length) return "win";
      }
    }
    return "ok";
  };
  for (const b of prog) {
    if (b.type === "repeat") {
      for (let i = 0; i < b.count; i++) for (const c of b.children) {
        const r = doPrim(c); if (r !== "ok") return r;
      }
    } else {
      const r = doPrim(b); if (r !== "ok") return r;
    }
  }
  return "incomplete";
}
