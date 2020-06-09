<script>
  import { onDestroy } from "svelte";
  import JobTable from "../components/JobTable.svelte";
  import { router, jobs } from "../main.mjs";

  let queue = { name: "" };

  onDestroy(
    router.subscribe(router => {
      queue = { name: router.params.queue };
    })
  );
</script>

<JobTable {queue} jobs={$jobs} />
