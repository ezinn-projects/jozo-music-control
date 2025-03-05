/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#111111",
        tertiary: "#222222",
        quaternary: "#333333",
        quinary: "#444444",
        lightpink: "#FFC0CB",
        lightblue: "#ADD8E6",
        lightgreen: "#90EE90",
        lightyellow: "#FFFFE0",
        lightpurple: "#DDA0DD",
        lightorange: "#FFA500",
        lightred: "#FF0000",
        lightgray: "#D3D3D3",
        lightbrown: "#A52A2A",
        lightgold: "#FFD700",
        lightsilver: "#C0C0C0",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        breathing: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        fadeInOut: {
          "0%": { opacity: 0 },
          "10%": { opacity: 1 },
          "90%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },

      animation: {
        marquee: "marquee 30s linear infinite", // Tổng thời gian: 30s
        breathing: "breathing 4s ease-in-out infinite",
        "fade-in-out": "fade-in-out 3s ease-in-out infinite",
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
