import fs from 'node:fs'
import path from 'node:path'
import { Mode, Tasks } from '../utils/globals.js'
import { clogWorking } from '../utils/clog.js'
import { useConfig, useMode } from '../hooks/all.js'

export default function Cleaner() {
	const { config } = useConfig()
	const { mode } = useMode()

	const resetFolder = (path = '') => {
		fs.existsSync(path) && fs.rmSync(path, { recursive: true, force: true })
		fs.mkdirSync(path)
	}

	clogWorking(Tasks.cleaner)
	
	if (mode === Mode.dev) {
		resetFolder(config.tmpDir)
		fs.mkdirSync(path.join(config.tmpDir, './__compiled'))
	}
	
	if (mode === Mode.build) {
		resetFolder(config.outDir)
		fs.existsSync(config.tmpDir) && fs.rmSync(config.tmpDir, { recursive: true, force: true })
		fs.mkdirSync(path.join(config.outDir, './assets'))
		fs.mkdirSync(path.join(config.outDir, './assets/css'))
		fs.mkdirSync(path.join(config.outDir, './assets/js'))
		fs.mkdirSync(path.join(config.outDir, './assets/__compiled'))
		fs.mkdirSync(path.join(config.outDir, './assets/__templates'))
	}
}
