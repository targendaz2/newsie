<script lang="ts">
  import type { NewsFilter } from '#lib/types.js';

  import FilterPill from './filter-pill.svelte';

  interface Props {
    /** Currently selected filter. */
    active?: NewsFilter;
  }

  let { active = $bindable('all') }: Props = $props();
</script>

<div>
  <FilterPill label="All" active={active === 'all'} onclick={() => (active = 'all')} />
  <FilterPill label="Unread" active={active === 'unread'} onclick={() => (active = 'unread')} />
  <FilterPill label="Saved" active={active === 'saved'} onclick={() => (active = 'saved')} />
</div>

<style>
  div {
    display: flex;
    gap: var(--spacing-2);
  }
</style>
