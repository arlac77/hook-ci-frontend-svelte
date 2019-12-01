<script>
  import { ActionButton } from "svelte-common";
  import JobTable from "../components/JobTable.svelte";
  import PublishJobTable from "../components/PublishJobTable.svelte";
  import { queue, session, jobs } from "../main.mjs";
  import api from 'consts:api';

  async function queueAction(action) {
    return fetch(`${api}/queue/${$queue.name}/${action}`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }
</script>

<div class="card-panel">
  {#if $queue}
    <div class="card">
      <div class="card-content">
        <h5 class="card-title">{$queue.name}</h5>
        <p class="card-text">{$queue.active}</p>
        <p class="card-text">{$queue.waiting}</p>
        <p class="card-text">{$queue.completed}</p>
        <p class="card-text">{$queue.failed}</p>
        <ActionButton action={() => queueAction('pause')}>
          Pause ({$queue.paused})
        </ActionButton>
        <ActionButton action={() => queueAction('resume')}>Resume</ActionButton>
        <ActionButton action={() => queueAction('empty')}>Empty</ActionButton>
      </div>
    </div>
    {#if $queue.name === 'publish'}
        <PublishJobTable queue={$queue} jobs={$jobs} />
    {:else}
        <JobTable queue={$queue} jobs={$jobs} />
    {/if}
  {:else}No such queue{/if}
</div>
