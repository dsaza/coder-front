import { Mode, Tasks } from '../utils/globals.js'
import { compileStyles } from '../drivers/sass.js'
import { watchFiles } from '../utils/globs.js'
import { clogDefault, clogWorking } from '../utils/clog.js'
import { useMode } from '../hooks/all.js'

export default async function Styles() {
	const { mode } = useMode()
	const watchesFiles = ['./src/scss/**/*.scss']

	clogWorking(Tasks.styles)
	await compileStyles()

	if (mode === Mode.dev) {
		watchFiles(watchesFiles, async done => {
			await compileStyles()
			clogDefault(Tasks.styles)
			done()
		})
	}
}
