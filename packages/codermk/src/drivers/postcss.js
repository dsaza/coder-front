import fs from 'node:fs'
import path from 'node:path'
import postcss from 'postcss'
import cssnano from 'cssnano'
import atImport from 'postcss-import'
import url from 'postcss-url'
import autoprefixer from 'autoprefixer'
import { useConfig } from '../hooks/all.js'
import { getFiles } from '../utils/globs.js'

export async function applyPostcss() {
	const { config } = useConfig()
	const files = await getFiles(`./${config.buildPath}/assets/__compiled/*.css`)
	const plugins = [
		atImport(),
		url({
			url: 'rebase'
		}),
		autoprefixer({
			overrideBrowserslist: [
				'>0.2%',
				'not dead',
				'not op_mini all'
			]
		}),
		cssnano(),
	]

	for (const file of files) {
		const filename = path.basename(file).replace('.css', '')
		const content = fs.readFileSync(file, 'utf8')
		const fileto = path.join(config.outDir, `./assets/css/${filename}-codermk.min.css`)

		const resolve = await postcss(plugins).process(content, {
			from: file,
			to: fileto
		})

		fs.writeFileSync(fileto, `${resolve.css}`)
	}
}