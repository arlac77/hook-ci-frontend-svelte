import { derived } from "svelte/store";
import { Router, route, NotFound } from "svelte-guard-history-router";

import Queues from "./pages/Queues.svelte";
import Queue from "./pages/Queue.svelte";
import Repositories from "./pages/Repositories.svelte";
import Repository from "./pages/Repository.svelte";
import Jobs from "./pages/Jobs.svelte";
import Job from "./pages/Job.svelte";
import JobLog from "./pages/JobLog.svelte";
import Nodes from "./pages/Nodes.svelte";
import Node from "./pages/Node.svelte";
import About from "./pages/About.svelte";
import Login from "./pages/Login.svelte";
import Home from "./pages/Home.svelte";
import App from "./App.svelte";
import { config } from "../package.json";
import { queues, repositories } from "./store.mjs";

export const router = new Router(
  [
    route("*", NotFound),
    route("/*", Home),
    route("/login", Login),
    route("/about", About),
    route("/repository", Repositories),
    route("/repository/:repository", Repository),
    route(
      "/repository/:repositoryProvider/:repositoryGroup/:repository",
      Repository
    ),
    route("/queue", Queues),
    route("/queue/:queue", Queue),
    route("/queue/:queue/active", Queue),
    route("/queue/:queue/waiting", Queue),
    route("/queue/:queue/delayed", Queue),
    route("/queue/:queue/failed", Queue),
    route("/queue/:queue/completed", Queue),
    route("/queue/:queue/paused", Queue),
    route("/queue/:queue/job", Jobs),
    route("/queue/:queue/job/:job", Job),
    route("/queue/:queue/job/:job/log", JobLog),
    route("/node", Nodes),
    route("/node/:node", Node)
  ],
  config.urlPrefix
);

export const queue = derived(
  [queues, router.keys.queue],
  ([$queues, $queue], set) => {
    set($queues.find(a => a.name === $queue));
    return () => {};
  }
);

export const jobs = derived(
  router.keys.queue,
  ($queue, set) => {
    fetch(config.api + `/queue/${$queue}/jobs`).then(async data => set(await data.json()));
    return () => {};
  }
);

export const job = derived(
  [jobs, router.keys.job],
  ([$jobs, $job], set) => {
    set($jobs.find(a => a.id === $job));
    return () => {};
  }
);

export const repository = derived(
  [repositories, router.keys.repository],
  ([$repositories, $repository], set) => {
    set($repositories.find(a => a.name === $repository));
    return () => {};
  }
);

export default new App({
  target: document.body
});
