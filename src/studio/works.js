// つくるスタジオ: 作品保存モデルの「スタジオ薄皮」（段階A §3-2）。
// 保存ロジックの共通核は src/workshop/store.js（node安全・モード非依存）へ分離し、
// このファイルは ①スタジオ空間（prof.studio）への束縛 ②教育接続の付与（段階3 §1-3）だけを持つ。
// ★export の形（関数名・引数・戻り値）は分離前と完全に同一＝利用側（エディタ/Home）は無変更で動く。
// ※付与が growth.js（画像import連鎖あり）に依存するため、このファイルは従来どおりブラウザ専用。
//   共通核 store.js は node から試験できる（tools/test-studio-regression.mjs の保存モデル試験）。
import {
  ensureSpace, sceneNonEmpty, nextWorkName as nextName, newWorkId,
  saveWork as saveWorkCore, stashDraft as stashDraftCore, deleteWork as deleteWorkCore,
} from "../workshop/store.js";
import { workHasNestedContainer } from "../data/studio-blocks-defs.js";
import { saveProfile, today } from "../storage.js";
import { applyXp, addCoins, XP, COIN } from "../growth.js";

export const WORKS_MAX = 30; // 上限30作品（設計§7・調整値）
export const NAME_MAX = 8;   // 作品名ひらがな8文字（設計§7）

// スタジオのモード空間（prof.studio・「さくひん{連番}」）
export const STUDIO_SPACE = { key: "studio", worksMax: WORKS_MAX, nameMax: NAME_MAX, namePrefix: "さくひん" };

export { sceneNonEmpty, newWorkId };
export function ensureStudio(profile) { return ensureSpace(profile, STUDIO_SPACE); }
export function nextWorkName(works) { return nextName(works, STUDIO_SPACE.namePrefix); }

// マイルストーンの表示名（ほぞん完了演出「かんせい!」用・§3-2）
export const MILESTONE_NAMES = {
  first: "はじめての さくひん",
  works5: "さくひんが 5こ",
  works10: "さくひんが 10こ",
  firstNest: "はじめての いれこ",
  firstCast3: "はじめて キャラ3にん",
};

/* 新規保存への付与（段階3 §1-3・設計§8「獲得は進歩ベース」・ロジック不変）。
   push 済みの状態で store.js から呼ばれる。空作品ガードを通らなければ null（付与なし）。
   戻り: { xp, coins, hit:[達成id...] }（エディタの「かんせい!」演出が表示に使う） */
function grantForNewSave(profile, work, studio) {
  if (!sceneNonEmpty(work.chars)) return null; // 空作品ガード＝XP/コイン/きろくの対象外
  const xp = XP.studioSave();
  applyXp(profile, xp); // レベルアップ/進化/たまごの「検知と演出」は App 側（もどった再読込時）が担う既存分業
  const m = studio.milestones || (studio.milestones = {});
  const hit = [];
  const tryHit = (id, cond) => { if (!m[id] && cond) { m[id] = true; hit.push(id); } };
  tryHit("first", studio.works.length >= 1);
  tryHit("works5", studio.works.length >= 5);
  tryHit("works10", studio.works.length >= 10);
  tryHit("firstNest", workHasNestedContainer(work));   // 容器の中の容器
  tryHit("firstCast3", (work.chars || []).length >= 3); // キャラ3体以上
  let coins = 0;
  for (const id of hit) coins += addCoins(profile, COIN.studio[id]);
  // きろく: 日別log（新規保存のみカウント・Art.jsx の log[d].art と同じ作法）
  if (!profile.log) profile.log = {};
  const d = today();
  profile.log[d] = profile.log[d] || {};
  profile.log[d].studio = (profile.log[d].studio || 0) + 1;
  return { xp, coins, hit };
}

const HOOKS = { persist: saveProfile, today, grantForNewSave };

/* 以下3つの引数・戻り値は分離前と同一（利用側無変更） */
export function saveWork(profile, scene, name, origin) {
  return saveWorkCore(profile, STUDIO_SPACE, scene, name, origin, HOOKS);
}
export function stashDraft(profile) {
  return stashDraftCore(profile, STUDIO_SPACE, HOOKS);
}
export function deleteWork(profile, id) {
  return deleteWorkCore(profile, STUDIO_SPACE, id, HOOKS);
}
