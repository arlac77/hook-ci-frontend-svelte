<script>
  import { Link } from "svelte-guard-history-router";
  import { tooltip } from "../tooltip.mjs";

  export let queue;
  export let state = "";
</script>

<Link href="/queue/{queue.name}{state}">
  <slot><div use:tooltip={`Active: ${queue.active}`}>{queue.name}</div></slot>
</Link>
