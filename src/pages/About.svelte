<script>
  import { DateTime, About, SessionDetails } from "svelte-common";
  import { session } from "../main.mjs";

  import name from "consts:name";
  import version from "consts:version";
  import description from "consts:description";
  import graphQl from "consts:graphQl";
</script>

<About {name} {version} {description}>
  <tr />
  <tr>
    <td>Graphql API</td>
    <td>{graphQl}</td>
  </tr>
  <SessionDetails session={$session} />
</About>
