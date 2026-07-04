/* ローマ字変換エンジンの単体テスト（P4・npm run verify に組み込み）
   観点: 訓令式/ヘボン式の両受理・ん・っ・ー・拗音・を・ヒントと違う綴りでも正解・
         誤打の拒否・語彙データの全語が打てること */

import { accepts, representative, startWord, typeChar, hintRest, nextKey, segment } from "../src/typing/romaji.js";

let pass = 0, fail = 0;
function ok(cond, name) {
  if (cond) pass++;
  else { fail++; console.log(`FAIL: ${name}`); }
}

/* ---- 基本・両式 ---- */
ok(accepts("ねこ", "neko"), "ねこ=neko");
ok(accepts("しか", "sika"), "し=si(訓令)");
ok(accepts("しか", "shika"), "し=shi(ヘボン)");
ok(accepts("ちず", "tizu"), "ち=ti(訓令)");
ok(accepts("ちず", "chizu"), "ち=chi(ヘボン)");
ok(accepts("つき", "tuki"), "つ=tu(訓令)");
ok(accepts("つき", "tsuki"), "つ=tsu(ヘボン)");
ok(accepts("ふね", "hune"), "ふ=hu(訓令)");
ok(accepts("ふね", "fune"), "ふ=fu(ヘボン)");
ok(accepts("じかん", "zikann"), "じ=zi(訓令)");
ok(accepts("じかん", "jikann"), "じ=ji(ヘボン)");
ok(accepts("はなぢ", "hanadi"), "ぢ=di");
ok(accepts("つづき", "tuduki"), "づ=du");
ok(accepts("をとる", "wotoru"), "を=wo");

/* ---- ん ---- */
ok(accepts("さんぽ", "sanpo"), "ん=単独n（次が子音）");
ok(accepts("さんぽ", "sannpo"), "ん=nn（いつでも可）");
ok(!accepts("ほん", "hon"), "語末の ん は n 1つでは未完成");
ok(accepts("ほん", "honn"), "語末の ん=nn");
ok(!accepts("こんにちは", "konnitiha"), "な行の前の ん は nn 必須（n1つはNG）");
ok(accepts("こんにちは", "konnnitiha"), "こんにちは=konnnitiha(訓令)");
ok(accepts("こんにちは", "konnnichiha"), "こんにちは=konnnichiha(ヘボン)");
ok(!accepts("きんようび", "kinyoubi"), "や行の前の ん は nn 必須");
ok(accepts("きんようび", "kinnyoubi"), "きんようび=kinnyoubi");
ok(accepts("ぱんだ", "panda"), "ぱんだ=panda（単独n可）");

/* ---- っ（促音） ---- */
ok(accepts("きって", "kitte"), "っ=子音重ね(t)");
ok(accepts("らっぱ", "rappa"), "っ=子音重ね(p)");
ok(accepts("ざっし", "zassi"), "っ+し=ssi(訓令)");
ok(accepts("ざっし", "zasshi"), "っ+し=sshi(ヘボン)");
ok(accepts("まっちゃ", "mattya"), "っ+ちゃ=ttya(訓令)");
ok(accepts("まっちゃ", "maccha"), "っ+ちゃ=ccha(ヘボン)");
ok(accepts("きって", "kiltute"), "っ=ltu でも可");
ok(accepts("きって", "kixtute"), "っ=xtu でも可");
ok(!accepts("きって", "kite"), "促音を打たないのはNG");

/* ---- ー（長音）・拗音 ---- */
ok(accepts("らーめん", "ra-menn"), "ー=ハイフン");
ok(accepts("きしゃ", "kisya"), "しゃ=sya(訓令)");
ok(accepts("きしゃ", "kisha"), "しゃ=sha(ヘボン)");
ok(accepts("じゃがいも", "zyagaimo"), "じゃ=zya");
ok(accepts("じゃがいも", "jagaimo"), "じゃ=ja");
ok(accepts("じゃがいも", "jyagaimo"), "じゃ=jya");
ok(accepts("きんぎょ", "kinngyo"), "ぎょ=gyo");
ok(accepts("でんしゃ", "densya"), "でんしゃ=densya（ん単独n＋sya）");
ok(accepts("でんしゃ", "densha"), "でんしゃ=densha");

/* ---- 誤打の拒否 ---- */
{
  let st = startWord("ねこ");
  const r = typeChar(st, "m");
  ok(!r.ok, "誤キーは ok=false");
  ok(typeChar(r.state, "n").ok, "誤キー後も正しいキーで続行できる");
}

/* ---- ヒント（代表=訓令式）と両式入力の共存 ---- */
{
  let st = startWord("しんぶん");
  ok(hintRest(st) === "sinbunn", `ヒントは訓令式: sinbunn（実際: ${hintRest(st)}）`);
  ok(accepts("しんぶん", "shinnbunn"), "ヒントと違う綴り(ヘボン+nn)でも正解");
}
{
  // 打ちかけに追従するヒント: ち を c で打ち始めたら続きは hi
  let st = startWord("ちず");
  ok(nextKey(st) === "t", "初期ヒントは訓令式 t");
  st = typeChar(st, "c").state;
  ok(hintRest(st) === "hizu", `c入力後のヒントは hizu（実際: ${hintRest(st)}）`);
  ok(nextKey(st) === "h", "cのあとの点灯キーは h");
}
{
  // さんか: n 1回打った後、n でも k でも続けられる（NFAの要）
  let st = startWord("さんか");
  for (const c of "san") st = typeChar(st, c).state;
  ok(typeChar(st, "k").ok, "san のあと k で続行（ん=n 解釈）");
  ok(typeChar(st, "n").ok, "san のあと n で続行（ん=nn 解釈）");
}

/* ---- セグメント ---- */
ok(segment("きって").join("|") === "き|っ|て", "segment きって");
ok(segment("でんしゃ").join("|") === "で|ん|しゃ", "segment でんしゃ（拗音は1単位）");

/* ---- 語彙データ: 全語が代表つづりで完走できる＋未対応文字なし ---- */
try {
  const { TYPING_WORDS } = await import("../src/data/typing.js");
  for (const level of Object.keys(TYPING_WORDS)) {
    for (const w of TYPING_WORDS[level]) {
      const rep = representative(w);
      ok(rep.length > 0 && accepts(w, rep), `語彙「${w}」(${level}) が rep=${rep} で完走`);
    }
  }
} catch (e) {
  console.log("（語彙データ未作成のためスキップ:", e.message.split("\n")[0], "）");
}

console.log(fail === 0 ? `ローマ字テスト 全${pass}件 PASS` : `ローマ字テスト FAIL ${fail}件 / PASS ${pass}件`);
process.exit(fail === 0 ? 0 : 1);
