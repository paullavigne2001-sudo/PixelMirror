export const COLS = 10;
export const ROWS = 10;

export const LEVELS = [
  {
    id: 1, name: "Burger", emoji: "🍔",
    palette: ["#F5A623", "#D0021B", "#4A2C0A", "#417505", "#F8E08E"],
    grid: (() => {
      const _ = null, O = "#F5A623", R = "#D0021B", B = "#4A2C0A", G = "#417505", W = "#F8E08E";
      return [[_,_,O,O,O,O,O,O,_,_],[_,O,O,O,O,O,O,O,O,_],[O,O,O,O,O,O,O,O,O,O],[O,O,O,W,O,O,W,O,O,O],[R,R,R,R,R,R,R,R,R,R],[G,G,G,G,G,G,G,G,G,G],[B,B,B,B,B,B,B,B,B,B],[O,O,O,O,O,O,O,O,O,O],[_,O,O,O,O,O,O,O,O,_],[_,_,O,O,O,O,O,O,_,_]];
    })(),
  },
  {
    id: 2, name: "Cœur", emoji: "❤️",
    palette: ["#E8001D", "#FF6B8A"],
    grid: (() => {
      const _ = null, R = "#E8001D", P = "#FF6B8A";
      return [[_,R,R,_,_,_,_,R,R,_],[R,R,R,R,_,_,R,R,R,R],[R,R,P,R,R,R,R,P,R,R],[R,R,R,R,R,R,R,R,R,R],[R,R,R,R,R,R,R,R,R,R],[_,R,R,R,R,R,R,R,R,_],[_,_,R,R,R,R,R,R,_,_],[_,_,_,R,R,R,R,_,_,_],[_,_,_,_,R,R,_,_,_,_],[_,_,_,_,_,_,_,_,_,_]];
    })(),
  },
  {
    id: 3, name: "Étoile", emoji: "⭐",
    palette: ["#FFD700", "#FFA500"],
    grid: (() => {
      const _ = null, Y = "#FFD700", O = "#FFA500";
      return [[_,_,_,_,Y,Y,_,_,_,_],[_,_,_,Y,Y,Y,Y,_,_,_],[Y,Y,Y,Y,Y,Y,Y,Y,Y,Y],[_,Y,Y,Y,Y,Y,Y,Y,Y,_],[_,_,O,Y,Y,Y,Y,O,_,_],[_,_,Y,Y,Y,Y,Y,Y,_,_],[_,Y,Y,_,Y,Y,_,Y,Y,_],[Y,Y,_,_,Y,Y,_,_,Y,Y],[Y,_,_,_,_,_,_,_,_,Y],[_,_,_,_,_,_,_,_,_,_]];
    })(),
  },
  {
    id: 4, name: "Maison", emoji: "🏠",
    palette: ["#D0021B", "#8B4513", "#F5A623", "#4A90D9", "#417505"],
    grid: (() => {
      const _ = null, R = "#D0021B", B = "#8B4513", O = "#F5A623", L = "#4A90D9", G = "#417505";
      return [[_,_,_,_,R,R,_,_,_,_],[_,_,_,R,R,R,R,_,_,_],[_,_,R,R,R,R,R,R,_,_],[_,R,R,R,R,R,R,R,R,_],[R,R,R,R,R,R,R,R,R,R],[B,B,B,B,B,B,B,B,B,B],[B,L,L,B,B,B,B,L,L,B],[B,L,L,B,O,O,B,L,L,B],[B,B,B,B,O,O,B,B,B,B],[G,G,G,G,O,O,G,G,G,G]];
    })(),
  },
  {
    id: 5, name: "Champignon", emoji: "🍄",
    palette: ["#D0021B", "#FFFFFF", "#8B4513", "#F5DEB3"],
    grid: (() => {
      const _ = null, R = "#D0021B", W = "#FFFFFF", B = "#8B4513", T = "#F5DEB3";
      return [[_,_,_,R,R,R,R,_,_,_],[_,_,R,R,R,R,R,R,_,_],[_,R,R,W,W,R,W,W,R,_],[R,R,R,W,W,R,W,W,R,R],[R,R,R,R,R,R,R,R,R,R],[R,R,R,R,R,R,R,R,R,R],[_,R,R,R,R,R,R,R,R,_],[_,_,T,T,T,T,T,T,_,_],[_,_,_,T,T,T,T,_,_,_],[_,_,_,B,B,B,B,_,_,_]];
    })(),
  },
  {
    id: 6, name: "Crâne", emoji: "💀",
    palette: ["#F5F5DC", "#000000"],
    grid: (() => {
      const _ = null, W = "#F5F5DC", B = "#000000";
      return [[_,_,_,W,W,W,W,_,_,_],[_,_,W,W,W,W,W,W,_,_],[_,W,W,W,W,W,W,W,W,_],[W,W,B,B,W,W,B,B,W,W],[W,W,B,B,W,W,B,B,W,W],[W,W,W,W,W,W,W,W,W,W],[W,W,B,W,B,B,W,B,W,W],[_,W,W,B,W,W,B,W,W,_],[_,_,W,W,W,W,W,W,_,_],[_,_,_,W,W,W,W,_,_,_]];
    })(),
  },
  {
    id: 7, name: "Cactus", emoji: "🌵",
    palette: ["#417505", "#228B22", "#8B4513"],
    grid: (() => {
      const _ = null, G = "#417505", D = "#228B22", B = "#8B4513";
      return [[_,_,_,_,G,G,_,_,_,_],[_,_,G,_,G,G,_,G,_,_],[_,_,G,_,G,G,_,G,_,_],[_,_,G,G,G,G,G,G,_,_],[_,_,D,_,G,G,_,D,_,_],[_,_,_,_,G,G,_,_,_,_],[_,_,_,_,G,G,_,_,_,_],[_,_,_,_,G,G,_,_,_,_],[_,_,B,B,G,G,B,B,_,_],[_,_,B,B,B,B,B,B,_,_]];
    })(),
  },
  {
    id: 8, name: "Couronne", emoji: "👑",
    palette: ["#FFD700", "#FFA500", "#D0021B"],
    grid: (() => {
      const _ = null, Y = "#FFD700", O = "#FFA500", R = "#D0021B";
      return [[_,_,_,_,_,_,_,_,_,_],[Y,_,_,Y,_,Y,_,_,Y,_],[Y,Y,_,Y,_,Y,_,Y,Y,_],[Y,Y,Y,Y,Y,Y,Y,Y,Y,Y],[Y,R,Y,Y,R,R,Y,Y,R,Y],[Y,Y,Y,Y,Y,Y,Y,Y,Y,Y],[Y,O,O,O,O,O,O,O,O,Y],[Y,O,O,O,O,O,O,O,O,Y],[_,Y,Y,Y,Y,Y,Y,Y,Y,_],[_,_,_,_,_,_,_,_,_,_]];
    })(),
  },
  {
    id: 9, name: "Fusée", emoji: "🚀",
    palette: ["#FFFFFF", "#D0021B", "#808080", "#4A90D9", "#FF6B00"],
    grid: (() => {
      const _ = null, W = "#FFFFFF", R = "#D0021B", G = "#808080", B = "#4A90D9", O = "#FF6B00";
      return [[_,_,_,_,W,W,_,_,_,_],[_,_,_,W,W,W,W,_,_,_],[_,_,W,W,B,B,W,W,_,_],[_,_,W,W,B,B,W,W,_,_],[_,_,W,W,W,W,W,W,_,_],[R,_,W,W,W,W,W,W,_,R],[R,R,W,G,W,W,G,W,R,R],[_,R,W,W,W,W,W,W,R,_],[_,_,O,W,O,O,W,O,_,_],[_,_,O,O,_,_,O,O,_,_]];
    })(),
  },
  {
    id: 10, name: "Diamant", emoji: "💎",
    palette: ["#4A90D9", "#87CEEB", "#FFFFFF", "#1A5276"],
    grid: (() => {
      const _ = null, B = "#4A90D9", L = "#87CEEB", W = "#FFFFFF", D = "#1A5276";
      return [[_,_,_,B,B,B,B,_,_,_],[_,_,B,B,L,L,B,B,_,_],[_,B,B,L,W,W,L,B,B,_],[B,B,B,B,B,B,B,B,B,B],[B,B,B,B,B,B,B,B,B,B],[_,B,D,B,B,B,B,D,B,_],[_,_,B,D,B,B,D,B,_,_],[_,_,_,B,D,D,B,_,_,_],[_,_,_,_,B,B,_,_,_,_],[_,_,_,_,_,_,_,_,_,_]];
    })(),
  },
  {
    id: 11, name: "Fleur", emoji: "🌸",
    palette: ["#FF69B4", "#FFD700", "#417505", "#FFFFFF"],
    grid: (() => {
      const _ = null, P = "#FF69B4", Y = "#FFD700", G = "#417505", W = "#FFFFFF";
      return [[_,_,P,P,_,_,P,P,_,_],[_,P,P,P,P,P,P,P,P,_],[P,P,P,P,P,P,P,P,P,P],[P,P,P,Y,Y,Y,Y,P,P,P],[_,P,P,Y,W,W,Y,P,P,_],[_,P,P,Y,W,W,Y,P,P,_],[P,P,P,Y,Y,Y,Y,P,P,P],[_,_,_,_,G,G,_,_,_,_],[_,_,_,_,G,G,_,_,_,_],[_,_,_,G,G,G,G,_,_,_]];
    })(),
  },
  {
    id: 12, name: "Robot", emoji: "🤖",
    palette: ["#808080", "#4A90D9", "#D0021B", "#FFD700", "#000000"],
    grid: (() => {
      const _ = null, G = "#808080", B = "#4A90D9", R = "#D0021B", Y = "#FFD700", K = "#000000";
      return [[_,_,_,_,G,G,_,_,_,_],[_,_,G,G,G,G,G,G,_,_],[_,G,G,B,B,B,B,G,G,_],[G,G,G,B,K,K,B,G,G,G],[G,G,G,G,G,G,G,G,G,G],[G,G,R,G,G,G,G,R,G,G],[G,G,G,G,Y,Y,G,G,G,G],[G,G,G,G,Y,Y,G,G,G,G],[_,G,G,G,G,G,G,G,G,_],[_,_,G,G,_,_,G,G,_,_]];
    })(),
  },
  {
    id: 13, name: "Fantôme", emoji: "👻",
    palette: ["#FFFFFF", "#000000", "#87CEEB", "#808080"],
    grid: (() => {
      const _ = null, W = "#FFFFFF", B = "#000000", L = "#87CEEB", G = "#808080";
      return [[_,_,_,W,W,W,W,_,_,_],[_,_,W,W,W,W,W,W,_,_],[_,W,W,L,W,W,L,W,W,_],[W,W,W,B,B,B,B,W,W,W],[W,W,W,B,B,B,B,W,W,W],[W,W,W,W,W,W,W,W,W,W],[W,W,W,W,W,W,W,W,W,W],[W,G,W,G,W,G,W,G,W,W],[W,_,W,_,W,_,W,_,W,_],[_,_,_,_,_,_,_,_,_,_]];
    })(),
  },
  {
    id: 14, name: "Arc-en-ciel", emoji: "🌈",
    palette: ["#E8001D", "#FF6B00", "#FFD700", "#417505", "#4A90D9", "#7B2FBE"],
    grid: (() => {
      const _ = null, R = "#E8001D", O = "#FF6B00", Y = "#FFD700", G = "#417505", B = "#4A90D9", V = "#7B2FBE";
      return [[_,_,_,V,V,V,V,_,_,_],[_,_,V,V,B,B,V,V,_,_],[_,V,V,B,B,G,B,B,V,_],[V,V,B,B,G,G,G,B,B,V],[_,V,B,G,G,Y,G,G,B,_],[_,_,B,G,Y,Y,Y,G,_,_],[_,_,_,Y,Y,O,Y,_,_,_],[_,_,_,_,O,O,_,_,_,_],[_,_,_,_,R,R,_,_,_,_],[_,_,_,_,_,_,_,_,_,_]];
    })(),
  },
  {
    id: 15, name: "Soleil", emoji: "☀️",
    palette: ["#FFD700", "#FFA500"],
    grid: (() => {
      const _ = null, Y = "#FFD700", O = "#FFA500";
      return [[Y,_,_,Y,_,_,Y,_,_,Y],[_,Y,_,_,_,_,_,_,Y,_],[_,_,Y,Y,Y,Y,Y,Y,_,_],[Y,_,Y,O,O,O,O,Y,_,Y],[_,_,Y,O,Y,Y,O,Y,_,_],[_,_,Y,O,Y,Y,O,Y,_,_],[Y,_,Y,O,O,O,O,Y,_,Y],[_,_,Y,Y,Y,Y,Y,Y,_,_],[_,Y,_,_,_,_,_,_,Y,_],[Y,_,_,Y,_,_,Y,_,_,Y]];
    })(),
  },
  {
    id: 16, name: "Planète", emoji: "🪐",
    palette: ["#4A90D9", "#87CEEB", "#F5A623", "#808080"],
    grid: (() => {
      const _ = null, B = "#4A90D9", L = "#87CEEB", O = "#F5A623", G = "#808080";
      return [[_,_,_,B,B,B,B,_,_,_],[_,_,B,B,L,B,B,B,_,_],[O,_,B,B,B,B,B,B,_,O],[O,O,B,B,B,B,B,B,O,O],[_,O,O,B,B,B,B,O,O,_],[_,_,O,B,G,G,B,O,_,_],[_,_,B,B,B,B,B,B,_,_],[_,_,B,B,B,B,B,B,_,_],[_,_,_,B,B,B,B,_,_,_],[_,_,_,_,B,B,_,_,_,_]];
    })(),
  },
  {
    id: 17, name: "Arbre", emoji: "🌲",
    palette: ["#417505", "#228B22", "#8B4513"],
    grid: (() => {
      const _ = null, G = "#417505", D = "#228B22", B = "#8B4513";
      return [[_,_,_,_,G,G,_,_,_,_],[_,_,_,G,G,G,G,_,_,_],[_,_,G,G,G,G,G,G,_,_],[_,G,G,D,G,G,D,G,G,_],[G,G,G,G,G,G,G,G,G,G],[_,_,G,G,G,G,G,G,_,_],[_,_,_,G,G,G,G,_,_,_],[_,_,_,_,B,B,_,_,_,_],[_,_,_,_,B,B,_,_,_,_],[_,_,_,_,B,B,_,_,_,_]];
    })(),
  },
  {
    id: 18, name: "Poisson", emoji: "🐟",
    palette: ["#4A90D9", "#87CEEB", "#000000"],
    grid: (() => {
      const _ = null, B = "#4A90D9", L = "#87CEEB", K = "#000000";
      return [[_,_,_,_,_,_,_,_,B,B],[_,_,_,B,B,B,B,B,B,B],[_,B,B,B,L,B,B,B,B,_],[B,B,B,B,K,B,B,B,_,_],[B,B,B,B,B,B,B,_,_,_],[B,B,B,B,B,B,B,_,_,_],[B,B,B,B,K,B,B,B,_,_],[_,B,B,B,L,B,B,B,B,_],[_,_,_,B,B,B,B,B,B,B],[_,_,_,_,_,_,_,_,B,B]];
    })(),
  },
  {
    id: 19, name: "Glace", emoji: "🍦",
    palette: ["#FF69B4", "#F5DEB3", "#8B4513", "#FFFFFF"],
    grid: (() => {
      const _ = null, P = "#FF69B4", T = "#F5DEB3", B = "#8B4513", W = "#FFFFFF";
      return [[_,_,_,P,P,P,P,_,_,_],[_,_,P,P,W,P,P,P,_,_],[_,_,P,P,P,P,P,P,_,_],[_,_,_,P,P,P,P,_,_,_],[_,_,_,T,T,T,T,_,_,_],[_,_,_,T,T,T,T,_,_,_],[_,_,_,_,T,T,_,_,_,_],[_,_,_,_,T,T,_,_,_,_],[_,_,_,_,T,T,_,_,_,_],[_,_,_,_,_,_,_,_,_,_]];
    })(),
  },
  {
    id: 20, name: "Épée", emoji: "⚔️",
    palette: ["#C0C0C0", "#8B6914", "#FFD700", "#808080"],
    grid: (() => {
      const _ = null, S = "#C0C0C0", B = "#8B6914", G = "#FFD700", D = "#808080";
      return [[_,_,_,_,_,_,_,_,S,S],[_,_,_,_,_,_,_,S,D,_],[_,_,_,_,_,_,S,D,S,_],[_,_,_,_,_,S,D,S,_,_],[_,G,G,_,S,D,S,_,_,_],[G,G,G,G,S,S_,_,_,_],[_,G,G,B,_,_,_,_,_,_],[_,_,B,B,B,_,_,_,_,_],[_,B,B,_,B,B,_,_,_,_],[_,_,_,_,_,_,_,_,_,_]];
    })(),
  },
];
