<script>
  import { Link } from "svelte-guard-history-router";
  import RepositoryLink from "../components/RepositoryLink.svelte";
  import { repositories }  from "../main.mjs";
  export let context;
</script>

<div>
  <table class="bordered striped hoverable">
    <thead>
      <tr>
        <th aria-sort="none">Repository</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each $repositories as repository (repository.name)}
        <tr>
          <td>
            <RepositoryLink {repository} />
          </td>
          <td>{repository.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
