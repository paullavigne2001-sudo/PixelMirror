import { memo, useState, useEffect, useRef } from "react";
import { sounds } from "../sounds";

// ── Particule flottante ───────────────────────
function Particle({ x, emoji, delay, duration, size }) {
  return (
    <div style={{
      position: "absolute",
      left: `${x}%`,
      bottom: "-10px",
      fontSize: size,
      animation: `floatUp ${duration}s ease-out ${delay}s both`,
      pointerEvents: "none",
      zIndex: 0,
    }}>
      {emoji}
    </div>
  );
}

// ── Étoile animée ─────────────────────────────
function AnimatedStar({ active, index, visible }) {
  return (
    <span style={{
      fontSize: 40,
      display: "inline-block",
      filter: active ? "none" : "grayscale(1) opacity(0.2)",
      transform: visible && active ? "scale(1)" : "scale(0.5)",
      opacity: visible && active ? 1 : active ? 0.5 : 0.2,
      transition: active
        ? `transform 0.5s cubic-bezier(0.34,1.8,0.64,1) ${0.2 + index * 0.18}s,
           opacity 0.3s ${0.2 + index * 0.18}s`
        : "none",
      textShadow: active && visible ? "0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,165,0,0.4)" : "none",
    }}>
      ⭐
    </span>
  );
}

const ResultOverlay = memo(function ResultOverlay({
  stars, levelName, onNext, onRetry,
  isDaily = false,
  isNewMonthReward = false,
  trophyImg = null,
}) {
  const [visible, setVisible] = useState(false);
  const [showTrophy, setShowTrophy] = useState(false);
  const [particles, setParticles] = useState([]);

  const EMOJIS_BY_STARS = {
    1: ["💫", "✨"],
    2: ["✨", "⭐", "💫"],
    3: ["🌟", "✨", "⭐", "💛", "🎉", "🌠"],
  };

  useEffect(() => {
    // Légère pause avant l'animation d'entrée
    setTimeout(() => setVisible(true), 60);
  }, []);

  useEffect(() => {
    if (!visible) return;
    sounds.done();

    // Génère les particules selon le nombre d'étoiles
    const emojis = EMOJIS_BY_STARS[stars] || ["✨"];
    const count = stars === 3 ? 18 : stars === 2 ? 10 : 5;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      emoji: emojis[i % emojis.length],
      delay: Math.random() * 1.2,
      duration: 2 + Math.random() * 1.5,
      size: `${14 + Math.random() * 10}px`,
    }));
    setParticles(newParticles);

    if (stars > 0) setTimeout(sounds.star, 500);
    if (stars === 3) setTimeout(sounds.star, 900);
    if (isNewMonthReward) setTimeout(() => setShowTrophy(true), 900);
  }, [visible]);

  const msgs = ["Essaie encore ! 💪", "Bien joué ! 👍", "Bien joué ! 👍", "PARFAIT ! 🎉"];

  // Couleur du halo selon les étoiles
  const glowColor = stars === 3
    ? "rgba(255,200,0,0.18)"
    : stars === 2
      ? "rgba(100,180,255,0.15)"
      : "rgba(180,180,180,0.10)";

  const glowBorder = stars === 3
    ? "rgba(255,200,0,0.35)"
    : stars === 2
      ? "rgba(100,180,255,0.3)"
      : "rgba(180,180,180,0.2)";

  return (
    <>
      {/* KEYFRAMES injectés dynamiquement */}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(-420px) rotate(${Math.random() > 0.5 ? "" : "-"}${20 + Math.random() * 30}deg) scale(0.6); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 30px ${glowColor}, 0 0 60px ${glowColor}; }
          50%       { box-shadow: 0 0 50px ${glowColor}, 0 0 90px ${glowColor}; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* FOND OVERLAY */}
      <div style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(3px)",
        zIndex: 60,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>

        {/* PARTICULES */}
        {particles.map(p => <Particle key={p.id} {...p} />)}

        {/* CARTE PRINCIPALE */}
        <div style={{
          position: "relative",
          background: "#fff",
          borderRadius: 24,
          padding: "32px 28px",
          textAlign: "center",
          minWidth: 270, maxWidth: 320, width: "90%",
          fontFamily: "'Press Start 2P', monospace",
          zIndex: 1,

          // Entrée avec rebond
          animation: visible ? "none" : "fadeIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
          transform: visible ? "scale(1)" : "scale(0.4)",
          opacity: visible ? 1 : 0,
          transition: visible
            ? "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s"
            : "none",

          // Halo lumineux animé
          boxShadow: `0 8px 40px rgba(0,0,0,0.3), 0 0 0 2px ${glowBorder}`,
          animation: visible ? `pulse 2.5s ease-in-out infinite` : "none",
        }}>

          {/* HALO RADIANT en arrière-plan de la carte */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 24,
            background: `radial-gradient(ellipse at 50% 30%, ${glowColor} 0%, transparent 70%)`,
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* CONTENU */}
          <div style={{ position: "relative", zIndex: 1 }}>

            {/* Badge défi du jour */}
            {isDaily && (
              <div style={{
                background: "linear-gradient(135deg, #4A90D9, #357ABD)",
                color: "#fff", borderRadius: 8, padding: "4px 10px",
                fontSize: 6, marginBottom: 14, display: "inline-block", letterSpacing: 1,
              }}>📅 DÉFI DU JOUR</div>
            )}

            <div style={{ fontSize: 8, color: "#bbb", marginBottom: 6, letterSpacing: 1 }}>
              NIVEAU TERMINÉ !
            </div>

            {/* Titre avec shimmer si 3 étoiles */}
            <div style={{
              fontSize: 11, marginBottom: 22, color: "#222",
              ...(stars === 3 && visible ? {
                background: "linear-gradient(90deg, #333 0%, #FFD700 40%, #FF8C00 60%, #333 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 2s linear infinite",
              } : {}),
            }}>
              {levelName}
            </div>

            {/* ÉTOILES */}
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 16 }}>
              {[0, 1, 2].map(i => (
                <AnimatedStar key={i} active={i < stars} index={i} visible={visible} />
              ))}
            </div>

            <div style={{ fontSize: 8, color: "#888", marginBottom: 20 }}>
              {msgs[stars]}
            </div>

            {/* Coupe du mois */}
            {isNewMonthReward && (
              <div style={{
                background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,165,0,0.08))",
                border: "1px solid rgba(255,215,0,0.4)",
                borderRadius: 14, padding: "14px",
                marginBottom: 18,
                transform: showTrophy ? "scale(1)" : "scale(0.4)",
                opacity: showTrophy ? 1 : 0,
                transition: "transform 0.55s cubic-bezier(0.34,1.8,0.64,1), opacity 0.4s",
              }}>
                <div style={{ fontSize: 7, color: "#FFD700", marginBottom: 8, letterSpacing: 1 }}>
                  🎉 COUPE DU MOIS DÉBLOQUÉE !
                </div>
                {trophyImg
                  ? <img src={trophyImg} alt="coupe" style={{ width: 64, height: 64, objectFit: "contain" }} />
                  : <div style={{ fontSize: 44 }}>🏆</div>
                }
              </div>
            )}

            {/* BOUTONS */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => { sounds.next(); onRetry(); }} style={{
                background: "#f0f0f0", border: "none", borderRadius: 12,
                padding: "11px 16px", fontSize: 7,
                fontFamily: "'Press Start 2P', monospace",
                cursor: "pointer", color: "#666",
                transition: "background 0.15s",
              }}>🔄 RETRY</button>
              <button onClick={() => { sounds.next(); onNext(); }} style={{
                background: "linear-gradient(135deg, #4A90D9, #357ABD)",
                border: "none", borderRadius: 12,
                padding: "11px 20px", fontSize: 7,
                fontFamily: "'Press Start 2P', monospace",
                cursor: "pointer", color: "#fff",
                boxShadow: "0 4px 0 #2563a0",
                transition: "transform 0.1s",
              }}>SUIVANT ▶</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default ResultOverlay;
