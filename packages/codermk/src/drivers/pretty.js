import fs from 'node:fs'
import path from 'node:path'
import pretty from 'pretty'
import { getFiles } from '../utils/globs.js'
import { useConfig } from '../hooks/all.js'

export async function prettyHTML() {
	const { config } = useConfig()
	const files = await getFiles(`./${config.buildPath}/assets/__templates/*.html`)
	
	files.forEach(file => {
		let content = fs.readFileSync(file, 'utf8')
		let resolve = pretty(content, { ocd: true })
		let filename = path.basename(file)

		fs.writeFileSync(path.join(config.outDir, `./${filename}`), resolve)
	})
}
