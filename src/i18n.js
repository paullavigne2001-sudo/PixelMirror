// ─────────────────────────────────────────────────────────────
// I18N.JS — Traductions
//
// Pour ajouter une langue :
//   1. Ajoute un bloc dans TRANSLATIONS avec le code langue
//   2. Ajoute la langue dans LANGUAGES de SettingsPanel.jsx
//   3. C'est tout !
//
// Si une clé manque dans la langue choisie,
// le fallback est automatiquement le français.
// ─────────────────────────────────────────────────────────────

import { getSetting } from "./settings";

export const TRANSLATIONS = {
  fr: {
    // ── Accueil ──────────────────────────────
    "home.tagline":       "REPRODUIS LE PIXEL ART",
    "home.play":          "▶ JOUER",
    "home.catalogue":     "CATALOGUE",
    "home.daily":         "DÉFIS DU MOIS",
    "home.rewards":       "🏆 MES RÉCOMPENSES",
    "home.cup_obtained":  "🏆 COUPE OBTENUE !",

    // ── Jeu ──────────────────────────────────
    "game.model":         "MODÈLE",
    "game.drawing":       "TON DESSIN",
    "game.done_btn":      "DONE ✓",
    "game.daily_label":   "📅 DÉFI DU JOUR",

    // ── Résultat ─────────────────────────────
    "result.title":       "NIVEAU TERMINÉ !",
    "result.perfect":     "PARFAIT ! 🎉",
    "result.good":        "Bien joué ! 👍",
    "result.retry_msg":   "Essaie encore ! 💪",
    "result.retry_btn":   "🔄 RETRY",
    "result.next_btn":    "SUIVANT ▶",
    "result.cup":         "🎉 COUPE DU MOIS DÉBLOQUÉE !",

    // ── Catalogue ────────────────────────────
    "catalogue.title":    "📖 CATALOGUE",
    "catalogue.standards":"STANDARDS",
    "catalogue.events":   "ÉVÉNEMENTS",
    "catalogue.no_event": "Aucun événement\ndisponible pour le moment",
    "catalogue.active":   "EN COURS",
    "catalogue.over":     "TERMINÉ",
    "catalogue.upcoming": "À VENIR",
    "catalogue.completed":"complété",
    "catalogue.completeds":"complétés",

    // ── Calendrier défis ─────────────────────
    "calendar.title":     "📅 DEFIS DU MOIS",
    "calendar.cup":       "🏆 COUPE DU MOIS OBTENUE !",
    "calendar.legend_done":     "Complété",
    "calendar.legend_today":    "Aujourd'hui",
    "calendar.legend_available":"Disponible",
    "calendar.legend_future":   "Futur",

    // ── Récompenses ──────────────────────────
    "rewards.title":      "🏆 MES RÉCOMPENSES",
    "rewards.monthly":    "COUPES MENSUELLES",
    "rewards.events":     "ÉVÉNEMENTS",
    "rewards.cup_obtained":"✅ COUPE OBTENUE !",
    "rewards.no_cup":     "Complète tous les défis\nd'un mois pour gagner\nta première coupe !",
    "rewards.events_soon":"Les récompenses d'événements\narrivent bientôt !",
    "rewards.days":       "jours",

    // ── Paramètres ───────────────────────────
    "settings.title":     "⚙️ PARAMÈTRES",
    "settings.sounds":    "SONS",
    "settings.sound_game":"Sons du jeu",
    "settings.sound_game_sub": "Pinceau · Boutons · DONE",
    "settings.sound_anim":"Sons animation",
    "settings.sound_anim_sub":  "Victoire · Étoiles · Coupe",
    "settings.haptic":    "RETOUR HAPTIQUE",
    "settings.vibration": "Vibrations",
    "settings.vibration_sub":   "Retour tactile sur les actions",
    "settings.language":  "LANGUE",
    "settings.lang_soon": "Bientôt disponible",

    // ── Noms des niveaux ─────────────────────
    "level.1":   "Burger",
    "level.2":   "Cœur",
    "level.3":   "Étoile",
    "level.4":   "Maison",
    "level.5":   "Champignon",
    "level.6":   "Crâne",
    "level.7":   "Cactus",
    "level.8":   "Couronne",
    "level.9":   "Fusée",
    "level.10":  "Diamant",
    "level.11":  "Fleur",
    "level.12":  "Robot",
    "level.13":  "Fantôme",
    "level.14":  "Arc-en-ciel",
    "level.15":  "Soleil",
    "level.16":  "Planète",
    "level.17":  "Arbre",
    "level.18":  "Poisson",
    "level.19":  "Glace",
    "level.20":  "Épée",
    "level.24":  "Jack-o-lantern",

    // ── Mois ─────────────────────────────────
    "month.1":  "Janvier",
    "month.2":  "Février",
    "month.3":  "Mars",
    "month.4":  "Avril",
    "month.5":  "Mai",
    "month.6":  "Juin",
    "month.7":  "Juillet",
    "month.8":  "Août",
    "month.9":  "Septembre",
    "month.10": "Octobre",
    "month.11": "Novembre",
    "month.12": "Décembre",

    // ── Jours (court) ────────────────────────
    "day.mon": "Lun",
    "day.tue": "Mar",
    "day.wed": "Mer",
    "day.thu": "Jeu",
    "day.fri": "Ven",
    "day.sat": "Sam",
    "day.sun": "Dim",
  },

  en: {
    // ── Home ─────────────────────────────────
    "home.tagline":       "REPRODUCE THE PIXEL ART",
    "home.play":          "▶ PLAY",
    "home.catalogue":     "CATALOGUE",
    "home.daily":         "MONTHLY CHALLENGES",
    "home.rewards":       "🏆 MY REWARDS",
    "home.cup_obtained":  "🏆 CUP OBTAINED!",

    // ── Game ─────────────────────────────────
    "game.model":         "MODEL",
    "game.drawing":       "YOUR DRAWING",
    "game.done_btn":      "DONE ✓",
    "game.daily_label":   "📅 DAILY CHALLENGE",

    // ── Result ───────────────────────────────
    "result.title":       "LEVEL COMPLETE!",
    "result.perfect":     "PERFECT! 🎉",
    "result.good":        "Well done! 👍",
    "result.retry_msg":   "Try again! 💪",
    "result.retry_btn":   "🔄 RETRY",
    "result.next_btn":    "NEXT ▶",
    "result.cup":         "🎉 MONTHLY CUP UNLOCKED!",

    // ── Catalogue ────────────────────────────
    "catalogue.title":    "📖 CATALOGUE",
    "catalogue.standards":"STANDARDS",
    "catalogue.events":   "EVENTS",
    "catalogue.no_event": "No events\navailable right now",
    "catalogue.active":   "ACTIVE",
    "catalogue.over":     "ENDED",
    "catalogue.upcoming": "COMING SOON",
    "catalogue.completed":"completed",
    "catalogue.completeds":"completed",

    // ── Calendar ─────────────────────────────
    "calendar.title":     "📅 MONTHLY CHALLENGES",
    "calendar.cup":       "🏆 MONTHLY CUP OBTAINED!",
    "calendar.legend_done":     "Done",
    "calendar.legend_today":    "Today",
    "calendar.legend_available":"Available",
    "calendar.legend_future":   "Future",

    // ── Rewards ──────────────────────────────
    "rewards.title":      "🏆 MY REWARDS",
    "rewards.monthly":    "MONTHLY CUPS",
    "rewards.events":     "EVENTS",
    "rewards.cup_obtained":"✅ CUP OBTAINED!",
    "rewards.no_cup":     "Complete all challenges\nin a month to earn\nyour first cup!",
    "rewards.events_soon":"Event rewards\ncoming soon!",
    "rewards.days":       "days",

    // ── Settings ─────────────────────────────
    "settings.title":     "⚙️ SETTINGS",
    "settings.sounds":    "SOUNDS",
    "settings.sound_game":"Game sounds",
    "settings.sound_game_sub": "Brush · Buttons · DONE",
    "settings.sound_anim":"Animation sounds",
    "settings.sound_anim_sub":  "Victory · Stars · Cup",
    "settings.haptic":    "HAPTIC FEEDBACK",
    "settings.vibration": "Vibrations",
    "settings.vibration_sub":   "Tactile feedback on actions",
    "settings.language":  "LANGUAGE",
    "settings.lang_soon": "Coming soon",

    // ── Level names ──────────────────────────
    "level.1":   "Burger",
    "level.2":   "Heart",
    "level.3":   "Star",
    "level.4":   "House",
    "level.5":   "Mushroom",
    "level.6":   "Skull",
    "level.7":   "Cactus",
    "level.8":   "Crown",
    "level.9":   "Rocket",
    "level.10":  "Diamond",
    "level.11":  "Flower",
    "level.12":  "Robot",
    "level.13":  "Ghost",
    "level.14":  "Rainbow",
    "level.15":  "Sun",
    "level.16":  "Planet",
    "level.17":  "Tree",
    "level.18":  "Fish",
    "level.19":  "Ice Cream",
    "level.20":  "Sword",
    "level.24":  "Jack-o-lantern",

    // ── Months ───────────────────────────────
    "month.1":  "January",
    "month.2":  "February",
    "month.3":  "March",
    "month.4":  "April",
    "month.5":  "May",
    "month.6":  "June",
    "month.7":  "July",
    "month.8":  "August",
    "month.9":  "September",
    "month.10": "October",
    "month.11": "November",
    "month.12": "December",

    // ── Days (short) ─────────────────────────
    "day.mon": "Mon",
    "day.tue": "Tue",
    "day.wed": "Wed",
    "day.thu": "Thu",
    "day.fri": "Fri",
    "day.sat": "Sat",
    "day.sun": "Sun",
  },
};

// ─────────────────────────────────────────────
// Hook useTranslation
// ─────────────────────────────────────────────

export function useTranslation() {
  const lang = getSetting("language") || "fr";
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const fallback = TRANSLATIONS.fr;

  return function t(key) {
    return dict[key] ?? fallback[key] ?? key;
  };
}

// Utilitaire pour les noms de mois
export function getMonthName(ym) {
  const lang = getSetting("language") || "fr";
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const fallback = TRANSLATIONS.fr;
  const [y, m] = ym.split("-").map(Number);
  const key = `month.${m}`;
  return `${dict[key] ?? fallback[key]} ${y}`;
}

// Utilitaire pour les noms de jours courts
export function getDayNames() {
  const lang = getSetting("language") || "fr";
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const fallback = TRANSLATIONS.fr;
  return ["mon","tue","wed","thu","fri","sat","sun"].map(d => {
    const key = `day.${d}`;
    return dict[key] ?? fallback[key];
  });
}
