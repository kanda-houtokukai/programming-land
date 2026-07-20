import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Studio from "./components/Studio.jsx";
import Gamelab from "./components/Gamelab.jsx";

// 開発用バックドア（#studio-dev / #gamelab-dev）。スタジオの正規導線は段階3でワールドマップ→App mode "studio" に
// なったが、このルートはプロファイル演出なしで直接開ける検証用として意図的に残す（onExit なし＝hash運用・draftは共有）。
// #gamelab-dev はゲームこうぼう段階1の仮導線（マップ開店=段階3・gamelab-implementation-stage1.md §0）。
function Root() {
  const [devHash, setDevHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setDevHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  if (devHash === "#gamelab-dev") return <Gamelab />;
  if (devHash === "#studio-dev") return <Studio />;
  return <App />;
}

createRoot(document.getElementById("root")).render(<Root />);
