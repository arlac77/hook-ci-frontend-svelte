<script>
  import ApolloClient, { gql } from "apollo-boost";
  import { query } from "svelte-apollo";
  import { Link } from "svelte-guard-history-router";
  import NodeLink from "../components/NodeLink.svelte";
  import ActionButton from "../components/ActionButton.svelte";
  import { config } from "../../package.json";

  const client = new ApolloClient({ uri: config.graphQl });

  const NODES = gql`
    {
      nodes {
        name
        version
        uptime
      }
    }
  `;

  const nodes = query(client, { query: NODES });

  async function reload() {
    return nodes.refetch();
  }
  
  function formatDuration(seconds) {
    const durations = [[604800, "w"],[86400, "d"], [3600, "h"], [60, "m"], [1, "s"]];

    let out = [];
    for (const d of durations) {
      const n = Math.floor(seconds / d[0]);
      if (n > 0) {
        out.push(`${n}${d[1]}`);
        seconds -= n * d[0];
      }
    }

    return out.join(' ');
  }

</script>

<div>
  {#await $nodes}
    Loading...
  {:then result}
    <ul class="item-list">
      {#each result.data.nodes as node (node.name)}
        <li class="item">
          <NodeLink {node} />
          <span>{node.version}</span>
          <span class="{node.uptime > 0 ? 'ok' : 'error'}">{formatDuration(node.uptime)}</span>
        </li>
      {/each}
    </ul>
  {:catch error}
    Error: {error}
  {/await}
</div>
<ActionButton action={reload}>Reload</ActionButton>
