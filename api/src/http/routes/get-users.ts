import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getUsers(app: FastifyInstance) {
	app.get("/users", async (request, reply) => {
		const users = await prisma.user.findMany();

		return reply.status(200).send({ users });
	});
}
