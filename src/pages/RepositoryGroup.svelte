<script>
  import RepositoryGroupCard from "../components/RepositoryGroupCard.svelte";
  import { repositoryGroup } from "../main.mjs";

  export let state;
</script>

{#if $repositoryGroup}
  <RepositoryGroupCard repositoryGroup={$repositoryGroup} />
{:else}No such group{/if}
