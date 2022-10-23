<script>
	import { signOut, getSession } from 'lucia-sveltekit/client';
	import { browser } from '$app/environment';
	import { authenticated } from '../../stores/AuthenticatedStore';
	import {goto } from '$app/navigation'
	const session = getSession();

	if (browser) {
		if ($session) {
			const signOutUser = async () => {
				try {
					await signOut('/authentication');
					authenticated.set(false)
				} catch (err) {
					console.log(err);
				}
			};
			signOutUser();
		} else {
			setTimeout(function () {
				authenticated.set(false);
				goto('/authentication');
			}, 1000);
		}
	}
</script>

{#if !$session}
	<h1>You are not logged in! Redirecting to login/registration page...</h1>
{/if}
