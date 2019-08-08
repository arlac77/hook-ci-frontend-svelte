<script>
  import { onDestroy } from "svelte";

  export let context;

  let repository = { name: "", description: "" };

  onDestroy(context.subscribe(value => {
    repository = value.repositories.find(q => q.name === value.params.repository);
  }));
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
