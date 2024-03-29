import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import type { z } from 'zod'
import type { teamFormSchema } from '@/utils/schemas/team-zol-schema'
import { useState } from 'react'
import { api } from '@/utils/api'
import { getSessionInfos } from '@/utils/getSessionInfos'
import { CreateTeamForm } from '../forms/create-team-form'

export function CreateTeamDialog() {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	async function handleSubmit(values: z.infer<typeof teamFormSchema>) {
		setLoading(true)
		const { id } = await getSessionInfos()

		try {
			await api.post(`/manager/${id}/teams/create`, {
				name: values.name,
			})
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
			setOpen(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button className="flex items-center gap-2" variant="secondary">
					<Plus size={18} />
					Create team
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new team!</DialogTitle>
					<DialogDescription>
						Create a new awesome team for your company
					</DialogDescription>
				</DialogHeader>
				<CreateTeamForm loading={loading} onSubmit={handleSubmit} />
			</DialogContent>
		</Dialog>
	)
}
