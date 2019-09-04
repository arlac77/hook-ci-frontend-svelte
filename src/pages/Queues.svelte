<script>
  import { Link } from "svelte-guard-history-router";
  import QueueLink from "../components/QueueLink.svelte";
  import { queues }  from "../main.mjs";

  export let state;
</script>

<div>
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
      {#each $queues as queue (queue.name)}
        <tr>
          <td>
            <QueueLink {queue}/>
          </td>
          <td><QueueLink {queue} state={'active'}>{queue.active}</QueueLink></td>
          <td>{queue.waiting}</td>
          <td>{queue.delayed}</td>
          <td>{queue.paused}</td>
          <td>{queue.completed}</td>
          <td>{queue.failed}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
