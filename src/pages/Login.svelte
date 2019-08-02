<script>
  import { name, version, description, config } from "../../package.json";

  let username = "";
  let password = "";

  async function authenticate() {
    const response = await fetch(config.api + "/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await response.json();

    window.localStorage.token = data.token;
  }
</script>

<div>
  {name} {description} {version}
  <form on:submit|preventDefault={authenticate}>

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
