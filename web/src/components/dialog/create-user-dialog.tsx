import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'

import { Plus } from 'lucide-react'

import type { z } from 'zod'

import { api } from '@/utils/api'
import type { userFormSchema } from '@/utils/schemas/user-zod-schema'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { CreateUserForm } from '../forms/create-user-form'
import type { NeptuneUtils } from '@/@types'

export function CreateUserDialog(
	team: NeptuneUtils.APIRequests.SingleTeamProps
) {
	const [loading, setLoading] = useState<boolean>()
	const [open, setOpen] = useState(false)
	const { toast } = useToast()

	async function onSubmit(values: z.infer<typeof userFormSchema>) {
		setLoading(true)

		try {
			await api.post(`/users/${team.teamId}`, values)
		} catch (err) {
			console.log(err)

			setLoading(false)
			return toast({
				variant: 'destructive',
				title: 'An error occurred during your transaction',
				description:
					'If you are trying to create a user, probably another user already exists with the provided email',
			})
		}

		setLoading(false)
		setOpen(false)
		window.location.reload()
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button className="flex gap-1">
					<Plus className="w-5 h-5" />
					Create new user
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Creating new user</DialogTitle>
				<DialogDescription>
					<CreateUserForm loading={loading} onSubmit={onSubmit} />
				</DialogDescription>
			</DialogContent>
		</Dialog>
	)
}
