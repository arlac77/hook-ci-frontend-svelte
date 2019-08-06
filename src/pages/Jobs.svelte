<script>
  import Link from "../components/Link.svelte";
  import { queues } from "../stores.mjs";
  export let queue = { name: "", jobs: [] };

  export let context;

  context.subscribe(value => {
    queue = $queues.find(q => q.name === value.params.queue);
  });
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
            <Link href="/queue/{queue.name}/job/{job.id}">{job.id}</Link>
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
