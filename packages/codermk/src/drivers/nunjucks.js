import fs from 'node:fs'
import path from 'node:path'
import nunjucks from 'nunjucks'
import { getEnvGlobals } from './nunjucks-globals.js'

import { Dirp, Mode, Tasks } from '../utils/globals.js'
import { rdir } from '../utils/helpers.js'
import { getFiles } from '../utils/globs.js'
import { useConfig, useError, useJson, useMode } from '../hooks/all.js'

const envTemplate = nunjucks.configure({
	noCache: true,
	autoescape: true
})

async function removePrevTemplates(prevFiles = []) {
	const { config } = useConfig()

	let entryFiles = prevFiles.map(file => {
		let extname = path.basename(file).replace('.twig', '.html')
		return rdir(path.join(config.tmpDir, `./${extname}`))
	})

	let currentFiles = await getFiles('./*.html', Dirp.tmp)
	currentFiles.forEach(file => !entryFiles.includes(file) && fs.rmSync(file, { recursive: true, force: true }))
}

function setGlobals(data = []) {
	let globals = getEnvGlobals(data)

	Object.keys(globals).forEach(key => {
		envTemplate.addGlobal(key, globals[key])
	})
}

function renderFile(file = '') {
	const { setError } = useError()
	const { config } = useConfig()
	const { mode } = useMode()

	return new Promise(resolve => {
		nunjucks.render(file, (error, res) => {
			let filename

			if (error) {
				setError(error.message, Tasks.views)
				resolve(false)
				return
			}

			filename = path.basename(file).replace('.twig', '.html')

			if (Mode.dev === mode) fs.writeFileSync(path.join(config.tmpDir, `./${filename}`), res)
			if (Mode.build === mode) fs.writeFileSync(path.join(config.outDir, `./assets/__templates/${filename}`), res)

			resolve(true)
		})
	})
}

async function runRender(files = []) {
	let errors = 0

	for (const file of files) {
		let isRenderFile = await renderFile(file)
		if (!isRenderFile) errors++
	}

	return errors < 1
}

export async function renderTemplate() {
	const { clearError } = useError()
	const { getDataJson } = useJson()

	const files = await getFiles('./src/views/_pages/*.twig')
	const data = await getDataJson()

	let renderTemplateFiles

	await removePrevTemplates(files)
	setGlobals(data)

	renderTemplateFiles = await runRender(files)
	if (renderTemplateFiles) clearError(Tasks.views)
}
