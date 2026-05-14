import { memo, useState, useEffect } from "react";

const AdScreen = memo(function AdScreen({ onDone }) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count === 0) { onDone(); return; }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#111", zIndex: 100,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", fontFamily: "'Press Start 2P', monospace",
    }}>
      <div style={{ fontSize: 10, color: "#aaa", marginBottom: 16, letterSpacing: 2 }}>
        PUBLICITÉ
      </div>
      <div style={{
        width: 260, height: 160, background: "#1e1e1e", borderRadius: 12,
        border: "2px solid #333", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 10,
      }}>
        <div style={{ fontSize: 32 }}>🎮</div>
        <div style={{ fontSize: 8, color: "#666", textAlign: "center" }}>espace pub simulé</div>
      </div>
      <div style={{
        marginTop: 20, background: "#222", borderRadius: 8,
        padding: "8px 18px", fontSize: 10, color: "#FFD700",
      }}>
        Fermer dans {count}s
      </div>
    </div>
  );
});

export default AdScreen;
