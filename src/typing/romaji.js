/* ローマ字入力エンジン（P4）
   - 訓令式・ヘボン式の両方を正解にする（各表の先頭が代表表記=ヒント表示に使う訓令式）
   - 「ん」: nn は常に可。単独 n は次が「母音・な行/にゃ行・や行・ー」でない時だけ可
   - 「っ」: 次の子音の重ね打ち（kk等）。ltu/xtu も可
   - 「ー」: ハイフン
   - 入力判定は「あり得る解釈をぜんぶ同時に追う」方式（NFA）。
     例: さんか で s-a-n まで打った時、「ん=n 完了」と「nn の途中」の両方を保持し、
     次に n が来ても k が来ても正解にできる。
   単体テスト: tools/verify-typing.mjs（npm run verify に組み込み） */

export const TABLE = {
  あ: ["a"], い: ["i"], う: ["u"], え: ["e"], お: ["o"],
  か: ["ka"], き: ["ki"], く: ["ku"], け: ["ke"], こ: ["ko"],
  さ: ["sa"], し: ["si", "shi"], す: ["su"], せ: ["se"], そ: ["so"],
  た: ["ta"], ち: ["ti", "chi"], つ: ["tu", "tsu"], て: ["te"], と: ["to"],
  な: ["na"], に: ["ni"], ぬ: ["nu"], ね: ["ne"], の: ["no"],
  は: ["ha"], ひ: ["hi"], ふ: ["hu", "fu"], へ: ["he"], ほ: ["ho"],
  ま: ["ma"], み: ["mi"], む: ["mu"], め: ["me"], も: ["mo"],
  や: ["ya"], ゆ: ["yu"], よ: ["yo"],
  ら: ["ra"], り: ["ri"], る: ["ru"], れ: ["re"], ろ: ["ro"],
  わ: ["wa"], を: ["wo"],
  が: ["ga"], ぎ: ["gi"], ぐ: ["gu"], げ: ["ge"], ご: ["go"],
  ざ: ["za"], じ: ["zi", "ji"], ず: ["zu"], ぜ: ["ze"], ぞ: ["zo"],
  だ: ["da"], ぢ: ["di"], づ: ["du"], で: ["de"], ど: ["do"],
  ば: ["ba"], び: ["bi"], ぶ: ["bu"], べ: ["be"], ぼ: ["bo"],
  ぱ: ["pa"], ぴ: ["pi"], ぷ: ["pu"], ぺ: ["pe"], ぽ: ["po"],
  きゃ: ["kya"], きゅ: ["kyu"], きょ: ["kyo"],
  しゃ: ["sya", "sha"], しゅ: ["syu", "shu"], しょ: ["syo", "sho"],
  ちゃ: ["tya", "cha"], ちゅ: ["tyu", "chu"], ちょ: ["tyo", "cho"],
  にゃ: ["nya"], にゅ: ["nyu"], にょ: ["nyo"],
  ひゃ: ["hya"], ひゅ: ["hyu"], ひょ: ["hyo"],
  みゃ: ["mya"], みゅ: ["myu"], みょ: ["myo"],
  りゃ: ["rya"], りゅ: ["ryu"], りょ: ["ryo"],
  ぎゃ: ["gya"], ぎゅ: ["gyu"], ぎょ: ["gyo"],
  じゃ: ["zya", "ja", "jya"], じゅ: ["zyu", "ju", "jyu"], じょ: ["zyo", "jo", "jyo"],
  びゃ: ["bya"], びゅ: ["byu"], びょ: ["byo"],
  ぴゃ: ["pya"], ぴゅ: ["pyu"], ぴょ: ["pyo"],
  ー: ["-"],
};

const VOWELS = new Set(["a", "i", "u", "e", "o"]);

/* ひらがな文字列 → 打ちの単位（拗音は2文字で1単位） */
export function segment(hira) {
  const units = [];
  const chars = [...hira];
  for (let i = 0; i < chars.length; i++) {
    const two = chars[i] + (chars[i + 1] || "");
    if (TABLE[two]) { units.push(two); i++; }
    else units.push(chars[i]);
  }
  return units;
}

/* 単位 i の受理つづり（ん・っ は文脈依存）。先頭が代表表記 */
export function spellingsFor(units, i) {
  const u = units[i];
  if (u === "っ") {
    const next = i + 1 < units.length ? spellingsFor(units, i + 1) : [];
    const consonants = [...new Set(next.map(s => s[0]).filter(c => c && !VOWELS.has(c) && c !== "-" && c !== "n"))];
    return [...consonants, "ltu", "xtu"];
  }
  if (u === "ん") {
    const next = i + 1 < units.length ? (TABLE[units[i + 1]] || spellingsFor(units, i + 1)) : null;
    const singleOk = next && next.every(s => {
      const c = s[0];
      return c && !VOWELS.has(c) && c !== "n" && c !== "y" && c !== "-";
    });
    return singleOk ? ["n", "nn"] : ["nn"];
  }
  if (TABLE[u]) return TABLE[u];
  return []; // 未対応文字（語彙データ側の誤り。verifyで検出する）
}

/* ---- 入力セッション（NFA: あり得る解釈の集合を保持） ---- */
export function startWord(hira) {
  const units = segment(hira);
  return { units, branches: [{ pos: 0, sp: null, idx: 0 }], typedGood: 0, done: units.length === 0 };
}

/* 1キー入力。返り値 {ok, state}。state.done で単語完成 */
export function typeChar(state, ch) {
  if (state.done) return { ok: false, state };
  const out = [];
  const seen = new Set();
  for (const br of state.branches) {
    const candidates = br.sp !== null
      ? [[br.sp, br.idx]]
      : spellingsFor(state.units, br.pos).map(s => [s, 0]);
    for (const [s, idx] of candidates) {
      if (s[idx] !== ch) continue;
      const nb = idx + 1 === s.length
        ? { pos: br.pos + 1, sp: null, idx: 0 }
        : { pos: br.pos, sp: s, idx: idx + 1 };
      const key = `${nb.pos}|${nb.sp}|${nb.idx}`;
      if (!seen.has(key)) { seen.add(key); out.push(nb); }
    }
  }
  if (out.length === 0) return { ok: false, state };
  const done = out.some(b => b.pos >= state.units.length);
  return { ok: true, state: { ...state, branches: out, typedGood: state.typedGood + 1, done } };
}

/* のこりの代表つづり（ヒント表示用）。打ちかけの単位は入力に沿ったつづりを続ける */
export function hintRest(state) {
  if (state.done) return "";
  // いちばん進んでいる解釈を採用（同着なら代表表記優先）
  let best = null;
  for (const br of state.branches) {
    if (!best || br.pos > best.pos || (br.pos === best.pos && br.sp === null && best.sp !== null)) best = br;
  }
  let rest = best.sp !== null ? best.sp.slice(best.idx) : "";
  for (let i = best.sp !== null ? best.pos + 1 : best.pos; i < state.units.length; i++) {
    rest += spellingsFor(state.units, i)[0];
  }
  return rest;
}

/* つぎに押すキー（キーボード点灯用） */
export function nextKey(state) {
  const r = hintRest(state);
  return r ? r[0] : null;
}

/* いま打っている単位の番号（表示のハイライト用） */
export function currentUnitIndex(state) {
  if (state.done) return state.units.length;
  return Math.max(...state.branches.map(b => b.pos));
}

/* 単語ぜんたいの代表つづり（一覧・テスト用） */
export function representative(hira) {
  const units = segment(hira);
  return units.map((_, i) => spellingsFor(units, i)[0]).join("");
}

/* 文字列ぜんぶを打てるか（語彙データ検証用）: 与えたローマ字で最後まで到達するか */
export function accepts(hira, romaji) {
  let st = startWord(hira);
  for (const ch of romaji) {
    const r = typeChar(st, ch);
    if (!r.ok) return false;
    st = r.state;
  }
  return st.done;
}
