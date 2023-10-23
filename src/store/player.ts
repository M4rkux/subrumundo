import type { Episode } from '$lib';
import { writable } from 'svelte/store';

export const patronEpisodes = writable<Episode[]>();
export const currentEpisode = writable<Episode>();
export const nextEpisode = writable<Episode|null>();
export const prevEpisode = writable<Episode|null>();
export const isPlaying = writable<boolean>(false);