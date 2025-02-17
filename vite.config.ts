import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Đặt alias '@' trỏ đến thư mục 'src'
    },
  },
});
