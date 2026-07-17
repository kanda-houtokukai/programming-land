// つくるスタジオ: 背景（ぶたい）5種の正本（段階2 §0-1 で名前衝突を是正）。
// ★同じ絵は全画面で同じ名前（ショップの既存命名が正）:
//   bg_battle_easy=そうげん ／ bg_battle_canyon=だいち（ショップ「だいちの ぶたい」と一致）。
// IDの一覧は studio-blocks-defs.js の STUDIO_BG_IDS（node安全・verify-studio が参照）と一致させる。
// 追加はこの表＋STUDIO_BG_IDSに1行ずつ。
import { STUDIO_BG_IDS } from "./studio-blocks-defs.js";
import bgSougen from "../assets/bg_battle_easy.webp";
import bgJungle from "../assets/bg_battle_jungle.webp";
import bgDaichi from "../assets/bg_battle_canyon.webp";
import bgArena from "../assets/battle-arena.webp";
import bgStudio from "../assets/studio-assets/studio-interior.webp";

const BG_TABLE = {
  sougen: { name: "そうげん", img: bgSougen },
  jungle: { name: "ジャングル", img: bgJungle },
  canyon: { name: "だいち", img: bgDaichi }, // id は canyon のまま・名前のみ是正（§0-1）
  arena: { name: "アリーナ", img: bgArena },
  studio: { name: "スタジオ", img: bgStudio },
};

export const BGS = STUDIO_BG_IDS.map(id => ({ id, ...BG_TABLE[id] }));
export const bgById = id => BGS.find(b => b.id === id) || BGS[0]; // 未知idはフォールバック（draft互換）
