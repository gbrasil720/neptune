import { Loader2, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog'
import { api } from '@/utils/api'
import type { NeptuneMain } from '@/@types'

export function DeleteTeamDialog({
	teamId,
	teamName,
	teamUsersLength,
}: NeptuneMain.Dialogs.DeleteTeamDialogProps) {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	async function handleDelete() {
		setLoading(true)
		try {
			await api.delete(`/teams/${teamId}`)
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
			setOpen(false)
			window.location.reload()
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger>
				<Button
					className="border border-destructive flex items-center gap-2 w-28 text-destructive hover:bg-destructive hover:text-white"
					variant="outline"
				>
					<Trash size={14} />
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. Deleting <b>{teamName}</b> will
						permanently delete this team and remove all the {teamUsersLength}{' '}
						users included in it.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					{loading ? (
						<AlertDialogAction onClick={handleDelete} disabled>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							I&apos;m sure
						</AlertDialogAction>
					) : (
						<AlertDialogAction onClick={handleDelete}>
							I&apos;m sure
						</AlertDialogAction>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
