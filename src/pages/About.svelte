<script>
  import { name, version, description, config } from "../../package.json";
  import { session } from "../main.mjs";

  const dateFormatter = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });
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
        <td>{config.urlPrefix}</td>
      </tr>
      <tr>
        <td>API</td>
        <td>{config.api}</td>
      </tr>
      <tr>
        <td>Graphql API</td>
        <td>{config.graphQl}</td>
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
