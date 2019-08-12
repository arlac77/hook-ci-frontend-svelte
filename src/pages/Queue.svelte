<script>
  import { onDestroy } from "svelte";
  import { Link } from "svelte-guard-history-router";
  import JobTable from "../components/JobTable.svelte";
  import { queues }  from "../store.mjs";
  export let context;

  const jobs = [];

  let queue = { name: "", jobs: [] };

  const queueKey = context.keys.get('queue');

  $: queue = $queues.find(q => q.name === $queueKey);

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
