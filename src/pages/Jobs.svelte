<script>
  import { onDestroy } from "svelte";
  import JobTable from "../components/JobTable.svelte";

  let jobs = [];
  let queue = { name: "" };

  onDestroy(
    state.subscribe(value => {
      jobs = value.jobs;
      queue = { name: value.params.queue };
    })
  );
</script>

<JobTable {queue} {jobs} />
