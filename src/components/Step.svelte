<script>
  import { formatSecondsSinceEpoch } from "svelte-common";
  import NodeLink from "./NodeLink.svelte";
  import Requirements from "./Requirements.svelte";
  export let step;
</script>

{#if step}
  <div>
    <h3>{step.name}</h3>
    {step.executable}&#160;
    {#each step.args as a}{a}{/each}
    started: {formatSecondsSinceEpoch(step.started)}
    {#if step.ended}
      ended: {formatSecondsSinceEpoch(step.ended)} exit: {step.exitCode}
      {#if step.ok}
        <abbr class="ok-hint" />
      {:else}
        <abbr class="error-hint" />
      {/if}
    {:else}
      <abbr class="unknown-hint" />
    {/if}
    <NodeLink node={step.node} />
    {#if step.requirements}
      <Requirements requirements={step.requirements} />
    {/if}
  </div>
{/if}
