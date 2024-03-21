import { api } from './api'
import { getSessionInfos } from './getSessionInfos'

interface TeamUserProps {
	id: string
	name: string
	email: string
	telephone: string
	birthDate: Date
	role: string
	teamId: string
}

interface Team {
	id: string
	name: string
	teamManagerId: string
	createdAt: string
	users: TeamUserProps[]
}

interface loadTeamsProps {
	manager: {
		teams: Team[]
	}
}

export async function loadTeam(): Promise<loadTeamsProps> {
	const { id } = await getSessionInfos()

	const { data } = await api.get<loadTeamsProps>(`/manager/${id}`)

	return {
		manager: {
			teams: data.manager.teams ?? [],
		},
	}
}
