<script lang="ts">
  interface Props {
    /** Fills the dot with the brand color to flag an unread story. */
    unread?: boolean;
  }

  const { unread = false }: Props = $props();
</script>

<span class:unread aria-hidden="true"></span>

<style>
  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-top: 7px;
    flex-shrink: 0;
    background: transparent;
  }

  span.unread {
    background: var(--color-brand);
  }
</style>
