<script>
  import { derived } from "svelte/store";
  import { repository } from "../main.mjs";

  export let state;
</script>

{#if $repository}
  <div class="item">
    <div class="item-content">
      {$repository.name}
      <br />
      {$repository.description}
      <br />
      {$repository.id}
      <br />
      {$repository.fullName}
    </div>
    <div class="item-content">
      <ul>
        {#each $repository.urls as url}
          <li>
            <a href={url}>{url}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
{:else}No such repository{/if}
