<script>
  import { name, version, description, base, api } from "../../package.json";
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
      <td>{base}</td>
    </tr>
    <tr>
      <td>API</td>
      <td>{api}</td>
    </tr>
  </table>
</div>
