import api from "consts:api";
import { Job } from "./job.mjs";

export class Queue {
  constructor(json) {
    Object.assign(this,json);
  }
  get jobs() { return [ new Job('1'), new Job('2') ]; }
}


async function fetchJobs(queue) {
  const response = await fetch(api + `/queue/${queue.name}/jobs`, {
    headers: session.authorizationHeader
  });
  const jobs = (await response.json()).map(job => {
    job.node = getNode(job.node);
    job.repository = getRepository(job.repository);

    if (job.steps !== undefined) {
      job.steps.forEach(s => (s.node = getNode(s.node)));
    }
    return job;
  });
  return jobs;
}
