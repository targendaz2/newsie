<script lang="ts">
  interface Props {
    /** True when this story is saved. */
    saved?: boolean;

    /** Called when the button is tapped to toggle saved state. */
    onclick?: () => void;
  }

  const { saved = false, onclick }: Props = $props();

  function handleClick(event: MouseEvent) {
    event.stopPropagation();
    onclick?.();
  }
</script>

<button type="button" class:saved aria-pressed={saved} aria-label={saved ? 'Remove from saved' : 'Save story'} onclick={handleClick}>
  {saved ? '★' : '☆'}
</button>

<style>
  button {
    flex-shrink: 0;
    border: none;
    background: none;
    font-size: 17px;
    line-height: 1;
    cursor: pointer;
    padding: 2px;
    color: var(--color-star-off);
  }

  button.saved {
    color: var(--color-brand);
  }

  button:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
</style>
