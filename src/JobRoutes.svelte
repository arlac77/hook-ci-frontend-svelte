<script>
  import {
    Route,
    MasterRoute,
    DetailRoute
  } from "svelte-guard-history-router";
  import JobsPage from "./pages/Jobs.svelte";
  import JobPage from "./pages/Job.svelte";
  import JobLink from "./components/JobLink.svelte";
  import JobRawPage from "./pages/JobRaw.svelte";
  import JobLogPage from "./pages/JobLog.svelte";
  import { Job } from "./job.mjs";

  async function* jobIterator(transition, properties) {}
</script>

<Route
  path="/job"
  iteratorFor={jobIterator}
  factory={MasterRoute}
  component={JobsPage}>
  <Route
    path="/:job"
    objectInstance={Job}
    propertyMapping={{ job: 'id' }}
    factory={DetailRoute}
    linkComponent={JobLink}
    component={JobPage}>
    <Route path="/raw" component={JobRawPage} />
    <Route path="/log" component={JobLogPage} />
  </Route>
</Route>
