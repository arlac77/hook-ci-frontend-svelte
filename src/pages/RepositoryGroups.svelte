<script>
  import RepositoryGroupCard from "../components/RepositoryGroupCard.svelte";
  import { repositoryGroups } from "../main.mjs";

  export let state;
</script>

{#each $repositoryGroups as rg (rg.name)}
  <RepositoryGroupCard repositoryGroup={rg} />
{/each}
