<script>
  import { Link } from "svelte-guard-history-router";
  import { tooltip } from "svelte-common";
  export let repositoryGroup;
</script>

<Link href="/group/{repositoryGroup.name}">
  <slot>
    <div use:tooltip={repositoryGroup.description}>{repositoryGroup.name}</div>
  </slot>
</Link>
