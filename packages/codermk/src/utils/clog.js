import pc from 'picocolors'
import emoji from 'node-emoji'
import { Mode, Tasks } from '../utils/globals.js'
import { getBuildFiles } from './globs.js'
import { useConfig, useError, useMode } from '../hooks/all.js'
import { getTime } from './helpers.js'

export function clogHead() {
	const { mode } = useMode()

	let message = Mode.dev === mode ? 'Starting up your environment' : 'Building the web layout'
	resetConsole()

	const iconRobot = emoji.get('robot_face')
	console.log(pc.bold(pc.blue('[C/] CODERMK')) + `      ${iconRobot} ` + pc.gray(message) + '\n')
}

export function clogWorking(task) {
	console.log(pc.gray(getTime()) + ' Working on... ' + getWorkingMessage(task))
}

export async function clogDefault(task) {
	const { mode } = useMode()
	const { config } = useConfig()
	const { getError } = useError()
	const error = getError()
	
	resetConsole()

	if (error.status) {
		const iconError = emoji.get('x')

		console.log(pc.bold(pc.blue('[C/] CODERMK')) + `      ${iconError} ` + pc.gray('Have something to correct'))
		console.log(pc.bold(pc.red('\nAn error has occurred\n')))
		console.log(pc.red(error.message))
		console.log('')
		
		return
	}

	if (!error.status) {
		if (mode == Mode.dev) {
			const message = task === Tasks.server ? 'We are ready' : 'Everything is going great'
			const icon = task === Tasks.server ? emoji.get('star') : emoji.get('white_check_mark')
	
			console.log(pc.bold(pc.blue('[C/] CODERMK')) + `      ${icon} ` + pc.gray(message))
			console.log(pc.bold(pc.white('\nYour development server: ')) + pc.cyan(`http://localhost:${config.port}`))
	
			task === Tasks.server 
				? console.log('\n' + pc.gray(getTime()) + ' The development server is ready to listen to your changes')
				: console.log('\n' + pc.gray(getTime()) + ' The last changes were from... ' + getWorkingMessage(task))
		}

		if (mode == Mode.build) {
			const icon = emoji.get('medal')

			console.log(pc.bold(pc.blue('[C/] CODERMK')) + `      ${icon} ` + pc.gray('The web layout is already packaged!'))
			console.log(pc.bold(pc.white('\nThe following files have been processed:')))
			
			await printBuildFiles({ icon: 'page_facing_up', title: 'HTML pages', color: 'green', typeFile: 'html' })
			await printBuildFiles({ icon: 'nail_care', title: 'CSS Styles', color: 'blue', typeFile: 'css' })
			await printBuildFiles({ icon: 'package', title: 'Javascript files', color: 'yellow', typeFile: 'js' })

			console.log(`\n\n${pc.gray('And all public files were copied.')}`)
		}
		
		console.log('')
	}
}

function resetConsole() {
	process.stdout.write('\x1Bc')
	console.log('')
}

async function printBuildFiles({ icon, title, color, typeFile } = { icon: '', title: '', color: '', typeFile: '' }) {
	const pcolor = pc[color]
	const files = await getBuildFiles(typeFile)

	if (files.length > 0) {
		console.log('\n' + emoji.get(icon) + pc.bold(pcolor(` ${title}`)) + '\n')
		console.log(`${files.map((file, index) => {
			if (index !== files.length - 1) return pcolor(`• ${file}\n`)
			return pcolor(`• ${file}`)
		}).join('')}`)
	}
}

function getWorkingMessage(task) {
	let messages = {
		[Tasks.cleaner]: pc.white('Clean environment space'),
		[Tasks.cleanerFinal]: pc.white('Clean final'),
		[Tasks.views]: pc.green('Twig templates'),
		[Tasks.viewsPretty]: pc.green('Twig to HTML beautiful'),
		[Tasks.scripts]: pc.yellow('Javascript files'),
		[Tasks.scriptsMinify]: pc.yellow('Minify javascript files'),
		[Tasks.styles]: pc.magenta('Sass (scss) files'),
		[Tasks.stylesFull]: pc.magenta('Post processing css'),
		[Tasks.server]: pc.blue('Setting up development server'),
		[Tasks.assets]: pc.blue('Copy assets'),
	}

	return messages.hasOwnProperty(task) ? messages[task] : ''
}
