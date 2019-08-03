<script>
  export let to;

  function click(e) {
    e.preventDefault();
    e.stopPropagation();

    window.dispatchEvent(
      new CustomEvent("svelteEasyrouteLinkClicked", {
        detail: { path: e.currentTarget.pathname, needAddBase: true }
      })
    );
  }
</script>

<a href={to} on:click={click}>
  <slot />
</a>
