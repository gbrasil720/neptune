'use client'

import { Pencil, Users, CalendarClock, Fingerprint } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { DeleteTeamDialog } from './dialog/delete-team-dialog'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card'
import { format } from 'date-fns'
import type { NeptuneUtils } from '@/@types'

export function TeamCard(team: NeptuneUtils.APIRequests.TeamProps) {
	const router = useRouter()

	return (
		<Card key={team.id}>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>{team.name}</CardTitle>
						<CardDescription>
							All informations about the <b>{team.name}</b> team
						</CardDescription>
					</div>
					<div className="space-y-6">
						<Button
							onClick={() => router.push(`/dashboard/team/${team.id}`)}
							className="mt-5 flex items-center gap-2 w-28"
						>
							<Pencil size={14} />
							Manage
						</Button>
						<DeleteTeamDialog
							teamId={team.id}
							teamName={team.name}
							teamUsersLength={team.users.length}
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex items-center space-x-3">
					<Users size={18} />
					<p>Users count: {team.users.length}</p>
				</div>
				<div className="flex items-center space-x-3">
					<CalendarClock size={18} />
					<p>Created at: {format(team.createdAt, 'PPP')}</p>
				</div>
				<div className="flex items-center space-x-3">
					<Fingerprint size={18} />
					<p>Team id: {team.id}</p>
				</div>
			</CardContent>
		</Card>
	)
}
