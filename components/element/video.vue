<script setup>
	import { useCurrentElement } from '@vueuse/core'
	import Hls from 'hls.js'

	const props = defineProps({
		caption: {
			type: String,
			default: '',
		},
		showCaption: {
			type: Boolean,
			default: false,
		},
		src: {
			type: String,
			default: '',
		},
		ratio: {
			type: Array,
			default: [],
		},
		mobile: {
			type: Object,
			default: () => {},
		},
		theme: {
			type: String,
			default: '',
		},
		poster: {
			type: Object,
			default: {},
		},
		autoplay: {
			type: Boolean,
			default: false,
		},
	})

	const { mobile } = useScreenSize()
	const video = ref()
	const el = useCurrentElement()
	let hls

	const src = computed(() => props.src)
	// !mq.m && props.mobile?.src ? props.mobile.src : props.src

	const ratio = computed(() =>
		!mq.m && props.mobile?.ratio.length ? props.mobile.ratio : props.ratio
	)

	const { playing, muted } = useMediaControls(video)
	const firstPlaying = ref(false)

	const { height: windowHeight } = useWindowSize()
	const { stop } = useIntersectionObserver(
		el,
		([{ isIntersecting }]) => {
			if (isIntersecting) {
				if (hls) {
					hls.startLoad()
				} else if (video.value?.src !== src.value) {
					video.value.src = src.value
				}
			}

			if (video?.value) {
				playing.value = isIntersecting
				if (playing.value) {
					firstPlaying.value = true
				}
			}
		},
		{ rootMargin: `${windowHeight.value}px 0px ${windowHeight.value}px 0px` }
	)

	onMounted(() => {
		if (props.autoplay) {
			muted.value = true
			video.value.loop = 'loop'
			video.value.autoplay = 'autoplay'
			video.value.muted = true
		}

		initVideo(src.value)
		// console.log(src.value)
	})

	onUnmounted(() => {
		if (hls) {
			hls.destroy()
		}

		stop()
	})

	watch(src.value, (v) => {
		initVideo(v)
	})

	const initVideo = (src) => {
		if (!Hls.isSupported()) {
			video.value.src = src
		} else {
			if (!hls) {
				hls = new Hls({
					autoStartLoad: false,
					startLevel: 5,
				})
			} else {
				hls.stopLoad()
			}
			hls.loadSource(src)
			hls.attachMedia(video.value)
		}
	}
</script>

<template>
	<div>
		<div :class="['video-container']">
			<video
				@click="!autoplay ? (playing = false) : () => {}"
				ref="video"
				playsinline
				loop
			/>
			<Transition name="fade">
				<!-- <ElementsImage
					v-bind="poster"
					:ratio="ratio"
					v-if="poster"
					v-show="!firstPlaying"
					@click="playing = true"
					class="poster"
				/> -->
				siema
			</Transition>
		</div>

		<!-- <ElementsText tag="figcaption" v-if="showCaption && caption">
			<div v-html="caption" />
		</ElementsText> -->
	</div>
</template>

<style lang="postcss" scoped>
	.video-container {
		position: relative;

		&:not(.autoplay) > * {
			cursor: pointer;
		}
	}

	.poster {
		position: relative;
		z-index: 1;
	}
</style>
