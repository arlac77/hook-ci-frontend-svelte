<script>
  import { Link, Switch, Route, Redirect } from "svelte-way";
  import Queue from "./pages/Queue.svelte";
  import Queues from "./pages/Queues.svelte";

  import { queues } from "./stores.mjs";
</script>

<style>
  @import "../node_modules//bulma/css/bulma.css";

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


  @media only screen and (min-width: 500px) {
    .wrapper {
      grid-template-columns: 20% auto;
      grid-template-areas:
        "header   header"
        "sidebar  content";
    }
  }

  @media only screen and (min-width: 600px) {
    .wrapper {
      grid-gap: 20px;
      grid-template-columns: 120px auto 120px;
      grid-template-areas:
        "header  header  header"
        "sidebar content";
      max-width: 600px;
    }
  }
</style>

<div class="wrapper">
  <nav
    class="header navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation">
    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <Link path="/">Home</Link>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <Link path="/queues">Queues</Link>
        </div>
      </div>
    </div>
  </nav>
  <div class="sidebar" />
  <div class="content">
    <Switch>
      <Route exact path="/">
        <h1>Home</h1>
      </Route>

      <Route exact path="/queues" let:params>
        <Queues />
      </Route>
      <Route exact path="/queue/:name" let:params>
        <Queue name={params.name} />
      </Route>

      <Route>
        <h1>404</h1>
      </Route>
    </Switch>
  </div>
</div>
