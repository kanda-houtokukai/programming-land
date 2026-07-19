// つくるスタジオ: ブロック1個の描画部品（SVGパス＋白チップ＋アイコン＋ラベル＋ピル）。
// プロトタイプ第11版の makeShape/labelHTML の1:1移植（DOM戦略同一: 絶対配置div＋SVG・位置はtransform）。
import { useLayoutEffect, useRef } from "react";
import { DEFS, SOUNDS } from "../data/studio-blocks.js";
import { G, CHIP_STYLE, pathBody, pathHat, pathC, gloss, chipY, labelY } from "../workshop/geometry.js";

/* props:
   b=ブロックデータ / mouth=容器の口の高さ / x,y=ステージ座標 / z=zIndex
   inFly=ドラッグ持ち上げ中の描画（transitionなし・イベントなし）
   land=着地ぷにっ発火キー
   onPill(e, block)=ピルタップ */
export default function StudioBlock({ b, mouth = 0, x, y, z, inFly, land, onPill }) {
  const d = DEFS[b.type];
  const ref = useRef(null);
  const first = useRef(true);

  // 新規マウント時は noanim で置いてから transition を解除（プロトタイプの createEl→rAF と同じ）
  useLayoutEffect(() => {
    if (inFly) return;
    if (first.current) {
      first.current = false;
      const el = ref.current;
      requestAnimationFrame(() => { if (el) el.classList.remove("noanim"); });
    }
  }, [inFly]);

  let path, hh;
  if (d.shape === "hat") { path = pathHat(d.w); hh = G.HATH; }
  else if (d.shape === "c") { path = pathC(d.w, mouth, !!d.flat); hh = G.TB + mouth + G.BB; }
  else { path = pathBody(d.w); hh = G.H; }
  const cy = chipY(b.type);
  const iconOff = (G.CHIP - G.ICON) / 2;
  const isHat = d.shape === "hat";

  return (
    <div ref={ref}
      className={"blk" + (inFly ? " noanim" : first.current ? " noanim" : "") + (land ? " land" : "")}
      data-id={b.id}
      style={{ transform: `translate(${x}px, ${y}px)`, zIndex: z }}>
      <svg width={d.w + 2} height={hh + G.TD + 4}
        viewBox={`-1 ${isHat ? -4 : -1} ${d.w + 2} ${hh + G.TD + (isHat ? 9 : 6)}`}>
        <path d={path} fill={d.fill} stroke={d.edge} strokeWidth="2" />
        <path d={gloss(d.w, isHat)} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="3.5" strokeLinecap="round" />
        <rect x={G.CHIPX} y={cy} width={G.CHIP} height={G.CHIP} rx={CHIP_STYLE.rx}
          fill={CHIP_STYLE.fill} stroke={CHIP_STYLE.stroke} strokeWidth={CHIP_STYLE.strokeWidth} />
        <image href={d.icon} x={G.CHIPX + iconOff} y={cy + iconOff} width={G.ICON} height={G.ICON} />
      </svg>
      <div className="lbl" style={{ left: G.LABELX, top: labelY(b.type) }}>
        {d.label}
        {d.pill === "n" && (
          <span className="pill" style={{ color: d.dark, textShadow: "none" }}
            onPointerDown={e => { e.stopPropagation(); onPill && onPill(e, b); }}>×{b.n}</span>
        )}
        {d.pill === "s" && (
          <span className="pill" style={{ color: d.dark, textShadow: "none" }}
            onPointerDown={e => { e.stopPropagation(); onPill && onPill(e, b); }}>{SOUNDS[b.s]}</span>
        )}
      </div>
    </div>
  );
}
