<script>
  import { config } from "../../package.json";

  export let currentRoute;

  let lines;

  async function refresh() {
    const data = await fetch(
      `${config.api}/queue/${currentRoute.params.queue}/job/${currentRoute.params.job}/log?start=0&end=10000`
    );
    const json = await data.json();
    lines = json.logs.join("\n");
  }
</script>

<style>
  .log {
    white-space: pre;
    font-family: courier, "courier new", monospace;
  }
</style>

<div class="log">{lines}</div>
