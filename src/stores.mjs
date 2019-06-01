import { writable } from 'svelte/store';

export const queues = writable([]);

async function getQueues() {
  const data = await fetch("api/queues");
  queues.set((await data.json()).map(q => { q.jobs = [{ id: 1 }]; return q; }));
}

getQueues();

