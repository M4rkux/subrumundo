import type { Episode } from '$lib';
import { writable } from 'svelte/store';

export const currentEpisode = writable<Episode>();
export const nextEpisode = writable<Episode>();
export const prevEpisode = writable<Episode>();
export const isPlaying = writable<boolean>(false);