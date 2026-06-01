import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

/** GitHub Pages serves this repo at https://janice-lee-cloud.github.io/trip/ */
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["images/app_icon.jpg"],
      manifest: {
        name: "Kyushu Trip Planner",
        short_name: "Kyushu Trip",
        description:
          "CTT & Janice's Kyushu trip — day-by-day itinerary, budget tracker, and travel journal.",
        theme_color: "#faf9f7",
        background_color: "#faf9f7",
        display: "standalone",
        orientation: "portrait",
        start_url: base,
        scope: base,
        lang: "en",
        icons: [
          {
            src: "images/app_icon.jpg",
            sizes: "192x192",
            type: "image/jpeg",
            purpose: "any",
          },
          {
            src: "images/app_icon.jpg",
            sizes: "512x512",
            type: "image/jpeg",
            purpose: "any",
          },
          {
            src: "images/app_icon.jpg",
            sizes: "512x512",
            type: "image/jpeg",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,jpg,jpeg,png,svg,woff2}"],
        navigateFallback: `${base}index.html`,
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
});
