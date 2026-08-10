# Routes & data

## Domain types (`src/lib/types.ts`)

That file is the source of truth for the exact shapes — `Source`, `Topic`, `NewsFilter`, and `NewsItem` (which embeds a full `Source` and `Topic` object rather than referencing them by id). Two things about it are worth knowing since they're not obvious from the types alone:

- **`Source.type` is a plain `string`, not a closed union.** It was a union earlier in this project's history; it was deliberately loosened. `TypeBadge`'s `type` prop matches (also a plain `string`) for the same reason.
- **`NewsItem.body` is a real, if simplified, model of "full article content."** It is *not* what an RSS/Atom parser hands you directly — see the note below on what feeds actually return before building real ingestion against this field.

### `body: string[]` is not what feeds give you

A real feed item's content (RSS `<description>`/`<content:encoded>`, Atom `<content>`) arrives as **one string of raw HTML** (often CDATA-wrapped), not a pre-split paragraph array — and a meaningful fraction of feeds don't include full body content at all, only a short summary (that's `excerpt`). Getting to `body: string[]` from a real feed means an actual ingestion/extraction step: fetch → get raw HTML or nothing → sanitize and split into paragraphs (current model, lossy — drops embedded images/formatting/links) or store sanitized HTML instead and render richer. That's a real, undecided design choice for whenever ingestion gets built — don't assume the current shape is what a parser will hand you.

## The placeholder-data pattern

Every route with data follows the same three-file split. This is deliberate — it's the seam real data-fetching will slot into later without touching the page component:

```txt
routes/<name>/
  data.ts           — hand-written placeholder content (exported consts)
  +page.server.ts   — thin `load` function; imports from ./data, returns it as-is
  +page.svelte      — consumes `data` via `PageProps` from './$types', renders it
```

`+page.server.ts` should stay thin — if it starts doing real logic beyond "import and return," that logic likely belongs in `data.ts` (or, once real fetching exists, in whatever replaces it). When real data-fetching is built, the intended change is: rewrite `data.ts`'s exports (or replace the import in `+page.server.ts` with a real query) — `+page.svelte` shouldn't need to change at all, since it only depends on the shape of `data`, not where it came from.

**Mock content is reused from the original design spec, not invented.** All placeholder articles/sources come verbatim from the two Claude Design source projects (see docs/components.md's "Design source" section) — same titles, excerpts, body paragraphs, source names. If you need more mock data, prefer pulling more from those source projects over writing new filler, for consistency with what's already there (and because the Feed page's mock "6 unread" count is a deliberate callback to matching the original design's own shown example value).

**`routes/data.ts` (the Feed page's data) is intentionally shared** with `routes/news/[id]/+page.server.ts`, which imports `newsItems` from it directly — that's the *same* entity, not a coincidentally-similar one, so it's reused rather than duplicated. **`routes/sources/data.ts` is intentionally *not* shared** with `routes/data.ts`, even though they both describe "sources" — that was a deliberate scope call (avoid a cross-route refactor when only the Sources page was asked for), not an oversight, and it means the two `Source[]` lists can currently drift out of sync with each other. If that duplication starts to matter, consolidating them into one shared placeholder module is the natural fix — but that's a call worth surfacing to the user first, not making unilaterally, since it touches already-approved code on both routes.

## Current routes

| Route | File | Notes |
| --- | --- | --- |
| `/` | `routes/+page.svelte` | Feed. Header ("News" title + unread count + Sources/Refresh links), `SearchBar`, `FilterPills`, `TopicTabs`, then the `NewsCard` river. |
| `/sources` | `routes/sources/+page.svelte` | Source management list (`SourceCard` × N in a `<ul>`) + a dashed "+ Add a source" button. |
| `/news/[id]` | `routes/news/[id]/+page.svelte` | Reader view for one item, looked up by numeric id from the shared `newsItems`. Calls SvelteKit's `error(404, ...)` for an unmatched id, which renders via `+error.svelte`. |
| (any error) | `routes/+error.svelte` | Renders `ErrorPage`, mapping `page.status` (via `$app/state`, not the legacy `$app/stores`) — `404`→`'404'`, `503`→`'503'`, anything else→`'500'`. `'offline'` isn't reachable through this path; see docs/roadmap.md. |

**No route currently links to another.** Every cross-page action (Feed's Sources/Refresh links, `NewsCard`'s open/save, Sources' back link, the reader's back/save/share/mark-as-read) is a real, styled, but *inert* element with no `onclick`/`href` wired — this was an explicit, repeated instruction while these pages were built, not a series of oversights. Wiring real navigation between them is a deliberate next step, not something to do incidentally while touching one of these files for another reason.
