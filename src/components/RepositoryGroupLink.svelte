<script>
  import { Link } from "svelte-guard-history-router";
  import { tooltip } from "svelte-common";
  export let group;
</script>

<Link href="/group/{group.name}">
  <slot>
    <div use:tooltip={group.description}>{group.name}</div>
  </slot>
</Link>
