<script>
	import { signOut, getSession } from 'lucia-sveltekit/client';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation'

	let session = getSession();
	$: $session;


	if (browser) {
		if ($session) {
			const signOutUser = async () => {
				try {
					await signOut('/authentication');

				} catch (err) {
					console.log(err);
				}
			};
			signOutUser();
		} else {
			setTimeout(function () {
				goto('/authentication');
			}, 1000);
		}
	}
</script>

{#if !$session}
	<h1>You are not logged in! Redirecting to login/registration page...</h1>
{/if}
