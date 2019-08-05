<script>
  export let href;

  function click(e) {
    window.dispatchEvent(
      new CustomEvent("routerLink", {
        detail: { path: e.currentTarget.pathname, needAddBase: true }
      })
    );
  }
</script>

<a {href} on:click|preventDefault={click}>
  <slot />
</a>
