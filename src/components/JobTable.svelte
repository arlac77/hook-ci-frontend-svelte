<script>
  import { Link } from "svelte-guard-history-router";
  import { dateFormatter } from '../util.mjs';

  import RepositoryLink from "./RepositoryLink.svelte";
  export let jobs = [];
  export let queue = { name: "xxx" };
</script>

<div>
  <table class="bordered striped hoverable">
    <thead>
      <tr>
        <th class="sorted">Id</th>
        <th class="sorted">Processed</th>
        <th class="sorted">Finished</th>
        <th class="sorted">Repository</th>
        <th class="sorted">Branch</th>
      </tr>
    </thead>
    <tbody>
      {#each jobs as job (job.id)}
        <tr>
          <td>
            <Link href="/queue/{queue.name}/job/{job.id}">{job.id}</Link>
          </td>
          <td>{dateFormatter.format(new Date(job.processedOn))}</td>
          <td>{dateFormatter.format(new Date(job.finishedOn))}</td>
          <td>
            <RepositoryLink repository={job.repository} />
          </td>
          <td>{job.branch}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
