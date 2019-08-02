<script>
  import { name, version, description, config } from "../../package.json";

  let username = "aaa";
  let password = "bbb";

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
    console.log(data);
  }
</script>

<div>
  {name} {description} {version}
  <div>
    <label>Username</label>
    <input bind:value={username} type="text" name="username" />
  </div>

  <div>
    <label>Password</label>
    <input bind:value={password} type="password" name="password" />
  </div>

  <div>
    <button on:click={authenticate}>Login</button>
  </div>
</div>
