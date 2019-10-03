<script>
  import { formatDuration, ActionButton } from "svelte-common";
  import { node } from "../main.mjs";

  async function restart() {
      
  }

</script>

{#if $node}
  <h3>Node {$node.name}</h3>
  {$node.version} {formatDuration($node.uptime)}
  {#if $node.uptime > 0}
    <abbr class="ok-hint" />
  {/if}

  <ActionButton action={restart}>Restart</ActionButton>
{:else}Not found{/if}
