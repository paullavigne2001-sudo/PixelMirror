import { memo, useState } from "react";
import { getAllMonthlyRewards, monthName, daysInMonth } from "../daily";

const RewardsScreen = memo(function RewardsScreen({ onClose, trophyImg }) {
  const rewards = getAllMonthlyRewards();
  const hasAny = rewards.some(r => r.rewardUnlocked);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 60,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div style={{
        background: "linear-gradient(160deg, #1a1a2e, #16213e)",
        borderRadius: 20, width: "100%", maxWidth: 380,
        maxHeight: "90vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
        fontFamily: "'Press Start 2P', monospace",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,215,0,0.2)",
      }}>

        {/* HEADER */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.3)",
        }}>
          <div style={{ fontSize: 9, color: "#FFD700", letterSpacing: 2 }}>🏆 MES RÉCOMPENSES</div>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 20,
            cursor: "pointer", color: "#aaa",
          }}>✕</button>
        </div>

        {/* CONTENU */}
        <div style={{ overflowY: "auto", padding: 16 }}>

          {/* SECTION COUPES MENSUELLES */}
          <div style={{
            fontSize: 7, color: "#87CEEB", letterSpacing: 2,
            marginBottom: 14, marginTop: 4,
          }}>
            COUPES MENSUELLES
          </div>

          {rewards.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "24px 0",
              fontSize: 7, color: "#555", lineHeight: 2,
            }}>
              Complète tous les défis<br/>d'un mois pour gagner<br/>ta première coupe !
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {rewards.map(r => {
                const unlocked = r.rewardUnlocked;
                const pct = Math.round((r.daysCompleted.length / r.total) * 100);

                return (
                  <div key={r.monthKey} style={{
                    background: unlocked
                      ? "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,165,0,0.08))"
                      : "rgba(255,255,255,0.04)",
                    borderRadius: 12, padding: "12px 14px",
                    border: unlocked
                      ? "1px solid rgba(255,215,0,0.4)"
                      : "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", gap: 14,
                  }}>

                    {/* TROPHÉE */}
                    <div style={{
                      width: 52, height: 52, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      filter: unlocked ? "none" : "grayscale(1) opacity(0.25)",
                    }}>
                      {trophyImg ? (
                        <img src={trophyImg} alt="coupe"
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      ) : (
                        <span style={{ fontSize: 36 }}>🏆</span>
                      )}
                    </div>

                    {/* INFOS */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 8, color: unlocked ? "#FFD700" : "#aaa",
                        marginBottom: 6,
                      }}>
                        {monthName(r.monthKey)}
                      </div>

                      {unlocked ? (
                        <div style={{ fontSize: 6, color: "#FFD700" }}>
                          ✅ COUPE OBTENUE !
                        </div>
                      ) : (
                        <>
                          {/* Barre de progression */}
                          <div style={{
                            height: 6, borderRadius: 3,
                            background: "rgba(255,255,255,0.1)",
                            marginBottom: 4, overflow: "hidden",
                          }}>
                            <div style={{
                              height: "100%", borderRadius: 3,
                              width: `${pct}%`,
                              background: "linear-gradient(90deg, #4A90D9, #87CEEB)",
                              transition: "width 0.4s ease",
                            }} />
                          </div>
                          <div style={{ fontSize: 6, color: "#666" }}>
                            {r.daysCompleted.length} / {r.total} jours
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SECTION ÉVÉNEMENTS */}
          <div style={{
            fontSize: 7, color: "#87CEEB", letterSpacing: 2,
            marginBottom: 14, marginTop: 24,
          }}>
            ÉVÉNEMENTS
          </div>

          <div style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 12, padding: "16px",
            border: "1px dashed rgba(255,255,255,0.1)",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>🔒</div>
            <div style={{ fontSize: 6, color: "#555", lineHeight: 2 }}>
              Les récompenses d'événements<br/>arrivent bientôt !
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

export default RewardsScreen;
