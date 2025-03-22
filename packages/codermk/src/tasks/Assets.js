import { Mode, Tasks } from '../utils/globals.js'
import { clogWorking } from '../utils/clog.js'
import { copyDir } from '../drivers/fs-extra.js'
import { useMode } from '../hooks/all.js'

export default async function Assets() { 
	const { mode } = useMode()

	clogWorking(Tasks.assets)

	if (mode === Mode.build) {
		await copyDir()
	}
}
