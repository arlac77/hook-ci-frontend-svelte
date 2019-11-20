<script>
  import { Login } from "svelte-session-manager";
  import { config } from "../../package.json";
  import { session } from "../main.mjs";

  async function result() {
    const transition = state.router.transition;

    if (transition) {
      transition.continue();
    }
  }
</script>

<div class="center">
  <Login {session} endpoint={config.api + '/authenticate'} {result} />
</div>
