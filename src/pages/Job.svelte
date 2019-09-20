<script>
  import { onDestroy } from "svelte";
  import { Link } from "svelte-guard-history-router";
  import Step from "../components/Step.svelte";
  import { queue, job } from "../main.mjs";

  export let state;
</script>

{#if $job}
  <div>
    <h3>Job {$job.id}</h3>
    AttemptsMade: {$job.attemptsMade} Node: {$job.node}
    <Link href="/queue/{$queue.name}/job/{$job.id}/log">Log</Link>

    <!--
  {#if $job}
  <ul>
    {#each $job.steps as step, i}
      <li>
        <Step {step} />
      </li>
    {/each}
  </ul>
  {/if}
  -->
  </div>
{/if}
