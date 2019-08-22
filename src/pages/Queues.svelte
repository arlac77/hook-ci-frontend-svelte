<script>
  import { Link } from "svelte-guard-history-router";
  import QueueLink from "../components/QueueLink.svelte";
  import { queues }  from "../store.mjs";

  export let context;
</script>

<div>
  <table class="bordered striped hoverable">
    <thead>
      <tr>
        <th class="sortable">Name</th>
        <th class="sortable">Active</th>
        <th class="sortable">Waiting</th>
        <th class="sortable">Delayed</th>
        <th class="sortable">Paused</th>
        <th class="sortable">Completed</th>
        <th class="sortable">Failed</th>
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
