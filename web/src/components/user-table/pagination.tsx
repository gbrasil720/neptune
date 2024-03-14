import { Button } from "../ui/button";

interface UserTablePaginationProps {
	table: any;
}

export function UserTablePagination({ table }: UserTablePaginationProps) {
	return (
		<div className="flex items-center justify-end space-x-2 py-4">
			<Button
				variant="outline"
				size="sm"
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				Previous
			</Button>
			<Button
				variant="outline"
				size="sm"
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				Next
			</Button>
		</div>
	);
}
