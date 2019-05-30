<script>
  import { Link, Switch, Route, Redirect } from "svelte-way";
  import Queue from "./pages/Queue.svelte";
  import Queues from "./pages/Queues.svelte";
</script>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 40px 100px 40px;
  }

  .header {
    grid-column: span 12;
  }
  .menu {
    grid-column: span 4;
  }
  .content {
    grid-column: span 8;
  }
  .footer {
    grid-column: span 12;
  }
</style>

<div class="wrapper">
  <div class="header" />
  <div class="menu">
    <ul>
      <li>
        <Link path="/">Index</Link>
      </li>
      <li>
        <Link path="/queues">Queues</Link>
      </li>
      <li>
        <Link path="/queue/q1">Queue q1</Link>
      </li>
      <li>
        <Link path="/queue/q2">Queue q2</Link>
      </li>
    </ul>
  </div>
  <div class="content">
    <Switch>
      <Route exact path="/">
        <h1>Home</h1>
      </Route>

      <Route exact path="/queues" let:params>
        <Queues/>
      </Route>
      <Route exact path="/queue/:name" let:params>
        <Queue name={params.name} />
      </Route>

      <Route>
        <h1>404</h1>
      </Route>
    </Switch>
  </div>
  <div class="footer" />
</div>
