// つくるスタジオ: 形状ジオメトリ＋SVGパス生成＋スナップ/アニメ定数。
// ★brushup/studio-block-prototype.html 第11版からの1:1移植（studio-design.md §11 が数値の正本）。
// 「改善」禁止。調整はすべてここの定数で行う（マジックナンバーを散らさない・憲章§4-4）。
// ★段階A §2-0: import を blocks.js（アイコン合成層・画像import入り）→ defs（純データ層）に差し替え。
//   geometry が DEFS から使うのは shape のみ＝完全に等価で、このファイルが node 安全になる
//   （tools/test-studio-regression.mjs がパス文字列を機械検証できる）。
import { DEFS, isContainer } from "../data/studio-blocks-defs.js";

/* ============ ジオメトリ定数（px・変更禁止） ============ */
export const G = {
  R: 9,        // 角丸
  TX: 20,      // 凸凹の開始x
  TW: 30,      // 凸凹の幅
  TD: 8,       // 凸凹の深さ
  SL: 6,       // 凸凹の斜面幅
  H: 48,       // 通常ブロック高さ
  HATH: 56,    // きっかけブロック高さ
  TB: 44,      // 容器の上バー高さ
  BB: 22,      // 容器の下バー高さ
  AW: 17,      // 容器の腕幅
  MOUTH: 46,   // 空の口の高さ
  SNAP: 78,    // 磁石が効く距離(px)
  SNAPWY: 1.3, // 縦方向は少し厳しく（横ずれに寛容・段違い誤爆を防ぐ）
  RESCUE: 140, // 枠外に落としたとき近くの接続先へ救済する距離(px)
  MAXDEPTH: 2, // 入れ子の深さ上限
  CHIP: 30,    // アイコン台座（白チップ）の一辺（palette-fixes: 34→30・メスのくぼみ底 TD=8 との干渉回避）
  CHIPX: 6,    // チップのx位置
  ICON: 24,    // アイコンの表示サイズ（palette-fixes: 26→24・CHIP縮小に追従）
  LABELX: 46,  // ラベル開始x（チップ分だけ右へ）
};
// 白チップの見た目（§11: #FFFDF6・rx11・stroke rgba(0,0,0,.10) 1px）
export const CHIP_STYLE = { fill: "#FFFDF6", rx: 11, stroke: "rgba(0,0,0,.10)", strokeWidth: 1 };

/* ============ アニメーション定数（変更禁止） ============ */
export const ANIM = {
  shift: "180ms cubic-bezier(.25,.9,.35,1.25)", // 隙間が開く/閉じる
  suck: 110,                                    // スナップ吸着(ms)
  liftRot: 2.6, liftScale: 1.05,                // 掴んだときの傾き/拡大
  land: 200,                                    // 着地のぷにっ(ms)
};

/* ============ 実行定数（§11・定義の正本は engine.js＝node単体テスト可能な側に一本化） ============ */
export { TICK, LCOLS, LROWS } from "./engine.js";

/* ============ パス生成（凸凹が必ずかみ合う共通ジオメトリ・1:1移植） ============ */
function segTabR(x) { // 左→右方向の凸/凹（下向き）
  return `H${x} l${G.SL} ${G.TD} h${G.TW - G.SL * 2} l${G.SL} ${-G.TD}`;
}
function segTabL(x) { // 右→左方向
  return `H${x + G.TW} l${-G.SL} ${G.TD} h${-(G.TW - G.SL * 2)} l${-G.SL} ${-G.TD}`;
}
export function pathBody(w) {
  return `M0 ${G.R} Q0 0 ${G.R} 0 ${segTabR(G.TX)} H${w - G.R} Q${w} 0 ${w} ${G.R}`
    + ` V${G.H - G.R} Q${w} ${G.H} ${w - G.R} ${G.H} ${segTabL(G.TX)} H${G.R} Q0 ${G.H} 0 ${G.H - G.R} Z`;
}
export function pathHat(w) {
  const h = G.HATH;
  return `M0 24 C0 7 ${w * 0.16} -2 ${w * 0.5} -2 C${w * 0.84} -2 ${w} 7 ${w} 24`
    + ` V${h - G.R} Q${w} ${h} ${w - G.R} ${h} ${segTabL(G.TX)} H${G.R} Q0 ${h} 0 ${h - G.R} Z`;
}
export function pathC(w, mouth, flatBottom) {
  const MF = G.TB + mouth;           // 口の床
  const BT = MF + G.BB;              // ブロック下端
  const inX = G.AW;                  // 口の内側x
  let d = `M0 ${G.R} Q0 0 ${G.R} 0 ${segTabR(G.TX)} H${w - G.R} Q${w} 0 ${w} ${G.R}`
    + ` V${G.TB - G.R} Q${w} ${G.TB} ${w - G.R} ${G.TB} ${segTabL(inX + G.TX)} H${inX + G.R} Q${inX} ${G.TB} ${inX} ${G.TB + G.R}`
    + ` V${MF - G.R} Q${inX} ${MF} ${inX + G.R} ${MF} ${segTabR(inX + G.TX)} H${w - G.R} Q${w} ${MF} ${w} ${MF + G.R}`
    + ` V${BT - G.R} Q${w} ${BT} ${w - G.R} ${BT}`;
  if (flatBottom) d += ` H${G.R} Q0 ${BT} 0 ${BT - G.R} Z`;
  else d += ` ${segTabL(G.TX)} H${G.R} Q0 ${BT} 0 ${BT - G.R} Z`;
  return d;
}
export function gloss(w, isHat) {
  if (isHat) return `M${w * 0.2} 8 C${w * 0.33} 3.5 ${w * 0.67} 3.5 ${w * 0.8} 8`;
  return `M${G.TX + G.TW + 8} 5 H${w - 14}`;
}

/* ============ 計測（1:1移植・typeベースに一般化） ============ */
export function blockH(b) {
  const d = DEFS[b.type];
  if (d.shape === "hat") return G.HATH;
  if (d.shape === "c") {
    const m = b.children.length ? stackH(b.children) : G.MOUTH;
    return G.TB + m + G.BB;
  }
  return G.H;
}
export function stackH(list) { return list.reduce((a, b) => a + blockH(b), 0); }
export function containerDepth(list) {
  let d = 0;
  for (const b of list) if (isContainer(b.type)) d = Math.max(d, 1 + containerDepth(b.children));
  return d;
}
// チップのy位置（§11: 帽子:14 / 容器:(TB-CHIP)/2 / 通常:(H-CHIP)/2）
export function chipY(type) {
  const d = DEFS[type];
  return d.shape === "hat" ? 14 : d.shape === "c" ? (G.TB - G.CHIP) / 2 : (G.H - G.CHIP) / 2;
}
// ラベルのy位置（プロトタイプ実測: 帽子26 / 容器12 / 通常13）
export function labelY(type) {
  const d = DEFS[type];
  return d.shape === "hat" ? 26 : d.shape === "c" ? 12 : 13;
}
