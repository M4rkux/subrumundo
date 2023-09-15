// place files you want to import through the `$lib` alias in this folder.

import { PUBLIC_BASE_URL } from '$env/static/public';
import { currentEpisode, isPlaying, nextEpisode, prevEpisode } from '../store/player';

export interface Episode {
  id: string,
  guid: string,
  title: string,
  titleNormalized: string,
  slug: string,
  description: string,
  imageUrl: string,
  audioUrl: string,
  isExclusive: boolean,
  isPlayable: boolean,
  isPublished: boolean,
  pubDate: Date,
  duration: number
}

const baseURL = PUBLIC_BASE_URL || 'http://localhost:3000';
let _isPlaying: boolean;
let _currentEpisode: Episode;

isPlaying.subscribe((data) => {
  _isPlaying = data;
});

currentEpisode.subscribe((data) => {
  _currentEpisode = data;
});

export async function getEpisodes(page: number = 1, amount: number = 10) {
  const response = await fetch(`${baseURL}/episode?page=${page}&amount=${amount}`);
  return await response.json();
}

export function secondsToHMS(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours ? `${hours} hr` : '' } ${minutes ? `${minutes} min` : ''} ${hours ? '' : `${remainingSeconds} sec`} `;
}

export function formatDate(inputDate: Date): string {
  const date = new Date(inputDate);
  const monthNames = [
    "Jan", "Fev", "Mar", "Abr",
    "Mai", "Jun", "Jul", "Ago",
    "Set", "Out", "Nov", "Dez"
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];

  return `${day} de ${month}`;
}

async function getNextPrevEpisodes(id: string) {
  const response = await fetch(`${baseURL}/episode/next-prev-episode?id=${id}`);
  return await response.json();
}

export async function PlayEpisode(episode: Episode) {
  if (_currentEpisode?.id === episode.id) {
    isPlaying.set(!_isPlaying);
  } else {
    isPlaying.set(true);
  }
  currentEpisode.set(episode);
  const {next, prev} = await getNextPrevEpisodes(episode.id);
  nextEpisode.set(next);
  prevEpisode.set(prev);
}