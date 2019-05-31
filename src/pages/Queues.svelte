<script>
  import { Link } from "svelte-way";
  import { queues as squeues } from '../stores.mjs';

  export let queues = [{ name: "q1" }];

  squeues.subscribe(value => {
    queues = value;
  });

</script>

<div>
  <table>
    <thead>
      <tr><td>Name</td><td>Active</td><td>Waiting</td><td>Delayed</td><td>Paused</td><td>Completed</td><td>Failed</td></tr>
    </thead>
    <tbody>
    {#each queues as queue (queue.name)}
      <tr>
        <td>
          <Link path="/queue/{queue.name}">{queue.name}</Link>
        </td>
        <td>
          {queue.active}
        </td>
        <td>
          {queue.waiting}
        </td>
        <td>
          {queue.delayed}
        </td>
        <td>
          {queue.paused}
        </td>
        <td>
          {queue.completed}
        </td>
        <td>
          {queue.failed}
        </td>
      </tr>
    {/each}
    </tbody>
  </table>
</div>
