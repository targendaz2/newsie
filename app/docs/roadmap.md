# Roadmap / open items

Things that are deliberately not built yet, with enough context to pick up the thread — not specs to implement on sight. Several of these have a genuinely undecided design question attached; read the context before proposing a solution, and check with the user before committing to one, the same way these got deferred in the first place.

## Component tests — up next

No test coverage exists yet — no component tests, no route tests. This is the immediate next priority, not just another item on this list. The harness is already wired up and ready: `vite.config.ts` has a `storybook` test project (via `@storybook/addon-vitest`'s `storybookTest` plugin, running in a real headless Chromium through `@vitest/browser-playwright`), which can execute Storybook interaction tests (`play` functions) directly against the existing `.stories.svelte` files. None of the current stories have a `play` function — they're visual/interactive previews only, not yet assertions. Writing component tests likely means adding `play` functions to existing stories rather than building a separate test-file structure from scratch.

## Cross-page navigation is entirely unwired

Every button/link that would take a user from one page to another currently does nothing — Feed's "⊟ Sources"/"↻ Refresh", `NewsCard`'s row-tap and save-star, the Sources page's `‹ Feed` back link, the reader's back/save/share/mark-as-read. This was repeated, explicit direction while each page was built ("just the visual representation, no interactivity/links yet"), not an accident. Wiring this up is presumably a near-term next step, but do it as its own deliberate pass, not incidentally while touching one of these files for something else.

Related, explicitly unresolved: whether the bare `/news` route (no `[id]`) should redirect to `/`. Raised once, then explicitly punted — no decision has been made either way.

## `StatusPill` isn't rendered anywhere

The "● Live" / "◍ Offline · cached" indicator exists as a component but has no home in the actual app yet. The original mockups pair it with a fake `9:41` clock in a shared status-bar row — the fake clock was correctly skipped (a real device's OS status bar handles that), but `StatusPill` itself is real app content that got dropped along with it. There's a real, unresolved question underneath this, not just "where to put it": a PWA cannot inject content into the OS status bar (hard platform sandboxing, not a missing API) — `apple-mobile-web-app-status-bar-style: black-translucent` would let the app's own content extend up near the system clock for closer visual proximity, at the cost of taking over `safe-area-inset-top` handling yourself instead of the more predictable `default` behavior currently set. Whether that tradeoff is worth it, versus just giving `StatusPill` its own ordinary row below the (real) status bar, hasn't been decided.

## No PWA manifest yet

`static/` has no icon assets, so a `manifest.webmanifest` (name, icons, `display: standalone`, `theme_color`, etc.) hasn't been added — building one without real icons would mean inventing placeholders. Similarly, `<meta name="apple-mobile-web-app-title">` (the more reliable way to control the iOS home-screen label, since Safari doesn't always respect the manifest's `name`) also hasn't been added. Both are quick once real icons exist.

## `SourceTime` — considered, not built

The reader page shows a type badge and a plain "source · time" line stacked on separate lines, styled as one uniform muted/semibold string. The feed's `NewsByline` shows badge + name + time inline in one row, with the name and time in two different colors (name muted, time faint — a real two-tone hierarchy the reader's version doesn't have). Splitting `NewsByline` into `TypeBadge` + a shared text-only `SourceTime` component was considered and rejected: the two contexts don't just differ in layout, they differ in color treatment too, so a shared component would need its own variant split (or the feed's existing look would have to change) to actually serve both — weaker justification than `TypeBadge`'s own `chip`/`column` split, where the underlying visual identity is the same and only sizing differs. The reader page currently just uses `TypeBadge` directly with its own bespoke local byline markup instead.

## Empty state — not built

"No saved stories yet…" / "Nothing here…" style copy exists in the original design spec but has no component. Flagged early on as thin enough (just centered muted text with conditional copy, no real behavior to encapsulate) that it wasn't worth a dedicated component preemptively — build it if/when a real empty case shows up, rather than in advance.

## `ErrorPage`'s actions aren't wired

`onPrimary`/`onSecondary` are real callback props, but `+error.svelte` doesn't pass anything — kept consistent with the rest of the app's "visual first" scope. Several of the per-status actions are trivially real (`location.reload()` for "Reload page"/"Try again"/"Retry connection"), others aren't (`Search the feed` would need cross-page state that doesn't exist, `Read saved stories`/`Read cached stories` would need real filtering, which the Feed page doesn't have wired either — see below). Only `404`/`500`/`503` are reachable via real SvelteKit errors right now; `offline` has no trigger at all (would need real connectivity detection, a separate feature).

## `FilterPills`/`TopicTabs` don't actually filter anything

Both own their selection state (`$bindable`) and render correctly, but the Feed page mounts them unbound — selecting a filter or topic doesn't change which `NewsCard`s are shown. Wiring this up is straightforward (derive a filtered list from `newsItems` + the bound `active` values) but hasn't been done, consistent with the "visual composition only" scope every page was built under.

## No real backend / data layer

Every route's `data.ts` is hand-written placeholder content. `packages/db` (drizzle) exists in the monorepo but isn't connected to anything in `app/`. Read/saved state is currently a hardcoded `Set` of ids per route load, not real per-viewer state. This is the biggest piece of remaining work and touches everything else on this list (real navigation needs real ids to navigate *to*, real filtering needs a real data source, etc.) — worth sequencing deliberately rather than backing into it through smaller fixes.

## Switching to Tailwind CSS

Under consideration as a future replacement for the current hand-written, token-driven component CSS (see docs/design-system.md for the tokens, docs/components.md for the per-component `<style>` conventions this would replace). Not scheduled, and a real migration would touch every component's markup and styles — don't start converting components to Tailwind classes without confirming first.

## Switching to oxlint (blocked on Svelte support)

Linting currently runs on ESLint + `eslint-plugin-svelte` (see `eslint.config.mjs`) — a separate tool from `oxfmt`, which already handles formatting. `oxlint` (part of the same oxc toolchain as `oxfmt`) is faster and would consolidate the toolchain, but its Svelte support isn't yet at parity with `eslint-plugin-svelte`. Revisit once it is; don't switch the linter over piecemeal or ahead of that parity landing.
