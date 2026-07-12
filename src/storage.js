/* ほぞん（localStorage・プロファイル別に完全分離）
   キー構成:
     progland:v2:meta          … プロファイルIDの一覧と最後に遊んだ人
     progland:v2:profile:<id>  … 各プロファイルの記録本体
   将来の項目追加でクラッシュしないよう、読み込みは常にデフォルト値マージで行う */

export const SCHEMA_VERSION = 3; // b4j: partner を相棒ごとレベル {active, owned:[{id,level,xp}], egg} に
export const MAX_PROFILES = 4;
const META_KEY = "progland:v2:meta";
const profileKey = id => `progland:v2:profile:${id}`;

// 日本時間（端末ローカル）基準の日付。v1のUTC基準バグを修正
export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function lastNDays(n) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    out.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }
  return out;
}

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

// 相棒・ずかん・タイピング・バトル・難易度別記録の枠はP1以降で使う（今から予約）
export function newProfileData(name = "", character = null) {
  return {
    schema: SCHEMA_VERSION,
    id: genId(),
    name,
    character,                            // 主人公 "boy"|"girl"（第3波①）。旧avatar（動物絵文字）は廃止・既存セーブはnullのまま残りCharacterSelectで移行
    dressup: { head: null, face: null, neck: null, chest: null, waist: null, back: null }, // 着せ替え装備（各スロットのアイテムID・第3波）
    createdAt: today(),
    settings: { sound: true },
    puzzle: { stars: {}, difficulty: "easy" },
    quiz: { best: {}, difficulty: "easy" },
    art: { gallery: [] },
    badges: [],
    log: {},
    partner: null,                        // b4j: {active, owned:[{id,level,xp}…], egg:null|{xp}}（レベルは相棒ごと・eggは孵化ゲージ）。スターター選択で作成・旧形式はmigratePartnerで移行
    dex: [],
    typing: { best: {} },
    battle: { defeated: [], best: {}, towerBest: {} },  // defeated=たおした敵ID / best=難易度別の勝利数 / towerBest=🗼タワー最高到達フロア（難易度別・06-A。旧セーブはマージで{}補完・|| 0 で読む）
    items: {},                            // バトルアイテム { id: 個数 }
    coins: 0,                             // 🪙コイン（学習で貯まる）
    coinsGranted: false,                  // 導入時の「いままでのがんばり」換算を済ませたか
    cosmetics: { owned: [], equipped: { deco: null, bg: null } }, // きせかえ（所持ID・装備中）
    shopUsed: false,                      // ショップで一度でも買ったか（バッジ判定用）
    powers: { prev: {} },                 // そだったちからF2: 前回見たときの各ちから% { powerId: pct }。差分演出の基準（後方互換=空でマージ）
  };
}

/* 相棒スキーマ移行: 最新＝b4j {active, owned:[{id, level, xp}…], egg:null|{xp}}（レベルは相棒ごと）。
   吸収する旧世代: ①b4f〜b4i {active, owned:[id…], level, xp}（level/xp共有）→ 各ownedに共有level/xpを引き継ぐ
   ②b4f以前 {species, level, xp}（1体）。旧タイプIDの読み替えも継続: moko→mori／shizuku→mizu／hoshi→denki。
   ★移行では egg を付与しない（付与は「stage3へ到達する瞬間」のイベント限定＝既にstage3でも卵は付かない）。
   ⚠️ monsters.js は画像importを含み node から読めないため、このマップは storage.js に自己完結で持つ（roundtrip試験の保護） */
const OLD_SPECIES_MAP = { moko: "mori", shizuku: "mizu", hoshi: "denki" };
const mapSpeciesId = id => OLD_SPECIES_MAP[id] || id;
function migratePartner(partner) {
  if (!partner) return null;
  // 最新形式（owned が {id,…} の配列）: 旧ID残存と欠損値だけ吸収
  if (Array.isArray(partner.owned) && partner.owned.length && typeof partner.owned[0] === "object") {
    const seen = new Set();
    const owned = partner.owned.filter(m => m && m.id).map(m => ({ id: mapSpeciesId(m.id), level: m.level || 1, xp: m.xp || 0 }))
      .filter(m => (seen.has(m.id) ? false : seen.add(m.id)));
    if (!owned.length) return null;
    const active = seen.has(mapSpeciesId(partner.active)) ? mapSpeciesId(partner.active) : owned[0].id;
    const egg = partner.egg && typeof partner.egg === "object" ? { xp: partner.egg.xp || 0 } : null;
    return { active, owned, egg };
  }
  // b4f〜b4i形式（owned=id配列＋共有level/xp）: 全員が現状レベルを引き継ぐ（見た目の退行なし）
  if (Array.isArray(partner.owned)) {
    const lvl = partner.level || 1, xp = partner.xp || 0;
    const ids = [...new Set(partner.owned.map(mapSpeciesId))];
    const active = mapSpeciesId(partner.active);
    const list = ids.length ? ids : (active ? [active] : []);
    if (!list.length) return null;
    return { active: list.includes(active) ? active : list[0], owned: list.map(id => ({ id, level: lvl, xp })), egg: null };
  }
  // b4f以前（1体・species）
  const sp = mapSpeciesId(partner.species);
  if (!sp) return null;
  return { active: sp, owned: [{ id: sp, level: partner.level || 1, xp: partner.xp || 0 }], egg: null };
}

// 2階層のデフォルト値マージ（v1の {...newSave(), ...parsed} 方式を強化）
function mergeDefaults(parsed) {
  const d = newProfileData();
  const out = { ...d, ...parsed };
  for (const k of Object.keys(d)) {
    if (d[k] && typeof d[k] === "object" && !Array.isArray(d[k])) {
      out[k] = { ...d[k], ...(parsed && typeof parsed[k] === "object" ? parsed[k] : {}) };
    }
  }
  out.partner = migratePartner(out.partner);
  out.dex = [...new Set((out.dex || []).map(k => {
    const i = k.indexOf("-");
    return i > 0 ? `${mapSpeciesId(k.slice(0, i))}${k.slice(i)}` : k;
  }))];
  return out;
}

function loadMeta() {
  try {
    const r = JSON.parse(localStorage.getItem(META_KEY));
    if (r && Array.isArray(r.ids)) return { schema: SCHEMA_VERSION, lastProfileId: null, ...r };
  } catch (e) { /* まだ ほぞんが ない */ }
  return { schema: SCHEMA_VERSION, ids: [], lastProfileId: null };
}
function saveMeta(m) { localStorage.setItem(META_KEY, JSON.stringify(m)); }

export function loadProfile(id) {
  try {
    const r = JSON.parse(localStorage.getItem(profileKey(id)));
    if (r) return mergeDefaults({ ...r, id });
  } catch (e) { /* こわれていたら null */ }
  return null;
}
export function saveProfile(p) {
  try { localStorage.setItem(profileKey(p.id), JSON.stringify(p)); }
  catch (e) { console.error("save failed", e); }
}
export function listProfiles() {
  return loadMeta().ids.map(loadProfile).filter(Boolean);
}
export function setLastProfile(id) { const m = loadMeta(); m.lastProfileId = id; saveMeta(m); }

export function createProfile(name, character) {
  const m = loadMeta();
  if (m.ids.length >= MAX_PROFILES) return null;
  const p = newProfileData(name, character);
  saveProfile(p);
  m.ids.push(p.id); m.lastProfileId = p.id; saveMeta(m);
  return p;
}
export function deleteProfile(id) {
  localStorage.removeItem(profileKey(id));
  const m = loadMeta();
  m.ids = m.ids.filter(x => x !== id);
  if (m.lastProfileId === id) m.lastProfileId = null;
  saveMeta(m);
}

/* ---- かきだし / よみこみ（プロファイル単位） ---- */
export function exportProfileJSON(p) {
  return JSON.stringify({ app: "progland", schema: SCHEMA_VERSION, exportedAt: today(), profile: p }, null, 2);
}
// 成功: {ok:true, profile} / 失敗: {ok:false, reason}
export function importProfileJSON(text) {
  let parsed;
  try { parsed = JSON.parse(text); } catch (e) { return { ok: false, reason: "ファイルが よみとれませんでした（JSONではありません）" }; }
  if (!parsed || parsed.app !== "progland" || !parsed.profile) {
    return { ok: false, reason: "プログラミングランドの きろくファイルでは ありません" };
  }
  const m = loadMeta();
  if (m.ids.length >= MAX_PROFILES) {
    return { ok: false, reason: `プロファイルが いっぱいです（さいだい${MAX_PROFILES}人）。先に どれかを けしてください` };
  }
  const p = mergeDefaults(parsed.profile);
  p.id = genId(); // 既存プロファイルと衝突しないよう新しいIDで追加する
  saveProfile(p);
  m.ids.push(p.id); saveMeta(m);
  return { ok: true, profile: p };
}
