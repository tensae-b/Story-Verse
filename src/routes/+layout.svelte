<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class='p-10'>
	<h2 class='my-10 text-3xl'> Generate stories</h2>
	<slot/>
</div>
