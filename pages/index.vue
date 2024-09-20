<template>
	<div class="wrapper">
		<ElementVideo
			:src="data.home.background.src"
			:poster="data.home.background.poster"
		></ElementVideo>
		<div class="page">
			<a href="https://0000.garden" class="archive">Archive</a>
			<div class="middle">
				<div class="logo">
					<img class="logo-img" src="/assets/garden-logo.svg" alt="" srcset="" />
				</div>

				<form class="input" @submit.prevent="handleSubmit">
					<input
						class="text"
						type="email"
						name="email"
						placeholder="Enter your e-mail address"
						required
					/>
					<div class="button">
						<input class="btn" type="submit" value="Enter mailinglist" />
					</div>
					<!-- <div class="button" @click="handleGet">Get</div> -->
				</form>
			</div>
			<Cookie></Cookie>
		</div>
	</div>
</template>

<script setup>
	import 'animate.css'

	const GOOGLE_SERVICE_ACCOUNT_KEY = useRuntimeConfig().public.GOOGLE_SERVICE_ACCOUNT_KEY
	console.log(GOOGLE_SERVICE_ACCOUNT_KEY)

	async function handleSubmit(e) {
		const email = e.target.email.value
		const requestOptions = {
			method: 'POST',
			body: { email },
		}
		const { response } = await $fetch('/api/submit', requestOptions)
		console.log(response)
	}

	async function handleGet(e) {
		const requestOptions = {
			method: 'GET',
		}
		const { response } = await $fetch('/api/submit', requestOptions)
		console.log(response)
	}

	const query = groq`{
		'home': *[_type == "home"]{background->}[0]
	}`
	const sanity = useSanity()
	const { data } = await useAsyncData(() => sanity.fetch(query))

	const { y } = useWindowScroll()

	const passed = ref(false)

	const active = ref(false)

	onMounted(() => {
		setTimeout(() => {
			passed.value = true
		}, 3500)
	})

	watch(y, (newY) => {
		if (newY > 0) {
			active.value = true
		}
	})

	const showImage = computed(() => {
		return active.value || passed.value
	})

	definePageMeta({
		name: 'indexah',
	})
</script>

<style scoped lang="postcss">
	.page {
		& > * {
			position: absolute;
		}
		& > .archive {
			top: var(--space-m);
			right: var(--space-m);
			color: var(--lightgrey);
		}
		& > .middle {
			top: 50vh;
			left: 50vw;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			gap: var(--space-xl);
			user-select: none;

			@media screen and (max-width: 640px) {
				width: calc(100vw - 2 * var(--space-m));
			}

			& > .logo {
				& > * {
					height: 4rem;
					pointer-events: none;
				}
			}
			& > .input {
				display: flex;
				flex-direction: row;
				gap: var(--space-m);

				@media screen and (max-width: 640px) {
					flex-direction: column;
					width: 100%;
				}
				& > .text {
					min-width: 20vw;
				}
				& > .button {
					mix-blend-mode: difference;
					& > * {
						@media screen and (max-width: 640px) {
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>
