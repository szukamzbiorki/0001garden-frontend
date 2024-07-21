<template>
	<div class="gallery swiper" ref="swipe">
		<div class="swiper-wrapper" :class="[{ onRight }, { onLeft }]">
			<div class="swiper-slide" v-for="s in slides" ref="slideRefs">
				<div class="single-gallery">
					<div ref="projects" class="swiper">
						<div
							class="swiper-wrapper"
							@mouseover="cursorShow = true"
							@mouseout="cursorShow = false"
							:style="`background-color: ${s.color.hex};`"
						>
							<div
								v-for="image in s.images"
								:key="image._id"
								class="swiper-slide"
								:data-screen="image.hidemobile == true ? 'hide' : ''"
								:class="[
									{ duo: image.images?.length == 2 },
									{ trio: image.images?.length == 3 },
								]"
								:style="`background-color: ${image.color?.hex || s.color.hex};`"
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
			</div>
		</div>
		<div class="nav">
			<div class="top"></div>
			<div
				@click="clickLeft()"
				@mouseover="enterLeft()"
				@mouseleave="leaveLeft()"
				class="left"
			></div>
			<div @click="nextSlide()" @mouseenter="enterMid()" class="center"></div>
			<div
				@click="clickRight()"
				@mouseover="enterRight()"
				@mouseleave="leaveRight()"
				class="right"
			></div>
			<div
				class="percentage"
				:style="`color: ${
					slides[slideNumber - 1].images[slideNumberInside - 1].typeColor ||
					slides[slideNumber - 1].typeColor
				}; width: ${percentage + 20}px`"
			>
				<!-- {{ percentage }}% -->
			</div>
			<div class="title">
				<a
					v-if="slides[slideNumber - 1].link"
					:href="slides[slideNumber - 1].link"
					>{{ slides[slideNumber - 1].title }}</a
				>
				<span v-else>{{ slides[slideNumber - 1].title }}</span
				>,
				{{ slides[slideNumber - 1].year }}
			</div>
			<footer ref="foot" :style="`--foot-height: ${footheight}px`">
				<div class="description">
					{{ slides[slideNumber - 1].description }}
				</div>
			</footer>
		</div>
	</div>
</template>

<script setup>
	import Swiper from 'swiper'
	import 'swiper/css'
	import 'swiper/css/navigation'
	import 'swiper/css/effect-fade'
	import { EffectFade } from 'swiper/modules'

	const { mobile } = useScreenSize()
	const { height } = useWindowSize()

	const foot = ref()
	const { height: footheight } = useElementSize(foot)

	const props = defineProps({
		slides: Array,
	})

	const projects = ref([])
	const swipe = ref(null)
	const swiper = ref()

	const slideRefs = ref([])

	const slideNumber = useSlideNumber()
	const slideNumberInside = useSlideNumberInside()
	const swipers = ref([])

	const hovered = useHovered()

	const percentage = computed(() => {
		return Math.floor((slideNumber.value / props.slides.length) * 100)
	})

	onMounted(() => {
		if (!mobile.value) {
			projects.value.forEach((p, i) => {
				swipers.value.push(
					new Swiper(p, {
						modules: [EffectFade],
						fadeEffect: { crossFade: true },
						observer: true,
						observeParents: true,
						loop: true,
						nested: true,
						effect: 'fade',
						slidesPerView: 1,
						on: {
							slideChange: (s) => {
								slideNumberInside.value = s.realIndex + 1
							},
						},
					})
				)
			})
			swiper.value = new Swiper(swipe.value, {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				loop: true,
				on: {
					slideChange: (swiper) => {
						slideNumber.value = swiper.realIndex + 1
						slideNumberInside.value =
							swipers.value[slideNumber.value - 1].realIndex + 1
					},
				},
			})
		} else {
			slideRefs.value.forEach((slide, i) => {
				const { top, bottom } = useElementBounding(slide)
				watch(top, () => {
					const ifMiddle =
						top.value < height.value / 2 && bottom.value > height.value / 2
					if (ifMiddle) {
						slideNumber.value = i + 1
					}
				})
			})
		}
	})

	function nextSlide() {
		const current = swipers.value[slideNumber.value - 1]
		current.slideNext()
	}

	const onRight = ref(false)
	const onLeft = ref(false)

	function clickRight() {
		swiper.value.slideNext()
		setTimeout(() => {
			if (slideNumber.value >= props.slides.length || slideNumber.value == 1) {
				onRight.value = false
				onLeft.value = false
			}
		}, 10)
	}
	function clickLeft() {
		swiper.value.slidePrev()
		setTimeout(() => {
			if (slideNumber.value >= props.slides.length || slideNumber.value == 1) {
				onRight.value = false
				onLeft.value = false
			}
		}, 10)
	}

	function enterMid() {
		onRight.value = false
		onLeft.value = false
	}

	function enterRight() {
		if (!mobile.value) {
			onRight.value = true
		}
	}

	function leaveRight() {
		onRight.value = false
	}

	function enterLeft() {
		if (!mobile.value) {
			onLeft.value = true
		}
	}

	function leaveLeft() {
		onLeft.value = false
	}
</script>

<style lang="postcss" scoped>
	.gallery {
		width: 100vw;
		height: 100vh;
		background-color: var(--grey);
		cursor: pointer;
		z-index: -1;
		transition: top 0.5s ease;
		overflow: hidden;
		@media screen and (max-width: 640px) {
			overflow: scroll;
		}
		& > .swiper-wrapper {
			@media screen and (max-width: 640px) {
				flex-direction: column;
			}
			& > * {
				transition: transform 0.4s ease;
			}
			&.onLeft {
				& > * {
					transform: translate3d(100px, 0, 0);
				}
			}

			&.onRight {
				& > * {
					transform: translate3d(-100px, 0, 0);
				}
			}
			& > .swiper-slide {
				position: relative;
				height: 100%;
				@media screen and (max-width: 640px) {
					position: initial;
					height: max-content;
				}

				& > .single-gallery {
					height: 100vh;
					@media screen and (max-width: 640px) {
						height: initial;
					}
					& > .swiper {
						max-height: 100vh !important;
						height: 100%;
						@media screen and (max-width: 640px) {
							overflow: scroll;
							height: initial;
							max-height: initial !important;
						}
						& > .swiper-wrapper {
							align-items: center;
							width: calc(100vw) !important;
							@media screen and (max-width: 640px) {
								flex-direction: column;
								/* gap: var(--space-m) 0; */
								padding-bottom: 3rem !important;
							}
							& > .swiper-slide {
								max-height: 100vh !important;
								max-width: calc(100vw) !important;
								display: flex;
								flex-direction: row;
								justify-content: center;
								align-items: center;
								gap: var(--space-m);
								overflow: hidden;
								@media screen and (max-width: 640px) {
									&[data-screen='hide'] {
										display: none;
									}
									max-height: initial !important;
									height: auto;
									flex-direction: column;
									&:first-child {
										margin-top: 3rem;
									}

									&:not(:last-child, :has(.full)) {
										margin-bottom: var(--space-m);
									}
								}
								& > .swiperimg {
									max-height: calc(100vh - 7 * var(--space-m));
									max-width: calc(100vw - 2 * var(--space-m)) !important;
									@media screen and (max-width: 640px) {
										width: calc(100vw - 2 * var(--space-m)) !important;
										height: auto;
										max-height: initial;
									}
									& > img {
										object-fit: contain;
									}

									&.full {
										max-height: 100vh;
										max-width: 100vw !important;
										width: 100vw;
										height: 100vh;
										@media screen and (max-width: 640px) {
											height: auto;
											width: 100vw !important;
											max-width: calc(100vw) !important;
											max-height: initial;
										}
									}
								}

								&.duo {
									& > .swiperimg {
										max-height: calc(100vh - 7 * var(--space-m));
										max-width: calc(
											(100vw - 3 * var(--space-m)) / 2
										) !important;
										@media screen and (max-width: 640px) {
											max-height: initial;
											max-width: calc((100vw - 3 * var(--space-m))) !important;
										}
									}
								}

								&.trio {
									& > .swiperimg {
										max-height: calc(100vh - 7 * var(--space-m));
										max-width: calc(
											(100vw - 5 * var(--space-m)) / 3
										) !important;
										@media screen and (max-width: 640px) {
											max-height: initial;
											max-width: calc((100vw - 3 * var(--space-m))) !important;
										}
									}
								}
							}
						}
					}
				}
			}
		}

		& > .nav {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: var(--window-height);
			display: grid;
			grid-template-columns: 2fr 3fr 2fr;
			grid-template-rows: auto 1fr;
			z-index: 100;

			@media screen and (max-width: 640px) {
				position: fixed;
				pointer-events: none;
				& > .left,
				.right {
					pointer-events: all;
				}
			}

			& > .top,
			.center,
			.percentage {
				opacity: 0;
				transition: opacity 0.3s ease, color 0.3s ease;
				transition-delay: 0.5s, 0s !important;
				cursor: url('/assets/grey-pointer.svg'), pointer;
			}
			& > .percentage {
				min-width: 20px;
				min-height: 27px;
				text-align: right;
				background: url('/assets/branch.svg');
				background-size: auto 100%;
				background-repeat: no-repeat;
				background-position: center right;
				margin-bottom: 3px;
				@media screen and (max-width: 640px) {
					display: none;
				}
			}
			& > .top {
				text-align: center;
				grid-column: 1/-1;
				padding-top: var(--space-m);
				height: 90px;
			}

			& > .center {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				padding-bottom: var(--space-m);
				user-select: none;
				& > * {
					transition: color 0.3s ease;
				}

				@media screen and (max-width: 640px) {
					pointer-events: none;
				}
				cursor: url('/assets/grey-pointer.svg'), help;
			}
			& > .title {
				position: absolute;
				top: calc(var(--window-height) / 2);
				left: 50vw;
				transform: translate(-50%, -50%);
				background-color: lightgrey;
				width: max-content;
				max-width: 80vw;
				cursor: url('/assets/grey-pointer.svg'), pointer;
				& > a {
					text-decoration: underline;
				}
			}
			& > footer {
				position: absolute;
				bottom: 0vh;
				width: 100vw;
				display: flex;
				flex-direction: row;
				justify-content: center;
				cursor: url('/assets/grey-pointer.svg'), pointer;
				& > .description {
					background-color: lightgrey;
					text-align: center;
				}
			}

			& > .right {
				cursor: url('/assets/grey-arrow-right.svg'), e-resize;
			}

			& > .left {
				cursor: url('/assets/grey-arrow-left.svg'), w-resize;
			}
		}

		& > .nav {
			& > .top,
			.center,
			.percentage {
				opacity: 1;
				transition-delay: 0.5s;
			}
		}
	}

	.swiper-slide {
		height: 100%;
	}
</style>
