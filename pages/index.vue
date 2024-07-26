<template>
	<div class="wrapper">
		This is main page
		<ElementVideo
			:src="dat.src"
			:poster="dat.poster"
			:caption="dat.caption"
		></ElementVideo>
	</div>
</template>

<script setup>
	import 'animate.css'
	const query = groq`{
		'projects': *[_type == "project" && show == true]{images[]{images[]{asset->}, ...}, ...}| order(orderRank),
		'home': *[_type == "home"]{images[]{asset->}}[0]
	}`
	const sanity = useSanity()
	const { data } = await useAsyncData(() => sanity.fetch(query))

	const { y } = useWindowScroll()

	const dat = {
		src: 'https://player.vimeo.com/progressive_redirect/playback/990639188/rendition/1440p/file.mp4?loc=external&log_user=0&signature=77a06b0492473bb688796977894dc75eb32a7b9d6199b2c22d7c01436cd29cec',
		caption: 'caption',
		poster: {
			src: 'https://cdn.sanity.io/images/9tabryc1/production/2e4ed48f601172f9a86ceeff09e1baa467e0d068-1560x808.png',
		},
	}

	const header = ref(null)
	const h = useElementSize(header)

	const r = Math.floor(Math.random() * data.value.home.images?.length)

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
