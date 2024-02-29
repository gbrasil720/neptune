import { FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function userExists(id: string, reply: FastifyReply) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (user) return user
  if (!user)
    return reply
      .status(400)
      .send({ error: `Failed to find user using the provided ID` })
}
