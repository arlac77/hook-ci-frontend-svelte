<script>
  import { onDestroy } from "svelte";
  import { name, version, description, config } from "../../package.json";
  import { session } from "svelte-session-manager";

  let entitlements = [];

  onDestroy(
    session.subscribe(value => {
      entitlements = [...value.entitlements];
    })
  );
</script>

<div>
  <h3>{name}</h3>
  <p>{description}</p>
  <table class="is-bordered is-striped is-hoverable">
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
      <td>Usrname</td>
      <td>{$session.username}</td>
    </tr>
    {#each entitlements as name}
      <tr>
        <td>Entitlement</td>
        <td>{name}</td>
      </tr>
    {/each}
  </table>
</div>
