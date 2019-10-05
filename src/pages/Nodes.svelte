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
            <abbr class={node.uptime > 0 ? 'ok-hint' : 'error-hint'} />
          </span>
        </NodeLink>
        {node.version}
      </li>
    {/each}
  </ul>
</div>
