<script>
  import { onMount, onDestroy } from "svelte";
  import { session } from "../session.mjs";
  import Link from "./Link.svelte";

  export let router;

  let done;

  onMount(() => {
    if (!done) {
      done = true;
      router.createOutlet();
    }
  });

  let username;
  onDestroy(
    session.subscribe(value => {
      username = value.username;
    })
  );
</script>

<div class="wrapper">
  <header id="topnav">
    <Link to="/">Home</Link>
    <Link to="/queues">Queues</Link>
    <Link to="/repositories">Repositories</Link>
    <Link to="/nodes">Nodes</Link>
    <Link to="/about">About</Link>
    <Link to="/login">Login</Link>
    <div>{username}</div>
  </header>
  <main>
    <div id="router-outlet" />
  </main>
</div>
