<script lang="ts">
	import { PlayEpisode, secondsToHMSFormatted, type Episode } from "$lib";
	import { onMount } from "svelte";
	import { currentEpisode, isPlaying, nextEpisode, prevEpisode } from "../store/player";
	import { ProgressBar } from "@skeletonlabs/skeleton";

  let episode: Episode;

  let title: string;
  let subtitle: string;
  let audioController: HTMLAudioElement;

  $: {
    const splitted = episode ? episode.title.split('-') : [];
    title = splitted[0];
    subtitle = splitted.slice(1).join('-');
  }

  let currentTime = 0;
  let rAF: number;

  function whilePlaying() {
		currentTime = audioController.currentTime;
		rAF = requestAnimationFrame(whilePlaying);
	};

  currentEpisode.subscribe((_currentEpisode) => {
    if (!audioController || !_currentEpisode) return;
    audioController.src = _currentEpisode.audioUrl;
    audioController.load();
  });

  isPlaying.subscribe(async (_isPlaying) => {
    if (!audioController) return;
    if (_isPlaying) {
      try {
        await audioController.play();
      } catch (error) {
        console.error(error);
      }
      requestAnimationFrame(whilePlaying);
    } else {
      cancelAnimationFrame(rAF);
      audioController.pause();
    }
  });

 

  currentEpisode.subscribe((data) => {
    episode = data;
  });

  function onClickPlayEpisode() {
    PlayEpisode(episode);
  }
  
  function onClickPlayPrevEpisode() {
    PlayEpisode($prevEpisode);
  }
  
  function onClickPlayNextEpisode() {
    PlayEpisode($nextEpisode);
  }

  onMount(() => {
    audioController.addEventListener('pause', () => {
      isPlaying.set(false);
    });

    audioController.addEventListener('play', () => {
      isPlaying.set(true);
    });

    audioController.addEventListener('ended',() => {
      PlayEpisode($nextEpisode);
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => { 
      PlayEpisode($nextEpisode);
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => { 
      PlayEpisode($prevEpisode);
    });
  });
</script>
<div class="player {$currentEpisode ? 'player--show' : ''}">
  <div class="player__episode-description">
    <img class="player__image" src={episode?.imageUrl} alt="Episode art"/>
    <div class="flex flex-col items-start justify-center">
      <h4 class="player__title">{title}</h4>
      <h6 class="player__subtitle">{subtitle}</h6>
    </div>
  </div>
  <div class="flex flex-col gap-2 w-full">
    <div>
      <audio bind:this={audioController}>
        <source id="audioSource" src={episode?.audioUrl} />
        O seu navegador não suporta o elemento <code>audio</code>.
        <track kind="captions" />
      </audio>
    </div>
    <div class="player__controls">
      <button type="button" class="player__btn-control btn-icon" disabled="{!$prevEpisode}" on:click={onClickPlayPrevEpisode}>
        <img src="previous.svg" alt="Previous icon" />
      </button>
      <button type="button" class="btn-icon variant-filled w-[36px] h-[36px]" on:click={onClickPlayEpisode}>
        {#if !$isPlaying}
          <img src="play-icon.svg" alt="Play icon" />
        {:else}
          <img src="pause-icon.svg" alt="Pause icon" />
        {/if}
      </button>
      <button type="button" class="player__btn-control btn-icon" disabled="{!$nextEpisode}" on:click={onClickPlayNextEpisode}>
        <img src="next.svg" alt="Next icon" />
      </button>
    </div>
    <div class="flex flex-row items-center gap-4">
      <span class="min-w-[40px]">{episode ? secondsToHMSFormatted(currentTime || 0) : ''}</span>
      <div class="player__progress-bar">
        <ProgressBar
          class="player__progress-bar"
          label="Episode progress Bar"
          value={currentTime}
          max={episode?.duration || 0}
          track="bg-surface-200-700-token"
          meter="bg-primary-700"
        />
      </div>
      <span class="min-w-[40px]">{episode ? secondsToHMSFormatted(episode.duration) : ''}</span>
    </div>
  </div>
</div>

<style lang="scss">
.player {
  @apply fixed bottom-0 h-[100px] w-full flex gap-2 justify-between bg-gray-950 px-4 py-2;
  @apply translate-y-full transition-all;

  @screen sm {
    @apply gap-20;
  }

  &--show {
    @apply translate-y-0;
  }

  &__episode-description {
    @apply flex flex-row gap-4;
  }

  &__image {
    @apply rounded-lg hidden;

    @screen sm {
      @apply block;
    }
  }


  &__title {
    @apply text-sm;

    @screen sm {
      @apply text-xl whitespace-nowrap;
    }
  }

  &__subtitle {
    @apply text-xs;

    @screen sm {
      @apply text-lg;
    }
  }

  &__progress-bar {
    @apply w-full;
  }

  &__controls {
    @apply flex self-center items-center gap-4;
  }

  &__btn-control {
    @apply variant-filled-tertiary w-[26px] h-[26px];

    &:disabled {
      @apply opacity-50;
    }
  }
}
</style>