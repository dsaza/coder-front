import path from 'node:path'
import browserSync from 'browser-sync'
import { Tasks } from '../utils/globals.js'
import { clogDefault, clogWorking } from '../utils/clog.js'
import { useConfig } from '../hooks/all.js'

export default function Server() {
	const { config } = useConfig()
	const bs = browserSync.create()

	clogWorking(Tasks.server)
	
	bs.init({
		server: [path.join(config.rootDir, './public'), config.tmpDir],
		logLevel: 'silent',
		notify: false,
		watch: true,
		open: false,
		port: config.port
	})

	clogDefault(Tasks.server)
}
