<script>
  import RouterLink from "svelte-easyroute-rollup/RouterLink.svelte";
  import { repositories } from "../stores.mjs";
</script>

<style>

</style>

<div>
  <table class="table is-bordered is-striped is-hoverable">
    <thead>
      <tr>
        <th>Repository</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each $repositories as repository (repository.name)}
        <tr>
          <td>
            <RouterLink to="/repositories/{repository.name}" text={repository.name} />
          </td>
          <td>{repository.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
