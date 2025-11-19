// framework mode config as shown in fumadocs docs as opposed to declarative BrowserRouter
import type { Config } from "@react-router/dev/config";
import { glob } from "node:fs/promises";
import { createGetUrl, getSlugs } from "fumadocs-core/source";

const getUrl = createGetUrl("/docs");

export default {
  appDirectory: "src/client",
  // disable SSR
  ssr: false,

  async prerender({ getStaticPaths }) {
    const paths: string[] = [...getStaticPaths()];

    for await (const entry of glob("**/*.mdx", { cwd: "content/docs" })) {
      paths.push(getUrl(getSlugs(entry)));
    }

    return paths;
  },
} satisfies Config;
