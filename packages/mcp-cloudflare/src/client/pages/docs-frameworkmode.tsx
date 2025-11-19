// Local fallback types for Route to avoid missing external type declarations.
// Replace with your project's shared Route types when available.
type Route = {
  LoaderArgs: {
    params: Record<string, string>;
  };
  ComponentProps: {
    loaderData: {
      tree: any;
      path: string;
    };
  };
};
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { source } from "../lib/source";
import type * as PageTree from "fumadocs-core/page-tree";
import defaultMdxComponents from "fumadocs-ui/mdx";
import browserCollections from "fumadocs-mdx:collections/browser";
import { baseOptions } from "../lib/layout.shared";

export async function loader({ params }: Route["LoaderArgs"]) {
  const slugs = params["*"].split("/").filter((v) => v.length > 0);
  const page = source.getPage(slugs);
  if (!page) throw new Response("Not found", { status: 404 });

  return {
    path: page.path,
    tree: source.getPageTree(),
  };
}

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, default: Mdx, frontmatter }) {
    // Type assertion for frontmatter
    const typedFrontmatter = frontmatter as {
      title: string;
      description: string;
    };

    return (
      <DocsPage toc={toc}>
        <title>{typedFrontmatter.title}</title>
        <meta name="description" content={typedFrontmatter.description} />
        <DocsTitle>{typedFrontmatter.title}</DocsTitle>
        <DocsDescription>{typedFrontmatter.description}</DocsDescription>
        <DocsBody>
          <Mdx components={{ ...defaultMdxComponents }} />
        </DocsBody>
      </DocsPage>
    );
  },
});

export default function Page({ loaderData }: Route["ComponentProps"]) {
  const { tree, path } = loaderData;
  const Content = clientLoader.getComponent(path);

  return (
    <DocsLayout {...baseOptions()} tree={tree as PageTree.Root}>
      <Content />
    </DocsLayout>
  );
}
