// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

function normalizePublicBase(rawBase: string | undefined) {
  if (!rawBase) return "/";

  const trimmedBase = rawBase.trim();
  if (!trimmedBase || trimmedBase === "/") return "/";

  return `/${trimmedBase.replace(/^\/+|\/+$/g, "")}/`;
}

const publicBase = normalizePublicBase(process.env.PAGES_BASE_PATH);
const isGitHubPagesBuild = process.env.DEPLOY_TARGET === "github-pages";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  // GitHub Pages needs a static export, so we skip the Cloudflare build plugin there.
  cloudflare: isGitHubPagesBuild ? false : undefined,
  vite: {
    // GitHub Pages project sites build under /<repo>/ while local dev should stay at /.
    base: publicBase,
  },
  tanstackStart: {
    prerender: {
      enabled: true,
    },
    server: { entry: "server" },
  },
});
