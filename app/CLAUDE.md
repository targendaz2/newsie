# Newsie — App Workspace

Newsie is a warm-newsprint, mobile-first personal RSS/news reader PWA (`newsie.site`). This is the `app` workspace in the yarn monorepo — the SvelteKit 5 frontend. Other workspaces (`packages/*`, `workers/*`) have their own `CLAUDE.md` where relevant (see `workers/feed-reader/CLAUDE.md` for the Cloudflare Worker backend).

## Where things are documented

- **[docs/design-system.md](docs/design-system.md)** — design tokens (colors, spacing, typography, radii, shadows), content/tone rules, icon policy.
- **[docs/components.md](docs/components.md)** — full component inventory (props, behavior, accessibility choices) and the conventions every component follows.
- **[docs/routes-and-data.md](docs/routes-and-data.md)** — domain types (`$lib/types.ts`), the placeholder-data loading pattern, and the current route map.
- **[docs/roadmap.md](docs/roadmap.md)** — what's deliberately not built yet, and why. Read this before assuming a gap is an oversight — most are explicit deferrals, and several have genuinely open questions rather than an obvious answer. Ask before filling one in.

## Load-bearing rules (don't skip these)

- **Import components via `$components/*`**, not `$lib/components/*` — e.g. `import { Button } from '$components/controls';`. `$components` is a SvelteKit alias for `src/lib/components` (see `svelte.config.js`). Domain types still come from `$lib/types`.
- **This project uses `oxfmt`, not Prettier**, for formatting (`prettier.enable: false` in `.vscode/settings.json`). From the repo root: `./node_modules/.bin/oxfmt --check <files>` to verify, `./node_modules/.bin/oxfmt <files>` to auto-fix. Don't consider Svelte/TS work done until this passes.
- **Every component `.svelte` file has a sibling `.stories.svelte`** — see docs/components.md for the established pattern, including the `template` snippet trick used for components that need a wrapping context to render correctly in isolation (e.g. `Toast`'s absolutely-positioned anchor, `SourceCard`'s required `<ul>` parent).
- **No filled brand buttons**, except `ErrorPage`'s primary action — a documented, deliberate, single exception to the design system's own rule. Don't add a `filled` variant to the shared `Button` component for it; if something else seems to need one, ask first.
- Placeholder/mock data lives in a route-local `data.ts`, loaded by a thin `+page.server.ts`. See docs/routes-and-data.md before inventing a different pattern.
