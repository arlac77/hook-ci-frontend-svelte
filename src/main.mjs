import { Router, route } from "./router";

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
import { config } from "../package.json";

export const router = new Router(
  [
    route("*", NotFound),
    route("/index.html", Home),
    route("/", Home),
    route("/login", Login),
    route("/about", About),
    route("/repositories", Repositories),
    route("/repository/:name", Repository),
    route("/queues", Queues),
    route("/queue/:name", Queue),
    route("/queue/:queue/jobs", Jobs),
    route("/queue/:queue/job/:job", Job),
    route("/queue/:queue/job/:job/log", JobLog),
    route("/nodes", Nodes)
  ],
  config.urlPrefix
);

const app = new App({
  target: document.body
});

export default app;
