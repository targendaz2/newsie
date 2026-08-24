# Newsie — App Workspace

The `app` workspace in the yarn monorepo — the SvelteKit 5 frontend. See the root [CLAUDE.md](../CLAUDE.md) for what Newsie is and the full workspace map.

## Where things are documented

- **[docs/design-system.md](docs/design-system.md)** — design tokens (colors, spacing, typography, radii, shadows), content/tone rules, icon policy.
- **[docs/components.md](docs/components.md)** — full component inventory (props, behavior, accessibility choices) and the conventions every component follows.
- **[docs/routes-and-data.md](docs/routes-and-data.md)** — domain types (`$lib/types.ts`), the placeholder-data loading pattern, and the current route map.
- **[docs/roadmap.md](docs/roadmap.md)** — what's deliberately not built yet, and why. Read this before assuming a gap is an oversight — most are explicit deferrals, and several have genuinely open questions rather than an obvious answer. Ask before filling one in.

## Load-bearing rules (don't skip these)

- **Import components via `#components/*`**, not `#lib/components/*` — e.g. `import { Button } from '#components/controls';`. `#components` is a subpath import declared in `package.json`'s `imports` field (Node's native mechanism, resolved natively by Vite/TypeScript — see `#lib` for the same pattern); its target pattern already ends in `/index.js`, so call sites don't repeat it. Domain types still come from `#lib/types.js`.
- **Every component `.svelte` file has a sibling `.stories.svelte`** — see docs/components.md for the established pattern, including the `template` snippet trick used for components that need a wrapping context to render correctly in isolation (e.g. `Toast`'s absolutely-positioned anchor, `SourceCard`'s required `<ul>` parent).
- **Component tests live inside `.stories.svelte` files, not separate `.test.ts` files** — as `play` functions on individual `Story`s (`play={async ({ args, canvas }) => { ... }}`). `yarn test` / `test:watch` / `test:coverage` run them via `@storybook/addon-vitest` in a real headless browser (playwright/chromium, see `vite.config.ts`), not jsdom. See `save-button.stories.svelte` for the pattern.
- **No filled brand buttons**, except `ErrorPage`'s primary action — a documented, deliberate, single exception to the design system's own rule. Don't add a `filled` variant to the shared `Button` component for it; if something else seems to need one, ask first.
- Placeholder/mock data lives in a route-local `data.ts`, loaded by a thin `+page.server.ts`. See docs/routes-and-data.md before inventing a different pattern.
