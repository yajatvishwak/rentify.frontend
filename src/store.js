import { writable } from "svelte/store";
export const store = writable(
  localStorage.getItem("store") || JSON.stringify({ username: null })
);
store.subscribe((val) => localStorage.setItem("store", val));
