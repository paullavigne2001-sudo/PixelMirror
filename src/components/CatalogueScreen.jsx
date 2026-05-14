import { memo } from "react";
import { LEVELS } from "../levels";

const CatalogueScreen = memo(function CatalogueScreen({ catalogue, onClose, onPlay }) {
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
          <span style={{ fontSize: 10 }}>📖 CATALOGUE</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ overflowY: "auto", padding: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {LEVELS.map(lvl => {
              const stars = catalogue[lvl.id] ?? -1;
              const done = stars >= 0;
              return (
                <div key={lvl.id} onClick={() => done && onPlay(lvl.id)} style={{
                  background: done ? "#fff" : "#e8eef5",
                  borderRadius: 12, padding: "10px 6px", textAlign: "center",
                  cursor: done ? "pointer" : "default",
                  border: done ? "2px solid #d0dcea" : "2px dashed #c0ccd8",
                  opacity: done ? 1 : 0.5,
                  boxShadow: done ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}>
                  <div style={{ fontSize: 26, marginBottom: 5 }}>{done ? lvl.emoji : "🔒"}</div>
                  <div style={{ fontSize: 6, color: "#555", marginBottom: 6 }}>
                    {done ? lvl.name : `LVL ${lvl.id}`}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 1, fontSize: 10 }}>
                    {done
                      ? [0, 1, 2].map(i => (
                          <span key={i} style={{ filter: i < stars ? "none" : "grayscale(1) opacity(0.25)" }}>⭐</span>
                        ))
                      : <span style={{ fontSize: 8, color: "#bbb" }}>—</span>
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CatalogueScreen;
