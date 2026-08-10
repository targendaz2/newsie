# Design system

Source of truth for tokens: **`src/app.css`**. All design tokens live in one `:root` block there — there is no separate `tokens/*.css` directory (an earlier version of this project split tokens into per-concern files under `src/tokens/`; they were later consolidated into `app.css` and deleted). If you see a stale reference to `src/tokens/*.css`, it's out of date.

## The vibe

Reads like a well-set newspaper on a phone. Warm off-white paper, one ink-red accent, editorial serif headlines over a clean sans, mono reserved for source-type labels. Calm, dense, text-first. No gradients, textures, transparency, or blur — flat surfaces throughout.

## Content & tone

- Tone: plain, factual, unhurried (e.g. "All caught up", "Up to date" — not exclamatory).
- Casing: sentence case, except UPPERCASE mono source-type badges (`RSS`, `RELEASE`, etc.).
- Numbers: compact relative time ("42m", "2h", not "42 minutes ago" — see the caveat in docs/routes-and-data.md, since the current `date-fns` implementation actually produces the longer form; this was inherited from `NewsByline`'s existing pattern rather than a deliberate reversal of this rule, and hasn't been revisited).
- Emoji: none, ever. Titles/excerpts come verbatim from feeds.

## Iconography

No icon font, no SVG icon set, no emoji-as-icon. A small, fixed set of Unicode glyphs is used inline instead:

| Glyph | Meaning |
| --- | --- |
| `★` / `☆` | saved / not saved |
| `●` / `◍` | live / offline |
| `↻` | refresh |
| `⊟` | sources |
| `‹` | back |

If a new affordance needs an icon, prefer another neutral glyph from this style over adding an icon library.

## Buttons

Quiet, text-forward: red links, outline pills, dashed "add" affordances. **No filled brand buttons** — with one documented exception: `ErrorPage`'s primary CTA (see docs/components.md). Don't extend the shared `Button` component with a `filled` variant to cover more cases without asking; the exception is deliberately scoped to one component.

## Borders & shadows

1px hairline borders (`--color-border-hairline`) are the primary separator throughout — feed rows are flat and hairline-divided, not card-shadowed. Shadows are reserved for exactly three things: the toast, the toggle knob, and the (unused in the real app) device bezel from the original marketing mockups.

## Motion

Short, purposeful transitions only — 0.15–0.22s color/position transitions on hover/toggle, `LoadingIndicator`'s spinner (with a `prefers-reduced-motion` fallback that disables it), and `Toast`'s `svelte/transition` `fly`. No bounces, no scale/spring effects.

## Fonts

Self-hosted `.woff2` in `src/lib/assets/fonts/`, declared via `@font-face` in `src/fonts.css` (imported by `app.css`). Newsreader 400/500/600/700, Public Sans 400/500/600/700, IBM Plex Mono 400/500/600 — latin + latin-ext subsets. Works fully offline; no external font requests (no Google Fonts `<link>` — the original design mockups used one, but the real app deliberately doesn't).

## Tokens

Exact current values live in **`src/app.css`**'s single `:root` block — that file is the source of truth, not this doc. What follows is the category breakdown and the things worth knowing that aren't obvious from reading the CSS alone.

### Color

Primitive values (`--color-paper`, `--color-ink`, `--color-accent`, etc.) and semantic aliases (`--color-brand`, `--color-text-body`, `--color-surface-page`, etc.) live in the same block; every semantic alias just points at a primitive.

**Always reach for the semantic alias** (`--color-brand`, `--color-text-muted`, etc.), not the primitive (`--color-accent`, `--color-muted`) — every component in this codebase does, and it's what makes a future re-theme possible without touching component code.

### Spacing

A `--spacing-1` through `--spacing-7` scale, plus a few named spacings (`--spacing-gutter`, `--spacing-row-pad-y`, `--spacing-row-pad-y-compact`, `--spacing-control-gap`).

Note the scale is irregular by design and several concrete spacing values used throughout the components (13px gaps, 15px/22px paddings, 18px gaps) have **no matching token and are written as literals**. This isn't an oversight — those exact values come straight from the original design mockups and don't cleanly round to the token scale. Don't force a nearby token onto a value that doesn't actually match it.

### Typography

Font families (`--font-sans`/`--font-serif`/`--font-mono`), a `--text-*` size scale, `--font-weight-*`, `--tracking-*`, `--leading-*`.

**Historical footgun, now fixed — don't reintroduce it.** `--text-body` used to name *two unrelated things*: a color alias (in the old `colors.css`) and this font-size token (in the old `typography.css`). Both files declared `--text-body` in the same global `:root` scope, and since typography loaded after colors, the font-size value silently won — meaning `color: var(--text-body)` was invalid CSS everywhere it was used, for the entire early history of this component set, falling back to the browser's default text color instead of ink. The `--color-*` prefix convention exists specifically so this class of collision can't happen again. If you're ever tempted to give two tokens the same bare name because "they're kind of the same concept," don't — prefix by category instead.

`--text-story` and `--text-body` currently share the same value in `app.css`, which is coincidence, not a signal they're duplicates. `--text-story` is actively used (feed/card titles). `--text-body` (the font-size token) currently has **no usage anywhere in the component set** — every remaining reference to a bare `--text-body` turned out, on inspection during the rename, to actually mean the color alias (`--color-text-body`), not this font-size. It's not dead by mistake so much as never claimed; don't assume it's safe to delete without checking whether something's about to need a size distinct from `--text-story`, and don't assume it's safe to reuse for a color either — that's the exact collision this prefix convention exists to prevent.

### Radii

A `--radius-*` scale: `badge`, `toast`, `input`, `card`, `device`, `pill`.

`--radius-device` (the "phone bezel" corner radius) is unused in the real app — it only appeared in the original marketing mockups' fake phone frame — but it's kept in case a future preview/screenshot context needs it.

### Shadows

Three named shadows: `--shadow-toast`, `--shadow-device`, `--shadow-knob`.

Only ever used for the toast, the toggle knob, and (unused in the real app, same as `--radius-device`) the device bezel.
