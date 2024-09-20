<template>
	<transition name="fade">
		<div v-if="true" class="cookie">
			<div class="text">
				Garden uses cookies and similar technologies to provide you with a better
				experience. I feel sick. Quite literally. I feel my body is processing something.
				Possibly there is an underlying psychological thing that I haven't worked through
				yet. Anyway, I feel like I am becoming stupid. All I do is sit behind this desk.
				The only interaction I have is with my computer. I don't know. I can't even call
				it interaction. Further details can be found in the privacy information.
			</div>
			<div class="buttons">
				<div @click="update({ cookie: false })" class="close">Accept</div>
				<div @click="update({ cookie: false })" class="close">Reject</div>
			</div>
		</div>
	</transition>
</template>

<script setup>
	const { session, update } = await useSession()
	setTimeout(() => {
		console.log(session.value)
	}, 2000)
</script>

<style lang="postcss" scoped>
	.cookie {
		background-color: var(--darkgrey);
		color: white !important;
		bottom: var(--space-m);
		left: var(--space-m);
		top: initial !important;
		width: calc(100vw - 2 * var(--space-m));
		padding: var(--space-m);
		display: flex;
		flex-direction: row;
		gap: var(--space-l);
		border-radius: var(--border-radius);
		& > .buttons {
			display: flex;
			flex-direction: row;
			gap: var(--space-s);
			& > .close {
				background-color: white;
				padding: var(--space-s) var(--space-l);
				height: fit-content;
				color: var(--darkgrey);
				cursor: pointer;
				border-radius: var(--border-radius);
			}
		}
	}
</style>
