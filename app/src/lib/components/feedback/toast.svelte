<script lang="ts">
  import type { Snippet } from 'svelte';
  import { fly } from 'svelte/transition';

  interface Props {
    /** Toast message content. */
    children: Snippet;
  }

  const { children }: Props = $props();
</script>

<div class="anchor">
  <div class="toast" role="status" transition:fly={{ y: 8, duration: 200 }}>
    {@render children()}
  </div>
</div>

<style>
  .anchor {
    position: absolute;
    bottom: 34px;
    left: 50%;
    transform: translateX(-50%);
  }

  .toast {
    background: var(--color-toast-bg);
    color: var(--color-toast-fg);
    font-family: var(--font-sans);
    font-size: 13.5px;
    font-weight: var(--font-weight-medium);
    padding: 11px 20px;
    border-radius: var(--radius-toast);
    box-shadow: var(--shadow-toast);
    white-space: nowrap;
  }
</style>
