import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    eslintPlugin({
      cache: false,
      include: ["./src/**/*.js", "./src/**/*.jsx"],
      exclude: [],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://sheets.googleapis.com/v4/spreadsheets", // Base URL for Google Sheets API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/drive-api": {
        target: "https://drive.usercontent.google.com/download",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/drive-api/, ""),
      },
      "/app-scripts-api": {
        target: "https://script.google.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/app-scripts-api/, ""),
      },
    },
  },
});
