import { ReactRouterProvider } from "fumadocs-core/framework/react-router";
import { RootProvider } from "fumadocs-ui/provider/base";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage, DocsBody } from "fumadocs-ui/page";

// alias for this setup in vite.config.ts, it's outside of src/ to not be bundled
import Doc, { frontmatter, toc } from "@content/docs/index.mdx";

export default function DocsRoute() {
  const tree = {
    name: "root",
    children: [
      {
        name: "index",
        type: "page" as const,
        slug: ["index"],
        url: "/docs",
        title: frontmatter?.title ?? "Documentation",
      },
    ],
  };

  return (
    <ReactRouterProvider>
      <RootProvider>
        <DocsLayout tree={tree}>
          <DocsPage toc={toc}>
            <DocsBody>
              {/* if you wire mdx-components, pass components={getMDXComponents()} */}
              <Doc />
            </DocsBody>
          </DocsPage>
        </DocsLayout>
      </RootProvider>
    </ReactRouterProvider>
  );
}
