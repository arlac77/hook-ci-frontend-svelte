<script>
  import { name, version, description } from "../../package.json";
  import { authenticate } from "../auth.mjs";

  let username = "";
  let password = "";

  async function submit() {
    return authenticate(username, password);
  }
</script>

<div>
  {name} {description} {version}
  <form on:submit|preventDefault={submit}>

    <div>
      <label>Username</label>
      <input bind:value={username} type="text" name="username" />
    </div>

    <div>
      <label>Password</label>
      <input bind:value={password} type="password" name="password" />
    </div>

    <div>
      <button type="submit">Login</button>
    </div>
  </form>

</div>
