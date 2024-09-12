import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
const resolve = (_path: string) => path.resolve(__dirname, _path);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
});
