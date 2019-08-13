<script>
  import { Link } from "svelte-guard-history-router";
  export let repository;
</script>

<Link href="/repository/{repository.name}">
  <slot>{repository.name}</slot>
</Link>
