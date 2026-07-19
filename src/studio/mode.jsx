// つくるスタジオ: モード設定オブジェクト（段階A §3-5・スタジオ薄皮の注入点）。
// WorkshopEditor / WorkshopHome（共通部品）にスタジオ固有物を渡す1か所。
// ★スタジオ固有の import（works・みほん・保護者ガイド・内装画像・文言）は
//   このファイルと works.js だけに現れる状態を保つ（境界の機械チェック=回帰ハーネス§4）。
// ゲームこうぼう（段階1〜）は同じ形の GAMELAB_MODE を作って共通部品に渡す。
import { DEFS, PALORDER, SOUNDS } from "../data/studio-blocks.js";
import { BGS } from "../data/studio-bgs.js";
import { SAMPLES } from "../data/studio-samples.js";
import { STUDIO_GUIDE } from "../data/parent-guide.js";
import {
  ensureStudio, saveWork, stashDraft, deleteWork, nextWorkName,
  WORKS_MAX, NAME_MAX, MILESTONE_NAMES,
} from "./works.js";
import bgInterior from "../assets/studio-assets/studio-interior.webp";

// ヘッダーの旗マーク（エディタ・Home共通の意匠。カチンコ旗=撮影スタジオ）
const MARK = (
  <svg width="17" height="17" viewBox="0 0 17 17">
    <path d="M2 15V2h9l-2.6 3.4L11 9H4.2" fill="none" stroke="#4a2c05"
      strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

export const STUDIO_MODE = {
  key: "studio",

  // カードのたな（DEFS/SOUNDSは共有カタログの現物・PALORDERがモードのパレット構成）
  blocks: { DEFS, PALORDER, SOUNDS },
  bgs: BGS,

  // モード空間（prof.studio）へのアクセサ。peek=作らず覗く／ensure=無ければ器を作る
  space: {
    key: "studio",
    peek: p => (p && p.studio) || null,
    ensure: ensureStudio,
  },

  // 保存モデル（studio/works.js の束・引数と戻り値は段階2 §2 のまま）
  works: { saveWork, stashDraft, deleteWork, nextWorkName, WORKS_MAX, NAME_MAX, MILESTONE_NAMES },

  // Home（棚UI）用
  samples: SAMPLES,
  guide: STUDIO_GUIDE,
  homeBg: bgInterior,

  // 画面上の文言（スタジオの世界観語彙はすべてここ）
  texts: {
    title: "つくるスタジオ",
    homeSub: "じぶんの さくひんを つくろう",
    editSub: "つくって ▶で うごかそう",
    showSub: "さくひんを みる",
    shelfName: "フィルムだな",           // かんせい!の「〜に ほぞんした」にも使う
    savedToast: "フィルムだなに ほぞんした！",
    sampleShelfTitle: "みほんのたな",
    shelfEmpty: "まだ さくひんが ないよ。「あたらしく つくる」か、したの みほんから はじめよう",
    sampleHint: "みほんを ひらいてみよう",
  },
  mark: MARK,
};
