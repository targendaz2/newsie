<script lang="ts">
  import { formatDistanceToNow } from 'date-fns';

  import { Button } from '#components/controls';
  import { SourceCard } from '#components/sources';

  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  const activeCount = $derived(data.sources.filter((source) => source.active).length);
</script>

<div class="bar">
  <button type="button" class="back">&#8249; Feed</button>
  <h1>Sources</h1>
  <span class="summary">{activeCount}/{data.sources.length}</span>
</div>

<div class="content">
  <ul>
    {#each data.sources as source (source.id)}
      <SourceCard
        type={source.type}
        name={source.title}
        meta="{data.unreadBySource[source.id] ?? 0} unread · updated {formatDistanceToNow(source.lastFetchedAt, { addSuffix: true })}"
        on={source.active}
      />
    {/each}
  </ul>
  <div class="add">
    <Button variant="dashed">+ Add a source — RSS, email, handle, or repo</Button>
  </div>
</div>

<style>
  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 22px 14px;
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

  .back:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  h1 {
    margin: 0;
    font-family: var(--font-serif);
    font-size: 19px;
    font-weight: var(--font-weight-bold);
  }

  .summary {
    width: 40px;
    text-align: right;
    font-size: var(--text-meta);
    color: var(--color-text-muted);
  }

  .content {
    flex: 1;
    overflow-y: auto;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .add {
    padding: 20px 22px;
  }
</style>
