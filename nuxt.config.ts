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
		projectId: '9tabryc1',
		dataset: 'production',
	},
	modules: ['@nuxtjs/sanity', '@vueuse/nuxt', '@sidebase/nuxt-session'],
	ssr: false,
	runtimeConfig: {
		public: {
			GOOGLE_SERVICE_ACCOUNT_KEY_FILE: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
			GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
			GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
			SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID,
		},
	},
})
