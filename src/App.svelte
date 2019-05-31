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

    background-color: #fff;
    color: #444;

    grid-gap: 1em;
    grid-template-areas:
      "header"
      "sidebar"
      "content"
      "footer";
  }

  .header {
    grid-area: header;
    grid-column: span 12;
  }
  .menu {
    grid-column: span 4;
  }
  .sidebar {
    grid-area: sidebar;
  }
  .content {
    grid-area: content;
    grid-column: span 8;
  }
  .footer {
    grid-area: footer;
    grid-column: span 12;
  }

  @media only screen and (min-width: 500px) {
    .wrapper {
      grid-template-columns: 20% auto;
      grid-template-areas:
        "header   header"
        "sidebar  content"
        "sidebar2 sidebar2"
        "footer   footer";
    }
  }

  @media only screen and (min-width: 600px) {
    .wrapper {
      grid-gap: 20px;
      grid-template-columns: 120px auto 120px;
      grid-template-areas:
        "header  header  header"
        "sidebar content sidebar2"
        "footer  footer  footer";
      max-width: 600px;
    }
  }
</style>

<div class="wrapper">
  <div class="header">
    <div class="menu">
      <ul>
        <li>
          <Link path="/">Home</Link>
        </li>
        <li>
          <Link path="/queues">Queues</Link>
        </li>
      </ul>
    </div>
  </div>
  <div class="content">
    <Switch>
      <Route exact path="/">
        <h1>Home</h1>
      </Route>

      <Route exact path="/queues" let:params>
        <Queues />
      </Route>
      <Route exact path="/queue/:name" let:params>
        <Queue queue={params.name} />
      </Route>

      <Route>
        <h1>404</h1>
      </Route>
    </Switch>
  </div>
  <div class="footer" />
</div>
