<template>
	<div
		class="workimage"
		:data-format="format"
		:style="`aspect-ratio: ${ratio};`"
		v-if="medium.asset"
	>
		<transition name="fade">
			<!-- <div
				v-if="medium.asset.metadata"
				class="workimageasset grad"
				v-show="!imageloaded"
				:data-format="format"
				:style="`aspect-ratio: ${ratio}; --bg: ${medium.asset.metadata.palette.lightVibrant.foreground}; --fg: ${medium.asset.metadata.palette.lightVibrant.background};`"
			></div> -->
			<img
				ref="img"
				v-show="!imageloaded"
				class="workimageasset grad"
				:src="
					mobile
						? $urlFor(medium).width(50).url()
						: $urlFor(medium).height(80).url()
				"
				:data-format="format"
			/>
		</transition>
		<transition name="fade">
			<img
				ref="img"
				v-show="imageloaded"
				@load="onloaded"
				class="workimageasset big"
				:src="
					mobile
						? $urlFor(medium)
								.width(Math.floor(windowWidth * 2.2))
								.url()
						: $urlFor(medium)
								.height(Math.floor(windowHeight * 1.6))
								.url()
				"
				:data-format="format"
			/>
		</transition>
	</div>
</template>

<script setup>
	const { height: windowHeight, width: windowWidth } = useWindowSize()
	const { mobile } = useScreenSize()
	const imageloaded = ref(false)
	const format = ref('')

	const props = defineProps({
		medium: Object,
		size: {
			type: String,
			default: 'large',
		},
		caption: {
			type: String,
			default: '',
		},
		showCaption: {
			type: Boolean,
			default: false,
		},
		srcs: {
			type: Object,
			default: {},
		},
		url: {
			type: String,
			default: '',
		},
		w: {
			type: Number,
			default: () => {},
		},
		h: {
			type: Number,
			default: () => {},
		},
		alt: {
			type: String,
			default: '',
		},
		mobile: {
			type: Object,
			default: () => {},
		},
		theme: {
			type: String,
			default: '',
		},
		lazy: {
			type: Boolean,
			default: true,
		},
		ratio: {
			type: Array,
			default: [],
		},
	})

	let ratiodata
	let ratio

	if (props.medium.asset?._ref) {
		ratiodata = props.medium.asset?._ref.split(/(?:-|x)+/)
		ratio = ratiodata[2] + '/' + ratiodata[3]
	} else {
		ratiodata = props.medium.asset?._id.split(/(?:-|x)+/)
		if (ratiodata) {
			ratio = ratiodata[2] + '/' + ratiodata[3]
		}
	}

	function onloaded() {
		imageloaded.value = true
	}
</script>

<style>
	.workimage {
		display: grid;
		height: 100%;
		& > * {
			grid-area: 1/1;
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

		&.full {
			& > * {
				object-fit: cover;
				object-position: center center; /* Center the cropped area */
			}
		}
	}
	.grad {
		/* background: linear-gradient(var(--fg), var(--bg)); */
		/* border: solid var(--fg) 2px; */
		height: 100%;
	}
</style>
