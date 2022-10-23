<script lang="ts">
	import type { Client } from 'src/types/book.type';
	import { page } from '$app/stores';
    import { goto } from '$app/navigation'
	import { RingLoader } from 'svelte-loading-spinners';

	/** @type {import('./$types').PageData} */
	export let data;

	let user: Client = data.client;
	console.log(user);

	let fullName: string = user.name;
	const baseURL: String = $page.url.origin;
	const hiddenPassword = '';
	let password: string = hiddenPassword;
	let confirmPassword: string = hiddenPassword;
	const pwRE = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

	let bio: string = user.bio || '';
	let favAuthor: string = user.favAuthor || '';
	let favGenre: string = user.favGenre || '';

	let isEdittingAccountInfo: boolean = false;
	let isEdittingProfileDetails: boolean = false;

	let isUpdatingProfilePic: boolean = false;

	function onEditAccountInfo() {
		isEdittingAccountInfo = true;
	}

	function onCancelEditAccountInfo() {
		fullName = user.name;

		password = hiddenPassword;
		confirmPassword = hiddenPassword;

		isEdittingAccountInfo = false;
	}

	async function updateAccountInfo() {
		if (fullName != ''  && password != '') {
			//TODO: save name and email changes to database

			const body:any = {
				userId: user.id
			}

			if (password != hiddenPassword) {
				if (!pwRE.test(password)) {
					alert('Password must contain at least 8 characters including a number, a lowercase letter, and an uppercase letter.');
					return
				} else if (password === confirmPassword) {
					body.password = password;
				} else {
					alert('Passwords do not match.');
					return;
				}
			}

			if (fullName != user.name) {
				body.name = fullName
			}
			console.log(body);
			
			await fetch(`${baseURL}/api/update/settings/account-settings`, {
				method: 'PUT',
				body: JSON.stringify(body)
			});

			user.name = fullName;
			password = hiddenPassword;
			confirmPassword = hiddenPassword;
			isEdittingAccountInfo = false;

		} else {
			alert('Fields cannot be left empty.');
		}
	}

	function onChangePassword() {
		if (password == hiddenPassword) {
			password = '';
		}
		if (confirmPassword == hiddenPassword) {
			confirmPassword = '';
		}
	}

	function onCancelEditProfileDetails() {
		bio = user.bio || '';
		favAuthor = user.favAuthor || '';
		favGenre = user.favGenre || '';

		isEdittingProfileDetails = false;
	}

	async function updateProfileDetails() {
		//fields can be left empty
		await fetch(`${baseURL}/api/update/settings/profile-details`, {
			method: 'PUT',
			body: JSON.stringify({
				userId: user.id,
				favAuthor: favAuthor,
				favGenre: favGenre,
				bio: bio
			})
		})

		user.favAuthor = favAuthor;
		user.favGenre = favGenre;
		user.bio = bio;

		isEdittingProfileDetails = false;
	}

	let fileInput: HTMLInputElement;

	let uploadedPic: string = user.profilePic;
	$: uploadedPic;

	async function updateUserProfilePic(id: String, mimeType: String, profilePic: String, length: Number) {
		await fetch(`${baseURL}/api/update/settings/profilepic/`, {
			method: 'POST',
			body: JSON.stringify({
				id: id,
				mimeType: mimeType,
				profilePic: profilePic,
				length: length
			})
		});
	}

	function handleFileSelected(event) {
		
		let image = event.target?.files[0];
		const mimeType: string = image.type;

		if (mimeType == 'image/jpeg' || mimeType == 'image/png') {
			isUpdatingProfilePic = true;

			let reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = async (e) => {
				let result = e.target?.result;
				if (result && typeof result === 'string') {
					isUpdatingProfilePic = false
          			uploadedPic = result;
					updateUserProfilePic(user.id, mimeType, result, image.size);
				}
			};
		} else {
			alert('Only jpg/jpeg and png files are allowed.');
		}
	}
</script>

{#if isUpdatingProfilePic}
<div class='fixed w-full flex justify-center mt-5'>
	<!-- <Circle2 colorInner={'#424C55'} colorCenter={'#15B097'} colorOuter={'#FF6663'}/> -->
	<RingLoader color={'#FF6663'} />
</div>
{/if}

<div class="mx-5 my-4">
	<div class="flex justify-between items-center w-full">
		<h1 class=" text-secondary">Account Settings</h1>

		<button on:click={() => goto(`/profile/${user.id}`)} class="btn bg-secondary w-32 h-8 text-body2 text-white rounded-full">View Profile</button>
	</div>
	
	<div class="flex">
		<!-- left side - profile pic -->
		<div class="flex flex-col self-start justify-center items-center mt-5">
			<!-- profile pic wrapper -->
			<div
				class=" w-64 h-64 mx-24 mb-5 bg-white rounded-full overflow-hidden flex justify-center items-center"
			>
				
				{#if uploadedPic != "default"}
					<img src={uploadedPic} class=" w-full h-full object-cover" alt="profile" />
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-full h-full text-primary-3"
					>
						<path
							fill-rule="evenodd"
							d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</div>
			<button on:click={() => fileInput.click()} class="std_button w-44"
				>Upload New Photo</button
			>
			<input
				type="file"
				accept=".jpg, .jpeg, .png"
				on:change={handleFileSelected}
				bind:this={fileInput}
				class="hidden"
			/>
		</div>

		<!-- right side - account info/profile details -->
		<div class=" mt-8 mr-24 w-full font-body space-y-8">
			<!-- account info -->
			<div class="flex flex-col space-y-5">
				<div class="flex space-x-2">
					<h2 class="text-secondary">Account Information</h2>

					{#if !isEdittingAccountInfo}
						<button on:click={onEditAccountInfo} class="hover:opacity-70">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 text-accent"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
						</button>
					{/if}
				</div>

				<!-- row -->
				<div class=" flex space-x-5 w-full">
					<!-- input and label pair -->
					<div class=" w-1/2">
						<div class="flex text-accent ml-3 mb-1 space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
								/>
							</svg>

							<p>Full Name</p>
						</div>
						<input
							type="text"
							bind:value={fullName}
							disabled={!isEdittingAccountInfo}
							class=" bg-primary-1 rounded-full px-3 py-2 w-full disabled:opacity-50"
						/>
					</div>

					<!-- to keep space even -->
					<div class=" w-1/2 "></div>
				</div>

				<!-- row -->
				<div class=" flex space-x-5 w-full">
					<!-- input and label pair -->
					<div class=" w-1/2 ">
						<div class="flex text-accent ml-3 mb-1 space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
							</svg>
							<p>New Password</p>
						</div>
						<input
							type="password"
							bind:value={password}
							placeholder="********"
							disabled={!isEdittingAccountInfo}
							on:click={onChangePassword}
							class=" bg-primary-1 rounded-full px-3 py-2 w-full disabled:opacity-50"
						/>
					</div>

					<div class=" w-1/2">
						<div class="flex text-accent ml-3 mb-1 space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
							  </svg>
							<p>Confirm Password</p>
						</div>
						<input
							type="password"
							bind:value={confirmPassword}
							placeholder="********"
							disabled={!isEdittingAccountInfo}
							on:click={onChangePassword}
							class=" bg-primary-1 rounded-full px-3 py-2 w-full items-center disabled:opacity-50"
						/>
					</div>
				</div>

				{#if isEdittingAccountInfo}
					<!-- buttons -->
					<div class=" self-center space-x-3">
						<button on:click={onCancelEditAccountInfo} class="std_button w-32 py-1 bg-primary-3"
							>Cancel</button
						>
						<button on:click={updateAccountInfo} class="std_button w-32 py-1">Update</button>
					</div>
				{/if}
			</div>

			<!-- profile details -->
			<div class="flex flex-col space-y-5">
				<div class="flex space-x-2">
					<h2 class="text-secondary">Profile Details</h2>

					{#if !isEdittingProfileDetails}
						<button on:click={() => (isEdittingProfileDetails = true)} class="hover:opacity-70">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 text-accent"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
						</button>
					{/if}
				</div>

				<!-- bio label and input -->
				<div class=" w-full">
					<div class="flex text-accent ml-3 mb-1 space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
							/>
						</svg>

						<p>Bio</p>
					</div>
					<textarea
						bind:value={bio}
						rows="5"
						disabled={!isEdittingProfileDetails}
						class="std_text_area w-full rounded-3xl px-3 disabled:opacity-50"
					/>
				</div>

				<!-- row -->
				<div class=" flex space-x-5 w-full">
					<!-- input and label pair -->
					<div class=" w-1/2">
						<div class="flex text-accent ml-3 mb-1 space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
								/>
							</svg>

							<p>Favourite Author</p>
						</div>
						<input
							type="text"
							bind:value={favAuthor}
							disabled={!isEdittingProfileDetails}
							class=" bg-primary-1 rounded-full px-3 py-2 w-full disabled:opacity-50"
						/>
					</div>

					<div class=" w-1/2">
						<div class="flex text-accent ml-3 mb-1 space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
								/>
							</svg>

							<p>Favourite Genre</p>
						</div>
						<input
							type="text"
							bind:value={favGenre}
							disabled={!isEdittingProfileDetails}
							class=" bg-primary-1 rounded-full px-3 py-2 w-full disabled:opacity-50"
						/>
					</div>
				</div>

				{#if isEdittingProfileDetails}
					<!-- buttons -->
					<div class=" self-center space-x-3">
						<button on:click={onCancelEditProfileDetails} class="std_button w-32 py-1 bg-primary-3"
							>Cancel</button
						>
						<button on:click={updateProfileDetails} class="std_button w-32 py-1">Update</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
