// Placeholder data until real fetching is wired up.
import type { NewsItem, Source, Topic } from '$lib/types';

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
    url: 'https://example.com/cozy-farming-sim-drop',
    publishedAt: hoursAgo(1),
    source: ign,
    topic: games,
  },
  {
    id: 5,
    title: 'Django 5.2.4 bugfix release is out',
    excerpt: "A routine patch fixing a regression in the ORM's bulk_update and a couple of admin edge cases. Upgrading is straightforward.",
    url: 'https://example.com/django-5-2-4',
    publishedAt: hoursAgo(5),
    source: django,
    topic: dev,
  },
  {
    id: 6,
    title: 'The long, strange history of the pause menu',
    excerpt: 'A feature-length look at how a humble UI element became a canvas for art direction, secrets, and the occasional prank.',
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
    url: 'https://example.com/build-steps-to-delete',
    publishedAt: daysAgo(1),
    source: bytes,
    topic: dev,
  },
  {
    id: 8,
    title: 'Iru 0.8 — faster cold starts and a plugin API',
    excerpt: 'Cold-start time drops by roughly a third, and a first-pass plugin API lets you hook the render pipeline without forking.',
    url: 'https://example.com/iru-0-8',
    publishedAt: hoursAgo(6),
    source: iru,
    topic: dev,
  },
  {
    id: 9,
    title: '"Ship the boring version first" — a thread',
    excerpt: 'A short, sharp thread on resisting the urge to over-engineer the first release of anything personal.',
    url: 'https://example.com/ship-the-boring-version',
    publishedAt: hoursAgo(8),
    source: mastodon,
    topic: tech,
  },
];

// Read/saved state normally lives with the viewer, not the item itself — hardcoded here for visual variety.
export const readIds = new Set([4, 5, 6]);
export const savedIds = new Set([2, 6]);
