// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Force-enable the Nitro deploy bundle with Vercel's preset. Outside the
  // Lovable sandbox nitro is skipped by default, which produces a generic
  // server with no platform output.
  //
  // The wrapper defaults Nitro's output to dist/{server,client}; we redirect
  // it to the Build Output API v3 layout Vercel expects (.vercel/output) so
  // the Git integration / `vercel deploy` picks it up with zero extra config.
  // The function dir leaf must be "__server.func" — Nitro's vercel preset
  // hardcodes the route dest to "/__server" in config.json.
  nitro: {
    preset: "vercel",
    output: {
      dir: ".vercel/output",
      publicDir: ".vercel/output/static",
      serverDir: ".vercel/output/functions/__server.func",
    },
  },
});
