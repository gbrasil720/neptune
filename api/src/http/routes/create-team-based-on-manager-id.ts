import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createTeamBasedOnManagerId(app: FastifyInstance) {
	app.post("/manager/:managerId/teams/create", async (request, reply) => {
		const createTeamsParams = z.object({
			managerId: z.string(),
		});

		const createTeamBody = z.object({
			name: z.string(),
		});

		const details = createTeamBody.safeParse(request.body);
		const params = createTeamsParams.parse(request.params);

		if (!details.success || !details.data) {
			return reply.status(400).send({
				error: "The manager details are not fully completed or are invalid",
			});
		}

		const managerExists = await prisma.teamManager.findUnique({
			where: {
				id: params.managerId,
			},
		});

		if (managerExists) {
			return reply
				.status(400)
				.send({ error: "This manager account does not exists" });
		}

		const team = await prisma.team.create({
			data: {
				name: details.data.name,
				users: {},
			},
		});

		const alreadyExistsTeam = await prisma.team.findMany({
			where: {
				teamManagerId: params.managerId,
			},
		});

		const newTeams = [...alreadyExistsTeam, team].filter((team) => team.id); // Filter out objects without the 'id' property

		const updatedManager = await prisma.teamManager.update({
			where: {
				id: params.managerId,
			},
			data: {
				teams: {
					set: newTeams.map((team) => ({ id: team.id })),
				},
			},
		});

		return reply.status(201).send({ team, updatedManager });
	});
}
