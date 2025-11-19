import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import mdx from "fumadocs-mdx/vite";

export default defineConfig({
  plugins: [
    mdx({}),
    react(),
    cloudflare(),
    tailwindcss(),
    sentryVitePlugin({
      org: "sentry",
      project: "mcp-server",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@content": path.resolve(__dirname, "./content"),
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    port: 5173,
    strictPort: true, // Fail if port is already in use instead of trying another port
  },
});
