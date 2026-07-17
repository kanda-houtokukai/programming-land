// つくるスタジオ: 入口画面（段階2 §3・フィルムだな＋みほんのたな）。
// 世界観=撮影スタジオ（背景 studio-interior.webp・フィルム棚とスポットライトの部屋）。
// §2の保存モデル: 何か（あたらしく つくる／みほん／つくりなおす／コピーして つくる）を開く前に
// stashDraft で draft を自動退避（空作品ガードを通るなら棚へ・通らなければ捨てる）
// ＝かきかけは失われず、確認ダイアログも不要。「みる」は draft に触れないので退避しない。
import { useReducer, useRef, useState, useEffect } from "react";
import { lastProfile } from "../storage.js";
import { BGS } from "../data/studio-bgs.js";
import { SAMPLES } from "../data/studio-samples.js";
import { stashDraft, deleteWork, WORKS_MAX, NAME_MAX } from "../studio/works.js";
import StudioThumb from "./StudioThumb.jsx";
import ParentGuide from "./ParentGuide.jsx";
import { STUDIO_GUIDE } from "../data/parent-guide.js";
import bgInterior from "../assets/studio-assets/studio-interior.webp";

/* 効果音（エディタと同じWebAudio簡易音の最小セット） */
let AC = null;
function ac() { if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)(); return AC; }
function tone(freq, dur, type, vol, slide) {
  try {
    const c = ac(), o = c.createOscillator(), g = c.createGain();
    o.type = type || "sine"; o.frequency.value = freq;
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, c.currentTime + dur);
    g.gain.value = vol || 0.18;
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + dur);
  } catch (e) { /* 音は失敗しても操作を止めない */ }
}
const sndTick = () => tone(1100, 0.04, "square", 0.07);
const sndNo = () => tone(180, 0.12, "sine", 0.15);
const sndPoof = () => tone(320, 0.16, "sine", 0.16, 90);

const HOME_CFG = {
  THUMB_W: 128,   // フィルムだな/みほんのサムネ幅(px)
  DRAFT_W: 120,   // かきかけカードのサムネ幅(px)
  TOAST_MS: 3500,
};

const CSS = `
  .sh-root { position: fixed; inset: 0; z-index: 200; display: flex; flex-direction: column;
    background: #2e2237; user-select: none; -webkit-user-select: none; overflow: hidden;
    font-family: 'M PLUS Rounded 1c','Hiragino Maru Gothic ProN','Yu Gothic',sans-serif; }
  .sh-root header { display: flex; align-items: center; gap: 10px; padding: 10px 16px;
    background: #241a2c; color: #f5eddf; z-index: 5; }
  .sh-root header .mark { width: 30px; height: 30px; border-radius: 8px; background: #f2b23a; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    box-shadow: inset 0 2px 0 rgba(255,255,255,.45), 0 2px 0 rgba(0,0,0,.35); }
  .sh-root header h1 { font-size: 15px; font-weight: 900; letter-spacing: .06em; white-space: nowrap; }
  .sh-root header .sub { font-size: 11px; opacity: .65; font-weight: 500; }
  .sh-root header button { font-family: inherit; font-weight: 700; font-size: 12px;
    color: #f5eddf; background: #4a3a58; border: none; border-radius: 999px; padding: 7px 14px;
    box-shadow: inset 0 1.5px 0 rgba(255,255,255,.18), 0 2px 0 rgba(0,0,0,.3); cursor: pointer; }
  .sh-root header button:active { transform: translateY(1px); }
  .sh-stage { flex: 1; position: relative; min-height: 0; }
  .sh-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .sh-scroll { position: absolute; inset: 0; overflow-y: auto; padding: 14px 16px 24px;
    display: flex; flex-direction: column; gap: 14px; align-items: center; }
  .sh-col { width: min(920px, 100%); display: flex; flex-direction: column; gap: 14px; }
  .sh-draft { display: flex; align-items: center; gap: 14px; text-align: left;
    background: rgba(36,26,44,.86); border: 2.5px solid #f2b23a; border-radius: 16px;
    padding: 10px 16px 10px 10px; cursor: pointer; font-family: inherit; align-self: flex-start; }
  .sh-draft:active { transform: scale(.98); }
  .sh-draft .t { color: #ffe9b8; font-size: 14px; font-weight: 900; }
  .sh-draft .s { color: #f5eddf; font-size: 12px; font-weight: 700; opacity: .8; margin-top: 4px; }
  .sh-new { align-self: flex-start; font-family: inherit; font-weight: 900; font-size: 15px;
    color: #fff; background: #58a839; border: none; border-radius: 999px; padding: 12px 26px;
    cursor: pointer; box-shadow: inset 0 3px 0 rgba(255,255,255,.3), inset 0 -4px 0 rgba(0,0,0,.2), 0 3px 0 rgba(0,0,0,.35); }
  .sh-new:active { transform: translateY(2px); }
  .sh-sec { background: rgba(36,26,44,.82); border-radius: 16px; padding: 12px 14px; }
  .sh-title { color: #f7e6c8; font-size: 13px; font-weight: 900; letter-spacing: .08em; margin-bottom: 8px;
    text-shadow: 0 1px 0 rgba(0,0,0,.4); }
  .sh-empty { color: rgba(245,237,223,.65); font-size: 12px; font-weight: 700; padding: 6px 2px 8px; line-height: 1.7; }
  .sh-shelf { display: flex; gap: 12px; overflow-x: auto; padding: 4px 2px 8px; }
  .film { flex-shrink: 0; background: none; border: none; padding: 0; cursor: pointer; font-family: inherit; }
  .film:active { transform: scale(.96); }
  .film-frame { position: relative; background: #17111d; border-radius: 8px; padding: 12px 7px; }
  .film-frame::before, .film-frame::after { content: ""; position: absolute; left: 8px; right: 8px; height: 5px;
    background: repeating-linear-gradient(90deg, rgba(245,237,223,.55) 0 5px, transparent 5px 13px);
    border-radius: 2px; }
  .film-frame::before { top: 4px; }
  .film-frame::after { bottom: 4px; }
  .film-name { color: #f5eddf; font-size: 12px; font-weight: 900; text-align: center; margin-top: 5px;
    max-width: 142px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  @keyframes shSparkle { 0%,100% { box-shadow: 0 0 0 rgba(255,212,71,0); } 50% { box-shadow: 0 0 16px rgba(255,212,71,.85); } }
  .film.sparkle .film-frame { animation: shSparkle 1.6s ease-in-out infinite; }
  .sh-hint { color: #ffe9b8; font-size: 12px; font-weight: 900; margin: -2px 0 6px; }
  .sh-menu, .sh-confirm { position: absolute; inset: 0; z-index: 350; background: rgba(30,20,40,.55);
    display: flex; align-items: center; justify-content: center; }
  .sh-menu .box, .sh-confirm .box { background: #fffdf6; border-radius: 18px; padding: 18px 22px;
    max-width: 340px; width: calc(100% - 48px); box-shadow: 0 10px 30px rgba(0,0,0,.4); text-align: center; }
  .sh-menu .mname { color: #4a3520; font-size: 15px; font-weight: 900; margin-bottom: 12px; }
  .sh-menu .mbtn { display: block; width: 100%; font-family: inherit; font-weight: 900; font-size: 14px;
    border: none; cursor: pointer; border-radius: 999px; padding: 11px 0; margin: 7px 0; color: #fff;
    box-shadow: inset 0 -3px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.15); }
  .sh-menu .mbtn:active, .sh-confirm button:active { transform: translateY(2px); }
  .sh-menu .view { background: #58a839; }
  .sh-menu .remake { background: #4a7fc9; }
  .sh-menu .copy { background: #8F7EEA; }
  .sh-menu .del { background: #e0704f; }
  .sh-menu .cancel { background: #8a9a55; }
  .sh-confirm .msg { color: #4a3520; font-size: 14px; font-weight: 900; line-height: 1.8; margin-bottom: 14px; }
  .sh-confirm button { font-family: inherit; font-weight: 900; font-size: 14px; border: none; cursor: pointer;
    border-radius: 999px; padding: 9px 22px; margin: 0 6px; color: #fff;
    box-shadow: inset 0 -3px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.15); }
  .sh-confirm .yes { background: #e0704f; }
  .sh-confirm .no { background: #8a9a55; }
  .sh-toast { position: absolute; left: 50%; top: 64px; transform: translateX(-50%); z-index: 300;
    background: rgba(36,26,44,.92); color: #ffe9b8; font-size: 13px; font-weight: 900;
    border-radius: 999px; padding: 9px 22px; pointer-events: none; white-space: nowrap;
    box-shadow: 0 6px 18px rgba(0,0,0,.35); }
  .sh-narrow { display: none; position: absolute; inset: 0; z-index: 400; background: #2e2237;
    align-items: center; justify-content: center; color: #f5eddf; font-size: 16px; font-weight: 900;
    text-align: center; line-height: 2; }
  @media (max-width: 699px) { .sh-narrow { display: flex; } .sh-stage .sh-scroll { display: none; } }
`;

/* onExitApp（段階3）: App経由（マップ→スタジオ）のときの戻り先。未指定（#studio-dev）は従来どおり hash="" */
export default function StudioHome({ onOpen, onExitApp }) {
  const [, force] = useReducer(x => x + 1, 0);
  const profRef = useRef(undefined);
  if (profRef.current === undefined) profRef.current = lastProfile();
  const prof = profRef.current;
  const studio = (prof && prof.studio) || { works: [], draft: null };
  const works = studio.works || [];
  const draft = studio.draft;
  const draftAlive = !!(draft && Array.isArray(draft.chars) && draft.chars.length);
  const [menu, setMenu] = useState(null);           // 作品タップの4択 {work}
  const [confirmDel, setConfirmDel] = useState(null); // けす確認 {work}
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), HOME_CFG.TOAST_MS);
    return () => clearTimeout(t);
  }, [toast]);

  const blockFull = () => { setToast("たなが いっぱい! どれか けしてから"); sndNo(); };

  // §2: 開く前に draft を自動退避。needsSlot=開いた先がいずれ新規の棚を使う操作
  const stashThen = needsSlot => {
    if (prof) {
      const r = stashDraft(prof);
      if (!r.ok) { blockFull(); force(); return false; }
      if (needsSlot && prof.studio.works.length >= WORKS_MAX) { blockFull(); force(); return false; }
    }
    return true;
  };
  const openDraft = () => { sndTick(); onOpen(null, false); };
  const openNew = () => {
    sndTick();
    if (!stashThen(true)) return;
    onOpen({ bg: BGS[0].id, chars: [{ kind: { type: "player" }, x: 5, y: 3, stacks: [] }], name: "", origin: { type: "new" } }, false);
  };
  const openSample = s => { // みほん=開いた瞬間コピー（原本不変・保存で remixOf 記録）
    sndTick();
    if (!stashThen(true)) return;
    onOpen({ bg: s.bg, chars: s.chars, name: s.name.slice(0, NAME_MAX), origin: { type: "sample", id: s.id } }, false);
  };
  const openView = w => { setMenu(null); sndTick(); onOpen({ bg: w.bg, chars: w.chars, name: w.name, origin: { type: "work", id: w.id } }, true); };
  const openRemake = w => {
    setMenu(null); sndTick();
    if (!stashThen(false)) return; // 上書き先があるので新規の棚は要らない
    const cur = prof ? prof.studio.works.find(x => x.id === w.id) || w : w; // 退避で上書きされた最新を開く
    onOpen({ bg: cur.bg, chars: cur.chars, name: cur.name, origin: { type: "work", id: cur.id } }, false);
  };
  const openCopy = w => {
    setMenu(null); sndTick();
    if (!stashThen(true)) return;
    onOpen({ bg: w.bg, chars: w.chars, name: w.name, origin: { type: "new" } }, false); // 保存で新規追加（§2）
  };
  const doDelete = () => {
    const w = confirmDel;
    setConfirmDel(null);
    if (w && prof) { deleteWork(prof, w.id); sndPoof(); force(); }
  };

  const firstVisit = works.length === 0; // 初回導入は控えめに（みほんが光る＋一言だけ・設計§7）

  return (
    <div className="sh-root">
      <style>{CSS}</style>
      <header>
        <div className="mark">
          <svg width="17" height="17" viewBox="0 0 17 17"><path d="M2 15V2h9l-2.6 3.4L11 9H4.2" fill="none" stroke="#4a2c05" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" /></svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <h1>つくるスタジオ</h1>
          <div className="sub">じぶんの さくひんを つくろう</div>
        </div>
        <button style={{ marginLeft: "auto" }}
          onClick={() => { onExitApp ? onExitApp() : (window.location.hash = ""); }}>
          {onExitApp ? "◀ マップへ" : "◀ アプリへ"}</button>
      </header>
      <div className="sh-stage">
        <img className="sh-bg" src={bgInterior} alt="" draggable="false" />
        <div className="sh-scroll">
          <div className="sh-col">
            {draftAlive && (
              <button className="sh-draft" onClick={openDraft}>
                <StudioThumb bg={draft.bg} chars={draft.chars} width={HOME_CFG.DRAFT_W} profile={prof} />
                <span>
                  <span className="t" style={{ display: "block" }}>かきかけの さくひんが あるよ</span>
                  <span className="s" style={{ display: "block" }}>タップで つづきから</span>
                </span>
              </button>
            )}
            <button className="sh-new" onClick={openNew}>＋ あたらしく つくる</button>
            <div className="sh-sec">
              <div className="sh-title">フィルムだな（{works.length}/{WORKS_MAX}）</div>
              {works.length === 0 ? (
                <div className="sh-empty">まだ さくひんが ないよ。「あたらしく つくる」か、したの みほんから はじめよう</div>
              ) : (
                <div className="sh-shelf">
                  {[...works].reverse().map(w => (
                    <button key={w.id} className="film" onClick={() => { sndTick(); setMenu(w); }}>
                      <div className="film-frame"><StudioThumb bg={w.bg} chars={w.chars} width={HOME_CFG.THUMB_W} profile={prof} /></div>
                      <div className="film-name">{w.name}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="sh-sec">
              <div className="sh-title">みほんのたな</div>
              {firstVisit && <div className="sh-hint">みほんを ひらいてみよう</div>}
              <div className="sh-shelf">
                {SAMPLES.map(s => (
                  <button key={s.id} className={"film" + (firstVisit ? " sparkle" : "")} onClick={() => openSample(s)}>
                    <div className="film-frame"><StudioThumb bg={s.bg} chars={s.chars} width={HOME_CFG.THUMB_W} profile={prof} /></div>
                    <div className="film-name">{s.name}</div>
                  </button>
                ))}
              </div>
            </div>
            {/* おうちの方へ（段階3 §3-1・他モードと同じ ParentGuide モーダルの作法） */}
            <ParentGuide guide={STUDIO_GUIDE} />
          </div>
        </div>
        {toast && <div className="sh-toast">{toast}</div>}
        <div className="sh-narrow">この あそびは<br />タブレットか パソコンで<br />あそんでね</div>
      </div>

      {/* 作品タップの4択（設計§7: みる/つくりなおす/コピーして つくる/けす） */}
      {menu && (
        <div className="sh-menu" onClick={() => setMenu(null)}>
          <div className="box" onClick={e => e.stopPropagation()}>
            <div className="mname">{menu.name}</div>
            <button className="mbtn view" onClick={() => openView(menu)}>みる（じょうえん）</button>
            <button className="mbtn remake" onClick={() => openRemake(menu)}>つくりなおす</button>
            <button className="mbtn copy" onClick={() => openCopy(menu)}>コピーして つくる</button>
            <button className="mbtn del" onClick={() => { setConfirmDel(menu); setMenu(null); }}>けす</button>
            <button className="mbtn cancel" onClick={() => setMenu(null)}>やめる</button>
          </div>
        </div>
      )}
      {/* けす確認（設計§7: けす=確認付き） */}
      {confirmDel && (
        <div className="sh-confirm">
          <div className="box">
            <div className="msg">「{confirmDel.name}」を けす？<br />けしたら もどせないよ</div>
            <button className="yes" onClick={doDelete}>けす</button>
            <button className="no" onClick={() => setConfirmDel(null)}>やめる</button>
          </div>
        </div>
      )}
    </div>
  );
}
