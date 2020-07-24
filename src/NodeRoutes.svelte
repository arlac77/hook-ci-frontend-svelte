<script>
  import { Route } from "svelte-guard-history-router";
  import { Node } from "./node.mjs";
  import NodesPage from "./pages/Nodes.svelte";
  import NodePage from "./pages/Node.svelte";

  export let guards;
</script>

<Route path="/node" component={NodesPage} {guards}>
  Nodes
  <Route
    path="/:node"
    propertyMapping={{ node: 'name' }}
    objectInstance={Node}
    component={NodePage} />
</Route>
