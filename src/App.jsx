// ルート（v1から移植・マルチプロファイル対応）
import { useState } from "react";
import { CSS } from "./theme.js";
import { BADGES } from "./data/badges.js";
import { SFX } from "./sound.js";
import {
  listProfiles, createProfile, saveProfile, deleteProfile, setLastProfile,
  exportProfileJSON, importProfileJSON, today,
} from "./storage.js";
import { Btn, Toast } from "./components/common.jsx";
import ProfileSelect from "./components/ProfileSelect.jsx";
import ProfileCreate from "./components/ProfileCreate.jsx";
import Home from "./components/Home.jsx";
import Puzzle from "./components/Puzzle.jsx";
import Quiz from "./components/Quiz.jsx";
import Art from "./components/Art.jsx";
import Records from "./components/Records.jsx";
import PartnerSelect from "./components/PartnerSelect.jsx";
import Dex from "./components/Dex.jsx";
import EvolutionOverlay from "./components/EvolutionOverlay.jsx";
import { stageForLevel } from "./data/monsters.js";

export default function App() {
  const [profiles, setProfiles] = useState(() => listProfiles());
  const [currentId, setCurrentId] = useState(null);
  const [screen, setScreen] = useState("select");
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [evolution, setEvolution] = useState(null);

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
          SFX.evolve(next.settings.sound);
          setEvolution({ species: next.partner.species, from: fromStage, to: toStage });
        } else if (next.partner.level > p.partner.level) {
          SFX.levelup(next.settings.sound);
          showToast("⬆️", `レベルアップ！ Lv.${next.partner.level} に なった！`);
        }
      }
      saveProfile(next);
      return next;
    }));
  }
  const onSound = () => update(s => { s.settings.sound = !s.settings.sound; return s; });

  function pickProfile(id) {
    setCurrentId(id); setLastProfile(id); setScreen("home");
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
      {save && screen === "home" && save.partner && <Home save={save} go={setScreen} onSound={onSound} onSwitchProfile={switchProfile} />}
      {save && screen === "dex" && <Dex save={save} go={setScreen} onSound={onSound} />}
      {save && screen === "puzzle" && <Puzzle save={save} update={update} go={setScreen} onSound={onSound} />}
      {save && screen === "quiz" && <Quiz save={save} update={update} go={setScreen} onSound={onSound} />}
      {save && screen === "art" && <Art save={save} update={update} go={setScreen} onSound={onSound} />}
      {save && screen === "records" && (
        <Records save={save} go={setScreen} onSound={onSound}
          onExport={handleExport} onImportFile={handleImportFile}
          onDeleteRequest={() => setConfirmDelete(true)} />
      )}
      <EvolutionOverlay evolution={evolution} onClose={() => setEvolution(null)} />
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
