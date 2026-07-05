// クイズバトルの設定（P6）。★数値はここに集約★ ＝ HP・ハート・かいしん率・XP など。
// 相棒の成長曲線(growth.js)と同じ方針: 調整はこのファイルだけ触ればよい。
// フェーズ1で使うのは敵/HP/ハート/かいしん/XP。コイン・価格はフェーズ2でここに追記する。

// プレイヤー（相棒）のハート数
export const PLAYER_HEARTS = 3;

// 難易度ごとの 敵HP（＝そのHP問正解で1体たおせる）
export const HP_BY_DIFF = { easy: 3, normal: 4, hard: 5 };

// こうげきの ダメージ
export const NORMAL_DAMAGE = 1;
export const CRIT_DAMAGE = 2;

// 「かいしんのいちげき」(2ダメージ)の確率。相棒Lvで上がる: Lv1=5% → Lv12=25% の線形、以降25%上限。
export function critChance(level) {
  const lv = Math.max(1, level || 1);
  const p = 0.05 + (0.25 - 0.05) * (lv - 1) / (12 - 1);
  return Math.min(0.25, Math.max(0.05, p));
}

// 勝利でもらえるXP（既存 applyXp に渡す。難易度別）
export const BATTLE_XP = { easy: 12, normal: 16, hard: 22 };

// 勝利でもらえるコイン（フェーズ2で使用・ここに集約しておく）
export const BATTLE_COINS = { easy: 5, normal: 8, hard: 12 };

// バトルアイテム（消耗品・各所持上限3・価格は設計書 §5A）。
// 演出はフェーズ1.5で実装済み。購入はフェーズ2のショップから（それまで所持0＝バトルに出ない）。
export const ITEMS = [
  { id: "drink", emoji: "🧃", name: "かいふくドリンク", desc: "ハートを 1つ かいふく", price: 10, max: 3 },
  { id: "glasses", emoji: "👓", name: "ヒントメガネ", desc: "こたえじゃない ものを 1つ けす", price: 15, max: 3 },
  { id: "power", emoji: "💪", name: "パワーバンド", desc: "つぎの せいかいの ダメージ 2ばい", price: 15, max: 3 },
  { id: "shield", emoji: "🛡️", name: "まもりのたて", desc: "つぎの ミスの ダメージを ふせぐ", price: 15, max: 3 },
];
export function itemById(id) { return ITEMS.find(i => i.id === id); }

// 敵モンスター9体（各難易度3体・順に解放）。絵は生成画像（透過PNG・画像対応.md準拠）。
// emoji は画像が出ないときのフォールバック。id はファイル名と対応（king=ラスボス）。
import imgSlime from "../assets/enemy_slime.png";
import imgMushroom from "../assets/enemy_mushroom.png";
import imgBird from "../assets/enemy_bird.png";
import imgGhost from "../assets/enemy_ghost.png";
import imgCrab from "../assets/enemy_crab.png";
import imgSpike from "../assets/enemy_spike.png";
import imgDragon from "../assets/enemy_dragon.png";
import imgGolem from "../assets/enemy_golem.png";
import imgKing from "../assets/enemy_king.png";
import bgEasy from "../assets/bg_battle_easy.webp";
import bgNormal from "../assets/bg_battle_normal.webp";
import bgHard from "../assets/bg_battle_hard.webp";

// バトル背景（難易度で出し分け: 草原 / 夕日闘技場 / 夜の王座）
export const BATTLE_BG = { easy: bgEasy, normal: bgNormal, hard: bgHard };

export const ENEMIES = [
  // やさしい（小さくて可愛い系）
  { id: "slime", name: "ぷにスライム", emoji: "🟢", img: imgSlime, difficulty: "easy", color: "#8FE38F" },
  { id: "mushroom", name: "きのこちゃん", emoji: "🍄", img: imgMushroom, difficulty: "easy", color: "#F3A6A6" },
  { id: "bird", name: "ことりん", emoji: "🐤", img: imgBird, difficulty: "easy", color: "#FFE08A" },
  // ふつう（中ボス感）
  { id: "ghost", name: "いたずらオバケ", emoji: "👻", img: imgGhost, difficulty: "normal", color: "#C9C6E8" },
  { id: "crab", name: "カニロボ", emoji: "🦀", img: imgCrab, difficulty: "normal", color: "#F6A98A" },
  { id: "spike", name: "とげとげ", emoji: "🦔", img: imgSpike, difficulty: "normal", color: "#D8B98A" },
  // むずかしい（強そう）
  { id: "dragon", name: "ドラゴンの こ", emoji: "🐲", img: imgDragon, difficulty: "hard", color: "#8FD8B0" },
  { id: "golem", name: "ゴーレム", emoji: "🗿", img: imgGolem, difficulty: "hard", color: "#BDB6AD" },
  { id: "king", name: "やみのキング", emoji: "👹", img: imgKing, difficulty: "hard", color: "#E29A9A" },
];

// その難易度の敵（登場順）
export function enemiesFor(difficulty) {
  return ENEMIES.filter(e => e.difficulty === difficulty);
}
export function enemyById(id) { return ENEMIES.find(e => e.id === id); }

// 敵iが解放済みか（1体目は常に開放／前の敵をたおすと次が開く）
export function enemyUnlocked(difficulty, index, defeated) {
  if (index === 0) return true;
  const list = enemiesFor(difficulty);
  const prev = list[index - 1];
  return !!prev && defeated.includes(prev.id);
}
