import { Session } from "svelte-session-manager";
import App from "./App.svelte";

export const session = new Session(localStorage);

export default new App({
  target: document.body
});
