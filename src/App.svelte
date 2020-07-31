<script>
  import * as style from "./main.css";
  import {
    Router,
    Route,
    Outlet,
    redirectGuard
  } from "svelte-guard-history-router";
  import { Menue } from "svelte-common";
  import { session } from "./main.mjs";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import base from "consts:base";

  import NodeRoutes from "./NodeRoutes.svelte";
  import QueueRoutes from "./QueueRoutes.svelte";
  import JobRoutes from "./JobRoutes.svelte";

  const enshureSession = redirectGuard("/login", () => !session.isValid);
</script>

<Router {base}>
  <nav>
    <Route href="/" path="*" component={Home}>
      <img class="logo" src="logo.svg" alt="Hook CI" />
      Hook CI
    </Route>
    <ul class="left">
      <li>
        <QueueRoutes guards={enshureSession} {session}>
          Queues
          <div slot="queue">
            <JobRoutes />
          </div>
        </QueueRoutes>
      </li>
      <li>
        <NodeRoutes guards={enshureSession}>Nodes</NodeRoutes>
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
                on:click|preventDefault={()=>session.invalidate()}>
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
