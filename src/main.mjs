import { initializeServiceWorker } from "svelte-common";
import { Session } from "svelte-session-manager";
import App from "./App.svelte";

export const session = new Session(localStorage);

const { serviceWorker, serviceWorkerRegistration } = initializeServiceWorker("bundle.service-worker.mjs");
export { serviceWorker, serviceWorkerRegistration };

export default new App({
  target: document.body
});
