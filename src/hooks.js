import { useState, useEffect } from "react";

export function useWindowWidth(maxWidth = 520) {
  const [w, setW] = useState(() =>
    Math.min(typeof window !== "undefined" ? window.innerWidth : 400, maxWidth)
  );
  useEffect(() => {
    const handler = () => setW(Math.min(window.innerWidth, maxWidth));
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [maxWidth]);
  return w;
}

export function usePersistedState(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}
