import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages: https://kanda-houtokukai.github.io/programming-land/
export default defineConfig({
  plugins: [react()],
  base: "/programming-land/",
});
