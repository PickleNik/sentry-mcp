import { useLocation, Navigate } from "react-router";
import { source } from "../lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { RootProvider } from "fumadocs-ui/provider/react-router"; // or generic provider

export default function Docs() {
  const location = useLocation();
  // strip "/docs" and split into slugs
  const rawPath = location.pathname.replace(/^\/docs\/?/, "");
  const slugs = rawPath === "" ? [] : rawPath.split("/");

  const page = source.getPage(slugs);
  if (!page) {
    // basic 404 for unknown docs slugs
    return <Navigate to="/docs" replace />;
  }

  return (
    <RootProvider>
      <DocsLayout tree={source.pageTree} nav={{ title: "Your App Docs" }}>
        <DocsPage toc={page.data.toc}>
          <DocsBody>
            {/* page.body is the compiled MDX component */}
            <page.data.body />
          </DocsBody>
        </DocsPage>
      </DocsLayout>
    </RootProvider>
  );
}
