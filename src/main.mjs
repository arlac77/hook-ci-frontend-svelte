import { derived } from "svelte/store";
import { Router, route, NotFound, Guard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import ApolloClient, { gql } from "apollo-boost";
import { query } from "svelte-apollo";
import { Provider, Repository as MyRepository } from "repository-provider";
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
import { Node as myNode } from "./Node.mjs";
import { config } from "../package.json";

export const session = new Session(localStorage);

class SessionGuard extends Guard {
  async enter(transition) {
    if (!session.isValid) {
      return transition.redirect("/login");
    }
  }
}

const needsSession = new SessionGuard();

export const router = new Router(
  [
    route("*", NotFound),
    route("/*", Home),
    route("/login", Login),
    route("/about", About),
    route("/repository", needsSession, Repositories),
    route("/repository/:repository", needsSession, Repository),
    route("/repository/:repositoryGroup/:repository", needsSession, Repository),
    route(
      "/repository/:repositoryProvider/:repositoryGroup/:repository",
      needsSession,
      Repository
    ),
    route("/queue", needsSession, Queues),
    route("/queue/:queue", needsSession, Queue),
    route("/queue/:queue/active", needsSession, Queue),
    route("/queue/:queue/waiting", needsSession, Queue),
    route("/queue/:queue/delayed", needsSession, Queue),
    route("/queue/:queue/failed", needsSession, Queue),
    route("/queue/:queue/completed", needsSession, Queue),
    route("/queue/:queue/paused", needsSession, Queue),
    route("/queue/:queue/job", needsSession, Jobs),
    route("/queue/:queue/job/:job", needsSession, Job),
    route("/queue/:queue/job/:job/log", needsSession, JobLog),
    route("/node", needsSession, Nodes),
    route("/node/:node", needsSession, Node)
  ],
  config.base
);

const repositoryProvider = new Provider();

function getRepository(rdata) {
  if(rdata === undefined) { return undefined; }
  return new MyRepository(repositoryProvider, rdata.name, rdata);
}

export const repositories = derived(
  session,
  ($session, set) => {
    if (session.isValid) {
      fetch(config.api + "/repositories?pattern=arlac77/*", {
        headers: session.authorizationHeader
      }).then(async data =>
        set((await data.json()).map(j => getRepository(j)))
      );
    } else {
      set([]);
    }
    return () => {};
  },
  []
);

export const repository = derived(
  [repositories, router.keys.repository],
  ([$repositories, $repository], set) => {
    set($repositories.find(a => a.name === $repository));
    return () => {};
  }
);

export const queues = derived(
  session,
  ($session, set) => {
    if (session.isValid) {
      fetch(config.api + "/queues", {
        headers: session.authorizationHeader
      }).then(async data => set(await data.json()));
    } else {
      set([]);
    }
    return () => {};
  },
  []
);

export const queue = derived(
  [queues, router.keys.queue],
  ([$queues, $queue], set) => {
    set($queues.find(a => a.name === $queue));
    return () => {};
  }
);

export const jobs = derived(
  [session, router.keys.queue],
  ([$session, $queue], set) => {
    if (session.isValid && $queue) {
      fetch(config.api + `/queue/${$queue}/jobs`, {
        headers: session.authorizationHeader
      }).then(async data => {
        const jobs = (await data.json()).map(job => {
          job.node = getNode(job.node);
          job.repository = getRepository(job.repository);
          
          if (job.steps !== undefined) {
            job.steps.forEach(s => (s.node = getNode(s.node)));
          }
          return job;
        });
        set(jobs);
      });
    } else {
      set([]);
    }
    return () => {};
  },
  []
);

export const job = derived([jobs, router.keys.job], ([$jobs, $job], set) => {
  set($jobs.find(j => j.id === $job));
  return () => {};
});

const NODES = gql`
  {
    nodes {
      name
      version
      uptime
      memory {
        rss
        heapTotal
        heapUsed
        external
      }
      isLocal
    }
  }
`;

const _nodes = new Map();

function getNode(name, options) {
  if (name === "" || name === undefined) {
    return undefined;
  }

  let node = _nodes.get(name);

  if (node === undefined) {
    node = new myNode(name, options);
    _nodes.set(name, node);
  } else {
    node.update(options);
  }

  return node;
}

const client = new ApolloClient({ uri: config.graphQl });
export const rawNodes = query(client, { query: NODES });

export const nodes = derived(
  rawNodes,
  ($rawNodes, set) => {
    $rawNodes.then(nodes => {
      set(nodes.data.nodes.map(node => getNode(node.name, node)));
    });
    return () => {};
  },
  []
);

export const node = derived(
  [nodes, router.keys.node],
  ([$nodes, $node], set) => {
    set($nodes.find(a => a.name === $node));
    return () => {};
  }
);

export default new App({
  target: document.body
});
