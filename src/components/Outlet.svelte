<script>
  export let router;

  let component, context;

  router.subscribe(value => {
    component = router.component;
  });

  router.context.subscribe(value => {
    context = value;
  });
</script>

<div>
  {#if component}
    <svelte:component this={component} {router} {context}/>
  {:else}
    <slot />
  {/if}
</div>
