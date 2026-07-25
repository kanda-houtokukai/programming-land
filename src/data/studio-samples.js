// つくるスタジオ: みほん4本の正本データ（段階2 §5・設計§7）。
// ★内容は brushup/studio-implementation-stage2.md §5 の表のとおり（創作しない）。
// ★UI非依存の純データ（画像・DOM無し）＝ tools/verify-studio.mjs が node で機械検証する。
// キャラは buildCast の最低保証のみ（どの子のずかんでも必ず出せる）:
//   {type:"player"} / {type:"mon",id:"mori",stage:1} / {type:"enemy",id:"slime"} / {type:"enemy",id:"mushroom"}
// ブロックの id は持たない（開いた瞬間コピー＝エディタ側で cloneBlocks が全IDを振る）。
// おとの s: 0=ポン / 1=キラン / 2=ドン。bg はIDで指定（だいち=id "canyon"・§0-1の名前是正後の対応）。

export const SAMPLES = [
  {
    id: "dance", name: "ダンスパーティー", bg: "sougen", // 盗ませる概念: ずっと・並行（2体が違うリズムで踊る）
    chars: [
      {
        kind: { type: "mon", id: "mori", stage: 1 }, x: 4, y: 0,
        stacks: [{
          x: 40, y: 40, blocks: [
            { type: "hat" },
            { type: "forever", children: [{ type: "jump", n: 1 }, { type: "sound", s: 0 }, { type: "spin", n: 1 }] },
          ],
        }],
      },
      {
        kind: { type: "enemy", id: "slime" }, x: 7, y: 0,
        stacks: [{
          x: 40, y: 40, blocks: [
            { type: "hat" },
            { type: "forever", children: [{ type: "spin", n: 1 }, { type: "jump", n: 1 }, { type: "sound", s: 1 }] },
          ],
        }],
      },
    ],
  },
  {
    id: "chase", name: "おいかけっこ", bg: "jungle", // 盗ませる概念: まつ（時間差）・端で止まる
    chars: [
      {
        kind: { type: "mon", id: "mori", stage: 1 }, x: 2, y: 0,
        stacks: [{ x: 40, y: 40, blocks: [{ type: "hat" }, { type: "move", n: 9 }] }],
      },
      {
        kind: { type: "enemy", id: "mushroom" }, x: 0, y: 0,
        stacks: [{ x: 40, y: 40, blocks: [{ type: "hat" }, { type: "wait", n: 3 }, { type: "move", n: 9 }] }],
      },
    ],
  },
  {
    id: "tap", name: "タップでへんしん", bg: "arena", // 盗ませる概念: タップされたら・みため
    chars: [
      {
        kind: { type: "mon", id: "mori", stage: 1 }, x: 3, y: 1,
        stacks: [
          // はた→ジャンプ1: ▶で何も起きないと子どもが戸惑うための最初の合図（指示書§5）
          { x: 40, y: 40, blocks: [{ type: "hat" }, { type: "jump", n: 1 }] },
          { x: 40, y: 250, blocks: [{ type: "tap" }, { type: "grow" }, { type: "sound", s: 1 }, { type: "spin", n: 1 }] },
        ],
      },
      {
        kind: { type: "enemy", id: "slime" }, x: 8, y: 1,
        stacks: [{
          x: 40, y: 40, blocks: [
            { type: "tap" }, { type: "hide" }, { type: "wait", n: 2 }, { type: "show" }, { type: "sound", s: 0 },
          ],
        }],
      },
    ],
  },
  {
    id: "hide", name: "ドッキリかくれんぼ", bg: "canyon", // だいちの ぶたい。盗ませる概念: ぶつかったら
    chars: [
      {
        kind: { type: "player" }, x: 0, y: 0,
        stacks: [{ x: 40, y: 40, blocks: [{ type: "hat" }, { type: "move", n: 6 }] }],
      },
      {
        kind: { type: "enemy", id: "mushroom" }, x: 6, y: 0,
        stacks: [{ x: 40, y: 40, blocks: [{ type: "bump" }, { type: "sound", s: 2 }, { type: "hide" }] }],
      },
    ],
  },
];

export const sampleById = id => SAMPLES.find(s => s.id === id) || null;

/* みほんの説明文（FB便B §2・棚で名前の下に出す表示専用のことば）。
   ★SAMPLES の中に置かない。 tools/test-studio-regression.mjs が SAMPLES を丸ごと凍結して
   完全一致で照合しているため、キーを1つ足すだけで回帰が FAIL する（＝みほんの中身が変わった、と正しく検出される）。
   desc は上演にも保存にも一切影響しない表示専用の情報なので、凍結対象の外に置き、
   モード注入時（studio/mode.jsx）に合流させて gamelab と同じ `s.desc` の形で UI に届ける。
   ⚠️ ここを SAMPLES に取り込みたくなったら、先にベースラインの扱いを決めること。 */
export const SAMPLE_DESCS = {
  dance: "▶を おすと、2ひきが ちがう リズムで おどりだすよ。",
  chase: "さきに いった こを、あとから きのこが おいかけるよ。",
  tap: "キャラを タップすると、大きくなったり きえたり するよ。",
  hide: "あるいて きのこに ぶつかると、ドッキリ！ きのこが きえるよ。",
};
