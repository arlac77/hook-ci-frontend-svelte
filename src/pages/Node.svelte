<script>
  import { Duration, ActionButton, formatBytes } from "svelte-common";
  import KeyValues from "../components/KeyValues.svelte";
  import { session } from "../main.mjs";
  import api from "consts:api";

  export let router;

  const route = router.route;

  async function postNode(suffix) {
    return fetch(`${api}/node/${$route.name}/${suffix}`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }
</script>

{#if $route}
  <h3>Node {$route.name}</h3>
  {$route.version}
  <Duration seconds={$route.uptime} />
  {$route.isLocal ? 'LOCAL' : 'REMOTE'}
  {#if $route.uptime > 0}
    <abbr class="ok-hint" />
    <ul>
      <li>rss: {formatBytes($route.memory.rss)}</li>
      <li>heapTotal: {formatBytes($route.memory.heapTotal)}</li>
      <li>heapUsed: {formatBytes($route.memory.heapUsed)}</li>
      <li>external: {formatBytes($route.memory.external)}</li>
    </ul>
    <KeyValues object={$route.env} />
  {:else}
    <abbr class="error-hint" />
  {/if}

  <ActionButton action={() => postNode('restart')}>Restart</ActionButton>
  <ActionButton action={() => postNode('stop')}>Stop</ActionButton>
  <ActionButton action={() => postNode('reload')}>Reload</ActionButton>
{:else}Not found{/if}
