// ゲームこうぼう: みほんの正本データ（段階1 §9＋段階2 §A-5＝設計§5の全レシピ3本）。
// ★UI非依存の純データ（画像・DOM無し）＝ tools/verify-gamelab.mjs が node で機械検証する。
// キャラは buildCast の最低保証のみ（player/slime/mushroom＝どの子のずかんでも必ず出せる・同種可）。
// ブロックの id は持たない（開いた瞬間コピー＝エディタ側で cloneBlocks が全IDを振る）。
// gameConfig をみほんに同梱する（開いたとき器のせっていごと読み込まれる）。
// ★gameOver.targetId / bumpTarget.target の cid は「chars 配列順で c1, c2, …」（loadScene の採番規則）。
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
  {
    // よけゲーム（設計§5: 敵「ずっと→ランダムにうごく」・ばくだんタッチ=敵・クリア=じかん30秒）。
    // 主人公は「タップされたら→ランダムにうごく」で逃げ回る（タップ移動の代替・stage2 §A-5）
    id: "dodge", name: "よけゲーム", bg: "canyon",
    gameConfig: { scoreShow: false, clear: { type: "time", param: 30 }, gameOver: { targetId: "c2" } },
    chars: [
      { kind: { type: "player" }, x: 2, y: 3,
        stacks: [{ x: 40, y: 40, blocks: [{ type: "tap" }, { type: "moveRand" }] }] },
      { kind: { type: "enemy", id: "slime" }, x: 9, y: 3, // ばくだん（さわったら まけ・💀）
        stacks: [{ x: 40, y: 40, blocks: [
          { type: "hat" }, { type: "forever", children: [{ type: "moveRand" }] },
        ] }] },
    ],
  },
  {
    // キャッチ（設計§5: 主人公タップ移動＋相手指定ぶつかりで+1・スコアクリア）。
    // スライム(c2)だけが点になる=bumpTarget の実演。きのこ(c3)は はねかえる で往復するダミー
    id: "catch", name: "キャッチ", bg: "arena",
    gameConfig: { scoreShow: true, clear: { type: "score", param: 5 }, gameOver: null },
    chars: [
      { kind: { type: "player" }, x: 5, y: 3,
        stacks: [
          { x: 40, y: 40, blocks: [{ type: "tap" }, { type: "moveRand" }] },
          { x: 40, y: 210, blocks: [{ type: "bumpTarget", target: "c2" }, { type: "scoreUp", n: 1 }, { type: "sound", s: 1 }] },
        ] },
      { kind: { type: "enemy", id: "slime" }, x: 2, y: 5, // 獲物（つかまえると+1）
        stacks: [{ x: 40, y: 40, blocks: [
          { type: "hat" }, { type: "forever", children: [{ type: "moveRand" }] },
        ] }] },
      { kind: { type: "enemy", id: "mushroom" }, x: 9, y: 1, // ダミー（はねかえるの実演・点にならない）
        stacks: [{ x: 40, y: 40, blocks: [
          { type: "hat" }, { type: "forever", children: [{ type: "bounce" }] },
        ] }] },
    ],
  },
  // ===== 段階3 区切り③のみほん3本（新カード dpad/fall/chase/goal の型見せ・stage3-step3 §3） =====
  {
    // おちものキャッチ: 主人公=じゅうじキーで動かす・リンゴ=ずっと→ふってくる・ぶつかったら[リンゴ]→スコア＋・クリア=じかん30秒
    id: "dropcatch", name: "おちものキャッチ", bg: "sougen",
    gameConfig: { scoreShow: true, clear: { type: "time", param: 30 }, gameOver: null },
    chars: [
      { kind: { type: "player" }, x: 5, y: 0,
        stacks: [
          { x: 40, y: 40, blocks: [{ type: "hat" }, { type: "dpad" }] },
          { x: 40, y: 200, blocks: [{ type: "bumpTarget", target: "c2" }, { type: "scoreUp", n: 1 }, { type: "sound", s: 1 }] },
        ] },
      { kind: { type: "enemy", id: "slime" }, x: 5, y: 7, // リンゴ役（上から降ってくる）
        stacks: [{ x: 40, y: 40, blocks: [{ type: "hat" }, { type: "forever", children: [{ type: "fall" }] }] }] },
    ],
  },
  {
    // おにごっこ: 主人公=じゅうじキー・鬼=ずっと→おいかける[主人公]＋ばくだん指定・クリア=じかん（逃げ切り）
    id: "oni", name: "おにごっこ", bg: "canyon",
    gameConfig: { scoreShow: false, clear: { type: "time", param: 30 }, gameOver: { targetId: "c2" } },
    chars: [
      { kind: { type: "player" }, x: 2, y: 3,
        stacks: [{ x: 40, y: 40, blocks: [{ type: "hat" }, { type: "dpad" }] }] },
      { kind: { type: "enemy", id: "slime" }, x: 9, y: 4, // 鬼（ばくだん＝さわったら まけ）
        stacks: [{ x: 40, y: 40, blocks: [{ type: "hat" }, { type: "forever", children: [{ type: "chase", target: "c1" }] }] }] },
    ],
  },
  {
    // ゴールまで いこう（正本のめいろを差し替え・stage3-step3 §3-3）: 主人公=じゅうじキー・ゴール[旗]→スコア＋5でクリア・いわ=ばくだんをよける
    // ★クリア score は 5刻み制約のため param=5。ゴール到達で +5＝1回着けばクリア（「1点」の意図を制約内で表現）
    id: "goalrun", name: "ゴールまで いこう", bg: "jungle",
    gameConfig: { scoreShow: true, clear: { type: "score", param: 5 }, gameOver: { targetId: "c3" } },
    chars: [
      { kind: { type: "player" }, x: 1, y: 3,
        stacks: [
          { x: 40, y: 40, blocks: [{ type: "hat" }, { type: "dpad" }] },
          { x: 40, y: 200, blocks: [{ type: "goal", target: "c2" }, { type: "scoreUp", n: 5 }] },
        ] },
      { kind: { type: "enemy", id: "mushroom" }, x: 10, y: 5, stacks: [] }, // ゴール旗（動かない・目印）
      { kind: { type: "enemy", id: "slime" }, x: 6, y: 3, stacks: [] },      // いわ（ばくだん＝よけて進む）
    ],
  },
];
export const sampleById = id => SAMPLES.find(s => s.id === id) || null;
