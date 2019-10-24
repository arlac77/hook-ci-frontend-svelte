<script>
  import { onDestroy } from "svelte";
  import { Link } from "svelte-guard-history-router";
  import { ActionButton } from "svelte-common";
  import NodeLink from "../components/NodeLink.svelte";
  import Step from "../components/Step.svelte";
  import { queue, session, job, jobs, router } from "../main.mjs";
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

    return next();
  }

  function findNext(list, id) {
    let i = Number.MAX_SAFE_INTEGER;

    list.forEach(o => {
      if (o.id < i && o.id > id) {
        i = o.id;
      }
    });

    return i;
  }

  function findPrevious(list, id) {
    let i = 0;

    list.forEach(o => {
      if (o.id > i && o.id < id) {
        i = o.id;
      }
    });

    return i;
  }

  async function next() {
    const id = findNext($jobs, parseInt(router.keys.job.value));
    if (id < Number.MAX_SAFE_INTEGER) {
      return router.push(`/queue/${$queue.name}/job/${id}`);
    }
  }

  async function previous() {
    const id = findPrevious($jobs, parseInt(router.keys.job.value));
    if (id > 0) {
      return router.push(`/queue/${$queue.name}/job/${id}`);
    }
  }

  async function all() {
    return router.push(`/queue/${$queue.name}`);
  }
</script>

<ActionButton action={next}>Next</ActionButton>
<ActionButton action={previous}>Previous</ActionButton>
<ActionButton action={all}>All</ActionButton>

{#if $job}
  <div>
    <h3>Job {$job.id}</h3>
    AttemptsMade: {$job.attemptsMade}
    <NodeLink node={$job.node} />
    <ActionButton action={() => jobAction('rerun')}>Rerun</ActionButton>
    <ActionButton action={() => jobAction('cancel')}>Cancel</ActionButton>
    <Link href="/queue/{$queue.name}/job/{$job.id}/log">Log</Link>

    {#if $job.steps}
      <ul>
        {#each $job.steps as step, i}
          <li>
            <Step {step} />
          </li>
        {/each}
      </ul>
    {:else}no steps{/if}
  </div>
{/if}
