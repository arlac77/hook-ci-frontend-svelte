<script>
  import { onDestroy } from "svelte";
  import JobTable from "../components/JobTable.svelte";
  import { jobs } from "../main.mjs";

  export let router;
  
  let queue = { name: "" };

  onDestroy(
    router.subscribe(router => {
      queue = { name: router.params.queue };
    })
  );
</script>

<JobTable {queue} jobs={$jobs} />
