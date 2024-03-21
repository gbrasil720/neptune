'use client'

import type { ColumnDef } from '@tanstack/react-table'
import {
	ArrowUpDown,
	Calendar,
	MoreHorizontal,
	Phone,
	Trash,
	UserCog,
} from 'lucide-react'

import { api } from '@/utils/api'
import { EditUserForm } from '../forms/edit-user-form'
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
import { format } from 'date-fns'

export type User = {
	id: string
	firstName: string
	lastName: string
	email: string
	telephone: string
	birthDate: Date
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
		accessorKey: 'firstName',
		header: 'First name',
	},
	{
		accessorKey: 'lastName',
		header: 'Last name',
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<ArrowUpDown className="mr-2 h-4 w-4" />
					Email
				</Button>
			)
		},
	},
	{
		accessorKey: 'telephone',
		header: ({ column }) => {
			return (
				<span className="flex items-center">
					<Phone className="mr-2 h-4 w-4" />
					Telephone
				</span>
			)
		},
	},
	{
		accessorKey: 'birthDate',
		header: ({ column }) => {
			return (
				<span className="flex items-center">
					<Calendar className="mr-2 h-4 w-4" />
					Birth date
				</span>
			)
		},
		cell: ({ row }) => {
			const value = String(row.getValue('birthDate'))

			return format(value, 'dd/MM/yyyy')
		},
	},
	{
		accessorKey: 'role',
		// header: 'Role',
		header: ({ column }) => {
			return (
				<span className="flex items-center">
					<UserCog className="mr-2 h-4 w-4" />
					Role
				</span>
			)
		},
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
