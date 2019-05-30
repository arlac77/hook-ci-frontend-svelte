<script>
  import { Link } from "svelte-way";

  async function getQueues() {
    const data = await fetch("api/queues");
    queues = await data.json();
  }

  getQueues();
  export let queues = [{ name: "q1" }, { name: "q2" }];
</script>

<div>
  <h1>Queues</h1>
  <table>
    {#each queues as queue (queue.name)}
      <tr>
        <td>
          <Link path="/queue/{queue.name}">{queue.name}</Link>
        </td>
      </tr>
    {/each}
  </table>
</div>
