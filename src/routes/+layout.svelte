<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Player from '../components/Player.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { page } from '$app/stores';

	inject({ mode: dev ? 'development' : 'production' });

	let isMenuVisible = false;

	function toggleMenu() {
		isMenuVisible = !isMenuVisible;
	}

	page.subscribe(() => {
		isMenuVisible = false;
	});
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<meta charset="utf-8"/>
		<link rel="icon" href="/favicon.ico"/>
		<meta name="viewport" content="width=device-width,initial-scale=1"/>
		<meta name="theme-color" content="#000000"/>
		<meta name="description" content="O melhor podcast de terror do Brasil!"/>
		<meta property="og:title" content="Subrumundo Terror"><meta property="og:site_name" content="Subrumundo Terror"><meta property="og:description" content="O melhor podcast de terror do Brasil!"><meta property="og:url" content="https://subrumundo.web.app/"><meta property="og:locale" content="pt_BR"><meta property="og:type" content="website"/>
		<meta property="og:image" content="https://subrumundo.web.app/logo512.png"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="512"><meta property="og:image:height" content="512"><meta name="robots" content="index, follow, subrumundo, terror, podcast, bruno, contos, histórias, estorias"><link rel="apple-touch-icon" href="logo192.png"/>
		<title>Subrumundo Terror</title>
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">
					<a href="/">Subrumundo</a>
				</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="sm:hidden">
					<button class="navbar-burger flex items-center p-3" on:click={toggleMenu}>
						<svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							{#if isMenuVisible}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
							{:else}
								<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
							{/if}
						</svg>
					</button>
				</div>
				
				<div class="navbar-menu fixed z-50 {isMenuVisible ? 'sm:hidden block' : 'hidden'}">
					<nav class="fixed top-[72px] left-0 bottom-0 flex flex-col w-full py-6 px-6 bg-gray-900">
						<ul>
							<!-- <li class="mb-2">
								<a
									class={`btn w-full ${$page.url.pathname.includes('/patroes') ? 'variant-filled-tertiary' : 'variant-outline-tertiary'}`}
									href="/patroes"
									rel="noreferrer"
								>
									Episódios dos patrões
								</a>
							</li> -->
							<li class="mb-2">
								<a
									class="btn w-full variant-outline-surface"
									href="https://subrumundo-terror.lojaintegrada.com.br"
									target="_blank"
									rel="noreferrer"
								>
									Loja
								</a>
							</li>
							<li class="mb-2">
								<a
									class="btn w-full variant-outline-surface"
									href="https://open.spotify.com/show/0gSRglGiQw35746M4aCytk?si=e303016df2c84bd5"
									target="_blank"
									rel="noreferrer"
								>
									Spotify
								</a>
							</li>
							<li class="mb-2">
								<a
									class="btn w-full variant-outline-surface"
									href="https://www.instagram.com/subrumundo/"
									target="_blank"
									rel="noreferrer"
								>
									Instagram
								</a>
							</li>
							<li class="mb-2">
								<a
									class="btn w-full variant-outline-surface"
									href="https://www.patreon.com/subrumundo"
									target="_blank"
									rel="noreferrer"
								>
									Patreon
								</a>
							</li>
							<li class="mb-2">
								<a
									class="btn w-full variant-outline-surface"
									href="https://www.catarse.me/subrumundoterror"
									target="_blank"
									rel="noreferrer"
								>
									Catarse
								</a>
							</li>
						</ul>
					</nav>
				</div>

				<div class="hidden sm:block">
					<!-- <a
						class={`btn btn-sm ${$page.url.pathname.includes('/patroes') ? 'variant-filled-tertiary' : 'variant-outline-tertiary'}`}
						href="/patroes"
						rel="noreferrer"
					>
						Episódios dos patrões
					</a> -->
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://subrumundo-terror.lojaintegrada.com.br"
						target="_blank"
						rel="noreferrer"
					>
						Loja
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://open.spotify.com/show/0gSRglGiQw35746M4aCytk?si=e303016df2c84bd5"
						target="_blank"
						rel="noreferrer"
					>
						Spotify
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://www.instagram.com/subrumundo/"
						target="_blank"
						rel="noreferrer"
					>
						Instagram
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://www.patreon.com/subrumundo"
						target="_blank"
						rel="noreferrer"
					>
						Patreon
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://www.catarse.me/subrumundoterror"
						target="_blank"
						rel="noreferrer"
					>
						Catarse
					</a>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<Player />
</AppShell>
