import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function createTeamManager(app: FastifyInstance) {
	app.post('/manager/create', async (request, reply) => {
		const userObject = z.object({
			name: z.string(),
			email: z.string().email(),
			telephone: z.string(),
		})

		const teamObject = z.object({
			name: z.string(),
			users: z.array(userObject).optional(),
		})

		const createTeamManager = z.object({
			id: z.string(),
			name: z.string(),
			email: z.string().email(),
			telephone: z.string(),
			teams: z.array(teamObject).optional(),
		})

		const details = createTeamManager.safeParse(request.body)

		if (!details.success || !details.data) {
			return reply.status(400).send({
				error: 'The manager details are not fully completed or are invalid',
			})
		}

		const managerExists = await prisma.teamManager.findFirst({
			where: {
				email: details.data.email,
				id: details.data.id,
			},
		})

		if (managerExists) {
			return reply
				.status(400)
				.send({ error: 'The provided email is already registered' })
		}

		const manager = await prisma.teamManager.create({
			data: {
				id: details.data.id,
				email: details.data.email,
				name: details.data.name,
				telephone: details.data.telephone,
				teams: {},
			},
		})

		return reply.status(201).send({ manager })
	})
}
