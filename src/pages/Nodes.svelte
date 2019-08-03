<script>
  import Link from "../components/Link.svelte";
  import ApolloClient, { gql } from "apollo-boost";
  import { query } from "svelte-apollo";
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
              <Link href="/node/{node.name}">{node.name}</Link>
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
