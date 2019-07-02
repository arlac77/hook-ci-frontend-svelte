<script>
  import { onMount } from "svelte";
  export let router;
  import RouterLink from "svelte-easyroute-rollup/RouterLink.svelte";

  onMount(() => router.createOutlet());
</script>

<div class="wrapper">
  <header>
    <div id="nav">
      <RouterLink to="/" text={'Home'} />
      <RouterLink to="/queue/incoming" text={'Incoming'} />
      <RouterLink to="/queues" text={'Queues'} />
    </div>
  </header>
  <main>
    <div id="router-outlet" />
  </main>
</div>
