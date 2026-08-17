# Devcontainer

## Outbound network firewall

[init-firewall.sh](init-firewall.sh) locks the container's outbound traffic down to an explicit allowlist (GitHub's published IP ranges, plus a fixed list of domains resolved and added to an `ipset`). Anything not on the list gets `REJECT`ed. It runs automatically via `postStartCommand` in [devcontainer.json](devcontainer.json) — not at image build time.

**If a tool needs a new host reachable** (npm registry, a CDN, an API), add its domain to the `for domain in ...` list in `init-firewall.sh`.

**After changing `init-firewall.sh`, fully rebuild the devcontainer** — don't just restart it, and don't run the script by hand inside an already-running container (`sudo /usr/local/bin/init-firewall.sh`) to "apply it now." Re-running it live against an active session reliably stalls (it flushes and rebuilds all iptables/ipset state out from under the running network stack). A rebuild re-runs `postStartCommand` cleanly against a fresh container.

Recent examples of domains added this way: `yarnpkg.com`, and `cdn.playwright.dev` / `playwright.download.prss.microsoft.com` (needed by `yarn playwright install`, which Storybook's Vitest browser tests depend on — see `app/vite.config.ts`).
