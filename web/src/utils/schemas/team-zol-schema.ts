import { z } from 'zod'

export const teamFormSchema = z.object({
	name: z.string().min(5, {
		message: 'Your team name must have at least 5 characters',
	}),
})
