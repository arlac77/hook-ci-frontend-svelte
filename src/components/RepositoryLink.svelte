<script>
  import { Link } from "svelte-guard-history-router";
  import { tooltip } from "svelte-common";
  export let repository;
</script>

{#if repository}
<Link href="/repository/{repository.fullName}">
  <slot>
    <div use:tooltip={repository.description}>{repository.fullName}</div>
  </slot>
</Link>
{/if}
