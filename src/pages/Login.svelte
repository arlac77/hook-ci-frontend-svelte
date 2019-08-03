<script>
  import { onDestroy } from "svelte";
  import { name, version, description } from "../../package.json";
  import { login, session } from "../session.mjs";
  export let router;

  let username;
  let password = "";

  async function submit() {
    await login(username, password);
    router.push("/");
  }

  onDestroy(
    session.subscribe(value => {
      username = value.username;
      password = "";
    })
  );
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
      <button type="submit" disabled={!username || !password}>Login</button>
    </div>
  </form>
</div>
