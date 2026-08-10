<script lang="ts">
  import type { NewsItem } from '$lib/types';

  import SaveButton from '../controls/save-button.svelte';
  import NewsByline from './news-byline.svelte';
  import UnreadDot from './unread-dot.svelte';

  interface Props {
    /** Source article. */
    newsItem: NewsItem;

    /** Shows the unread dot and keeps the title at full ink color. */
    unread?: boolean;

    /** Fills the star to mark this story as saved. */
    saved?: boolean;

    /** Called when the row is tapped to open the reader. */
    onOpen?: () => void;

    /** Called when the star is tapped to toggle saved state. */
    onToggleSave?: () => void;
  }

  const { newsItem, unread = true, saved = false, onOpen, onToggleSave }: Props = $props();

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen?.();
    }
  }
</script>

<article>
  <div class="hit-area" role="button" tabindex="0" onclick={onOpen} onkeydown={handleKeydown}>
    <UnreadDot {unread} />
    <div class="body">
      <NewsByline {newsItem} />
      <h3 class:unread>{newsItem.title}</h3>
      {#if newsItem.excerpt}
        <p>{newsItem.excerpt}</p>
      {/if}
    </div>
  </div>
  <SaveButton {saved} onclick={onToggleSave} />
</article>

<style>
  article {
    display: flex;
    gap: 13px;
    padding: var(--spacing-row-pad-y) var(--spacing-gutter);
    border-bottom: 1px solid var(--color-border-hairline);
    align-items: flex-start;
  }

  div.hit-area {
    display: flex;
    flex: 1;
    min-width: 0;
    gap: 13px;
    align-items: flex-start;
    cursor: pointer;
  }

  div.hit-area:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: -2px;
  }

  div.body {
    flex: 1;
    min-width: 0;
  }

  h3 {
    margin: 0;
    font-family: var(--font-serif);
    font-size: var(--text-story);
    font-weight: var(--font-weight-semibold);
    line-height: var(--leading-snug);
    color: var(--color-text-faint);
  }

  h3.unread {
    color: var(--color-text-body);
  }

  p {
    margin: 5px 0 0;
    font-size: var(--text-excerpt);
    line-height: var(--leading-normal);
    color: var(--color-text-muted);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
