/* 難易度カーブ検証（道A）
   「面数を増やしても子どもが挫折しない」ための、なめらかさチェック。
   各難易度トラック（easy / normal / hard は別々の道）ごとに、島1→島6・各島ステージ1→Nの順で
   ステージを並べ、隣り合う面の difficulty がなだらかに上がるかを機械チェックする。

   指標（各面）:
   - par: 最短ブロック数（解の長さ）
   - kinds: 解に使うブロック種（move/left/right/repeat/smartR/smartL）
   - newConcept: この面で「初めて必須になる新概念」（repeat / smart）があるか

   ルール:
   R1 par の単調性: 島内で par は減らない（ゆるい下げ -1 は許容）。
   R2 par の段差上限: 隣り合う面の par 差は STEP_MAX 以下（島内）。
   R3 新概念は1面ずつ: repeat・smart（分岐）が初めて必須になる面は、
      「その新概念＋既習の基本ブロック」だけで解ける（新概念2つ同時必須はNG）。
   R4 島の入口はやさしく: 各島の1面目は、その島で最小級の par（島内で下から2番以内）。
   R5 島またぎの段差: 次の島の1面目 par が、前の島の最終面 par を STEP_MAX+1 より大きく
      超えない（新概念導入時のリセットを見込みつつ、急な跳ね上がりを防ぐ）。 */

import { ISLANDS } from "../src/data/islands.js";

export const STEP_MAX = 2;         // 島内で隣り合う面の par 差の上限
export const CROSS_STEP_MAX = 3;   // 島をまたぐときの par 差の上限
const BASIC = new Set(["move", "left", "right"]);
const NEW_CONCEPTS = ["repeat", "smartR", "smartL"]; // 分岐は smartR/smartL をまとめて1概念扱い

function conceptOf(kind) {
  if (kind === "repeat") return "repeat";
  if (kind === "smartR" || kind === "smartL") return "branch";
  return null;
}
export function newConceptsIn(kinds) {
  const s = new Set();
  for (const k of kinds) { const c = conceptOf(k); if (c) s.add(c); }
  return s;
}

/* stages: 同一難易度の全島ぶん。島順・ステージ順に並べてチェックする */
export function checkCurve(stages, difficulty) {
  const errs = [];
  const byIsland = {};
  for (const s of stages) (byIsland[s.island] ||= []).push(s);
  for (const k of Object.keys(byIsland)) {
    byIsland[k].sort((a, b) => stageNo(a) - stageNo(b));
  }

  const seenConcepts = new Set(); // これまでに「導入済み」の新概念
  let prevIslandLast = null;

  for (const island of [1, 2, 3, 4, 5, 6]) {
    const list = byIsland[island];
    if (!list || !list.length) continue;
    const pars = list.map(s => s.par);
    const minPar = Math.min(...pars);

    // R4: 島の1面目はやさしい
    if (list[0].par > minPar + 1) {
      errs.push(`${difficulty}/島${island}: 1面目の par=${list[0].par} が島内最小 ${minPar} から離れすぎ（入口が難しい）`);
    }
    // R5: 島またぎの段差
    if (prevIslandLast !== null && list[0].par - prevIslandLast > CROSS_STEP_MAX) {
      errs.push(`${difficulty}/島${island}: 前の島の最終 par=${prevIslandLast} → この島1面目 par=${list[0].par}（島またぎの跳ね上がり）`);
    }

    for (let i = 0; i < list.length; i++) {
      const s = list[i];
      const concepts = newConceptsIn(s.kinds || []);
      // R3: この面で「初めて必須になる新概念」は1つまで。
      // （既習の概念との併用はOK。例: 島2で repeat を習得済みなら、島3で branch を出すとき
      //   repeat と併用しても、新しいのは branch の1つだけ＝OK）
      const fresh = [...concepts].filter(c => !seenConcepts.has(c));
      if (fresh.length >= 2) {
        errs.push(`${difficulty}/${s.id}: 新概念を同時に2つ導入（${fresh.join("+")}）。1面につき1概念に`);
      }
      concepts.forEach(c => seenConcepts.add(c));

      if (i > 0) {
        const d = s.par - list[i - 1].par;
        // R1 単調性（大きく下げない）
        if (d < -1) errs.push(`${difficulty}/${s.id}: par が前の面より ${-d} も下がる（難易度が乱高下）`);
        // R2 段差上限
        if (d > STEP_MAX) errs.push(`${difficulty}/${s.id}: par 段差 +${d}（前=${list[i - 1].par}→${s.par}、上限+${STEP_MAX}）`);
      }
    }
    prevIslandLast = list[list.length - 1].par;
  }
  return errs;
}

function stageNo(s) {
  const m = s.id.match(/-(\d+)$/);
  return m ? Number(m[1]) : 0;
}

/* まとめて全難易度を検証。返り値 { errs, summary } */
export function checkAllCurves(allStages) {
  let errs = [];
  const summary = {};
  for (const diff of ["easy", "normal", "hard"]) {
    const track = allStages.filter(s => s.difficulty === diff);
    const e = checkCurve(track, diff);
    errs = errs.concat(e);
    summary[diff] = { stages: track.length, violations: e.length };
  }
  return { errs, summary };
}
