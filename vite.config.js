import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    compression({
      threshold: 512000,
      algorithm: "brotliCompress",
      exclude: [/\.(br)$ /, /\.(gz)$/],
      deleteOriginalAssets: true,
    }),
  ],
});
