<script lang="ts">
	import { onMount } from 'svelte';
	import { getEpisodes, type Episode, secondsToHMS, formatDate } from "$lib";
	import { Paginator } from '@skeletonlabs/skeleton';

	let page: number = 0;
	let amount: number = 10;
	let episodes: Episode[] = [];
	let total = 0;

	onMount(async () => {
		getEpisodesFromPage();
	});

	function onPageChange(e: CustomEvent): void {
		page = e.detail;
		getEpisodesFromPage();
	}

	function onAmountChange(e: CustomEvent): void {
		amount = e.detail;
		getEpisodesFromPage();
	}
	
	async function getEpisodesFromPage() {
		const data = await getEpisodes(page + 1, amount);
		episodes = data.episodes;
		total = data.total;
	}

</script>
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 py-10 text-center flex flex-col items-center">

		{#if episodes.length > 0}

		<Paginator justify="justify-between" controlVariant="variant-outline" on:page={onPageChange} on:amount={onAmountChange} showNumerals showPreviousNextButtons amountText="episódios" settings={{page, amounts: [10, 25], size: 300, limit: 10}} separatorText="de"></Paginator>

			{#each episodes as episode}
			<div class="episode-card card card-hover bg-initial">
				<div class="flex flex-row">
					<div class="flex items-center max-w-[33vw] bg-black">
						<img src={episode.imageUrl} class="bg-black/50 h-auto max-w-full" alt={`Image of the episode ${episode.titleNormalized}`} />
					</div>
					<div class="p-4 space-y-4">
						<h3 class="h3 font-bold text-primary-600" data-toc-ignore>{episode.title}</h3>
						<article>
							<p class="text-left text-ellipsis whitespace-nowrap overflow-hidden px-10">
								<!-- cspell:disable -->
								{@html episode.description}
								<!-- cspell:enable -->
							</p>
						</article>
						<hr class="opacity-50" />
						<footer class="card-footer p-4 flex justify-start items-center space-x-4">
							<div class="flex-auto flex justify-between items-center">
								<small>{formatDate(episode.pubDate)}</small>
								<small>{secondsToHMS(episode.duration)}</small>
							</div>
						</footer>
					</div>
				</div>
			</div>
			{/each}

			<Paginator justify="justify-between" controlVariant="variant-outline" on:page={onPageChange} on:amount={onAmountChange} showNumerals showPreviousNextButtons amountText="episódios" settings={{page, amounts: [10, 25], size: 300, limit: 10}} separatorText="de"></Paginator>
		{/if}
		{#if episodes.length === 0}
		<figure>
			<section class="img-bg" />
			<img
				src="https://subrumundo.web.app/static/media/subrumundo.e92ca438.svg"
				class="fill-token h-[250px]"
				alt="Subrumundo logo"
				/>
		</figure>
		{/if}
	</div>
</div>

<style lang="scss">
	.episode-card {
		@apply overflow-hidden;
	}

	.description-link {
		@apply accent-current font-semibold;
	}

	.description {
		@apply break-words text-ellipsis;
	}

	figure {
		@apply flex relative flex-col;
	}
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
