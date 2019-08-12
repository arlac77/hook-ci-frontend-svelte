<script>
  import { onDestroy } from "svelte";
  import { repositories }  from "../store.mjs";

  export let context;

  let repository = { name: "", description: "" };

  const repositoryKey = context.keys.get('repository');

  $: repository = $repositories.find(r => r.name === $repositoryKey);
  
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
