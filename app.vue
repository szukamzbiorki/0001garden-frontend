<template>
	<div class="page">Hello Garden!</div>
	<!-- <div :style="{ '--window-height': `${height}px` }" class="page">
		<NuxtLink
			:to="about ? '/' : '/about'"
			@click="click()"
			@mouseenter="enter()"
			@mouseleave="leave()"
			:class="[{ hovered: about }, { visible: true }]"
		>
			<img class="screw" src="/assets/screw.png" alt="" srcset="" />
		</NuxtLink>
		<Transition
			enter-active-class="animate__animated animate__rotateInUpRight"
			leave-active-class="animate__animated animate__hinge"
		>
			<PagesMain v-show="!about"></PagesMain>
		</Transition>
		<PagesAbout></PagesAbout>
	</div> -->
	<NuxtPage></NuxtPage>
</template>

<script setup>
	const { currentRoute: route } = useRouter()

	const { height } = useWindowSize()

	const sanity = useSanity()

	const hovered = useHovered()

	definePageMeta({ name: 'index' })
	useHead({
		title: 'Garden',
	})

	const about = computed(() => {
		return route.value?.path == '/about'
	})

	function click() {
		if (about.value) {
			hovered.value = false
		}
	}

	function enter() {
		hovered.value = true
	}

	function leave() {
		hovered.value = false
	}
</script>

<style lang="postcss" scoped>
	.page {
		color: white;
	}
</style>
