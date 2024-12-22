import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@config": "/src/config",
      "@middlewares": "/src/middlewares",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
      "@modules": "/src/modules",
      "@lib": "/src/lib",
      "@src": "/src",
      "@/*": "/src/*",
    },
  },
});
