// ─────────────────────────────────────────────────────────────
// SOUNDS.JS — Sons rétro avec Web Audio API
// Vérifie les préférences avant de jouer
// ─────────────────────────────────────────────────────────────

import { getSetting } from "./settings";

let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq, type = "sine", duration = 0.12, vol = 0.06) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

export const sounds = {
  // ── Sons du JEU (soundGame) ──────────────────
  paint: () => {
    if (!getSetting("soundGame")) return;
    playTone(320, "sine", 0.08, 0.04);
  },

  next: () => {
    if (!getSetting("soundGame")) return;
    playTone(280, "sine", 0.1, 0.05);
  },

  done: () => {
    if (!getSetting("soundGame")) return;
    playTone(440, "sine", 0.15, 0.06);
    setTimeout(() => playTone(550, "sine", 0.15, 0.06), 150);
    setTimeout(() => playTone(660, "sine", 0.2, 0.07), 300);
  },

  // ── Sons ANIMATION (soundAnim) ───────────────
  star: () => {
    if (!getSetting("soundAnim")) return;
    playTone(780, "sine", 0.2, 0.06);
    setTimeout(() => playTone(980, "sine", 0.25, 0.05), 120);
  },

  victory: () => {
    if (!getSetting("soundAnim")) return;
    [523, 659, 784, 1047].forEach((freq, i) => {
      setTimeout(() => playTone(freq, "sine", 0.25, 0.08), i * 120);
    });
  },
};
