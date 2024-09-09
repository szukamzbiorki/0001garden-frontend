import { google } from 'googleapis'
import fs from 'fs'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const SPREAD_SHEET_ID = useRuntimeConfig().public.SPREAD_SHEET_ID
	const GOOGLE_API_KEY = useRuntimeConfig().public.GOOGLE_API_KEY

	const GOOGLE_SERVICE_ACCOUNT_KEY_FILE =
		useRuntimeConfig().public.GOOGLE_SERVICE_ACCOUNT_KEY_FILE

	const keyFile = JSON.parse(
		fs.readFileSync(GOOGLE_SERVICE_ACCOUNT_KEY_FILE, 'utf-8')
	)
	// Set up Google authentication
	const auth = new google.auth.GoogleAuth({
		credentials: keyFile,
		scopes: 'https://www.googleapis.com/auth/spreadsheets',
	})

	// Get an authorized client
	const client = await auth.getClient()

	// Set up the Google Sheets API
	const sheets = google.sheets({ version: 'v4', auth: client })

	try {
		const response = await sheets.spreadsheets.values.append({
			spreadsheetId: SPREAD_SHEET_ID,
			range: 'Sheet1!A1:D10',
			valueInputOption: 'USER_ENTERED',
			resource: {
				values: [[body.email]],
			},
		})
		console.log(response)
		return response
	} catch (error) {
		console.log(error)
		return { error: 'Failed to fetch data' }
	}
	// let sheetRange = 'Sheet1'

	// const body = JSON.stringify({
	// 	range: 'Sheet1',
	// 	majorDimension: 'ROWS',
	// 	// values: [email],
	// })

	// const requestOptions = {
	// 	method: 'GET',
	// }

	// const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${sheetRange}?key=${GOOGLE_API_KEY}`
	// const response = await $fetch(url, requestOptions)
	// return { response }
})
