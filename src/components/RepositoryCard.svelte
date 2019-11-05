<script>
  import RepositoryGroupLink from "./RepositoryGroupLink.svelte";
  export let repository;
</script>

<div class="card">
  <div class="card-content">
    <div class="card-title">{repository.name}</div>
    {repository.description}
    <br />
    {repository.id}
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
