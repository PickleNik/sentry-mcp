import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// for static docs
import { viteStaticCopy } from "vite-plugin-static-copy";
// import fs from "node:fs";
// const docsOut = path.resolve(__dirname, "../docs-src/out");
import { resolve } from "node:path";
import { normalizePath } from "vite";

export default defineConfig({
  plugins: [
    react(),
    cloudflare(),
    tailwindcss(),
    sentryVitePlugin({
      org: "sentry",
      project: "mcp-server",
    }),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(resolve(__dirname, "./docs-src/out/**/*")),
          dest: "",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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
