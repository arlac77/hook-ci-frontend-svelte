<script>
  import { Link } from "svelte-guard-history-router";
  import { tooltip } from "svelte-common";
  export let repository;
</script>

{#if repository}
<Link href="/group/{repository.owner.name}/{repository.name}">
  <slot>
    <div use:tooltip={repository.description}>{repository.fullName}</div>
  </slot>
</Link>
{/if}
