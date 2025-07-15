import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
export default defineConfig({
  plugins: [
    tanstackRouter(),
    react(),
    nodePolyfills({
      exclude: ["fs"],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  server: {
    port: 3030,
  },
  define: {
    global: "window",
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@const": path.resolve(__dirname, "src/const"),
      "@screens": path.resolve(__dirname, "src/screens"),
      "@state": path.resolve(__dirname, "src/state"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@theme": path.resolve(__dirname, "src/theme/"),
    },
  },
});
