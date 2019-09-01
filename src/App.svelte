<script>
  import { Outlet, Link } from "svelte-guard-history-router";
  import { session } from "svelte-session-manager";
  import { router } from "./main.mjs";

  function logout() {
    $session.invalidate();
  }
</script>

<div class="wrapper">
  <header id="topnav">
    <Link href="/">
      <img class="logo" src="hook_ci.svg" alt="Hook CI" />
      <h2>Hook CI</h2>
    </Link>
    <ul>
      <li>
        <Link href="/queue">Queues</Link>
      </li>
      <li>
        <Link href="/repository">Repositories</Link>
      </li>
      <li>
        <Link href="/node">Nodes</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        {#if $session.isValid}
          <Link href="/login">Login</Link>
        {:else}
          <a href="/" on:click|preventDefault={logout}>
            Logout {$session.username}
          </a>
        {/if}
      </li>
    </ul>
  </header>
  <main>
    <Outlet {router}>nothing there</Outlet>
  </main>
</div>
