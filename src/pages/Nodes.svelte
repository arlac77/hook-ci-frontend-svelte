<script>
  import { formatDuration, ActionButton } from "svelte-common";
  import NodeLink from "../components/NodeLink.svelte";
  import { nodes } from "../main.mjs";
</script>

<div class="card-panel">
  {#each $nodes as node (node.name)}
    <div class="card">
      <div class="card-content">
        <div class="card-title">{node.name}</div>
        <NodeLink {node}>
          <span>
            {formatDuration(node.uptime)}
            <abbr class={node.uptime > 0 ? 'ok-hint' : 'error-hint'} />
          </span>
        </NodeLink>
        {node.version}
      </div>
    </div>
  {/each}
</div>
