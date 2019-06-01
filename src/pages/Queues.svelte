<script>
  import { Link } from "svelte-way";
  import { queues } from "../stores.mjs";
</script>

<div>
  <table class="table is-bordered">
    <thead>
      <tr>
        <th><abbr title="Name">Name</abbr></th>
        <th><abbr title="Active">A</abbr></th>
        <th><abbr title="Waitng">W</abbr></th>
        <th><abbr title="Delayed">D</abbr></th>
        <th><abbr title="Paused">P</abbr></th>
        <th><abbr title="Completed">C</abbr></th>
        <th><abbr title="Failed">F</abbr></th>
      </tr>
    </thead>
    <tbody>
      {#each $queues as queue (queue.name)}
        <tr>
          <td>
            <Link path="/queue/{queue.name}">{queue.name}</Link>
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
