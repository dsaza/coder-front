import { Mode, Tasks } from '../utils/globals.js'
import { clogWorking } from '../utils/clog.js'
import { prettyHTML } from '../drivers/pretty.js'
import { useMode } from '../hooks/all.js'

export default async function ViewsPretty() { 
	const { mode } = useMode()

	clogWorking(Tasks.viewsPretty)

	if (mode === Mode.build) {
		await prettyHTML()
	}
}
