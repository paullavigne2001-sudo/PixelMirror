import { memo, useState, useEffect } from "react";
import { sounds } from "../sounds";

function Particle({ x, emoji, delay, duration, size, rotation }) {
  return (
    <div style={{
      position: "absolute",
      left: `${x}%`,
      top: "-30px",
      fontSize: size,
      animation: `floatDown ${duration}s ease-in ${delay}s both`,
      pointerEvents: "none",
      zIndex: 0,
      transform: `rotate(${rotation}deg)`,
    }}>
      {emoji}
    </div>
  );
}

function AnimatedStar({ active, index, visible }) {
  return (
    <span style={{
      fontSize: 40,
      display: "inline-block",
      filter: active ? "none" : "grayscale(1) opacity(0.2)",
      transform: visible && active ? "scale(1) rotate(0deg)" : "scale(0.3) rotate(-30deg)",
      opacity: visible && active ? 1 : active ? 0.5 : 0.2,
      transition: active
        ? `transform 0.6s cubic-bezier(0.34,2.0,0.64,1) ${0.25 + index * 0.2}s, opacity 0.3s ${0.25 + index * 0.2}s`
        : "none",
      textShadow: active && visible
        ? "0 0 16px rgba(255,215,0,0.9), 0 0 32px rgba(255,165,0,0.6), 0 0 60px rgba(255,200,0,0.3)"
        : "none",
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
    2: ["✨", "⭐", "💫", "🌟"],
    3: ["🌟", "✨", "⭐", "💛", "🎉", "🌠", "⚡"],
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 60);
  }, []);

  useEffect(() => {
    if (!visible) return;
    sounds.done();

    const emojis = EMOJIS_BY_STARS[stars] || ["✨"];
    const count = stars === 3 ? 22 : stars === 2 ? 12 : 6;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 105 - 2,
      emoji: emojis[i % emojis.length],
      delay: Math.random() * 1.8,
      duration: 2.5 + Math.random() * 2,
      size: `${13 + Math.random() * 12}px`,
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);

    if (stars > 0) setTimeout(sounds.star, 500);
    if (stars === 3) setTimeout(sounds.star, 900);
    if (isNewMonthReward) setTimeout(() => setShowTrophy(true), 900);
  }, [visible]);

  const msgs = ["Essaie encore ! 💪", "Bien joué ! 👍", "Bien joué ! 👍", "PARFAIT ! 🎉"];

  // Couleurs selon étoiles
  const glowColor  = stars === 3 ? "rgba(255,200,0,0.22)" : stars === 2 ? "rgba(100,180,255,0.18)" : "rgba(180,180,180,0.12)";
  const glowBorder = stars === 3 ? "rgba(255,200,0,0.4)"  : stars === 2 ? "rgba(100,180,255,0.35)" : "rgba(180,180,180,0.2)";
  const rayColor1  = stars === 3 ? "rgba(255,215,0,0.12)" : stars === 2 ? "rgba(74,144,217,0.10)"  : "rgba(200,200,200,0.08)";
  const rayColor2  = stars === 3 ? "rgba(255,140,0,0.08)" : stars === 2 ? "rgba(135,206,235,0.07)" : "rgba(150,150,150,0.05)";

  return (
    <>
      <style>{`
        @keyframes floatDown {
          0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          70%  { opacity: 0.9; }
          100% { transform: translateY(110vh) rotate(180deg) scale(0.5); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 8px 40px rgba(0,0,0,0.3), 0 0 0 2px ${glowBorder}, 0 0 40px ${glowColor}; }
          50%       { box-shadow: 0 8px 40px rgba(0,0,0,0.3), 0 0 0 2px ${glowBorder}, 0 0 80px ${glowColor}; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rayRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bgPulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 60,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Press Start 2P', monospace",
      }}>

        {/* FOND RAYONNANT — couche 1 : blur + couleur */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          zIndex: 0,
        }} />

        {/* FOND RAYONNANT — couche 2 : rayons qui tournent */}
        {visible && stars >= 2 && (
          <div style={{
            position: "absolute",
            width: "200vmax", height: "200vmax",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: `conic-gradient(
              ${rayColor1} 0deg, transparent 20deg,
              ${rayColor2} 40deg, transparent 60deg,
              ${rayColor1} 80deg, transparent 100deg,
              ${rayColor2} 120deg, transparent 140deg,
              ${rayColor1} 160deg, transparent 180deg,
              ${rayColor2} 200deg, transparent 220deg,
              ${rayColor1} 240deg, transparent 260deg,
              ${rayColor2} 280deg, transparent 300deg,
              ${rayColor1} 320deg, transparent 340deg,
              ${rayColor2} 360deg
            )`,
            animation: `rayRotate ${stars === 3 ? "8s" : "14s"} linear infinite, bgPulse 3s ease-in-out infinite`,
            zIndex: 1,
            pointerEvents: "none",
          }} />
        )}

        {/* FOND RAYONNANT — couche 3 : halo central radial */}
        {visible && (
          <div style={{
            position: "absolute",
            width: "80vmax", height: "80vmax",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 65%)`,
            animation: "bgPulse 2s ease-in-out infinite",
            zIndex: 2,
            pointerEvents: "none",
          }} />
        )}

        {/* PARTICULES qui tombent */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", overflow: "hidden" }}>
          {particles.map(p => <Particle key={p.id} {...p} />)}
        </div>

        {/* CARTE RÉSULTAT */}
        <div style={{
          position: "relative",
          background: "#fff",
          borderRadius: 24,
          padding: "32px 28px",
          textAlign: "center",
          minWidth: 270, maxWidth: 320, width: "90%",
          zIndex: 4,
          transform: visible ? "scale(1)" : "scale(0.4)",
          opacity: visible ? 1 : 0,
          transition: visible
            ? "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s"
            : "none",
          animation: visible ? "pulseGlow 2.5s ease-in-out infinite" : "none",
        }}>

          {/* Halo interne sur la carte */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 24,
            background: `radial-gradient(ellipse at 50% 20%, ${glowColor} 0%, transparent 65%)`,
            pointerEvents: "none",
          }} />

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

            {/* Titre shimmer si 3 étoiles */}
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
                borderRadius: 14, padding: "14px", marginBottom: 18,
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
                fontFamily: "'Press Start 2P', monospace", cursor: "pointer", color: "#666",
              }}>🔄 RETRY</button>
              <button onClick={() => { sounds.next(); onNext(); }} style={{
                background: "linear-gradient(135deg, #4A90D9, #357ABD)",
                border: "none", borderRadius: 12, padding: "11px 20px", fontSize: 7,
                fontFamily: "'Press Start 2P', monospace", cursor: "pointer", color: "#fff",
                boxShadow: "0 4px 0 #2563a0",
              }}>SUIVANT ▶</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default ResultOverlay;
