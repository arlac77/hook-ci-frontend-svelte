<script>
  import { Link } from "svelte-way";

  export let queues = [{ id: "q1" }, { id: "q2" }];
</script>

<div>
  <h1>Queues</h1>
  <table>
    {#each queues as queue (queue.id)}
      <tr>
        <td>
          <Link path="/queue/{queue.id}">Queue {queue.id}</Link>
        </td>
      </tr>
    {/each}
  </table>
</div>
