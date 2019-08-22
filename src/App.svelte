<script>
  import { Outlet, Link } from "svelte-guard-history-router";
  import { router } from "./main.mjs";
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
        <Link href="/login">Login</Link>
      </li>
    </ul>
  </header>
  <main>
    <Outlet {router}>nothing there</Outlet>
  </main>
</div>
