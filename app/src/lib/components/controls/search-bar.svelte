<script lang="ts">
  interface Props {
    /** Current search query. */
    value?: string;

    /** Placeholder text shown when empty; also used as the input's accessible name. */
    placeholder?: string;
  }

  let { value = $bindable(''), placeholder = 'Search feed' }: Props = $props();
</script>

<input type="search" {placeholder} aria-label={placeholder} bind:value />

<style>
  input {
    display: block;
    width: 100%;
    padding: 11px 15px;
    border-radius: var(--radius-input);
    border: 1px solid var(--color-border-hairline);
    background: var(--color-surface-card);
    color: var(--color-text-body);
    font-family: var(--font-sans);
    font-size: var(--text-ui);
    outline: none;
  }

  input::placeholder {
    color: var(--color-text-faint);
  }

  input:focus {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
</style>
