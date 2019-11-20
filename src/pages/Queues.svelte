<script>
  import QueueLink from "../components/QueueLink.svelte";
  import { queues }  from "../main.mjs";
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
          <td><QueueLink {queue} state={'waiting'}>{queue.waiting}</QueueLink></td>
          <td><QueueLink {queue} state={'delayed'}>{queue.delayed}</QueueLink></td>
          <td><QueueLink {queue} state={'paused'}>{queue.paused}</QueueLink></td>
          <td><QueueLink {queue} state={'completed'}>{queue.completed}</QueueLink></td>
          <td><QueueLink {queue} state={'failed'}>{queue.failed}</QueueLink></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
