import { Router } from "svelte-easyroute-rollup";

import Queues from "./pages/Queues.svelte";
import Queue from "./pages/Queue.svelte";
import Repositories from "./pages/Repositories.svelte";
import Repository from "./pages/Repository.svelte";
import Jobs from "./pages/Jobs.svelte";
import Job from "./pages/Job.svelte";
import JobLog from "./pages/JobLog.svelte";
import Nodes from "./pages/Nodes.svelte";
import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";
import App from "./components/App.svelte";
import { base } from '../package.json';

export const router = new Router({
  mode: "history",
  base,
  routes: [
    { path: '*', component: NotFound },
    { path: "/", component: Home, name: "Home" },
    { path: "/repositories", component: Repositories, name: "Repositories" },
    { path: "/repository/:name", component: Repository, name: "Repository" },
    { path: "/queues", component: Queues, name: "Queues" },
    { path: "/queue/:name", component: Queue, name: "Queue" },
    { path: "/queue/:queue/jobs", component: Jobs, name: "Jobs" },
    { path: "/queue/:queue/job/:job", component: Job, name: "Job" },
    { path: "/queue/:queue/job/:job/log", component: JobLog, name: "jobLog" },
    { path: "/nodes", component: Nodes, name: "Nodes" }
  ]
});

const app = new App({
  target: document.body,
  props: { router }
});

export default app;
