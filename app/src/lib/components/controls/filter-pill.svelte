<script lang="ts">
  interface Props {
    /** Filter label text, e.g. "All", "Unread", "Saved". */
    label: string;

    /** Whether this pill is the selected filter. */
    active?: boolean;

    /** Called when the pill is clicked. */
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
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: var(--text-ctrl);
    font-weight: var(--font-weight-semibold);
    padding: 7px 15px;
    border-radius: var(--radius-pill);
    background: var(--color-chip-bg);
    color: var(--color-text-muted);
    transition:
      background 0.15s ease,
      color 0.15s ease;
  }

  button.active {
    background: var(--color-brand);
    color: var(--color-text-onaccent);
  }

  button:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
</style>
