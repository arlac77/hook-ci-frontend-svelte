<script>
	export let name;
	let src = 'tutorial/image.gif';
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name.toUpperCase()}!</h1>

<img src={src} alt="A man dancing">