<script>
  export let href;

  function click(e) {
    window.dispatchEvent(
      new CustomEvent("svelteEasyrouteLinkClicked", {
        detail: { path: e.currentTarget.pathname, needAddBase: true }
      })
    );
  }
</script>

<a {href} on:click|preventDefault={click}>
  <slot />
</a>
