import { createClient } from './supabase/client'
import type { NeptuneUtils } from '@/@types'

export async function getSessionInfos(): Promise<NeptuneUtils.SessionInfos> {
	const supabase = createClient()
	const { data } = await supabase.auth.getSession()

	return {
		id: data.session?.user?.identities?.[0]?.user_id ?? '',
		name: data.session?.user.identities?.[0]?.identity_data?.name ?? '',
		email: data.session?.user.identities?.[0]?.identity_data?.email ?? '',
		phone: data.session?.user.phone ?? '',
		avatar: data.session?.user.identities?.[0]?.identity_data?.avatar_url ?? '',
		session: data.session,
	}
}
