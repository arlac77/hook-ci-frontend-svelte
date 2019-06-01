<script>
  export let queue = { name: "", jobs: [] };
</script>


<div>
  <h1>Queue {queue.name}</h1>
   {queue.active} {queue.waiting} {queue.delayed} {queue.paused} {queue.completed}
  {queue.failed}
  <table class="table">
    <thead>
      <tr>
        <th>
          <abbr title="Id">Id</abbr>
        </th>
        <th>
          <abbr title="Started">S</abbr>
        </th>
      </tr>
    </thead>
    <tbody>
      <!--
    {#each queue.jobs as job (job.id)}
      <tr>
        <td>
          <Link path="/queue/{queue.name}/job/{job.id}">{job.id}</Link>
        </td>
        <td>
          {job.started}
        </td>
      </tr>
    {/each}
    -->
    </tbody>
  </table>

</div>
