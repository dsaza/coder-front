import { Mode, Tasks } from '../utils/globals.js'
import { compileScripts } from '../drivers/esbuild.js'
import { watchFiles } from '../utils/globs.js'
import { clogDefault, clogWorking } from '../utils/clog.js'
import { useMode } from '../hooks/all.js'

export default async function Scripts() {
	const { mode } = useMode()
	const watchesFiles = ['./src/js/**/*.js', './data/*.json']

	clogWorking(Tasks.scripts)
	await compileScripts()

	if (mode === Mode.dev) {
		watchFiles(watchesFiles, async done => {
			await compileScripts()
			clogDefault(Tasks.scripts)
			done()
		})
	}
}
