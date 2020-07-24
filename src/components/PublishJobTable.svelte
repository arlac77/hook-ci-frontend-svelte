<script>
  import { ObjectLink } from "svelte-guard-history-router";
  import { formatSecondsSinceEpoch } from "svelte-common";

  export let jobs = [];
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Id</th>
      <th aria-sort="none">Processed</th>
      <th aria-sort="none">Node</th>
      <th aria-sort="none">Artifact</th>
    </tr>
  </thead>
  <tbody>
    {#each jobs as job (job.id)}
      <tr>
        <td>
          <ObjectLink object={job} />
        </td>
        <td>{formatSecondsSinceEpoch(job.processedOn)}</td>
        <td>
          <ObjectLink object={job.node} />
        </td>
        <td>{job.artifact}</td>
      </tr>
    {/each}
  </tbody>
</table>
