<script lang="ts">
  import { formatDistanceToNow, formatRFC3339 } from 'date-fns';

  import { TypeBadge } from '#components/data';
  import type { NewsItem } from '#lib/types.js';

  interface Props {
    /** Source story. */
    newsItem: NewsItem;
  }

  const { newsItem }: Props = $props();

  const formattedPublishedAt = $derived(formatRFC3339(newsItem.publishedAt));
  const relativePublishedAt = $derived(formatDistanceToNow(newsItem.publishedAt, { addSuffix: true }));
</script>

<div>
  <TypeBadge type={newsItem.source.type ?? 'rss'} />
  <span class="source">{newsItem.source.title}</span>
  <time datetime={formattedPublishedAt}>· {relativePublishedAt}</time>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;
    flex-wrap: wrap;
  }

  span.source {
    font-size: var(--text-meta);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-muted);
  }

  time {
    font-size: var(--text-meta);
    color: var(--color-text-faint);
  }
</style>
