import { memo, useState, useEffect, useRef } from "react";

const GridCell = memo(function GridCell({ color, size, onPaint, onEnter, idx }) {
  const [bouncing, setBouncing] = useState(false);
  const prevColor = useRef(color);

  useEffect(() => {
    if (color !== prevColor.current) {
      prevColor.current = color;
      setBouncing(true);
      const t = setTimeout(() => setBouncing(false), 160);
      return () => clearTimeout(t);
    }
  }, [color]);

  return (
    <div
      data-cellidx={idx}
      style={{
        width: size,
        height: size,
        background: color || "rgba(255,255,255,0.84)",
        border: color ? "none" : "0.5px solid rgba(100,160,210,0.35)",
        boxSizing: "border-box",
        transform: bouncing ? "scale(1.18)" : "scale(1)",
        transition: bouncing
          ? "transform 0.08s ease-out"
          : "transform 0.08s ease-in, background 0.04s",
        zIndex: bouncing ? 1 : 0,
        position: "relative",
        borderRadius: bouncing ? 3 : 0,
      }}
      onMouseDown={onPaint}
      onMouseEnter={onEnter}
      onTouchStart={onPaint}
    />
  );
});

export default GridCell;
