<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import type { Topic } from '#lib/types.js';

  import TopicTabs from './topic-tabs.svelte';

  const topics: Topic[] = [
    { id: 1, title: 'Dev' },
    { id: 2, title: 'Games' },
    { id: 3, title: 'Apple' },
    { id: 4, title: 'Tech' },
  ];

  const { Story } = defineMeta({
    title: 'Design System/Controls/TopicTabs',
    component: TopicTabs,
    args: {
      topics,
    },
  });
</script>

<!-- "All topics" selected -->
<Story name="All Selected" args={{ active: null }} />

<!-- A specific topic selected -->
<Story name="Topic Selected" args={{ active: 2 }} />
