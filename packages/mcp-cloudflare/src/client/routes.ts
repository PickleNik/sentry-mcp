import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  index("pages/landing.tsx"),
  route("/docs/*", "pages/docs.tsx"),
  // route("api/search", "docs/search.ts"),
  // route("*?", "catchall.tsx"),
] satisfies RouteConfig;
