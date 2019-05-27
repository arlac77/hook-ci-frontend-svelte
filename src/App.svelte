<script>
	import Queue from './pages/Queue.svelte';

	export let name;
</script>

<style>
	h1 {
		color: purple;
	}
</style>



<div><Queue></Queue></div>

<a href="/queue" data-navigo>Qeueue</a>&nbsp;|&nbsp;


<h1>Hello {name}!</h1>
