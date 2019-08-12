<script>
  import { Link } from "svelte-guard-history-router";
  import QueueLink from "../components/QueueLink.svelte";
  import { queues }  from "../store.mjs";

  export let context;
</script>

<div>
  <table class="is-bordered is-striped is-hoverable">
    <thead>
      <tr>
        <th>Name</th>
        <th>Active</th>
        <th>Waitng</th>
        <th>Delayed</th>
        <th>Paused</th>
        <th>Completed</th>
        <th>Failed</th>
      </tr>
    </thead>
    <tbody>
      {#each $queues as queue (queue.name)}
        <tr>
          <td>
            <QueueLink {queue}/>
          </td>
          <td>{queue.active}</td>
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
