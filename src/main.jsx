import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Studio from "./components/Studio.jsx";

// つくるスタジオ 段階0の一時ルート（#studio-dev のときだけ見本画面・マップ導線は段階3で正式に付ける）。
// App.jsx には触れず、入口の分岐だけをここに置く（既存挙動は不変）。
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
