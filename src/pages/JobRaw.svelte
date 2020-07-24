<script>
  export let router;

  const route = router.route;
</script>

{#if $route}
  <div class="log">{JSON.stringify($route, undefined, 2)}</div>
{/if}
