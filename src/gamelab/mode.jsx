// ゲームこうぼう: モード設定オブジェクト（段階1・gamelab-implementation-stage1.md §6）。
// STUDIO_MODE（src/studio/mode.jsx）と同形＋ゲーム層のフラグ2つ:
//   isGame: true  … 共通部品（WorkshopEditor/Home）のゲーム層（せってい/HUD/判定/おいわい）を有効化
//   gameDefault   … 新規ゲームの初期せってい（gameConfig の既定・欠落時のフォールバックにも使う）
// ★こうぼう固有の import（works・みほん・文言・マーク）はこのファイルと works.js だけに現れる状態を保つ。
import { DEFS, GAMELAB_PALORDER, SOUNDS } from "../data/studio-blocks.js";
import { BGS } from "../data/studio-bgs.js";
import { SAMPLES } from "../data/gamelab-samples.js";
import {
  ensureGamelab, saveWork, stashDraft, deleteWork, nextWorkName,
  WORKS_MAX, NAME_MAX, MILESTONE_NAMES,
} from "./works.js";
import bgInterior from "../assets/studio-assets/studio-interior.webp"; // 段階1は内装をスタジオ流用（色替え検討は段階3）

// ヘッダーのマーク（歯車＋ゲームパッド意匠の簡易版・段階1。本アイコンは段階3で差し替え検討）
const MARK = (
  <svg width="17" height="17" viewBox="0 0 17 17">
    <rect x="2.5" y="6" width="12" height="6.5" rx="3.2" fill="none" stroke="#4a2c05" strokeWidth="1.8" />
    <path d="M5 9.2h2M6 8.2v2" stroke="#4a2c05" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="11" cy="9.2" r="0.9" fill="#4a2c05" />
  </svg>
);

export const GAMELAB_MODE = {
  key: "gamelab",
  isGame: true,
  gameDefault: { scoreShow: true, clear: { type: "score", param: 10 }, gameOver: null }, // 段階1: clear.type は "score" のみ生成/処理（"time"/"none" は段階2・gameOver の中身も段階2）

  blocks: { DEFS, PALORDER: GAMELAB_PALORDER, SOUNDS },
  bgs: BGS,

  space: { key: "gamelab", peek: p => (p && p.gamelab) || null, ensure: ensureGamelab },
  works: { saveWork, stashDraft, deleteWork, nextWorkName, WORKS_MAX, NAME_MAX, MILESTONE_NAMES },

  samples: SAMPLES,
  guide: null, // 段階3で保護者ガイド全文（段階1は非表示＝Home 側の {guide && …} ガード）
  homeBg: bgInterior,

  texts: {
    title: "ゲームこうぼう",
    homeSub: "あそべる ゲームを つくろう",
    editSub: "つくって ▶で あそぼう",
    showSub: "ゲームで あそぶ",
    shelfName: "カセットだな",
    savedToast: "カセットだなに ほぞんした！",
    sampleShelfTitle: "みほんのたな",
    shelfEmpty: "まだ ゲームが ないよ。「あたらしく つくる」か、したの みほんから はじめよう",
    sampleHint: "みほんを ひらいてみよう",
  },
  mark: MARK,
};
