<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
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
				<strong class="text-xl uppercase">Subrumundo</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
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
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
