<script>
  async function refresh() {
    const data = await fetch(
      `api/queue/${this.$route.params.queue}/job/${
        this.$route.params.job
      }/log?start=0&end=10000`
    );
    const json = await data.json();
    this.lines = json.logs.join("\n");
  }
</script>

<style>
  .log {
    white-space: pre;
    font-family: courier, "courier new", monospace;
  }
</style>
