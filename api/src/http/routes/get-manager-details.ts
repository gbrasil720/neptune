import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function getManagerDetails(app: FastifyInstance) {
	app.get('/manager/:managerId', async (request, reply) => {
		const getManagerDetails = z.object({
			managerId: z.string(),
		})

		const details = getManagerDetails.parse(request.params)

		const manager = await prisma.teamManager.findUnique({
			where: {
				id: details.managerId,
			},
			include: {
				teams: {
					include: {
						users: true,
					},
				},
			},
		})

		if (!manager) {
			return reply.status(200).send({ error: 'The manager does not exist' })
		}

		return reply.status(200).send({ manager })
	})
}
