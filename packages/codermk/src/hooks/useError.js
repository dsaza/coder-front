let ctxErrors = {
	views: {
		status: false,
		message: '',
	},
	scripts: {
		status: false,
		message: '',
	},
	styles: {
		status: false,
		message: '',
	},
}

export default function useError() {
	const setError = (message = '', type = '') => {
		ctxErrors[type].status = true
		ctxErrors[type].message = message
	}

	const clearError = (type = '') => {
		ctxErrors[type].status = false
		ctxErrors[type].message = ''
	}

	const getError = () => {
		let error = {
			status: false,
			message: ''
		}

		if (ctxErrors.scripts.status) {
			error.status = ctxErrors.scripts.status
			error.message = ctxErrors.scripts.message
			return error
		}

		if (ctxErrors.views.status) {
			error.status = ctxErrors.views.status
			error.message = ctxErrors.views.message
			return error
		}

		if (ctxErrors.styles.status) {
			error.status = ctxErrors.styles.status
			error.message = ctxErrors.styles.message
			return error
		}

		return error
	}

	return {
		ctxErrors,
		setError,
		clearError,
		getError,
	}
}
