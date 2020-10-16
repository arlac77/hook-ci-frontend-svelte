<script>
  import { Duration } from "svelte-common";
  import { ObjectLink } from "svelte-guard-history-router";

  export let router;

  const route = router.route;
</script>

<div class="card-panel">
  {#each $route as node (node.name)}
    <div class="card">
      <div class="card-content">
        <h5 class="card-title">{node.name}</h5>
        <ObjectLink object={node}>
          <span>
            <Duration seconds={node.uptime} />
            <abbr class={node.uptime > 0 ? 'ok-hint' : 'error-hint'} />
          </span>
        </ObjectLink>
        <p class="card-text">{node.version}</p>
      </div>
    </div>
  {/each}
</div>
