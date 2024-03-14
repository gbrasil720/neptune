import { columns } from './columns'
import { DataTable } from './data-table'

interface UsersTableProps {
	data: any
}

export default function UsersTable({ data }: UsersTableProps) {
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	)
}
