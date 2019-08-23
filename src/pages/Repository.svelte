<script>
  import { derived } from "svelte/store";
  import { repositories } from "../store.mjs";

  export let context;

  let repository = { name: "", description: "" };
  const repositoryKey = context.keys.repository;

  $: repository = $repositories.find(r => r.name === $repositoryKey);
  

/*
  export const rs = derived(
    repositories,
    repositoryKey,
    ($repositories, $repositoryKey) =>
      $repositories.find(r => r.name === $repositoryKey)
  );
   $: repository = $rs;
*/


</script>

<div>
  <div class="card">
    <div class="card-content">
      <div class="content">
        {repository.name}
        <br />
        {repository.description}
        <br />
        {repository.id}
        <br />
        {repository.fullName}
        {#each repository.urls as url}
          <br />
          <a href={url}>{url}</a>
        {/each}
      </div>
    </div>
  </div>
</div>
