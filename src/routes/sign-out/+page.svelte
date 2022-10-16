<script>
	import { signOut, getSession } from 'lucia-sveltekit/client';
	import { browser } from '$app/environment';
	import { authenticated } from '../../stores/AuthenticatedStore';
	const session = getSession();

	if (browser) {
		if ($session) {
			const signOutUser = async () => {
				try {
					await signOut();
					window.location.href = '/';
				} catch (err) {
					console.log(err);
				}
			};
			signOutUser();
			authenticated.set(false)
		} else {
			setTimeout(function () {
				window.location.href = '/authentication/login';
			}, 2000);
		}
	}
</script>

{#if !$session}
	<h1>You are not logged in! Redirecting to login/registration page...</h1>
{/if}
