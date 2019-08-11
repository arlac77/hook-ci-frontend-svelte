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

const guardQueues = {
  enter: async context => {
    console.log("enter queues");
    const data = await fetch(config.api + "/queues");
    context.queues = (await data.json()).map(q => {
      q.jobs = [{ id: 1 }];
      return q;
    });
  },
  leave: async context => {
    console.log("leave queues");
    delete context.queues;
  }
};

const guardJobs = {
  enter: async context => {
    console.log("enter jobs");
    const data = await fetch(
      config.api + `/queue/${context.params.queue}/jobs`
    );
    context.jobs = await data.json();
  },
  leave: async context => {
    console.log("leave jobs");
    delete context.jobs;
  }
};

const guardRepositories = {
  enter: async context => {
    console.log("enter repositories");
    const data = await fetch(config.api + "/repositories?pattern=arlac77/*");
    context.repositories = await data.json();
  },
  leave: async context => {
    console.log("leave repositories");
    delete context.repositories;
  }
};

export const router = new Router(
  [
    route("*", NotFound),
    route("/index.html", Home),
    route("/*", Home),
    route("/login", Login),
    route("/about", hasEntitlements("ci"), About),
    route("/repository", guardRepositories, Repositories),
    route("/repository/:repository", guardRepositories, Repository),
    route("/repository/:repositoryProvider/:repositoryGroup/:repository", Repository),
    route("/queue", hasEntitlements("ci.queues.read"), guardQueues, Queues),
    route("/queue/:queue", guardQueues, guardJobs, Queue),
    route("/queue/:queue/job", guardQueues, guardJobs, Jobs),
    route("/queue/:queue/job/:job",guardQueues, guardJobs, Job),
    route("/queue/:queue/job/:job/log", guardQueues, guardJobs, JobLog),
    route("/node", hasEntitlements("ci.nodes.read"), Nodes),
    route("/node/:node", hasEntitlements("ci.nodes.read"), Node)
  ],
  config.urlPrefix
);

const app = new App({
  target: document.body
});

export default app;
