import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { teamFormSchema } from '@/utils/models/team-zol-model'

interface CreateTeamFormProps {
	onSubmit: (values: z.infer<typeof teamFormSchema>) => void
	loading: boolean | undefined
}

export function CreateTeamForm({ onSubmit, loading }: CreateTeamFormProps) {
	const form = useForm<z.infer<typeof teamFormSchema>>({
		resolver: zodResolver(teamFormSchema),
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Team name</FormLabel>
							<FormControl>
								<Input placeholder="Billing Team" {...field} />
							</FormControl>
							<FormDescription>
								It must have a team name that has at least 5 characters
							</FormDescription>
						</FormItem>
					)}
				/>
				{loading ? (
					<Button className="w-full" disabled>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Create new team!
					</Button>
				) : (
					<Button className="w-full">Create new team!</Button>
				)}
			</form>
		</Form>
	)
}
