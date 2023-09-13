// place files you want to import through the `$lib` alias in this folder.
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

import { PUBLIC_BASE_URL } from '$env/static/public';
const baseURL = PUBLIC_BASE_URL || 'http://localhost:3000';


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