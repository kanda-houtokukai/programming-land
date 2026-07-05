// 「そだった ちから」専用画面（ワールドマップの「ちから」エリアから入る）。
// 中身は PowerPanel（5つのちから＋タップで詳細）をそのまま使う。
import { Header } from "./common.jsx";
import PowerPanel from "./PowerPanel.jsx";

export default function Powers({ save, go, onSound }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="🌱 そだった ちから" onHome={() => go("home")} onSound={onSound} />
      <div style={{ padding: "0 16px", display: "grid", gap: 12 }}>
        <PowerPanel save={save} hideTitle />
        <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", textAlign: "center" }}>
          あそぶと ちからが そだって、はなが さくよ！
        </div>
      </div>
    </div>
  );
}
