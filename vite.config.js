import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { compression } from "vite-plugin-compression2";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    compression(),
    compression({
      algorithm: "brotliCompress",
      exclude: [/\.(br)$/, /\.(gz)$/],
      deleteOriginalAssets: true,
    }),
  ],
});
