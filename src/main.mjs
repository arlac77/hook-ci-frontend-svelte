import { Router, route } from "./router";
import { hasEntitlements } from "./session";

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

export function fetchQueues() {
  return {
    enter: async context => {
      const data = await fetch(config.api + "/queues");
      context.queues = (await data.json()).map(q => {
        q.jobs = [{ id: 1 }];
        return q;
      });
    },
    leave: async context => {
      delete context.queues;
    }
  };
}

export function fetchJobs() {
  return {
    enter: async context => {
      const data = await fetch(config.api + `/queue/${context.params.queue}/jobs`);
      context.jobs = await data.json();
    },
    leave: async context => {
      delete context.jobs;
    }
  };
}

export function fetchRepositories() {
  return {
    enter: async context => {
      const data = await fetch(config.api + "/repositories?pattern=arlac77/*");
      context.repositories = await data.json();
    },
    leave: async context => {
      delete context.repositories;
    }
  };
}

export const router = new Router(
  [
    route("*", NotFound),
    route("/index.html", Home),
    route("/", Home),
    route("/login", Login),
    route("/about", hasEntitlements("ci"), About),
    route("/repository", fetchRepositories(), Repositories),
    route("/repository/:repository", fetchRepositories(),Repository),
    route("/queue", hasEntitlements("ci.queues.read"), fetchQueues(), Queues),
    route("/queue/:queue", fetchQueues(), fetchJobs(), Queue),
    route("/queue/:queue/jobs", fetchJobs(), Jobs),
    route("/queue/:queue/job/:job", fetchJobs(), Job),
    route("/queue/:queue/job/:job/log", fetchJobs(), JobLog),
    route("/node", hasEntitlements("ci.nodes.read"), Nodes)
  ],
  config.urlPrefix
);

const app = new App({
  target: document.body
});

export default app;
