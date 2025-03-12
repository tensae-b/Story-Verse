<script>
	import { enhance } from '$app/forms';
	export let data;
	$: story = '';
	let loading = false;
	$: background = '/default.gif';
	$: font = '';
	$: selected = 'Fantasy';
	const genre = [
		{ label: 'Fantasy', gif: '/fantasy.gif', font: 'cinzel' },
		{ label: 'Science Fiction', gif: '/scifi.gif', font: 'exo' },
		{ label: 'Mystery', gif: '/mystery.gif', font: 'elite' },
		// { label: 'Thriller', gif: '' },
		{ label: 'Romance', gif: '/romance.gif', font: 'fairDisplay' },
		// { label: 'Historical Fiction', gif: '' },
		// { label: 'Dystopian', gif: '' },
		{ label: 'Horror', gif: '/horror.gif', font: 'creepster' },
		{ label: 'Comedy', gif: '/comedy.gif', font: 'chewy' },
		// { label: 'Western', gif: '' },
		{ label: 'Crime', gif: '/crime.gif', font: 'courier' }
		// { label: 'Superhero', gif: '' },
		// { label: 'Magical Realism', gif: '' },
		// { label: 'Steampunk', gif: '' },
		// { label: 'Cyberpunk', gif: '' },
		// { label: 'Dystopian Romance', gif: '' },
		// { label: 'Paranormal Romance', gif: '' },
		// { label: 'Historical Mystery', gif: '' },
		// { label: 'Science Fiction Romance', gif: '' },
		// { label: 'Dark Fantasy', gif: '' }
	];

	function handleSelect(e) {
		const genreItem = genre.find((g) => g.label === selected);
		background = genreItem ? genreItem.gif : '';
		font = genreItem && genreItem.font ? genreItem.font : '';
	}
</script>

<div
	class=" bg-purple-800/30font-{font} h-full bg-cover p-10"
	style="background-image: url({background});  font-family: {font}; background-color:#c5bde5"
>
	<div class="flex h-full w-full flex-col items-center gap-0 lg:items-center">
		<div class="w-full rounded-t-lg bg-white/40 xl:w-[60%]">
			<h2
				class="flex w-full justify-between rounded-lg bg-[#7e63f8] px-10 py-7 text-3xl text-white"
			>
				<iconify-icon icon="hugeicons:stars" width="40" height="40"></iconify-icon>
				Story verse <iconify-icon icon="hugeicons:stars" width="40" height="40"></iconify-icon>
			</h2>
			<div class="bg-[#b7a8fa]/10 p-5 md:p-12">
				<div class=" rounded-md border-2 border-[#7e63f8]/20 bg-white/70 p-5">
					<form
						method="POST"
						action="?/ask"
						class="relative flex flex-col items-center justify-center gap-10"
						on:submit={() => {
							loading = true;
						}}
						use:enhance={({ formElement, formData, action, cancel }) => {
							return async ({ result }) => {
								loading = false;
								story = result.data.story;
							};
						}}
					>
						<div
							class="  flex w-full flex-col gap-5 rounded-md border-2 border-[#7e63f8]/20 bg-[#b7a8fa]/10 px-2 py-12 lg:px-7"
						>
							<div class="flex w-full flex-col items-center justify-between lg:flex-row">
								<div class="flex flex-col items-start gap-3">
									<label for="celebrity"> Celebrity </label>
									<select
										name="celebrity"
										id="celebrity"
										class="w-48 rounded-md border border-[#7e63f8]/30 px-2 py-3"
									>
										{#each data.celebrity as celebrity}
											<option value={celebrity}>{celebrity}</option>
										{/each}
									</select>
								</div>
								<div class="flex flex-col items-start gap-3">
									<label for="genre"> Genre </label>
									<select
										name="genre"
										id="genre"
										class="w-48 rounded-md border border-[#7e63f8]/30 px-2 py-3"
										bind:value={selected}
									>
										{#each genre as genre}
											<option value={genre.label}>{genre.label}</option>
										{/each}
									</select>
								</div>
								<div class="flex flex-col items-start gap-3">
									<label for="setting">Setting </label>
									<select
										name="setting"
										id="setting"
										class="w-48 rounded-md border border-[#7e63f8]/30 px-2 py-3"
									>
										{#each data.setting as setting}
											<option value={setting}>{setting}</option>
										{/each}
									</select>
								</div>
							</div>
						</div>
						<button
							type="submit"
							class="absolute -bottom-5 w-40 self-center rounded-md bg-[#7e63f8] px-5 py-3 text-white lg:w-[20%]"
							on:click={handleSelect}
						>
							Generate</button
						>
					</form>
					<div
						class="mt-20 flex h-80 w-full justify-center overflow-y-scroll rounded-md border border-[#7e63f8]/30 bg-white p-4"
					>
						{#if loading}
							<div class="flex h-full items-center justify-center">
								<iconify-icon icon="eos-icons:loading" width="40" height="40" style="color: #7e63f8"
								></iconify-icon>
							</div>
						{:else}
							<p>{story}</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
