// ゲームこうぼう: 作品保存モデルの「こうぼう薄皮」（段階1・gamelab-implementation-stage1.md §6）。
// 共通核は src/workshop/store.js。studio/works.js と同形だが、教育接続の付与は段階3で載せる
// （設計§9: XP/コイン/マイルストーンは段階3）＝段階1は grantForNewSave が常に null（付与なし）。
// このため growth.js に依存せず、このファイルは node からも読める（verify-gamelab が使える形）。
import {
  ensureSpace, sceneNonEmpty, nextWorkName as nextName, newWorkId,
  saveWork as saveWorkCore, stashDraft as stashDraftCore, deleteWork as deleteWorkCore,
} from "../workshop/store.js";
import { saveProfile, today } from "../storage.js";

export const WORKS_MAX = 30;
export const NAME_MAX = 8;

// こうぼうのモード空間（prof.gamelab・「ゲーム{連番}」）
export const GAMELAB_SPACE = { key: "gamelab", worksMax: WORKS_MAX, nameMax: NAME_MAX, namePrefix: "ゲーム" };

export { sceneNonEmpty, newWorkId };
export function ensureGamelab(profile) { return ensureSpace(profile, GAMELAB_SPACE); }
export function nextWorkName(works) { return nextName(works, GAMELAB_SPACE.namePrefix); }

// 段階3で XP/コイン/マイルストーンを載せる（設計§9: first/firstScoreCard/firstClear/firstRemix）。
export const MILESTONE_NAMES = {};
function grantForNewSave() { return null; } // 段階1は付与なし

const HOOKS = { persist: saveProfile, today, grantForNewSave };

export function saveWork(profile, scene, name, origin) {
  return saveWorkCore(profile, GAMELAB_SPACE, scene, name, origin, HOOKS);
}
export function stashDraft(profile) {
  return stashDraftCore(profile, GAMELAB_SPACE, HOOKS);
}
export function deleteWork(profile, id) {
  return deleteWorkCore(profile, GAMELAB_SPACE, id, HOOKS);
}
