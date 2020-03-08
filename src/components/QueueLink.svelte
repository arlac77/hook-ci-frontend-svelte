<script>
  import { Link } from "svelte-guard-history-router";

  export let queue;
  export let state;
</script>

<Link href="/queue/{state === undefined ? queue.name : queue.name + '/' + state}">
  <slot><div aria-label="Active: {queue.active}" data-microtip-position="up" role="tooltip">{queue.name}</div></slot>
</Link>
