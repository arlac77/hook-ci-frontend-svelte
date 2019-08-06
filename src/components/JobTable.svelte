<script>
  import Link from "./Link.svelte";
  export let jobs = [];
  export let queue= { name: 'xxx' };
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
      {#each jobs as job (job.id)}
        <tr>
          <td>
            <Link href="/queue/{queue.name}/job/{job.id}">{job.id}</Link>
          </td>
          <td>{job.processedOn}</td>
          <td><a href="/repository/{job.repository.name}">{job.repository.name}</a></td>
          <td>{job.branch}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>