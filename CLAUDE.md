# Newsie

Newsie is a warm-newsprint, mobile-first personal RSS/news reader PWA (`newsie.site`).

## Project Configuration

- **Language**: TypeScript
- **Package Manager**: yarn
- **Add-ons**: prettier, eslint, sveltekit-adapter, storybook, experimental, ai-tools — note: formatting is actually done by `oxfmt`, not Prettier (see Commands below); `eslint-config-prettier` is only present to disable ESLint rules that would fight `oxfmt`.

## Workspaces

Yarn-workspaces monorepo:

- **`app/`** — SvelteKit 5 frontend (the `newsie.site` PWA). See [app/CLAUDE.md](app/CLAUDE.md).
- **`packages/db`** — Drizzle ORM schema/migrations for the D1 database.
- **`workers/feed-reader`** — Cloudflare Worker backend. See [workers/feed-reader/CLAUDE.md](workers/feed-reader/CLAUDE.md).

## Commands

- **Format**: `yarn format` (fix) / `yarn format:check` (verify) — runs `oxfmt` across every workspace. This project uses `oxfmt`, not Prettier, for all formatting (`prettier.enable: false` in `.vscode/settings.json`) — `prettier`/`eslint-config-prettier` in devDependencies exist only to stop ESLint fighting `oxfmt`'s formatting choices. Don't consider TS/Svelte/JSON work done until `format:check` passes. The binary lives only in the root `node_modules/.bin/oxfmt` (no per-workspace copy).
- **Cross-workspace tasks**: see [Taskfile.yml](Taskfile.yml) — e.g. `task test:app`, `task build:app`, `task deploy:app`, `task storybook`, `task cf-typegen` (regenerates Cloudflare types for all of `app`/`packages/db`/`workers/feed-reader` at once).

## Devcontainer

- The devcontainer restricts outbound network access to an explicit domain allowlist. If a tool can't reach a host it needs, see [.devcontainer/README.md](.devcontainer/README.md) before editing the firewall script — in particular, changes to it require a full container rebuild, not a live re-run.

---

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
