import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { RootProvider } from "fumadocs-ui/provider/react-router";
import { AuthProvider } from "./contexts/auth-context";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sentry MCP</title>
        <Meta />
        <Links />
        <link href="./src/client/index.css" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content="Sentry MCP" />
        <meta
          name="description"
          content="A Model Context Protocol implementation for interacting with Sentry."
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mcp.sentry.dev/" />
        <meta
          property="og:title"
          content="A model context protocol implementation for interacting with Sentry."
        />
        <meta
          property="og:description"
          content="Simply put, its a way to plug Sentry's API into an LLM, letting you ask questions about your data in context of the LLM itself. This lets you take an agent that you already use, like Cursor, and pull in additional information from Sentry to help with tasks like debugging, code generation, and more."
        />
        <meta property="og:image" content="https://mcp.sentry.dev/flow.jpg" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mcp.sentry.dev/" />
        <meta
          property="twitter:title"
          content="A model context protocol implementation for interacting with Sentry."
        />
        <meta
          property="twitter:description"
          content="Simply put, its a way to plug Sentry's API into an LLM, letting you ask questions about your data in context of the LLM itself. This lets you take an agent that you already use, like Cursor, and pull in additional information from Sentry to help with tasks like debugging, code generation, and more."
        />
        <meta
          property="twitter:image"
          content="https://mcp.sentry.dev/flow.jpg"
        />
      </head>

      <body>
        {/* <div id="root"></div>
        <script type="module" src="/src/client/main.tsx"></script> */}

        <RootProvider>
          <AuthProvider>{children}</AuthProvider>
        </RootProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
