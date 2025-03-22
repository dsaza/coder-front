import fs from 'node:fs'
import path from 'node:path'
import { Tasks } from '../utils/globals.js'
import { clogDefault, clogWorking } from '../utils/clog.js'
import { useConfig, useError } from '../hooks/all.js'

export default function CleanerFinal() {
	const { config } = useConfig()
	const { getError } = useError()
	const error = getError()

	clogWorking(Tasks.cleanerFinal)
	
	fs.existsSync(path.join(config.outDir, './assets/__compiled')) && fs.rmSync(path.join(config.outDir, './assets/__compiled'), { recursive: true, force: true })
	fs.existsSync(path.join(config.outDir, './assets/__templates')) && fs.rmSync(path.join(config.outDir, './assets/__templates'), { recursive: true, force: true })

	if (error.status) {
		fs.existsSync(config.outDir) && fs.rmSync(config.outDir, { recursive: true, force: true })
	}

	clogDefault(Tasks.cleanerFinal)
}
