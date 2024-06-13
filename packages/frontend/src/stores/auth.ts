import { writable } from 'svelte/store';

export const accessToken = writable<string | null>(null);
export const isAuth = writable<boolean>(false);