<script>
  import { onMount, onDestroy } from "svelte";
  import { session } from "../session.mjs";
  import { router } from "../main.mjs";

  import Link from "./Link.svelte";
  import Outlet from "./Outlet.svelte";

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
    <Link href="/queues">Queues</Link>
    <Link href="/repositories">Repositories</Link>
    <Link href="/nodes">Nodes</Link>
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
