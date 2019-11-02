<script>
  import { ActionButton } from "svelte-common";
  import JobTable from "../components/JobTable.svelte";
  import { queue, session, jobs } from "../main.mjs";
  import { config } from "../../package.json";

  export let state;

  async function queueAction(action) {
    return fetch(`${config.api}/queue/${$queue.name}/${action}`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }
</script>

<div class="card-panel">
  {#if $queue}
    <div class="card">
      <div class="card-title">{$queue.name}</div>
      <div class="card-content">
        <br />
        {$queue.active}
        <br />
        {$queue.waiting}
        <br />
        {$queue.delayed}
        <br />
        {$queue.completed}
        <br />
        {$queue.failed}
        <ActionButton action={() => queueAction('pause')}>
          Pause ({$queue.paused})
        </ActionButton>
        <ActionButton action={() => queueAction('resume')}>Resume</ActionButton>
        <ActionButton action={() => queueAction('empty')}>Empty</ActionButton>
      </div>
    </div>
    <JobTable queue={$queue} jobs={$jobs} />
  {:else}No such queue{/if}
</div>
