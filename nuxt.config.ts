// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	css: ['/assets/css/index.css'],
	app: {
		pageTransition: {
			name: 'pagetransition',
			mode: 'out-in',
		},
		head: {
			link: [
				{
					rel: 'stylesheet',
					href: 'https://use.typekit.net/jsn0klg.css',
				},
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/favicon.ico',
				},
			],
			title: 'Garden',
		},
	},
	sanity: {
		projectId: '9t1iwjq9',
		dataset: 'production',
	},
	modules: ['@nuxtjs/sanity', '@vueuse/nuxt'],
	ssr: false,
})
