/* みほんのカバー絵（sample-covers.md §3）。768×512（3:2）＝棚の 128×85 枠の6倍。
   ★ここは「画像を import する UI 側のファイル」。みほんの正本データ（studio-samples.js /
     gamelab-samples.js）には cover を入れない。理由が左右で別々にあり、どちらも実測で確認済み:
       - studio: tools/test-studio-regression.mjs が SAMPLES を丸ごと凍結して完全一致で照合しており、
                 キーを1つ足すだけで回帰が FAIL する（b6m で実際に起きた）
       - gamelab: gamelab-samples.js は tools/verify-gamelab.mjs が node から読む純データで、
                 画像を import した瞬間 `Unknown file extension ".webp"` で verify が動かなくなる
                 （※文字列の desc は node 安全なので gamelab-samples.js の中に置いてある。
                   cover だけ扱いが違うのはこのため）
   合流は各モードの mode.jsx で行い、UI からは s.cover の1つの形で見える。
   ★studio と gamelab で表を分けている: 1つの表にすると、将来 id が衝突したときに
     別モードのカバー絵が黙って出てしまう（絵と名前の取り違えは verify で検出できない）。 */

// ゲームこうぼう（6本）
import coverCollect from "../assets/studio-assets/cover_collect.webp";
import coverDodge from "../assets/studio-assets/cover_dodge.webp";
import coverCatch from "../assets/studio-assets/cover_catch.webp";
import coverDropcatch from "../assets/studio-assets/cover_dropcatch.webp";
import coverOni from "../assets/studio-assets/cover_oni.webp";
import coverGoalrun from "../assets/studio-assets/cover_goalrun.webp";
// つくるスタジオ（4本）
import coverDance from "../assets/studio-assets/cover_dance.webp";
import coverChase from "../assets/studio-assets/cover_chase.webp";
import coverTap from "../assets/studio-assets/cover_tap.webp";
import coverHide from "../assets/studio-assets/cover_hide.webp";

export const GAMELAB_SAMPLE_COVERS = {
  collect: coverCollect,       // あつめゲーム
  dodge: coverDodge,           // よけゲーム
  catch: coverCatch,           // キャッチ
  dropcatch: coverDropcatch,   // おちものキャッチ
  oni: coverOni,               // おにごっこ
  goalrun: coverGoalrun,       // ゴールまで いこう
};

export const STUDIO_SAMPLE_COVERS = {
  dance: coverDance,           // ダンスパーティー
  chase: coverChase,           // おいかけっこ
  tap: coverTap,               // タップでへんしん
  hide: coverHide,             // ドッキリかくれんぼ
};
