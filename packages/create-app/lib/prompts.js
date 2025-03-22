import { select, text } from '@clack/prompts'

export async function promptNameProject () {
	const nameProject = await text({
		message: 'Type the name of the project:',
		placeholder: 'coder-project',
		validate(value) {
			if (!value || value.startsWith(' ')) {
				return 'Please type the name of the project'
			}

			if (value.endsWith(' ')) {
				return 'The name of the project cannot end with a space'
			}

			const rgxSlug = /^[a-z0-9-]+$/

			if (!value.match(rgxSlug)) {
				return `Please type the project name in kebab-case, for example: name-of-project`
			}
		}
	})

	return nameProject
}

export const promptTypeProject = async () => {
	const typeProject = await select({
		message: 'Select the type of project:',
		options: [
			{
				label: 'Codermk',
				value: 'codermk'
			},
			{
				label: 'Astro',
				value: 'astro'
			},
			{
				label: 'React',
				value: 'react'
			},
		],
	})

	return typeProject
}
