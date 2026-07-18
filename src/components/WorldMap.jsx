// ワールドマップ・ホーム（worldmap-home実装指示.md フェーズ1）。
// 旧ホーム（縦積みメニュー）を1枚のマップに刷新。変えるのは入口と遷移だけ＝各機能の中身は不変。
// 重なり回避: マップ上は小さいアイコン＋短い名前のみ。フル名前はタップ時のポップアップで見せ、
// 「▶ いく！」で遷移（低学年の誤タップ対策）。バトルはLv3までロック（既存判定を流用）。
import { useState } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { battleUnlocked, BATTLE_UNLOCK_LEVEL } from "../data/battle.js";
import { activeMon } from "../growth.js";
import { SFX } from "../sound.js";
import bgUrl from "../assets/worldmap-home.webp";
import iconQuiz from "../assets/icon_quiz.png";
import iconArt from "../assets/icon_art.png";
import iconShop from "../assets/icon_shop.png";
import iconPuzzle from "../assets/icon_puzzle.png";
import iconBattle from "../assets/icon_battle.png";
import iconFlower from "../assets/grow_4_flower.png";
// ※iconTyping は使っていない（タイピングは buildingTyping を使う）ので import しない
import buildingQuiz from "../assets/building_quiz.png";
import buildingTyping from "../assets/building_typing.png";
import buildingHome from "../assets/building_home.png";
import iconHarbor from "../assets/icon_harbor.png";
import titleLogo from "../assets/title_logo.webp";
// つくるスタジオ（段階3・★studio-assets/ 配下＝直下ではない）
import buildingStudio from "../assets/studio-assets/studio-building.png";
import signJunbichu from "../assets/studio-assets/sign-junbichu.png";

// 8エリアの%座標（1600×900の背景に対して）。ブラウザで背景に照らして微調整する。
// 拡張用の空き地（今回は何も置かない・将来の新エリア用）: 中央上(46,30)・北(58,16)・右中(70,36)
// 座標=各エリアが乗る「空き地の円」の中心（%）。ブラウザにグリッドを重ねて実測して合わせた。
// tall=縦長の建物イラスト（円に収めるため表示サイズを別扱い）
// 名前は3階層で役割分担（メモ02 名前の一貫性）:
//   short = 第1層: マップ上の短縮ラベル（常時表示・変えない）
//   place = 第2層: タップ時ポップアップの「場所名」。文言は place + " へ いく" で組み立てる。
//            場所とゲームを分離＝将来この場所に別ゲームを足しても、場所名は据え置きで
//            中のゲーム名だけ増やせる。
//   第3層（中のゲーム名・画面タイトル。例: ロボット パズル / クイズバトル / そだった ちから）は
//   各画面側が持つ＝ここには書かない・変えない。
export const AREAS = [
  // 実機FB第1便（2026-07-16）→ b4w → b4x: 同方向にもう一段ずつ（b4vの移動量の倍を毎回追加）。
  // b4x累計: quiz 5pt上・art 2.5pt上・myhome 0.5pt2時・puzzle 1.0pt2時（元値 quiz23/art42/myhome58,66/puzzle85,72 から）
  { key: "quiz", short: "クイズ", place: "クイズのひろば", img: buildingQuiz, tall: true, left: 27, top: 18 },
  { key: "art", short: "おえかき", place: "おえかきのへや", img: iconArt, left: 18, top: 39.5 },
  { key: "powers", short: "ちから", place: "そだちのもり", img: iconFlower, left: 19, top: 63 },
  { key: "shop", short: "おみせ", place: "おみせ", img: iconShop, left: 35, top: 72 },
  { key: "myhome", short: "おうち", place: "おうち", img: buildingHome, tall: true, left: 58.43, top: 65.75 },
  { key: "typing", short: "タイピング", place: "タイピングタワー", img: buildingTyping, tall: true, left: 47, top: 51 },
  { key: "puzzle", short: "パズル", place: "パズルのしま", img: iconPuzzle, left: 85.87, top: 71.5 },
  { key: "battle", short: "バトル", place: "バトルのアリーナ", img: iconBattle, left: 88, top: 26 },
  // みなと（第2波 段階②）: プロファイル交代の一本化された入口。海側・島の端（拡張用の空き地3つは温存）。
  // 毎回使う場所ではないので small=やや控えめサイズ。「▶いく！」で起動時の選択画面へ（switchProfile経路）
  { key: "harbor", short: "みなと", place: "みなと", img: iconHarbor, small: true, left: 9, top: 86 },
  // つくるスタジオ（段階3・北の空き地）。座標は studio-map-placement.md の確定値（神田さん実機調整済み）。
  // 建物はほぼ正方形だが tall:true（82%）表示で承認済み。既存エリアの後ろに追加＝既存のふわふわ位相を変えない
  { key: "studio", short: "つくる", place: "つくるスタジオ", img: buildingStudio, tall: true, left: 59.5, top: 12.4 },
];

// じゅんびちゅう看板（段階3で1枚目・FB5便⑤で2枚目追加）。★非対話の飾り＝AREASに入れない（buttonにしない）。
// 1枚目の座標は studio-map-placement.md の確定値・2枚目（中央上の空き地≒46,30）は初期値＝実機で微調整。
// 文字は画像に描かずアプリのフォントで板の中央に重畳。flip=imgだけCSSで左右反転（新規画像は作らない・文字は正立のまま）。
// 2枚が同位相で揺れないよう delay/dur を別値に（初期値）
const SIGNS = [
  { left: 69.5, top: 34.13, textTop: 40, flip: false, delay: "1.27s", dur: "3.3s" },
  { left: 46, top: 30, textTop: 40, flip: true, delay: "2.1s", dur: "3.6s" }, // 中央上・左右反転（座標は初期値）
];

export default function WorldMap({ save, go, onSound, onOpenHome, onSwitchProfile }) {
  const [popup, setPopup] = useState(null); // タップ中のエリア（場所名＋「へ いく」）
  const battleOk = battleUnlocked(save);
  const sound = save.settings.sound;
  const area = popup && AREAS.find(a => a.key === popup);
  const areaLocked = a => a.key === "battle" && !battleOk;

  return (
    <div className="mapPage" style={{ paddingBottom: 30 }}>{/* FB4便⑥: maxWidth640→mapPage（min(96vw,1100px)） */}
      {/* ヘッダー（相棒・⭐・🪙・音）。「きろく」ボタンは段階③で削除＝子どもの記録はおうちの机の日記へ一本化 */}
      <Header save={save} title="" onSound={onSound} onOpenHome={onOpenHome} />
      <div style={{ textAlign: "center", margin: "0 0 10px" }}>
        {/* タイトルロゴ（title_logo.webp・透過）。実機FB第1便: 80%に縮小（90%,460→72%,368・3画面そろえる） */}
        <img src={titleLogo} alt="プログラミングランド" draggable="false"
          style={{ width: "min(72%, 368px)", height: "auto", display: "block", margin: "0 auto" }} />
        <div style={{ fontWeight: 700, fontSize: 13 }}>いきたい ばしょを タップしてね</div>
      </div>

      {/* ワールドマップ本体（FB4便⑥: mapMax=高さに収まる幅まで拡大・--mapReserveは初期値）。
          14pxの側余白は外側ラッパーへ（コンテナ自身のpaddingは%座標の基準を変えるため不可） */}
      <div style={{ padding: "0 14px" }}>
      <div className="mapMax" style={{ "--mapReserve": "250px", position: "relative", aspectRatio: "16 / 9",
        border: `3px solid ${C.ink}`, borderRadius: 22, boxShadow: "5px 5px 0 rgba(58,51,53,.9)",
        overflow: "hidden", background: "#8ED1F2" }}>
        <img src={bgUrl} alt="ワールドマップ" draggable="false"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        {AREAS.map((a, i) => {
          const locked = areaLocked(a);
          // ふわふわの位相を index でばらす（同位相で揺れて酔うのを防ぐ）。ロック中(火山)は静止＝休眠感。
          const floatDelay = `${((i * 0.53) % 2.4).toFixed(2)}s`;
          const floatDur = `${(2.8 + (i % 3) * 0.5).toFixed(1)}s`;
          // 台紙なし＝透過イラストを島に直接置く。ボタン自体が四角い透明タップ範囲
          // （イラスト周囲の透明部分もタップ可能）。接地影で風景に馴染ませる。
          return (
            <button key={a.key} className="mapicon" onClick={() => { SFX.tap(sound); setPopup(a.key); }}
              aria-label={`${a.place} へ いく`}
              style={{ position: "absolute", left: `${a.left}%`, top: `${a.top}%`,
                transform: "translate(-50%,-50%)", width: "13%", aspectRatio: "1",
                border: "none", background: "transparent", cursor: "pointer", padding: 0,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
              {/* イラスト＋ラベルを1つのまとまりにして、空き地の円の中に収める。
                  建物(tall)は縦長なので大きめに（objectFit containで高さ基準に収まる）。
                  ふわふわは img だけに掛ける（ボタンの centering transform と衝突しない）。*/}
              {a.img
                ? <img src={a.img} alt="" draggable="false" className={locked ? "" : "mapfloat"}
                    style={{ width: a.tall ? "82%" : a.small ? "85%" : "62%", height: a.tall ? "82%" : a.small ? "85%" : "62%", objectFit: "contain", display: "block", /* FB4便②: みなと50→85%（初期値・タップ範囲13%は不変） */
                      animationDelay: floatDelay, animationDuration: floatDur,
                      filter: locked ? "grayscale(1) brightness(.75) drop-shadow(1px 2px 2px rgba(20,15,25,.45))" : "drop-shadow(1px 2px 2px rgba(20,15,25,.45))",
                      opacity: locked ? 0.7 : 1 }} />
                : <span style={{ fontSize: "clamp(18px,5vw,34px)", lineHeight: 1,
                    filter: "drop-shadow(1px 2px 2px rgba(20,15,25,.45))" }}>{a.emoji}</span>}
              {locked && <span style={{ position: "absolute", top: "8%", right: "16%", fontSize: "clamp(11px,2.8vw,18px)" }}>🔒</span>}
              {/* 短い名前: 下地チップなし・白フチ文字で どの背景でも読める */}
              <span style={{ whiteSpace: "nowrap", marginTop: 1, fontWeight: 900, fontSize: "clamp(8px,2vw,12px)", color: C.ink,
                textShadow: "0 0 3px #fff,1.5px 1.5px 0 #fff,-1.5px 1.5px 0 #fff,1.5px -1.5px 0 #fff,-1.5px -1.5px 0 #fff,0 2px 3px rgba(0,0,0,.3)" }}>{a.short}</span>
            </button>
          );
        })}
        {/* じゅんびちゅう看板（非対話の飾り・タップしても何も起きない）。ふわふわは他の建物と揃える＝
            文字が板と一緒に揺れるよう、アニメは img でなく内側ラッパーに掛ける。
            FB5便⑤: 2枚に一般化（2枚目は img だけ scaleX(-1) で反転・.mapfloat は別要素なので無干渉・文字は正立） */}
        {SIGNS.map((s, i) => (
          <div key={i} aria-hidden="true" style={{ position: "absolute", left: `${s.left}%`, top: `${s.top}%`,
            transform: "translate(-50%,-50%)", width: "13%", aspectRatio: "1", pointerEvents: "none",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="mapfloat" style={{ position: "relative", width: "62%", height: "62%",
              animationDelay: s.delay, animationDuration: s.dur }}>
              <img src={signJunbichu} alt="" draggable="false"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block",
                  transform: s.flip ? "scaleX(-1)" : undefined,
                  filter: "drop-shadow(1px 2px 2px rgba(20,15,25,.45))" }} />
              <span style={{ position: "absolute", left: "50%", top: `${s.textTop}%`, transform: "translate(-50%,-50%)",
                whiteSpace: "nowrap", fontWeight: 900, fontSize: "clamp(6px,1.35vw,11px)", color: "#4a2c05",
                textShadow: "0 0 2px rgba(255,245,220,.8)" }}>じゅんびちゅう</span>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* マップ最下部「おうちのひとへ」（段階③・メモ09）: 保護者向けの入口。
          子どもの遊び導線（マップ内の9アイコン）とは視覚的に区別＝マップの外の帯・
          保護者トーン（うすむらさき・ParentGuideと同じ作法・保護者むけチップ）。ゲートは先の画面（ParentHub）にある */}
      <button type="button" onClick={() => { SFX.tap(sound); go("parenthub"); }}
        style={{ display: "flex", alignItems: "center", gap: 8, width: "calc(100% - 28px)", margin: "12px 14px 0",
          background: "#fff", border: "2px solid #3A3335", borderRadius: 16, cursor: "pointer",
          padding: "9px 14px", textAlign: "left", fontFamily: "inherit", color: "#3A3335" }}>
        <span style={{ fontSize: 17 }}>👨‍👩‍👧</span>
        <span style={{ flex: 1, fontWeight: 900, fontSize: 14 }}>おうちのひとへ</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#6B5B95", border: "1.5px solid #6B5B95", borderRadius: 999, padding: "1px 8px" }}>保護者むけ</span>
        <span style={{ fontSize: 13, opacity: .6 }}>›</span>
      </button>

      {/* タップ時ポップアップ: 場所名＋「へ いく」（ロック中は案内のみ）。
          背景ふわっと(fadein)＋パネル やさしくスケールイン(softpop)。文言はメモ02で確定＝変えない。 */}
      {area && (
        <div role="dialog" aria-modal="true" onClick={() => setPopup(null)} className="fadein"
          style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(58,51,53,.45)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel softpop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 320, width: "100%", padding: 20, textAlign: "center", background: "#FFFDF5" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
              {area.img
                ? <img src={area.img} alt="" draggable="false" style={{ width: 84, height: 84, objectFit: "contain" }} />
                : <span style={{ fontSize: 66, lineHeight: 1 }}>{area.emoji}</span>}
            </div>
            <div className="pl-display" style={{ fontSize: 23 }}>{area.place} へ いく</div>
            {areaLocked(area) ? (
              <>
                <div style={{ fontWeight: 800, fontSize: 14, margin: "10px 0" }}>
                  🔒 あいぼうが Lv{BATTLE_UNLOCK_LEVEL}に なると あそべるよ<br />
                  <span style={{ fontWeight: 700, fontSize: 12, color: "#6B6265" }}>（いま Lv{activeMon(save.partner) ? activeMon(save.partner).level : 1}。パズルや クイズで そだてよう！）</span>
                </div>
                <Btn bg="#fff" onClick={() => setPopup(null)}>とじる</Btn>
              </>
            ) : (
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 12 }}>
                <Btn big bg={C.leaf} onClick={() => { SFX.tap(sound); setPopup(null);
                  // みなと=交代（既存switchProfile経路・段階①のsetHome(null)込み）／おうち=モーダル／他=画面遷移
                  area.key === "harbor" ? onSwitchProfile() : area.key === "myhome" ? onOpenHome() : go(area.key); }}>▶ いく！</Btn>
                <Btn bg="#fff" onClick={() => setPopup(null)}>とじる</Btn>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
