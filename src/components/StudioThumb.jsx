// つくるスタジオ: 作品サムネのミニ描画（段階2 §3）。
// ★画像は保存しない。作品の純データ（背景ID＋キャラ配置）から毎回描く（設計§7・localStorageを圧迫しない）。
// 仮想ステージ（3:2）上でステージと同一式（論理12×8・cellPx=min((w-52)/12,(h-44)/8)・
// translate(22+x*c, -y*c)・キャラ幅=c×2.2）で配置し、全体を transform:scale で縮小する
// ＝本物のステージの正確なミニチュアになる。
import { LCOLS, LROWS } from "../workshop/engine.js";
import { bgById } from "../data/studio-bgs.js";
import { kindImg } from "../workshop/cast.js";
import PlayerAvatar from "./PlayerAvatar.jsx";

const ACTOR_K = 2.2;          // キャラ表示幅 = cellPx×これ（エディタCFGと同値・プロトタイプ実測値）
const VW = 300, VH = 200;     // 仮想ステージの寸法（3:2・式の入力になるだけの内部値）

export default function StudioThumb({ bg, chars, width = 128, profile }) {
  const h = Math.round(width * VH / VW);
  const cellPx = Math.min((VW - 52) / LCOLS, (VH - 44) / LROWS); // ステージと同一式
  const base = cellPx * ACTOR_K;
  const scale = width / VW;
  return (
    <div style={{ position: "relative", width, height: h, flexShrink: 0, overflow: "hidden",
      borderRadius: 6, background: "#1c1424" }}>
      <img src={bgById(bg).img} alt="" draggable="false"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: VW, height: VH,
        transform: `scale(${scale})`, transformOrigin: "top left" }}>
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
