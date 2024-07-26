<template>
	<div class="wrapper">
		<ElementVideo
			:src="dat.src"
			:poster="dat.poster"
			:caption="dat.caption"
		></ElementVideo>
	</div>
</template>

<script setup>
	import 'animate.css'
	// const query = groq`{
	// 	'projects': *[_type == "project" && show == true]{images[]{images[]{asset->}, ...}, ...}| order(orderRank),
	// 	'home': *[_type == "home"]{images[]{asset->}}[0]
	// }`
	// const sanity = useSanity()
	// const { data } = await useAsyncData(() => sanity.fetch(query))

	const { y } = useWindowScroll()

	const dat = {
		src: 'https://player.vimeo.com/external/990639188.m3u8?s=292b77d103fd7574f5b98bc0179f05bb3cd3fc58&logging=false',
		caption: 'caption',
		poster: {
			src: 'https://cdn.sanity.io/images/9tabryc1/production/2e4ed48f601172f9a86ceeff09e1baa467e0d068-1560x808.png',
		},
	}

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

<style></style>
