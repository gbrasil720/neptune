import { ColumnDef } from '@tanstack/react-table'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  telephone: string
  role: Role
}

enum Role {
  ADMIN,
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
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    accessorKey: 'telephone',
    header: 'Telephone',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
]
