import { api } from './api'
import { getSessionInfos } from './getSessionInfos'
import type { NeptuneUtils } from '@/@types'

export async function loadTeam(): Promise<NeptuneUtils.APIRequests.LoadingTeamsReturnProps> {
	const { id } = await getSessionInfos()

	const { data } =
		await api.get<NeptuneUtils.APIRequests.LoadingTeamsReturnProps>(
			`/manager/${id}`
		)

	return {
		manager: {
			teams: data.manager.teams ?? [],
		},
	}
}
