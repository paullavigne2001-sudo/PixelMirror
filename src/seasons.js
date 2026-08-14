// ─────────────────────────────────────────────────────────────
// SEASONS.JS — Configuration des thèmes saisonniers
//
// Pour ajouter ou modifier un événement :
//   1. Dépose ton image dans public/seasons/
//   2. Ajoute ou modifie un objet dans le tableau SEASONS
//   3. Sauvegarde → Vercel redéploie automatiquement
//
// Dates au format "MM-DD" (sans l'année)
// ─────────────────────────────────────────────────────────────

export const SEASONS = [
  {
    name: "Halloween",
    dateStart: "08-14",
    dateEnd:   "11-01",
    backgroundImage: "/seasons/halloween.png",

    // Texte affiché sur l'écran d'accueil
    emoji:   "🎃",
    tagline: "OOooh... Pixel Mirror !",

    // Couleurs du titre et du bouton JOUER
    titleColor:   "#FFD700",      // couleur de "PIXEL MIRROR"
    taglineColor: "#ffcc88",      // couleur du sous-titre
    buttonBg:     "linear-gradient(135deg, #ff6600, #cc4400)",
    buttonShadow: "#7a2200",
    buttonColor:  "#fff",

    // Fond semi-transparent derrière le titre (pour lisibilité)
    overlayColor: "rgba(0,0,0,0.45)",
  },

  {
    name: "Noël",
    dateStart: "12-01",
    dateEnd:   "12-31",
    backgroundImage: "/seasons/noel.png",

    emoji:   "🎄",
    tagline: "Joyeux Pixel Mirror !",

    titleColor:   "#fff",
    taglineColor: "#aaffaa",
    buttonBg:     "linear-gradient(135deg, #c41e1e, #8b0000)",
    buttonShadow: "#4a0000",
    buttonColor:  "#fff",

    overlayColor: "rgba(0,0,0,0.40)",
  },

  {
    name: "Nouvel An",
    dateStart: "12-31",
    dateEnd:   "01-02",
    backgroundImage: "/seasons/nouvel-an.png",

    emoji:   "🎆",
    tagline: "Bonne année Pixel Mirror !",

    titleColor:   "#FFD700",
    taglineColor: "#ffe080",
    buttonBg:     "linear-gradient(135deg, #8B008B, #4B0082)",
    buttonShadow: "#2a0050",
    buttonColor:  "#fff",

    overlayColor: "rgba(0,0,0,0.40)",
  },

  {
    name: "Saint-Valentin",
    dateStart: "02-01",
    dateEnd:   "02-15",
    backgroundImage: "/seasons/valentin.png",

    emoji:   "❤️",
    tagline: "Pixel Mirror t'aime !",

    titleColor:   "#fff",
    taglineColor: "#ffb3cc",
    buttonBg:     "linear-gradient(135deg, #ff1493, #c0006a)",
    buttonShadow: "#70003d",
    buttonColor:  "#fff",

    overlayColor: "rgba(0,0,0,0.35)",
  },

  {
    name: "Printemps",
    dateStart: "03-20",
    dateEnd:   "04-30",
    backgroundImage: "/seasons/printemps.png",

    emoji:   "🌸",
    tagline: "Pixel Mirror fleurit !",

    titleColor:   "#fff",
    taglineColor: "#ffeecc",
    buttonBg:     "linear-gradient(135deg, #FF69B4, #cc3d85)",
    buttonShadow: "#7a1f4e",
    buttonColor:  "#fff",

    overlayColor: "rgba(0,0,0,0.30)",
  },

  {
    name: "Été",
    dateStart: "06-21",
    dateEnd:   "09-20",
    backgroundImage: "/seasons/ete.png",

    emoji:   "☀️",
    tagline: "Pixel Mirror en vacances !",

    titleColor:   "#fff",
    taglineColor: "#ffe080",
    buttonBg:     "linear-gradient(135deg, #FF8C00, #cc6200)",
    buttonShadow: "#7a3a00",
    buttonColor:  "#fff",

    overlayColor: "rgba(0,0,0,0.25)",
  },

  {
    name: "Automne",
    dateStart: "09-21",
    dateEnd:   "10-14",
    backgroundImage: "/seasons/automne.png",

    emoji:   "🍂",
    tagline: "Pixel Mirror colore l'automne !",

    titleColor:   "#fff",
    taglineColor: "#ffcc88",
    buttonBg:     "linear-gradient(135deg, #D2691E, #8B4513)",
    buttonShadow: "#4a2409",
    buttonColor:  "#fff",

    overlayColor: "rgba(0,0,0,0.35)",
  },
];

// ─────────────────────────────────────────────────────────────
// Thème par défaut (hors événement)
// ─────────────────────────────────────────────────────────────
export const DEFAULT_SEASON = {
  name: "default",
  backgroundImage: null,
  emoji:   "🪞",
  tagline: "REPRODUIS LE PIXEL ART",
  titleColor:   "#357ABD",
  taglineColor: "#7a9abb",
  buttonBg:     "linear-gradient(135deg, #4A90D9, #357ABD)",
  buttonShadow: "#2563a0",
  buttonColor:  "#fff",
  overlayColor: "transparent",
};

// ─────────────────────────────────────────────────────────────
// EVENTS — Événements avec niveaux spéciaux
//
// Pour ajouter un événement :
//   1. Ajoute une entrée ici avec l'eventId, les dates et les infos
//   2. Dans levels.js, ajoute les niveaux avec type:"event" et eventId correspondant
//   3. Les dates ici font foi — pas besoin de les répéter dans levels.js
//
// Dates au format "YYYY-MM-DD"
// ─────────────────────────────────────────────────────────────
export const EVENTS = {
  event001: {
    eventId:    "event001",
    eventName:  "Halloween 2026",
    eventStart: "2026-10-15",
    eventEnd:   "2026-11-01",
    emoji:      "🎃",
    rewardImg:  null, // "/rewards/halloween.png" quand tu auras l'image
  },
  event002: {
    eventId:    "event002",
    eventName:  "Noël 2026",
    eventStart: "2026-12-01",
    eventEnd:   "2026-12-31",
    emoji:      "🎄",
    rewardImg:  null,
  },
  // Ajoute tes prochains événements ici...
};

// ─────────────────────────────────────────────────────────────
// Utilitaires
// ─────────────────────────────────────────────────────────────

// Retourne la saison active
export function getActiveSeason() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day   = String(now.getDate()).padStart(2, "0");
  const today = `${month}-${day}`;

  for (const season of SEASONS) {
    const { dateStart, dateEnd } = season;
    if (dateStart > dateEnd) {
      if (today >= dateStart || today <= dateEnd) return season;
    } else {
      if (today >= dateStart && today <= dateEnd) return season;
    }
  }

  return DEFAULT_SEASON;
}

// Retourne les infos d'un événement par son eventId
export function getEvent(eventId) {
  return EVENTS[eventId] || null;
}

// Vérifie si un événement est actif aujourd'hui
export function isEventActive(eventId) {
  const event = EVENTS[eventId];
  if (!event) return false;
  const today = new Date().toISOString().slice(0, 10);
  return today >= event.eventStart && today <= event.eventEnd;
}

// Vérifie si un événement est terminé
export function isEventOver(eventId) {
  const event = EVENTS[eventId];
  if (!event) return false;
  const today = new Date().toISOString().slice(0, 10);
  return today > event.eventEnd;
}
