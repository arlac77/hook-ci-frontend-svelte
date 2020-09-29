<script>
  import { About, ApplicationDetails, SessionDetails } from "svelte-common";
  import { session } from "../main.mjs";

  import name from "consts:name";
  import version from "consts:version";
  import description from "consts:description";
  import graphQl from "consts:graphQl";
</script>

<About>
  <ApplicationDetails {name} {version} {description} />
  <tr>
    <td>Graphql API</td>
    <td colspan="2">{graphQl}</td>
  </tr>
  <SessionDetails session={$session} />
</About>
