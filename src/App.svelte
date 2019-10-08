<script>
  import { Outlet, link, active } from "svelte-guard-history-router";
  import { Menue } from "svelte-common";
  import { router, session } from "./main.mjs";

  function logout() {
    session.invalidate();
  }
</script>

<nav>
  <a href="/" use:link={router} use:active={router}>
    <img class="logo" src="hook_ci.svg" alt="Hook CI" />
    Hook CI
  </a>
  <ul class="left">
    <li>
      <a href="/queue" use:link={router} use:active={router}>Queues</a>
    </li>
        <li>
      <a href="/group" use:link={router} use:active={router}>
        Repository Groups
      </a>
    </li>

    <li>
      <a href="/repository" use:link={router} use:active={router}>
        Repositories
      </a>
    </li>
    <li>
      <a href="/node" use:link={router} use:active={router}>Nodes</a>
    </li>
    <li>
      <a href="/about" use:link={router} use:active={router}>About</a>
    </li>
  </ul>
  <ul>
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
        <a href="/login" use:link={router} use:active={router}>Login</a>
      {/if}
    </li>
  </ul>
</nav>
<main>
  <Outlet {router} />
</main>
