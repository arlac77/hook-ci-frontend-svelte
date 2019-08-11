<script>
  import { onDestroy } from "svelte";
  import { Link } from "svelte-guard-history-router";
  import JobTable from "../components/JobTable.svelte";
  export let context;

  let queue = { name: "", jobs: [] };
  let jobs = [];

  onDestroy(
    context.subscribe(value => {
      if (value) {
        if (value.queues) {
          queue = value.queues.find(q => q.name === value.params.queue);
        }
        jobs = value.jobs;
      }
    })
  );
</script>

<div>
  <div class="card">
    <div class="card-content">
      <div class="content">
        {queue.name}
        <br />
        {queue.active}
        <br />
        {queue.waiting}
        <br />
        {queue.delayed}
        <br />
        {queue.paused}
        <br />
        {queue.completed}
        <br />
        {queue.failed}
      </div>
    </div>
  </div>
  <JobTable {queue} {jobs} />
</div>
