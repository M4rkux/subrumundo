<script lang="ts">
	import { onMount } from 'svelte';
	import { getEpisodes, type Episode} from "$lib";
	import { Paginator } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Card from '../components/Card.svelte';
	import Loading from '../components/Loading.svelte';
	import { currentEpisode } from '../store/player';

	let currentPage: number = 0;
	let amount: number = 10;
	let episodes: Episode[] = [];
	let total = 0;
	let pageLoaded = false;

	onMount(() => {
		const { searchParams } = $page.url;
		if (Number(searchParams.get('page')) >= 1) {
			currentPage = Number(searchParams.get('page')) - 1;
		}
		if (searchParams.has('amount')) {
			amount = Number(searchParams.get('amount'));
		}
		getEpisodesByPage();
		pageLoaded = true;
	});

	page.subscribe((data) => {
		const { searchParams } = data.url;
		let newPage = 0;
		if (Number(searchParams.get('page')) >= 1) {
			newPage = Number(searchParams.get('page')) - 1;
		}
		if (newPage !== currentPage && pageLoaded) {
			currentPage = newPage;
			getEpisodesByPage();
		}
	});

	function updateUrl() {
		const searchParams = amount > 10 ? new URLSearchParams({
			'page': (currentPage + 1).toString(),
			'amount': amount.toString()
		}) : new URLSearchParams({'page': (currentPage + 1).toString()});
		goto(`${$page.url.pathname}?${searchParams.toString()}`);
	}

	function onPageChange(e: CustomEvent): void {
		currentPage = e.detail;
		getEpisodesByPage();
		updateUrl();
	}

	function onAmountChange(e: CustomEvent): void {
		amount = e.detail;
		getEpisodesByPage();
		updateUrl();
	}
	
	async function getEpisodesByPage() {
		episodes = [];
		const data = await getEpisodes(currentPage + 1, amount);
		episodes = data.episodes;
		total = data.total;
	}

</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 py-10 text-center flex flex-col justify-between items-center h-full {$currentEpisode ? 'pb-[115px]' : ''}">

		{#if total > 0 }
			<Paginator
				justify="justify-between"
				controlVariant="variant-outline"
				on:page={onPageChange}
				on:amount={onAmountChange}
				showNumerals
				showPreviousNextButtons
				amountText="episódios"
				settings={{page: currentPage, amounts: [10, 25], size: total, limit: amount}}
				separatorText="de">
			</Paginator>
		{/if}

		{#if episodes.length > 0}

			{#each episodes as episode}
			<Card episode={episode} />
			{/each}

		{:else}

			<Loading />
			
		{/if}

		{#if total > 0 }
			<Paginator
				justify="justify-between"
				controlVariant="variant-outline"
				on:page={onPageChange}
				on:amount={onAmountChange}
				showNumerals
				showPreviousNextButtons
				amountText="episódios"
				settings={{page: currentPage, amounts: [10, 25], size: total, limit: amount}}
				separatorText="de">
			</Paginator>
		{/if}
	</div>
</div>
