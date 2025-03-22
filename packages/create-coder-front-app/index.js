import path from 'node:path'
import { printHeader, printError, printSuccess, printCommands } from './src/log.js'
import { removeTemplateIfExist, templateCopyists } from './src/templates.js'
import { promptNameProject, promptTypeProject } from './src/prompts.js'
import { existFolderProject } from './src/validators.js'

printHeader()

const nameProject = await promptNameProject()
const pathProject = path.join(process.cwd(), `./${nameProject}`)

if (existFolderProject(pathProject)) {
	printError(`The folder "${nameProject}" already exists`)
	process.exit(1)
}

const typeProject = await promptTypeProject()

const copySuccess = templateCopyists({
	name: nameProject,
	path: pathProject,
	type: typeProject,
})

if (!copySuccess) {
	printError(`The project "${nameProject}" was not created`)
	removeTemplateIfExist(pathProject)
	process.exit(1)
}

printSuccess(`The project "${nameProject}" was successfully created. Now run:`)
printCommands(nameProject)
