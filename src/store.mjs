import { readable } from "svelte/store";
import { config } from "../package.json";

export const repositories = readable([], set => {
  fetch(config.api + "/repositories?pattern=arlac77/*").then(async data =>
    set(await data.json())
  );

  return () => {
  };
});

export const queues = readable([], set => {
  fetch(config.api + "/queues").then(async data => set(await data.json()));

  return () => {
  };
});



/*
const guardJobs = {
  enter: async context => {
    const data = await fetch(
      config.api + `/queue/${context.params.queue}/jobs`
    );
    context.jobs = await data.json();
  },
  leave: async context => {
    delete context.jobs;
  }
};
*/