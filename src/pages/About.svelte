<script>
  import { dateFormatter } from "svelte-common";
  import { session } from "../main.mjs";

  import name from 'consts:name';
  import version from 'consts:version';
  import description from 'consts:description';
  import base from 'consts:base';
  import api from 'consts:api';
  import graphQl from 'consts:graphQl';

</script>

<div>
  <h2>{name}</h2>
  <p>{description}</p>
  <table class="bordered striped hoverable">
    <tbody>
      <tr>
        <td>Version</td>
        <td>{version}</td>
      </tr>
      <tr>
        <td>Mounted</td>
        <td>{base}</td>
      </tr>
      <tr>
        <td>API</td>
        <td>{api}</td>
      </tr>
      <tr>
        <td>Graphql API</td>
        <td>{graphQl}</td>
      </tr>
      <tr>
        <td>Username</td>
        <td>{$session.username}</td>
      </tr>
      <tr>
        <td>Session Expiration</td>
        <td class={$session.isValid ? 'ok' : 'error'}>
          {dateFormatter.format($session.expirationDate)}
        </td>
      </tr>
      <tr>
        <td>Entitlements</td>
        <td>
          {#each [...$session.entitlements].sort() as name}
            <div>{name}</div>
          {/each}
        </td>
      </tr>
    </tbody>
  </table>
</div>
