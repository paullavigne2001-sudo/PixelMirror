import { memo, useState, useEffect, useMemo } from "react";
import { COLS, ROWS } from "../levels";

const CompareAnimation = memo(function CompareAnimation({ target, userGrid, onDone }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    let i = 0;
    const total = COLS * ROWS;
    const interval = setInterval(() => {
      if (i >= total) {
        clearInterval(interval);
        const errs = new Set();
        for (let r = 0; r < ROWS; r++)
          for (let c = 0; c < COLS; c++) {
            const idx = r * COLS + c;
            if (target[r][c] !== userGrid[idx]) errs.add(idx);
          }
        setErrors(errs);
        setTimeout(() => onDone(errs.size), 1600);
        return;
      }
      i++;
      setRevealedCount(i);
    }, 14);
    return () => clearInterval(interval);
  }, []);

  const flatTarget = useMemo(() => target.flat(), [target]);

  // Calcule la taille max des cellules pour que les 2 grilles
  // tiennent côte à côte dans l'écran :
  // screenW = 2 * (cs * COLS + (COLS-1)*1 + 3*2) + gap(12) + padding(32)
  const screenW = Math.min(
    typeof window !== "undefined" ? window.innerWidth : 360,
    500
  );
  const cs = Math.max(
    Math.floor((screenW - 32 - 12 - 2 * (COLS - 1 + 6)) / (2 * COLS)),
    8
  );

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${COLS}, ${cs}px)`,
    gap: 1,
    background: "#5a9abb",
    padding: 3,
    borderRadius: 6,
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 55,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", fontFamily: "'Press Start 2P', monospace", gap: 14,
      padding: "0 16px", boxSizing: "border-box",
    }}>
      <div style={{ color: "#fff", fontSize: 9, letterSpacing: 2 }}>
        {errors === null ? "VÉRIFICATION..." : "COMPARAISON ✓"}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>

        {/* MODÈLE */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 7, color: "#aaa", marginBottom: 5 }}>MODÈLE</div>
          <div style={gridStyle}>
            {flatTarget.map((c, i) => (
              <div key={i} style={{
                width: cs, height: cs,
                background: c || "rgba(255,255,255,0.12)",
              }} />
            ))}
          </div>
        </div>

        {/* TON DESSIN */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 7, color: "#aaa", marginBottom: 5 }}>TON DESSIN</div>
          <div style={gridStyle}>
            {flatTarget.map((c, i) => (
              <div key={i} style={{
                width: cs, height: cs,
                background: i < revealedCount
                  ? (userGrid[i] || "rgba(255,255,255,0.12)")
                  : "#444",
                border: errors && errors.has(i) ? "2px solid #ff2222" : "none",
                boxSizing: "border-box",
                transition: "background 0.08s",
              }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
});

export default CompareAnimation;
