import { Mode } from './utils/globals.js'
import { parallel, series, seriesAsync } from './utils/runner.js'
import { clogHead } from './utils/clog.js'
import { useMode, useConfig } from './hooks/all.js'

import {
	Assets,
	Cleaner,
	CleanerFinal,
	Scripts,
	ScriptsMinify,
	Server,
	Styles,
	StylesFull,
	Views,
	ViewsPretty
} from './tasks/all.js'

export default async function bootstrap(mode = '', config = {}) {
	const { setMode } = useMode()
	const { setConfig } = useConfig()
	
	setMode(mode)
	setConfig(config)

	clogHead()

	if (mode === Mode.dev) {
		series(Cleaner)
		await parallel(Views, Scripts, Styles)
		series(Server)
	}

	if (mode === Mode.build) {
		series(Cleaner)
		await seriesAsync(Assets, Views, Scripts, Styles, ViewsPretty, ScriptsMinify, StylesFull, Assets)
		series(CleanerFinal)
	}
}
