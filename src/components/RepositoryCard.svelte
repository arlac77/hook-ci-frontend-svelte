<script>
  import RepositoryGroupLink from "./RepositoryGroupLink.svelte";
  export let repository;
</script>

<div class="card">
  <div class="card-content">
    <h5 class="card-title">{repository.name}</h5>
    <h6 class="card-subtitle">{repository.description}</h6>
    <p class="card-text">{repository.id}</p>
  </div>
  <ul>
    {#each repository.urls as url}
      <li>
        <a href={url}>{url}</a>
      </li>
    {/each}
  </ul>
  <RepositoryGroupLink repositoryGroup={repository.owner} />
</div>
