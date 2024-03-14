import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { userExists } from '../utils/user-exists'

export async function deleteUser(app: FastifyInstance) {
	app.delete('/users/:userId', async (request, reply) => {
		const deleteUserParams = z.object({
			userId: z.string().uuid(),
		})

		const { userId } = deleteUserParams.parse(request.params)

		const user = await userExists(userId, reply)

		await prisma.user.delete({
			where: {
				id: user?.id,
			},
		})

		return reply.status(200).send({ message: 'User deleted successfully' })
	})
}
