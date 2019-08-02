<script>
  import { onMount } from "svelte";
  export let router;
  import RouterLink from "svelte-easyroute-rollup/RouterLink.svelte";

  let done;

  onMount(() => {
    if (!done) {
      done = true;
      router.createOutlet();
    }
  });
</script>

<div class="wrapper">
  <header id="topnav">
    <RouterLink to="/" text={'Home'} />
    <RouterLink to="/queues" text={'Queues'} />
    <RouterLink to="/repositories" text={'Repositories'} />
    <RouterLink to="/nodes" text={'Nodes'} />
    <RouterLink to="/about" text={'About'} />
    <RouterLink to="/login" text={'Login'} />
  </header>
  <main>
    <div id="router-outlet" />
  </main>
</div>
