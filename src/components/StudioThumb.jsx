// つくるスタジオ: 作品サムネのミニ描画（段階2 §3）。
// ★画像は保存しない。作品の純データ（背景ID＋キャラ配置）から毎回描く（設計§7・localStorageを圧迫しない）。
// 仮想ステージ（3:2）上でステージと同一式（論理12×8・cellPx=min((w-52)/12,(h-44)/8)・
// translate(22+x*c, -y*c)・キャラ幅=c×2.2）で配置し、全体を transform:scale で縮小する
// ＝本物のステージの正確なミニチュアになる。
import { LCOLS, LROWS } from "../workshop/engine.js";
import { cellSize } from "../workshop/stagefit.js";
import { bgById, floorStyle } from "../data/studio-bgs.js";
import { kindImg } from "../workshop/cast.js";
import PlayerAvatar from "./PlayerAvatar.jsx";

// キャラ表示幅 = cellPx×これ（エディタCFGと同値）。★モードで違う（studio 2.2 / gamelab 1.8）。
// 以前は 2.2 固定で、ゲームこうぼうのサムネだけキャラが本物より大きく描かれていた（監査B-2の対応で是正）。
const ACTOR_K = 2.2, ACTOR_K_GAME = 1.8;
const VW = 300, VH = 200;     // 仮想ステージの寸法（3:2・式の入力になるだけの内部値）

// isGame … ゲームこうぼうの作品サムネだけ「床」で描く（stage-floor.md §2-1）。
// ★これが無いと、カセットだなに絵のサムネが並ぶのに開くと床＝選んだ結果と違う絵が並ぶ（§3-1が禁じた食い違い）。
//   studio（isGame なし）は従来の絵のまま。見た目は floorStyle() に一本化＝3箇所でずれない。
export default function StudioThumb({ bg, chars, width = 128, profile, isGame = false }) {
  const h = Math.round(width * VH / VW);
  const k = isGame ? ACTOR_K_GAME : ACTOR_K;
  const cellPx = cellSize(VW, VH, k); // ★ステージ本体と同じ関数（stagefit.js）＝正確なミニチュアを保つ
  const base = cellPx * k;
  const scale = width / VW;
  return (
    <div style={{ position: "relative", width, height: h, flexShrink: 0, overflow: "hidden",
      borderRadius: 6, background: "#1c1424" }}>
      {isGame
        ? <div style={{ position: "absolute", inset: 0, ...floorStyle(bg) }} />
        : <img src={bgById(bg).img} alt="" draggable="false"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
      <div style={{ position: "absolute", left: 0, top: 0, width: VW, height: VH,
        transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {/* うっすらマス目（§3-2）: 本物のステージと同じ式で置くので縮小しても目盛りが合う */}
        {isGame && (
          <div style={{ position: "absolute", left: 22, bottom: 12,
            width: cellPx * LCOLS, height: cellPx * LROWS, backgroundSize: `${cellPx}px ${cellPx}px`,
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,.20) 0 1px, transparent 1px),"
                           + "linear-gradient(to bottom, rgba(255,255,255,.20) 0 1px, transparent 1px)" }} />
        )}
        {(chars || []).map((c, i) => (
          <div key={i} style={{ position: "absolute", left: 0, bottom: 12, width: base,
            transform: `translate(${22 + c.x * cellPx}px, ${-c.y * cellPx}px)`, zIndex: 1 + i }}>
            {c.kind.type === "player"
              ? <PlayerAvatar character={(profile && profile.character) || "boy"} dressup={profile && profile.dressup} size={base} full />
              : <img src={kindImg(c.kind)} alt="" draggable="false" style={{ width: "100%", height: "auto", display: "block" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
