<template>
	<div
		class="about"
		:style="`background-color: ${data.color.hex}; color: ${data.typecolor?.hex};`"
	>
		<div class="cnt">
			<div v-if="!mobile" class="info">
				<div class="left">
					<div class="">
						<div class="positions">
							{{ data.about }}
						</div>
					</div>
					<div class="services">
						<div class="label">Services</div>
						<div class="positions">
							<div v-for="el in data.services" class="el">{{ el.title }}</div>
						</div>
					</div>
					<div class="clients">
						<div class="label">Selected clients</div>
						<div class="positions">
							<div v-for="el in data.clients" class="el">{{ el.title }}</div>
						</div>
					</div>
				</div>
				<div class="mid">
					<div class="contact">
						<div class="label">Contact</div>
						<div class="positions">
							{{ data.email }}<br />
							{{ data.phone }}<br />
							<a
								:style="`color: ${data.typecolor?.hex};`"
								href="http://instagram.com/julescrepuul"
							>
								(at)julescrepuul</a
							>
						</div>
					</div>

					<div class="education">
						<div class="label">Education</div>
						<div class="positions">
							<div v-for="el in data.education" class="el">
								<span class="year">{{ el.year }}</span>
								<span class="title">{{ el.title }}</span>
							</div>
						</div>
					</div>
					<div class="exhibitions">
						<div class="label">Exhibitions / Publications / Workshops</div>
						<div class="positions">
							<div v-for="el in data.publications" class="el">
								<span class="year">{{ el.year }}</span>
								<span class="title">{{ el.title }}</span>
							</div>
						</div>
					</div>
					<div class="work">
						<div class="label">Work</div>
						<div class="positions">
							<div v-for="el in data.work" class="el">
								<span class="year">{{ el.year }}</span>
								<span class="title">{{ el.title }}</span>
								<div
									v-if="el.description"
									:style="`color: ${data.typecolor?.hex};`"
									class="desc"
								>
									{{ el.description }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="right"></div>
			</div>
			<div v-else class="infomobile">
				<div class="aboutcont">
					<div class="positions">
						{{ data.about }}
					</div>
				</div>
				<div class="contact">
					<div class="label">Contact</div>
					<div class="positions">
						{{ data.email }}<br />
						{{ data.phone }}<br />
						<a
							:style="`color: ${data.typecolor?.hex};`"
							href="http://instagram.com/julescrepuul"
						>
							(at)julescrepuul</a
						>
					</div>
				</div>
				<div class="services">
					<div class="label">Services</div>
					<div class="positions">
						<div v-for="el in data.services" class="el">{{ el.title }}</div>
					</div>
				</div>
				<div class="clients">
					<div class="label">Selected clients</div>
					<div class="positions">
						<div v-for="el in data.clients" class="el">{{ el.title }}</div>
					</div>
				</div>

				<div class="education">
					<div class="label">Education</div>
					<div class="positions">
						<div v-for="el in data.education" class="el">
							<span class="year">{{ el.year }}</span>
							<span class="title">{{ el.title }}</span>
						</div>
					</div>
				</div>
				<div class="exhibitions">
					<div class="label">Exhibitions / Publications / Workshops</div>
					<div class="positions">
						<div v-for="el in data.publications" class="el">
							<span class="year">{{ el.year }}</span>
							<span class="title">{{ el.title }}</span>
						</div>
					</div>
				</div>
				<div class="work">
					<div class="label">Work</div>
					<div class="positions">
						<div v-for="el in data.work" class="el">
							<span class="year">{{ el.year }}</span>
							<span class="title">{{ el.title }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<span class="copy"
			>© Jules Janssen, 2024. Code by:
			<a href="http://bartekp.info">Bartek Pierściński</a>. Last updated:
			{{ workDate(data._updatedAt) }}</span
		>
	</div>
</template>

<script setup>
	const query = groq`*[_type == "about"][0]`

	const sanity = useSanity()

	const { data } = await useAsyncData(() => sanity.fetch(query))

	const { mobile } = useScreenSize()

	console.log(data.value)

	const hovered = useHovered()
	const active = useActive()

	function workDate(originalDateString) {
		// Original date string

		// Create a new Date object with the original date string
		var originalDate = new Date(originalDateString)

		// Get the components of the date (year, month, day)
		var year = originalDate.getFullYear()
		var month = originalDate.getMonth() + 1 // Months are zero-indexed, so we add 1
		var day = originalDate.getDate()

		// Adjust month and day to have leading zeroes if necessary
		month = month < 10 ? '0' + month : month
		day = day < 10 ? '0' + day : day

		// Construct the new date format (in this example, DD/MM/YYYY)
		var newDateFormat = day + '/' + month + '/' + year

		console.log('Original Date:', originalDateString)
		console.log('Converted Date:', newDateFormat)

		return newDateFormat
	}

	onMounted(() => {
		const els = document.querySelectorAll('.el')

		handleEls(els)
	})

	function handleEls(els) {
		console.log('res')
		els.forEach((el) => {
			const desc = el.getElementsByClassName('desc')[0]
			if (desc) {
				const height = desc.clientHeight
				desc.style.maxHeight = '0'
				el.style.cursor = "url('/assets/question.svg'), help"
				el.addEventListener('click', (evt) => {
					if (el.classList.contains('open')) {
						desc.style.maxHeight = '0'
						console.log('siemka open')
					} else {
						desc.style.maxHeight = height + 'px'
						console.log('siemka notopen')
					}
					el.classList.toggle('open')
				})
			}
		})
	}
</script>

<style lang="postcss" scoped>
	.about {
		/* font-family: 'S-Bold'; */
		padding: var(--space-m);
		max-width: 100vw;
		width: 100vw;
		min-height: var(--window-height);
		max-height: var(--window-height);
		height: var(--window-height);
		overflow: scroll;
		pointer-events: all;

		& > .cnt {
			display: flex;
			flex-direction: column;
			gap: var(--space-m);
			& > .info {
				font-size: var(--type-l);
				line-height: calc(var(--type-l-leading) - 1.5px) !important;
				display: grid;
				grid-template-columns: repeat(12, 1fr);
				gap: var(--space-m);
				margin: 0;
				cursor: default;
				& > * {
					grid-column: span 4;
					display: flex;
					flex-direction: column;
					gap: 1.2em;
					& > * {
						max-width: calc((100vw - 2 * var(--space-m)) / 12 * 3);
						& > .positions {
							&:not(:first-of-type) {
								padding-left: 1rem;
							}
							& > .el {
								user-select: none;
								/* cursor: url('/assets/question.svg'), help; */

								& > .year {
									display: inline-block;
									min-width: calc((100vw - 2 * var(--space-m)) / 12 * 1 - 1rem);
								}
								& > .desc {
									max-width: calc((100vw - 2 * var(--space-m)) / 12 * 3);
									transition: max-height 0.3s ease, padding 0.3s ease;
									overflow: hidden;
								}
							}
						}
					}
				}

				& > .mid {
					& > * {
						max-width: initial;
					}
				}
			}

			& > .infomobile {
				display: flex;
				flex-direction: column;
				margin-top: 6.5vh;
				display: flex;
				flex-direction: column;
				gap: 2em;
				font-size: var(--type-l);
				line-height: var(--type-l-leading);

				& > * {
					& > .label {
						margin-bottom: 0.5em;
					}
					& > .positions {
						& > .el {
							& > .year {
								display: inline-block;
								min-width: calc((100vw - 2 * var(--space-m)) / 12 * 3);
							}
						}
					}
				}
			}
		}
		& > .copy {
			width: fit-content;
			display: inline-block;
			position: absolute;
			bottom: var(--space-m);
			left: var(--space-m);
			/* transform: translateX(-50%); */
			max-width: calc(100vw - 2 * var(--space-m));

			@media screen and (max-width: 640px) {
				position: static;
				width: 100vw;
				text-align: center;
				transform: none;
				margin-top: 5vh;
			}
			& > a {
				color: inherit !important;
			}
		}
	}
</style>
