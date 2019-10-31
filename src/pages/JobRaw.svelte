<script>
  import { job } from "../main.mjs";

  export let state;
</script>

{#if $job}
<div class="log">{JSON.stringify($job,undefined,2)}</div>
{/if}
