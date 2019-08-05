<script>
  export let router;

  let component;

  router.subscribe(value => {
    component = router.currentComponent;
  });
</script>

<div>
  {#if component}
    <svelte:component this={component} {router}/>
  {:else}<slot />{/if}
</div>
