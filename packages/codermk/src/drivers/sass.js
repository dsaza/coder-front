import fs from 'node:fs'
import path from 'node:path'
import sass from 'sass'
import { Mode, Tasks } from '../utils/globals.js'
import { getFiles } from '../utils/globs.js'
import { useConfig, useError, useMode } from '../hooks/all.js'

const { compile: compileSass, SassString } = sass

function compileFiles(files = []) {
	const { config } = useConfig()
	const { setError } = useError()
	const { mode } = useMode()

	try {
		files.forEach(file => {
			const result = compileSass(file, {
				style: 'expanded',
				sourceMap: true,
				sourceMapIncludeSources: true,
				functions: {
					'get_public_init()': function () {
						let url = mode === Mode.dev
							? `/`
							: `../`

						return new SassString(url)
					},
					'get_hex_decimal($number)': function (args) {
						let numberInput = args[0].assertNumber('number').assertNoUnits('number')
						let number = numberInput.value
						let hex = number.toString(16)

						return new SassString(hex)
					}
				}
			})

			let filename = path.basename(file).replace('.scss', '.css')
			let pathResult = Mode.build === mode ? `./assets/__compiled/${filename}` : `./__compiled/${filename}`
			let pathResultMapping = `./__compiled/${filename}.map`

			if (Mode.dev === mode) {
				fs.writeFileSync(path.join(config.tmpDir, pathResult), `${result.css}\n/*# sourceMappingURL=${filename}.map */`)
				fs.writeFileSync(path.join(config.tmpDir, pathResultMapping), JSON.stringify(result.sourceMap))
			}

			if (Mode.build === mode) {
				fs.writeFileSync(path.join(config.outDir, pathResult), result.css)
			}
		})

		return true
	} catch (error) {
		setError(error.message, Tasks.styles)
		return false
	}
}

export async function compileStyles() {
	const { clearError } = useError()

	let files = await getFiles('./src/scss/_entries/*.scss')
	let isCompileSass = compileFiles(files)

	if (isCompileSass) clearError(Tasks.styles)
}
