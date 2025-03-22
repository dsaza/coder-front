import { Mode } from '../utils/globals.js'
import { arrayJsonFilesToObject } from '../utils/helpers.js'
import { useConfig, useMode } from '../hooks/all.js'

export function getEnvGlobals(data = []) {
	const { config } = useConfig()
	const { mode } = useMode()

	let hashNow = Date.now()
	let hrefCacheBust = path => config.bustcacheEnabled ? `${path}?t=${hashNow}` : path
	let dataJson = arrayJsonFilesToObject(data)

	return {
		/**
		 * Data JSON
		 */
		__mkdata: dataJson,

		/**
		 * Functions to get the mode run
		 * @returns Mode
		 */
		isDev: () => mode === Mode.dev,
		isProduction: () => mode === Mode.build,

		/**
		 * Function to set a public path
		 * @param dir string
		 * @returns	string 
		 */
		public: (dir = '') => mode === Mode.build
			? hrefCacheBust(`./assets/${dir}`)
			: `/${dir}`,
		
		/**
		 * Function to set a scss compiled path
		 * @param file string: The filename scss to compile
		 * @returns string
		 */
		style: (file = '') => mode === Mode.build
			? hrefCacheBust(`./assets/css/${file.trim().replace('.scss', '-codermk.min.css')}`)
			: `/__compiled/${file.trim().replace('.scss', '.css')}`,
		
		/**
		 * Function to set a js compiled path
		 * @param file string: The filename js to compile
		 * @returns string
		 */
		module: (file = '') => mode === Mode.build
			? hrefCacheBust(`./assets/js/${file.trim().replace('.js', '-codermk.min.js')}`)
			: `/__compiled/${file.trim()}`,
		
		/**
		 * Function to set a page compiled
		 * @param page string: The page
		 * @param restURL string: Add parameters or hashes
		 * @returns string
		 */
		page: (page = '', restURL = '') => {
			if (page === '.') {
				return mode === Mode.build
					? `./${typeof restURL === 'string' ? restURL.trim() : ''}`
					: `/${typeof restURL === 'string' ? restURL.trim() : ''}`
			}

			return mode === Mode.build
				? `./${page}.html${typeof restURL === 'string' ? restURL.trim() : ''}`
				: `/${page}.html${typeof restURL === 'string' ? restURL.trim() : ''}`
		},
	}
}