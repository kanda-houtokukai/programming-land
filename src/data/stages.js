// ステージの正本（P2から自動生成データに一本化。v1の15面は引退）
// 再生成: node tools/generate.mjs --write → npm run verify
import { GEN_STAGES } from "./stages.gen.js";

export const STAGES = GEN_STAGES;
export const TOTAL_STARS = STAGES.length * 3;

export function stagesFor(island, difficulty) {
  return STAGES.filter(s => s.island === island && s.difficulty === difficulty);
}
