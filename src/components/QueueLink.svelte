<script>
  import { Link } from "svelte-guard-history-router";
  export let queue;
  export let state = "";
</script>

<Link href="/queue/{queue.name}{state}">
  <slot>{queue.name}</slot>
</Link>
