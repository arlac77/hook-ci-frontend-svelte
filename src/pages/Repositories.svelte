<script>
  import { Link } from "svelte-guard-history-router";
  export let context;
  
  let repositories;

  context.subscribe(value => {
    repositories = value.repositories;
  });
</script>

<div>
  <table class="table is-bordered is-striped is-hoverable">
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
            <Link href="/repository/{repository.name}">{repository.name}</Link>
          </td>
          <td>{repository.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
