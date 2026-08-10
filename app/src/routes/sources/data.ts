// Placeholder data until real fetching is wired up.
import type { Source } from '$lib/types';

const minutesAgo = (n: number) => new Date(Date.now() - n * 60_000);
const hoursAgo = (n: number) => new Date(Date.now() - n * 60 * 60_000);
const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60_000);

function source(id: number, title: string, type: string, lastFetchedAt: Date, active: boolean): Source {
  return { id, title, type, url: `https://example.com/${title.toLowerCase().replace(/\s+/g, '-')}`, lastFetchedAt, active };
}

export const sources: Source[] = [
  source(1, 'MacRumors', 'rss', minutesAgo(42), true),
  source(2, 'Hacker News', 'social', minutesAgo(20), true),
  source(3, 'IGN', 'rss', hoursAgo(1), true),
  source(4, 'Kotaku', 'rss', hoursAgo(3), true),
  source(5, 'Okta Release Notes', 'release', hoursAgo(2), true),
  source(6, 'Django Weblog', 'release', hoursAgo(5), true),
  source(7, 'Iru Releases', 'github', hoursAgo(6), false),
  source(8, 'Bytes Newsletter', 'email', daysAgo(1), true),
  source(9, 'Mastodon · @dev', 'social', hoursAgo(8), false),
];

// Unread counts per source normally come from joining against the news items — hardcoded here for visual variety.
export const unreadBySource: Record<number, number> = {
  1: 3,
  2: 1,
  3: 0,
  4: 1,
  5: 1,
  6: 0,
  7: 0,
  8: 1,
  9: 0,
};
