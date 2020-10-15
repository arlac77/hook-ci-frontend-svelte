<script>
  import {
    About,
    ApplicationDetails,
    SessionDetails,
    ServiceWorkerDetails,
    ServiceWorkerRegistrationDetails
  } from "svelte-common";
  import {
    session,
    serviceWorker,
    serviceWorkerRegistration
  } from "../main.mjs";

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
  <ServiceWorkerDetails serviceWorker={$serviceWorker} />
  <ServiceWorkerRegistrationDetails
    serviceWorkerRegistration={$serviceWorkerRegistration} />
</About>
