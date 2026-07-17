// つくるスタジオ: 作品の保存モデル（段階2 §2・Chat決定の規則をここに集約）。
// ★UI非依存・node安全（storage.js と studio-blocks-defs.js のみに依存）。
//
// 規則（§2）:
// - 何か（あたらしく つくる／みほん／つくりなおす／コピーして つくる）を開く前に、
//   現在の draft が「空作品ガード」を通るなら自動で works に保存してから開く（stashDraft）。
//   通らなければ黙って捨てる。→ かきかけは失われず、確認ダイアログも不要。
// - draft.origin = {type:"new"|"work"|"sample", id}
//   ほぞん時: work=その作品を上書き ／ new・sample=新規追加（sampleは remixOf を記録）
import { isTrigger } from "../data/studio-blocks-defs.js";
import { saveProfile, today } from "../storage.js";

export const WORKS_MAX = 30; // 上限30作品（設計§7・調整値）
export const NAME_MAX = 8;   // 作品名ひらがな8文字（設計§7）

export function ensureStudio(profile) {
  if (!profile.studio) profile.studio = { works: [], draft: null };
  return profile.studio;
}

// 空作品ガード（設計§8と同一）: 動くブロックが1枚以上あるきっかけスタックを持つキャラが1体以上
export function sceneNonEmpty(chars) {
  return (chars || []).some(c => (c.stacks || []).some(st =>
    st.blocks && st.blocks[0] && isTrigger(st.blocks[0].type) && st.blocks.length > 1));
}

// 「さくひん{連番}」の次の番号（既存の同型名の最大値+1・削除で番号が戻らないように）
export function nextWorkName(works) {
  let n = 0;
  for (const w of works || []) { const m = /^さくひん(\d+)$/.exec(w.name || ""); if (m) n = Math.max(n, +m[1]); }
  return `さくひん${n + 1}`;
}

let seq = 0;
export function newWorkId() { return "w" + Date.now().toString(36) + (seq++).toString(36); }

/* 作品を works へ書く。scene={bg, chars}（純データ・cid/実行状態を含まない）
   戻り: {ok:true, id} ／ {ok:false, reason:"full"}（棚が満杯・設計§7「たなが いっぱい!」） */
export function saveWork(profile, scene, name, origin) {
  const studio = ensureStudio(profile);
  const nm = (name || "").trim().slice(0, NAME_MAX) || nextWorkName(studio.works);
  if (origin && origin.type === "work") {
    const w = studio.works.find(x => x.id === origin.id);
    if (w) { // つくりなおし=上書き（remixOf は維持）
      w.name = nm; w.bg = scene.bg; w.chars = scene.chars; w.savedAt = today();
      saveProfile(profile);
      return { ok: true, id: w.id };
    }
    // 編集中に元作品が消えていた → 新規として保存に落とす
  }
  if (studio.works.length >= WORKS_MAX) return { ok: false, reason: "full" };
  const w = {
    id: newWorkId(), name: nm, savedAt: today(),
    remixOf: origin && origin.type === "sample" ? origin.id : null,
    bg: scene.bg, chars: scene.chars,
  };
  studio.works.push(w);
  saveProfile(profile);
  return { ok: true, id: w.id };
}

/* 何かを開く前の draft 自動退避（§2）。
   戻り: {ok:true} ／ {ok:false, reason:"full"}（新規行きのかきかけがあるのに棚が満杯＝開くのをブロック） */
export function stashDraft(profile) {
  if (!profile) return { ok: true };
  const studio = ensureStudio(profile);
  const d = studio.draft;
  if (!d) return { ok: true };
  if (!sceneNonEmpty(d.chars)) { // ほぼ空っぽ → 黙って捨てる（ゴミ作品を溜めない）
    studio.draft = null;
    saveProfile(profile);
    return { ok: true };
  }
  const origin = d.origin || { type: "new" };
  const existing = origin.type === "work" ? studio.works.find(x => x.id === origin.id) : null;
  const r = existing
    ? saveWork(profile, { bg: d.bg, chars: d.chars }, existing.name, origin) // 上書き＝名前維持
    : saveWork(profile, { bg: d.bg, chars: d.chars }, null, origin);         // 新規＝「さくひん{連番}」
  if (!r.ok) return r;
  studio.draft = null;
  saveProfile(profile);
  return { ok: true };
}

export function deleteWork(profile, id) {
  const studio = ensureStudio(profile);
  studio.works = studio.works.filter(w => w.id !== id);
  saveProfile(profile);
}
