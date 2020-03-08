<script>
  import { onDestroy } from "svelte";
  import { session } from "../main.mjs";
  import api from "consts:api";

  export let state;

  onDestroy(
    state.subscribe(value => {
      const job = value.params.job;
      const queue = value.params.queue;
      if (job && queue) {
        refresh(`${api}/queue/${queue}/job/${job}/log?start=0&end=10000`);
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
