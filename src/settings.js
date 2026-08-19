// ─────────────────────────────────────────────────────────────
// SETTINGS.JS — Préférences utilisateur
// ─────────────────────────────────────────────────────────────

const KEY = "pag_settings";

const DEFAULTS = {
  soundGame:  true,  // sons du jeu (pinceau, boutons, DONE)
  soundAnim:  true,  // sons animation (victoire, étoiles, coupe)
  haptic:     true,  // retour haptique
};

// ── Lecture / écriture ────────────────────────

export function readSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY));
    return { ...DEFAULTS, ...stored };
  } catch {
    return { ...DEFAULTS };
  }
}

export function writeSettings(settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {}
}

export function getSetting(key) {
  return readSettings()[key] ?? DEFAULTS[key];
}

export function setSetting(key, value) {
  const current = readSettings();
  writeSettings({ ...current, [key]: value });
}

// ── Haptic — vérifie la préférence avant de vibrer ───────────

export function hapticDone() {
  if (!getSetting("haptic")) return;
  try { navigator.vibrate([40, 30, 40]); } catch {}
}

export function hapticStars(count) {
  if (!getSetting("haptic")) return;
  try {
    if (count === 3) navigator.vibrate([30, 20, 30, 20, 30]);
    else if (count === 2) navigator.vibrate([30, 20, 30]);
    else navigator.vibrate(60);
  } catch {}
}

export function hapticButton() {
  if (!getSetting("haptic")) return;
  try { navigator.vibrate(18); } catch {}
}
