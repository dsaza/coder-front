import fs from 'node:fs'
import path from 'node:path'
import { minify } from 'terser'
import { useConfig } from '../hooks/all.js'
import { getFiles } from '../utils/globs.js'

export async function compressScripts() {
	const { config } = useConfig()
	const files = await getFiles(`./${config.buildPath}/assets/__compiled/*.js`)
	
	for (const file of files) {
		let content = fs.readFileSync(file, 'utf8')
		let resolve = await minify(content)
		let filename = path.basename(file).replace('.js', '')

		fs.writeFileSync(path.join(config.outDir, `./assets/js/${filename}-codermk.min.js`), `${resolve.code}`)
	}
}
