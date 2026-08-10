// ─────────────────────────────────────────────────────────────
// DAILY.JS — Logique des défis journaliers
// ─────────────────────────────────────────────────────────────

import { LEVELS } from "./levels";

// ── Clés localStorage ────────────────────────
const KEY_DAILY   = "pag_daily";
const KEY_MONTHLY = "pag_monthly";

// ── Utilitaires date ──────────────────────────

// Retourne la date du jour au format "YYYY-MM-DD"
export function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Retourne "YYYY-MM" pour le mois en cours
export function monthKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// Nombre de jours dans un mois donné "YYYY-MM"
export function daysInMonth(ym) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

// ── Sélection du niveau du jour ───────────────
// Même calcul pour tout le monde le même jour.
// On filtre uniquement les niveaux "standard" (pas les events).
export function getDailyLevel() {
  const standardLevels = LEVELS.filter(l => !l.type || l.type === "standard");
  if (standardLevels.length === 0) return LEVELS[0];
  const dayIndex = Math.floor(Date.now() / 86400000); // nb de jours depuis epoch
  return standardLevels[dayIndex % standardLevels.length];
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

// Retourne l'entrée du jour { levelId, completed, stars } ou null
export function getTodayEntry() {
  const daily = readDaily();
  return daily[todayKey()] || null;
}

// Marque le défi du jour comme complété
// Retourne { isNewMonthReward } pour savoir si on vient de débloquer la coupe
export function completeDailyChallenge(levelId, stars) {
  const key = todayKey();
  const daily = readDaily();

  // Ne pas écraser si déjà complété
  if (daily[key]?.completed) return { isNewMonthReward: false };

  daily[key] = { levelId, completed: true, stars };
  writeDaily(daily);

  // Met à jour le mois
  const mk = monthKey();
  const monthly = readMonthly();
  if (!monthly[mk]) monthly[mk] = { daysCompleted: [], rewardUnlocked: false };

  const dayNum = new Date().getDate();
  if (!monthly[mk].daysCompleted.includes(dayNum)) {
    monthly[mk].daysCompleted.push(dayNum);
  }

  // Vérifie si tous les jours du mois sont complétés
  const total = daysInMonth(mk);
  const isNewMonthReward =
    !monthly[mk].rewardUnlocked &&
    monthly[mk].daysCompleted.length >= total;

  if (isNewMonthReward) monthly[mk].rewardUnlocked = true;
  writeMonthly(monthly);

  return { isNewMonthReward };
}

// Retourne les données du mois en cours { daysCompleted, rewardUnlocked, total }
export function getCurrentMonthData() {
  const mk = monthKey();
  const monthly = readMonthly();
  const entry = monthly[mk] || { daysCompleted: [], rewardUnlocked: false };
  return {
    ...entry,
    total: daysInMonth(mk),
    monthLabel: mk,
  };
}

// Retourne toutes les récompenses mensuelles débloquées
// [{ monthKey: "2026-08", rewardUnlocked: true, daysCompleted: [...] }, ...]
export function getAllMonthlyRewards() {
  const monthly = readMonthly();
  return Object.entries(monthly)
    .map(([mk, data]) => ({ monthKey: mk, ...data, total: daysInMonth(mk) }))
    .sort((a, b) => b.monthKey.localeCompare(a.monthKey)); // plus récent en premier
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
