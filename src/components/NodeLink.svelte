<script>
  import { Link } from "svelte-guard-history-router";
  export let node;
</script>

{#if node}
<Link href="/node/{node.name}">
  <slot>{node.name}</slot>
</Link>
{/if}
