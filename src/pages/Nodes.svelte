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
      }
    }
  `;

  const nodes = query(client, { query: NODES });

  async function reload() {
    return nodes.refetch();
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
        </li>
      {/each}
    </ul>
  {:catch error}
    Error: {error}
  {/await}
</div>
<ActionButton action={reload}>Reload</ActionButton>
