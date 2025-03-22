import { Mode } from '../utils/globals.js'

let mode = Mode.dev

export default function useMode() {
	return {
		mode,
		setMode: modeApp => {
			mode = modeApp
		}
	}
}
