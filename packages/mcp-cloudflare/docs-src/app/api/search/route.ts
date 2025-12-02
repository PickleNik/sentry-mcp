import { source } from "@/../docs-src/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

// statically cached
export const revalidate = false;

export const { GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
});
