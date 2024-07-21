<script setup>
	const ready = ref(false)

	// const { mobile } = useScreenSize()

	onMounted(async () => {
		await document.fonts.ready
		ready.value = true
	})
</script>

<template>
	<div :class="['layout', { ready }]">
		<slot />
	</div>
</template>

<style lang="postcss" scoped></style>
