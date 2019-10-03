<script>
  import { formatDuration, ActionButton, formatBytes } from "svelte-common";
  import { node, session } from "../main.mjs";
  import { config } from "../../package.json";

  async function restart() {
    return fetch(`${config.api}/node/${$node.name}/restart`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }

  async function stop() {
    return fetch(`${config.api}/node/${$node.name}/stop`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }

  async function reload() {
    return fetch(`${config.api}/node/${$node.name}/reload`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }
</script>

{#if $node}
  <h3>Node {$node.name}</h3>
  {$node.version} {formatDuration($node.uptime)}
  {$node.isLocal ? 'LOCAL' : 'REMOTE'}
  rss: {formatBytes($node.memory.rss)}
  heapTotal: {formatBytes($node.memory.heapTotal)}
  heapUsed: {formatBytes($node.memory.heapUsed)}
  external: {formatBytes($node.memory.external)}
  
  {#if $node.uptime > 0}
    <abbr class="ok-hint" />
  {/if}

  <ActionButton action={restart}>Restart</ActionButton>
  <ActionButton action={stop}>Stop</ActionButton>
  <ActionButton action={reload}>Reload</ActionButton>
{:else}Not found{/if}
