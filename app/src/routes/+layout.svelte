<script lang="ts">
  import favicon from '#lib/assets/favicon.svg';

  import '../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>Newsie</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
  {@render children()}
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
