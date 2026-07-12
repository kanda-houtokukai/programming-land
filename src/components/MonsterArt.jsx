// モンスターの絵（b4f: CSS/SVG描画→スプライトpngの<img>に刷新。propsは従来互換）。
// silhouette=true で ずかんの「？？？」表示（シルエット化は従来と同じfilter）
import { monsterImg, monsterName } from "../data/monsters.js";

export default function MonsterArt({ species, stage, size = 96, silhouette = false }) {
  const src = monsterImg(species, stage);
  if (!src) return null;
  // size=null は「寸法をCSSに任せる」モード（バトルの .fitArt=コンテナ幅100%）。
  // inlineのwidth/heightは .fitArt の width:100% より強いため、指定しないことが重要（b4cの進化スケール保護）
  const dim = size == null ? null : { width: size, height: size };
  return (
    <img src={src} alt={silhouette ? "？？？" : monsterName(species, stage)} draggable="false"
      style={{ objectFit: "contain", display: "inline-block", ...dim,
        ...(silhouette ? { filter: "brightness(0)", opacity: 0.3 } : null) }} />
  );
}
