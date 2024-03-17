'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Trash } from 'lucide-react'

import { api } from '@/lib/api'
import { EditUserForm } from '../edit-user-form'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogPortal,
	DialogTrigger,
} from '../ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useToast } from '../ui/use-toast'

export type User = {
	id: string
	name: string
	email: string
	telephone: string
	role: Role
}

enum Role {
	MANAGER = 0,
	MODERATOR = 1,
	SUBSCRIBER = 2,
	MEMBER = 3,
}

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Email
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'telephone',
		header: 'Telephone',
	},
	{
		accessorKey: 'role',
		header: 'Role',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const user = row.original
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const { toast } = useToast()

			function copyIdToClipboard() {
				navigator.clipboard.writeText(user.id)

				return toast({
					title: 'Success!',
					description: 'The user id was successfully copied to your clipboard!',
				})
			}

			async function deleteUser() {
				try {
					await api.delete(`/users/${user.id}`)
				} catch {
					return toast({
						variant: 'destructive',
						title: 'Oops! An error occurred',
						description:
							'Some type of error occurred during your transaction, try again later!',
					})
				}

				window.location.reload()
			}

			return (
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem onClick={copyIdToClipboard}>
								Copy user id
							</DropdownMenuItem>
							<DropdownMenuItem>
								<DialogTrigger>Update user</DialogTrigger>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="flex gap-2 text-red-500 hover:underline hover:cursor-pointer focus:text-red-500 focus:bg-slate-100"
								onClick={deleteUser}
							>
								<Trash className="w-4 h-4" />
								Delete user
							</DropdownMenuItem>
						</DropdownMenuContent>
						<DialogPortal>
							<DialogContent>
								<EditUserForm user={user} />
							</DialogContent>
						</DialogPortal>
					</DropdownMenu>
				</Dialog>
			)
		},
	},
]
