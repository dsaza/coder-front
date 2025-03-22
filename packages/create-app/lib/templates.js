import path from 'node:path'
import fs from 'node:fs'
import fse from 'fs-extra'
import * as url from 'url'

const { copySync } = fse

export function templateCopyists({ type, path: _path, name}) {
	const dirname = url.fileURLToPath(new URL('.', import.meta.url))

	console.log(type)

	try {
		copySync(path.join(dirname, `../templates/${type}`), _path)

		const packageJsonFile = path.join(_path, './package.json')
		const packageText = fs.readFileSync(packageJsonFile, 'utf8')
		fs.writeFileSync(packageJsonFile, packageText.replace('package-name', name), null, 2)
		
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export function removeTemplateIfExist(path) {
	fs.existsSync(path) && fs.rmSync(path, { recursive: true, force: true })
}
