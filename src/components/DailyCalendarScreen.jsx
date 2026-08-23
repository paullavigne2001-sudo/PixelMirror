import { useTranslation } from "../i18n";
import { memo, useState } from "react";
import { useTranslation } from "../i18n";
import {
  monthName, daysInMonth, getLevelForDate, getEntryForDate,
  isDatePlayable, getMonthData, getAccessibleMonths,
  formatDate, DAY_NAMES,
} from "../daily";

const DailyCalendarScreen = memo(function DailyCalendarScreen({ onClose, onPlay }) {
  const accessibleMonths = getAccessibleMonths(3);
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0);
  const t = useTranslation();
  const ym = accessibleMonths[currentMonthIdx];
  const monthData = getMonthData(ym);
  const [y, m] = ym.split("-").map(Number);

  // Premier jour du mois (0=dim, 1=lun, ..., 6=sam) → converti en lundi=0
  const firstDayRaw = new Date(y, m - 1, 1).getDay();
  const firstDay = (firstDayRaw + 6) % 7; // lundi = 0

  const totalDays = daysInMonth(ym);
  const today = formatDate(new Date());

  // Progression du mois

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 60,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div style={{
        background: "linear-gradient(160deg, #1a1a2e, #16213e)",
        borderRadius: 20, width: "100%", maxWidth: 380,
        maxHeight: "92vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
        fontFamily: "'Press Start 2P', monospace",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
        border: "1px solid rgba(74,144,217,0.3)",
      }}>

        {/* HEADER */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.3)",
        }}>
          <div style={{ fontSize: 8, color: "#4A90D9", letterSpacing: 2 }}>{t("calendar.title")}</div>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#aaa",
          }}>✕</button>
        </div>

        <div style={{ overflowY: "auto", padding: "14px 16px" }}>

          {/* NAVIGATION MOIS */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 14,
          }}>
            <button
              onClick={() => setCurrentMonthIdx(i => Math.min(i + 1, accessibleMonths.length - 1))}
              disabled={currentMonthIdx >= accessibleMonths.length - 1}
              style={{
                background: "none", border: "none", fontSize: 18, cursor: "pointer",
                color: currentMonthIdx >= accessibleMonths.length - 1 ? "#333" : "#4A90D9",
                padding: "4px 8px",
              }}
            >◀</button>
            <div style={{ fontSize: 8, color: "#fff", textAlign: "center" }}>
              {monthName(ym)}
            </div>
            <button
              onClick={() => setCurrentMonthIdx(i => Math.max(i - 1, 0))}
              disabled={currentMonthIdx <= 0}
              style={{
                background: "none", border: "none", fontSize: 18, cursor: "pointer",
                color: currentMonthIdx <= 0 ? "#333" : "#4A90D9",
                padding: "4px 8px",
              }}
            >▶</button>
          </div>

          {/* EN-TÊTES JOURS */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3,
            marginBottom: 4,
          }}>
            {DAY_NAMES.map(d => (
              <div key={d} style={{
                textAlign: "center", fontSize: 5, color: "#555", padding: "2px 0",
              }}>{d}</div>
            ))}
          </div>

          {/* GRILLE CALENDRIER */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3,
            marginBottom: 16,
          }}>
            {/* Cases vides avant le 1er */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Jours du mois */}
            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${ym}-${String(day).padStart(2, "0")}`;
              const entry = getEntryForDate(dateStr);
              const done = entry?.completed;
              const playable = isDatePlayable(dateStr);
              const isToday = dateStr === today;
              const level = playable ? getLevelForDate(dateStr) : null;

              return (
                <div
                  key={day}
                  onClick={() => {
                    if (!playable) return;
                    onPlay(dateStr, level);
                  }}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 8,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    cursor: playable ? "pointer" : "default",
                    background: done
                      ? "rgba(65,117,5,0.4)"
                      : isToday
                        ? "rgba(74,144,217,0.3)"
                        : playable
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(255,255,255,0.02)",
                    border: done
                      ? "1px solid rgba(100,200,50,0.5)"
                      : isToday
                        ? "2px solid #4A90D9"
                        : playable
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid rgba(255,255,255,0.03)",
                    transition: "background 0.15s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Miniature pixel art si disponible */}
                  {playable && level && (
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "grid",
                      gridTemplateColumns: `repeat(${level.cols ?? 10}, 1fr)`,
                      opacity: done ? 0.5 : 0.2,
                      overflow: "hidden",
                    }}>
                      {level.grid.flat().map((c, idx) => (
                        <div key={idx} style={{ background: c || "transparent" }} />
                      ))}
                    </div>
                  )}

                  {/* Numéro du jour */}
                  <div style={{
                    position: "relative", zIndex: 1,
                    fontSize: 7,
                    color: done ? "#88dd44" : isToday ? "#4A90D9" : playable ? "#ccc" : "#444",
                    fontWeight: isToday ? "bold" : "normal",
                  }}>{day}</div>

                  {/* Étoiles si complété */}
                  {done && (
                    <div style={{
                      position: "relative", zIndex: 1, fontSize: 5, marginTop: 1,
                    }}>
                      {[0,1,2].map(s => (
                        <span key={s} style={{
                          filter: s < entry.stars ? "none" : "grayscale(1) opacity(0.3)",
                        }}>⭐</span>
                      ))}
                    </div>
                  )}

                  {/* Cadenas si futur */}
                  {!playable && (
                    <div style={{ fontSize: 8, color: "#333" }}>🔒</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* LÉGENDE */}
          <div style={{
            display: "flex", gap: 12, flexWrap: "wrap",
            fontSize: 5, color: "#555", justifyContent: "center",
          }}>
            <span><span style={{ color: "#88dd44" }}>■</span>{t("calendar.legend_done")}</span>
            <span><span style={{ color: "#4A90D9" }}>■</span>{t("calendar.legend_today")}</span>
            <span><span style={{ color: "#666" }}>■</span>{t("calendar.legend_available")}</span>
            <span><span style={{ color: "#333" }}>🔒</span>{t("calendar.legend_future")}</span>
          </div>

        </div>
      </div>
    </div>
  );
});

export default DailyCalendarScreen;
