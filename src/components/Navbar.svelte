<script>
  export let req;
  export let nav;
</script>

<style type="text/scss">
  @import "../style/global.sass";
</style>

<nav class="navbar is-fixed-top">
  <div class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item has-dropdown is-hoverable">
        <a href="/home" on:click={() => nav.navigate('/home')}>Home</a>
      </div>
      <div class="navbar-item has-dropdown is-hoverable">
        <a
          href="/queue/incoming"
          on:click={() => nav.navigate('/queue/incoming')}>
          Incoming
        </a>
      </div>
      <div class="navbar-item has-dropdown is-hoverable">
        <a href="/queues" on:click={() => nav.navigate('/queues')}>Queues</a>
      </div>
    </div>
  </div>
</nav>
