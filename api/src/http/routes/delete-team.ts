import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function deleteTeam(app: FastifyInstance) {
	app.delete('/teams/:teamId', async (request, reply) => {
		const deleteUserParams = z.object({
			teamId: z.string().uuid(),
		})

		const { teamId } = deleteUserParams.parse(request.params)

		await prisma.team.delete({
			where: {
				id: teamId,
			},
		})

		return reply.status(200).send({ message: 'Team deleted successfully' })
	})
}
