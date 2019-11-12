<script>
  import { fade } from "svelte/transition";
  import { Collapse, formatSecondsSinceEpoch } from "svelte-common";
  import NodeLink from "./NodeLink.svelte";
  import Requirements from "./Requirements.svelte";
  export let step;
</script>

{#if step}
  <div>
    {#if step.ok}
      <abbr class="ok-hint" />
    {:else if step.ended}
      <abbr class="error-hint" />
    {:else}
      <abbr class="unknown-hint" />
    {/if}
    <h3>{step.name}</h3>
    {step.executable}
    {#each step.args as a}&#160;{a}{/each}
    {#if step.started}
      started: {formatSecondsSinceEpoch(step.started)}
      {#if step.ended}
        ended: {formatSecondsSinceEpoch(step.ended)} exit: {step.exitCode}
      {/if}
    {/if}
    <NodeLink node={step.node} />
    {#if step.requirements}
      <Collapse>
        Requirements
        <div slot="content" in:fade out:fade>
          <Requirements requirements={step.requirements} />
        </div>
      </Collapse>
    {/if}
  </div>
{/if}
