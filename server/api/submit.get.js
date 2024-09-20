import { google } from 'googleapis'
import fs from 'fs'

export default defineEventHandler(async (event) => {
	const SPREAD_SHEET_ID = useRuntimeConfig().public.SPREAD_SHEET_ID

	const GOOGLE_SERVICE_ACCOUNT_KEY_FILE =
		useRuntimeConfig().public.GOOGLE_SERVICE_ACCOUNT_KEY_FILE

	const keyFile = JSON.parse(fs.readFileSync(GOOGLE_SERVICE_ACCOUNT_KEY_FILE, 'utf-8'))
	const auth = new google.auth.GoogleAuth({
		credentials: keyFile,
		scopes: 'https://www.googleapis.com/auth/spreadsheets',
	})

	const client = await auth.getClient()

	const sheets = google.sheets({ version: 'v4', auth: client })

	try {
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: SPREAD_SHEET_ID,
			range: 'Sheet1!A1:D10',
		})
		console.log(response)
		return response.data.values
	} catch (error) {
		console.log(error)
		return { error: 'Failed to fetch data' }
	}
})
