<script>
  import { onDestroy } from "svelte";
  import { name, version, description } from "../../package.json";
  import { login, session } from "../session.mjs";
  export let context;

  let username;
  let password = "";

  let active = false;

  async function submit() {
    try {
      active = true;
      await login(username, password);
      context.router.push("/");
    } finally {
      active = false;
      password = '';
    }
  }

  $: username = $session.username;
</script>

<div>
  {name} {description} {version}
  <form on:submit|preventDefault={submit}>
    <fieldset>
      <label>Username</label>
      <input
        type="text"
        placeholder="Username"
        name="username"
        bind:value={username} />
    </fieldset>

    <fieldset>
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        name="password"
        bind:value={password} />
    </fieldset>

    <div>
      <button type="submit" class:active="{active}"
      disabled={!username || !password}>
        Login
      </button>
    </div>
  </form>
</div>
