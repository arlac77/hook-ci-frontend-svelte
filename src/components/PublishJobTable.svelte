<script>
  import { Link } from "svelte-guard-history-router";
  import { formatSecondsSinceEpoch } from "svelte-common";
  import RepositoryLink from "./RepositoryLink.svelte";
  import NodeLink from "./NodeLink.svelte";

  export let queue = {};
  export let jobs = [];
</script>

<div>
  <table class="bordered striped hoverable">
    <thead>
      <tr>
        <th aria-sort="none">Id</th>
        <th aria-sort="none">Artifact</th>
      </tr>
    </thead>
    <tbody>
      {#each jobs as job (job.id)}
        <tr>
          <td>
            <Link href="/queue/{queue.name}/job/{job.id}">{job.id}</Link>
          </td>
          <td>
            {job.artifact}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
