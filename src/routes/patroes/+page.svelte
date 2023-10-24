<script lang="ts">
	import { onMount } from 'svelte';
	import { getPatronEpisodes, type Episode, logInWithGoogle, logOutWithGoogle} from "$lib";
	import Card from '../../components/Card.svelte';
	import Loading from '../../components/Loading.svelte';
	import { currentEpisode, patronEpisodes } from '../../store/player';
	import { GoogleAuth } from '@beyonk/svelte-social-auth'
	import { PUBLIC_CLIENT_ID } from '$env/static/public';
	import { user, type User } from '../../store/user';

	let episodes: Episode[] = [];
	let pageLoaded = false;
	let _patronEpisodes: Episode[] = [];
	let _user: User|null;
	const clientId = PUBLIC_CLIENT_ID;

	patronEpisodes.subscribe((data) => {
		_patronEpisodes = data;
	});

	user.subscribe((data) => {
		_user = data;
		getEpisodesByPage();
	});

	onMount(() => {
		if (!_user) {
			const subscriberUserJson = sessionStorage.getItem('subscriberUser');
			if (subscriberUserJson) {
				user.set(JSON.parse(subscriberUserJson));
			}
		}
		getEpisodesByPage();
	});

	async function getEpisodesByPage() {
		episodes = [];
		pageLoaded = false;

		if (_user?.isPatron) {
			if (_patronEpisodes?.length) {
				episodes = _patronEpisodes;
			} else {
				const data = await getPatronEpisodes();
				episodes = data.episodes;
			}
		}
		patronEpisodes.set(episodes);
		pageLoaded = true;
	}

</script>

<div class="container h-full mx-auto flex justify-center items-center {$currentEpisode ? 'pb-[115px]' : ''}">
	<div class="space-y-10 py-10 text-center flex flex-col justify-between items-center h-full">

		{#if !_user?.token}
		<div>
			<GoogleAuth
				clientId={clientId}
				text="Login com Google"
				on:auth-success={logInWithGoogle} />

				<div class="mt-20 text-xl">
					Você precisa logar com o Google para ver os episódios.
				</div>
		</div>
		{:else}
			<div class="flex w-full">
				<button class="btn btn-sm variant-outline-error" on:click={logOutWithGoogle}>
					Deslogar de {_user.email}
				</button>
			</div>
		{/if}
		{#if _user?.isPatron}
		
			{#if episodes.length > 0}

				{#each episodes as episode}
				<Card episode={episode} />
				{/each}

			{:else if !pageLoaded}

				<Loading />
			{:else}
				<div class="mt-20 text-xl">
					Seus episódios exlusivos aparecerão aqui.
				</div>
			{/if}
		{/if}
	</div>
</div>
