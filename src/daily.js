// ─────────────────────────────────────────────────────────────
// DAILY.JS — Défis journaliers avec calendrier
// ─────────────────────────────────────────────────────────────

import { LEVELS } from "./levels";

const KEY_DAILY   = "pag_daily";
const KEY_MONTHLY = "pag_monthly";

// ── Utilitaires date ──────────────────────────

// "YYYY-MM-DD" pour aujourd'hui
export function todayKey() {
  const d = new Date();
  return formatDate(d);
}

// "YYYY-MM" pour un mois
export function monthKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// Formate une Date en "YYYY-MM-DD"
export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Parse "YYYY-MM-DD" en Date locale
export function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Nombre de jours dans un mois "YYYY-MM"
export function daysInMonth(ym) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

// Nom du mois en français
export function monthName(ym) {
  const [y, m] = ym.split("-").map(Number);
  const names = [
    "Janvier","Février","Mars","Avril","Mai","Juin",
    "Juillet","Août","Septembre","Octobre","Novembre","Décembre"
  ];
  return `${names[m - 1]} ${y}`;
}

// Nom du jour en français (court)
export const DAY_NAMES = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];

// ── Sélection du niveau pour une date donnée ──
// Déterministe : même date = même niveau pour tout le monde
export function getLevelForDate(dateStr) {
  const standardLevels = LEVELS.filter(l => !l.type || l.type === "standard");
  if (standardLevels.length === 0) return LEVELS[0];
  const date = parseDate(dateStr);
  // Nb de jours depuis le 1er jan 2024 (date de référence fixe)
  const ref = new Date(2024, 0, 1);
  const diff = Math.floor((date - ref) / 86400000);
  const idx = ((diff % standardLevels.length) + standardLevels.length) % standardLevels.length;
  return standardLevels[idx];
}

// Alias pour aujourd'hui
export function getDailyLevel() {
  return getLevelForDate(todayKey());
}

// ── Un jour est-il jouable ? ───────────────────
// Jouable = aujourd'hui ou dans le passé (pas le futur)
export function isDatePlayable(dateStr) {
  return dateStr <= todayKey();
}

// ── Lecture / écriture localStorage ──────────

function readDaily() {
  try { return JSON.parse(localStorage.getItem(KEY_DAILY)) || {}; }
  catch { return {}; }
}
function writeDaily(data) {
  try { localStorage.setItem(KEY_DAILY, JSON.stringify(data)); } catch {}
}
function readMonthly() {
  try { return JSON.parse(localStorage.getItem(KEY_MONTHLY)) || {}; }
  catch { return {}; }
}
function writeMonthly(data) {
  try { localStorage.setItem(KEY_MONTHLY, JSON.stringify(data)); } catch {}
}

// ── API publique ──────────────────────────────

// Entrée pour une date donnée
export function getEntryForDate(dateStr) {
  const daily = readDaily();
  return daily[dateStr] || null;
}

// Entrée d'aujourd'hui
export function getTodayEntry() {
  return getEntryForDate(todayKey());
}

// Complète un défi pour une date donnée
// Retourne { isNewMonthReward }
export function completeDailyChallenge(dateStr, levelId, stars) {
  const daily = readDaily();

  // Ne pas écraser si déjà complété avec un meilleur score
  const existing = daily[dateStr];
  if (existing?.completed && existing.stars >= stars) {
    return { isNewMonthReward: false };
  }

  daily[dateStr] = { levelId, completed: true, stars };
  writeDaily(daily);

  // Met à jour le mois correspondant
  const date = parseDate(dateStr);
  const mk = monthKey(date);
  const monthly = readMonthly();
  if (!monthly[mk]) monthly[mk] = { daysCompleted: [], rewardUnlocked: false };

  const dayNum = date.getDate();
  if (!monthly[mk].daysCompleted.includes(dayNum)) {
    monthly[mk].daysCompleted.push(dayNum);
  }

  // Vérifie si tous les jours jouables du mois sont complétés
  const total = daysInMonth(mk);
  const today = todayKey();
  const currentMk = monthKey();

  let daysToComplete;
  if (mk === currentMk) {
    // Mois en cours : seulement les jours passés + aujourd'hui
    daysToComplete = new Date().getDate();
  } else {
    // Mois passé : tous les jours
    daysToComplete = total;
  }

  const isNewMonthReward =
    !monthly[mk].rewardUnlocked &&
    monthly[mk].daysCompleted.length >= daysToComplete;

  if (isNewMonthReward) monthly[mk].rewardUnlocked = true;
  writeMonthly(monthly);

  return { isNewMonthReward };
}

// Données d'un mois : { daysCompleted, rewardUnlocked, total, monthLabel }
export function getMonthData(ym) {
  const monthly = readMonthly();
  const entry = monthly[ym] || { daysCompleted: [], rewardUnlocked: false };
  const today = todayKey();
  const currentMk = monthKey();

  let playableDays;
  if (ym === currentMk) {
    playableDays = new Date().getDate();
  } else if (ym < currentMk) {
    playableDays = daysInMonth(ym);
  } else {
    playableDays = 0;
  }

  return {
    ...entry,
    total: daysInMonth(ym),
    playableDays,
    monthLabel: ym,
  };
}

export function getCurrentMonthData() {
  return getMonthData(monthKey());
}

// Toutes les récompenses mensuelles, triées du plus récent au plus ancien
export function getAllMonthlyRewards() {
  const monthly = readMonthly();
  return Object.entries(monthly)
    .map(([mk, data]) => ({
      monthKey: mk,
      ...data,
      total: daysInMonth(mk),
    }))
    .sort((a, b) => b.monthKey.localeCompare(a.monthKey));
}

// Liste des mois accessibles (mois en cours + N mois précédents)
export function getAccessibleMonths(count = 3) {
  const months = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(monthKey(d));
  }
  return months; // [mois courant, mois-1, mois-2, ...]
}
