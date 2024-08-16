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
					<img
						class="logo-img"
						src="/assets/garden-logo.svg"
						alt=""
						srcset=""
					/>
				</div>

				<div class="input">
					<input
						class="text"
						type="text"
						placeholder="Enter your e-mail address"
					/>
					<div class="button">
						<input class="btn" type="submit" value="Enter mailinglist" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import 'animate.css'
	const query = groq`{
		'home': *[_type == "home"]{background->}[0]
	}`
	const sanity = useSanity()
	const { data } = await useAsyncData(() => sanity.fetch(query))

	console.log(data.value.home.background.src)
	console.log(data.value.home.background)

	const { y } = useWindowScroll()

	const header = ref(null)
	const h = useElementSize(header)

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
		}
		& > .middle {
			top: 50vh;
			left: 50vw;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			gap: var(--space-xl);

			@media screen and (max-width: 640px) {
				width: calc(100vw - 2 * var(--space-m));
			}

			& > .logo {
				& > * {
					height: 6rem;
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
