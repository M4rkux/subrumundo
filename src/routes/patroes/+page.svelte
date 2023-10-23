<script lang="ts">
	import { onMount } from 'svelte';
	import { getPatronEpisodes, type Episode} from "$lib";
	import Card from '../../components/Card.svelte';
	import Loading from '../../components/Loading.svelte';
	import { currentEpisode, patronEpisodes } from '../../store/player';

	let episodes: Episode[] = [];
	let pageLoaded = false;
	let _patronEpisodes: Episode[] = [];

	patronEpisodes.subscribe((data) => {
		_patronEpisodes = data;
	});

	onMount(() => {
		getEpisodesByPage();
	});

	async function getEpisodesByPage() {
		episodes = [];
		if (_patronEpisodes?.length) {
			episodes = _patronEpisodes;
		} else {
			const data = await getPatronEpisodes();
			episodes = data.episodes;
		}
		patronEpisodes.set(episodes);
		pageLoaded = true;
	}

</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 py-10 text-center flex flex-col justify-between items-center h-full {$currentEpisode ? 'pb-[115px]' : ''}">

		{#if episodes.length > 0}

			{#each episodes as episode}
			<Card episode={episode} />
			{/each}

		{:else if !pageLoaded}

			<Loading />
			
		{/if}
	</div>
</div>
