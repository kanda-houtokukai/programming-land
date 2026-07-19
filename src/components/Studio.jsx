// つくるスタジオ: 薄いルーター（段階2 §1・段階Aでモード注入点を兼ねる）。
// view = "home"（フィルムだな＋みほんのたな） | "edit"（エディタ） | "show"（上演専用）。
// エディタ本体=WorkshopEditor.jsx／入口棚UI=WorkshopHome.jsx（段階Aで共通部品化・mode注入）。
// スタジオ固有物は STUDIO_MODE（src/studio/mode.jsx）に集約し、共通部品へ渡すだけ。
// 開く対象ごとに key を変えてエディタを再マウントする（initRef が正しく走る）。
// draft の自動退避（§2）は Home 側（開く前）で行う＝ここは配線だけ。
import { useState, useRef } from "react";
import WorkshopHome from "./WorkshopHome.jsx";
import WorkshopEditor from "./WorkshopEditor.jsx";
import { STUDIO_MODE } from "../studio/mode.jsx";

/* onExit（段階3・正規導線）: App から渡される「マップへ戻る」。App 側が storage を再読込して
   バッジ/実績/レベルアップの検知を1回だけ走らせる。#studio-dev（開発用バックドア）では未指定＝hash運用 */
export default function Studio({ onExit }) {
  const [view, setView] = useState("home");
  const [target, setTarget] = useState(null); // { open, key }
  const seq = useRef(0);

  // open: null=draftの続き ／ {bg, chars, name, origin}=作品orみほん。showOnly=trueで上演専用
  const openEditor = (open, showOnly) => {
    seq.current++;
    setTarget({ open, key: (showOnly ? "show-" : "edit-") + seq.current });
    setView(showOnly ? "show" : "edit");
  };

  if (view === "home") return <WorkshopHome mode={STUDIO_MODE} onOpen={openEditor} onExitApp={onExit} />;
  return (
    <WorkshopEditor key={target.key} mode={STUDIO_MODE} open={target.open} showOnly={view === "show"}
      onExit={() => { setView("home"); setTarget(null); }} />
  );
}
