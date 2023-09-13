// place files you want to import through the `$lib` alias in this folder.

import anchorme from "anchorme";

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


export async function getEpisodes(page: number = 1, amount: number = 10) {
  const response = await fetch(`http://localhost:3000/episode?page=${page}&amount=${amount}`);
  const data = await response.json();
  data.episodes = data.episodes.map((episode: Episode) => {
    episode.description = episode.description.replaceAll('\n', '<br>');
    episode.description = anchorme({
      input: episode.description,
      options: {
          attributes: {
              target: "_blank",
              class: "anchor",
          },
      },
      extensions: [
        {
          test: /\B@([\w-]+)/gim,
          transform: string =>
            `<a target="_blank" href="https://instagram.com/${string.substr(1)}">${string}</a>`
        }
      ]
    });

    return episode;
  });

  return data;
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