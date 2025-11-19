import "./instrument";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app";
import { AuthProvider } from "./contexts/auth-context";
// TODO: move sentry setup to root.tsx
import * as Sentry from "@sentry/react";
import { BrowserRouter } from "react-router";
// import { RootProvider } from "fumadocs-ui/provider/base";

const container = document.getElementById("root");

const root = createRoot(container!, {
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn("Uncaught error", error, errorInfo.componentStack);
  }),
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: Sentry.reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
  <StrictMode>
    {/* <RootProvider> */}
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
    {/* </RootProvider> */}
  </StrictMode>,
);
