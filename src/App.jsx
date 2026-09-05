import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { LEVELS } from "./levels";
import { sounds } from "./sounds";
import { useWindowWidth, usePersistedState } from "./hooks";
import { getActiveSeason } from "./seasons";
import { hapticDone, hapticStars, hapticButton } from "./settings";
import { useTranslation } from "./i18n";
import {
  getLevelForDate, getTodayEntry, completeDailyChallenge,
  getCurrentMonthData, todayKey,
} from "./daily";
import GridCell from "./components/GridCell";
import AdScreen from "./components/AdScreen";
import ResultOverlay from "./components/ResultOverlay";
import CompareAnimation from "./components/CompareAnimation";
import CatalogueScreen from "./components/CatalogueScreen";
import RewardsScreen from "./components/RewardsScreen";
import DailyCalendarScreen from "./components/DailyCalendarScreen";
import SettingsPanel from "./components/SettingsPanel";

// ─────────────────────────────────────────────
// FOND DYNAMIQUE
// ─────────────────────────────────────────────
function hexToRgb(hex) {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
}
function toPastel(r, g, b, s = 0.72) {
  return `rgb(${Math.round(r+(255-r)*s)},${Math.round(g+(255-g)*s)},${Math.round(b+(255-b)*s)})`;
}
function mixRgb(a, b, t = 0.15) {
  return [Math.round(a[0]+(b[0]-a[0])*t), Math.round(a[1]+(b[1]-a[1])*t), Math.round(a[2]+(b[2]-a[2])*t)];
}
function computeGameBackground(palette, season) {
  if (!palette?.length) return "linear-gradient(160deg, #c3dcf5 0%, #ddeeff 100%)";
  const c1 = hexToRgb(palette[0]);
  const c2 = hexToRgb(palette[palette.length - 1]);
  let tint = null;
  if (season?.accentColor) { try { tint = hexToRgb(season.accentColor); } catch {} }
  const m1 = tint ? mixRgb(c1, tint, 0.15) : c1;
  const m2 = tint ? mixRgb(c2, tint, 0.15) : c2;
  return `linear-gradient(160deg, ${toPastel(...m1, 0.70)} 0%, ${toPastel(...m2, 0.55)} 100%)`;
}

// ─────────────────────────────────────────────
// BOUTON PARAMÈTRES FLOTTANT
// Visible sur tous les écrans
// ─────────────────────────────────────────────
function FloatingSettingsButton({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      style={{
        position: "fixed",
        top: 14, right: 14,
        zIndex: 70,
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "50%",
        width: 40, height: 40,
        fontSize: 18,
        cursor: "pointer",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >⚙️</button>
  );
}

// ─────────────────────────────────────────────
// STYLE BOUTON COMMUN
// ─────────────────────────────────────────────
const btnStyle = {
  background: "rgba(0,0,0,0.55)",
  color: "#fff",
  border: "2px solid rgba(255,255,255,0.25)",
  borderRadius: 14,
  fontFamily: "'Press Start 2P', monospace",
  cursor: "pointer",
  width: "100%",
  backdropFilter: "blur(4px)",
  letterSpacing: 1,
};

// ─────────────────────────────────────────────
// ÉCRAN D'ACCUEIL
// ─────────────────────────────────────────────
function HomeScreen({ onPlay, onDailyCalendar, onRewards, onCatalogue }) {
  const season = getActiveSeason();
  const hasImage = !!season.backgroundImage;
  const monthData = getCurrentMonthData();
  const t = useTranslation();

  return (
    <div style={{
      minHeight: "100vh", position: "relative",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Press Start 2P', monospace",
      overflow: "hidden",
      background: hasImage ? "#000" : "linear-gradient(160deg, #c3dcf5 0%, #ddeeff 100%)",
    }}>
      {hasImage && (
        <img src={season.backgroundImage} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          imageRendering: "pixelated", zIndex: 0, border: "none", display: "block",
        }} />
      )}
      {hasImage && (
        <div style={{ position: "absolute", inset: 0, background: season.overlayColor, zIndex: 1 }} />
      )}

      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 14, padding: "0 24px", width: "100%", maxWidth: 360,
      }}>
        {/* TITRE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{
            fontSize: 18, color: season.titleColor, letterSpacing: 4, textAlign: "center",
            textShadow: hasImage ? "0 2px 12px rgba(0,0,0,0.8)" : "none",
          }}>PIXEL MIRROR</div>
          <div style={{
            fontSize: 7, color: season.taglineColor, letterSpacing: 2, textAlign: "center",
            textShadow: hasImage ? "0 1px 8px rgba(0,0,0,0.9)" : "none",
            lineHeight: 1.8, maxWidth: 260,
          }}>{season.tagline}</div>
        </div>

        {/* JOUER */}
        <button onClick={() => { hapticButton(); onPlay(); }} style={{
          ...btnStyle, padding: "16px 48px", fontSize: 12,
        }}>{t("home.play")}</button>

        {/* CATALOGUE */}
        <button onClick={() => { hapticButton(); onCatalogue(); }} style={{
          ...btnStyle, padding: "12px 20px", fontSize: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>📖</span>
            <div>CATALOGUE</div>
          </div>
        </button>

        {/* DÉFIS DU MOIS */}
        <button onClick={() => { hapticButton(); onDailyCalendar(); }} style={{
          ...btnStyle, padding: "14px 20px", fontSize: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>📅</span>
            <div style={{ textAlign: "left", flex: 1 }}>
              <div>{t("home.daily")}</div>
              {monthData.rewardUnlocked && (
                <div style={{ fontSize: 6, color: "#FFD700", marginTop: 5 }}>{t("home.cup_obtained")}</div>
              )}
            </div>
          </div>
        </button>

        {/* RÉCOMPENSES */}
        <button onClick={() => { hapticButton(); onRewards(); }} style={{
          ...btnStyle, padding: "12px 20px", fontSize: 8, color: "#FFD700",
          border: "2px solid rgba(255,215,0,0.3)",
        }}>{t("home.rewards")}</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ÉCRAN DE JEU
// ─────────────────────────────────────────────
function GameScreen({ onHome, dailyDate = null }) {
  const isDaily = !!dailyDate;
  const t = useTranslation();
  const [levelIdx, setLevelIdx] = usePersistedState("pag_levelIdx", 0);
  const level = isDaily
    ? getLevelForDate(dailyDate)
    : LEVELS[Math.min(levelIdx, LEVELS.length - 1)];

  const COLS = level.cols ?? 10;
  const ROWS = level.rows ?? 10;
  const totalCells = COLS * ROWS;

  const [userGrid, setUserGrid] = useState(() => Array(totalCells).fill(null));
  const [selectedColor, setSelectedColor] = useState(level.palette[0]);
  const isDrawing = useRef(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastStars, setLastStars] = useState(0);
  const [isNewMonthReward, setIsNewMonthReward] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [showCatalogue, setShowCatalogue] = useState(false);
  const [catalogue, setCatalogue] = usePersistedState("pag_catalogue", {});
  const completedCount = useRef(0);

  const screenW = useWindowWidth();
  const drawCell = Math.max(Math.floor((screenW - 32 - (COLS - 1) - 8) / COLS), 10);
  const modelCell = Math.max(Math.floor(drawCell * 0.42), 5);
  const season = getActiveSeason();
  const gameBg = useMemo(() => computeGameBackground(level.palette, season), [level.id, season.name]);

  useEffect(() => {
    setUserGrid(Array(totalCells).fill(null));
    setSelectedColor(level.palette[0]);
  }, [level.id, totalCells]);

  const paint = useCallback((idx) => {
    if (idx == null || isNaN(idx) || idx < 0 || idx >= totalCells) return;
    sounds.paint();
    setUserGrid(prev => {
      const next = [...prev];
      next[idx] = selectedColor === "eraser" ? null : selectedColor;
      return next;
    });
  }, [selectedColor, totalCells]);

  const handleCellMouseDown = useCallback((e) => {
    isDrawing.current = true;
    paint(parseInt(e.currentTarget.dataset.cellidx));
  }, [paint]);

  const handleCellMouseEnter = useCallback((e) => {
    if (!isDrawing.current) return;
    paint(parseInt(e.currentTarget.dataset.cellidx));
  }, [paint]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el?.dataset?.cellidx !== undefined) paint(parseInt(el.dataset.cellidx));
  }, [paint]);

  const handleDone = useCallback(() => { sounds.done(); hapticDone(); setShowCompare(true); }, []);

  const handleCompareFinished = useCallback((errCount) => {
    setShowCompare(false);
    const nonEmpty = level.grid.flat().filter(c => c !== null).length;
    let stars = 3;
    if (errCount > 0) stars = errCount > nonEmpty * 0.15 ? 1 : 2;
    setLastStars(stars);
    hapticStars(stars);
    setCatalogue(prev => ({ ...prev, [level.id]: Math.max(prev[level.id] ?? -1, stars) }));
    if (isDaily && stars > 0) {
      const { isNewMonthReward: newReward } = completeDailyChallenge(dailyDate, level.id, stars);
      setIsNewMonthReward(newReward);
    }
    setShowResult(true);
    completedCount.current += 1;
  }, [level, isDaily, dailyDate]);

  const goNext = useCallback(() => {
    if (isDaily) { onHome(); return; }
    setLevelIdx(i => Math.min(i + 1, LEVELS.length - 1));
  }, [isDaily]);

  const handleNext = useCallback(() => {
    hapticButton();
    setShowResult(false);
    if (!isDaily && completedCount.current % 3 === 0) setShowAd(true);
    else goNext();
  }, [goNext, isDaily]);

  const handleRetry = useCallback(() => {
    hapticButton();
    setShowResult(false);
    setUserGrid(Array(totalCells).fill(null));
  }, [totalCells]);

  const modelGridStyle = useMemo(() => ({
    display: "grid",
    gridTemplateColumns: `repeat(${COLS}, ${modelCell}px)`,
    gap: 1, background: "#7aadcc", padding: 3, borderRadius: 6,
    boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
  }), [COLS, modelCell]);

  return (
    <div
      style={{
        minHeight: "100vh", background: gameBg, transition: "background 0.6s ease",
        display: "flex", flexDirection: "column", alignItems: "center",
        fontFamily: "'Press Start 2P', monospace",
        userSelect: "none", paddingBottom: 32, overflowX: "hidden",
      }}
      onMouseUp={() => { isDrawing.current = false; }}
      onTouchEnd={() => { isDrawing.current = false; }}
    >
      {/* HEADER */}
      <div style={{
        width: "100%", maxWidth: 540, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "12px 16px", boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { hapticButton(); onHome(); }} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>🏠</button>
          {!isDaily && (
            <button onClick={() => setShowCatalogue(true)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>📖</button>
          )}
        </div>
        <div style={{ fontSize: 10, fontWeight: "bold", textAlign: "center" }}>
          {isDaily && (
            <div style={{ fontSize: 6, color: "#4A90D9", marginBottom: 4, letterSpacing: 1 }}>📅 {dailyDate}</div>
          )}
          {level.name}
          <div style={{ fontSize: 7, color: "#7a9abb", marginTop: 4 }}>{COLS}×{ROWS}</div>
        </div>
        <button onClick={() => { hapticButton(); setUserGrid(Array(totalCells).fill(null)); }} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#4A90D9" }}>🔄</button>
      </div>

      {/* MODEL + DONE */}
      <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 10, padding: "0 16px", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 7, color: "#4a6a8a", marginBottom: 5, letterSpacing: 1 }}>{t("game.model")}</div>
          <div style={modelGridStyle}>
            {level.grid.flat().map((c, i) => (
              <div key={i} style={{
                width: modelCell, height: modelCell,
                background: c || "rgba(255,255,255,0.82)",
                border: c ? "none" : "0.5px solid rgba(100,160,210,0.35)",
              }} />
            ))}
          </div>
        </div>
        <button onClick={handleDone} style={{
          background: "linear-gradient(90deg, #4A90D9, #357ABD)",
          color: "#fff", border: "none", borderRadius: 14,
          padding: "12px 16px", fontSize: 9,
          fontFamily: "'Press Start 2P', monospace", cursor: "pointer",
          boxShadow: "0 4px 0 #2563a0",
          writingMode: "vertical-rl", transform: "rotate(270deg)",
          letterSpacing: 2, minHeight: 80,marginLeft: 10,
        }}>{t("game.done_btn")}</button>
      </div>

      {/* DRAWING GRID */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 14, padding: "0 16px" }}>
        <div style={{ fontSize: 7, color: "#4a6a8a", marginBottom: 5, letterSpacing: 1 }}>{t("game.drawing")}</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, ${drawCell}px)`,
            gap: 1, background: "#7aadcc", padding: 4, borderRadius: 8,
            boxShadow: "0 3px 14px rgba(0,0,0,0.22)", cursor: "crosshair", touchAction: "none",
          }}
          onMouseLeave={() => { isDrawing.current = false; }}
          onTouchMove={handleTouchMove}
        >
          {userGrid.map((cellColor, idx) => (
            <GridCell key={idx} idx={idx} color={cellColor} size={drawCell}
              onPaint={handleCellMouseDown} onEnter={handleCellMouseEnter} />
          ))}
        </div>
      </div>

      {/* PALETTE */}
      <div style={{
        display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center",
        maxWidth: 540, padding: "0 16px", marginBottom: 18,
      }}>
        {level.palette.map(color => (
          <div key={color} onClick={() => setSelectedColor(color)} style={{
            width: 42, height: 42, background: color, borderRadius: 8,
            border: selectedColor === color ? "3px solid #fff" : "2px solid rgba(0,0,0,0.12)",
            boxShadow: selectedColor === color ? "0 0 0 3px #4A90D9" : "0 2px 5px rgba(0,0,0,0.14)",
            cursor: "pointer",
            transform: selectedColor === color ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.12s",
          }} />
        ))}
        <div onClick={() => setSelectedColor("eraser")} style={{
          width: 42, height: 42, background: "#fff", borderRadius: 8,
          border: selectedColor === "eraser" ? "3px solid #fff" : "2px solid rgba(0,0,0,0.12)",
          boxShadow: selectedColor === "eraser" ? "0 0 0 3px #4A90D9" : "none",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
          transform: selectedColor === "eraser" ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.12s",
        }}>🧹</div>
      </div>



      {showCompare && (
        <CompareAnimation target={level.grid} userGrid={userGrid} cols={COLS} rows={ROWS} onDone={handleCompareFinished} />
      )}
      {showResult && (
        <ResultOverlay
          stars={lastStars} levelName={level.name}
          onNext={handleNext} onRetry={handleRetry}
          isDaily={isDaily} isNewMonthReward={isNewMonthReward}
          trophyImg="/rewards/trophy.png"
        />
      )}
      {showAd && <AdScreen onDone={() => { setShowAd(false); goNext(); }} />}
      {showCatalogue && (
        <CatalogueScreen
          catalogue={catalogue}
          onClose={() => setShowCatalogue(false)}
          onPlay={id => { setLevelIdx(LEVELS.findIndex(l => l.id === id)); setShowCatalogue(false); }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// APP PRINCIPALE
// ─────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState(() => { const ret = localStorage.getItem("pag_return_screen"); if (ret) { localStorage.removeItem("pag_return_screen"); return ret; } return "home"; });
  const [dailyDate, setDailyDate] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showCatalogueHome, setShowCatalogueHome] = useState(false);
  const [catalogue, setCatalogue] = usePersistedState("pag_catalogue", {});

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

      {/* BOUTON PARAMÈTRES FLOTTANT — toujours visible */}
      {screen === "home" && !showCatalogueHome && <FloatingSettingsButton onOpen={() => { hapticButton(); setShowSettings(true); }} />}

      {screen === "home" && (
        <HomeScreen
          onPlay={() => setScreen("game")}
          onDailyCalendar={() => setScreen("calendar")}
          onRewards={() => setScreen("rewards")}
          onCatalogue={() => setShowCatalogueHome(true)}
        />
      )}
      {screen === "game" && (
        <GameScreen onHome={() => setScreen("home")} dailyDate={null} />
      )}
      {screen === "daily" && (
        <GameScreen onHome={() => setScreen("calendar")} dailyDate={dailyDate} />
      )}
      {screen === "calendar" && (
        <DailyCalendarScreen
          onClose={() => setScreen("home")}
          onPlay={(dateStr) => { setDailyDate(dateStr); setScreen("daily"); }}
        />
      )}
      {screen === "rewards" && (
        <RewardsScreen onClose={() => setScreen("home")} trophyImg="/rewards/trophy.png" />
      )}

      {/* CATALOGUE depuis l'accueil */}
      {showCatalogueHome && (
        <CatalogueScreen
          catalogue={catalogue}
          onClose={() => setShowCatalogueHome(false)}
          onPlay={id => {
            setShowCatalogueHome(false);
            setScreen("game");
          }}
        />
      )}

      {/* PANNEAU PARAMÈTRES */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} currentScreen={screen} />
      )}
    </>
  );
}
