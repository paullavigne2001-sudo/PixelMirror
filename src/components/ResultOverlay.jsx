import { memo, useState, useEffect } from "react";
import { sounds } from "../sounds";

const ResultOverlay = memo(function ResultOverlay({
  stars, levelName, onNext, onRetry,
  isDaily = false,           // true si c'est le défi du jour
  isNewMonthReward = false,  // true si la coupe du mois vient d'être débloquée
  trophyImg = null,
}) {
  const [visible, setVisible] = useState(false);
  const [showTrophy, setShowTrophy] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);
  useEffect(() => {
    if (visible) {
      sounds.done();
      setTimeout(sounds.star, 500);
      // Si nouvelle coupe → apparition décalée
      if (isNewMonthReward) setTimeout(() => setShowTrophy(true), 800);
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
        background: "#fff", borderRadius: 20, padding: "28px 24px", textAlign: "center",
        minWidth: 260, maxWidth: 320, width: "90%",
        transform: visible ? "scale(1)" : "scale(0.4)",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
      }}>

        {/* Badge défi du jour */}
        {isDaily && (
          <div style={{
            background: "linear-gradient(135deg, #4A90D9, #357ABD)",
            color: "#fff", borderRadius: 8, padding: "4px 10px",
            fontSize: 6, marginBottom: 12, display: "inline-block",
            letterSpacing: 1,
          }}>
            📅 DÉFI DU JOUR
          </div>
        )}

        <div style={{ fontSize: 9, color: "#aaa", marginBottom: 8 }}>NIVEAU TERMINÉ !</div>
        <div style={{ fontSize: 12, marginBottom: 18, color: "#333" }}>{levelName}</div>

        {/* Étoiles */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 14, fontSize: 34 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              filter: i < stars ? "none" : "grayscale(1) opacity(0.25)",
              transform: visible && i < stars ? "scale(1.25)" : "scale(1)",
              transition: `transform 0.35s ${0.25 + i * 0.15}s`,
              display: "inline-block",
            }}>⭐</span>
          ))}
        </div>

        <div style={{ fontSize: 7, color: "#777", marginBottom: 16 }}>{msgs[stars]}</div>

        {/* Coupe du mois débloquée */}
        {isNewMonthReward && (
          <div style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,165,0,0.08))",
            border: "1px solid rgba(255,215,0,0.4)",
            borderRadius: 12, padding: "12px",
            marginBottom: 16,
            transform: showTrophy ? "scale(1)" : "scale(0.5)",
            opacity: showTrophy ? 1 : 0,
            transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s",
          }}>
            <div style={{ fontSize: 7, color: "#FFD700", marginBottom: 8, letterSpacing: 1 }}>
              🎉 COUPE DU MOIS DÉBLOQUÉE !
            </div>
            {trophyImg ? (
              <img src={trophyImg} alt="coupe"
                style={{ width: 60, height: 60, objectFit: "contain" }}
              />
            ) : (
              <div style={{ fontSize: 40 }}>🏆</div>
            )}
          </div>
        )}

        {/* Boutons */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => { sounds.next(); onRetry(); }} style={{
            background: "#eee", border: "none", borderRadius: 10, padding: "10px 14px",
            fontSize: 7, fontFamily: "'Press Start 2P', monospace", cursor: "pointer", color: "#555",
          }}>🔄 RETRY</button>
          <button onClick={() => { sounds.next(); onNext(); }} style={{
            background: "#4A90D9", border: "none", borderRadius: 10, padding: "10px 18px",
            fontSize: 7, fontFamily: "'Press Start 2P', monospace", cursor: "pointer", color: "#fff",
          }}>SUIVANT ▶</button>
        </div>
      </div>
    </div>
  );
});

export default ResultOverlay;
