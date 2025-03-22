import { Mode, Tasks } from '../utils/globals.js'
import { clogWorking } from '../utils/clog.js'
import { applyPostcss } from '../drivers/postcss.js'
import { useMode } from '../hooks/all.js'

export default async function StylesFull() { 
	const { mode } = useMode()

	clogWorking(Tasks.stylesFull)

	if (mode === Mode.build) {
		await applyPostcss()
	}
}
