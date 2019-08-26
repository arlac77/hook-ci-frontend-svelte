<script>
  import { Link } from "svelte-guard-history-router";
  import JobTable from "../components/JobTable.svelte";
  import { queue, jobs } from "../main.mjs";
  export let context;
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
          {$queue.paused}
          <br />
          {$queue.completed}
          <br />
          {$queue.failed}
        </div>
      </div>
    </div>
    <JobTable queue={$queue} jobs={$jobs}/>
  {:else}No such queue{/if}
</div>
