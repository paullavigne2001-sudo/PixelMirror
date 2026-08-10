import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { LEVELS } from "./levels";
import { sounds } from "./sounds";
import { useWindowWidth, usePersistedState } from "./hooks";
import { getActiveSeason } from "./seasons";
import {
  getDailyLevel, getTodayEntry, completeDailyChallenge,
  getCurrentMonthData, todayKey,
} from "./daily";
import GridCell from "./components/GridCell";
import AdScreen from "./components/AdScreen";
import ResultOverlay from "./components/ResultOverlay";
import CompareAnimation from "./components/CompareAnimation";
import CatalogueScreen from "./components/CatalogueScreen";
import RewardsScreen from "./components/RewardsScreen";

// ─────────────────────────────────────────────
// HAPTIQUE
// ─────────────────────────────────────────────
function hapticDone() { try { navigator.vibrate([40, 30, 40]); } catch {} }
function hapticStars(count) {
  try {
    if (count === 3) navigator.vibrate([30, 20, 30, 20, 30]);
    else if (count === 2) navigator.vibrate([30, 20, 30]);
    else navigator.vibrate(60);
  } catch {}
}
function hapticButton() { try { navigator.vibrate(18); } catch {} }

// ─────────────────────────────────────────────
// COULEUR DE FOND DYNAMIQUE
// ─────────────────────────────────────────────
function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}
function toPastel(r, g, b, strength = 0.72) {
  return `rgb(${Math.round(r + (255 - r) * strength)},${Math.round(g + (255 - g) * strength)},${Math.round(b + (255 - b) * strength)})`;
}
function mixRgb(a, b, ratio = 0.15) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * ratio),
    Math.round(a[1] + (b[1] - a[1]) * ratio),
    Math.round(a[2] + (b[2] - a[2]) * ratio),
  ];
}
function computeGameBackground(palette, season) {
  if (!palette || palette.length === 0) return "linear-gradient(160deg, #c3dcf5 0%, #ddeeff 100%)";
  const col1 = hexToRgb(palette[0]);
  const col2 = hexToRgb(palette[palette.length - 1]);
  let seasonTint = null;
  if (season?.accentColor) { try { seasonTint = hexToRgb(season.accentColor); } catch {} }
  const mixed1 = seasonTint ? mixRgb(col1, seasonTint, 0.15) : col1;
  const mixed2 = seasonTint ? mixRgb(col2, seasonTint, 0.15) : col2;
  return `linear-gradient(160deg, ${toPastel(...mixed1, 0.70)} 0%, ${toPastel(...mixed2, 0.55)} 100%)`;
}

// ─────────────────────────────────────────────
// ÉCRAN D'ACCUEIL
// ─────────────────────────────────────────────
function HomeScreen({ onPlay, onDaily, onRewards }) {
  const season = getActiveSeason();
  const hasImage = !!season.backgroundImage;
  const dailyEntry = getTodayEntry();
  const dailyDone = dailyEntry?.completed === true;
  const monthData = getCurrentMonthData();
  const dailyLevel = getDailyLevel();

  return (
    <div style={{
      minHeight: "100vh", position: "relative",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Press Start 2P', monospace",
      overflow: "hidden",
      background: hasImage ? "#000" : "linear-gradient(160deg, #c3dcf5 0%, #ddeeff 100%)",
    }}>

      {/* IMAGE DE FOND */}
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

      {/* CONTENU */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 20, padding: "0 24px", width: "100%", maxWidth: 360,
      }}>

        {/* TITRE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
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

        {/* BOUTON JOUER */}
        <button onClick={() => { hapticButton(); onPlay(); }} style={{
          background: season.buttonBg, color: season.buttonColor,
          border: "none", borderRadius: 14, padding: "16px 48px",
          fontSize: 12, fontFamily: "'Press Start 2P', monospace", cursor: "pointer",
          boxShadow: `0 5px 0 ${season.buttonShadow}, 0 8px 24px rgba(0,0,0,0.4)`,
          letterSpacing: 2, width: "100%",
        }}>▶ JOUER</button>

        {/* BOUTON DÉFI DU JOUR */}
        <button onClick={() => { hapticButton(); onDaily(); }} style={{
          background: dailyDone
            ? "rgba(65,117,5,0.85)"
            : "rgba(0,0,0,0.55)",
          color: "#fff", border: dailyDone
            ? "2px solid rgba(100,200,50,0.6)"
            : "2px solid rgba(255,255,255,0.25)",
          borderRadius: 14, padding: "14px 20px",
          fontSize: 8, fontFamily: "'Press Start 2P', monospace", cursor: "pointer",
          width: "100%", letterSpacing: 1,
          backdropFilter: "blur(4px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{ fontSize: 16 }}>{dailyDone ? "✅" : "📅"}</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ marginBottom: 4 }}>
                {dailyDone ? "DÉFI DU JOUR FAIT !" : "DÉFI DU JOUR"}
              </div>
              <div style={{ fontSize: 6, color: "rgba(255,255,255,0.6)", fontWeight: "normal" }}>
                {dailyLevel.name} — {monthData.daysCompleted.length}/{monthData.total} jours ce mois
              </div>
            </div>
          </div>
        </button>

        {/* BOUTON RÉCOMPENSES */}
        <button onClick={() => { hapticButton(); onRewards(); }} style={{
          background: "rgba(0,0,0,0.4)",
          color: "#FFD700",
          border: "2px solid rgba(255,215,0,0.3)",
          borderRadius: 14, padding: "12px 20px",
          fontSize: 8, fontFamily: "'Press Start 2P', monospace", cursor: "pointer",
          width: "100%", letterSpacing: 1,
          backdropFilter: "blur(4px)",
        }}>
          🏆 MES RÉCOMPENSES
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ÉCRAN DE JEU
// ─────────────────────────────────────────────
function GameScreen({ onHome, isDaily = false }) {
  const dailyLevel = getDailyLevel();

  const [levelIdx, setLevelIdx] = usePersistedState("pag_levelIdx", 0);
  const [userGrid, setUserGrid] = useState(() => Array(10 * 10).fill(null));
  const [selectedColor, setSelectedColor] = useState(null);
  const isDrawing = useRef(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastStars, setLastStars] = useState(0);
  const [isNewMonthReward, setIsNewMonthReward] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [showCatalogue, setShowCatalogue] = useState(false);
  const [catalogue, setCatalogue] = usePersistedState("pag_catalogue", {});
  const completedCount = useRef(0);

  // En mode défi du jour, on force le niveau du jour
  const level = isDaily
    ? dailyLevel
    : LEVELS[Math.min(levelIdx, LEVELS.length - 1)];

  const COLS = level.cols ?? 10;
  const ROWS = level.rows ?? 10;
  const totalCells = COLS * ROWS;

  const screenW = useWindowWidth();
  const drawCell = Math.max(Math.floor((screenW - 32 - (COLS - 1) - 8) / COLS), 10);
  const modelCell = Math.max(Math.floor(drawCell * 0.42), 5);

  const season = getActiveSeason();
  const gameBg = useMemo(
    () => computeGameBackground(level.palette, season),
    [level.id, season.name]
  );

  useEffect(() => {
    setUserGrid(Array(totalCells).fill(null));
    setSelectedColor(level.palette[0]);
  }, [level.id, totalCells]);

  const paint = useCallback((idx) => {
    if (idx === null || idx === undefined || isNaN(idx) || idx < 0 || idx >= totalCells) return;
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

  const handleDone = useCallback(() => {
    sounds.done();
    hapticDone();
    setShowCompare(true);
  }, []);

  const handleCompareFinished = useCallback((errCount) => {
    setShowCompare(false);
    const nonEmpty = level.grid.flat().filter(c => c !== null).length;
    let stars = 3;
    if (errCount > 0) stars = errCount > nonEmpty * 0.15 ? 1 : 2;
    setLastStars(stars);
    hapticStars(stars);

    // Mise à jour catalogue
    setCatalogue(prev => ({ ...prev, [level.id]: Math.max(prev[level.id] ?? -1, stars) }));

    // Défi du jour : enregistre la complétion
    if (isDaily && stars > 0) {
      const { isNewMonthReward: newReward } = completeDailyChallenge(level.id, stars);
      setIsNewMonthReward(newReward);
    }

    setShowResult(true);
    completedCount.current += 1;
  }, [level, isDaily]);

  const goNext = useCallback(() => {
    if (isDaily) { onHome(); return; } // après le défi du jour → retour accueil
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
          {isDaily && <div style={{ fontSize: 6, color: "#4A90D9", marginBottom: 4, letterSpacing: 1 }}>📅 DÉFI DU JOUR</div>}
          {level.name}
          <div style={{ fontSize: 7, color: "#7a9abb", marginTop: 4 }}>{COLS}×{ROWS}</div>
        </div>
        <button onClick={() => { hapticButton(); setUserGrid(Array(totalCells).fill(null)); }} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#4A90D9" }}>🔄</button>
      </div>

      {/* MODEL */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 7, color: "#4a6a8a", marginBottom: 5, letterSpacing: 1 }}>MODÈLE</div>
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

      {/* DRAWING GRID */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 14, padding: "0 16px" }}>
        <div style={{ fontSize: 7, color: "#4a6a8a", marginBottom: 5, letterSpacing: 1 }}>TON DESSIN</div>
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
            <GridCell
              key={idx} idx={idx} color={cellColor} size={drawCell}
              onPaint={handleCellMouseDown} onEnter={handleCellMouseEnter}
            />
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

      {/* DONE */}
      <button onClick={handleDone} style={{
        background: "linear-gradient(135deg, #4A90D9, #357ABD)",
        color: "#fff", border: "none", borderRadius: 14, padding: "14px 52px",
        fontSize: 12, fontFamily: "'Press Start 2P', monospace", cursor: "pointer",
        boxShadow: "0 5px 0 #2563a0, 0 8px 20px rgba(74,144,217,0.35)",
        letterSpacing: 1, marginBottom: 8,
      }}>DONE ✓</button>

      {showCompare && (
        <CompareAnimation target={level.grid} userGrid={userGrid} cols={COLS} rows={ROWS} onDone={handleCompareFinished} />
      )}
      {showResult && (
        <ResultOverlay
          stars={lastStars}
          levelName={level.name}
          onNext={handleNext}
          onRetry={handleRetry}
          isDaily={isDaily}
          isNewMonthReward={isNewMonthReward}
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
  // "home" | "game" | "daily" | "rewards"
  const [screen, setScreen] = useState("home");

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

      {screen === "home" && (
        <HomeScreen
          onPlay={() => setScreen("game")}
          onDaily={() => setScreen("daily")}
          onRewards={() => setScreen("rewards")}
        />
      )}
      {screen === "game" && (
        <GameScreen onHome={() => setScreen("home")} isDaily={false} />
      )}
      {screen === "daily" && (
        <GameScreen onHome={() => setScreen("home")} isDaily={true} />
      )}
      {screen === "rewards" && (
        <RewardsScreen
          onClose={() => setScreen("home")}
          trophyImg="/rewards/trophy.png"
        />
      )}
    </>
  );
}
