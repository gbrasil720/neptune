'use client'

import { Navbar } from '@/components/navbar'
import { PreLoader } from '@/components/pre-loader'
import { DataTable } from '@/components/user-table/data-table'
import { api } from '@/utils/api'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { columns } from '@/components/user-table/columns'

interface User {
	id: string
	name: string
	email: string
	telephone: string
	role: string
	teamId: string
}

interface UsersTableProps {
	data: any
}

export default function TeamIdPage({ params }: { params: { teamId: string } }) {
	const [users, setUsers] = useState<User[] | UsersTableProps | any>([])
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
			{users ? (
				<div className="container mx-auto py-10">
					<DataTable columns={columns} data={users} teamId={params.teamId} />
				</div>
			) : (
				<PreLoader />
			)}
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
