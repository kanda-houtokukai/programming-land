// つくるスタジオ: ブロック1個の描画部品（SVGパス＋白チップ＋アイコン＋ラベル＋ピル）。
// プロトタイプ第11版の makeShape/labelHTML の1:1移植（DOM戦略同一: 絶対配置div＋SVG・位置はtransform）。
import { useLayoutEffect, useRef } from "react";
import { DEFS, SOUNDS } from "../data/studio-blocks.js";
import { G, CHIP_STYLE, pathBody, pathHat, pathC, gloss, chipY, labelY } from "../workshop/geometry.js";

/* palette-ui-tuning §2-2（方針A）: 作業エリアのカード幅を「内容ぴったり」で都度算出する。
   b5x までは DEFS.w（昔の長い名前基準の固定幅）を使っていたため、短い名前のカードに右の空白が出ていた。
   ラベル開始X(46) + ラベル文字幅 + (ピルがあれば gap7 + ピル幅) + 右よはく14、下限96（論理px・縮尺前）。
   ★描画（下の StudioBlock）と当たり判定（WorkshopEditor の overlap/ghost/つかみ位置）で同じ関数を使う＝ズレない。
   ★DEFS.w も geometry.js のパス関数も変えない＝回帰ベースライン（732イベント含む）は不変。 */
const _measCtx = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : null;
function pillText(b, targetName) {
  const d = DEFS[b.type];
  if (d.pill === "n") return "×" + b.n;
  if (d.pill === "s") return SOUNDS[b.s];
  if (d.pill === "target") return b.target === "any" || !b.target ? "だれか" : (targetName ? targetName(b.target) : b.target);
  return null;
}
export function cardW(b, targetName) {
  const d = DEFS[b.type];
  if (!_measCtx) return d.w; // 非ブラウザ（保険）: 従来幅
  _measCtx.font = '900 14px "M PLUS Rounded 1c","Hiragino Maru Gothic ProN",sans-serif'; // .lbl と同じ字形
  let w = G.LABELX + _measCtx.measureText(d.label).width; // 46 + ラベル文字
  const pt = pillText(b, targetName);
  if (pt !== null) {
    const pillW = Math.max(32, Math.ceil(_measCtx.measureText(pt).width) + 22); // .pill: min-width32・padding11×2
    w += 7 + pillW; // .lbl の gap7 + ピル
  }
  return Math.max(96, Math.ceil(w + 14)); // 右よはく14・下限96
}

/* props:
   b=ブロックデータ / mouth=容器の口の高さ / x,y=ステージ座標 / z=zIndex
   inFly=ドラッグ持ち上げ中の描画（transitionなし・イベントなし）
   land=着地ぷにっ発火キー
   onPill(e, block)=ピルタップ */
export default function StudioBlock({ b, mouth = 0, x, y, z, inFly, land, onPill, targetName }) {
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

  const w = cardW(b, targetName); // §2-2 方針A: 内容ぴったりの幅（DEFS.w は使わない）
  let path, hh;
  if (d.shape === "hat") { path = pathHat(w); hh = G.HATH; }
  else if (d.shape === "c") { path = pathC(w, mouth, !!d.flat); hh = G.TB + mouth + G.BB; }
  else { path = pathBody(w); hh = G.H; }
  const cy = Math.max(chipY(b.type), 9); // palette-fixes: メスのくぼみ底 TD=8 を避ける（容器の食い込み対策）
  const iconOff = (G.CHIP - G.ICON) / 2;
  const isHat = d.shape === "hat";

  return (
    <div ref={ref}
      className={"blk" + (inFly ? " noanim" : first.current ? " noanim" : "") + (land ? " land" : "")}
      data-id={b.id}
      style={{ transform: `translate(${x}px, ${y}px)`, zIndex: z }}>
      <svg width={w + 2} height={hh + G.TD + 4}
        viewBox={`-1 ${isHat ? -4 : -1} ${w + 2} ${hh + G.TD + (isHat ? 9 : 6)}`}>
        <path d={path} fill={d.fill} stroke={d.edge} strokeWidth="2" />
        <path d={gloss(w, isHat)} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="3.5" strokeLinecap="round" />
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
        {d.pill === "target" && ( // stage2: 相手指定ぶつかり。any=だれか／それ以外は相手キャラ名（targetName で解決）
          <span className="pill" style={{ color: d.dark, textShadow: "none" }}
            onPointerDown={e => { e.stopPropagation(); onPill && onPill(e, b); }}>
            {b.target === "any" || !b.target ? "だれか" : (targetName ? targetName(b.target) : b.target)}</span>
        )}
      </div>
    </div>
  );
}
