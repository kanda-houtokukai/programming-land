// ゲームこうぼう: 薄いルーター（段階1・Studio.jsx と同形・gamelab-implementation-stage1.md §6）。
// view = "home"（カセットだな＋みほんのたな） | "edit"（エディタ） | "show"（あそぶ専用）。
// こうぼう固有物は GAMELAB_MODE（src/gamelab/mode.jsx）に集約し、共通部品へ渡すだけ。
// open は { bg, chars, gameConfig, name, origin }＝スタジオとの差分は gameConfig を運ぶこと（配線は Home 側）。
import { useState, useRef } from "react";
import WorkshopHome from "./WorkshopHome.jsx";
import WorkshopEditor from "./WorkshopEditor.jsx";
import { GAMELAB_MODE } from "../gamelab/mode.jsx";

/* onExit（段階3・正規導線でAppから渡す予定）: 段階1は #gamelab-dev のみ＝未指定（hash運用） */
export default function Gamelab({ onExit }) {
  const [view, setView] = useState("home");
  const [target, setTarget] = useState(null); // { open, key }
  const seq = useRef(0);

  const openEditor = (open, showOnly) => {
    seq.current++;
    setTarget({ open, key: (showOnly ? "show-" : "edit-") + seq.current });
    setView(showOnly ? "show" : "edit");
  };

  if (view === "home") return <WorkshopHome mode={GAMELAB_MODE} onOpen={openEditor} onExitApp={onExit} />;
  return (
    <WorkshopEditor key={target.key} mode={GAMELAB_MODE} open={target.open} showOnly={view === "show"}
      onExit={() => { setView("home"); setTarget(null); }} />
  );
}
