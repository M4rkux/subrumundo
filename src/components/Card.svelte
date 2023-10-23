<script lang="ts">
	import { formatDate, type Episode, secondsToHMS, PlayEpisode } from "$lib";
	import { currentEpisode, isPlaying } from "../store/player";

  export let episode: Episode;

  $: isCurrentEpisodePlaying = $isPlaying && $currentEpisode?.id === episode.id;

  function onClickPlayEpisode() {
    PlayEpisode(episode);
  }
</script>

<div class="episode-card card bg-initial">
  <div class="flex flex-row">
    {#if episode.imageUrl}
      <div class="img-wrapper">
        <img src={episode.imageUrl} class="bg-black/50 h-auto w-full" alt={`Image of the episode ${episode.titleNormalized}`} />
      </div>
    {/if}
    <div class="p-3 space-y-4">
      <h3 class="h3 font-bold { $currentEpisode?.id === episode.id ? 'text-primary-600' : 'text-gray-200' }" data-toc-ignore>{episode.title}</h3>
        {#if episode.imageUrl}
          <img src={episode.imageUrl} class="bg-black/50 h-auto w-[300px] block lg:hidden mx-auto rounded-lg" alt={`Image of the episode ${episode.titleNormalized}`} />
        {/if}
        {#if episode.description}
        <article>
          <p class="description">
            <!-- cspell:disable -->
            {@html episode.description}
            <!-- cspell:enable -->
          </p>
        </article>
      {/if}
      <hr class="opacity-50" />
      <footer class="flex justify-start items-center px-4 space-x-4">
        <div class="flex-auto flex items-center gap-2">
          <div class="relative flex flex-col">
            <button type="button" class="btn-icon variant-filled w-[30px] h-[30px] mr-4 {isCurrentEpisodePlaying ? 'btn-glow' : ''}" on:click={onClickPlayEpisode}>
              {#if !isCurrentEpisodePlaying}
                <img src="play-icon.svg" alt="Play icon" />
              {:else}
                <img src="pause-icon.svg" alt="Pause icon" />
              {/if}
            </button>
          </div>
          {#if episode.pubDate}
          <small>{formatDate(episode.pubDate)}</small>
          {/if}
          {#if episode.duration}
          ·
          <small>{secondsToHMS(episode.duration)}</small>
          {/if}
        </div>
      </footer>
    </div>
  </div>
</div>

<style lang="scss">
	.episode-card {
		@apply overflow-hidden w-full max-w-[95vw];
	}

  .img-wrapper {
    @apply hidden items-center w-1/3 max-w-[450px] bg-black;

    @screen lg {
      @apply flex;
    }
  }

	.description {
		@apply break-words text-left break-all overflow-hidden px-0;

    @screen sm {
      @apply px-10;
    }
	}

	.btn-glow {
		@apply transition-all;
		animation: pulse 2s ease infinite;
	}
	@keyframes pulse {
    0% {
      box-shadow: 0px -2px 6px 3px rgba(191, 20, 54, 0.5);
    }
		25% {
			box-shadow: 2px 0px 6px 3px rgba(191, 20, 54, 0.5);
		}
		50% {
			box-shadow: 2px 2px 6px 3px rgba(191, 20, 54, 0.5);
		}
		75% {
			box-shadow: -2px 0px 6px 3px rgba(191, 20, 54, 0.5);
		}
		100% {
			box-shadow: 0px -2px 6px 3px rgba(191, 20, 54, 0.5);
		}
	}
</style>
