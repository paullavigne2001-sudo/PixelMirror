import { memo, useState } from "react";
import { LEVELS } from "../levels";
import { EVENTS, isEventActive, isEventOver } from "../seasons";
import { useTranslation } from "../i18n";

function groupByEvent(levels) {
  const groups = {};
  levels.forEach(l => {
    if (!groups[l.eventId]) {
      const event = EVENTS[l.eventId] || {};
      groups[l.eventId] = {
        eventId:   l.eventId,
        eventName: event.eventName  || l.eventId,
        eventStart:event.eventStart || "",
        eventEnd:  event.eventEnd   || "",
        emoji:     event.emoji      || "🎮",
        rewardImg: event.rewardImg  || null,
        levels: [],
      };
    }
    groups[l.eventId].levels.push(l);
  });
  return Object.values(groups);
}

function LevelThumb({ level }) {
  const cols = level.cols ?? 10;
  const size = cols > 15 ? 1 : cols > 10 ? 2 : 4;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, ${size}px)`,
      gap: 0, background: "#ccc", padding: 2, borderRadius: 3,
      width: "fit-content", margin: "0 auto 5px",
    }}>
      {level.grid.flat().map((c, i) => (
        <div key={i} style={{ width: size, height: size, background: c || "rgba(255,255,255,0.5)" }} />
      ))}
    </div>
  );
}

const CatalogueScreen = memo(function CatalogueScreen({ catalogue, onClose, onPlay }) {
  const [tab, setTab] = useState("standard");
  const t = useTranslation();
  const standardLevels = LEVELS.filter(l => !l.type || l.type === "standard");
  const eventLevels    = LEVELS.filter(l => l.type === "event");
  const eventGroups    = groupByEvent(eventLevels);

  const tabStyle = (active) => ({
    flex: 1, padding: "10px 4px", fontSize: 7,
    fontFamily: "'Press Start 2P', monospace",
    cursor: "pointer", border: "none",
    borderBottom: active ? "3px solid #4A90D9" : "3px solid transparent",
    background: "none", color: active ? "#4A90D9" : "#aaa",
    letterSpacing: 1, transition: "color 0.2s",
  });

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div style={{
        background: "#f2f6fa", borderRadius: 20, width: "100%", maxWidth: 380,
        maxHeight: "88vh", overflow: "hidden", display: "flex", flexDirection: "column",
        fontFamily: "'Press Start 2P', monospace", boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px", background: "#fff", borderBottom: "2px solid #e0e8f0",
        }}>
          <span style={{ fontSize: 10 }}>{t("catalogue.title")}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #e0e8f0" }}>
          <button style={tabStyle(tab === "standard")} onClick={() => setTab("standard")}>{t("catalogue.standards")}</button>
          <button style={tabStyle(tab === "event")} onClick={() => setTab("event")}>{t("catalogue.events")}</button>
        </div>

        <div style={{ overflowY: "auto", padding: 14, flex: 1 }}>

          {tab === "standard" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {standardLevels.map(lvl => {
                const stars = catalogue[lvl.id] ?? -1;
                const done  = stars >= 0;
                return (
                  <div key={lvl.id} onClick={() => done && onPlay(lvl.id)} style={{
                    background: done ? "#fff" : "#e8eef5", borderRadius: 12,
                    padding: "10px 6px", textAlign: "center",
                    cursor: done ? "pointer" : "default",
                    border: done ? "2px solid #d0dcea" : "2px dashed #c0ccd8",
                    opacity: done ? 1 : 0.5,
                    boxShadow: done ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                  }}>
                    {done ? <LevelThumb level={lvl} /> : <div style={{ fontSize: 26, marginBottom: 5 }}>🔒</div>}
                    <div style={{ fontSize: 6, color: "#555", marginBottom: 6 }}>{done ? lvl.name : `LVL ${lvl.id}`}</div>
                    <div style={{ display: "flex", justifyContent: "center", gap: 1, fontSize: 10 }}>
                      {done
                        ? [0,1,2].map(i => <span key={i} style={{ filter: i < stars ? "none" : "grayscale(1) opacity(0.25)" }}>⭐</span>)
                        : <span style={{ fontSize: 8, color: "#bbb" }}>—</span>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "event" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {eventGroups.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 0", fontSize: 7, color: "#aaa", lineHeight: 2 }}>
                  {t("catalogue.no_event")}
                </div>
              ) : eventGroups.map(group => {
                const active   = isEventActive(group.eventId);
                const over     = isEventOver(group.eventId);
                const upcoming = !active && !over;
                const completedCount = group.levels.filter(l => (catalogue[l.id] ?? -1) >= 0).length;
                const allDone = completedCount === group.levels.length && group.levels.length > 0;
                const statusLabel = active ? t("catalogue.active") : over ? t("catalogue.over") : t("catalogue.upcoming");
                const statusColor = active ? "#417505" : over ? "#888" : "#4A90D9";
                const statusBg    = active ? "rgba(65,117,5,0.12)" : over ? "rgba(0,0,0,0.06)" : "rgba(74,144,217,0.12)";

                return (
                  <div key={group.eventId}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 9, marginBottom: 4 }}>{group.emoji} {group.eventName}</div>
                        {group.eventStart && (
                          <div style={{ fontSize: 6, color: "#888" }}>
                            {group.eventStart.split("-").reverse().join("/")} → {group.eventEnd.split("-").reverse().join("/")}
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: 6, padding: "5px 8px", borderRadius: 6, background: statusBg, color: statusColor, border: `1px solid ${statusColor}44` }}>
                        {statusLabel}
                      </div>
                    </div>

                    {!upcoming && (
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ height: 6, borderRadius: 3, background: "rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: 4 }}>
                          <div style={{
                            height: "100%", borderRadius: 3,
                            width: `${group.levels.length > 0 ? Math.round(completedCount / group.levels.length * 100) : 0}%`,
                            background: allDone ? "linear-gradient(90deg, #FFD700, #FFA500)" : "linear-gradient(90deg, #4A90D9, #87CEEB)",
                          }} />
                        </div>
                        <div style={{ fontSize: 6, color: "#888" }}>
                          {completedCount}/{group.levels.length} {completedCount > 1 ? t("catalogue.completeds") : t("catalogue.completed")}{allDone ? " 🏆" : ""}
                        </div>
                      </div>
                    )}

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                      {group.levels.map(lvl => {
                        const stars    = catalogue[lvl.id] ?? -1;
                        const done     = stars >= 0;
                        const playable = active || done;
                        return (
                          <div key={lvl.id} onClick={() => playable && onPlay(lvl.id)} style={{
                            background: done ? "#fff" : playable ? "#f0f4f8" : "#e8eef5",
                            borderRadius: 12, padding: "10px 6px", textAlign: "center",
                            cursor: playable ? "pointer" : "default",
                            border: done ? "2px solid #d0dcea" : playable ? "2px solid #c8dcea" : "2px dashed #c0ccd8",
                            opacity: playable ? 1 : 0.4,
                            boxShadow: done ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                          }}>
                            {done ? <LevelThumb level={lvl} /> : <div style={{ fontSize: 22, marginBottom: 5 }}>{playable ? "🎨" : "🔒"}</div>}
                            <div style={{ fontSize: 6, color: "#555", marginBottom: 6 }}>{lvl.name}</div>
                            <div style={{ display: "flex", justifyContent: "center", gap: 1, fontSize: 10 }}>
                              {done
                                ? [0,1,2].map(i => <span key={i} style={{ filter: i < stars ? "none" : "grayscale(1) opacity(0.25)" }}>⭐</span>)
                                : <span style={{ fontSize: 7, color: "#bbb" }}>—</span>
                              }
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CatalogueScreen;