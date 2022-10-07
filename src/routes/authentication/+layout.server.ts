import { getSession } from 'lucia-sveltekit/client';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export function checkAuth() {
  const session = getSession()
  if (session) {
    if (browser) {
      goto('/')
    }
  }
}