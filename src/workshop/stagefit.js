// ぶたいの1マスの大きさ（監査B-2 の是正・brushup/stage-floor.md §4）。
// ★node安全（純粋な算術のみ・import は engine.js の定数だけ）＝tools から読める。
//
// 【なぜ式を変えたか】
// 旧式 `min((w-52)/LCOLS, (h-44)/LROWS)` は「マス目が枠に収まる」ようにしか作られておらず、
// マスの上に立つ**キャラの大きさ（cellPx×ACTOR_K）を勘定に入れていなかった**。
// その結果、ぶたいが大きくなるほど
//   ・いちばん上の段（y=7）のキャラの頭が上端で切られる
//   ・いちばん右の列（x=11）のキャラが赤い幕（幅14px）の下に潜る
// が起きていた（監査 B-2・全画面上演で顕在化。studio 全画面で頭が約129px 欠けていた）。
//
// 【新しい式の作り方】キャラが収まる条件をそのまま解いただけで、恣意的な余白は足していない。
//   横: 左マージン22 + x*c + キャラ幅(K*c) ≤ w − 幕14   → x=11 で c ≤ (w−36)/(LCOLS−1+K)
//   縦: 下マージン12 + y*c + キャラ高(K*AR*c) ≤ h        → y=7  で c ≤ (h−12)/(LROWS−1+K*AR)
//
// ★AR（スプライトの縦横比）が要る理由: 監査の提案式は「キャラ画像は全て正方形」を前提に
//   分母を (LROWS−1+K) としていたが、**主人公だけ 543×724＝1.333 で縦に長い**
//   （てき・モンスターは正方形）。主人公が律速なので、縦だけ K に AR を掛ける。
//   監査案のままだと gamelab 全画面で約40px・studio 全画面で約56px 切れ残る。
import { LCOLS, LROWS } from "./engine.js";

export const SPRITE_AR = 724 / 543; // 主人公（player_boy/girl_adventure.png）の縦横比＝いちばん縦に長い

/* w,h = ぶたい(.theater)の内寸 / actorK = そのモードの ACTOR_K（studio 2.2 / gamelab 1.8）。
   ★ステージ本体とサムネ(StudioThumb)の両方がこの関数を呼ぶ＝ミニチュアが本物と食い違わない。 */
export function cellSize(w, h, actorK) {
  return Math.max(4, Math.min(                     // 下限4は非表示時の負値ガード（旧式から踏襲）
    (w - 36) / (LCOLS - 1 + actorK),
    (h - 12) / (LROWS - 1 + actorK * SPRITE_AR),
  ));
}
