'use client'

import { Navbar } from '@/components/navbar'
import { PreLoader } from '@/components/pre-loader'
import UsersTable from '@/components/user-table'
import { api } from '@/utils/api'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

interface User {
	id: string
	name: string
	email: string
	telephone: string
	role: string
	teamId: string
}

export default function TeamIdPage({ params }: { params: { teamId: string } }) {
	const [users, setUsers] = useState<User[]>([])
	const supabase = createClient()

	useEffect(() => {
		async function loadUsers() {
			const session = await supabase.auth.getSession()
			const id = session.data.session?.user.identities?.[0].user_id

			const { data } = await api.get(`/manager/${id}`)
			const team = data.manager.teams.find(
				(team: any) => team.id === params.teamId
			)

			setUsers(team.users)
		}

		loadUsers()
	})

	return (
		<>
			<Navbar />
			{users ? <UsersTable data={users} /> : <PreLoader />}
		</>
	)
}

async function getTeams(): Promise<any> {
	const supabase = createClient()
	const session = await supabase.auth.getSession()

	if (!session.data.session) {
		return {
			redirect: {
				destination: '/sign-in',
				permanent: false,
			},
		}
	}

	const id = session.data.session?.user.identities?.[0].user_id

	const { data } = await api.get(`/manager/${id}`)

	return data.managers.teams.map((team: any) => {
		teamId: team.id
	})
}
