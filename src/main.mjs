import { Router, route } from "svelte-guard-history-router";

import { hasEntitlements } from "./session";

import Queues from "./pages/Queues.svelte";
import Queue from "./pages/Queue.svelte";
import Repositories from "./pages/Repositories.svelte";
import Repository from "./pages/Repository.svelte";
import Jobs from "./pages/Jobs.svelte";
import Job from "./pages/Job.svelte";
import JobLog from "./pages/JobLog.svelte";
import Nodes from "./pages/Nodes.svelte";
import Node from "./pages/Nodes.svelte";
import About from "./pages/About.svelte";
import Login from "./pages/Login.svelte";
import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";
import App from "./components/App.svelte";
import { config } from "../package.json";

const guardJobs = {
  enter: async context => {
    const data = await fetch(
      config.api + `/queue/${context.params.queue}/jobs`
    );
    context.jobs = await data.json();
  },
  leave: async context => {
    delete context.jobs;
  }
};

export const router = new Router(
  [
    route("*", NotFound),
    route("/index.html", Home),
    route("/*", Home),
    route("/login", Login),
    route("/about", hasEntitlements("ci"), About),
    route("/repository", Repositories),
    route("/repository/:repository",  Repository),
    route("/repository/:repositoryProvider/:repositoryGroup/:repository", Repository),
    route("/queue", hasEntitlements("ci.queues.read"), Queues),
    route("/queue/:queue", Queue),
    route("/queue/:queue/active", Queue),
    route("/queue/:queue/waiting", Queue),
    route("/queue/:queue/delayed", Queue),
    route("/queue/:queue/failed", Queue),
    route("/queue/:queue/completed", Queue),
    route("/queue/:queue/paused", Queue),
    route("/queue/:queue/job", guardJobs, Jobs),
    route("/queue/:queue/job/:job", guardJobs, Job),
    route("/queue/:queue/job/:job/log", guardJobs, JobLog),
    route("/node", hasEntitlements("ci.nodes.read"), Nodes),
    route("/node/:node", hasEntitlements("ci.nodes.read"), Node)
  ],
  config.urlPrefix
);

const app = new App({
  target: document.body
});

export default app;
