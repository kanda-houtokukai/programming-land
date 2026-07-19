// 共通部品: 作品の保存モデルの共通核（段階A §3-2・gamelab-implementation-stageA.md が正本）。
// つくるスタジオ／ゲームこうぼう（段階1〜）がモード非依存で共有する純ロジック。
//
// ★node 安全: growth.js / storage.js / 画像を import しない。
//   永続化・日付・教育接続（XP/コイン/きろく/マイルストーン）は hooks で呼び出し側から注入する
//   ＝薄皮（src/studio/works.js 等）がモード固有の付与を束ねる。
//   ロジックは段階2 §2 の保存モデルそのまま（等価変換・挙動変更禁止）:
// - draft.origin = {type:"new"|"work"|"sample", id}
//   ほぞん時: work=その作品を上書き ／ new・sample=新規追加（sampleは remixOf を記録）
// - 何かを開く前に、draft が「空作品ガード」を通るなら自動で works へ退避（stashDraft）。
//   通らなければ黙って捨てる → かきかけは失われず、確認ダイアログも不要。
//
// space（モード空間の記述子）: { key, worksMax, nameMax, namePrefix }
//   スタジオ = { key:"studio", worksMax:30, nameMax:8, namePrefix:"さくひん" }
// hooks: {
//   persist(profile)                        … 永続化（storage.saveProfile）
//   today()                                 … 保存日（storage.today）
//   grantForNewSave(profile, work, spaceData) … 新規追加保存への付与。null可（付与なし）
// }
import { isTrigger } from "../data/studio-blocks-defs.js";

export function ensureSpace(profile, space) {
  if (!profile[space.key]) profile[space.key] = { works: [], draft: null };
  return profile[space.key];
}

// 空作品ガード（設計§8と同一）: 動くブロックが1枚以上あるきっかけスタックを持つキャラが1体以上
export function sceneNonEmpty(chars) {
  return (chars || []).some(c => (c.stacks || []).some(st =>
    st.blocks && st.blocks[0] && isTrigger(st.blocks[0].type) && st.blocks.length > 1));
}

// 「{namePrefix}{連番}」の次の番号（既存の同型名の最大値+1・削除で番号が戻らないように）
export function nextWorkName(works, namePrefix) {
  const re = new RegExp(`^${namePrefix}(\\d+)$`);
  let n = 0;
  for (const w of works || []) { const m = re.exec(w.name || ""); if (m) n = Math.max(n, +m[1]); }
  return `${namePrefix}${n + 1}`;
}

let seq = 0;
export function newWorkId() { return "w" + Date.now().toString(36) + (seq++).toString(36); }

/* 作品を works へ書く。scene={bg, chars}（純データ・cid/実行状態を含まない）
   戻り: {ok:true, id, grant} ／ {ok:false, reason:"full"}（棚が満杯）
   grant: 新規追加のときだけ hooks.grantForNewSave の戻り（上書き=作り直し保存では null） */
export function saveWork(profile, space, scene, name, origin, hooks) {
  const data = ensureSpace(profile, space);
  const nm = (name || "").trim().slice(0, space.nameMax) || nextWorkName(data.works, space.namePrefix);
  if (origin && origin.type === "work") {
    const w = data.works.find(x => x.id === origin.id);
    if (w) { // つくりなおし=上書き（remixOf は維持・付与なし）
      w.name = nm; w.bg = scene.bg; w.chars = scene.chars; w.savedAt = hooks.today();
      hooks.persist(profile);
      return { ok: true, id: w.id, grant: null };
    }
    // 編集中に元作品が消えていた → 新規として保存に落とす
  }
  if (data.works.length >= space.worksMax) return { ok: false, reason: "full" };
  const w = {
    id: newWorkId(), name: nm, savedAt: hooks.today(),
    remixOf: origin && origin.type === "sample" ? origin.id : null,
    bg: scene.bg, chars: scene.chars,
  };
  data.works.push(w);
  // 付与は「新規追加の一本道」だけ（自動退避も同じ道を通る・段階3 §1-3）
  const grant = hooks.grantForNewSave ? hooks.grantForNewSave(profile, w, data) : null;
  hooks.persist(profile);
  return { ok: true, id: w.id, grant };
}

/* 何かを開く前の draft 自動退避（段階2 §2）。
   戻り: {ok:true} ／ {ok:false, reason:"full"}（新規行きのかきかけがあるのに棚が満杯＝開くのをブロック） */
export function stashDraft(profile, space, hooks) {
  if (!profile) return { ok: true };
  const data = ensureSpace(profile, space);
  const d = data.draft;
  if (!d) return { ok: true };
  if (!sceneNonEmpty(d.chars)) { // ほぼ空っぽ → 黙って捨てる（ゴミ作品を溜めない）
    data.draft = null;
    hooks.persist(profile);
    return { ok: true };
  }
  const origin = d.origin || { type: "new" };
  const existing = origin.type === "work" ? data.works.find(x => x.id === origin.id) : null;
  const r = existing
    ? saveWork(profile, space, { bg: d.bg, chars: d.chars }, existing.name, origin, hooks) // 上書き＝名前維持
    : saveWork(profile, space, { bg: d.bg, chars: d.chars }, null, origin, hooks);         // 新規＝「{prefix}{連番}」
  if (!r.ok) return r;
  data.draft = null;
  hooks.persist(profile);
  return { ok: true };
}

export function deleteWork(profile, space, id, hooks) {
  const data = ensureSpace(profile, space);
  data.works = data.works.filter(w => w.id !== id);
  hooks.persist(profile);
}
