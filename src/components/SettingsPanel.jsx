import { memo, useState } from "react";
import { readSettings, setSetting } from "../settings";
import { useTranslation } from "../i18n";

const LANGUAGES = [
  { code: "fr", label: "🇫🇷 Français" },
  { code: "en", label: "🇬🇧 English" },
];

const Toggle = ({ value, onChange, label, sublabel }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 0",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  }}>
    <div>
      <div style={{ fontSize: 8, color: "#e0e8ff", marginBottom: 4 }}>{label}</div>
      {sublabel && <div style={{ fontSize: 6, color: "#556" }}>{sublabel}</div>}
    </div>
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 48, height: 26, borderRadius: 13,
        background: value ? "#4A90D9" : "#333",
        position: "relative", cursor: "pointer",
        transition: "background 0.25s",
        flexShrink: 0, marginLeft: 12,
        boxShadow: value ? "0 0 10px rgba(74,144,217,0.5)" : "none",
      }}
    >
      <div style={{
        position: "absolute",
        top: 3, left: value ? 25 : 3,
        width: 20, height: 20,
        borderRadius: "50%",
        background: "#fff",
        transition: "left 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }} />
    </div>
  </div>
);

const SettingsPanel = memo(function SettingsPanel({ onClose }) {
  const [settings, setSettings] = useState(readSettings());
  const t = useTranslation();

  const update = (key, value) => {
    setSetting(key, value);
    setSettings(s => ({ ...s, [key]: value }));
    if (key === "language") {
      setTimeout(() => window.location.reload(), 300);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
      zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16, backdropFilter: "blur(4px)",
      fontFamily: "'Press Start 2P', monospace",
    }}>
      <div style={{
        background: "linear-gradient(160deg, #1a1a2e, #16213e)",
        borderRadius: 20, width: "100%", maxWidth: 340,
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>

        {/* HEADER */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.3)",
        }}>
          <div style={{ fontSize: 9, color: "#4A90D9", letterSpacing: 2 }}>
            {t("settings.title")}
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 20,
            cursor: "pointer", color: "#aaa",
          }}>✕</button>
        </div>

        <div style={{ padding: "4px 20px 20px" }}>

          {/* SONS */}
          <div style={{ fontSize: 6, color: "#4A90D9", letterSpacing: 2, padding: "14px 0 4px" }}>
            {t("settings.sounds")}
          </div>
          <Toggle
            value={settings.soundGame}
            onChange={v => update("soundGame", v)}
            label={t("settings.sound_game")}
            sublabel={t("settings.sound_game_sub")}
          />
          <Toggle
            value={settings.soundAnim}
            onChange={v => update("soundAnim", v)}
            label={t("settings.sound_anim")}
            sublabel={t("settings.sound_anim_sub")}
          />

          {/* HAPTIQUE */}
          <div style={{ fontSize: 6, color: "#4A90D9", letterSpacing: 2, padding: "14px 0 4px" }}>
            {t("settings.haptic")}
          </div>
          <Toggle
            value={settings.haptic}
            onChange={v => update("haptic", v)}
            label={t("settings.vibration")}
            sublabel={t("settings.vibration_sub")}
          />

          {/* LANGUE */}
          <div style={{ fontSize: 6, color: "#4A90D9", letterSpacing: 2, padding: "14px 0 8px" }}>
            {t("settings.language")}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => update("language", lang.code)}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  borderRadius: 10,
                  border: settings.language === lang.code
                    ? "2px solid #4A90D9"
                    : "2px solid rgba(255,255,255,0.1)",
                  background: settings.language === lang.code
                    ? "rgba(74,144,217,0.2)"
                    : "rgba(255,255,255,0.04)",
                  color: settings.language === lang.code ? "#4A90D9" : "#888",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 7,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 5, color: "#334", marginTop: 8, textAlign: "center" }}>
            ⚠️ Redémarre l'app pour appliquer
          </div>

        </div>
      </div>
    </div>
  );
});

export default SettingsPanel;
