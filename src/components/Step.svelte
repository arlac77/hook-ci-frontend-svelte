<script>
  import { formatSecondsSinceEpoch } from "svelte-common";
  import NodeLink from "./NodeLink.svelte";
  export let step;
</script>

{#if step}
<div>
  <h3>{step.name}</h3>
  {step.executable}
  {#each step.args as a}{a}{/each}
  Started: {formatSecondsSinceEpoch(step.started)}
  Ended: {formatSecondsSinceEpoch(step.ended)}
  <NodeLink node={step.node}/>

  {#if step.requirements}
  <table>
    <thead>
      <th aria-sort="none">Executable</th>
      <th>Version</th>
    </thead>
    <tbody>
      {#each step.requirements as r}
        <tr>
          <td>{r.executable}</td>
          <td>{r.version}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  {/if}
</div>
{/if}