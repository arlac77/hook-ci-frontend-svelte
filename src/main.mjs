import { derived, readable } from "svelte/store";
import { BaseRouter, route, Guard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import { setupClient, query } from "svql";
import { MultiGroupProvider } from "repository-provider";
import Queue from "./pages/Queue.svelte";
import Repository from "./pages/Repository.svelte";
import RepositoryGroup from "./pages/RepositoryGroup.svelte";
import Jobs from "./pages/Jobs.svelte";
import Job from "./pages/Job.svelte";
import JobRaw from "./pages/JobRaw.svelte";
import JobLog from "./pages/JobLog.svelte";
import Node from "./pages/Node.svelte";
import App from "./App.svelte";
import { Node as myNode } from "./Node.mjs";
import { base, api, graphQl } from "./constants.mjs";

export const session = new Session(localStorage);

class SessionGuard extends Guard {
  async enter(transition) {
    if (!session.isValid) {
      return transition.redirect("/login");
    }
  }
}

export const needsSession = new SessionGuard();

export const queueRoute = route("/queue/:queue", needsSession, Queue);
export const jobsRoute = route(queueRoute, "/job", Jobs);
export const jobRoute = route(jobsRoute, "/:job", Job);

export const router = new BaseRouter(
  [
    route("/group/:repositoryGroup", needsSession, RepositoryGroup),
    route("/group/:repositoryGroup/:repository", needsSession, Repository),
    queueRoute,
    route(queueRoute, "/active", Queue),
    route(queueRoute, "/waiting", Queue),
    route(queueRoute, "/delayed", Queue),
    route(queueRoute, "/failed", Queue),
    route(queueRoute, "/completed", Queue),
    route(queueRoute, "/paused", Queue),
    jobsRoute,
    jobRoute,
    route(jobRoute, "/raw", JobRaw),
    route(jobRoute, "/log", JobLog),
    route("/node/:node", needsSession, Node)
  ],
  base
);

const repositoryProvider = new MultiGroupProvider();

function getRepository(rdata) {
  if (rdata === undefined) {
    return undefined;
  }

  const fn = rdata.full_name || rdata.fullName;
  const [gn, rn] = fn.split(/\//);

  const g = repositoryProvider.addRepositoryGroup(gn);
  return g.addRepository(rn, rdata);
}

function getRepositoryGroup(gdata) {
  if (gdata === undefined) {
    return undefined;
  }

  return repositoryProvider.addRepositoryGroup(gdata.name, gdata);
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
