import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { userExists } from '../utils/user-exists'

export async function updateUserRole(app: FastifyInstance) {
  app.patch('/users/:userId', async (request, reply) => {
    const updateUserRoleParams = z.object({
      userId: z.string().uuid(),
    })

    const updateUserRoleBody = z.object({
      role: z.enum(['ADMIN', 'MODERATOR', 'SUBSCRIBER', 'MEMBER']),
    })

    const { userId } = updateUserRoleParams.parse(request.params)
    const role = updateUserRoleBody.safeParse(request.body)

    const user = await userExists(userId, reply)

    if (!role.success || !role.data) {
      return reply
        .status(400)
        .send({ error: 'No valid role was found at the request body' })
    }

    if (user?.role === role.data.role) {
      return reply
        .status(400)
        .send({
          error: `The user that you are trying to set the role ${role.data.role} already has this role`,
        })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role.data.role,
      },
    })

    return reply.status(200).send({ user: updatedUser })
  })
}
