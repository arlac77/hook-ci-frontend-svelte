<script>
  import { Link, Switch, Route, Redirect } from "svelte-way";
  import Queue from "./pages/Queue.svelte";

  export let name;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<ul>
  <li>
    <Link path="/">Index</Link>
  </li>
  <li>
    <Link path="/queue">Qeueue</Link>
  </li>
</ul>

<div>
  <Queue />
</div>

<h1>Hello {name}!</h1>

<Switch>
  <Route exact path="/">
    <h1>Home</h1>
  </Route>

  <Route exact path="/queue" let:params>
    <h1>User with id: #{params.id} -> {params.section}</h1>
  </Route>

  <Route>
    <h1>404</h1>
  </Route>
</Switch>
