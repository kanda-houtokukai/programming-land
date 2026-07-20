// ゲームこうぼう: みほんの正本データ（段階1・gamelab-implementation-stage1.md §9）。
// 段階1は「あつめゲーム」1本のみ（よけ・キャッチは段階2）。
// ★UI非依存の純データ（画像・DOM無し）＝ tools/verify-gamelab.mjs が node で機械検証する。
// キャラは buildCast の最低保証のみ（slime/mushroom＝どの子のずかんでも必ず出せる・同種可）。
// ブロックの id は持たない（開いた瞬間コピー＝エディタ側で cloneBlocks が全IDを振る）。
// gameConfig をみほんに同梱する（開いたとき器のせっていごと読み込まれる）。
export const SAMPLES = [
  {
    id: "collect", name: "あつめゲーム", bg: "sougen",
    gameConfig: { scoreShow: true, clear: { type: "score", param: 10 }, gameOver: null },
    chars: [
      { kind: { type: "enemy", id: "slime" }, x: 2, y: 3,
        stacks: [{ x: 40, y: 40, blocks: [
          { type: "tap" }, { type: "scoreUp", n: 1 }, { type: "hide" }, { type: "wait", n: 2 }, { type: "show" },
        ] }] },
      { kind: { type: "enemy", id: "mushroom" }, x: 6, y: 3,
        stacks: [{ x: 40, y: 40, blocks: [
          { type: "tap" }, { type: "scoreUp", n: 1 }, { type: "hide" }, { type: "wait", n: 2 }, { type: "show" },
        ] }] },
      { kind: { type: "enemy", id: "slime" }, x: 9, y: 2,
        stacks: [{ x: 40, y: 40, blocks: [
          { type: "tap" }, { type: "scoreUp", n: 1 }, { type: "hide" }, { type: "wait", n: 2 }, { type: "show" },
        ] }] },
    ],
  },
];
export const sampleById = id => SAMPLES.find(s => s.id === id) || null;
