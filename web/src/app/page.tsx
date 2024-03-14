'use client'

import { Navbar } from '@/components/navbar'
import { PreLoader } from '@/components/pre-loader'
import UsersTable from '@/components/user-table'
import { api } from '@/lib/api'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
	const router = useRouter()
	const [data, setData] = useState()

	const supabase = createClient()

	useEffect(() => {
		async function loadSession() {
			const session = await supabase.auth.getSession()

			if (!session.data.session) {
				router.push('/sign-in')
			}

			console.log(session)
		}

		async function handleLoadData() {
			const { data } = await api.get('/users')

			setData(data.users)
		}

		loadSession()
		setTimeout(() => {
			handleLoadData()
		}, 2000)
	}, [supabase.auth, router])

	return (
		<>
			<Navbar />
			{data ? <UsersTable data={data} /> : <PreLoader />}
		</>
	)
}
