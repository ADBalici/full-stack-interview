import path from "path";

import terser from "@rollup/plugin-terser";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  optimizeDeps: {
    include: ["lodash-es"],
  },
  publicDir: false, // Ensures no stray files are served
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Keeps the app build clean
      },
      plugins: [
        terser({
          format: {
            comments: false, // Remove all comments
          },
        }),
      ],
    },
  },
});
