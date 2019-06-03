import crayon from "crayon";
import svelte from "crayon-svelte";

import Home from "./pages/Home.svelte";
import Queue from "./pages/Queue.svelte";
import Queues from "./pages/Queues.svelte";
import Navbar from "./components/Navbar.svelte";

const outlet = document.getElementById("app");
const app = crayon.create();

app.use(svelte.router(outlet));

app.path("/", (req, res) => res.redirect("/home"));
app.path("/home", (req, res) => res.mount(Home, { req, nav: app }));
app.path("/queues", (req, res) => res.mount(Queues, { req, nav: app }));
app.path("/queue/:name", (req, res) => res.mount(Queue, { req, nav: app }));

const nav = new Navbar({
  props: {
    nav: app
  },
  target: document.getElementById("nav")
});

app.load();
