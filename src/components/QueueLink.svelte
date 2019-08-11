<script>
  import { Link } from "svelte-guard-history-router";
  export let queue;
</script>

<Link href="/queue/{queue.name}">{queue.name}</Link>
