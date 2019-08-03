<script>
  import { repositories } from "../stores.mjs";
  export let currentRoute;
  export let repository = { name: "", description: "" };

  $: repository = $repositories.find(r => r.name === currentRoute.params.name);
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
