import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Studio from "./components/Studio.jsx";
import Gamelab from "./components/Gamelab.jsx";

// 開発用バックドア（#studio-dev / #gamelab-dev）。スタジオの正規導線は段階3でワールドマップ→App mode "studio" に
// なったが、このルートはプロファイル演出なしで直接開ける検証用として意図的に残す（onExit なし＝hash運用・draftは共有）。
// #gamelab-dev も同じ扱い＝開店フェーズ 便②でマップ→App mode "gamelab" の正規導線が通ったが、
// 神田さんの検証で使うため意図的に残す（gamelab-opening-step2.md §2-3）。
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
