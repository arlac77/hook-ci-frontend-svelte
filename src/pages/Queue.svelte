<script>
  import { ActionButton } from "svelte-common";
  import JobTable from "../components/JobTable.svelte";
  import PublishJobTable from "../components/PublishJobTable.svelte";
  import { session } from "../main.mjs";
  import api from 'consts:api';

  export let router;

  const route = router.route;

  async function queueAction(action) {
    return fetch(`${api}/queue/${$route.name}/${action}`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }

  async function jobAction(suffix) {
    for (const job of $route.jobs) {
      const response = await fetch(
        `${api}/queue/${$route.name}/job/${job.id}/${suffix}`,
        {
          method: "POST",
          headers: session.authorizationHeader
        }
      );
    }
  }
</script>

<div class="card-panel">
  {#if $route}
    <div class="card">
      <div class="card-content">
        <h5 class="card-title">{$route.name}</h5>
        <p class="card-text">{$route.active}</p>
        <p class="card-text">{$route.waiting}</p>
        <p class="card-text">{$route.completed}</p>
        <p class="card-text">{$route.failed}</p>
        <ActionButton action={() => queueAction('pause')}>
          Pause ({$route.paused})
        </ActionButton>
        <ActionButton action={() => queueAction('resume')}>Resume</ActionButton>
        <ActionButton action={() => queueAction('empty')}>Empty</ActionButton>
        <ActionButton action={() => jobAction('rerun')}>Rerun</ActionButton>
        <ActionButton action={() => jobAction('cancel')}>Cancel</ActionButton>
      </div>
    </div>
    {#if $route.name === 'publish'}
        <PublishJobTable queue={$route} jobs={$route.jobs} />
    {:else}
        <JobTable queue={$route} jobs={$route.jobs} />
    {/if}
  {:else}No such queue{/if}
</div>
