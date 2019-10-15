<script>
  export let requirements;
</script>

<table>
  <thead>
    <th aria-sort="none">Executable</th>
    <th>Version</th>
  </thead>
  <tbody>
    {#each requirements as r}
      <tr>
        <td>{r.executable}</td>
        <td>{r.version}</td>
      </tr>
    {/each}
  </tbody>
</table>
