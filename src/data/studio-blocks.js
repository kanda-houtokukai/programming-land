// つくるスタジオ: ブロック定義（ブラウザ用＝アイコン合成層）。
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
// ゲームこうぼう用アイコン（段階1〜3の新カード11種・Chat支給 card_icon_19〜29）。
// 既存18枚と同じ import 方式に統一（暫定SVGグリフは開店フェーズ 便①で全廃）。
import iconMoveRand from "../assets/studio-assets/card_icon_19_random.png";
import iconBounce from "../assets/studio-assets/card_icon_20_hanekaeru.png";
import iconScoreUp from "../assets/studio-assets/card_icon_21_score_up.png";
import iconScoreDown from "../assets/studio-assets/card_icon_22_score_down.png";
import iconBumpTarget from "../assets/studio-assets/card_icon_23_butsukatta_target.png";
import iconDpad from "../assets/studio-assets/card_icon_24_dpad.png";
import iconTapMove from "../assets/studio-assets/card_icon_25_tapmove.png";
import iconGoal from "../assets/studio-assets/card_icon_26_goal.png";
import iconChase from "../assets/studio-assets/card_icon_27_oikakeru.png";
import iconFall from "../assets/studio-assets/card_icon_28_futtekuru.png";
import iconJumpable from "../assets/studio-assets/card_icon_29_toberu.png";

const ICONS = {
  hat: iconHata, tap: iconTap, bump: iconButsukatta, bumpTarget: iconBumpTarget, goal: iconGoal,
  dpad: iconDpad, tapMove: iconTapMove, jumpable: iconJumpable,
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
