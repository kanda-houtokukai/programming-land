// 「そだった ちから」＝そだちのもり（2026-07-16 刷新）。★段階しきい値・木画像・5つのちからはここに集約★
// 到達度は既存の計算（保護者画面 skillProgress と同じ式）を使う。新規データ収集なし。
// 刷新: 5段階の鉢植え→ちから別の木4段階（たね/め/わかぎ/おおきな き）。称号title・%表示・絵文字は廃止。
import { STAGES } from "./stages.js";
import { QUIZ_CATEGORIES, QUIZ_DIFFS, SESSION_SIZE } from "./quizzes.js";
import treeJunban1 from "../assets/tree_junban_1.png";
import treeJunban2 from "../assets/tree_junban_2.png";
import treeJunban3 from "../assets/tree_junban_3.png";
import treeJunban4 from "../assets/tree_junban_4.png";
import treeKurikaeshi1 from "../assets/tree_kurikaeshi_1.png";
import treeKurikaeshi2 from "../assets/tree_kurikaeshi_2.png";
import treeKurikaeshi3 from "../assets/tree_kurikaeshi_3.png";
import treeKurikaeshi4 from "../assets/tree_kurikaeshi_4.png";
import treeKangaeru1 from "../assets/tree_kangaeru_1.png";
import treeKangaeru2 from "../assets/tree_kangaeru_2.png";
import treeKangaeru3 from "../assets/tree_kangaeru_3.png";
import treeKangaeru4 from "../assets/tree_kangaeru_4.png";
import treeKeyboard1 from "../assets/tree_keyboard_1.png";
import treeKeyboard2 from "../assets/tree_keyboard_2.png";
import treeKeyboard3 from "../assets/tree_keyboard_3.png";
import treeKeyboard4 from "../assets/tree_keyboard_4.png";
import treeTsukuru1 from "../assets/tree_tsukuru_1.png";
import treeTsukuru2 from "../assets/tree_tsukuru_2.png";
import treeTsukuru3 from "../assets/tree_tsukuru_3.png";
import treeTsukuru4 from "../assets/tree_tsukuru_4.png";

// 成長4段階。min=その段階になる到達度%の下限（0/10/40/80は初期値＝実機で調整可）。
// 称号titleは廃止（段階名で十分）・画像はちから別になったため GROW_STAGES からは外した（TREE_IMG へ）。
export const GROW_STAGES = [
  { key: "seed", stage: "たね", min: 0 },
  { key: "sprout", stage: "め", min: 10 },
  { key: "sapling", stage: "わかぎ", min: 40 },
  { key: "tree", stage: "おおきな き", min: 80 },
];
// 到達度%から段階を返す（0はじまり index も返す＝差分演出で「段階が上がった」を判定）
export function growStage(pct) {
  let idx = 0;
  for (let i = 0; i < GROW_STAGES.length; i++) if (pct >= GROW_STAGES[i].min) idx = i;
  return { ...GROW_STAGES[idx], idx };
}

// ちから別の木画像（末尾の数字＝段階: 1=たね/2=め/3=わかぎ/4=おおきな き）
const TREE_IMG = {
  junji: [treeJunban1, treeJunban2, treeJunban3, treeJunban4],
  repeat: [treeKurikaeshi1, treeKurikaeshi2, treeKurikaeshi3, treeKurikaeshi4],
  think: [treeKangaeru1, treeKangaeru2, treeKangaeru3, treeKangaeru4],
  keyboard: [treeKeyboard1, treeKeyboard2, treeKeyboard3, treeKeyboard4],
  create: [treeTsukuru1, treeTsukuru2, treeTsukuru3, treeTsukuru4],
};
export const treeImg = (powerId, stageIdx) => TREE_IMG[powerId][stageIdx];

// 5つのちから（子ども向け）。grows=そだつ場所の説明（メモ02の場所名で統一・代表1〜2か所）／
// go=詳細の「いってみる」で飛ぶ先のモードkey（メモ02の遷移に沿う）／goLabel=ボタンに出す場所名
// ※emojiフィールドは廃止（絵文字不採用・木の絵がアイコンの役目）
export const POWERS = [
  { id: "junji", name: "じゅんばんの ちから", go: "puzzle", goLabel: "パズルのしま",
    grows: "「パズルのしま」や「クイズのひろば」の じゅんばん で そだつよ" },
  { id: "repeat", name: "くりかえしの ちから", go: "puzzle", goLabel: "パズルのしま",
    grows: "「パズルのしま」の くりかえし や「クイズのひろば」の きまりみつけ で そだつよ" },
  { id: "think", name: "かんがえる ちから", go: "quiz", goLabel: "クイズのひろば",
    grows: "「パズルのしま」の もしも や「クイズのひろば」の なかまわけ で そだつよ" },
  { id: "keyboard", name: "キーボードの ちから", go: "typing", goLabel: "タイピングタワー",
    grows: "「タイピングタワー」で そだつよ" },
  { id: "create", name: "つくる ちから", go: "art", goLabel: "おえかきのへや",
    grows: "「おえかきのへや」で さくひんを つくると そだつよ" },
];

// 「できるように なったこと」（段階ごとに増える・%の代わりに具体的な成長を見せる）
export const POWER_DID = {
  junji: [
    [],
    ["ロボットを まえに すすめられる"],
    ["ロボットを まえに すすめられる", "めいれいを じゅんばんに ならべられる"],
    ["ロボットを まえに すすめられる", "めいれいを じゅんばんに ならべられる", "ながい じゅんばんも くみたてられる"],
  ],
  repeat: [
    [],
    ["おなじ めいれいを まとめられる"],
    ["おなじ めいれいを まとめられる", "くりかえす かずを きめられる"],
    ["おなじ めいれいを まとめられる", "くりかえす かずを きめられる", "きまりを みつけて みじかく できる"],
  ],
  think: [
    [],
    ["「もしも」で みちを えらべる"],
    ["「もしも」で みちを えらべる", "かべを みつけて まがれる"],
    ["「もしも」で みちを えらべる", "かべを みつけて まがれる", "いくつも くみあわせて かんがえられる"],
  ],
  keyboard: [
    [],
    ["キーの ばしょが わかる"],
    ["キーの ばしょが わかる", "みないで うてる キーが ある"],
    ["キーの ばしょが わかる", "みないで うてる キーが ある", "はやく せいかくに うてる"],
  ],
  create: [
    [],
    ["カメで せんが かける"],
    ["カメで せんが かける", "かたちを かんがえて つくれる"],
    ["カメで せんが かける", "かたちを かんがえて つくれる", "じぶんだけの さくひんが つくれる"],
  ],
};
// 段階ごとの一言（%の代わり）
export const STAGE_LINE = [
  { now: "たねを うえたよ", next: "あそぶと めが でるよ" },
  { now: "めが でたよ", next: "もう すこしで わかぎ" },
  { now: "わかぎに なったよ", next: "もう すこしで はなが さくよ" },
  { now: "おおきな きに なったよ！", next: "りっぱに そだったね" },
];

/* 到達度% を計算（保護者画面 skillProgress と同じ式・5つに集約）
   じゅんばん=島1／くりかえし=島2／かんがえる=島3(分岐)とクイズの平均／
   キーボード=タイピング速さ／つくる=おえかき作品数 */
function islandPct(save, island) {
  const st = STAGES.filter(s => s.island === island);
  const got = st.reduce((a, s) => a + (save.puzzle.stars[s.id] || 0), 0);
  return st.length ? Math.round(100 * got / (st.length * 3)) : 0;
}
function quizPct(save) {
  const total = QUIZ_CATEGORIES.length * QUIZ_DIFFS.length * SESSION_SIZE;
  const got = Object.entries(save.quiz.best || {})
    .filter(([k]) => k.includes(":")).reduce((a, [, v]) => a + (v || 0), 0);
  return Math.round(100 * got / total);
}
export function computePowers(save) {
  const think = Math.round((islandPct(save, 3) + quizPct(save)) / 2); // 分岐とクイズの平均
  const keyboard = Math.min(100, Math.round(100 * Math.max(0, ...Object.values(save.typing.best || {}).map(b => b.kpm || 0)) / 60));
  const create = Math.min(100, (save.art.gallery || []).length * 20);
  const pctById = {
    junji: islandPct(save, 1),
    repeat: islandPct(save, 2),
    think, keyboard, create,
  };
  return POWERS.map(p => ({ ...p, pct: pctById[p.id], grow: growStage(pctById[p.id]) }));
}
