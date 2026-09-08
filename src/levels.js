export const COLS = 10;
export const ROWS = 10;

export const LEVELS = [
  {
    id: 1, name: "Burger", emoji: "🍔",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#F5A623", "#D0021B", "#4A2C0A", "#417505", "#F8E08E"],
    grid: (() => {
      const N = null, O = "#F5A623", R = "#D0021B", B = "#4A2C0A", G = "#417505", W = "#F8E08E";
      return [[N,N,O,O,O,O,O,O,N,N],[N,O,O,O,O,O,O,O,O,N],[O,O,O,O,O,O,O,O,O,O],[O,O,O,W,O,O,W,O,O,O],[R,R,R,R,R,R,R,R,R,R],[G,G,G,G,G,G,G,G,G,G],[B,B,B,B,B,B,B,B,B,B],[O,O,O,O,O,O,O,O,O,O],[N,O,O,O,O,O,O,O,O,N],[N,N,O,O,O,O,O,O,N,N]];
    })(),
  },
  {
    id: 2, name: "Coeur", emoji: "🎨",
    type: "standard",
    cols: 15, rows: 15,
    palette: ["#D0021B", "#ffffff", "#000000"],
    grid: (() => {
      const N = null, A = "#000000", B = "#D0021B", C = "#ffffff";
      return [
        [N,N,N,N,N,N,N,N,N,N,N,N,N,N,N],
        [N,N,A,A,A,A,N,N,N,A,A,A,A,N,N],
        [N,A,B,B,B,B,A,N,A,B,B,B,B,A,N],
        [A,B,B,C,B,B,B,A,B,B,B,B,B,B,A],
        [A,B,C,B,B,B,B,A,B,B,B,B,B,B,A],
        [A,B,C,B,B,B,B,B,B,B,B,B,B,B,A],
        [A,B,B,B,B,B,B,B,B,B,B,B,B,B,A],
        [A,B,B,B,B,B,B,B,B,B,B,B,B,B,A],
        [N,A,B,B,B,B,B,B,B,B,B,B,B,A,N],
        [N,N,A,B,B,B,B,B,B,B,B,B,A,N,N],
        [N,N,N,A,B,B,B,B,B,B,B,A,N,N,N],
        [N,N,N,N,A,B,B,B,B,B,A,N,N,N,N],
        [N,N,N,N,N,A,B,B,B,A,N,N,N,N,N],
        [N,N,N,N,N,N,A,B,A,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,A,N,N,N,N,N,N,N]
      ];
    })(),
  },
  {
    id: 3, name: "Étoile", emoji: "⭐",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#FFD700", "#FFA500"],
    grid: (() => {
      const N = null, Y = "#FFD700", O = "#FFA500";
      return [[N,N,N,N,Y,Y,N,N,N,N],[N,N,N,Y,Y,Y,Y,N,N,N],[Y,Y,Y,Y,Y,Y,Y,Y,Y,Y],[N,Y,Y,Y,Y,Y,Y,Y,Y,N],[N,N,O,Y,Y,Y,Y,O,N,N],[N,N,Y,Y,Y,Y,Y,Y,N,N],[N,Y,Y,N,Y,Y,N,Y,Y,N],[Y,Y,N,N,Y,Y,N,N,Y,Y],[Y,N,N,N,N,N,N,N,N,Y],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 4, name: "Maison", emoji: "🏠",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#D0021B", "#8B4513", "#F5A623", "#4A90D9", "#417505"],
    grid: (() => {
      const N = null, R = "#D0021B", B = "#8B4513", O = "#F5A623", L = "#4A90D9", G = "#417505";
      return [[N,N,N,N,R,R,N,N,N,N],[N,N,N,R,R,R,R,N,N,N],[N,N,R,R,R,R,R,R,N,N],[N,R,R,R,R,R,R,R,R,N],[R,R,R,R,R,R,R,R,R,R],[B,B,B,B,B,B,B,B,B,B],[B,L,L,B,B,B,B,L,L,B],[B,L,L,B,O,O,B,L,L,B],[B,B,B,B,O,O,B,B,B,B],[G,G,G,G,O,O,G,G,G,G]];
    })(),
  },
  {
    id: 5, name: "Champignon", emoji: "🍄",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#D0021B", "#FFFFFF", "#8B4513", "#F5DEB3"],
    grid: (() => {
      const N = null, R = "#D0021B", W = "#FFFFFF", B = "#8B4513", T = "#F5DEB3";
      return [[N,N,N,R,R,R,R,N,N,N],[N,N,R,R,R,R,R,R,N,N],[N,R,R,W,W,R,W,W,R,N],[R,R,R,W,W,R,W,W,R,R],[R,R,R,R,R,R,R,R,R,R],[R,R,R,R,R,R,R,R,R,R],[N,R,R,R,R,R,R,R,R,N],[N,N,T,T,T,T,T,T,N,N],[N,N,N,T,T,T,T,N,N,N],[N,N,N,B,B,B,B,N,N,N]];
    })(),
  },
  {
    id: 6, name: "Crâne", emoji: "💀",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#F5F5DC", "#000000"],
    grid: (() => {
      const N = null, W = "#F5F5DC", B = "#000000";
      return [[N,N,N,W,W,W,W,N,N,N],[N,N,W,W,W,W,W,W,N,N],[N,W,W,W,W,W,W,W,W,N],[W,W,B,B,W,W,B,B,W,W],[W,W,B,B,W,W,B,B,W,W],[W,W,W,W,W,W,W,W,W,W],[W,W,B,W,B,B,W,B,W,W],[N,W,W,B,W,W,B,W,W,N],[N,N,W,W,W,W,W,W,N,N],[N,N,N,W,W,W,W,N,N,N]];
    })(),
  },
  {
    id: 7, name: "Cactus", emoji: "🌵",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#417505", "#228B22", "#8B4513"],
    grid: (() => {
      const N = null, G = "#417505", D = "#228B22", B = "#8B4513";
      return [[N,N,N,N,G,G,N,N,N,N],[N,N,G,N,G,G,N,G,N,N],[N,N,G,N,G,G,N,G,N,N],[N,N,G,G,G,G,G,G,N,N],[N,N,D,N,G,G,N,D,N,N],[N,N,N,N,G,G,N,N,N,N],[N,N,N,N,G,G,N,N,N,N],[N,N,N,N,G,G,N,N,N,N],[N,N,B,B,G,G,B,B,N,N],[N,N,B,B,B,B,B,B,N,N]];
    })(),
  },
  {
    id: 8, name: "Couronne", emoji: "👑",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#FFD700", "#FFA500", "#D0021B"],
    grid: (() => {
      const N = null, Y = "#FFD700", O = "#FFA500", R = "#D0021B";
      return [[N,N,N,N,N,N,N,N,N,N],[Y,N,N,Y,N,Y,N,N,Y,N],[Y,Y,N,Y,N,Y,N,Y,Y,N],[Y,Y,Y,Y,Y,Y,Y,Y,Y,Y],[Y,R,Y,Y,R,R,Y,Y,R,Y],[Y,Y,Y,Y,Y,Y,Y,Y,Y,Y],[Y,O,O,O,O,O,O,O,O,Y],[Y,O,O,O,O,O,O,O,O,Y],[N,Y,Y,Y,Y,Y,Y,Y,Y,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 9, name: "Fusée", emoji: "🚀",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#FFFFFF", "#D0021B", "#808080", "#4A90D9", "#FF6B00"],
    grid: (() => {
      const N = null, W = "#FFFFFF", R = "#D0021B", G = "#808080", B = "#4A90D9", O = "#FF6B00";
      return [[N,N,N,N,W,W,N,N,N,N],[N,N,N,W,W,W,W,N,N,N],[N,N,W,W,B,B,W,W,N,N],[N,N,W,W,B,B,W,W,N,N],[N,N,W,W,W,W,W,W,N,N],[R,N,W,W,W,W,W,W,N,R],[R,R,W,G,W,W,G,W,R,R],[N,R,W,W,W,W,W,W,R,N],[N,N,O,W,O,O,W,O,N,N],[N,N,O,O,N,N,O,O,N,N]];
    })(),
  },
  {
    id: 10, name: "Diamant", emoji: "💎",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#4A90D9", "#87CEEB", "#FFFFFF", "#1A5276"],
    grid: (() => {
      const N = null, B = "#4A90D9", L = "#87CEEB", W = "#FFFFFF", D = "#1A5276";
      return [[N,N,N,B,B,B,B,N,N,N],[N,N,B,B,L,L,B,B,N,N],[N,B,B,L,W,W,L,B,B,N],[B,B,B,B,B,B,B,B,B,B],[B,B,B,B,B,B,B,B,B,B],[N,B,D,B,B,B,B,D,B,N],[N,N,B,D,B,B,D,B,N,N],[N,N,N,B,D,D,B,N,N,N],[N,N,N,N,B,B,N,N,N,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 11, name: "Fleur", emoji: "🌸",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#FF69B4", "#FFD700", "#417505", "#FFFFFF"],
    grid: (() => {
      const N = null, P = "#FF69B4", Y = "#FFD700", G = "#417505", W = "#FFFFFF";
      return [[N,N,P,P,N,N,P,P,N,N],[N,P,P,P,P,P,P,P,P,N],[P,P,P,P,P,P,P,P,P,P],[P,P,P,Y,Y,Y,Y,P,P,P],[N,P,P,Y,W,W,Y,P,P,N],[N,P,P,Y,W,W,Y,P,P,N],[P,P,P,Y,Y,Y,Y,P,P,P],[N,N,N,N,G,G,N,N,N,N],[N,N,N,N,G,G,N,N,N,N],[N,N,N,G,G,G,G,N,N,N]];
    })(),
  },
  {
    id: 12, name: "Robot", emoji: "🤖",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#808080", "#4A90D9", "#D0021B", "#FFD700", "#000000"],
    grid: (() => {
      const N = null, G = "#808080", B = "#4A90D9", R = "#D0021B", Y = "#FFD700", K = "#000000";
      return [[N,N,N,N,G,G,N,N,N,N],[N,N,G,G,G,G,G,G,N,N],[N,G,G,B,B,B,B,G,G,N],[G,G,G,B,K,K,B,G,G,G],[G,G,G,G,G,G,G,G,G,G],[G,G,R,G,G,G,G,R,G,G],[G,G,G,G,Y,Y,G,G,G,G],[G,G,G,G,Y,Y,G,G,G,G],[N,G,G,G,G,G,G,G,G,N],[N,N,G,G,N,N,G,G,N,N]];
    })(),
  },
  {
    id: 13, name: "Fantôme", emoji: "👻",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#FFFFFF", "#000000", "#87CEEB", "#808080"],
    grid: (() => {
      const N = null, W = "#FFFFFF", B = "#000000", L = "#87CEEB", G = "#808080";
      return [[N,N,N,W,W,W,W,N,N,N],[N,N,W,W,W,W,W,W,N,N],[N,W,W,L,W,W,L,W,W,N],[W,W,W,B,B,B,B,W,W,W],[W,W,W,B,B,B,B,W,W,W],[W,W,W,W,W,W,W,W,W,W],[W,W,W,W,W,W,W,W,W,W],[W,G,W,G,W,G,W,G,W,W],[W,N,W,N,W,N,W,N,W,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 14, name: "Arc-en-ciel", emoji: "🌈",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#E8001D", "#FF6B00", "#FFD700", "#417505", "#4A90D9", "#7B2FBE"],
    grid: (() => {
      const N = null, R = "#E8001D", O = "#FF6B00", Y = "#FFD700", G = "#417505", B = "#4A90D9", V = "#7B2FBE";
      return [[N,N,N,V,V,V,V,N,N,N],[N,N,V,V,B,B,V,V,N,N],[N,V,V,B,B,G,B,B,V,N],[V,V,B,B,G,G,G,B,B,V],[N,V,B,G,G,Y,G,G,B,N],[N,N,B,G,Y,Y,Y,G,N,N],[N,N,N,Y,Y,O,Y,N,N,N],[N,N,N,N,O,O,N,N,N,N],[N,N,N,N,R,R,N,N,N,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 15, name: "Soleil", emoji: "☀️",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#FFD700", "#FFA500"],
    grid: (() => {
      const N = null, Y = "#FFD700", O = "#FFA500";
      return [[Y,N,N,Y,N,N,Y,N,N,Y],[N,Y,N,N,N,N,N,N,Y,N],[N,N,Y,Y,Y,Y,Y,Y,N,N],[Y,N,Y,O,O,O,O,Y,N,Y],[N,N,Y,O,Y,Y,O,Y,N,N],[N,N,Y,O,Y,Y,O,Y,N,N],[Y,N,Y,O,O,O,O,Y,N,Y],[N,N,Y,Y,Y,Y,Y,Y,N,N],[N,Y,N,N,N,N,N,N,Y,N],[Y,N,N,Y,N,N,Y,N,N,Y]];
    })(),
  },
  {
    id: 16, name: "Planète", emoji: "🪐",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#4A90D9", "#87CEEB", "#F5A623", "#808080"],
    grid: (() => {
      const N = null, B = "#4A90D9", L = "#87CEEB", O = "#F5A623", G = "#808080";
      return [[N,N,N,B,B,B,B,N,N,N],[N,N,B,B,L,B,B,B,N,N],[O,N,B,B,B,B,B,B,N,O],[O,O,B,B,B,B,B,B,O,O],[N,O,O,B,B,B,B,O,O,N],[N,N,O,B,G,G,B,O,N,N],[N,N,B,B,B,B,B,B,N,N],[N,N,B,B,B,B,B,B,N,N],[N,N,N,B,B,B,B,N,N,N],[N,N,N,N,B,B,N,N,N,N]];
    })(),
  },
  {
    id: 17, name: "Arbre", emoji: "🌲",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#417505", "#228B22", "#8B4513"],
    grid: (() => {
      const N = null, G = "#417505", D = "#228B22", B = "#8B4513";
      return [[N,N,N,N,G,G,N,N,N,N],[N,N,N,G,G,G,G,N,N,N],[N,N,G,G,G,G,G,G,N,N],[N,G,G,D,G,G,D,G,G,N],[G,G,G,G,G,G,G,G,G,G],[N,N,G,G,G,G,G,G,N,N],[N,N,N,G,G,G,G,N,N,N],[N,N,N,N,B,B,N,N,N,N],[N,N,N,N,B,B,N,N,N,N],[N,N,N,N,B,B,N,N,N,N]];
    })(),
  },
  {
    id: /* ⚠️ CHANGER */ 99, name: "Poisson", emoji: "🎨",
    type: "standard",
    cols: 20, rows: 20,
    palette: ["#000000", "#3584e4"],
    grid: (() => {
      const N = null, A = "#000000", B = "#3584e4";
      return [
        [N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,N,N,A,A,A,A,N,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,A,A,B,B,B,A,N,N,N,N,N,N,N],
        [N,N,N,N,N,A,A,B,B,A,A,A,N,N,N,N,N,A,A,N],
        [N,N,N,N,A,B,B,B,B,B,B,B,A,N,N,N,A,B,A,N],
        [N,N,N,A,B,B,B,B,B,B,B,B,B,A,N,A,B,B,A,N],
        [N,N,A,B,B,A,B,B,A,B,B,B,B,B,A,B,B,B,A,N],
        [N,N,A,B,B,B,B,B,A,B,B,B,B,B,B,B,B,A,N,N],
        [N,N,A,B,B,B,B,B,A,B,B,B,B,B,A,B,B,B,A,N],
        [N,N,N,A,B,B,B,B,A,B,B,B,B,A,N,A,B,B,A,N],
        [N,N,N,N,A,B,B,A,B,B,B,B,A,N,N,N,A,B,A,N],
        [N,N,N,N,N,A,A,B,B,B,B,A,N,N,N,N,N,A,A,N],
        [N,N,N,N,N,N,N,A,A,A,A,N,N,N,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,N,A,N,N,A,N,N,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,N,N,A,A,A,N,N,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N]
      ];
    })(),
  },
  {
    id: 19, name: "Glace", emoji: "🍦",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#FF69B4", "#F5DEB3", "#8B4513", "#FFFFFF"],
    grid: (() => {
      const N = null, P = "#FF69B4", T = "#F5DEB3", B = "#8B4513", W = "#FFFFFF";
      return [[N,N,N,P,P,P,P,N,N,N],[N,N,P,P,W,P,P,P,N,N],[N,N,P,P,P,P,P,P,N,N],[N,N,N,P,P,P,P,N,N,N],[N,N,N,T,T,T,T,N,N,N],[N,N,N,T,T,T,T,N,N,N],[N,N,N,N,T,T,N,N,N,N],[N,N,N,N,T,T,N,N,N,N],[N,N,N,N,T,T,N,N,N,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
  {
    id: 20, name: "Épée", emoji: "⚔️",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#C0C0C0", "#8B6914", "#FFD700", "#808080"],
    grid: (() => {
      const N = null, S = "#C0C0C0", B = "#8B6914", G = "#FFD700", D = "#808080";
      return [[N,N,N,N,N,N,N,N,S,N],[N,N,N,N,N,N,N,S,D,N],[N,N,N,N,N,N,S,D,N,N],[N,N,N,N,N,S,D,N,N,N],[N,G,G,N,S,D,N,N,N,N],[G,G,G,G,S,N,N,N,N,N],[N,G,G,B,N,N,N,N,N,N],[N,N,B,B,B,N,N,N,N,N],[N,B,B,N,B,B,N,N,N,N],[N,N,N,N,N,N,N,N,N,N]];
    })(),
  },
    {
    id: 21, name: "Pastèque", emoji: "🎨",
    type: "standard",
    cols: 15, rows: 15,
    palette: ["#557b05", "#ef2525", "#88aa00", "#000000", "#f66151"],
    grid: (() => {
      const N = null, A = "#88aa00", B = "#557b05", C = "#ef2525", D = "#f66151", E = "#000000";
      return [
        [N,N,N,N,N,N,N,N,N,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,N,N,N,A,B,N,N,N],
        [N,N,N,N,N,N,N,N,N,C,D,A,B,N,N],
        [N,N,N,N,N,N,N,N,C,C,D,D,A,B,N],
        [N,N,N,N,N,N,N,C,C,E,C,D,A,B,N],
        [N,N,N,N,N,N,C,C,C,C,C,D,A,B,N],
        [N,N,N,N,N,C,C,C,E,C,C,D,A,B,N],
        [N,N,N,N,C,C,C,C,C,C,C,D,A,B,N],
        [N,N,N,C,C,C,E,C,C,C,D,D,A,B,N],
        [N,N,C,C,E,C,C,C,C,C,D,A,B,N,N],
        [N,A,D,D,C,C,C,C,D,D,A,B,B,N,N],
        [N,B,A,D,D,D,D,D,D,A,B,B,N,N,N],
        [N,N,B,A,A,A,A,A,A,B,B,N,N,N,N],
        [N,N,N,N,B,B,B,B,B,N,N,N,N,N,N],
        [N,N,N,N,N,N,N,N,N,N,N,N,N,N,N]
      ];
    })(),
  },
    {
    id: 22, name: "Cigogne", emoji: "🎨",
    type: "standard",
    cols: 15, rows: 15,
    palette: ["#000000", "#ff7800", "#ffffff", "#99c1f1", "#3584e4", "#8ff0a4", "#33d17a", "#c0bfbc", "#ffbe6f"],
    grid: (() => {
      const N = null, A = "#99c1f1", B = "#000000", C = "#ffffff", D = "#ff7800", E = "#3584e4", F = "#c0bfbc", G = "#8ff0a4", H = "#33d17a", I = "#ffbe6f";
      return [
        [A,A,A,A,A,B,C,C,A,A,A,A,A,A,A],
        [A,D,D,D,D,C,C,C,A,A,A,A,E,E,E],
        [A,A,A,A,A,A,C,C,A,A,A,A,E,E,E],
        [A,A,A,A,A,A,C,C,A,E,E,E,E,E,E],
        [A,A,A,A,A,A,C,C,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,C,C,A,A,A,A,A,A,A],
        [E,E,E,A,A,A,C,C,A,A,A,A,A,A,A],
        [E,E,E,E,E,A,C,C,C,C,A,A,A,A,A],
        [A,A,A,A,A,A,F,C,C,C,C,C,A,A,A],
        [A,A,A,A,A,A,F,C,C,C,C,F,A,A,A],
        [G,G,G,G,G,G,F,F,F,C,F,F,B,G,H],
        [G,G,G,G,G,G,H,H,F,F,F,F,B,G,G],
        [G,G,G,H,H,H,H,H,D,I,B,B,B,B,B],
        [G,G,H,H,H,H,H,H,D,I,H,B,B,B,B],
        [G,G,H,H,H,H,H,D,D,I,H,H,H,H,H]
      ];
    })(),
  },
    {
    id: 23, name: "Cygne", emoji: "🎨",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#a5bee8", "#eeaedd", "#ffffff", "#071e6b", "#f6d32d", "#fba008", "#62a0ea"],
    grid: (() => {
      const N = null, A = "#eeaedd", B = "#ffffff", C = "#a5bee8", D = "#071e6b", E = "#f6d32d", F = "#fba008", G = "#62a0ea";
      return [
        [A,A,A,B,C,A,A,A,A,A],
        [A,A,B,D,B,C,A,A,A,A],
        [A,E,F,B,B,B,C,A,A,A],
        [A,A,A,A,B,B,C,A,A,B],
        [A,A,A,B,B,C,A,A,B,C],
        [A,B,B,C,G,A,G,B,C,B],
        [B,B,C,G,A,G,B,C,G,G],
        [C,B,G,G,G,B,C,G,B,B],
        [C,B,B,B,B,C,C,B,G,G],
        [G,C,C,C,B,B,C,G,G,C]
      ];
    })(),
  },
    {
    id: 25, name: "Chateau", emoji: "🎨",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#10e4f9", "#4c2933", "#add3e2", "#377aa8", "#e80d2c", "#ecb14c"],
    grid: (() => {
      const N = null, A = "#10e4f9", B = "#e80d2c", C = "#27d4e4", D = "#ecb14c", E = "#add3e2", F = "#377aa8", G = "#4c2933";
      return [
        [A,A,A,A,B,A,A,A,A,A],
        [C,A,A,B,B,B,A,A,A,A],
        [C,C,D,D,D,D,D,A,A,A],
        [C,C,C,E,E,E,A,A,A,A],
        [A,E,C,E,F,E,A,E,A,E],
        [E,E,C,E,E,E,A,E,E,E],
        [F,E,E,E,G,E,E,E,F,E],
        [F,E,E,G,G,G,E,E,F,E],
        [E,E,E,G,G,G,E,E,E,E],
        [E,E,E,G,G,G,E,E,E,E]
      ];
    })(),
  },
    {
    id: 26, name: "Sumo", emoji: "🎨",
    type: "standard",
    cols: 15, rows: 15,
    palette: ["#edc2a5", "#7cebca", "#cd8264", "#1c1e30", "#743f3a"],
    grid: (() => {
      const N = null, A = "#7cebca", B = "#1c1e30", C = "#edc2a5", D = "#cd8264", E = "#743f3a", F = "#cc8264";
      return [
        [A,A,A,A,A,B,B,B,B,B,A,A,A,A,A],
        [A,A,A,A,A,B,C,C,D,B,A,A,A,A,A],
        [A,A,A,C,D,C,E,C,E,D,D,D,A,A,A],
        [A,A,C,C,D,C,C,C,C,D,D,D,D,A,A],
        [A,A,C,C,C,D,C,C,D,D,D,D,D,A,A],
        [A,C,C,C,C,C,C,D,D,C,C,F,D,D,A],
        [A,C,C,C,D,C,C,D,C,C,C,C,D,D,A],
        [C,C,C,D,C,C,D,D,D,D,D,C,C,D,D],
        [C,C,C,D,D,F,F,C,C,C,D,C,C,D,D],
        [D,F,C,C,D,F,C,C,C,D,D,C,C,D,D],
        [C,D,C,C,C,D,A,A,A,D,C,C,D,D,D],
        [C,C,D,C,C,A,A,A,A,A,C,C,D,D,A],
        [A,C,D,A,A,A,A,A,A,A,A,A,C,D,A],
        [C,D,D,A,A,A,A,A,A,A,A,A,C,C,D],
        [C,D,D,A,A,A,A,A,A,A,A,A,C,C,D]
      ];
    })(),
  },
    {
    id: 27, name: "Caravelle", emoji: "🎨",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#894003", "#82171f", "#f41515", "#ffcc2b", "#fdefc2", "#001da8", "#0378c9"],
    grid: (() => {
      const N = null, A = "#f41515", B = "#fdefc2", C = "#ffcc2b", D = "#894003", E = "#82171f", F = "#0378c9", G = "#001da8";
      return [
        [A,A,B,B,A,A,B,B,B,B],
        [B,A,A,B,B,A,A,B,C,C],
        [C,A,A,C,C,A,A,C,C,C],
        [A,A,A,C,A,A,A,C,C,C],
        [C,C,D,C,C,D,C,C,D,D],
        [D,C,D,C,C,D,C,C,D,D],
        [D,D,D,D,D,D,D,D,D,C],
        [D,D,E,D,E,D,E,D,D,F],
        [F,D,D,D,D,D,D,D,F,G],
        [G,G,G,F,F,F,F,G,G,G]
      ];
    })(),
  },
    {
    id: 28, name: "Frites", emoji: "🎨",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#faab0d", "#fde51f", "#99c1f1", "#ed333b", "#c01c28"],
    grid: (() => {
      const N = null, A = "#99c1f1", B = "#fde51f", C = "#faab0d", D = "#ffbd00", E = "#c01c28", F = "#ed333b";
      return [
        [A,A,A,A,B,C,A,A,B,A],
        [A,D,B,A,B,C,A,C,B,A],
        [B,D,B,A,B,C,A,C,B,C],
        [B,C,B,B,B,C,C,B,C,C],
        [B,B,C,B,C,B,C,B,C,B],
        [C,B,C,B,C,B,C,B,C,B],
        [E,F,C,B,C,B,C,B,F,E],
        [E,F,F,B,C,B,C,F,F,E],
        [E,E,F,F,F,F,F,F,E,E],
        [E,E,E,F,B,C,F,E,E,E]
      ];
    })(),
  },
    {
    id: 29, name: "Tournesol", emoji: "🎨",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#00c5fb", "#ffad00", "#316d08", "#fa8100", "#ffd500", "#85462a"],
    grid: (() => {
      const N = null, A = "#00c5fb", B = "#fa8100", C = "#ffd500", D = "#85462a", E = "#ffad00", F = "#316d08";
      return [
        [A,A,A,A,B,B,A,A,A,A],
        [A,B,C,C,B,B,C,C,B,A],
        [A,B,B,D,D,D,D,B,B,A],
        [C,C,D,D,D,D,D,D,C,C],
        [E,E,D,D,D,D,D,D,E,E],
        [A,B,B,D,D,D,D,B,B,A],
        [B,B,C,C,B,B,C,C,B,B],
        [A,A,C,A,B,B,A,C,A,A],
        [A,F,F,A,F,F,A,F,F,A],
        [A,A,F,F,F,F,F,F,A,A]
      ];
    })(),
  },
    {
    id: 30, name: "Chat noir", emoji: "🎨",
    type: "standard",
    cols: 15, rows: 15,
    palette: ["#5b7f46", "#b5d9f7", "#202121", "#36384a", "#33d17a", "#ffffff", "#fc9bc4", "#865e3c"],
    grid: (() => {
      const N = null, A = "#b5d9f7", B = "#fc9bc4", C = "#a4cbea", D = "#ffffff", E = "#36384a", F = "#202121", G = "#33d17a", H = "#5b7f46", I = "#865e3c";
      return [
        [A,A,A,A,A,B,C,C,B,A,A,A,A,A,A],
        [D,D,A,A,A,E,E,F,B,A,A,A,A,D,A],
        [A,A,A,A,E,G,F,G,E,A,A,D,D,D,D],
        [A,A,A,A,E,E,B,E,E,F,A,A,A,A,A],
        [A,A,A,A,A,E,E,E,F,F,F,A,A,A,A],
        [A,H,H,A,A,A,F,F,F,F,F,F,A,A,A],
        [H,H,H,H,H,A,E,E,F,F,F,F,F,A,A],
        [H,H,H,H,H,H,E,E,E,F,F,F,E,F,H],
        [H,H,H,H,H,H,A,E,E,F,F,E,F,F,H],
        [H,H,H,H,H,H,H,E,E,E,F,E,F,F,H],
        [H,H,H,H,H,H,H,F,F,E,F,E,F,F,H],
        [H,H,H,H,H,H,E,F,E,E,F,E,F,F,H],
        [I,I,I,I,I,I,I,I,I,I,I,I,F,F,I],
        [I,I,I,I,I,I,I,I,I,E,E,F,F,F,I],
        [I,I,I,I,E,E,E,E,E,E,E,F,F,F,I]
      ];
    })(),
  },
    {
    id: 31, name: "Grenouille", emoji: "🎨",
    type: "standard",
    cols: 15, rows: 15,
    palette: ["#5b7f46", "#b5d9f7", "#202121", "#36384a", "#33d17a", "#ffffff", "#fc9bc4", "#865e3c"],
    grid: (() => {
      const N = null, A = "#b5d9f7", B = "#fc9bc4", C = "#a4cbea", D = "#ffffff", E = "#36384a", F = "#202121", G = "#33d17a", H = "#5b7f46", I = "#865e3c";
      return [
        [A,A,A,A,A,B,C,C,B,A,A,A,A,A,A],
        [D,D,A,A,A,E,E,F,B,A,A,A,A,D,A],
        [A,A,A,A,E,G,F,G,E,A,A,D,D,D,D],
        [A,A,A,A,E,E,B,E,E,F,A,A,A,A,A],
        [A,A,A,A,A,E,E,E,F,F,F,A,A,A,A],
        [A,H,H,A,A,A,F,F,F,F,F,F,A,A,A],
        [H,H,H,H,H,A,E,E,F,F,F,F,F,A,A],
        [H,H,H,H,H,H,E,E,E,F,F,F,E,F,H],
        [H,H,H,H,H,H,A,E,E,F,F,E,F,F,H],
        [H,H,H,H,H,H,H,E,E,E,F,E,F,F,H],
        [H,H,H,H,H,H,H,F,F,E,F,E,F,F,H],
        [H,H,H,H,H,H,E,F,E,E,F,E,F,F,H],
        [I,I,I,I,I,I,I,I,I,I,I,I,F,F,I],
        [I,I,I,I,I,I,I,I,I,E,E,F,F,F,I],
        [I,I,I,I,E,E,E,E,E,E,E,F,F,F,I]
      ];
    })(),
  },
      {
    id: 32, name: "Nichoir", emoji: "🎨",
    type: "standard",
    cols: 15, rows: 15,
    palette: ["#5b7f46", "#b5d9f7", "#202121", "#36384a", "#33d17a", "#ffffff", "#fc9bc4", "#865e3c"],
    grid: (() => {
      const N = null, A = "#b5d9f7", B = "#fc9bc4", C = "#a4cbea", D = "#ffffff", E = "#36384a", F = "#202121", G = "#33d17a", H = "#5b7f46", I = "#865e3c";
      return [
        [A,A,A,A,A,B,C,C,B,A,A,A,A,A,A],
        [D,D,A,A,A,E,E,F,B,A,A,A,A,D,A],
        [A,A,A,A,E,G,F,G,E,A,A,D,D,D,D],
        [A,A,A,A,E,E,B,E,E,F,A,A,A,A,A],
        [A,A,A,A,A,E,E,E,F,F,F,A,A,A,A],
        [A,H,H,A,A,A,F,F,F,F,F,F,A,A,A],
        [H,H,H,H,H,A,E,E,F,F,F,F,F,A,A],
        [H,H,H,H,H,H,E,E,E,F,F,F,E,F,H],
        [H,H,H,H,H,H,A,E,E,F,F,E,F,F,H],
        [H,H,H,H,H,H,H,E,E,E,F,E,F,F,H],
        [H,H,H,H,H,H,H,F,F,E,F,E,F,F,H],
        [H,H,H,H,H,H,E,F,E,E,F,E,F,F,H],
        [I,I,I,I,I,I,I,I,I,I,I,I,F,F,I],
        [I,I,I,I,I,I,I,I,I,E,E,F,F,F,I],
        [I,I,I,I,E,E,E,E,E,E,E,F,F,F,I]
      ];
    })(),
  },
    {
    id: 33, name: "Perroquet", emoji: "🎨",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#315d2b", "#54c31b", "#65a7dd", "#ec6024", "#dbba34", "#071e6b", "#1c71d8", "#f9f06b"],
    grid: (() => {
      const N = null, A = "#315d2b", B = "#54c31b", C = "#dbba34", D = "#f9f06b", E = "#071e6b", F = "#65a7dd", G = "#ec6024", H = "#1c71d8";
      return [
        [N,N,A,B,B,B,C,C,N,N],
        [N,A,B,B,B,D,D,C,C,N],
        [N,A,B,B,D,D,E,C,E,F],
        [A,A,A,D,G,G,D,D,E,F],
        [A,A,A,D,G,G,D,D,N,E],
        [A,H,H,D,D,D,D,N,N,N],
        [H,H,F,F,H,H,G,G,N,N],
        [H,H,H,F,F,H,H,G,G,N],
        [H,H,H,F,F,F,H,G,G,N],
        [H,H,H,F,F,F,H,G,G,N]
      ];
    })(),
  },
    {
    id: 34, name: "Poussin", emoji: "🎨",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#315d2b", "#54c31b", "#65a7dd", "#ec6024", "#dbba34", "#071e6b", "#1c71d8", "#f9f06b"],
    grid: (() => {
      const N = null, A = "#315d2b", B = "#54c31b", C = "#dbba34", D = "#f9f06b", E = "#071e6b", F = "#65a7dd", G = "#ec6024", H = "#1c71d8";
      return [
        [N,N,A,B,B,B,C,C,N,N],
        [N,A,B,B,B,D,D,C,C,N],
        [N,A,B,B,D,D,E,C,E,F],
        [A,A,A,D,G,G,D,D,E,F],
        [A,A,A,D,G,G,D,D,N,E],
        [A,H,H,D,D,D,D,N,N,N],
        [H,H,F,F,H,H,G,G,N,N],
        [H,H,H,F,F,H,H,G,G,N],
        [H,H,H,F,F,F,H,G,G,N],
        [H,H,H,F,F,F,H,G,G,N]
      ];
    })(),
  },
    {
    id: 35, name: "Oiseaux", emoji: "🎨",
    type: "standard",
    cols: 15, rows: 15,
    palette: ["#82b9c0", "#6b391f", "#626a26", "#b96c44", "#fbfeff", "#0c0537", "#f6d32d"],
    grid: (() => {
      const N = null, A = "#82b9c0", B = "#f6d32d", C = "#fbfeff", D = "#6b391f", E = "#b96c44", F = "#0c0537", G = "#626a26", H = "#e5d66b";
      return [
        [A,A,A,A,A,A,A,A,A,B,B,A,A,C,C],
        [A,A,A,D,D,D,A,A,A,B,B,A,C,C,C],
        [A,A,D,D,D,E,E,A,A,A,A,A,A,A,A],
        [A,A,C,C,D,C,C,A,A,A,A,A,A,A,A],
        [A,A,C,F,D,C,F,A,A,A,D,D,D,A,A],
        [A,D,D,B,B,B,D,D,A,F,C,D,F,C,A],
        [A,D,D,D,B,D,D,D,A,C,C,D,C,C,A],
        [G,D,D,H,H,H,D,D,A,D,D,B,D,D,A],
        [G,D,E,H,H,H,D,E,G,D,D,D,D,D,D],
        [G,G,E,E,E,E,E,D,D,D,B,D,B,D,D],
        [D,D,D,B,D,B,D,D,A,D,E,E,E,D,A],
        [G,G,D,E,E,E,E,D,A,A,E,E,E,G,G],
        [G,G,G,G,E,E,A,A,A,A,A,E,G,G,G],
        [G,G,G,G,G,G,A,A,A,G,G,G,G,G,G],
        [G,G,G,G,G,G,G,G,G,G,G,G,G,G,G]
      ];
    })(),
  },
    {
    id: 36, name: "Chaudron", emoji: "🎨",
    type: "standard",
    cols: 10, rows: 10,
    palette: ["#1669b6", "#00274b", "#2e594e", "#fcd736", "#fba008"],
    grid: (() => {
      const N = null, A = "#fcd736", B = "#fba008", C = "#1669b6", D = "#2e594e", E = "#00274b", F = "#fabc1e";
      return [
        [A,A,A,A,B,B,B,A,B,B],
        [A,A,A,B,B,A,B,B,B,A],
        [A,A,C,C,C,C,C,C,A,A],
        [A,C,D,D,D,D,D,D,C,A],
        [A,C,C,C,C,C,C,C,C,A],
        [A,A,E,E,E,E,E,E,A,A],
        [E,C,C,E,C,E,C,E,E,E],
        [A,C,E,C,E,C,E,C,E,A],
        [A,E,C,E,C,E,C,E,E,F],
        [B,B,E,E,E,E,E,E,B,B]
      ];
    })(),
  },
    {
    id: 37, name: "Kangourou", emoji: "🎨",
    type: "standard",
    cols: 15, rows: 15,
    palette: ["#fba00b", "#4f331c", "#4a8829", "#f3cb5f", "#b7dcfa", "#7aaf52"],
    grid: (() => {
      const N = null, A = "#b7dcfa", B = "#fba00b", C = "#4a8829", D = "#7aaf52", E = "#4f331c", F = "#f3cb5f";
      return [
        [A,B,A,A,A,B,A,A,A,A,A,C,C,C,C],
        [A,B,B,A,B,B,A,A,C,D,A,C,C,E,D],
        [A,A,E,B,E,A,A,C,C,D,D,C,C,E,E],
        [A,A,B,B,B,A,A,C,E,E,D,D,C,C,E],
        [A,A,F,E,F,A,A,C,C,E,E,E,D,C,E],
        [A,A,A,F,B,A,A,A,C,C,C,E,E,E,E],
        [A,A,A,B,B,B,A,A,A,A,A,A,A,E,E],
        [B,B,B,F,B,B,F,F,F,F,F,F,A,A,E],
        [B,A,A,F,F,B,B,B,B,B,B,B,F,A,E],
        [A,A,B,B,B,F,B,B,B,F,F,B,B,A,E],
        [A,A,B,A,A,F,F,B,F,F,F,F,B,A,E],
        [A,A,A,A,A,A,B,B,F,F,F,B,B,A,E],
        [D,D,D,D,D,D,D,E,F,D,D,B,B,B,E],
        [D,D,D,D,D,E,F,F,F,D,D,D,B,B,B],
        [N,N,N,N,N,E,N,E,E,N,N,N,N,N,N]
      ];
    })(),
  },
    {
    id: 38, name: "Chat en boite", emoji: "🎨",
    type: "standard",
    cols: 15, rows: 15,
    palette: ["#2d2e3a", "#a1341d", "#0f5e9e", "#ed9f9f", "#ffffff", "#fba008"],
    grid: (() => {
      const N = null, A = "#ed9f9f", B = "#2d2e3a", C = "#a1341d", D = "#0f5e9e", E = "#ffffff", F = "#eaa087", G = "#fba008";
      return [
        [A,A,A,B,B,A,A,A,A,B,B,A,A,A,A],
        [A,A,A,C,B,B,A,A,B,B,C,A,A,A,A],
        [A,A,A,C,C,B,D,D,B,C,C,A,A,A,A],
        [A,A,A,D,D,D,D,D,B,B,B,A,A,A,A],
        [A,A,A,D,B,E,D,B,E,B,B,A,A,A,A],
        [A,A,D,D,D,D,C,D,D,B,B,B,A,A,A],
        [A,A,A,D,D,D,D,D,B,B,B,F,A,A,A],
        [A,G,G,G,G,G,G,G,G,G,G,G,G,G,A],
        [A,G,G,G,G,G,G,G,G,G,G,G,G,G,A],
        [A,G,G,G,G,G,G,G,G,G,G,G,G,G,A],
        [A,G,G,G,G,G,G,G,G,G,G,G,G,G,A],
        [A,G,G,G,G,G,G,G,G,G,G,G,G,G,A],
        [A,G,G,G,G,G,G,G,G,G,G,G,G,G,A],
        [A,G,G,G,G,G,G,G,G,G,G,G,G,G,A],
        [A,G,G,G,G,G,G,G,G,G,G,G,G,G,A]
      ];
    })(),
  },

  // ─────────────────────────────────────────────
  // NIVEAUX ÉVÉNEMENTS
  // ─────────────────────────────────────────────
  {
    id: 24,
    name: "Jack-o-lantern",
    emoji: "🎃",
    type: "event",
    eventId: "event001",
    cols: 30, rows: 30,
    palette: ["#e8e8e8", "#3c342a", "#d47325", "#eeff00"],
    grid: (() => {
      const N = null, A = "#e8e8e8", B = "#3c342a", C = "#d47325", D = "#eeff00";
      return [
        [A,A,A,A,A,A,A,A,A,B,A,A,A,A,A,A,A,A,A,A,B,A,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,B,B,A,A,A,A,A,A,A,A,A,A,B,B,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,B,B,A,A,A,A,A,A,A,A,A,A,A,A,B,B,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,B,B,A,A,A,A,A,A,A,A,A,A,A,A,B,B,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,B,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,B,B,A,A,A,B,B,B,B,B,B,B,B,A,A,A,B,B,A,A,A,A,A,A],
        [A,A,A,A,A,A,B,B,B,A,B,C,C,C,C,C,C,C,C,B,A,B,B,B,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,B,B,B,C,C,C,C,C,C,C,C,C,C,B,B,B,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,B,C,B,C,C,C,C,C,C,C,C,B,C,B,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,B,C,B,B,C,C,C,C,C,C,B,B,C,B,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,B,C,B,B,B,C,C,C,C,B,B,B,C,B,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,B,C,B,D,B,B,C,C,B,B,D,B,C,B,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,B,C,C,B,B,C,C,C,C,B,B,C,C,B,A,A,A,A,A,A,A,A],
        [A,B,B,A,A,A,A,A,B,C,B,C,C,C,C,C,C,C,C,B,C,B,A,A,A,A,B,B,A,A],
        [B,C,C,B,B,A,A,A,B,C,B,B,A,B,A,B,A,B,A,B,C,B,A,A,A,B,B,C,B,A],
        [A,B,B,C,B,A,A,A,A,B,C,B,B,B,B,B,B,B,B,C,B,A,A,A,A,B,C,B,A,A],
        [A,A,A,B,C,B,A,A,A,B,C,B,B,A,B,A,B,A,B,C,B,A,A,A,B,C,B,A,A,A],
        [A,A,A,A,B,C,B,A,A,B,C,C,C,C,C,C,C,C,C,C,B,A,A,B,C,B,A,A,A,A],
        [A,A,A,A,A,B,C,B,B,C,C,C,C,C,C,C,C,C,C,C,C,B,B,C,B,A,A,A,A,A],
        [A,A,A,A,A,A,B,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,B,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,B,B,C,C,C,C,C,C,C,C,C,C,C,C,B,B,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,B,C,C,C,C,C,C,C,C,C,C,C,C,B,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,B,C,C,C,C,C,C,C,C,C,C,C,C,B,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,B,C,C,C,C,C,C,C,C,C,C,C,C,B,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,B,C,C,C,B,B,C,C,C,C,B,B,C,C,C,B,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,B,C,C,B,B,B,B,C,B,B,B,B,B,C,C,B,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,A,B,B,A,A,B,B,B,B,A,A,B,B,A,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,A,B,B,A,A,A,A,A,A,A,A,B,B,A,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,B,B,B,B,A,A,A,A,A,A,A,A,B,B,B,B,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
      ];
    })(),
  },
];
