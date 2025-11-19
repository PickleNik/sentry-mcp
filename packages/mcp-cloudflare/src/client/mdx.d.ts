declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXContent: ComponentType<any>;

  // Fumadocs MDX commonly exports these:
  export const frontmatter: Record<string, any>;
  export const toc: any;
  export const structuredData: any;
  export const extractedReferences: any;

  export default MDXContent;
}
