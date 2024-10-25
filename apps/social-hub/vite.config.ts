import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // port: 1994,
    proxy: {
      "/api": {
        target: "http://localhost:3000", // 要代理的目标接口地址
        changeOrigin: true,
      },
    },
  },
});
