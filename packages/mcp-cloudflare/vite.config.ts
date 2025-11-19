import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import mdx from "fumadocs-mdx/vite";
import * as MdxConfig from "./source.config";

export default defineConfig({
  plugins: [
    // react(),
    reactRouter(),
    cloudflare(),
    tailwindcss(),
    sentryVitePlugin({
      org: "sentry",
      project: "mcp-server",
    }),
    mdx(MdxConfig),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "fumadocs-mdx:collections": path.resolve(__dirname, ".source"),
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    port: 5173,
    strictPort: true, // Fail if port is already in use instead of trying another port
    // TODO: tried to fix hono
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8787", // wrangler dev port
        changeOrigin: false,
      },
      "/oauth": {
        target: "http://127.0.0.1:8787",
        changeOrigin: false,
      },
      "/mcp": {
        target: "http://127.0.0.1:8787",
        changeOrigin: false,
      },
    },
  },
});
