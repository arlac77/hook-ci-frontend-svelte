<script>
  import { formatDuration, ActionButton } from "svelte-common";
  import NodeLink from "../components/NodeLink.svelte";
  import { nodes } from "../main.mjs";
</script>

<div>
  <ul class="item-list">
    {#each $nodes as node (node.name)}
      <li class="item">
        <NodeLink {node}>
          <strong>{node.name}</strong>
          <span>
            {formatDuration(node.uptime)}
            {#if node.uptime > 0}
              <abbr class="ok-hint" />
            {/if}
          </span>
        </NodeLink>
        {node.version}
      </li>
    {/each}
  </ul>
</div>
