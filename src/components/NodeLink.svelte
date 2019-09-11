<script>
  import { Link } from "svelte-guard-history-router";
  import { tooltip } from "svelte-common";
  export let node;
</script>

{#if node}
  <Link href="/node/{node.name}">
    <slot>
      <div use:tooltip={node.version}>{node.name}</div>
    </slot>
  </Link>
{/if}
