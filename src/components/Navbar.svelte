<script>
  export let req;
  export let nav;
</script>

<style type="text/scss">
  @import "../style/global.sass";
</style>

<nav class="header navbar is-fixed-top">
  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item has-dropdown is-hoverable">
        <a on:click={() => nav.navigate('/home')}>Home</a>
      </div>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="anchored" on:click={() => nav.navigate('/queue/incoming')}>Incoming</a>
      </div>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="anchored" on:click={() => nav.navigate('/queues')}>Queues</a>
      </div>
    </div>
  </div>
</nav>
