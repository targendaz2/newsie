<script lang="ts">
  import { page } from '$app/state';

  import { ErrorPage } from '#components/error';

  const status = $derived(page.status === 404 ? '404' : page.status === 503 ? '503' : '500');
</script>

<ErrorPage {status} />
