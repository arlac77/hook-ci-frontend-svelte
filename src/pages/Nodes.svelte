<script>
  import RouterLink from "svelte-easyroute-rollup/RouterLink.svelte";
  import ApolloClient, { gql } from "apollo-boost";
  import { query } from "svelte-apollo";
  import { graphQl } from "../../package.json";

  const client = new ApolloClient({ uri: graphQl });

  const NODES = gql`
    {
      nodes {
        name
        version
      }
    }
  `;

  const nodes = query(client, { query: NODES });

  function reload() {
    nodes.refetch();
  }
</script>

<div>
  {#await $nodes}
    Loading...
  {:then result}
    <table class="table is-bordered is-striped is-hoverable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Version</th>
        </tr>
      </thead>
      <tbody>
        {#each result.data.nodes as node (node.name)}
          <tr>
            <td>
              <RouterLink to="/node/{node.name}" text={node.name} />
            </td>
            <td>{node.version}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:catch error}
    Error: {error}
  {/await}
</div>
<button on:click={reload}>Reload</button>
