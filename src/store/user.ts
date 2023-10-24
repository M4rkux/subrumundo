import { writable } from "svelte/store";

export type User = {
  email: string,
  isPatron: boolean
  token: string
};

export const user = writable<User|null>(null);
