<script>
  import { Link } from "svelte-guard-history-router";
  //import { RepositoryLink } from "./RepositoryLink.svelte";
  export let jobs = [];
  export let queue = { name: "xxx" };

  const formatter = new Intl.DateTimeFormat("en");
</script>

<div>
  <table class="table is-bordered is-striped is-hoverable">
    <thead>
      <tr>
        <th>Id</th>
        <th>Processed</th>
        <th>Finished</th>
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
          <td>{formatter.format(new Date(job.finishedOn))}</td>
          <td>
    <!--        <RepositoryLink repository={job.repository} /> -->
          </td>
          <td>{job.branch}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
