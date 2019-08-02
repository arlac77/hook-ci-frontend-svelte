<script>
  import { name, version, description, config } from "../../package.json";
  import { entitlements } from "../auth.mjs";
</script>

<div>
  <h3>{name}</h3>
  <p>{description}</p>
  <table class="table is-bordered is-striped is-hoverable">
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

    {#each [...entitlements] as name}
      <tr>
        <td>Entitlement</td>
        <td>{name}</td>
      </tr>
    {/each}
  </table>
</div>
