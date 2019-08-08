<script>
  import { onDestroy } from "svelte";

  import JobTable from "../components/JobTable.svelte";
  export let context;

  let jobs = [];
  let queue = { name: ""};

  onDestroy(context.subscribe(value => {
    jobs = value.jobs;
    queue = { name: value.params.queue };
  }));
</script>

<JobTable {queue} {jobs}/>
