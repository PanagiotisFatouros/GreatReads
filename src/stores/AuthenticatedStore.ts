import { browser } from "$app/environment";
import { writable } from 'svelte-local-storage-store'

export const authenticated = writable('authenticated', false)

authenticated.subscribe((value) => {
    if (browser) return (localStorage.authenticated = value)})