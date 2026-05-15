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
  // Doux "plop" quand on peint
  paint: () => playTone(320, "sine", 0.08, 0.04),

  // Mélodie douce ascendante pour DONE
  done: () => {
    playTone(440, "sine", 0.15, 0.06);
    setTimeout(() => playTone(550, "sine", 0.15, 0.06), 150);
    setTimeout(() => playTone(660, "sine", 0.2, 0.07), 300);
  },

  // Petite note cristalline pour les étoiles
  star: () => {
    playTone(780, "sine", 0.2, 0.06);
    setTimeout(() => playTone(980, "sine", 0.25, 0.05), 120);
  },

  // Clic doux pour les boutons
  next: () => playTone(280, "sine", 0.1, 0.05),
};
