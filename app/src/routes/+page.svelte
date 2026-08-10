<script lang="ts">
  import { Button, FilterPills, SearchBar, TopicTabs } from '$lib/components/controls';
  import { NewsCard } from '$lib/components/feed';

  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  const unreadCount = $derived(data.newsItems.filter((item) => !data.readIds.has(item.id)).length);
</script>

<header>
  <div>
    <h1>Today</h1>
    <p>{unreadCount} unread</p>
  </div>
  <div class="actions">
    <Button variant="link">⊟ Sources</Button>
    <Button variant="link">↻ Refresh</Button>
  </div>
</header>

<div class="search">
  <SearchBar />
</div>

<div class="filters">
  <FilterPills />
</div>

<div class="topics">
  <TopicTabs topics={data.topics} />
</div>

<div class="river">
  {#each data.newsItems as item (item.id)}
    <NewsCard newsItem={item} unread={!data.readIds.has(item.id)} saved={data.savedIds.has(item.id)} />
  {/each}
</div>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2px 24px 12px;
    flex-shrink: 0;
  }

  h1 {
    margin: 0;
    font-family: var(--font-serif);
    font-size: 27px;
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1;
  }

  header p {
    margin: 5px 0 0;
    font-size: var(--text-meta);
    color: var(--color-text-muted);
  }

  .actions {
    display: flex;
    gap: 18px;
    align-items: center;
    padding-top: 4px;
  }

  .search {
    margin: 0 24px 12px;
    flex-shrink: 0;
  }

  .filters {
    padding: 0 24px 11px;
    flex-shrink: 0;
  }

  .topics {
    padding: 0 24px 12px;
    flex-shrink: 0;
  }

  .river {
    flex: 1;
    overflow-y: auto;
    border-top: 1px solid var(--color-border-hairline);
  }
</style>
