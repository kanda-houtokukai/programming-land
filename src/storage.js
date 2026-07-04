/* ほぞん（localStorage・プロファイル別に完全分離）
   キー構成:
     progland:v2:meta          … プロファイルIDの一覧と最後に遊んだ人
     progland:v2:profile:<id>  … 各プロファイルの記録本体
   将来の項目追加でクラッシュしないよう、読み込みは常にデフォルト値マージで行う */

export const SCHEMA_VERSION = 2;
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
export function newProfileData(name = "", avatar = "") {
  return {
    schema: SCHEMA_VERSION,
    id: genId(),
    name, avatar,
    createdAt: today(),
    settings: { sound: true },
    puzzle: { stars: {}, difficulty: "easy" },
    quiz: { best: {} },
    art: { gallery: [] },
    badges: [],
    log: {},
    partner: null,
    dex: [],
    typing: { best: {} },
    battle: {},
  };
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

export function createProfile(name, avatar) {
  const m = loadMeta();
  if (m.ids.length >= MAX_PROFILES) return null;
  const p = newProfileData(name, avatar);
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
