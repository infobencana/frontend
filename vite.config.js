import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  server: {
    host: true,
    port: 8080,

    watch: {
      usePolling: true,
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (path) =>
          path.split("/").reverse()[
            path.split("/").reverse().indexOf("node_modules") - 1
          ],
      },
    },
  },
});
