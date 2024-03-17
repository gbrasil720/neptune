'use client'

import { Navbar } from '@/components/navbar'
import { PreLoader } from '@/components/pre-loader'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import UsersTable from '@/components/user-table'
import { api } from '@/lib/api'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface TeamUserProps {
	id: string
	name: string
	email: string
	telephone: string
	role: string
	teamId: string
}

interface TeamsDataProps {
	id: string
	name: string
	teamManagerId: string
	users: TeamUserProps[]
}

export default function Home() {
	const router = useRouter()
	const [teamsData, setTeamsData] = useState<TeamsDataProps[]>()

	const supabase = createClient()

	useEffect(() => {
		async function loadSession() {
			const session = await supabase.auth.getSession()

			if (!session.data.session) {
				router.push('/sign-in')
			}

			console.log(session)
			const { data } = await api.get(
				`/manager/${session.data.session?.user.identities?.[0].user_id}`
			)

			if (data.error === 'The manager does not exist') {
				await api.post('/manager/create', {
					id: session.data.session?.user.identities?.[0].user_id,
					name: session.data.session?.user.identities?.[0].identity_data?.name,
					email:
						session.data.session?.user.identities?.[0].identity_data?.email,
					telephone: session.data.session?.user.phone,
				})
			}
		}

		async function handleLoadTeams() {
			const session = await supabase.auth.getSession()

			const { data } = await api.get(
				`/manager/${session.data.session?.user.identities?.[0].user_id}`
			)

			console.log(data.manager.teams)
			setTeamsData(data.manager.teams)
		}

		loadSession()
		setTimeout(() => {
			handleLoadTeams()
		}, 2000)
	}, [supabase.auth, router])

	return (
		<>
			<Navbar />
			{teamsData ? (
				<Accordion
					type="single"
					collapsible
					className="container mx-auto py-10"
				>
					{teamsData?.map((team) => (
						<AccordionItem key={team.id} value={team.id}>
							<AccordionTrigger>{team.name}</AccordionTrigger>
							<AccordionContent>
								<UsersTable data={team.users} />
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			) : (
				// <TeamsAccordion {...teamsData} />
				<PreLoader />
			)}
		</>
	)
}
