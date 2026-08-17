import { memo, useState, useEffect } from "react";
import { sounds } from "../sounds";

function Particle({ x, emoji, delay, duration, size }) {
  return (
    <div style={{
      position: "absolute",
      left: `${x}%`,
      top: "-30px",
      fontSize: size,
      animation: `floatDown ${duration}s ease-in ${delay}s both`,
      pointerEvents: "none",
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
        ? "0 0 16px rgba(255,215,0,0.9), 0 0 32px rgba(255,165,0,0.6)"
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

  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);

  useEffect(() => {
    if (!visible) return;
    sounds.done();
    const emojis = EMOJIS_BY_STARS[stars] || ["✨"];
    const count = stars === 3 ? 22 : stars === 2 ? 12 : 6;
    setParticles(Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 105 - 2,
      emoji: emojis[i % emojis.length],
      delay: Math.random() * 1.8,
      duration: 2.5 + Math.random() * 2,
      size: `${13 + Math.random() * 12}px`,
    })));
    if (stars > 0) setTimeout(sounds.star, 500);
    if (stars === 3) setTimeout(sounds.star, 900);
    if (isNewMonthReward) setTimeout(() => setShowTrophy(true), 900);
  }, [visible]);

  const msgs = ["Essaie encore ! 💪", "Bien joué ! 👍", "Bien joué ! 👍", "PARFAIT ! 🎉"];

  // Couleurs selon étoiles
  const rayColor1  = stars === 3 ? "rgba(255,215,0,0.22)"  : stars === 2 ? "rgba(74,144,217,0.18)"   : "rgba(200,200,200,0.10)";
  const rayColor2  = stars === 3 ? "rgba(255,140,0,0.12)"  : stars === 2 ? "rgba(135,206,235,0.10)"  : "rgba(150,150,150,0.05)";
  const glowColor  = stars === 3 ? "rgba(255,200,0,0.22)"  : stars === 2 ? "rgba(100,180,255,0.18)"  : "rgba(180,180,180,0.10)";
  const glowBorder = stars === 3 ? "rgba(255,200,0,0.45)"  : stars === 2 ? "rgba(100,180,255,0.35)"  : "rgba(180,180,180,0.2)";
  const raySpeed   = stars === 3 ? "7s" : "13s";

  return (
    <>
      <style>{`
        @keyframes floatDown {
          0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          70%  { opacity: 0.9; }
          100% { transform: translateY(110vh) rotate(200deg) scale(0.5); opacity: 0; }
        }
        @keyframes rayRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 8px 40px rgba(0,0,0,0.35), 0 0 0 2px ${glowBorder}, 0 0 50px ${glowColor}; }
          50%       { box-shadow: 0 8px 40px rgba(0,0,0,0.35), 0 0 0 2px ${glowBorder}, 0 0 100px ${glowColor}; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes haloBreath {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.9; transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>

      {/* FOND PLEIN ÉCRAN */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 60,
        background: "rgba(10,10,20,0.82)",
        backdropFilter: "blur(5px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Press Start 2P', monospace",
      }}>

        {/* PARTICULES qui tombent */}
        {particles.map(p => <Particle key={p.id} {...p} />)}

        {/* WRAPPER centré — sert d'ancre pour les rayons */}
        <div style={{ position: "relative", zIndex: 2 }}>

          {/* RAYONS — positionnés par rapport au centre du wrapper */}
          {visible && (
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "220vmax",
              height: "220vmax",
              animation: `rayRotate ${raySpeed} linear infinite`,
              zIndex: 0,
              pointerEvents: "none",
              background: `conic-gradient(
                ${rayColor1} 0deg,   transparent 12deg,
                ${rayColor2} 25deg,  transparent 37deg,
                ${rayColor1} 50deg,  transparent 62deg,
                ${rayColor2} 75deg,  transparent 87deg,
                ${rayColor1} 100deg, transparent 112deg,
                ${rayColor2} 125deg, transparent 137deg,
                ${rayColor1} 150deg, transparent 162deg,
                ${rayColor2} 175deg, transparent 187deg,
                ${rayColor1} 200deg, transparent 212deg,
                ${rayColor2} 225deg, transparent 237deg,
                ${rayColor1} 250deg, transparent 262deg,
                ${rayColor2} 275deg, transparent 287deg,
                ${rayColor1} 300deg, transparent 312deg,
                ${rayColor2} 325deg, transparent 337deg,
                ${rayColor1} 350deg, transparent 360deg
              )`,
            }} />
          )}

          {/* HALO RADIAL doux au centre — par-dessus les rayons, devant le fond */}
          {visible && (
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: "90vmax", height: "90vmax",
              borderRadius: "50%",
              background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 65%)`,
              animation: "haloBreath 3s ease-in-out infinite",
              zIndex: 1,
              pointerEvents: "none",
            }} />
          )}

          {/* CARTE — par-dessus les rayons */}
          <div style={{
            position: "relative",
            background: "#fff",
            borderRadius: 24,
            padding: "32px 28px",
            textAlign: "center",
            minWidth: 270, maxWidth: 320, width: "90vw",
            zIndex: 2,
            transform: visible ? "scale(1)" : "scale(0.4)",
            opacity: visible ? 1 : 0,
            transition: visible
              ? "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s"
              : "none",
            animation: visible ? "cardGlow 2.5s ease-in-out infinite" : "none",
          }}>

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

            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 16 }}>
              {[0, 1, 2].map(i => (
                <AnimatedStar key={i} active={i < stars} index={i} visible={visible} />
              ))}
            </div>

            <div style={{ fontSize: 8, color: "#888", marginBottom: 20 }}>{msgs[stars]}</div>

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
