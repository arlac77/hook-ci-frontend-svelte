<script>
  import { formatDuration, ActionButton } from "svelte-common";
  import NodeLink from "../components/NodeLink.svelte";
  import { nodes } from "../main.mjs";
</script>

{#each $nodes as node (node.name)}
  <div class="card">
    <div class="card-content">
      <NodeLink {node}>
        <strong>{node.name}</strong>
        <span>
          {formatDuration(node.uptime)}
          <abbr class={node.uptime > 0 ? 'ok-hint' : 'error-hint'} />
        </span>
      </NodeLink>
      {node.version}
    </div>
  </div>
{/each}
