'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useToast } from '../ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTrigger,
} from '../ui/dialog'
import { EditUserForm } from '../edit-user-form'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  telephone: string
  role: Role
}

enum Role {
  ADMINISTRATOR,
  MODERATOR,
  SUBSCRIBER,
  MEMBER,
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
    header: 'User role',
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
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger>Manage user</DialogTrigger>
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
