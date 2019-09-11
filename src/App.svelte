<script>
  import { Outlet, Link } from "svelte-guard-history-router";
  import Menue from "svelte-common";
  import { router, session } from "./main.mjs";

  function logout() {
    session.invalidate();
  }
</script>

<nav>
  <Link href="/">
    <img class="logo" src="hook_ci.svg" alt="Hook CI" />
    Hook CI
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
        <Menue>
          <div slot="title" class="dropdown-trigger">{$session.username}</div>
          <ul slot="content" class="dropdown-content">
            <li>
              <a href="/" on:click|preventDefault={logout}>
                Logout {$session.username}
              </a>
            </li>
            <li class="divider" />
            <li>
              <a href="#!">three</a>
            </li>
          </ul>
        </Menue>
      {:else}
        <Link href="/login">Login</Link>
      {/if}
    </li>
  </ul>
</nav>
<main>
  <Outlet {router}>nothing there</Outlet>
</main>
