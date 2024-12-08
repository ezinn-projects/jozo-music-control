/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%, 16.67%': { transform: 'translateX(0)' }, // Đứng yên trong khung (5s)
          '33.33%': { transform: 'translateX(-100%)' }, // Chạy ra khỏi khung (10s)
          '33.34%': { transform: 'translateX(100%)' }, // Xuất hiện từ bên phải
          '50%': { transform: 'translateX(0)' }, // Chạy vào khung (5s)
          '100%': { transform: 'translateX(0)' }, // Đứng yên trong khung (10s)
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
        marquee: 'marquee 30s linear infinite', // Tổng thời gian: 30s
        breathing: "breathing 4s ease-in-out infinite",
        "fade-in-out": "fade-in-out 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}