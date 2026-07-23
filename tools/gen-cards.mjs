/* カード一覧の生成（stage3-step3-cards-samples.md §0）。
   DEFS / PALORDER / GAMELAB_PALORDER から brushup/cards-reference.md を生成する（手書きせず実装から作る）。
   - 生成:   node tools/gen-cards.mjs         （brushup/cards-reference.md を書き出す・npm run cards）
   - 照合:   node tools/gen-cards.mjs --check （ファイルが最新か検証・食い違えば FAIL。npm run verify のチェーンに入る）
   ★出力は完全に決定的（日付など可変要素を入れない）＝ --check が安定する。docs/ には出さない（公開ビルド非影響）。 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { DEFS, PALORDER, GAMELAB_PALORDER } from "../src/data/studio-blocks-defs.js";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "brushup", "cards-reference.md");

const CAT_ORDER = ["きっかけ", "そうさ", "かず", "せいぎょ", "うごき", "みため", "おと"]; // 棚の頻度順（GAMELAB_PALORDER 準拠）
const PILL = { target: "あいて", n: "かず", s: "おと" };
const studioSet = new Set(PALORDER);
const gamelabSet = new Set(GAMELAB_PALORDER);
const where = t => (studioSet.has(t) && gamelabSet.has(t)) ? "両方"
  : studioSet.has(t) ? "つくるスタジオ" : gamelabSet.has(t) ? "ゲームこうぼう" : "（棚に出ない）";

// 並び順: GAMELAB_PALORDER を基準に、studio だけに出る型（bump 等）を末尾で補う
const ordered = [...GAMELAB_PALORDER];
for (const t of PALORDER) if (!gamelabSet.has(t)) ordered.push(t);

function build() {
  const lines = [];
  lines.push("# カード一覧（じどうせいせい）", "");
  lines.push("> `tools/gen-cards.mjs` が `DEFS` から生成（`npm run cards`）。手で編集しない。`npm run verify` が実物との一致を照合する。", "");
  lines.push(`- つくるスタジオ: **${PALORDER.length}種** ／ ゲームこうぼう: **${GAMELAB_PALORDER.length}種**`, "");

  // カテゴリごとに（棚の並び順）
  const seen = new Set();
  for (const cat of CAT_ORDER) {
    const inCat = ordered.filter(t => !seen.has(t) && DEFS[t] && DEFS[t].cat === cat);
    if (!inCat.length) continue;
    lines.push(`## ${cat}`, "");
    lines.push("| 棚の名前 | 正式名 | でる画面 | してい | せつめい |", "|---|---|---|---|---|");
    for (const t of inCat) {
      seen.add(t);
      const d = DEFS[t];
      const pill = PILL[d.pill] || "なし";
      lines.push(`| ${d.label} | ${d.long} | ${where(t)} | ${pill} | ${d.desc} |`);
    }
    lines.push("");
  }
  // CAT_ORDER に無いカテゴリが将来増えたときの保険
  const rest = ordered.filter(t => !seen.has(t) && DEFS[t]);
  if (rest.length) {
    lines.push("## （その他）", "");
    lines.push("| 棚の名前 | 正式名 | でる画面 | してい | せつめい |", "|---|---|---|---|---|");
    for (const t of rest) { const d = DEFS[t]; lines.push(`| ${d.label} | ${d.long} | ${where(t)} | ${PILL[d.pill] || "なし"} | ${d.desc} |`); }
    lines.push("");
  }
  return lines.join("\n");
}

const content = build();
if (process.argv.includes("--check")) {
  let disk = null;
  try { disk = readFileSync(OUT, "utf8"); } catch (_) { /* 無ければ後で不一致 */ }
  if (disk === content) { console.log(`カード一覧 照合PASS（${GAMELAB_PALORDER.length}種 gamelab／${PALORDER.length}種 studio）`); process.exit(0); }
  console.log("✗ FAIL カード一覧 brushup/cards-reference.md が DEFS と食い違う。`npm run cards` で再生成すること");
  process.exit(1);
} else {
  writeFileSync(OUT, content);
  console.log(`brushup/cards-reference.md を生成（gamelab ${GAMELAB_PALORDER.length}種／studio ${PALORDER.length}種）`);
}
