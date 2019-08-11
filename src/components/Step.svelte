<script>
  import NodeLink from "./NodeLink.svelte";

  export let step;

  const formatter = new Intl.DateTimeFormat("en");
</script>

<div>
  <h3>{step.name}</h3>
  {step.executable}
  {#each step.args as a}{a}{/each}
  {formatter.format(new Date(step.started))}
  {formatter.format(new Date(step.ended))}
  <NodeLink name={step.node}>{step.node}</NodeLink>

  <table>
    <thead>
      <th>Executable</th>
      <th>Version</th>
    </thead>
    <tbody>
      {#each step.requirements as r}
        <tr>
          <td>{r.name}</td>
          <td>{r.version}</td>
        </tr>
      {/each}
    </tbody>
  </table>

</div>
