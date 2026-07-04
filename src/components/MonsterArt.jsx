// モンスターの絵（承認済みSVGをそのまま描画）。silhouette=true で ずかんの「？？？」表示
import { MONSTER_ART } from "../data/monster-art.js";

export default function MonsterArt({ species, stage, size = 96, silhouette = false }) {
  const art = MONSTER_ART[`${species}-${stage}`];
  if (!art) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
      style={silhouette ? { filter: "brightness(0)", opacity: 0.3 } : undefined}
      dangerouslySetInnerHTML={{ __html: art }} />
  );
}
