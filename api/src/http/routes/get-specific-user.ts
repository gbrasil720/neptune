import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { userExists } from '../utils/user-exists'

export async function getSpecificUser(app: FastifyInstance) {
  app.get('/users/:userId', async(request, reply) => {
    const getSpecifcUserParams = z.object({
      userId: z.string().uuid()
    })

    const { userId } = getSpecifcUserParams.parse(request.params)

    const user = await userExists(userId, reply)

    return reply.status(200).send({ user })
  })
}