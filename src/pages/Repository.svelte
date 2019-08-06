<script>
  import { repositories } from "../stores.mjs";
  export let currentRoute;
  export let repository = { name: "", description: "" };

  export let router;

  router.context.subscribe(value => {
    repository = $repositories.find(q => q.name === value.params.name);
  });
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
        {#each $repository.urls as url}
          <br />
          {url}
        {/each}
      </div>
    </div>
  </div>
</div>
