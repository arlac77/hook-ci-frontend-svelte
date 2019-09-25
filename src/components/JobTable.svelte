<script>
  import { Link } from "svelte-guard-history-router";
  import { formatSecondsSinceEpoch } from 'svelte-common';
  import RepositoryLink from "./RepositoryLink.svelte";
  
  export let queue = { name: "xxx" };
  export let jobs = [];
</script>

<div>
  <table class="bordered striped hoverable">
    <thead>
      <tr>
        <th aria-sort="none">Id</th>
        <th aria-sort="none">Processed</th>
        <th aria-sort="none">Finished</th>
        <th aria-sort="none">Node</th>
        <th aria-sort="none">Repository</th>
        <th aria-sort="none">Branch</th>
      </tr>
    </thead>
    <tbody>
      {#each jobs as job (job.id)}
        <tr>
          <td>
            <Link href="/queue/{queue.name}/job/{job.id}">{job.id}</Link>
          </td>
          <td>{formatSecondsSinceEpoch(job.processedOn)}</td>
          <td>{formatSecondsSinceEpoch(job.finishedOn)}</td>
          <td>{#if job.node}{job.node}{:else}-{/if}</td>
          <td>
            <RepositoryLink repository={job.repository} />
          </td>
          <td>{#if job.branch}{job.branch}{:else}-{/if}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
