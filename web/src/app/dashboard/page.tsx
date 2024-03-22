'use client'

import type { NeptuneUtils } from '@/@types'
import { CreateTeamDialog } from '@/components/dialog/create-team-dialog'
import { Navbar } from '@/components/navbar'
import { PreLoader } from '@/components/pre-loader'
import { TeamCard } from '@/components/team-card'
import { api } from '@/utils/api'
import { getSessionInfos } from '@/utils/getSessionInfos'
import { loadTeam } from '@/utils/loadTeams'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
	const router = useRouter()
	const [teamsData, setTeamsData] =
		useState<NeptuneUtils.APIRequests.TeamProps[]>()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		async function loadSession() {
			setLoading(true)
			const { session, id, name, email, phone } = await getSessionInfos()

			if (!session) {
				router.push('/sign-in')
			}

			console.log(session)
			const { data } = await api.get(`/manager/${id}`)

			if (data.error === 'The manager does not exist') {
				await api.post('/manager/create', {
					id,
					name,
					email,
					telephone: phone,
				})
			}

			const { manager } = await loadTeam()
			setTeamsData(manager.teams)

			setLoading(false)
		}

		loadSession()
	}, [router])

	return (
		<>
			<Navbar />
			{loading ? (
				<PreLoader />
			) : (
				<div className="container mx-auto py-10 space-y-10">
					{teamsData ? (
						<>
							{teamsData?.map((team) => (
								<TeamCard
									key={team.id}
									createdAt={team.createdAt}
									id={team.id}
									name={team.name}
									teamManagerId={team.teamManagerId}
									users={team.users}
								/>
							))}
						</>
					) : (
						<div className="flex flex-col h-screen my-auto py-10 space-y-10 items-center justify-center">
							<Search size={30} className="animate-pulse" />
							<p className="text-muted-foreground">
								Oops! No team was found registered on your account :(
							</p>
							<CreateTeamDialog />
						</div>
					)}
				</div>
			)}
		</>
	)
}
