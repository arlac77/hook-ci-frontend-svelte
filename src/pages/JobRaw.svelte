<script>
  import { job } from "../main.mjs";
</script>

{#if $job}
<div class="log">{JSON.stringify($job,undefined,2)}</div>
{/if}
