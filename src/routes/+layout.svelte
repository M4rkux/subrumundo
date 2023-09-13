<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
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
