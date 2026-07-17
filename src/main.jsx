import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Studio from "./components/Studio.jsx";

// つくるスタジオの開発用バックドア（#studio-dev）。正規導線は段階3でワールドマップ→App mode "studio" になったが、
// このルートはプロファイル演出なしで直接開ける検証用として意図的に残す（onExit なし＝hash運用・draftは共有）。
function Root() {
  const [studioDev, setStudioDev] = useState(() => window.location.hash === "#studio-dev");
  useEffect(() => {
    const onHash = () => setStudioDev(window.location.hash === "#studio-dev");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return studioDev ? <Studio /> : <App />;
}

createRoot(document.getElementById("root")).render(<Root />);
