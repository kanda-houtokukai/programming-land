// つくるスタジオ: 薄いルーター（段階2 §1）。
// view = "home"（フィルムだな＋みほんのたな） | "edit"（エディタ） | "show"（上演専用）。
// エディタ本体は StudioEditor.jsx（段階1の実機ゲート合格コードをそのまま移動）。
// 開く対象ごとに key を変えてエディタを再マウントする（initRef が正しく走る）。
// draft の自動退避（§2）は Home 側（開く前）で行う＝ここは配線だけ。
import { useState, useRef } from "react";
import StudioHome from "./StudioHome.jsx";
import StudioEditor from "./StudioEditor.jsx";

export default function Studio() {
  const [view, setView] = useState("home");
  const [target, setTarget] = useState(null); // { open, key }
  const seq = useRef(0);

  // open: null=draftの続き ／ {bg, chars, name, origin}=作品orみほん。showOnly=trueで上演専用
  const openEditor = (open, showOnly) => {
    seq.current++;
    setTarget({ open, key: (showOnly ? "show-" : "edit-") + seq.current });
    setView(showOnly ? "show" : "edit");
  };

  if (view === "home") return <StudioHome onOpen={openEditor} />;
  return (
    <StudioEditor key={target.key} open={target.open} showOnly={view === "show"}
      onExit={() => { setView("home"); setTarget(null); }} />
  );
}
