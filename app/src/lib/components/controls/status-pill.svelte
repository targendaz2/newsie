<script lang="ts">
  interface Props {
    /** True when the app is offline and showing cached content. */
    offline?: boolean;

    /** Called when the pill is tapped to toggle cached mode. */
    onclick?: () => void;
  }

  const { offline = false, onclick }: Props = $props();
</script>

<button type="button" class:offline {onclick}>
  {offline ? '◍ Offline · cached' : '● Live'}
</button>

<style>
  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 0.06em;
    font-weight: var(--font-weight-semibold);
    color: var(--color-brand);
  }

  button.offline {
    color: var(--color-text-muted);
  }

  button:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
</style>
