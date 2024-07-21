<template>
	<div class="slide">
		<div class="title">{{ content.title }}, {{ content.year }}</div>
		<div class="gallery">
			<div v-if="content.images.length < 2" class="image">
				<div
					v-for="image in content.images"
					:key="image._id"
					class="swiper-slide"
				>
					<Media
						v-for="i in image.images"
						class="swiperimg"
						:medium="i"
					></Media>
				</div>
			</div>
			<div v-else ref="swipeProject" class="swiper">
				<div
					class="swiper-wrapper"
					@mouseover="cursorShow = true"
					@mouseout="cursorShow = false"
				>
					<div
						v-for="image in content.images"
						:key="image._id"
						class="swiper-slide"
					>
						<Media
							v-for="i in image.images"
							class="swiperimg"
							:class="[{ full: image.full }]"
							:medium="i"
						></Media>
					</div>
				</div>
			</div>
		</div>
		<footer>
			{{ content.description }}
		</footer>
	</div>
</template>

<script setup>
	import Swiper from 'swiper'
	import 'swiper/css'
	import 'swiper/css/navigation'
	import { EffectFade } from 'swiper/modules'

	const props = defineProps({
		content: Object,
	})

	const color = props.content.color.hex
	const typeColor = props.content.typeColor

	const swipeProject = ref(null)
	const swiperProject = ref()
	const slideNumber = ref(1)

	console.log(props.content)

	onMounted(() => {
		swiperProject.value = new Swiper(swipeProject.value, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
		})
	})

	onUnmounted(() => {
		// if (swiperProject.value) {
		// 	swiperProject.value.destroy()
		// }
	})
</script>

<style lang="postcss" scoped>
	.slide {
		position: relative;
		height: 100%;
		background-color: v-bind(color);
		color: v-bind(typeColor);

		& > .title {
			position: fixed;
			top: 50vh;
			left: 50vw;
			transform: translate(-50%, -50%);
			z-index: 500;
			color: v-bind(typeColor);
			pointer-events: none;
		}

		& > .gallery {
			& > .swiper {
				max-height: 100vh !important;

				& > .swiper-slide {
					max-height: 100vh !important;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					gap: var(--space-m);
					padding: var(--space-m);
					background-color: v-bind(color);
					/* height: 100vh !important; */
					& > .swiperimg {
						max-height: calc(100vh - 7 * var(--space-m));
					}
				}
			}
		}

		footer {
			position: absolute;
			bottom: var(--space-m);
			left: 50vw;
			transform: translateX(-50%);
			width: max-content;
			max-width: 90vw;
			z-index: 500;
		}
	}
</style>
