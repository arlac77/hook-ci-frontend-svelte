<script>
  import { onDestroy } from "svelte";
  import { Link } from "svelte-guard-history-router";
  import { ActionButton } from "svelte-common";
  import NodeLink from "../components/NodeLink.svelte";
  import Step from "../components/Step.svelte";
  import { queue, session, job, router } from "../main.mjs";
  import { config } from "../../package.json";

  export let state;

  async function jobAction(suffix) {
    const response = await fetch(
      `${config.api}/queue/${$queue.name}/job/${$job.id}/${suffix}`,
      {
        method: "POST",
        headers: session.authorizationHeader
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async function next() {
    const id = parseInt(router.keys.job.value) + 1;
    router.push(`/queue/${$queue.name}/job/${id}`);
  }

  async function previous() {
    const id = parseInt(router.keys.job.value) - 1;
    if (id > 0) {
      router.push(`/queue/${$queue.name}/job/${id}`);
    }
  }
</script>

<ActionButton action={next}>Next</ActionButton>
<ActionButton action={previous}>Previous</ActionButton>

{#if $job}
  <div>
    <h3>Job {$job.id}</h3>
    AttemptsMade: {$job.attemptsMade}
    <NodeLink node={$job.node} />
    <ActionButton action={() => jobAction('rerun')}>Rerun</ActionButton>
    <ActionButton action={() => jobAction('cancel')}>Cancel</ActionButton>
    <Link href="/queue/{$queue.name}/job/{$job.id}/log">Log</Link>

    {#if $job && $job.steps}
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
