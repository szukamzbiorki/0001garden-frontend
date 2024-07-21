<template>
	<div class="wrapper" :class="{ small: hovered }">
		<Transition
			enter-active-class="animate__animated animate__fadeIn"
			leave-active-class="animate__animated animate__fadeOut"
		>
			<Media
				v-show="!showImage"
				class="random animate__animated animate__tada"
				:medium="data.home.images[r]"
				@click="passed = true"
			></Media>
		</Transition>
		<ElementProjects :slides="data.projects"></ElementProjects>
	</div>
</template>

<script setup>
	import 'animate.css'
	const query = groq`{
		'projects': *[_type == "project" && show == true]{images[]{images[]{asset->}, ...}, ...}| order(orderRank),
		'home': *[_type == "home"]{images[]{asset->}}[0]
	}`
	const sanity = useSanity()
	const { data } = await useAsyncData(() =>
		sanity.fetch(query, { screen: screen })
	)

	const { y } = useWindowScroll()

	const header = ref(null)
	const h = useElementSize(header)

	const r = Math.floor(Math.random() * data.value.home.images?.length)

	const passed = ref(false)

	const active = useActive()

	const hovered = useHovered()

	onMounted(() => {
		setTimeout(() => {
			passed.value = true
		}, 2000)
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

<style lang="postcss">
	:root {
		--animate-duration: 500ms;
		--animate-delay: 0;
	}
	.wrapper {
		min-width: 100vw;
		width: 100vw;
		height: var(--window-height);
		box-sizing: border-box;
		max-width: calc(100vw - 10px);
		transition: transform 0.3s ease;
		transform-origin: top right;
		background-color: white;
		z-index: 2;
		overflow: hidden;

		transform-origin: calc(100vw - 40px) 40px;
		&.small {
			transform: rotate(-10deg);
		}
		box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
	}

	.random {
		position: fixed;
		top: 0;
		width: calc(100vw);
		height: var(--window-height);
		max-height: var(--window-height);
		pointer-events: all;
		z-index: 1500;
		animation-duration: 1.5s; /* don't forget to set a duration! */
		animation-delay: 0.5s;
		cursor: url('/assets/grey-pointer.svg'), pointer;
		@media screen and (max-width: 640px) {
			pointer-events: none;
		}
		& > img {
			object-fit: contain;
			object-position: center center;
			z-index: 1500;
		}
	}
</style>
