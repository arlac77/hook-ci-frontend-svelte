<script>
  import { formatDuration, ActionButton, formatBytes } from "svelte-common";
  import KeyValues from "../components/KeyValues.svelte";

  import { node, session } from "../main.mjs";
  import api from 'consts:api';

  async function postNode(suffix) {
    return fetch(`${api}/node/${$node.name}/${suffix}`, {
      method: "POST",
      headers: session.authorizationHeader
    });
  }
</script>

{#if $node}
  <h3>Node {$node.name}</h3>
  {$node.version} {formatDuration($node.uptime)}
  {$node.isLocal ? 'LOCAL' : 'REMOTE'}
  {#if $node.uptime > 0}
    <abbr class="ok-hint" />
    <ul>
      <li>rss: {formatBytes($node.memory.rss)}</li>
      <li>heapTotal: {formatBytes($node.memory.heapTotal)}</li>
      <li>heapUsed: {formatBytes($node.memory.heapUsed)}</li>
      <li>external: {formatBytes($node.memory.external)}</li>
    </ul>
    <KeyValues object={$node.env}/>
  {:else}
    <abbr class="error-hint"/>
  {/if}

  <ActionButton action={()=>postNode('restart')}>Restart</ActionButton>
  <ActionButton action={()=>postNode('stop')}>Stop</ActionButton>
  <ActionButton action={()=>postNode('reload')}>Reload</ActionButton>
{:else}Not found{/if}
