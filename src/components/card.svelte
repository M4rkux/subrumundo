<script lang="ts">
	import { formatDate, type Episode, secondsToHMS } from "$lib";

  export let episode: Episode;
</script>

<div class="episode-card card card-hover bg-initial">
  <div class="flex flex-row">
    <div class="img-wrapper">
      <img src={episode.imageUrl} class="bg-black/50 h-auto w-full" alt={`Image of the episode ${episode.titleNormalized}`} />
    </div>
    <div class="p-4 space-y-4">
      <h3 class="h3 font-bold text-primary-600" data-toc-ignore>{episode.title}</h3>
      <img src={episode.imageUrl} class="bg-black/50 h-auto w-[300px] block md:hidden mx-auto rounded-lg" alt={`Image of the episode ${episode.titleNormalized}`} />
      <article>
        <p class="description">
          <!-- cspell:disable -->
          {@html episode.description}
          <!-- cspell:enable -->
        </p>
      </article>
      <hr class="opacity-50" />
      <footer class="card-footer p-4 flex justify-start items-center space-x-4">
        <div class="flex-auto flex items-center gap-2">
          <button type="button" class="btn-icon variant-filled w-[30px] h-[30px] mr-4">
            <img src="play-icon.svg" alt="Play icon" />
          </button>
          <small>{formatDate(episode.pubDate)}</small>
          -
          <small>{secondsToHMS(episode.duration)}</small>
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

    @screen md {
      @apply flex;
    }
  }

	.description {
		@apply break-words text-left break-all overflow-hidden px-0;

    @screen sm {
      @apply px-10;
    }
	}
</style>
