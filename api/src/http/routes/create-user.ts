import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function createUser(app: FastifyInstance) {
	app.post('/users/:teamId', async (request, reply) => {
		const createUserBody = z.object({
			firstName: z.string(),
			lastName: z.string(),
			email: z.string().email(),
			telephone: z.string(),
			birthDate: z.coerce.date(),
			role: z.enum(['MANAGER', 'MODERATOR', 'SUBSCRIBER', 'MEMBER']).optional(),
		})

		const createUserParams = z.object({
			teamId: z.string(),
		})

		const details = createUserBody.safeParse(request.body)
		const teamId = createUserParams.parse(request.params)

		if (!details.success || !details.data) {
			return reply.status(400).send({
				error: 'The user details are not fully completed or are invalid',
				teamId,
				details,
				request: request.body,
			})
		}

		const userExists = await prisma.user.findFirst({
			where: {
				email: details.data.email,
			},
		})

		if (userExists) {
			return reply
				.status(400)
				.send({ error: 'The provided email is already registered' })
		}

		const user = await prisma.user.create({
			data: {
				firstName: details.data.firstName,
				lastName: details.data.lastName,
				email: details.data.email,
				telephone: details.data.telephone,
				birthDate: details.data.birthDate,
				role: details.data.role ? details.data.role : undefined,
				teamId: teamId.teamId,
			},
		})

		const existingUsers = await prisma.user.findMany({
			where: {
				teamId: teamId.teamId,
			},
		})

		const allUsers = [...existingUsers, user]

		const updatedTeam = await prisma.team.update({
			where: {
				id: teamId.teamId,
			},
			data: {
				users: {
					set: allUsers.map((user) => ({ id: user.id })),
				},
			},
			include: {
				users: true,
				TeamManager: true,
			},
		})

		return reply.status(201).send({ user, updatedTeam })
	})
}
