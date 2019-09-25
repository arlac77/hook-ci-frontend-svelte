<script>
  import { Link } from "svelte-guard-history-router";
  import { tooltip } from "svelte-common";
  export let repository;

</script>

{#if repository}
<Link href="/repository/{repository.name}">
  <slot>
    <div use:tooltip={repository.description}>{repository.name}</div>
  </slot>
</Link>
{/if}
