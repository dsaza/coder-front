import { renderTemplate } from '../drivers/nunjucks.js'
import { Mode, Tasks } from '../utils/globals.js'
import { watchFiles } from '../utils/globs.js'
import { clogDefault, clogWorking } from '../utils/clog.js'
import { useMode } from '../hooks/all.js'

export default async function Views() { 
	const { mode } = useMode()
	const watchesFiles = ['./src/views/**/*.twig', './data/*.json']

	clogWorking(Tasks.views)
	await renderTemplate()

	if (mode === Mode.dev) {
		watchFiles(watchesFiles, async done => {
			await renderTemplate()
			clogDefault(Tasks.views)
			done()
		})
	}
}