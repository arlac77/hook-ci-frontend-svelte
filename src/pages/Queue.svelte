<script>
  import RouterLink from "svelte-easyroute-rollup/RouterLink.svelte";
  import { queues } from "../stores.mjs";
  export let currentRoute;
  export let queue = { name: "", jobs: [] };

  $: queue = $queues.find(q => q.name === currentRoute.params.name);
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
  <table class="table is-bordered is-striped is-hoverable">
    <thead>
      <tr>
        <th>
          <abbr title="Id">Id</abbr>
        </th>
        <th>
          <abbr title="Started">S</abbr>
        </th>
      </tr>
    </thead>
    <tbody>

      {#each queue.jobs as job (job.id)}
        <tr>
          <td>
            <RouterLink to="/queue/{queue.name}/job/{job.id}" text={job.id} />
          </td>
          <td>{job.started}</td>
        </tr>
      {/each}

    </tbody>
  </table>

</div>
