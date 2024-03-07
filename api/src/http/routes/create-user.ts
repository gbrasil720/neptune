import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function createUser(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const createUserBody = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      telephone: z.string(),
      role: z.enum(['ADMIN', 'MODERATOR', 'SUBSCRIBER', 'MEMBER']).optional(),
    })

    const details = createUserBody.safeParse(request.body)

    if (!details.success || !details.data) {
      return reply.status(400).send({
        error: 'The user details are not fully completed or are invalid',
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
        role: details.data.role ? details.data.role : undefined,
      },
    })

    return reply.status(201).send({ user })
  })
}
