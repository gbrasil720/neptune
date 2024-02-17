import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function createUser(app: FastifyInstance) {
  app.post('/users', async(request, reply) => {
    const createUserBody = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      telephone: z.string(),
      permissions: z.array(z.string())
    })

    if(!createUserBody) {
      return reply.status(400).send({ error: 'The user details are not fully completed' })
    }

    const details = createUserBody.parse(request.body)

    const user = await prisma.user.create({
      data: {
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        telephone: details.telephone,
        permissions: {
          create: {
            code: details.permissions[0]
          }
        }
      }
    })

    return reply.status(201).send({ user: { id: user.id, firstName: user.firstName, lastName: user.lastName, telephone: user.telephone, permissions: details.permissions } })
  })
}