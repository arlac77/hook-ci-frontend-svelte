<script>
  import { Outlet, Link } from "svelte-guard-history-router";
  import { onMount, onDestroy } from "svelte";
  import { session } from "../session.mjs";
  import { router } from "../main.mjs";

  let username;
  onDestroy(
    session.subscribe(value => {
      username = value.username;
    })
  );

</script>

<div class="wrapper">
  <header id="topnav">
    <Link href="/">Home</Link>
    <Link href="/queue">Queues</Link>
    <Link href="/repository">Repositories</Link>
    <Link href="/node">Nodes</Link>
    <Link href="/about">About</Link>
    <Link href="/login">Login</Link>
    <div>{username}</div>
  </header>
  <main>
    <Outlet {router}>
      nothing there
    </Outlet>
  </main>
</div>
