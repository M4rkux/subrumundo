// place files you want to import through the `$lib` alias in this folder.

import { PUBLIC_BASE_URL } from '$env/static/public';
import { currentEpisode, isPlaying, nextEpisode, patronEpisodes, prevEpisode } from '../store/player';
import { user, type User } from '../store/user';

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
let _patronEpisodes: Episode[] = [];
let _user: User|null;

user.subscribe((data) => {
  _user = data;
});

isPlaying.subscribe((data) => {
  _isPlaying = data;
});

currentEpisode.subscribe((data) => {
  _currentEpisode = data;
});

patronEpisodes.subscribe((data) => {
  _patronEpisodes = data;
});

export async function getEpisodes(page: number = 1, amount: number = 10) {
  const url = `${baseURL}/episode?page=${page}&amount=${amount}`;

  if (page === 1 && amount === 10) {
    const response = await fetch(url);
    return await response.json();
  }

  const response = await fetch(url);
  return await response.json();
}

export async function getPatronEpisodes() {
  if (!_user) return;

  const url = `${baseURL}/patron-episodes`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${_user.token}`,
    },
  });
  return await response.json();
}

export function secondsToHMS(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${hours ? `${hours} hr` : '' } ${minutes ? `${minutes} min` : ''} ${hours ? '' : `${remainingSeconds} sec`} `;
}

export function secondsToHMSFormatted(seconds: number = 0): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${hours ? `${hours.toString().padStart(2, '0')}:` : '' }${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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

async function getNextPrevEpisodes(id: string): Promise<{prev: Episode|null, next: Episode|null}> {
  const response = await fetch(`${baseURL}/episode/next-prev-episode?id=${id}`);
  return await response.json();
}

export async function PlayEpisode(episode: Episode|null) {
  if (!episode) return;
  isPlaying.set(!_isPlaying);

  if (_currentEpisode?.id !== episode.id) {
    currentEpisode.set(episode);
    isPlaying.set(false);
    isPlaying.set(true);
    let prevNextResponse;
    if (!episode.isExclusive) {
      prevNextResponse = await getNextPrevEpisodes(episode.id);
    } else {
      prevNextResponse = getPrevPatronEpisodes(episode.id);
    }
    const {next, prev} = prevNextResponse;
    nextEpisode.set(next);
    prevEpisode.set(prev);
  }
}

function getPrevPatronEpisodes(id: string): {prev: Episode | null, next: Episode | null} {
  const idx = _patronEpisodes.findIndex((episode) => episode.id === id);
  return {
    prev: idx > 0 ? _patronEpisodes[idx-1] : null,
    next: idx < _patronEpisodes.length - 1 ? _patronEpisodes[idx+1] : null,
  }
}

export async function logInWithGoogle(e: CustomEvent) {
  const googleToken = e.detail.user.Oc.id_token;
  const email = e.detail.user.Xx.Sy;

  const response = await fetch(`${baseURL}/authentication/login-with-google`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, googleToken })
  });
  const subscriberUser: User = await response.json();

  if (subscriberUser.token) {
    user.set(subscriberUser);
    sessionStorage.setItem('subscriberUser', JSON.stringify(subscriberUser));
  }
}

export function logOutWithGoogle() {
  user.set(null);
  sessionStorage.removeItem('subscriberUser');
}