import { writable } from 'svelte/store';
import { api } from "../package.json";

export const queues = writable([]);

async function getQueues() {
  const data = await fetch(api + "/queues");
  queues.set((await data.json()).map(q => { q.jobs = [{ id: 1 }]; return q; }));
}

getQueues();


export const repositories = writable([]);

async function getRepositories() {
  const data = await fetch(api + "/repositories?pattern=arlac77/*");
  repositories.set(await data.json());
}

getRepositories();


/*
export const nodes = writable([]);

async function getNodes() {
  const data = await fetch("api/nodes/state");
  nodes.set(await data.json());
}

getNodes();
*/