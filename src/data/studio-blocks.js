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
// 段階2の暫定グリフ（stage2・Chat支給アイコン未着のため。うごき=青#124E8C・きっかけ=橙#8F5606）
const iconMoveRand = svgGlyph( // 4方向矢印（ランダム）
  `<path d="M13 2l3.2 3.2h-2.1v4.3h-2.2V5.2H9.8zM13 24l-3.2-3.2h2.1v-4.3h2.2v4.3h2.1zM2 13l3.2-3.2v2.1h4.3v2.2H5.2v2.1zM24 13l-3.2 3.2v-2.1h-4.3v-2.2h4.3v-2.1z" fill="#124E8C"/>`);
const iconBounce = svgGlyph( // 左右矢印（はねかえり）
  `<path d="M6.5 13l4-4v2.8h5V9l4 4-4 4v-2.8h-5V17z" fill="#124E8C"/>`);
const iconBumpTarget = svgGlyph( // 的（相手指定）
  `<circle cx="13" cy="13" r="9.5" fill="none" stroke="#8F5606" stroke-width="2"/>` +
  `<circle cx="13" cy="13" r="4.5" fill="#8F5606"/>`);
// 段階3 そうさの暫定グリフ（Chat支給アイコン未着のため。ティール edge #1B8478）
const iconDpad = svgGlyph( // 十字キー
  `<path d="M10 3h6v7h7v6h-7v7h-6v-7H3v-6h7z" fill="#2FB4A6" stroke="#1B8478" stroke-width="1.6" stroke-linejoin="round"/>`);
const iconTapMove = svgGlyph( // タップした先へすすむ矢印＋着地点
  `<circle cx="18.5" cy="18.5" r="4" fill="none" stroke="#1B8478" stroke-width="1.8"/>` +
  `<path d="M4 4l8.5 3-3.2 2.1 3.9 3.9-2.2 2.2-3.9-3.9L5.8 17z" fill="#2FB4A6" stroke="#1B8478" stroke-width="1.4" stroke-linejoin="round"/>`);
// 段階3 区切り②の暫定グリフ（Chat支給アイコン未着。うごき=青#124E8C・きっかけ=橙#8F5606）
const iconChase = svgGlyph( // 足あと（おいかける）
  `<ellipse cx="9" cy="16" rx="3" ry="4" fill="#124E8C"/><circle cx="6.5" cy="10.5" r="1.6" fill="#124E8C"/><circle cx="11.5" cy="10.5" r="1.6" fill="#124E8C"/>` +
  `<ellipse cx="18" cy="9" rx="2.6" ry="3.4" fill="#124E8C" opacity=".55"/><circle cx="16" cy="4.6" r="1.3" fill="#124E8C" opacity=".55"/><circle cx="20.3" cy="4.6" r="1.3" fill="#124E8C" opacity=".55"/>`);
const iconFall = svgGlyph( // 下向き矢印＋しずく（ふってくる）
  `<path d="M13 3v13m0 0l-5-5m5 5l5-5" fill="none" stroke="#124E8C" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<circle cx="6" cy="7" r="1.6" fill="#124E8C" opacity=".5"/><circle cx="20" cy="7" r="1.6" fill="#124E8C" opacity=".5"/>`);
const iconGoal = svgGlyph( // ゴール旗
  `<path d="M7 3v20" stroke="#8F5606" stroke-width="2.2" stroke-linecap="round"/>` +
  `<path d="M8.5 4h11l-3 3.5 3 3.5h-11z" fill="#8F5606"/>`);

const ICONS = {
  hat: iconHata, tap: iconTap, bump: iconButsukatta, bumpTarget: iconBumpTarget, goal: iconGoal,
  dpad: iconDpad, tapMove: iconTapMove,
  chase: iconChase, fall: iconFall,
  scoreUp: iconScoreUp, scoreDown: iconScoreDown,
  moveRand: iconMoveRand, bounce: iconBounce,
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
