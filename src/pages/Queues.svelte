<script>
  import { queues } from "../stores.mjs";

  export let req;
  export let nav;
</script>

<style>
</style>

<div>
  <table class="table is-bordered is-striped is-hoverable">
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
            <a href="/queue/{queue.name}" on:click={() => nav.navigate(`/queue/${queue.name}`)}>
              {queue.name}
            </a>
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
