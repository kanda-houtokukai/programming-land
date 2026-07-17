// つくるスタジオ: 控え室（はいゆうひかえしつ）の顔ぶれとキャラ種別ヘルパー。
// 段階1で StudioEditor（旧Studio.jsx）内にあったものを、Home/サムネと共有するため移動（ロジック不変）。
// 主人公＋出会った相棒（現在の進化段階）＋倒した敵。最低保証=主人公+初期相棒+敵2体（設計§9）。
// ※画像を import するモジュール（monsters/battle）に依存するため node からは読めない。
//   みほんの機械検証（verify-studio）は「最低保証4種のみ」を直接照合する。
import { stageForLevel, monsterName, monsterImg } from "../data/monsters.js";
import { ENEMIES, enemyById } from "../data/battle.js";

export function buildCast(profile) {
  const cast = [{ kind: { type: "player" }, name: "たんけんか" }];
  const owned = (profile && profile.partner && profile.partner.owned) || [];
  for (const m of owned) {
    const stage = stageForLevel(m.level || 1);
    cast.push({ kind: { type: "mon", id: m.id, stage }, name: monsterName(m.id, stage) });
  }
  if (!owned.length) cast.push({ kind: { type: "mon", id: "mori", stage: 1 }, name: monsterName("mori", 1) });
  const defeated = new Set((profile && profile.battle && profile.battle.defeated) || []);
  defeated.add("slime"); defeated.add("mushroom"); // 最低保証の敵2体
  for (const e of ENEMIES) if (defeated.has(e.id)) cast.push({ kind: { type: "enemy", id: e.id }, name: e.name });
  return cast;
}
export function kindImg(kind) {
  if (kind.type === "mon") return monsterImg(kind.id, kind.stage || 1);
  if (kind.type === "enemy") { const e = enemyById(kind.id); return e ? e.img : null; }
  return null; // player は PlayerAvatar で描く
}
export function kindName(kind) {
  if (kind.type === "mon") return monsterName(kind.id, kind.stage || 1);
  if (kind.type === "enemy") { const e = enemyById(kind.id); return e ? e.name : ""; }
  return "たんけんか";
}
export function kindValid(kind) {
  if (!kind || !kind.type) return false;
  if (kind.type === "player") return true;
  return !!kindImg(kind);
}
