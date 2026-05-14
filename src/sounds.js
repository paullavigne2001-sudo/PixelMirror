let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq, type = "square", duration = 0.07, vol = 0.12) {
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
  paint: () => playTone(440, "square", 0.05, 0.08),
  done: () => {
    playTone(523, "sine", 0.1);
    setTimeout(() => playTone(659, "sine", 0.12), 100);
    setTimeout(() => playTone(784, "sine", 0.18), 220);
  },
  star: () => playTone(880, "sine", 0.15, 0.15),
  next: () => playTone(330, "square", 0.08, 0.1),
};
