import { Router } from "svelte-easyroute-rollup";

import Queues from "./pages/Queues.svelte";
import Queue from "./pages/Queue.svelte";
import Repositories from "./pages/Repositories.svelte";
import Repository from "./pages/Repository.svelte";
import Nodes from "./pages/Nodes.svelte";
import Home from "./pages/Home.svelte";
import App from "./components/App.svelte";

export const router = new Router({
  mode: "history",
  base: "/services/ci",
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
    {
      path: "/repository/:name",
      component: Repository,
      name: "Repository"
    },
    {
      path: "/nodes",
      component: Nodes,
      name: "Nodes"
    }
  ]
});

const app = new App({
  target: document.body,
  props: { router }
});

export default app;
