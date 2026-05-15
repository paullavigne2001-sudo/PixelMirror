export const COLS = 10;
export const ROWS = 10;

export const LEVELS = [
  {
    id: 1, name: "Burger", emoji: "🍔",
    palette: ["#F5A623", "#D0021B", "#4A2C0A", "#417505", "#F8E08E"],
    grid: (() => {
      const N = null, O = "#F5A623", R = "#D0021B", B = "#4A2C0A", G = "#417505", W = "#F8E08E";
      return [[N,N,O,O,O,O,O,O,N,N],[N,O,O,O,O,O,O,O,O,N],[O,O,O,O,O,O,O,O,O,O],[O,O,O,W,O,O,W,O,O,O],[R,R,R,R,R,R,R,R,R,R],[G,G,G,G,G,G,G,G,G,G],[B,B,B,B,B,B,B,B,B,B],[O,O,O,O,O,O,O,O,O,O],[N,O,O,O,O,O,O,O,O,N],[N,N,O,O,O,O,O,O,N,N]];
    })(),
  },
  {
    id: 2, name: "Cœur", emoji: "❤️",
    palette: ["#E8001D", "#FF6B8A"],
    grid: (() => {
      const N = null, R = "#E8001D", P = "#FF6B8A";
      return [[N,R,R,N,N,N,N,R,R,N],[R,R,R,R,N,N,R,R,R,R],[R,R,P,R,R,R,R,P,R,R],[R,R,R,R,R,R,R,R,R,R],[R,R,R,R,R,R,R,R,R,R],[N,R,R,R,R,R,R,R,R,N],[N,N,R,R,R,R,R,R,N,N],[N,N,N,R,R,R,R,N,N,N],[N,N,N,N,R,R,N,N,N,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 3, name: "Étoile", emoji: "⭐",
    palette: ["#FFD700", "#FFA500"],
    grid: (() => {
      const N = null, Y = "#FFD700", O = "#FFA500";
      return [[N,N,N,N,Y,Y,N,N,N,N],[N,N,N,Y,Y,Y,Y,N,N,N],[Y,Y,Y,Y,Y,Y,Y,Y,Y,Y],[N,Y,Y,Y,Y,Y,Y,Y,Y,N],[N,N,O,Y,Y,Y,Y,O,N,N],[N,N,Y,Y,Y,Y,Y,Y,N,N],[N,Y,Y,N,Y,Y,N,Y,Y,N],[Y,Y,N,N,Y,Y,N,N,Y,Y],[Y,N,N,N,N,N,N,N,N,Y],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 4, name: "Maison", emoji: "🏠",
    palette: ["#D0021B", "#8B4513", "#F5A623", "#4A90D9", "#417505"],
    grid: (() => {
      const N = null, R = "#D0021B", B = "#8B4513", O = "#F5A623", L = "#4A90D9", G = "#417505";
      return [[N,N,N,N,R,R,N,N,N,N],[N,N,N,R,R,R,R,N,N,N],[N,N,R,R,R,R,R,R,N,N],[N,R,R,R,R,R,R,R,R,N],[R,R,R,R,R,R,R,R,R,R],[B,B,B,B,B,B,B,B,B,B],[B,L,L,B,B,B,B,L,L,B],[B,L,L,B,O,O,B,L,L,B],[B,B,B,B,O,O,B,B,B,B],[G,G,G,G,O,O,G,G,G,G]];
    })(),
  },
  {
    id: 5, name: "Champignon", emoji: "🍄",
    palette: ["#D0021B", "#FFFFFF", "#8B4513", "#F5DEB3"],
    grid: (() => {
      const N = null, R = "#D0021B", W = "#FFFFFF", B = "#8B4513", T = "#F5DEB3";
      return [[N,N,N,R,R,R,R,N,N,N],[N,N,R,R,R,R,R,R,N,N],[N,R,R,W,W,R,W,W,R,N],[R,R,R,W,W,R,W,W,R,R],[R,R,R,R,R,R,R,R,R,R],[R,R,R,R,R,R,R,R,R,R],[N,R,R,R,R,R,R,R,R,N],[N,N,T,T,T,T,T,T,N,N],[N,N,N,T,T,T,T,N,N,N],[N,N,N,B,B,B,B,N,N,N]];
    })(),
  },
  {
    id: 6, name: "Crâne", emoji: "💀",
    palette: ["#F5F5DC", "#000000"],
    grid: (() => {
      const N = null, W = "#F5F5DC", B = "#000000";
      return [[N,N,N,W,W,W,W,N,N,N],[N,N,W,W,W,W,W,W,N,N],[N,W,W,W,W,W,W,W,W,N],[W,W,B,B,W,W,B,B,W,W],[W,W,B,B,W,W,B,B,W,W],[W,W,W,W,W,W,W,W,W,W],[W,W,B,W,B,B,W,B,W,W],[N,W,W,B,W,W,B,W,W,N],[N,N,W,W,W,W,W,W,N,N],[N,N,N,W,W,W,W,N,N,N]];
    })(),
  },
  {
    id: 7, name: "Cactus", emoji: "🌵",
    palette: ["#417505", "#228B22", "#8B4513"],
    grid: (() => {
      const N = null, G = "#417505", D = "#228B22", B = "#8B4513";
      return [[N,N,N,N,G,G,N,N,N,N],[N,N,G,N,G,G,N,G,N,N],[N,N,G,N,G,G,N,G,N,N],[N,N,G,G,G,G,G,G,N,N],[N,N,D,N,G,G,N,D,N,N],[N,N,N,N,G,G,N,N,N,N],[N,N,N,N,G,G,N,N,N,N],[N,N,N,N,G,G,N,N,N,N],[N,N,B,B,G,G,B,B,N,N],[N,N,B,B,B,B,B,B,N,N]];
    })(),
  },
  {
    id: 8, name: "Couronne", emoji: "👑",
    palette: ["#FFD700", "#FFA500", "#D0021B"],
    grid: (() => {
      const N = null, Y = "#FFD700", O = "#FFA500", R = "#D0021B";
      return [[N,N,N,N,N,N,N,N,N,N],[Y,N,N,Y,N,Y,N,N,Y,N],[Y,Y,N,Y,N,Y,N,Y,Y,N],[Y,Y,Y,Y,Y,Y,Y,Y,Y,Y],[Y,R,Y,Y,R,R,Y,Y,R,Y],[Y,Y,Y,Y,Y,Y,Y,Y,Y,Y],[Y,O,O,O,O,O,O,O,O,Y],[Y,O,O,O,O,O,O,O,O,Y],[N,Y,Y,Y,Y,Y,Y,Y,Y,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 9, name: "Fusée", emoji: "🚀",
    palette: ["#FFFFFF", "#D0021B", "#808080", "#4A90D9", "#FF6B00"],
    grid: (() => {
      const N = null, W = "#FFFFFF", R = "#D0021B", G = "#808080", B = "#4A90D9", O = "#FF6B00";
      return [[N,N,N,N,W,W,N,N,N,N],[N,N,N,W,W,W,W,N,N,N],[N,N,W,W,B,B,W,W,N,N],[N,N,W,W,B,B,W,W,N,N],[N,N,W,W,W,W,W,W,N,N],[R,N,W,W,W,W,W,W,N,R],[R,R,W,G,W,W,G,W,R,R],[N,R,W,W,W,W,W,W,R,N],[N,N,O,W,O,O,W,O,N,N],[N,N,O,O,N,N,O,O,N,N]];
    })(),
  },
  {
    id: 10, name: "Diamant", emoji: "💎",
    palette: ["#4A90D9", "#87CEEB", "#FFFFFF", "#1A5276"],
    grid: (() => {
      const N = null, B = "#4A90D9", L = "#87CEEB", W = "#FFFFFF", D = "#1A5276";
      return [[N,N,N,B,B,B,B,N,N,N],[N,N,B,B,L,L,B,B,N,N],[N,B,B,L,W,W,L,B,B,N],[B,B,B,B,B,B,B,B,B,B],[B,B,B,B,B,B,B,B,B,B],[N,B,D,B,B,B,B,D,B,N],[N,N,B,D,B,B,D,B,N,N],[N,N,N,B,D,D,B,N,N,N],[N,N,N,N,B,B,N,N,N,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 11, name: "Fleur", emoji: "🌸",
    palette: ["#FF69B4", "#FFD700", "#417505", "#FFFFFF"],
    grid: (() => {
      const N = null, P = "#FF69B4", Y = "#FFD700", G = "#417505", W = "#FFFFFF";
      return [[N,N,P,P,N,N,P,P,N,N],[N,P,P,P,P,P,P,P,P,N],[P,P,P,P,P,P,P,P,P,P],[P,P,P,Y,Y,Y,Y,P,P,P],[N,P,P,Y,W,W,Y,P,P,N],[N,P,P,Y,W,W,Y,P,P,N],[P,P,P,Y,Y,Y,Y,P,P,P],[N,N,N,N,G,G,N,N,N,N],[N,N,N,N,G,G,N,N,N,N],[N,N,N,G,G,G,G,N,N,N]];
    })(),
  },
  {
    id: 12, name: "Robot", emoji: "🤖",
    palette: ["#808080", "#4A90D9", "#D0021B", "#FFD700", "#000000"],
    grid: (() => {
      const N = null, G = "#808080", B = "#4A90D9", R = "#D0021B", Y = "#FFD700", K = "#000000";
      return [[N,N,N,N,G,G,N,N,N,N],[N,N,G,G,G,G,G,G,N,N],[N,G,G,B,B,B,B,G,G,N],[G,G,G,B,K,K,B,G,G,G],[G,G,G,G,G,G,G,G,G,G],[G,G,R,G,G,G,G,R,G,G],[G,G,G,G,Y,Y,G,G,G,G],[G,G,G,G,Y,Y,G,G,G,G],[N,G,G,G,G,G,G,G,G,N],[N,N,G,G,N,N,G,G,N,N]];
    })(),
  },
  {
    id: 13, name: "Fantôme", emoji: "👻",
    palette: ["#FFFFFF", "#000000", "#87CEEB", "#808080"],
    grid: (() => {
      const N = null, W = "#FFFFFF", B = "#000000", L = "#87CEEB", G = "#808080";
      return [[N,N,N,W,W,W,W,N,N,N],[N,N,W,W,W,W,W,W,N,N],[N,W,W,L,W,W,L,W,W,N],[W,W,W,B,B,B,B,W,W,W],[W,W,W,B,B,B,B,W,W,W],[W,W,W,W,W,W,W,W,W,W],[W,W,W,W,W,W,W,W,W,W],[W,G,W,G,W,G,W,G,W,W],[W,N,W,N,W,N,W,N,W,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 14, name: "Arc-en-ciel", emoji: "🌈",
    palette: ["#E8001D", "#FF6B00", "#FFD700", "#417505", "#4A90D9", "#7B2FBE"],
    grid: (() => {
      const N = null, R = "#E8001D", O = "#FF6B00", Y = "#FFD700", G = "#417505", B = "#4A90D9", V = "#7B2FBE";
      return [[N,N,N,V,V,V,V,N,N,N],[N,N,V,V,B,B,V,V,N,N],[N,V,V,B,B,G,B,B,V,N],[V,V,B,B,G,G,G,B,B,V],[N,V,B,G,G,Y,G,G,B,N],[N,N,B,G,Y,Y,Y,G,N,N],[N,N,N,Y,Y,O,Y,N,N,N],[N,N,N,N,O,O,N,N,N,N],[N,N,N,N,R,R,N,N,N,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 15, name: "Soleil", emoji: "☀️",
    palette: ["#FFD700", "#FFA500"],
    grid: (() => {
      const N = null, Y = "#FFD700", O = "#FFA500";
      return [[Y,N,N,Y,N,N,Y,N,N,Y],[N,Y,N,N,N,N,N,N,Y,N],[N,N,Y,Y,Y,Y,Y,Y,N,N],[Y,N,Y,O,O,O,O,Y,N,Y],[N,N,Y,O,Y,Y,O,Y,N,N],[N,N,Y,O,Y,Y,O,Y,N,N],[Y,N,Y,O,O,O,O,Y,N,Y],[N,N,Y,Y,Y,Y,Y,Y,N,N],[N,Y,N,N,N,N,N,N,Y,N],[Y,N,N,Y,N,N,Y,N,N,Y]];
    })(),
  },
  {
    id: 16, name: "Planète", emoji: "🪐",
    palette: ["#4A90D9", "#87CEEB", "#F5A623", "#808080"],
    grid: (() => {
      const N = null, B = "#4A90D9", L = "#87CEEB", O = "#F5A623", G = "#808080";
      return [[N,N,N,B,B,B,B,N,N,N],[N,N,B,B,L,B,B,B,N,N],[O,N,B,B,B,B,B,B,N,O],[O,O,B,B,B,B,B,B,O,O],[N,O,O,B,B,B,B,O,O,N],[N,N,O,B,G,G,B,O,N,N],[N,N,B,B,B,B,B,B,N,N],[N,N,B,B,B,B,B,B,N,N],[N,N,N,B,B,B,B,N,N,N],[N,N,N,N,B,B,N,N,N,N]];
    })(),
  },
  {
    id: 17, name: "Arbre", emoji: "🌲",
    palette: ["#417505", "#228B22", "#8B4513"],
    grid: (() => {
      const N = null, G = "#417505", D = "#228B22", B = "#8B4513";
      return [[N,N,N,N,G,G,N,N,N,N],[N,N,N,G,G,G,G,N,N,N],[N,N,G,G,G,G,G,G,N,N],[N,G,G,D,G,G,D,G,G,N],[G,G,G,G,G,G,G,G,G,G],[N,N,G,G,G,G,G,G,N,N],[N,N,N,G,G,G,G,N,N,N],[N,N,N,N,B,B,N,N,N,N],[N,N,N,N,B,B,N,N,N,N],[N,N,N,N,B,B,N,N,N,N]];
    })(),
  },
  {
    id: 18, name: "Poisson", emoji: "🐟",
    palette: ["#4A90D9", "#87CEEB", "#000000"],
    grid: (() => {
      const N = null, B = "#4A90D9", L = "#87CEEB", K = "#000000";
      return [[N,N,N,N,N,N,N,N,B,B],[N,N,N,B,B,B,B,B,B,B],[N,B,B,B,L,B,B,B,B,N],[B,B,B,B,K,B,B,B,N,N],[B,B,B,B,B,B,B,N,N,N],[B,B,B,B,B,B,B,N,N,N],[B,B,B,B,K,B,B,B,N,N],[N,B,B,B,L,B,B,B,B,N],[N,N,N,B,B,B,B,B,B,B],[N,N,N,N,N,N,N,N,B,B]];
    })(),
  },
  {
    id: 19, name: "Glace", emoji: "🍦",
    palette: ["#FF69B4", "#F5DEB3", "#8B4513", "#FFFFFF"],
    grid: (() => {
      const N = null, P = "#FF69B4", T = "#F5DEB3", B = "#8B4513", W = "#FFFFFF";
      return [[N,N,N,P,P,P,P,N,N,N],[N,N,P,P,W,P,P,P,N,N],[N,N,P,P,P,P,P,P,N,N],[N,N,N,P,P,P,P,N,N,N],[N,N,N,T,T,T,T,N,N,N],[N,N,N,T,T,T,T,N,N,N],[N,N,N,N,T,T,N,N,N,N],[N,N,N,N,T,T,N,N,N,N],[N,N,N,N,T,T,N,N,N,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 20, name: "Épée", emoji: "⚔️",
    palette: ["#C0C0C0", "#8B6914", "#FFD700", "#808080"],
    grid: (() => {
      const N = null, S = "#C0C0C0", B = "#8B6914", G = "#FFD700", D = "#808080";
      return [[N,N,N,N,N,N,N,N,S,N],[N,N,N,N,N,N,N,S,D,N],[N,N,N,N,N,N,S,D,N,N],[N,N,N,N,N,S,D,N,N,N],[N,G,G,N,S,D,N,N,N,N],[G,G,G,G,S,N,N,N,N,N],[N,G,G,B,N,N,N,N,N,N],[N,N,B,B,B,N,N,N,N,N],[N,B,B,N,B,B,N,N,N,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
];
