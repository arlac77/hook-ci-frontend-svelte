<script>
  import { onDestroy } from "svelte";
  import { config } from "../../package.json";
  import { session } from "../main.mjs";

  let url;

  onDestroy(
    state.subscribe(value => {
      const job = value.params.job;
      const queue = value.params.queue;
      if (job && queue) {
        url = `${config.api}/queue/${queue}/job/${job}/log?start=0&end=10000`;
        refresh(url);
      }
    })
  );

  let lines = [];

  async function refresh(url) {
    const data = await fetch(url, {
      headers: session.authorizationHeader
    });
    const json = await data.json();
    lines = json.logs.join("\n");
  }
</script>

<div class="log">{lines}</div>
