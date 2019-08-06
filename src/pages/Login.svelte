<script>
  import { onDestroy } from "svelte";
  import { name, version, description } from "../../package.json";
  import { login, session } from "../session.mjs";
  export let router;

  let username;
  let password = "";

  let active = false;

  async function submit() {
    try {
      active = true;
      await login(username, password);
      router.push("/");
    } finally {
      active = false;
    }
  }

  onDestroy(
    session.subscribe(value => {
      username = value.username;
      password = "";
    })
  );
</script>

<style>
  button {
    text-align: center;
    text-decoration: none;

    margin: 2px 0;

    border: solid 1px transparent;
    border-radius: 4px;

    padding: 0.5em 1em;

    color: #ffffff;
    background-color: #9555af;
  }

  button:active {
    transform: translateY(1px);
    filter: saturate(150%);
  }
</style>

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
      <button type="submit" class="{active ? 'active' : ''}" disabled={!username || !password}>
        Login
      </button>
    </div>
  </form>
</div>
