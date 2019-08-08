<script>
  import NodeLink from "./NodeLink.svelte";

  export let step;
</script>

<div>
  <h3>{step.name}</h3>
  {step.executable}
  {#each step.args as a}{a}{/each}
  {step.started}
  {step.ended}
  <NodeLink name={step.node}>{step.node}</NodeLink>
</div>
