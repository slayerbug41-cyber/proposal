import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes the build work at a domain root (Vercel/Netlify)
// and in a sub-folder (GitHub Pages) without changes.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
  },
});
