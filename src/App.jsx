// ルート（v1から移植・マルチプロファイル対応）
import { useState } from "react";
import { CSS, C } from "./theme.js";
import { BADGES } from "./data/badges.js";
import { SFX } from "./sound.js";
import {
  listProfiles, createProfile, saveProfile, deleteProfile, setLastProfile,
  exportProfileJSON, importProfileJSON, today,
} from "./storage.js";
import { Btn, Toast } from "./components/common.jsx";
import ProfileSelect from "./components/ProfileSelect.jsx";
import ProfileCreate from "./components/ProfileCreate.jsx";
import WorldMap from "./components/WorldMap.jsx";
import MyHome from "./components/MyHome.jsx";
import Powers from "./components/Powers.jsx";
import Puzzle from "./components/Puzzle.jsx";
import Quiz from "./components/Quiz.jsx";
import Art from "./components/Art.jsx";
import Typing from "./components/Typing.jsx";
import Battle from "./components/Battle.jsx";
import Shop from "./components/Shop.jsx";
import Records from "./components/Records.jsx";
import PartnerSelect from "./components/PartnerSelect.jsx";
import Dex from "./components/Dex.jsx";
import EvolutionOverlay from "./components/EvolutionOverlay.jsx";
import { stageForLevel } from "./data/monsters.js";
import { grantLegacyCoins } from "./growth.js";
import { battleUnlocked, BATTLE_UNLOCK_LEVEL } from "./data/battle.js";

export default function App() {
  const [profiles, setProfiles] = useState(() => listProfiles());
  const [currentId, setCurrentId] = useState(null);
  const [screen, setScreen] = useState("select");
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [evolution, setEvolution] = useState(null);
  const [legacyCoins, setLegacyCoins] = useState(0); // 導入時「いままでのがんばり」換算の演出
  // 確認モード（開発・実機確認用の隠し機能）: 全パズル面を一時解放する。
  // 保護者ゲートの中でだけ切り替えられ、localStorageには保存しない（リロードでオフに戻る＝子どもの記録に残らない）
  const [unlockAll, setUnlockAll] = useState(false);

  const save = profiles.find(p => p.id === currentId) || null;

  function showToast(emoji, text) {
    setToast({ emoji, text }); setTimeout(() => setToast(null), 2800);
  }

  function update(fn) {
    setProfiles(prev => prev.map(p => {
      if (p.id !== currentId) return p;
      const next = fn(JSON.parse(JSON.stringify(p)));
      const earned = BADGES.filter(b => { try { return b.check(next); } catch (e) { return false; } }).map(b => b.id);
      const news = earned.filter(id => !p.badges.includes(id));
      // 一度とったバッジは、ステージ構成が変わっても失わない（P2でデータ構造が変わったため和集合に変更）
      next.badges = Array.from(new Set([...p.badges, ...earned]));
      if (news.length > 0) {
        const b = BADGES.find(x => x.id === news[0]);
        SFX.badge(next.settings.sound);
        showToast(b.emoji, `バッジ ゲット！「${b.name}」`);
      }
      // 相棒のレベルアップ・進化を検知（経験値の加算は各モードの applyXp が行う）
      if (p.partner && next.partner) {
        const fromStage = stageForLevel(p.partner.level);
        const toStage = stageForLevel(next.partner.level);
        if (toStage > fromStage) {
          // 進化の音は EvolutionOverlay が段階演出（溜め→渦→登場→ファンファーレ）に合わせて鳴らす
          setEvolution({ species: next.partner.species, from: fromStage, to: toStage });
        } else if (next.partner.level > p.partner.level) {
          SFX.levelup(next.settings.sound);
          // Lv3到達＝バトル解放の通知（レベルアップより うれしいお知らせ）
          if (p.partner.level < BATTLE_UNLOCK_LEVEL && next.partner.level >= BATTLE_UNLOCK_LEVEL) {
            showToast("⚔️", "バトルが あそべるように なったよ！");
          } else {
            showToast("⬆️", `レベルアップ！ Lv.${next.partner.level} に なった！`);
          }
        }
      }
      saveProfile(next);
      return next;
    }));
  }
  const onSound = () => update(s => { s.settings.sound = !s.settings.sound; return s; });

  function pickProfile(id) {
    setLastProfile(id);
    // 導入時の初回換算: このプロファイルが未換算なら、既存実績からコインをまとめて付与（1回だけ）
    const p = profiles.find(x => x.id === id);
    if (p && !p.coinsGranted) {
      const clone = JSON.parse(JSON.stringify(p));
      const gained = grantLegacyCoins(clone);
      saveProfile(clone);
      setProfiles(prev => prev.map(x => x.id === id ? clone : x));
      if (gained > 0) setLegacyCoins(gained);
    }
    setCurrentId(id); setScreen("home");
  }
  function handleCreate(name, avatar) {
    const p = createProfile(name, avatar);
    if (!p) return; // 上限（選択画面側でボタンを出さないので通常来ない）
    setProfiles(listProfiles());
    setCurrentId(p.id); setScreen("home");
  }
  function switchProfile() {
    setCurrentId(null); setScreen("select");
  }

  function handleExport() {
    const json = exportProfileJSON(save);
    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `progland-きろく-${save.name}-${today()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  async function handleImportFile(file) {
    const text = await file.text();
    const r = importProfileJSON(text);
    if (!r.ok) return `❌ ${r.reason}`;
    setProfiles(listProfiles());
    return `✅ 「${r.profile.name}」の きろくを 追加しました（じぶんを こうたいで 切り替えられます）`;
  }
  function doDeleteProfile() {
    deleteProfile(currentId);
    setProfiles(listProfiles());
    setConfirmDelete(false);
    setCurrentId(null); setScreen("select");
  }

  const noProfiles = profiles.length === 0;
  return (
    <div className="pl-root">
      <style>{CSS}</style>
      <Toast toast={toast} />
      {screen === "select" && (noProfiles
        ? <ProfileCreate onDone={handleCreate} />
        : <ProfileSelect profiles={profiles} onPick={pickProfile} onNew={() => setScreen("create")} />)}
      {screen === "create" && (
        <ProfileCreate onDone={handleCreate} onCancel={() => setScreen("select")} />
      )}
      {save && screen === "home" && !save.partner && (
        <PartnerSelect profileName={save.name} onPick={sp => update(s => {
          s.partner = { species: sp, xp: 0, level: 1 };
          const key = `${sp}-1`;
          if (!s.dex.includes(key)) s.dex.push(key);
          return s;
        })} />
      )}
      {/* ホーム＝ワールドマップ（worldmap-home フェーズ1）。screen名"home"を維持＝各モードの go("home") が自動でここへ戻る */}
      {save && screen === "home" && save.partner && <WorldMap save={save} go={setScreen} onSound={onSound} />}
      {save && screen === "myhome" && <MyHome save={save} go={setScreen} onSound={onSound} onSwitchProfile={switchProfile} />}
      {save && screen === "powers" && <Powers save={save} update={update} go={setScreen} onSound={onSound} />}
      {save && screen === "dex" && <Dex save={save} go={setScreen} onSound={onSound} />}
      {save && screen === "puzzle" && <Puzzle save={save} update={update} go={setScreen} onSound={onSound} unlockAll={unlockAll} />}
      {save && screen === "quiz" && <Quiz save={save} update={update} go={setScreen} onSound={onSound} />}
      {save && screen === "art" && <Art save={save} update={update} go={setScreen} onSound={onSound} />}
      {save && screen === "typing" && <Typing save={save} update={update} go={setScreen} onSound={onSound} />}
      {save && screen === "battle" && battleUnlocked(save) && <Battle save={save} update={update} go={setScreen} onSound={onSound} />}
      {save && screen === "shop" && <Shop save={save} update={update} go={setScreen} onSound={onSound} />}
      {save && screen === "records" && (
        <Records save={save} profiles={profiles} go={setScreen} onSound={onSound}
          onExport={handleExport} onImportFile={handleImportFile}
          onDeleteRequest={() => setConfirmDelete(true)}
          unlockAll={unlockAll} setUnlockAll={setUnlockAll} />
      )}
      <EvolutionOverlay evolution={evolution} sound={save ? save.settings.sound : false} onClose={() => setEvolution(null)} />
      {legacyCoins > 0 && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(58,51,53,.55)", zIndex: 115, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel pop" style={{ padding: 26, maxWidth: 380, textAlign: "center", background: "#FFFDF5" }}>
            <div style={{ fontSize: 48 }}>🪙✨</div>
            <div className="pl-display" style={{ fontSize: 22 }}>いままでの がんばり ぶん！</div>
            <div style={{ fontWeight: 800, fontSize: 15, margin: "10px 0" }}>
              これまでの ほし・クイズ・タイピングなどの がんばりで<br />
              <span style={{ fontSize: 26, fontWeight: 900 }}>🪙 {legacyCoins} コイン</span><br />もらえたよ！
            </div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", marginBottom: 14 }}>「おみせ」で どうぐや おしゃれと こうかんできるよ 🛍️</div>
            <Btn big bg={C.leaf} onClick={() => setLegacyCoins(0)}>やったー！</Btn>
          </div>
        </div>
      )}
      {confirmDelete && save && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(58,51,53,.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel pop" style={{ padding: 24, maxWidth: 360, textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>⚠️</div>
            <div style={{ fontWeight: 900, fontSize: 17, margin: "6px 0" }}>「{save.name}」の きろくを ぜんぶ けしますか？</div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 14 }}>ほし・バッジ・さくひん・きろくが すべて きえます。もとに もどせません。（ほかの プロファイルは きえません）</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <Btn bg="#fff" onClick={() => setConfirmDelete(false)}>やめる</Btn>
              <Btn bg="#FFB3B3" onClick={doDeleteProfile}>けす</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
