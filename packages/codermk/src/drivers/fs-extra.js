import path from 'node:path'
import fse from 'fs-extra'
import { useConfig } from '../hooks/all.js'

export function copyDir() {
	const { config } = useConfig()
	let source = path.join(config.rootDir, './public')
	let destination = path.join(config.outDir, './assets')

	return new Promise(resolve => {
		fse.copy(source, destination, function (err) {
			if (err){
				resolve()
				return
			}
			
			resolve()
		})
	})
}
