<script>
  import RepositoryGroupCard from "../components/RepositoryGroupCard.svelte";
  import { repositoryGroups } from "../main.mjs";
</script>

<div class="card-panel">
  {#each $repositoryGroups as rg (rg.name)}
    <RepositoryGroupCard repositoryGroup={rg} />
  {/each}
</div>
