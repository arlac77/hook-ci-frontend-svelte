<script>
  import * as style from "./main.css";
  import {
    Router,
    Route,
    Outlet,
    link,
    active
  } from "svelte-guard-history-router";
  import { Menue } from "svelte-common";
  import { router, session, needsSession } from "./main.mjs";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import Queues from "./pages/Queues.svelte";
  import Repositories from "./pages/Repositories.svelte";
  import RepositoryGroups from "./pages/RepositoryGroups.svelte";
  import Nodes from "./pages/Nodes.svelte";

  function logout() {
    session.invalidate();
  }
</script>

<Router {router}>
  <nav>
    <Route path="/" component={Home}>
      <img class="logo" src="logo.svg" alt="Hook CI" />
      Hook CI
    </Route>
    <ul class="left">
      <li>
        <Route path="/queue" guards={needsSession} component={Queues}>
          Queues
        </Route>
      </li>
      <li>
        <Route path="/group" guards={needsSession} component={RepositoryGroups}>
          Repository Groups
        </Route>
      </li>
      <li>
        <Route
          path="/repository"
          guards={needsSession}
          component={Repositories}>
          Repositories
        </Route>
      </li>
      <li>
        <Route path="/node" guards={needsSession} component={Nodes}>Nodes</Route>
      </li>
      <li>
        <Route path="/about" component={About}>About</Route>
      </li>
    </ul>
    <ul>
      <li>
        {#if $session.isValid}
          <Menue>
            <div slot="title" class="dropdown-trigger">{$session.username}</div>
            <div slot="content" class="dropdown-menu dropdown-menu-sw">
              <a
                href="/"
                class="dropdown-item"
                on:click|preventDefault={logout}>
                Logout {$session.username}
              </a>
              <div class="dropdown-divider" />
              <a href="#!" class="dropdown-item">three</a>
            </div>
          </Menue>
        {:else}
          <Route path="/login" component={Login}>Login</Route>
        {/if}
      </li>
    </ul>
  </nav>
  <main>
    <Outlet />
  </main>
</Router>
