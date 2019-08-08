<script>
  import { onDestroy } from "svelte";
  import { Link } from "svelte-guard-history-router";
  import Step from "../components/Step.svelte";

  export let context;

  let job, queue;

  onDestroy(
    context.subscribe(value => {
      const id = value.params.job;
      queue = value.params.queue;
      job = value.jobs ? value.jobs.find(j => j.id == id) : { id, steps: [] };
    })
  );
</script>

<div>
  <h3>{job.id}</h3>
  AttemptsMade: {job.attemptsMade}
  <Link href="/queue/{queue}/job/{job.id}/log">Log</Link>

  <ul>
    {#each job.steps as step, i}
      <li>
        <Step {step} />
      </li>
    {/each}
  </ul>
</div>
