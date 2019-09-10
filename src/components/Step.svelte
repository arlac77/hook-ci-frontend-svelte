<script>
  import NodeLink from "./NodeLink.svelte";
  import { formatSecondsSinceEpoch } from "../util.mjs";
  export let step;
</script>

{#if step}
<div>
  <h3>{step.name}</h3>
  {step.executable}
  {#each step.args as a}{a}{/each}
  Started: {formatSecondsSinceEpoch(step.started)}
  Ended: {formatSecondsSinceEpoch(step.ended)}
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