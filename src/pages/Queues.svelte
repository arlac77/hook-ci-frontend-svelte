<script>
  import { Link } from "svelte-guard-history-router";
  import QueueLink from "../components/QueueLink.svelte";
  import { queues }  from "../store.mjs";

  export let context;
</script>

<div>
  <table class="bordered striped shoverable">
    <thead>
      <tr>
        <th class="sorted">Name</th>
        <th class="sorted">Active</th>
        <th class="sorted">Waiting</th>
        <th class="sorted">Delayed</th>
        <th class="sorted">Paused</th>
        <th class="sorted">Completed</th>
        <th class="sorted">Failed</th>
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
