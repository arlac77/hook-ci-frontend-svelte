import { derived, readable } from "svelte/store";
import { Router, route, NotFound, Guard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import { setupClient, query } from "svql";
import { Provider, Repository as MyRepository } from "repository-provider";
import Queues from "./pages/Queues.svelte";
import Queue from "./pages/Queue.svelte";
import Repositories from "./pages/Repositories.svelte";
import Repository from "./pages/Repository.svelte";
import RepositoryGroup from "./pages/RepositoryGroup.svelte";
import RepositoryGroups from "./pages/RepositoryGroups.svelte";
import Jobs from "./pages/Jobs.svelte";
import Job from "./pages/Job.svelte";
import JobRaw from "./pages/JobRaw.svelte";
import JobLog from "./pages/JobLog.svelte";
import Nodes from "./pages/Nodes.svelte";
import Node from "./pages/Node.svelte";
import About from "./pages/About.svelte";
import Login from "./pages/Login.svelte";
import Home from "./pages/Home.svelte";
import App from "./App.svelte";
import { Node as myNode } from "./Node.mjs";
import base from "consts:base";
import api from "consts:api";
import graphQl from "consts:graphQl";

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
    route("/group", needsSession, RepositoryGroups),
    route("/group/:repositoryGroup", needsSession, RepositoryGroup),
    route("/group/:repositoryGroup/:repository", needsSession, Repository),
    route("/repository", needsSession, Repositories),
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
    route("/queue/:queue/job/:job/raw", needsSession, JobRaw),
    route("/queue/:queue/job/:job/log", needsSession, JobLog),
    route("/node", needsSession, Nodes),
    route("/node/:node", needsSession, Node)
  ],
  base
);

const repositoryProvider = new Provider();

function getRepository(rdata) {
  if (rdata === undefined) {
    return undefined;
  }

  const p = repositoryProvider;
  const fn = rdata.full_name || rdata.fullName;
  const [gn, rn] = fn.split(/\//);
  let g = p._repositoryGroups.get(gn);
  if (g === undefined) {
    g = new p.repositoryGroupClass(p, gn);
    p._repositoryGroups.set(g.name, g);
  }
  let r = g._repositories.get(rn);
  if (r === undefined) {
    r = new MyRepository(g, rn, rdata);
    g._repositories.set(r.name, r);
  }

  return r;
}

function getRepositoryGroup(gdata) {
  if (gdata === undefined) {
    return undefined;
  }

  let g = repositoryProvider._repositoryGroups.get(gdata.name);
  if (g === undefined) {
    g = new repositoryProvider.repositoryGroupClass(
      repositoryProvider,
      gdata.name,
      gdata
    );
    repositoryProvider._repositoryGroups.set(g.name, g);
  }
  return g;
}

export const repositories = derived(
  session,
  ($session, set) => {
    if (session.isValid) {
      fetch(api + "/repositories", {
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

export const repositoryGroups = derived(
  session,
  ($session, set) => {
    if (session.isValid) {
      fetch(api + "/groups", {
        headers: session.authorizationHeader
      }).then(async data =>
        set((await data.json()).map(j => getRepositoryGroup(j)))
      );
    } else {
      set([]);
    }
    return () => {};
  },
  []
);

export const repositoryGroup = derived(
  router.keys.repositoryGroup,
  ($repositoryGroup, set) => {
    repositoryProvider.repositoryGroup($repositoryGroup).then(rg => set(rg));
    return () => {};
  }
);

export const queues = derived(
  session,
  ($session, set) => {
    if (session.isValid) {
      fetch(api + "/queues", {
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
      fetch(api + `/queue/${$queue}/jobs`, {
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
  set($jobs.find(j => j.id == $job));
  return () => {};
});

const NODES = `
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

setupClient({
  url: graphQl
});

export const nodes = readable([], async set => {
  const data = await query(NODES, {});
  set(data.nodes.map(node => getNode(node.name, node)));
  return () => {};
});

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
