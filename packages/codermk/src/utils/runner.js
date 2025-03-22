export function series(...tasks) {
	tasks.forEach(task => task())
}

export function seriesAsync(...tasks) {
	return new Promise(async resolve => {
		for (const task of tasks) {
			await task()
		}

		resolve()
	})
}

export async function parallel(...tasks) {
	await Promise.all(tasks.map(task => task()))
}
