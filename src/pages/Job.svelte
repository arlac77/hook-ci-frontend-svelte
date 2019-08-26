<script>
  import { onDestroy } from "svelte";
  import { Link } from "svelte-guard-history-router";
  import Step from "../components/Step.svelte";
  import { queue, job } from "../main.mjs";

  export let context;

</script>

<div>
  <h3>{$job.id}</h3>
  AttemptsMade: {$job.attemptsMade}
  <Link href="/queue/{$queue.name}/job/{$job.id}/log">Log</Link>

<!--
  <ul>
    {#each $job.steps as step, i}
      <li>
        <Step {step} />
      </li>
    {/each}
  </ul>
  -->
</div>
