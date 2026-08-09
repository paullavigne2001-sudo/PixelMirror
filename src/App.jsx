import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { LEVELS } from "./levels";
import { sounds } from "./sounds";
import { useWindowWidth, usePersistedState } from "./hooks";
import { getActiveSeason } from "./seasons";
import GridCell from "./components/GridCell";
import AdScreen from "./components/AdScreen";
import ResultOverlay from "./components/ResultOverlay";
import CompareAnimation from "./components/CompareAnimation";
import CatalogueScreen from "./components/CatalogueScreen";

// ─────────────────────────────────────────────
// HAPTIQUE
// ─────────────────────────────────────────────
function hapticDone() {
  try { navigator.vibrate([40, 30, 40]); } catch {}
}
function hapticStars(count) {
  try {
    if (count === 3) navigator.vibrate([30, 20, 30, 20, 30]);
    else if (count === 2) navigator.vibrate([30, 20, 30]);
    else navigator.vibrate(60);
  } catch {}
}
function hapticButton() {
  try { navigator.vibrate(18); } catch {}
}

// ─────────────────────────────────────────────
// ÉCRAN D'ACCUEIL SAISONNIER
// ─────────────────────────────────────────────
function HomeScreen({ onPlay }) {
  const season = getActiveSeason();
  const hasImage = !!season.backgroundImage;

  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Press Start 2P', monospace",
      overflow: "hidden",
      // Fond par défaut si pas d'image
      background: hasImage
        ? "#000"
        : "linear-gradient(160deg, #c3dcf5 0%, #ddeeff 100%)",
    }}>

      {/* IMAGE DE FOND plein écran */}
      {hasImage && (
        <img
          src={season.backgroundImage}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            imageRendering: "pixelated",
            zIndex: 0,
          }}
        />
      )}

      {/* OVERLAY semi-transparent pour lisibilité */}
      {hasImage && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: season.overlayColor,
          zIndex: 1,
        }} />
      )}

      {/* CONTENU par-dessus l'image */}
      <div style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        padding: "0 24px",
      }}>

        {/* TITRE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          {season.emoji && (
            <div style={{ fontSize: 36 }}>{season.emoji}</div>
          )}
          <div style={{
            fontSize: 18,
            color: season.titleColor,
            letterSpacing: 4,
            textAlign: "center",
            textShadow: hasImage ? "0 2px 12px rgba(0,0,0,0.8)" : "none",
          }}>
            PIXEL MIRROR
          </div>
          <div style={{
            width: 60, height: 2,
            background: season.titleColor,
            borderRadius: 1,
            opacity: 0.6,
          }} />
          <div style={{
            fontSize: 7,
            color: season.taglineColor,
            letterSpacing: 2,
            textAlign: "center",
            textShadow: hasImage ? "0 1px 8px rgba(0,0,0,0.9)" : "none",
            lineHeight: 1.8,
            maxWidth: 260,
          }}>
            {season.tagline}
          </div>
        </div>

        {/* BOUTON JOUER */}
        <button
          onClick={() => { hapticButton(); onPlay(); }}
          style={{
            background: season.buttonBg,
            color: season.buttonColor,
            border: "none",
            borderRadius: 14,
            padding: "16px 48px",
            fontSize: 12,
            fontFamily: "'Press Start 2P', monospace",
            cursor: "pointer",
            boxShadow: `0 5px 0 ${season.buttonShadow}, 0 8px 24px rgba(0,0,0,0.4)`,
            letterSpacing: 2,
          }}
        >
          ▶ JOUER
        </button>
      </div>

      {/* COPYRIGHT en bas */}
      <div style={{
        position: "absolute",
        bottom: 16,
        fontSize: 6,
        color: hasImage ? "rgba(255,255,255,0.4)" : "#aaa",
        zIndex: 2,
        textShadow: hasImage ? "0 1px 4px rgba(0,0,0,0.8)" : "none",
      }}>
        © MoviSoft Co.,Ltd. — Fan Recreation
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ÉCRAN DE JEU
// ─────────────────────────────────────────────
function GameScreen({ onHome }) {
  const [levelIdx, setLevelIdx] = usePersistedState("pag_levelIdx", 0);
  const [userGrid, setUserGrid] = useState(() => Array(10 * 10).fill(null));
  const [selectedColor, setSelectedColor] = useState(null);
  const isDrawing = useRef(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastStars, setLastStars] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [showCatalogue, setShowCatalogue] = useState(false);
  const [catalogue, setCatalogue] = usePersistedState("pag_catalogue", {});
  const completedCount = useRef(0);

  const level = LEVELS[Math.min(levelIdx, LEVELS.length - 1)];
  const COLS = level.cols ?? 10;
  const ROWS = level.rows ?? 10;
  const totalCells = COLS * ROWS;

  const screenW = useWindowWidth();
  const drawCell = Math.max(Math.floor((screenW - 32 - (COLS - 1) - 8) / COLS), 10);
  const modelCell = Math.max(Math.floor(drawCell * 0.42), 5);

  useEffect(() => {
    setUserGrid(Array(totalCells).fill(null));
    setSelectedColor(level.palette[0]);
  }, [levelIdx, totalCells]);

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
    setCatalogue(prev => ({ ...prev, [level.id]: Math.max(prev[level.id] ?? -1, stars) }));
    hapticStars(stars);
    setShowResult(true);
    completedCount.current += 1;
  }, [level]);

  const goNext = useCallback(() => {
    setLevelIdx(i => Math.min(i + 1, LEVELS.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    hapticButton();
    setShowResult(false);
    if (completedCount.current % 3 === 0) setShowAd(true);
    else goNext();
  }, [goNext]);

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
        minHeight: "100vh",
        background: "linear-gradient(160deg, #c3dcf5 0%, #ddeeff 100%)",
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
          <button onClick={() => setShowCatalogue(true)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>📖</button>
        </div>
        <div style={{ fontSize: 10, fontWeight: "bold", textAlign: "center" }}>
          Level {level.id} — {level.name}
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
              key={idx}
              idx={idx}
              color={cellColor}
              size={drawCell}
              onPaint={handleCellMouseDown}
              onEnter={handleCellMouseEnter}
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
      }}>
        DONE ✓
      </button>

      <div style={{ fontSize: 6, color: "#aaa", marginTop: 6 }}>© MoviSoft Co.,Ltd. — Fan Recreation</div>

      {showCompare && (
        <CompareAnimation target={level.grid} userGrid={userGrid} cols={COLS} rows={ROWS} onDone={handleCompareFinished} />
      )}
      {showResult && (
        <ResultOverlay stars={lastStars} levelName={level.name} onNext={handleNext} onRetry={handleRetry} />
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
  const [screen, setScreen] = useState("home");
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      {screen === "home"
        ? <HomeScreen onPlay={() => setScreen("game")} />
        : <GameScreen onHome={() => setScreen("home")} />
      }
    </>
  );
}
