import path from 'node:path'
import fs from 'node:fs'
import glob from 'glob'
import watch from 'glob-watcher'
import { Dirp } from './globals.js'
import { formatBytes, rdir } from '../utils/helpers.js'
import { useConfig } from '../hooks/all.js'

export async function getFiles(pattern = '', initPath = Dirp.root) {
	const { config } = useConfig()
	let pathFiles = config.rootDir

	if (initPath === Dirp.tmp) pathFiles = config.tmpDir

	return new Promise(resolve => {
		glob(rdir(path.join(pathFiles, pattern)), (err, files) => {
			if (err) resolve([])
			resolve(files)
		})
	})
}

export function watchFiles(patterns = [], callback = () => {}) {
	const { config } = useConfig()
	let patternsJoin = patterns.map(pattern => rdir(path.join(config.rootDir, pattern)))

	watch(patternsJoin, done => {
		callback(done)
	})
}

export function getBuildFiles(typeFile = '') {
	const { config } = useConfig()

	const allowFiles = {
		html: './*.html',
		css: './assets/css/*[-codermk].min.css',
		js: './assets/js/*[-codermk].min.js'
	}

	let listFiles = []

	return new Promise(resolve => {
		if (!Object.hasOwn(allowFiles, typeFile)) resolve([])
		const patternFiles = allowFiles[typeFile]

		glob(rdir(path.join(config.outDir, patternFiles)), (err, files) => {
			if (err) listFiles = []
			listFiles = files

			resolve(listFiles.map(file => {
				const basename = path.basename(file)
				const stats = fs.statSync(file)
				const sizefile = formatBytes(stats.size)

				return `${basename} (${sizefile})`
			}))
		})
	})
}
