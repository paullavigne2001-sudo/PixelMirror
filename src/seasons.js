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
    dateStart: "01-01",
    dateEnd:   "12-31",
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
  backgroundImage: null,  // pas d'image → dégradé CSS classique
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
// Fonction utilitaire : retourne la saison active
// ─────────────────────────────────────────────────────────────
export function getActiveSeason() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day   = String(now.getDate()).padStart(2, "0");
  const today = `${month}-${day}`;

  for (const season of SEASONS) {
    const { dateStart, dateEnd } = season;

    // Cas chevauchant l'année (ex: 12-31 → 01-02)
    if (dateStart > dateEnd) {
      if (today >= dateStart || today <= dateEnd) return season;
    } else {
      if (today >= dateStart && today <= dateEnd) return season;
    }
  }

  return DEFAULT_SEASON;
}
