<script>
  import { name, version, description, config } from "../../package.json";
  import { Login } from "svelte-session-manager";
  export let context;
</script>

<div>
  {name} {description} {version}
  <Login endpoint={config.api + "/authenticate"}/>
</div>
