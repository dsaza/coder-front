import path from 'node:path'
import fs from 'node:fs'
import bootstrap from './src/bootstrap.js'

async function main() {
	const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), './codermk.json')))
	const mode = process.argv[2]

	await bootstrap(mode, config)
}

main()
