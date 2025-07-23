import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";
export default defineConfig({
  plugins: [
    tsconfigPaths(),
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
  optimizeDeps: {
    include: ["@graphql-typed-document-node/core"],
  },
  build: {
    rollupOptions: {
      treeshake: true,
    },
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
      "@integrations": path.resolve(__dirname, "src/integrations/"),
    },
  },
});
