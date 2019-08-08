<script>
  import { Link } from "svelte-guard-history-router";
  export let name;
</script>

<Link href="/node/{name}">
  <slot />
</Link>
