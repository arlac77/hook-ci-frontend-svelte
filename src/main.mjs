import { Router } from "svelte-easyroute-rollup";

import Queue from "./pages/Queue.svelte";
import Queues from "./pages/Queues.svelte";
import Repositories from "./pages/Repositories.svelte";
import Home from "./pages/Home.svelte";
import App from "./components/App.svelte";

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home"
    },
    {
      path: "/queues",
      component: Queues,
      name: "Queues"
    },
    {
      path: "/queue/:name",
      component: Queue,
      name: "Queue"
    },
    {
      path: "/repositories",
      component: Repositories,
      name: "Repositories"
    },
  ]
});

const app = new App({
  target: document.body,
  props: { router }
});

export default app;
