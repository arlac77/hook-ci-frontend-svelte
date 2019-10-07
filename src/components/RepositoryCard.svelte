<script>
  import RepositoryGroupLink from "./RepositoryGroupLink.svelte";
  export let repository;
</script>

<div class="item">
  <div class="item-content">
    {repository.name}
    <br />
    {repository.description}
    <br />
    {repository.id}
    <br />
    {repository.fullName}
  </div>
  <div class="item-content">
    <ul>
      {#each repository.urls as url}
        <li>
          <a href={url}>{url}</a>
        </li>
      {/each}
    </ul>
  </div>
  <RepositoryGroupLink group={repository.owner} />
</div>
