# Components

All components live under `src/lib/components/`, one folder per domain, each with a barrel `index.ts` exporting `PascalCase` names from `kebab-case.svelte` files. Import via the `#components` subpath import (see root of `CLAUDE.md`), e.g. `import { Button, SearchBar } from '#components/controls';`.

```text
controls/   — interactive primitives with no domain data of their own
data/       — small presentational, data-display primitives
feed/       — the feed/news-item composites
feedback/   — transient status communication (toast, loading)
sources/    — the source-management row
error/      — the full-screen error state
```

## Conventions every component follows

These emerged through the course of building this set; they're not written down anywhere else, so treat them as binding unless you have a specific reason to deviate — and if you do, explain why in the diff/commit, the way earlier deviations are explained inline below.

- **Svelte 5 runes throughout** (`$props()`, `$state()`, `$derived()`, `$bindable()`) — runes mode is forced project-wide via `svelte.config.js`.
- **A local `Props` interface** in `<script lang="ts">`, each prop documented with a `/** ... */` JSDoc comment immediately above it (not inline), destructured with defaults where applicable: `const { variant = 'link', onclick }: Props = $props();`.
- **Required vs. optional props reflect real semantics, not convenience.** A prop is only given a default if there's a genuinely sensible default; content-carrying props (`Button.children`, `Toggle.label`, `FilterPill.label`) are required with no fallback, on the reasoning that a placeholder like `"Toggle"` would be worse than a type error forcing the caller to supply something meaningful. Follow this when adding new props — don't default something just to avoid a required-prop error at a call site.
- **State ownership follows one rule:** if a control's whole purpose is a single, continuous value the parent needs to read back (`SearchBar.value`, `TopicTabs.active`, `FilterPills.active`), it's `$bindable()`. If it's a discrete action or a value the parent fully controls and just renders (`Button.onclick`, `Toggle.on`/`onchange`, `SaveButton.saved`/`onclick`), it's a plain prop plus a zero-argument callback prop. Don't mix the two patterns on the same component.
- **Class lists**: a single boolean modifier uses the `class:name` shorthand (`class:active`, `class:unread`, `class:muted`) against a bare element selector (`button.active`, not `.btn--active`) — not BEM-style prefixed classes. A component with a true enum of variants (not just a boolean) uses `class={variant}` directly against the variant name as the class (see `Button`).
- **CSS custom properties, always** — no hardcoded colors/spacing/type outside of documented one-off literals (see docs/design-system.md's "irregular scale" note). If a value doesn't match an existing token, write the literal and don't force a nearby token onto it.
- **Every component has a sibling `.stories.svelte`**, using `@storybook/addon-svelte-csf`'s `defineMeta`/`Story` pattern. One story per meaningful state (not per prop-combination) — e.g. `Toggle` gets `Off`/`On`, not four stories for the boolean cross product with a hypothetical second prop. Components with a `Snippet` prop (`Button.children`, `Toast.children`) declare the snippet in the story file and pass it by reference: `args={{ children: someSnippet }}` — Storybook args can't carry a snippet inline. Components whose root element needs a specific rendering context to make sense in isolation (`Toast`'s `position: absolute` anchor needs a sized relative-positioned container; `SourceCard`'s root is a bare `<li>`, invalid outside a `<ul>`) use the addon's shared `template` snippet to wrap every story in that context — see `toast.stories.svelte` (`.container`) or `source-card.stories.svelte` (`<ul>`) for the pattern.
- **Accessibility is added, not left to the visual spec.** The original design mockups (fetched from the Claude Design project — see below) are static HTML/CSS previews with no real interaction model; every component here has at least one accessibility addition beyond what the mockup showed: `:focus-visible` rings (`--color-focus-ring`), correct semantic elements (real `<button>`s instead of `<span onclick>`, `<h3>`/`<p>`/`<article>`/`<li>`/`<time datetime>` instead of generic `<div>`s where the content genuinely is a heading/paragraph/list item/timestamp), and ARIA where the semantic element alone doesn't communicate state (`aria-pressed`, `role="switch"` + `aria-checked`, `aria-label`, `role="status"`).
- **`aria-pressed`, not `role="tab"`/`role="tablist"`.** `TopicTab`/`FilterPill` are independent, self-contained toggle buttons with no knowledge of their siblings, so they use `aria-pressed`. The full ARIA tabs pattern (`role="tablist"` + `role="tab"` + `aria-selected` + roving `tabindex` + arrow-key navigation) was implemented once for `TopicTabs`/`TopicTab` specifically, then deliberately reverted back to `aria-pressed` at the user's request — so don't reintroduce it without asking first; it's a known, considered rollback, not an oversight.
- **`display: inline-block` on any `<span>`/inline element that sets `width`/`height`.** `width`/`height` are no-ops on `display: inline` elements. This bit `UnreadDot` once (worked fine nested in a flex row, where flex auto-blockifies children, but disappeared entirely once it was extracted into its own story with no flex parent) and `TypeBadge` was fixed proactively for the same reason. Check for this whenever a component sets an explicit size on a naturally-inline tag.
- **Where a component composes another**, prefer the real component over hand-rolled markup _only_ when the visual treatment actually matches. Where it doesn't — even by a single pixel of `font-size` or a different `letter-spacing` — build bespoke local markup instead of forcing a shared component to serve two different looks, _unless_ the difference is reused in 2+ places, in which case the shared component gets a `variant` prop (see `TypeBadge`'s `chip`/`column` split, used by both the feed byline and `SourceCard`). One-off mismatches (the error page's status badge, the reader page's byline badge) stay local rather than growing `TypeBadge` a third variant for a single caller each.

## Design source

The original visual spec for everything in this file came from two Claude Design projects (fetched via the `claude_design` MCP):

- `3aa6fade-3f8b-40ff-8279-226b37e33355` — "Newsie Design System": the base component library (`Button`, `FilterPill`, `StatusPill`, `Toggle`, `TypeBadge`, `StoryCard`, `Toast`) plus tokens and the `index.html`/`reader.html` full-screen mockups.
- `5410784f-d119-4e18-a4bc-2528a6884947` — an interactive prototype (`News Reader.dc.html`) and the standalone `Error Page.dc.html`, both built on a small `dc-runtime` (see `support.js` in that project) that simulates a multi-view single-page app. Several components here (`SearchBar`, `TopicTab`/`TopicTabs`, `FilterPills`, `SourceCard`) only ever existed as inline markup inside these files, never as their own named component/spec — their component boundaries and prop APIs were designed from scratch based on the inline markup, not copied from an existing `.jsx`/`.d.ts`.

If you need to re-derive intent for something and this doc doesn't cover it, those are the two source projects to check — `list_files`/`get_file` against those project IDs, not a redesign from scratch.

---

## `controls/`

For each component below, its own `Props` interface (with a JSDoc comment per prop) is the source of truth for the exact signature, types, and defaults — this section only covers what isn't already obvious from reading that.

### `Button` (`button.svelte`)

Three variants (`link`/`outline`/`dashed`): `link` is Refresh/Sources-style quiet red text, `outline` is a pill like Mark as read, `dashed` is full-width like + Add a source. Extends `HTMLButtonAttributes`, so `disabled`/`aria-label`/etc. pass through. `type="button"` is hardcoded. Has `:disabled` styling (reduced opacity, `pointer-events: none`) even though the original mockup never showed a disabled state — real buttons need one.

### `FilterPill` (`filter-pill.svelte`)

Single pill in a filter row (All/Unread/Saved). `aria-pressed`, not a checkbox/radio role.

### `FilterPills` (`filter-pills.svelte`)

Owns the three fixed filter values itself — not a generic "list of pills" wrapper. Renders three `FilterPill`s internally, each wired to flip its own bindable selection to its own value. The filter values are a fixed union, not sourced from any data list — unlike `TopicTabs`, below.

### `SaveButton` (`save-button.svelte`)

The ★/☆ star toggle. Internally calls `event.stopPropagation()` before invoking its click callback, so it's safe to drop inside any other clickable container — this is why `NewsCard` doesn't need its own propagation guard around it.

### `SearchBar` (`search-bar.svelte`)

Its value is bindable; the placeholder text also doubles as the input's `aria-label`, since there's no visible `<label>`. Uses `:focus` (not `:focus-visible`) deliberately — unlike button-style controls, a text input should show its focus ring on every focus method, not just keyboard nav, since there's no other visual feedback that it's the active field.

### `StatusPill` (`status-pill.svelte`)

The "● Live" / "◍ Offline · cached" network indicator. Real `<button>` (the design mockup used a bare `<span onClick>`). **Not currently rendered anywhere in the app** — see docs/roadmap.md.

### `Toggle` (`toggle.svelte`)

Generic iOS-style switch. Its label prop is **required**, no default — it's the switch's `aria-label`, and a generic fallback like `"Toggle"` would be a real accessibility regression for a control whose whole point is "toggle _what_". `role="switch"` + `aria-checked`.

### `TopicTab` (`topic-tab.svelte`)

Single topic tab. `aria-pressed`, not `role="tab"` — see the conventions section above for why, and why not to change it without asking.

### `TopicTabs` (`topic-tabs.svelte`)

Owns the click-to-select mechanics and always renders a leading "All topics" tab that isn't part of the topics list passed in — it's synthesized locally (its bindable selection being `null` means "All topics" is selected), specifically so it doesn't need a fake `Topic` object with a made-up numeric id.

---

## `data/`

### `TypeBadge` (`type-badge.svelte`)

Uppercase mono badge for a source type. The label comes from `text-transform: uppercase` on whatever string is passed, not a lookup map — its type prop is intentionally a plain `string`, not a closed union. Its `variant` (`chip`/`column`) is the one case in the whole set where a size/layout mismatch became a shared variant prop instead of two bespoke implementations, specifically because it's reused: `chip` is the feed's inline auto-width badge, `column` is `SourceCard`'s fixed-64px centered treatment.

---

## `feed/`

### `UnreadDot` (`unread-dot.svelte`)

Decorative filled/transparent dot. `aria-hidden="true"` — purely decorative, no accessible name of its own (nothing else currently gives "unread" state an accessible name either; see docs/roadmap.md).

### `NewsByline` (`news-byline.svelte`)

Badge + source name + relative time, one inline row — the feed's treatment, **not** the reader page's, which shows the badge and "source · time" on two separate stacked lines with different typography; that's intentionally _not_ built by composing this component — see the `SourceTime` entry in docs/roadmap.md for why. Takes the whole `NewsItem`, not individual fields, so it can derive both the badge and the formatted time itself. Uses `date-fns`'s `formatDistanceToNow(..., { addSuffix: true })` for the visible text and `formatRFC3339` for the `<time datetime>` attribute.

### `NewsCard` (`news-card.svelte`)

The feed row. Its `unread` prop defaults to `true` — a freshly-fetched item is unread by default, deliberately different from `Toggle`'s own `false` default, since this reflects real domain semantics rather than a generic control default.

Structural note, since it's non-obvious from the markup alone: the root is `<article>` (feed items are literally the HTML spec's own example use case for `<article>` — "an entry in a syndicated feed"), but the _click target_ is a nested `<div class="hit-area" role="button" tabindex="0">`, not the `<article>` itself. This split exists because `role="button"` on a non-interactive semantic element like `<article>` is a real a11y-linter violation (element and ARIA role disagreeing), and because `SaveButton` needs to sit as a _sibling_ of the hit-area, not a descendant — a real `<button>` (`SaveButton`) can't nest inside another real `<button>`, and even setting that aside, keeping it a sibling means a click on the star never bubbles into the row's own open-handler in the first place, rather than relying on `SaveButton`'s internal `stopPropagation()` as the only thing preventing that.

---

## `feedback/`

### `Toast` (`toast.svelte`)

Its `position: absolute; bottom: 34px; left: 50%` anchor needs a sized, `position: relative` ancestor to anchor against correctly (the real app doesn't have one yet; see docs/roadmap.md). Uses Svelte's built-in `transition:fly` for its enter animation, not a hand-rolled CSS `@keyframes` — the one place in the set where a framework transition primitive was used instead of pure CSS, and the preferred approach if another component needs an enter/exit transition.

### `LoadingIndicator` (`loading-indicator.svelte`)

Spinner + label row. `role="status"` (implicit polite live region) so its appearance is announced. The spin animation is disabled entirely under `prefers-reduced-motion: reduce` — no alternate slower animation, just off.

---

## `sources/`

### `SourceCard` (`source-card.svelte`)

One row in the source-management list. Its `meta` string (the "N unread · updated Xh ago" line) is shown only while on; it's **ignored and replaced with the literal string `"Muted"`** when off — same pattern as `StatusPill` owning its own two-state text rather than taking it as a prop.

Root is `<li>`, not `<div>` — it's one item in a homogeneous, repeated list of subscription controls (the HTML use case `<li>` exists for), as opposed to `NewsCard`'s `<article>` (independently meaningful syndicated content). Real consequence: **whatever renders a list of `SourceCard`s must wrap them in a real `<ul>`** — `<li>` is invalid outside `<ul>`/`<ol>`/`<menu>`. `Toggle`'s label gets synthesized automatically from the source's name and on/off state (e.g. `"Mute Okta Release Notes"` / `"Unmute Okta Release Notes"`), so callers never need to construct it themselves.

---

## `error/`

### `ErrorPage` (`error-page.svelte`)

Full-screen error state, four fixed statuses. All copy (code badge text, glyph, headline, message, button labels) is owned internally by a status-keyed lookup table — not exposed as override props, same reasoning as `StatusPill`/`SourceCard`'s owned two-state text.

Renders the app's "Newsie" wordmark in the footer — the only place in the app that currently does. **This is the one component with a filled brand button** (the primary CTA) — a deliberate, single exception to the "no filled brand buttons" rule (see docs/design-system.md), not a precedent to extend `Button` from.

Wired to `routes/+error.svelte` for real 404/500/503 SvelteKit errors (`503` and anything unrecognized fall back to `'500'`). `'offline'` has no real trigger anywhere yet — see docs/roadmap.md.
