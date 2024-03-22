import { z } from 'zod'

export const languageSelectSchema = z.object({
	language: z.enum(['english', 'portuguese'], {
		required_error: 'Another language is required',
	}),
})
