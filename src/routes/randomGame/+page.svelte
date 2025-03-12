<script>
	let colors = generateColors();

	function generateColors() {
		return Array.from(
			{ length: 5 },
			() =>
				`#${Math.floor(Math.random() * 16777215)
					.toString(16)
					.padStart(6, '0')}`
		);
	}

	function copyToClipboard(color) {
		navigator.clipboard.writeText(color);
		alert(`Copied: ${color}`);
	}
</script>

<div class="palette">
	{#each colors as color}
		<div
			class="color-box"
			style="background-color: {color};"
			on:click={() => copyToClipboard(color)}
		>
			{color}
		</div>
	{/each}
</div>

<button on:click={() => (colors = generateColors())}>Generate</button>

<style>
	.palette {
		display: flex;
		gap: 10px;
	}
	.color-box {
		width: 100px;
		height: 100px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		cursor: pointer;
	}
	button {
		margin-top: 10px;
		padding: 10px 15px;
		font-size: 16px;
	}
</style>
