<script>
  import RepositoryCard from '../components/RepositoryCard.svelte';
  import { repository } from "../main.mjs";
</script>

{#if $repository}
  <RepositoryCard repository={$repository}/>
{:else}No such repository{/if}
