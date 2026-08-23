<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    /**
     * Visual style: `link` for quiet red text actions (Refresh, Sources), `outline` for Mark-as-read, `dashed` for the + Add a source
     * affordance.
     */
    variant?: 'link' | 'outline' | 'dashed';

    /** Button label text. */
    label: string;

    /** The onclick event handler */
    onclick?: () => void;
  }

  const { variant = 'link', label, onclick, ...rest }: Props = $props();
</script>

<button type="button" class={variant} {onclick} {...rest}>
  {label}
</button>

<style>
  /* Base button styles */
  button {
    display: inline-block;
    font-family: var(--font-sans);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition:
      color 0.15s ease,
      border-color 0.15s ease,
      background-color 0.15s ease;
  }

  button:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  /* Link button styles */
  .link {
    border: none;
    background: none;
    padding: 0;
    font-size: var(--text-ctrl);
    color: var(--color-brand);
  }

  .link:hover:not(:disabled) {
    color: var(--color-brand-hover);
  }

  /* Outline button styles */
  .outline {
    border: 1px solid var(--color-border-hairline);
    background: var(--color-card);
    color: var(--color-text-muted);
    font-size: var(--text-ctrl);
    padding: 10px 18px;
    border-radius: var(--radius-pill);
  }

  .outline:hover:not(:disabled) {
    color: var(--color-text-body);
    border-color: var(--color-brand);
  }

  /* Dashed button styles */
  .dashed {
    width: 100%;
    border: 1.5px dashed var(--color-dashed);
    background: transparent;
    color: var(--color-text-muted);
    font-size: var(--text-ui);
    padding: 15px;
    border-radius: var(--radius-card);
  }

  .dashed:hover:not(:disabled) {
    color: var(--color-text-body);
    border-color: var(--color-brand);
  }
</style>
