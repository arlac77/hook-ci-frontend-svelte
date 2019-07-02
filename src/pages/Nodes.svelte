<script>
  import RouterLink from "svelte-easyroute-rollup/RouterLink.svelte";
  import { nodes } from "../stores.mjs";
</script>

<div>
  <table class="table is-bordered is-striped is-hoverable">
    <thead>
      <tr>
        <th>Name</th>
        <th>Version</th>
        <th>Uptime</th>
      </tr>
    </thead>
    <tbody>
      {#each $nodes as node (nodes.name)}
        <tr>
          <td>
            <RouterLink to="/node/{node.name}" text={node.name} />
          </td>
          <td>{node.version}</td>
          <td>{node.uptime}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
