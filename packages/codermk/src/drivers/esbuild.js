import path from 'node:path'
import esbuild from 'esbuild'
import { Mode, Tasks } from '../utils/globals.js'
import { getFiles } from '../utils/globs.js'
import { arrayJsonFilesToObject } from '../utils/helpers.js'
import { useError, useConfig, useMode, useJson } from '../hooks/all.js'

function transfromScripts(files = [], data) {
	const { config } = useConfig()
	const { setError } = useError()
	const { mode } = useMode()

	let dataJson = arrayJsonFilesToObject(data)
	let outDir = Mode.build === mode ? path.join(config.outDir, './assets/__compiled') : path.join(config.tmpDir, './__compiled')

	try {
		esbuild.buildSync({
			bundle: true,
			entryPoints: files,
			minify: false,
			outdir: outDir,
			sourcemap: mode === Mode.dev,
			target: ['es2020', 'chrome58', 'firefox57', 'safari11'],
			define: {
				__mkdata: JSON.stringify(dataJson),
				__mode: Mode.build === mode ? '"production"' : '"development"'
			}
		})

		return true
	} catch (error) {
		setError(error.message, Tasks.scripts)
		return false
	}
}

export async function compileScripts() {
	const { clearError } = useError()
	const { getDataJson } = useJson()

	let files = await getFiles('./src/js/_entries/*.js')
	let data = await getDataJson()

	let isTransformScript = transfromScripts(files, data)

	if (isTransformScript) clearError(Tasks.scripts)
}
