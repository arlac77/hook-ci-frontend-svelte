<script>
  import { Outlet, Link } from "svelte-guard-history-router";
  import { router } from "../main.mjs";
</script>

<div class="wrapper">
  <header id="topnav">
    <Link href="/">Home</Link>
    <Link href="/queue">Queues</Link>
    <Link href="/repository">Repositories</Link>
    <Link href="/node">Nodes</Link>
    <Link href="/about">About</Link>
    <Link href="/login">Login</Link>
  </header>
  <main>
    <Outlet {router}>
      nothing there
    </Outlet>
  </main>
</div>
