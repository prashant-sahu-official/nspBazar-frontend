import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "nspBazaar",
        short_name: "nspBazaar",
        description: "A local marketplace for Narsinghpur",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            src: "/icons/nspBazarLogo_192x192.png",
            sizes: "192x192",
            type: "image/png",
            "purpose": "maskable"
          },
          {
            src: "/icons/nspBazarLogo_512x512.png",
            sizes: "512x512",
            type: "image/png",
            "purpose": "any"
          }
        ]
      }
    })
  ]
});
