<script>
  import { ObjectLink } from "svelte-guard-history-router";

  export let router;

  const route = router.route;
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Name</th>
      <th aria-sort="none">Active</th>
      <th aria-sort="none">Waiting</th>
      <th aria-sort="none">Delayed</th>
      <th aria-sort="none">Paused</th>
      <th aria-sort="none">Completed</th>
      <th aria-sort="none">Failed</th>
    </tr>
  </thead>
  <tbody>
    {#each $route as queue (queue.name)}
      <tr>
        <td>
          <ObjectLink object={queue} />
        </td>
        <td>
          <ObjectLink object={queue} suffix="/active" />
        </td>
        <td>
          <ObjectLink object={queue} suffix="/waiting" />
        </td>
        <td>
          <ObjectLink object={queue} suffix="/delayed" />
        </td>
        <td>
          <ObjectLink object={queue} suffix="/paused" />
        </td>
        <td>
          <ObjectLink object={queue} suffix="/completed" />
        </td>
        <td>
          <ObjectLink object={queue} suffix="/failed" />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
