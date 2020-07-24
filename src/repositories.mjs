import { MultiGroupProvider } from "repository-provider";
import { derived } from "svelte/store";

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
