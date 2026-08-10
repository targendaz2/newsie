<script lang="ts">
  import { formatDistanceToNow, formatRFC3339 } from 'date-fns';

  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  const formattedPublishedAt = $derived(formatRFC3339(data.newsItem.publishedAt));
  const relativePublishedAt = $derived(formatDistanceToNow(data.newsItem.publishedAt, { addSuffix: true }));
</script>

<div class="bar">
  <button type="button" class="back">&#8249; Feed</button>
  <div class="actions">
    <button type="button" class="save">☆ Save</button>
    <button type="button" class="share">Share</button>
  </div>
</div>

<div class="body">
  <span class="badge">{data.newsItem.source.type ?? 'rss'}</span>
  <div class="byline">
    {data.newsItem.source.title} ·
    <time datetime={formattedPublishedAt}>{relativePublishedAt}</time>
  </div>
  <h1>{data.newsItem.title}</h1>
  {#each data.newsItem.body ?? [] as paragraph, i (i)}
    <p>{paragraph}</p>
  {/each}
  <button type="button" class="mark">Mark as read</button>
</div>

<style>
  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 22px;
    border-bottom: 1px solid var(--color-border-hairline);
    flex-shrink: 0;
  }

  .back {
    border: none;
    background: none;
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: var(--font-weight-semibold);
    color: var(--color-brand);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 18px;
    font-size: var(--text-ctrl);
  }

  .save,
  .share {
    border: none;
    background: none;
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: inherit;
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-muted);
  }

  .back:focus-visible,
  .save:focus-visible,
  .share:focus-visible,
  .mark:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  .body {
    flex: 1;
    overflow-y: auto;
    padding: 26px 26px 70px;
  }

  .badge {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-badge);
    color: var(--color-brand);
    background: var(--color-chip-bg);
    padding: 3px 8px;
    border-radius: var(--radius-badge);
    text-transform: uppercase;
  }

  .byline {
    margin-top: 16px;
    font-size: var(--text-ctrl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-muted);
  }

  h1 {
    margin: 8px 0 20px;
    font-family: var(--font-serif);
    font-size: 28px;
    font-weight: var(--font-weight-bold);
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  p {
    margin: 0 0 18px;
    font-family: var(--font-serif);
    font-size: var(--text-story);
    line-height: var(--leading-relaxed);
    color: var(--color-text-body);
  }

  .mark {
    margin-top: 14px;
    border: 1px solid var(--color-border-hairline);
    background: var(--color-card);
    color: var(--color-text-muted);
    font-family: var(--font-sans);
    font-size: var(--text-ctrl);
    font-weight: var(--font-weight-semibold);
    padding: 10px 18px;
    border-radius: var(--radius-pill);
    cursor: pointer;
  }
</style>
