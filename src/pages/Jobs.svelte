<script>
  import Link from "../components/Link.svelte";
  import { queues } from "../stores.mjs";
  export let currentRoute;
  export let queue = { name: "", jobs: [] };

  $: queue = $queues.find(q => q.name === currentRoute.params.name);
</script>

<div>
  <table class="table is-bordered is-striped is-hoverable">
    <thead>
      <tr>
        <th>Id</th>
        <th>Processed On</th>
        <th>Repository</th>
        <th>Branch</th>
      </tr>
    </thead>
    <tbody>
      {#each queue.jobs as job (job.id)}
        <tr>
          <td>
            <Link to="/queue/{currentRoute.params.queue}/job/{job.id}">
              {job.id}
            </Link>
          </td>
          <td>{job.id}</td>
          <td>{job.processedOn}</td>
          <td>{job.repository}</td>
          <td>{job.branch}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
