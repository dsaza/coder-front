import path from 'node:path'

let config = {
	tmpDir: '',
	rootDir: path.resolve(process.cwd()),
	buildPath: './build',
	outDir: '',
	bustcacheEnabled: false,
	port: 5000,
}

function setConfig(inputConfig) {
	config = {
		...config,
		...inputConfig
	}

	config.outDir = path.join(process.cwd(), config.buildPath)
	config.tmpDir = path.join(config.rootDir, './.codermk')
}

export default function useConfig() {
	return {
		config,
		setConfig
	}
}
