import fs from 'node:fs'
import path from 'node:path'
import { getFiles } from '../utils/globs.js'

async function getDataJson() {
	let data = []
	let jsonFiles = await getFiles('./data/*.json')

	jsonFiles.forEach(file => {
		try {
			const json = fs.readFileSync(file, 'utf8')
			const filename = path.basename(file).replace('.json', '')

			data.push({
				file: filename,
				data: JSON.parse(json)
			})
		} catch (error) {
			data = []
		}
	})

	return data
}

export default function useJson() {
	return {
		getDataJson
	}
}
