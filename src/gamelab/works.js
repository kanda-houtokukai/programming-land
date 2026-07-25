// ゲームこうぼう: 作品保存モデルの「こうぼう薄皮」（段階1・gamelab-implementation-stage1.md §6）。
// 共通核は src/workshop/store.js。studio/works.js と同形。
// ※開店フェーズ 便③で教育接続（XP/コイン/きろく）を載せた。付与が growth.js（画像import連鎖あり）に
//   依存するため、このファイルは studio/works.js と同じく**ブラウザ専用**になった（便②までは node でも読めた）。
//   ★便③§0 で verify チェーン9本の import を推移的に全走査し、どのツールも このファイルを読んでいないことを
//   確認済み（直接・間接とも0件）。共通核 store.js は引き続き node から試験できる。
import {
  ensureSpace, sceneNonEmpty, nextWorkName as nextName, newWorkId,
  saveWork as saveWorkCore, stashDraft as stashDraftCore, deleteWork as deleteWorkCore,
} from "../workshop/store.js";
import { workUsesAnyType } from "../data/studio-blocks-defs.js";
import { saveProfile, today } from "../storage.js";
import { applyXp, addCoins, XP, COIN } from "../growth.js";

export const WORKS_MAX = 30;
export const NAME_MAX = 8;

// こうぼうのモード空間（prof.gamelab・「ゲーム{連番}」）
export const GAMELAB_SPACE = { key: "gamelab", worksMax: WORKS_MAX, nameMax: NAME_MAX, namePrefix: "ゲーム" };

export { sceneNonEmpty, newWorkId };
export function ensureGamelab(profile) { return ensureSpace(profile, GAMELAB_SPACE); }
export function nextWorkName(works) { return nextName(works, GAMELAB_SPACE.namePrefix); }

// マイルストーンの表示名（ほぞん完了演出「かんせい!」のピル表示・studio と同じ作法）
export const MILESTONE_NAMES = {
  first: "はじめての ゲーム",
  works5: "ゲームが 5こ",
  works10: "ゲームが 10こ",
  firstOperable: "はじめて うごかせる ゲーム",
  firstClear: "はじめての かちまけ",
};

// そうさカテゴリ（じゅうじキー／タップいどう）＝「人が操作するもの」を作った印
const OPERABLE_TYPES = ["dpad", "tapMove"];

/* 新規保存への付与（開店フェーズ 便③・設計§D。studio/works.js の grantForNewSave と同形）。
   push 済みの状態で store.js から呼ばれる。空作品ガードを通らなければ null（付与なし）。
   戻り: { xp, coins, hit:[達成id...] }（エディタの「かんせい!」演出が表示に使う）
   ★マイルストーンは gamelab.milestones に持つ（studio.milestones と分離）＝同じ id を同じ場所に書くと
     スタジオでの達成が こうぼうにも効いてしまうため（設計§A-4 確定） */
function grantForNewSave(profile, work, gamelab) {
  if (!sceneNonEmpty(work.chars)) return null; // 空作品ガード＝XP/コイン/きろくの対象外
  const xp = XP.gamelabSave();
  applyXp(profile, xp); // レベルアップ/進化/たまごの「検知と演出」は App 側（exitWorkshop の再読込時）が担う既存分業
  const m = gamelab.milestones || (gamelab.milestones = {}); // 旧セーブ（便②以前）に無くてもここで生える
  const hit = [];
  const tryHit = (id, cond) => { if (!m[id] && cond) { m[id] = true; hit.push(id); } };
  tryHit("first", gamelab.works.length >= 1);
  tryHit("works5", gamelab.works.length >= 5);
  tryHit("works10", gamelab.works.length >= 10);
  tryHit("firstOperable", workUsesAnyType(work, OPERABLE_TYPES));       // 人が操作するものを作った
  // クリア条件を「なし」以外にした＝勝ち負けを設計した。★gameConfig は store.js の presence ガード付きで載る
  //（`"gameConfig" in scene` のときだけ）＝無い作品でも落ちないよう全段オプショナルで辿る
  tryHit("firstClear", !!(work.gameConfig && work.gameConfig.clear && work.gameConfig.clear.type
    && work.gameConfig.clear.type !== "none"));
  let coins = 0;
  for (const id of hit) coins += addCoins(profile, COIN.gamelab[id]);
  // きろく: 日別log（新規保存のみカウント・studio の log[d].studio と同じ作法）
  if (!profile.log) profile.log = {};
  const d = today();
  profile.log[d] = profile.log[d] || {};
  profile.log[d].gamelab = (profile.log[d].gamelab || 0) + 1;
  return { xp, coins, hit };
}

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
