import { readable } from "svelte/store";
import { config } from "../package.json";

export const repositories = readable([], set => {
  fetch(config.api + "/repositories?pattern=arlac77/*").then(async data =>
    set(await data.json())
  );

  return () => {
    console.log("unsubscribe repositories");
  };
});

export const queues = readable([], set => {
  fetch(config.api + "/queues").then(async data => set(await data.json()));

  return () => {
    console.log("unsubscribe queues");
  };
});
