<script>
  import {
    Route,
    MasterRoute,
    DetailRoute
  } from "svelte-guard-history-router";
  import QueuesPage from "./pages/Queues.svelte";
  import QueuePage from "./pages/Queue.svelte";
  import QueueLink from "./components/QueueLink.svelte";
  import { Queue } from "./queue.mjs";

  import api from "consts:api";

  export let guards;
  export let session;

  async function* queueIterator(transition, properties) {
    const response = await fetch(api + "/queues", {
      headers: session.authorizationHeader
    });
    for (const queue of await response.json()) {
      yield new Queue(queue);
    }
  }
</script>

<Route
  path="/queue"
  factory={MasterRoute}
  component={QueuesPage}
  iteratorFor={queueIterator}
  objectInstance={Queue}
  {guards}>
  <slot />
  <Route
    path="/:queue"
    propertyMapping={{ queue: 'name' }}
    factory={DetailRoute}
    linkComponent={QueueLink}
    component={QueuePage}>

    <slot name="queue" />

    <Route path="/active" component={QueuePage} />
    <Route path="/waiting" component={QueuePage} />
    <Route path="/delayed" component={QueuePage} />
    <Route path="/failed" component={QueuePage} />
    <Route path="/completed" component={QueuePage} />
    <Route path="/paused" component={QueuePage} />
  </Route>
</Route>
