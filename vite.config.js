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
      "/sheets-api": {
        target: "https://sheets.googleapis.com/v4/spreadsheets", // Base URL for Google Sheets API to get the campists
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sheets-api/, ""),
      },
      "/drive-api": {
        target: "https://www.googleapis.com/drive", // Base URL for Google Drive API to retrieve campist images
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/drive-api/, ""),
      },
      "/app-scripts-api": {
        target: "https://script.google.com", // Base URL for Google Script API to send records to the sheets
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/app-scripts-api/, ""),
      },
      "/api-data": {
        target: "https://api-backend-ooz2.onrender.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-data/, ""),
      },
    },
  },
});
