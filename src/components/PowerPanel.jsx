// 「そだった ちから」（提案3・フェーズ1＋2）。5つのちからを植物でミニ表示＋タップで詳細モーダル。
// F2: 前回より伸びたちからを「育った瞬間」として祝う＋詳細に「いってみる」導線（メモ02の場所名/遷移）。
// 到達度は powers.js の computePowers（既存の到達度計算）。数値は前面に出さず、主役は植物の育ち。
import { useState, useEffect, useRef } from "react";
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { computePowers, growStage } from "../data/powers.js";
import { SFX } from "../sound.js";

// 短い名前（ミニ表示用・「〜の ちから」を落とす）
const shortName = name => name.replace("の ちから", "").replace(" ちから", "");

export default function PowerPanel({ save, update, go, hideTitle }) {
  const powers = computePowers(save);
  const [detail, setDetail] = useState(null);        // タップしたちから
  const [celebrate, setCelebrate] = useState(null);  // 育った瞬間の祝い（伸びたちからの配列）
  const ranRef = useRef(false);
  const sound = save.settings.sound;

  // 育った瞬間の検出（この画面を開いた"瞬間"に一度だけ）。update が無ければ祝わない（表示専用利用）。
  useEffect(() => {
    if (ranRef.current || !update) return;
    ranRef.current = true;
    const curMap = {};
    powers.forEach(p => { curMap[p.id] = p.pct; });
    const prev = (save.powers && save.powers.prev) || {};
    // 初回（前回%が未保存）は、いきなり全部が育つ事故を防ぐため 静かに現在値を基準化するだけ
    if (Object.keys(prev).length === 0) {
      update(s => { s.powers = { ...(s.powers || {}), prev: curMap }; return s; });
      return;
    }
    // 伸びたちからを検出（段階が上がったものは big で強めに祝う）
    const grown = powers
      .filter(p => p.pct > (prev[p.id] ?? 0))
      .map(p => ({
        id: p.id, name: p.name, emoji: p.emoji, img: p.grow.img, title: p.grow.title,
        stageUp: growStage(p.pct).idx > growStage(prev[p.id] ?? 0).idx,
      }));
    // 前回%を最新に更新（祝いの有無に関わらず＝次回の基準／再祝い防止）
    update(s => { s.powers = { ...(s.powers || {}), prev: curMap }; return s; });
    if (grown.length) {
      setCelebrate(grown);
      (grown.some(g => g.stageUp) ? SFX.fanfare : SFX.power)(sound);
    }
  }, []); // 初回マウントのみ

  return (
    <div className="panel" style={{ padding: "12px 14px", background: "#F4FBEF" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        {!hideTitle && <>
          <span style={{ fontSize: 18 }}>🌱</span>
          <span className="pl-display" style={{ fontSize: 17 }}>そだった ちから</span>
        </>}
        <span style={{ fontWeight: 700, fontSize: 11, color: "#6B6265", marginLeft: "auto" }}>タップで くわしく</span>
      </div>
      {/* 5つのちからのミニ表示（植物＋称号） */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
        {powers.map(p => (
          <button key={p.id} className="pbtn" onClick={() => { SFX.tap(sound); setDetail(p); }}
            style={{ background: "#fff", border: `2px solid ${C.ink}`, borderRadius: 14, padding: "6px 2px 5px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <img src={p.grow.img} alt={p.grow.stage} draggable="false" style={{ width: "82%", maxWidth: 52, aspectRatio: 1, display: "block" }} />
            <span style={{ fontWeight: 900, fontSize: "clamp(8px,2.1vw,11px)", lineHeight: 1.15, textAlign: "center" }}>{shortName(p.name)}</span>
            <span style={{ fontWeight: 800, fontSize: "clamp(7px,1.7vw,9px)", color: "#6B6265",
              background: "#FFF3D6", border: `1.5px solid ${C.ink}55`, borderRadius: 999, padding: "0 5px", whiteSpace: "nowrap" }}>
              {p.grow.title}
            </span>
          </button>
        ))}
      </div>

      {/* 詳細モーダル */}
      {detail && (
        <div role="dialog" aria-modal="true" onClick={() => setDetail(null)}
          style={{ position: "fixed", inset: 0, zIndex: 115, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel pop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 360, width: "100%", padding: 22, textAlign: "center", background: "#FBFFF7" }}>
            <img src={detail.grow.img} alt={detail.grow.stage} draggable="false" style={{ width: 150, height: 150, display: "block", margin: "0 auto" }} />
            <div className="pl-display" style={{ fontSize: 22, marginTop: 4 }}>{detail.emoji} {detail.name}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, margin: "8px 0",
              background: "#FFF3D6", border: `2px solid ${C.ink}`, borderRadius: 999, padding: "4px 14px", fontWeight: 900, fontSize: 14 }}>
              🏅 {detail.grow.title}<span style={{ fontWeight: 700, fontSize: 12, color: "#6B6265" }}>（{detail.grow.stage}）</span>
            </div>
            {/* すくすくメーター（植物の育ち＝主役／数字は控えめに添える） */}
            <div style={{ height: 12, border: `2px solid ${C.ink}`, borderRadius: 999, overflow: "hidden", background: "#fff", margin: "4px 0" }}>
              <div style={{ width: `${detail.pct}%`, height: "100%", background: C.leaf, transition: "width .5s" }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 11, color: "#6B6265" }}>そだち ぐあい {detail.pct}%</div>
            <div style={{ fontWeight: 800, fontSize: 13, background: "#EAF7FF", border: `2px solid ${C.ink}`, borderRadius: 12, padding: "8px 12px", margin: "12px 0", lineHeight: 1.6 }}>
              🌱 {detail.grows}
            </div>
            {/* 学びへの導線: 「いってみる」で そだつ場所へ（メモ02の遷移。戻りは各画面の◀もどる1つ＝メモ03） */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {go && <Btn big bg={C.leaf} onClick={() => { SFX.tap(sound); go(detail.go); }}>▶ {detail.goLabel} へ いってみる</Btn>}
              <Btn bg="#fff" onClick={() => setDetail(null)}>とじる</Btn>
            </div>
          </div>
        </div>
      )}

      {/* 育った瞬間の祝い（伸びた"瞬間"に一度だけ・派手すぎず優しく＝1-3のトーン） */}
      {celebrate && (
        <div role="dialog" aria-modal="true" onClick={() => setCelebrate(null)}
          style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel softpop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 380, width: "100%", padding: "22px 18px", textAlign: "center", background: "#FBFFF7" }}>
            <div className="pl-display" style={{ fontSize: 22 }}>🌱 ちからが そだった！</div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14, margin: "14px 0 6px" }}>
              {celebrate.map(g => (
                <div key={g.id} style={{ position: "relative", width: 108 }}>
                  {/* キラキラ（そのばで またたく・上へ舞わない＝優しい） */}
                  <span className="sparkle" style={{ position: "absolute", top: 2, left: 6, fontSize: 18 }}>✨</span>
                  <span className="sparkle" style={{ position: "absolute", top: 18, right: 4, fontSize: 14, animationDelay: ".4s" }}>✨</span>
                  <img src={g.img} alt="" draggable="false" className={"growpop" + (g.stageUp ? " big" : "")}
                    style={{ width: 92, height: 92, display: "block", margin: "0 auto" }} />
                  <div style={{ fontWeight: 900, fontSize: 13, marginTop: 2 }}>{g.emoji} {shortName(g.name)}</div>
                  {g.stageUp
                    ? <div style={{ display: "inline-block", marginTop: 3, fontWeight: 900, fontSize: 11, color: "#fff",
                        background: C.sakura, border: `2px solid ${C.ink}`, borderRadius: 999, padding: "1px 8px" }}>だんかい アップ！ 🏅{g.title}</div>
                    : <div style={{ fontWeight: 800, fontSize: 11, color: "#6B6265", marginTop: 3 }}>そだった！</div>}
                </div>
              ))}
            </div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", margin: "6px 0 14px" }}>あそぶと ちからが もっと そだつよ！</div>
            <Btn big bg={C.leaf} onClick={() => setCelebrate(null)}>やった！</Btn>
          </div>
        </div>
      )}
    </div>
  );
}
