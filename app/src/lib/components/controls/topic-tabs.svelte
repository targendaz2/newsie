<script lang="ts">
  import type { Topic } from '#lib/types.js';

  import TopicTab from './topic-tab.svelte';

  interface Props {
    /** Topics to render as tabs, in order. */
    topics: Topic[];

    /** Currently selected topic's id. */
    active?: Topic['id'] | null;
  }

  let { topics, active = $bindable(null) }: Props = $props();
</script>

<div class="row">
  <TopicTab label="All topics" active={active === null} onclick={() => (active = null)} />
  {#each topics as topic (topic.id)}
    <TopicTab label={topic.title} active={topic.id === active} onclick={() => (active = topic.id)} />
  {/each}
</div>

<style>
  .row {
    display: flex;
    gap: 18px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .row::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
</style>
