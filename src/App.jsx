import { useState, useRef, useCallback, useMemo } from "react";
import { LEVELS, COLS, ROWS } from "./levels";
import { sounds } from "./sounds";
import { useWindowWidth, usePersistedState } from "./hooks";
import GridCell from "./components/GridCell";
import AdScreen from "./components/AdScreen";
import ResultOverlay from "./components/ResultOverlay";
import CompareAnimation from "./components/CompareAnimation";
import CatalogueScreen from "./components/CatalogueScreen";

export default function App() {
  const [levelIdx, setLevelIdx] = usePersistedState("pag_levelIdx", 0);
  const [userGrid, setUserGrid] = useState(() => Array(COLS * ROWS).fill(null));
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
  const screenW = useWindowWidth();

  const drawCell = Math.max(Math.floor((screenW - 32 - (COLS - 1) - 8) / COLS), 20);
  const modelCell = Math.max(Math.floor(drawCell * 0.42), 8);

  const paint = useCallback((idx) => {
    if (idx === null || idx === undefined || isNaN(idx) || idx < 0 || idx >= COLS * ROWS) return;
    sounds.paint();
    setUserGrid(prev => {
      const next = [...prev];
      next[idx] = selectedColor === "eraser" ? null : selectedColor;
      return next;
    });
  }, [selectedColor]);

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
    setShowCompare(true);
  }, []);

  const handleCompareFinished = useCallback((errCount) => {
    setShowCompare(false);
    const nonEmpty = level.grid.flat().filter(c => c !== null).length;
    let stars = 3;
    if (errCount > 0) stars = errCount > nonEmpty * 0.15 ? 1 : 2;
    setLastStars(stars);
    setCatalogue(prev => ({ ...prev, [level.id]: Math.max(prev[level.id] ?? -1, stars) }));
    setShowResult(true);
    completedCount.current += 1;
  }, [level]);

  const goNext = useCallback(() => {
    setLevelIdx(i => Math.min(i + 1, LEVELS.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setShowResult(false);
    if (completedCount.current % 3 === 0) setShowAd(true);
    else goNext();
  }, [goNext]);

  const handleRetry = useCallback(() => {
    setShowResult(false);
    setUserGrid(Array(COLS * ROWS).fill(null));
  }, []);

  const modelGridStyle = useMemo(() => ({
    display: "grid",
    gridTemplateColumns: `repeat(${COLS}, ${modelCell}px)`,
    gap: 1, background: "#7aadcc", padding: 3, borderRadius: 6,
    boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
  }), [modelCell]);

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
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{
        width: "100%", maxWidth: 540, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "12px 16px", boxSizing: "border-box",
      }}>
        <button onClick={() => setShowCatalogue(true)} style={{ background: "none", border: "none", fontSize: 26, cursor: "pointer" }}>📖</button>
        <div style={{ fontSize: 11, fontWeight: "bold", textAlign: "center" }}>
          Level {level.id} — {level.name}
        </div>
        <button onClick={() => setUserGrid(Array(COLS * ROWS).fill(null))} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#4A90D9" }}>🔄</button>
      </div>

      {/* MODEL — small, on top */}
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

      {/* DRAWING GRID — large, below */}
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
        <CompareAnimation target={level.grid} userGrid={userGrid} drawCell={drawCell} onDone={handleCompareFinished} />
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
