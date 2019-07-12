import { writable } from 'svelte/store';
import { config } from "../package.json";

export const queues = writable([]);

async function getQueues() {
  const data = await fetch(config.api + "/queues");
  queues.set((await data.json()).map(q => { q.jobs = [{ id: 1 }]; return q; }));
}

getQueues();


export const repositories = writable([]);

async function getRepositories() {
  const data = await fetch(config.api + "/repositories?pattern=arlac77/*");
  repositories.set(await data.json());
}

getRepositories();
