import { google } from 'googleapis'

// Service Account Setup

export default defineNuxtPlugin(async () => {
	const GOOGLE_SERVICE_ACCOUNT_KEY_FILE =
		useRuntimeConfig().public.GOOGLE_SERVICE_ACCOUNT_KEY_FILE
	// Set up Google authentication
	const auth = new google.auth.GoogleAuth({
		credentials: GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
		scopes: 'https://www.googleapis.com/auth/spreadsheets',
	})

	// Get an authorized client
	const client = await auth.getClient()

	// Set up the Google Sheets API
	const sheets = google.sheets({ version: 'v4', auth: client })
	return {
		provide: {
			sheets,
		},
	}
})
