import { writable } from 'svelte-local-storage-store'

export const authenticated = writable('authenticated', false)