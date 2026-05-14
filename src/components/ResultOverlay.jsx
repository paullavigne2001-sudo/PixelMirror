import { memo, useState, useEffect } from "react";
import { sounds } from "../sounds";

const ResultOverlay = memo(function ResultOverlay({ stars, levelName, onNext, onRetry }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);
  useEffect(() => {
    if (visible) {
      sounds.done();
      setTimeout(sounds.star, 500);
    }
  }, [visible]);

  const msgs = ["Essaie encore ! 💪", "Bien joué ! 👍", "Bien joué ! 👍", "PARFAIT ! 🎉"];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 60,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Press Start 2P', monospace",
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "30px 28px", textAlign: "center",
        minWidth: 260, maxWidth: 320,
        transform: visible ? "scale(1)" : "scale(0.4)",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
      }}>
        <div style={{ fontSize: 10, color: "#aaa", marginBottom: 8 }}>NIVEAU TERMINÉ !</div>
        <div style={{ fontSize: 13, marginBottom: 20 }}>{levelName}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 16, fontSize: 36 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              filter: i < stars ? "none" : "grayscale(1) opacity(0.25)",
              transform: visible && i < stars ? "scale(1.25)" : "scale(1)",
              transition: `transform 0.35s ${0.25 + i * 0.15}s`,
              display: "inline-block",
            }}>⭐</span>
          ))}
        </div>
        <div style={{ fontSize: 8, color: "#777", marginBottom: 22 }}>{msgs[stars]}</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => { sounds.next(); onRetry(); }} style={{
            background: "#eee", border: "none", borderRadius: 10, padding: "10px 14px",
            fontSize: 8, fontFamily: "'Press Start 2P', monospace", cursor: "pointer", color: "#555",
          }}>🔄 RETRY</button>
          <button onClick={() => { sounds.next(); onNext(); }} style={{
            background: "#4A90D9", border: "none", borderRadius: 10, padding: "10px 18px",
            fontSize: 8, fontFamily: "'Press Start 2P', monospace", cursor: "pointer", color: "#fff",
          }}>SUIVANT ▶</button>
        </div>
      </div>
    </div>
  );
});

export default ResultOverlay;
