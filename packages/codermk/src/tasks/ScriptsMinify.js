import { Mode, Tasks } from '../utils/globals.js'
import { clogWorking } from '../utils/clog.js'
import { compressScripts } from '../drivers/terser.js'
import { useMode } from '../hooks/all.js'

export default async function ScriptsMinify() { 
	const { mode } = useMode()

	clogWorking(Tasks.scriptsMinify)

	if (mode === Mode.build) {
		await compressScripts()
	}
}
