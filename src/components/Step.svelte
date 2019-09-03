<script>
  import NodeLink from "./NodeLink.svelte";
  import { dateFormatter } from "../util.mjs";
  export let step;
</script>

{#if step}
<div>
  <h3>{step.name}</h3>
  {step.executable}
  {#each step.args as a}{a}{/each}
  Started: {dateFormatter.format(new Date(step.started))}
  Ended: {dateFormatter.format(new Date(step.ended))}
  <NodeLink name={step.node}>{step.node}</NodeLink>

  <table>
    <thead>
      <th aria-sort="none">Executable</th>
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
{/if}