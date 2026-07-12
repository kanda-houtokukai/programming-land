// 相棒モンスター定義（b4f全面刷新: 5タイプ×3進化＝15体・スプライトpng・ロアつき）
// 進化: あかちゃん(Lv1〜) → こども(Lv5〜) → せいちょう(Lv12〜)
// 絵は512px透過スプライト（mon_<type>_<stage>.png）。絵文字アイコンは不採用（typeEmoji廃止）。
// ⚠️ このファイルは画像を import するため node から直 import できない（storage.js に依存させない＝roundtrip保護）
import monMori1 from "../assets/mon_mori_1.png";
import monMori2 from "../assets/mon_mori_2.png";
import monMori3 from "../assets/mon_mori_3.png";
import monMizu1 from "../assets/mon_mizu_1.png";
import monMizu2 from "../assets/mon_mizu_2.png";
import monMizu3 from "../assets/mon_mizu_3.png";
import monHono1 from "../assets/mon_hono_1.png";
import monHono2 from "../assets/mon_hono_2.png";
import monHono3 from "../assets/mon_hono_3.png";
import monDenki1 from "../assets/mon_denki_1.png";
import monDenki2 from "../assets/mon_denki_2.png";
import monDenki3 from "../assets/mon_denki_3.png";
import monIwa1 from "../assets/mon_iwa_1.png";
import monIwa2 from "../assets/mon_iwa_2.png";
import monIwa3 from "../assets/mon_iwa_3.png";

export const EVOLVE_LEVELS = { 2: 5, 3: 12 }; // stage: 必要レベル

export const SPECIES = [
  {
    id: "mori", typeName: "もりタイプ", color: "#6BCB77", headBg: "#EAF8E7",
    lore: "もりの おくの いずみの そばで うまれる。しずかで やさしくて、かれた はなを げんきに する ちからを もつ。",
    stages: [
      { name: "モコ", img: monMori1 },
      { name: "モスガ", img: monMori2 },
      { name: "モリガルド", img: monMori3 },
    ],
  },
  {
    id: "mizu", typeName: "みずタイプ", color: "#5BB8F0", headBg: "#E5F4FE",
    lore: "すんだ いりえの そこで ねむる。おだやかだけど、なかまを まもる ときは おおなみを おこす。",
    stages: [
      { name: "ポチャ", img: monMizu1 },
      { name: "ミズチ", img: monMizu2 },
      { name: "ウズリュウ", img: monMizu3 },
    ],
  },
  {
    id: "hono", typeName: "ほのおタイプ", color: "#FF7A45", headBg: "#FFEDE3",
    lore: "かざんの ふもとの あたたかい いわばで うまれる。あかるくて ゆうかん、くらい みちを てらす。",
    stages: [
      { name: "ポポ", img: monHono1 },
      { name: "ヒノコ", img: monHono2 },
      { name: "エンブレオ", img: monHono3 },
    ],
  },
  {
    id: "denki", typeName: "でんきタイプ", color: "#FFD447", headBg: "#FFF8DC",
    lore: "たかい やまの くもの なかで うまれる。げんきで すばしっこくて、ひらめきを はこぶ。",
    stages: [
      { name: "ピカ", img: monDenki1 },
      { name: "イナズ", img: monDenki2 },
      { name: "ライオウ", img: monDenki3 },
    ],
  },
  {
    id: "iwa", typeName: "いわタイプ", color: "#A98A6B", headBg: "#EFEAE2",
    lore: "ふかい どうくつの ほうせきの へやで うまれる。しずかで やさしくて、こわれた みちを なおす。",
    stages: [
      { name: "ゴロ", img: monIwa1 },
      { name: "イワゴロ", img: monIwa2 },
      { name: "ガイオン", img: monIwa3 },
    ],
  },
];

export function speciesById(id) { return SPECIES.find(s => s.id === id); }

export function stageForLevel(level) {
  if (level >= EVOLVE_LEVELS[3]) return 3;
  if (level >= EVOLVE_LEVELS[2]) return 2;
  return 1;
}

// 進化段階ごとの表示スケール（共有・2026-07-12）。進化で「大きくなった」を見せる。
// 初期値＝実機調整。おうちの部屋（HomeRoom）とバトル（Battle.jsx PARTNER_BASE_W×これ）の両方で使用中（b4c）。
export const partnerStageScale = { 1: 1.0, 2: 1.2, 3: 1.45 };

export function monsterName(speciesId, stage) {
  const sp = speciesById(speciesId);
  return sp ? sp.stages[stage - 1].name : "";
}

export function monsterImg(speciesId, stage) {
  const sp = speciesById(speciesId);
  return sp ? sp.stages[stage - 1].img : null;
}

// ずかんの全エントリ（5タイプ×3すがた＝15）
export const DEX_ENTRIES = SPECIES.flatMap(sp =>
  [1, 2, 3].map(stage => ({ key: `${sp.id}-${stage}`, species: sp.id, stage }))
);

/* ===== たまご収集（b4f・図鑑コンプの道すじ） =====
   レベル節目でたまごが届き、未所持タイプから1つ選んで孵す（計4個で5タイプコンプ）。
   ★節目Lvは初期値＝実機でテンポ調整。保存スキーマは増やさず、
   「届いた数 − 孵した数（owned-1）」の導出式で未開封たまご数を求める（過去の節目も取りこぼさない） */
export const EGG_LEVELS = [5, 12, 18, 24];

export function pendingEggs(partner) {
  if (!partner || !partner.owned) return 0;
  const reached = EGG_LEVELS.filter(l => partner.level >= l).length;
  const hatched = Math.max(0, partner.owned.length - 1); // スターターの1体はたまご由来でない
  const unownedLeft = SPECIES.length - partner.owned.length;
  return Math.max(0, Math.min(reached - hatched, unownedLeft));
}
