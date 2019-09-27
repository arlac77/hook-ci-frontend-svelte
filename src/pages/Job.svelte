<script>
  import { onDestroy } from "svelte";
  import { Link } from "svelte-guard-history-router";
  import { ActionButton } from "svelte-common";
  import Step from "../components/Step.svelte";
  import { queue, session, job } from "../main.mjs";
  import { config } from "../../package.json";

  export let state;

  async function rerun() {
    return fetch(`${config.api}/queue/${$queue.name}/job/${$job.id}/rerun`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }

  async function cancel() {
    return fetch(`${config.api}/queue/${$queue.name}/job/${$job.id}/cancel`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }
</script>

{#if $job}
  <div>
    <h3>Job {$job.id}</h3>
    AttemptsMade: {$job.attemptsMade} Node: {$job.node}
    <ActionButton action={rerun}>Rerun</ActionButton>
    <ActionButton action={cancel}>Cancel</ActionButton>
    <Link href="/queue/{$queue.name}/job/{$job.id}/log">Log</Link>

    {#if $job}
      <ul>
        {#each $job.steps as step, i}
          <li>
            <Step {step} />
          </li>
        {/each}
      </ul>
    {:else}no jobs{/if}

  </div>
{/if}
