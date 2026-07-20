// つくるスタジオ: ブロック定義18種（ブラウザ用＝アイコン合成層）。
// 定義の純データは src/data/studio-blocks-defs.js（node安全・verify-studio が読む側）にあり、
// このファイルはアイコン画像を合成して従来どおりの形で export し直すだけ。
// 利用側（geometry.js / StudioBlock.jsx / StudioEditor.jsx）の import は段階1から不変。
// 新カード追加 = defs に1行 + ここに icon 1行。
import { DEFS as DEFS_CORE } from "./studio-blocks-defs.js";
import iconHata from "../assets/studio-assets/card_icon_01_hata.png";
import iconTap from "../assets/studio-assets/card_icon_02_tap.png";
import iconButsukatta from "../assets/studio-assets/card_icon_03_butsukatta.png";
import iconMigi from "../assets/studio-assets/card_icon_04_migi.png";
import iconHidari from "../assets/studio-assets/card_icon_05_hidari.png";
import iconUe from "../assets/studio-assets/card_icon_06_ue.png";
import iconShita from "../assets/studio-assets/card_icon_07_shita.png";
import iconMawaru from "../assets/studio-assets/card_icon_08_mawaru.png";
import iconJump from "../assets/studio-assets/card_icon_09_jump.png";
import iconMotono from "../assets/studio-assets/card_icon_10_motono.png";
import iconOokiku from "../assets/studio-assets/card_icon_11_ookiku.png";
import iconChiisaku from "../assets/studio-assets/card_icon_12_chiisaku.png";
import iconKieru from "../assets/studio-assets/card_icon_13_kieru.png";
import iconDeru from "../assets/studio-assets/card_icon_14_deru.png";
import iconOto from "../assets/studio-assets/card_icon_15_oto.png";
import iconMatsu from "../assets/studio-assets/card_icon_16_matsu.png";
import iconKurikaeshi from "../assets/studio-assets/card_icon_17_kurikaeshi.png";
import iconZutto from "../assets/studio-assets/card_icon_18_zutto.png";

// スコア＋/−の暫定グリフ（段階1・Chat支給の card_icon_19/20 が未着のため。stage1 §1「未着なら簡易グリフ可」）。
// 支給されたら import に差し替えるだけ（この2定数を消して ICONS の2行を張り替える）。
const svgGlyph = d =>
  "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">${d}</svg>`);
const iconScoreUp = svgGlyph(
  `<circle cx="13" cy="13" r="10.5" fill="#F6C445" stroke="#8A6606" stroke-width="1.6"/>` +
  `<path d="M13 8v10M8 13h10" stroke="#8A6606" stroke-width="3" stroke-linecap="round"/>`);
const iconScoreDown = svgGlyph(
  `<circle cx="13" cy="13" r="10.5" fill="#F6C445" stroke="#8A6606" stroke-width="1.6"/>` +
  `<path d="M8 13h10" stroke="#8A6606" stroke-width="3" stroke-linecap="round"/>`);

const ICONS = {
  hat: iconHata, tap: iconTap, bump: iconButsukatta,
  scoreUp: iconScoreUp, scoreDown: iconScoreDown,
  move: iconMigi, moveL: iconHidari, moveU: iconUe, moveD: iconShita,
  spin: iconMawaru, jump: iconJump, home: iconMotono,
  grow: iconOokiku, shrink: iconChiisaku, hide: iconKieru, show: iconDeru,
  sound: iconOto,
  wait: iconMatsu, repeat: iconKurikaeshi, forever: iconZutto,
};

// 従来どおり「icon 入りの DEFS」を export（形は段階0/1と同一）
export const DEFS = Object.fromEntries(
  Object.entries(DEFS_CORE).map(([k, v]) => [k, { ...v, icon: ICONS[k] }])
);

export {
  PALORDER, GAMELAB_PALORDER, SOUNDS, STUDIO_BG_IDS, isTrigger, isContainer,
  makeBlock, claimBlockIds, cloneBlocks,
} from "./studio-blocks-defs.js";
