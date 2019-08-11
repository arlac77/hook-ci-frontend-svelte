<script>
  import { Link } from "svelte-guard-history-router";
  import RepositoryLink from "../components/RepositoryLink.svelte";

  export let context;

  let repositories;

  $: repositories = $context.repositories;
</script>

<div>
  <table class="is-bordered is-striped is-hoverable">
    <thead>
      <tr>
        <th>Repository</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each repositories as repository (repository.name)}
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
