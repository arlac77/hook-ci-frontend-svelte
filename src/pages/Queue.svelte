<script>
  import Link from "../components/Link.svelte";
  import JobTable from "../components/JobTable.svelte";
  export let context;

  let queue = { name: "", jobs: [] };
  let jobs = [];

  context.subscribe(value => {
    queue = value.queues.find(q => q.name === value.params.queue);
    jobs = value.jobs;
  });
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
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
  </div>
  <JobTable {queue} {jobs}/>
</div>
