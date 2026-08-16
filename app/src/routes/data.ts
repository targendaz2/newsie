// Placeholder data until real fetching is wired up.
import type { NewsItem, Source, Topic } from '#lib/types.js';

const minutesAgo = (n: number) => new Date(Date.now() - n * 60_000);
const hoursAgo = (n: number) => new Date(Date.now() - n * 60 * 60_000);
const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60_000);

export const topics: Topic[] = [
  { id: 1, title: 'Dev' },
  { id: 2, title: 'Games' },
  { id: 3, title: 'Apple' },
  { id: 4, title: 'Tech' },
];

function source(id: number, title: string, type: string, lastFetchedAt: Date): Source {
  return { id, title, type, url: `https://example.com/${title.toLowerCase().replace(/\s+/g, '-')}`, lastFetchedAt, active: true };
}

const macrumors = source(1, 'MacRumors', 'rss', minutesAgo(42));
const hackerNews = source(2, 'Hacker News', 'social', minutesAgo(20));
const ign = source(3, 'IGN', 'rss', hoursAgo(1));
const kotaku = source(4, 'Kotaku', 'rss', hoursAgo(3));
const okta = source(5, 'Okta Release Notes', 'release', hoursAgo(2));
const django = source(6, 'Django Weblog', 'release', hoursAgo(5));
const iru = source(7, 'Iru Releases', 'github', hoursAgo(6));
const bytes = source(8, 'Bytes Newsletter', 'email', daysAgo(1));
const mastodon = source(9, 'Mastodon · @dev', 'social', hoursAgo(8));

const [dev, games, apple, tech] = topics;

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'macOS point update squashes external display bug',
    excerpt:
      'The latest maintenance build fixes a flicker some users saw with third-party monitors over USB-C, plus a handful of security patches.',
    body: [
      'A new maintenance release started rolling out this morning, and the headline fix is one a lot of desk setups have been waiting on: intermittent flicker on some third-party displays connected over USB-C.',
      'Alongside the display fix, the update bundles the usual round of security patches and a small battery-life improvement for laptops left idle on a charger.',
      'It is a recommended install for anyone who runs an external monitor daily. No new features here — this is purely a stability and security pass.',
    ],
    url: 'https://example.com/macos-point-update',
    publishedAt: minutesAgo(42),
    source: macrumors,
    topic: apple,
  },
  {
    id: 2,
    title: 'Show HN: A tiny local-first RSS reader you can self-host',
    excerpt:
      'Weekend project — a single binary that pulls feeds, dedupes across sources, and serves a fast mobile web app. No account, no cloud.',
    body: [
      'I got tired of syncing read-state across three apps, so I built a single-binary reader that stores everything locally and serves a small web app you can pin to your home screen.',
      'It pulls RSS and Atom, watches a few GitHub release pages, and dedupes stories that show up in more than one feed. The whole database is one SQLite file you can back up.',
      'Comments are asking about email-newsletter ingestion and full-text extraction, both of which are on the roadmap. Source is up if you want to poke at it.',
    ],
    url: 'https://example.com/show-hn-rss-reader',
    publishedAt: minutesAgo(20),
    source: hackerNews,
    topic: tech,
  },
  {
    id: 3,
    title: 'Identity Engine 2025.09 — adaptive MFA & new audit log',
    excerpt:
      'Adaptive MFA policies can now branch on device posture, and the admin audit log gets a redesigned timeline view with exportable filters.',
    body: [
      'This release focuses on two areas: policy flexibility and visibility. Adaptive MFA policies can now branch on device posture signals, so a managed laptop and an unknown phone can be treated very differently.',
      'The admin audit log has been rebuilt around a timeline view. You can filter by actor, target, and event type, then export the filtered set directly to CSV.',
      'Deprecations: the legacy policy API endpoint is now marked for removal in a future major version. Migration guidance is linked in the full notes.',
    ],
    url: 'https://example.com/identity-engine-2025-09',
    publishedAt: hoursAgo(2),
    source: okta,
    topic: dev,
  },
  {
    id: 4,
    title: 'Cozy farming sim gets a surprise free content drop',
    excerpt:
      'A popular indie farming game added a new season, two festivals, and co-op fishing in an update that arrived without warning overnight.',
    body: [
      'The update landed overnight with no roadmap teaser, which is unusual for a game that normally telegraphs its patches weeks ahead.',
      'New this season: two village festivals, a redesigned mine layout, and long-requested co-op fishing that lets you share a dock with a friend.',
      'Existing saves carry over cleanly, and the studio says a paid expansion is still planned separately for later in the year.',
    ],
    url: 'https://example.com/cozy-farming-sim-drop',
    publishedAt: hoursAgo(1),
    source: ign,
    topic: games,
  },
  {
    id: 5,
    title: 'Django 5.2.4 bugfix release is out',
    excerpt: "A routine patch fixing a regression in the ORM's bulk_update and a couple of admin edge cases. Upgrading is straightforward.",
    body: [
      'Django 5.2.4 is a bugfix release addressing a small number of regressions reported since 5.2.3.',
      'The most notable fix corrects a regression in bulk_update that could raise on certain composite field combinations. Two minor admin rendering issues were also resolved.',
      'There are no backwards-incompatible changes. Pinned projects can upgrade with confidence; run your test suite as always.',
    ],
    url: 'https://example.com/django-5-2-4',
    publishedAt: hoursAgo(5),
    source: django,
    topic: dev,
  },
  {
    id: 6,
    title: 'The long, strange history of the pause menu',
    excerpt: 'A feature-length look at how a humble UI element became a canvas for art direction, secrets, and the occasional prank.',
    body: [
      'The pause menu started as pure utility — a way to stop the clock — but over decades it quietly became one of the most expressive surfaces in a game.',
      'The piece traces how studios have used pause screens to hide lore, tease sequels, and even scold players who quit too often.',
      'It closes on a soft argument: the best pause menus respect your time, load instantly, and remember exactly where you left off.',
    ],
    url: 'https://example.com/pause-menu-history',
    publishedAt: hoursAgo(3),
    source: kotaku,
    topic: games,
  },
  {
    id: 7,
    title: 'This week: build steps you can finally delete',
    excerpt:
      'The lead story argues that a lot of front-end tooling is now optional, with a few concrete examples of setups you can simplify.',
    body: [
      'This issue makes the case that a surprising amount of build tooling has quietly become optional as browsers caught up.',
      'The examples are practical: native modules, import maps, and CSS features that used to require a preprocessor. Each comes with a small before-and-after.',
      "As always, the links section at the bottom is where the real value is. Three of this week's picks are worth your time.",
    ],
    url: 'https://example.com/build-steps-to-delete',
    publishedAt: daysAgo(1),
    source: bytes,
    topic: dev,
  },
  {
    id: 8,
    title: 'Iru 0.8 — faster cold starts and a plugin API',
    excerpt: 'Cold-start time drops by roughly a third, and a first-pass plugin API lets you hook the render pipeline without forking.',
    body: [
      'Version 0.8 is the biggest performance release so far. Cold starts are down about a third thanks to a rewritten module loader.',
      'The headline feature is a first-pass plugin API. You can now hook into the render pipeline at three defined points instead of maintaining a fork.',
      'This is still pre-1.0, so the plugin surface may shift. The changelog flags exactly which hooks are considered stable.',
    ],
    url: 'https://example.com/iru-0-8',
    publishedAt: hoursAgo(6),
    source: iru,
    topic: dev,
  },
  {
    id: 9,
    title: '"Ship the boring version first" — a thread',
    excerpt: 'A short, sharp thread on resisting the urge to over-engineer the first release of anything personal.',
    body: [
      'The thread opens with a simple rule: the first version of a personal tool should be almost embarrassingly boring.',
      'The argument is that novelty in a side project usually shows up as risk, not value. Ship the obvious thing, use it for a week, then earn each addition.',
      "Replies pile on with examples of features people built, loved in theory, and never once used. It's a good gut-check before a rewrite.",
    ],
    url: 'https://example.com/ship-the-boring-version',
    publishedAt: hoursAgo(8),
    source: mastodon,
    topic: tech,
  },
];

// Read/saved state normally lives with the viewer, not the item itself — hardcoded here for visual variety.
export const readIds = new Set([4, 5, 6]);
export const savedIds = new Set([2, 6]);
