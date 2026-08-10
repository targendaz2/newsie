<script lang="ts">
  interface Props {
    /** Loading message shown next to the spinner. */
    label?: string;
  }

  const { label = 'Checking sources…' }: Props = $props();
</script>

<div role="status">
  <span class="spinner" aria-hidden="true"></span>
  {label}
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px;
    color: var(--color-text-muted);
    font-size: var(--text-ctrl);
  }

  .spinner {
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 2px solid var(--color-border-hairline);
    border-top-color: var(--color-brand);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .spinner {
      animation: none;
    }
  }
</style>
