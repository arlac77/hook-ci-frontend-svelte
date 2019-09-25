<script>
  import { ActionButton } from "svelte-common";
  import JobTable from "../components/JobTable.svelte";
  import { queue, session, jobs } from "../main.mjs";
  import { config } from "../../package.json";

  export let state;

  let qn;

  $: qn = $queue ? $queue.name : '';

  async function pause() {
    return fetch(`${config.api}/queue/${qn}/pause`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }

  async function resume() {
    return fetch(`${config.api}/queue/${qn}/resume`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }

  async function empty() {
    return fetch(`${config.api}/queue/${qn}/empty`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }
</script>

<div>
  {#if $queue}
    <div class="card">
      <div class="card-content">
        <div class="content">
          {$queue.name}
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
          <ActionButton action={pause}>Pause ({$queue.paused})</ActionButton>
          <ActionButton action={resume}>Resume</ActionButton>
          <ActionButton action={empty}>Empty</ActionButton>
        </div>
      </div>
    </div>
    <JobTable queue={$queue} jobs={$jobs} />
  {:else}No such queue{/if}
</div>
