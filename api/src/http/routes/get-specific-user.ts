import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function getSpecificUser(app: FastifyInstance) {
  app.get('/users/:userId', async(request, reply) => {
    const getSpecifcUserParams = z.object({
      userId: z.string().uuid()
    })

    const { userId } = getSpecifcUserParams.parse(request.params)

    
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    
    if(!user) {
      return reply.status(400).send({ error: `Failed to find user using the provided ID` })
    }

    return reply.status(200).send({ user })
  })
}