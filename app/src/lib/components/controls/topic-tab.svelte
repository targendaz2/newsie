<script lang="ts">
  interface Props {
    /** Topic label text, e.g. "Dev", "Games", "All topics". */
    label: string;

    /** Whether this is the selected topic. */
    active?: boolean;

    /** Called when the topic is clicked. */
    onclick?: () => void;
  }

  const { label, active = false, onclick }: Props = $props();
</script>

<button type="button" class:active aria-pressed={active} {onclick}>
  {label}
</button>

<style>
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: var(--text-ctrl);
    font-weight: var(--font-weight-semibold);
    white-space: nowrap;
    padding: 0 0 3px;
    border-bottom: 2px solid transparent;
    color: var(--color-text-faint);
  }

  button.active {
    color: var(--color-text-body);
    border-bottom-color: var(--color-brand);
  }

  button:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
</style>
