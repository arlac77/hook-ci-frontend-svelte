import { Router } from "svelte-easyroute-rollup";

import Queues from "./pages/Queues.svelte";
import Queue from "./pages/Queue.svelte";
import Repositories from "./pages/Repositories.svelte";
import Repository from "./pages/Repository.svelte";
import Jobs from "./pages/Jobs.svelte";
import Job from "./pages/Job.svelte";
import JobLog from "./pages/JobLog.svelte";
import Nodes from "./pages/Nodes.svelte";
import About from "./pages/About.svelte";
import Login from "./pages/Login.svelte";
import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";
import App from "./components/App.svelte";
import { needsAuthentication } from "./auth.mjs";

import { config } from "../package.json";

export const router = new Router({
  mode: "history",
  base: config.urlPrefix,
  routes: [
    { path: "*", component: NotFound },
    { path: "/index.html", component: Home, name: "Home" },
    { path: "/", component: Home, name: "Home" },
    { path: "/login", component: Login, name: "Login" },
    { path: "/about", component: About, name: "About" },
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

router.beforeEach = (to, from, next) => {
  if (needsAuthentication()) {
    to.fullPath = "/login";
    to.route = ["", "login"];
  }

  next();
};

const app = new App({
  target: document.body,
  props: { router }
});

export default app;
