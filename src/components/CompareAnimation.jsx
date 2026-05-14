import { memo, useState, useEffect, useMemo } from "react";
import { COLS, ROWS } from "../levels";

const CompareAnimation = memo(function CompareAnimation({ target, userGrid, drawCell, onDone }) {
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
  const cs = Math.min(drawCell, 20);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 55,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", fontFamily: "'Press Start 2P', monospace", gap: 16,
    }}>
      <div style={{ color: "#fff", fontSize: 9, letterSpacing: 2 }}>
        {errors === null ? "VÉRIFICATION..." : "COMPARAISON ✓"}
      </div>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        {[
          {
            label: "MODÈLE",
            getCellBg: (c) => c || "rgba(255,255,255,0.12)",
            getBorder: () => "none",
          },
          {
            label: "TON DESSIN",
            getCellBg: (_, i) => i < revealedCount ? (userGrid[i] || "rgba(255,255,255,0.12)") : "#444",
            getBorder: (_, i) => errors && errors.has(i) ? "2px solid #ff2222" : "none",
          },
        ].map(({ label, getCellBg, getBorder }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 7, color: "#aaa", marginBottom: 5 }}>{label}</div>
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, ${cs}px)`,
              gap: 1, background: "#5a9abb", padding: 3, borderRadius: 6,
            }}>
              {flatTarget.map((c, i) => (
                <div key={i} style={{
                  width: cs, height: cs,
                  background: getCellBg(c, i),
                  border: getBorder(c, i),
                  boxSizing: "border-box",
                  transition: "background 0.08s",
                }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default CompareAnimation;
