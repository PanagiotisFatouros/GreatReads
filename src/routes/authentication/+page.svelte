<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getSession } from 'lucia-sveltekit/client';
	const session = getSession();
	if ($session) {
		if (browser) {
			goto('/authentication/success');
		}
	}
</script>

<form method="POST" action="?/login">
    Enter Username:<input name="username" type="username">
    Enter Password:<input name="password" type="password">
    <button>Login</button>
    <button formaction="?/register">Register</button>
</form>
