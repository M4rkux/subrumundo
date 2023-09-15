<script lang="ts">
	import { PlayEpisode, type Episode } from "$lib";
	import { currentEpisode, isPlaying, nextEpisode, prevEpisode } from "../store/player";

  let episode: Episode;

  let title: string;
  let subtitle: string;

  $: {
    const splitted = episode ? episode.title.split('-') : [];
    title = splitted[0];
    subtitle = splitted.slice(1).join('-');
  }

  currentEpisode.subscribe((data) => {
    episode = data;
  });

  function onClickPlayEpisode() {
    PlayEpisode(episode);
  }
</script>



<div class="player {$currentEpisode ? 'player--show' : ''}">
  <div class="player__episode-description">
    <img class="player__image" src={episode?.imageUrl} alt="Episode art"/>
    <div class="flex flex-col items-start justify-center">
      <h4 class="h4">{title}</h4>
      <h6 class="h6">{subtitle}</h6>
    </div>
  </div>
  <div class="player__controls">
    <button type="button" class="player__btn-control" disabled="{!!$prevEpisode?.id}">
      <img src="previous.svg" alt="Previous icon" />
    </button>
    <button type="button" class="btn-icon variant-filled w-[36px] h-[36px] mr-4" on:click={onClickPlayEpisode}>
      {#if !$isPlaying}
        <img src="play-icon.svg" alt="Play icon" />
      {:else}
        <img src="pause-icon.svg" alt="Pause icon" />
      {/if}
    </button>
    <button type="button" class="player__btn-control" disabled="{!!$nextEpisode}">
      <img src="next.svg" alt="Next icon" />
  </button>
  </div>
  <div>
    Volume
  </div>
</div>

<style lang="scss">
.player {
  @apply fixed bottom-0 h-[100px] w-full flex gap-20 justify-between bg-gray-950 px-4 py-2;
  @apply translate-y-full transition-all;

  &--show {
    @apply translate-y-0;
  }

  &__episode-description {
    @apply flex flex-row gap-4;
  }

  &__image {
    @apply rounded-lg;
  }

  &__controls {
    @apply flex items-center;
  }

  &__btn-control {
    @apply btn-icon variant-filled w-[26px] h-[26px] mr-4;

    &:disabled {
      @apply opacity-50;
    }
  }
}
</style>