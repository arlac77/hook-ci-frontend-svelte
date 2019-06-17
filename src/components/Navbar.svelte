<script>
  export let req;
  export let nav;
</script>

<style>

</style>

<nav>
  <a href="/home" on:click={() => nav.navigate('/home')}>Home</a>
  <a href="/queue/incoming" on:click={() => nav.navigate('/queue/incoming')}>Incoming</a>
  <a href="/queues" on:click={() => nav.navigate('/queues')}>Queues</a>
</nav>
