<script>
  import { Link } from "svelte-guard-history-router";
  export let jobs = [];
  export let queue = { name: "xxx" };

  const formatter = new Intl.DateTimeFormat("en", {
    hour12: false,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
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
      {#each jobs as job (job.id)}
        <tr>
          <td>
            <Link href="/queue/{queue.name}/job/{job.id}">{job.id}</Link>
          </td>
          <td>{formatter.format(new Date(job.processedOn))}</td>
          <td>
            <Link href="/repository/{job.repository.name}">
              {job.repository.name}
            </Link>
          </td>
          <td>{job.branch}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
