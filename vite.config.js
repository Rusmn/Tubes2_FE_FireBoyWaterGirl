import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/bfs": {
        target: "http://localhost:8080",
        changeOrigin: true, // Pastikan ini ada
        // rewrite: (path) => path.replace(/^\/bfs/, '/bfs'), // Biasanya tidak perlu jika path sama
      },
      "/dfs": {
        target: "http://localhost:8080",
        changeOrigin: true, // Pastikan ini ada
        // rewrite: (path) => path.replace(/^\/dfs/, '/dfs'), // Biasanya tidak perlu jika path sama
      },
      // Anda mungkin perlu proxy untuk endpoint lain jika ada, misal '/'
      // '/': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      // }
    },
  },
});
