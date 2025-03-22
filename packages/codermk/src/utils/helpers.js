import path from 'node:path'

export function rdir(dir = '') {
	return dir.replaceAll(path.sep, '/')
}

export function arrayJsonFilesToObject(collection = []) {
	const result = {}

	collection.forEach(item => {
		result[item.file] = item.data
	})

	return result
}

export function getTime() {
	let currentTime = new Date()
	let hour = currentTime.getHours()
	let minutes = currentTime.getMinutes()
	let seconds = currentTime.getSeconds()
	
	let ampm
	let hourPrint
	let minutesPrint
	let secondsPrint

	ampm = hour > 11 ? 'p.m.' : 'a.m.'

	hour = hour > 12 ? hour - 12 : hour

	hourPrint = hour > 9 ? `${hour}` : `0${hour}` 
	minutesPrint = minutes > 9 ? `${minutes}` : `0${minutes}` 
	secondsPrint = seconds > 9 ? `${seconds}` : `0${seconds}` 

	return `[${hourPrint}:${minutesPrint}:${secondsPrint} ${ampm}]`
}

export function formatBytes(bytes = 0) {
	let kb = (bytes / 1000).toFixed(2)
	kb = kb < 1 ? 1 : roundDecimalNumber(kb, 1)

	return `${kb} KB`
}

export function roundDecimalNumber(num, decimals = 2) {
	let sign = (num >= 0 ? 1 : -1)
	num = num * sign
	if (decimals === 0) //con 0 decimals
		return sign * Math.round(num)
	// round(x * 10 ^ decimals)
	num = num.toString().split('e')
	num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimals) : decimals)))
	// x * 10 ^ (-decimals)
	num = num.toString().split('e')
	return sign * (num[0] + 'e' + (num[1] ? (+num[1] - decimals) : -decimals))
}
