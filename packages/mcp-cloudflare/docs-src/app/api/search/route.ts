import { source } from "@/../docs-src/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

// statically cached
export const revalidate = false;
export const { staticGET: GET } = createFromSource(source);
