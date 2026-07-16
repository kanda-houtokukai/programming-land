// 「そだった ちから」＝そだちのもり（2026-07-16 刷新）。
// 5つの鉢の横並び一覧 → bg_mori.webp の上に「5本の木が立つ もり」へ（クイズひろば化・アリーナ背景化と同じ「一覧→場所」の手）。
// タップで詳細モーダル（%バー・称号・絵文字は廃止＝段階の一言＋できるようになったこと＋導線）。
// F2の「育った瞬間」の祝い（save.powers.prev の差分検出・初回は静かに基準化）は★そのまま維持（変わるのは中の絵だけ）。
import { useState, useEffect, useRef } from "react";
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { computePowers, growStage, treeImg, POWER_DID, STAGE_LINE } from "../data/powers.js";
import { SFX } from "../sound.js";
import bgMori from "../assets/bg_mori.webp";

// 短い名前（看板用・「〜の ちから」を落とす）
const shortName = name => name.replace("の ちから", "").replace(" ちから", "");

// 木の大きさ（シーン高さに対する%・段階順: たね/め/わかぎ/おおきな き）と立ち位置（%座標）。
// ★初期値＝実機で微調整はこの2つだけ。足元を地面に乗せるため中心でなく“底”基準（bottom）で置く
//   （中心アンカーだと段階でサイズが変わるたび足元が浮く＝アバターb3zで踏んだ罠）。
const TREE_H = ["14%", "22%", "36%", "54%"];
const TREE_POS = {
  junji: { left: 12, bottom: 22 },
  repeat: { left: 31, bottom: 18 },
  think: { left: 50, bottom: 22 },
  keyboard: { left: 69, bottom: 18 },
  create: { left: 88, bottom: 22 },
};

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
        id: p.id, name: p.name, img: treeImg(p.id, growStage(p.pct).idx), stage: p.grow.stage,
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
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        {!hideTitle && <span className="pl-display" style={{ fontSize: 17 }}>そだった ちから</span>}
        <span style={{ fontWeight: 700, fontSize: 11, color: "#6B6265", marginLeft: "auto" }}>きを タップで くわしく</span>
      </div>

      {/* もりのシーン（bg_mori.webp 1600×900=16:9ちょうど・ひろば/アリーナと同じ作法） */}
      <div style={{ position: "relative", aspectRatio: "16 / 9", border: `3px solid ${C.ink}`, borderRadius: 20,
        overflow: "hidden", boxShadow: "5px 5px 0 rgba(58,51,53,.9)", background: "#BFE3C0" }}>
        <img src={bgMori} alt="そだちのもり" draggable="false"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        {/* 5本の木（底基準アンカー＝足元が地面に乗る・高さは段階で変わる） */}
        {powers.map((p, i) => {
          const pos = TREE_POS[p.id];
          const idx = p.grow.idx;
          return (
            <button key={p.id} className="tapzone" onClick={() => { SFX.tap(sound); setDetail(p); }}
              aria-label={p.name}
              style={{ position: "absolute", left: `${pos.left}%`, bottom: `${pos.bottom}%`,
                transform: "translateX(-50%)", height: TREE_H[idx],
                border: "none", background: "transparent", cursor: "pointer", padding: 0, lineHeight: 0 }}>
              {/* 看板（既存.bubble・おうちのラベルと同じ・木の上に浮かせる＝ボタンの高さ=木の高さを保つ） */}
              <span className="bubble pulse" style={{ position: "absolute", left: "50%", bottom: "calc(100% + 6px)",
                transform: "translateX(-50%)", fontSize: "clamp(8px,1.9vw,12px)",
                animationDelay: `${(i * 0.6).toFixed(1)}s` }}>{shortName(p.name)}</span>
              <img src={treeImg(p.id, idx)} alt={p.grow.stage} draggable="false"
                style={{ height: "100%", width: "auto", display: "block",
                  filter: "drop-shadow(1px 3px 3px rgba(20,15,25,.35))" }} />
            </button>
          );
        })}
      </div>

      {/* 詳細モーダル（刷新: %バー・称号・絵文字は廃止。段階の一言＋できるようになったこと＋導線） */}
      {detail && (() => {
        const idx = detail.grow.idx;
        const did = (POWER_DID[detail.id] || [])[idx] || [];
        const line = STAGE_LINE[idx];
        return (
          <div role="dialog" aria-modal="true" onClick={() => setDetail(null)}
            style={{ position: "fixed", inset: 0, zIndex: 115, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
            <div className="panel pop" onClick={e => e.stopPropagation()}
              style={{ maxWidth: 360, width: "100%", padding: 22, textAlign: "center", background: "#FBFFF7", maxHeight: "88vh", overflowY: "auto" }}>
              <img src={treeImg(detail.id, idx)} alt={detail.grow.stage} draggable="false"
                style={{ height: 150, width: "auto", display: "block", margin: "0 auto" }} />
              <div className="pl-display" style={{ fontSize: 22, marginTop: 4 }}>{detail.name}</div>
              {/* 段階の一言＋次への一言（%の代わり） */}
              <div style={{ fontWeight: 900, fontSize: 15, marginTop: 6 }}>{line.now}</div>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", marginTop: 2 }}>{line.next}</div>
              {/* できるように なったこと（段階ごとに増える） */}
              <div style={{ textAlign: "left", background: "#FFFDF5", border: `2px solid ${C.ink}`, borderRadius: 12, padding: "10px 12px", margin: "12px 0 0" }}>
                <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 4 }}>できるように なったこと</div>
                {did.length === 0
                  ? <div style={{ fontWeight: 700, fontSize: 12.5, color: "#6B6265" }}>あそぶと ここに ふえるよ</div>
                  : did.map((d, k) => (
                    <div key={k} style={{ fontWeight: 800, fontSize: 12.5, lineHeight: 1.7 }}>・{d}</div>
                  ))}
              </div>
              {/* どこで そだつか（既存growsの文・不変） */}
              <div style={{ fontWeight: 800, fontSize: 13, background: "#EAF7FF", border: `2px solid ${C.ink}`, borderRadius: 12, padding: "8px 12px", margin: "10px 0 12px", lineHeight: 1.6 }}>
                {detail.grows}
              </div>
              {/* 学びへの導線: 「いってみる」で そだつ場所へ（メモ02の遷移・維持） */}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {go && <Btn big bg={C.leaf} onClick={() => { SFX.tap(sound); go(detail.go); }}>▶ {detail.goLabel} へ いってみる</Btn>}
                <Btn bg="#fff" onClick={() => setDetail(null)}>とじる</Btn>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 育った瞬間の祝い（伸びた"瞬間"に一度だけ・派手すぎず優しく＝1-3のトーン）★演出ロジックは維持・中の絵が木になっただけ */}
      {celebrate && (
        <div role="dialog" aria-modal="true" onClick={() => setCelebrate(null)}
          style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel softpop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 380, width: "100%", padding: "22px 18px", textAlign: "center", background: "#FBFFF7" }}>
            <div className="pl-display" style={{ fontSize: 22 }}>ちからが そだった！</div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14, margin: "14px 0 6px" }}>
              {celebrate.map(g => (
                <div key={g.id} style={{ position: "relative", width: 108 }}>
                  {/* キラキラ（そのばで またたく・上へ舞わない＝優しい） */}
                  <span className="sparkle" style={{ position: "absolute", top: 2, left: 6, fontSize: 18 }}>✨</span>
                  <span className="sparkle" style={{ position: "absolute", top: 18, right: 4, fontSize: 14, animationDelay: ".4s" }}>✨</span>
                  <img src={g.img} alt="" draggable="false" className={"growpop" + (g.stageUp ? " big" : "")}
                    style={{ height: 92, width: "auto", display: "block", margin: "0 auto" }} />
                  <div style={{ fontWeight: 900, fontSize: 13, marginTop: 2 }}>{shortName(g.name)}</div>
                  {g.stageUp
                    ? <div style={{ display: "inline-block", marginTop: 3, fontWeight: 900, fontSize: 11, color: "#fff",
                        background: C.sakura, border: `2px solid ${C.ink}`, borderRadius: 999, padding: "1px 8px" }}>だんかい アップ！ {g.stage}に なった</div>
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
