import App from './App.svelte';
import Queue from './pages/Queue.svelte';

/*
import { Store } from 'svelte/store.mjs';

const store = new Store({
	Page: Queue,
	id: null,
  });
  */

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;