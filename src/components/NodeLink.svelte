<script>
  import { Link } from "svelte-guard-history-router";
  export let node;
</script>

{#if node}
  <Link href="/node/{node.name}">
    <slot>
      <div aria-label={node.version} data-microtip-position="up" role="tooltip">{node.name}</div>
    </slot>
  </Link>
{/if}
