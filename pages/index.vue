<template>
	<div class="wrapper">This is main page</div>
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
