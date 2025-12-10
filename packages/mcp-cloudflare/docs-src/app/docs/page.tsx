import { getPageImage, source } from "@/../docs-src/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/../docs-src/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
// import { RemoteSetupTabs } from "../../../../src/client/components/fragments/remote-setup";
import RemoteSetup, {
  RemoteSetupTabs,
} from "../components/fragments/remote-setup";

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={[
        { title: "Instructions", url: "#instructions", depth: 1 },
        { title: "Installation", url: "#installation", depth: 1 },
      ]}
      full={page.data.full}
    >
      <DocsTitle>Cloud Setup</DocsTitle>
      <DocsDescription>Getting Started</DocsDescription>
      <RemoteSetup />
      <RemoteSetupTabs />
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
