<script>
  import { Link } from "svelte-guard-history-router";
  import { tooltip } from "svelte-common";
  export let repository;

</script>

<Link href="/repository/{repository.name}">
  <slot>
    <div use:tooltip={repository.description}>{repository.name}</div>
  </slot>
</Link>
