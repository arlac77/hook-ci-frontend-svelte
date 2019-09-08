<script>
  import { Link } from "svelte-guard-history-router";
  import { tooltip } from "../tooltip.mjs";
  export let node;
</script>

{#if node}
  <Link href="/node/{node.name}">
    <slot>
      <div use:tooltip={node.version}>{node.name}</div>
    </slot>
  </Link>
{/if}
