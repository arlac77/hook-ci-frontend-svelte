<script>
  import { Link } from "svelte-guard-history-router";
  export let repositoryGroup;
</script>

<Link href="/group/{repositoryGroup.name}">
  <slot>
    <div aria-label={repositoryGroup.description} data-microtip-position="up" role="tooltip">{repositoryGroup.name}</div>
  </slot>
</Link>
