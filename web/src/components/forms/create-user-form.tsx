import { cn } from '@/lib/utils'
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { userFormSchema } from '@/utils/models/user-zod-model'
import { Calendar } from '../ui/calendar'

interface CreateUserFormProps {
	onSubmit: (values: z.infer<typeof userFormSchema>) => void
	loading: boolean | undefined
}

export function CreateUserForm({ onSubmit, loading }: CreateUserFormProps) {
	const form = useForm<z.infer<typeof userFormSchema>>({
		resolver: zodResolver(userFormSchema),
		defaultValues: {
			role: 'MEMBER',
		},
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First name</FormLabel>
							<FormControl>
								<Input
									placeholder="Guilherme"
									{...field}
									className="dark:text-primary"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last name</FormLabel>
							<FormControl>
								<Input
									placeholder="Brasil"
									{...field}
									className="dark:text-primary"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input
									placeholder="dev.guilhermebrasil@gmail.com"
									{...field}
									className="dark:text-primary"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="telephone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Telephone</FormLabel>
							<FormControl>
								<Input
									placeholder="77777777777"
									{...field}
									className="dark:text-primary"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="birthDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Date of birth</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="User role" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="MEMBER">MEMBER</SelectItem>
										<SelectItem value="SUBSCRIBER">SUBSCRIBER</SelectItem>
										<SelectItem value="MODERATOR">MODERATOR</SelectItem>
										<SelectItem value="ADMIN">ADMIN</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{loading ? (
					<Button type="submit" disabled className="w-full">
						<Loader2 className="mr-2 h-6 w-6 animate-spin" />
					</Button>
				) : (
					<Button className="w-full" type="submit">
						Submit
					</Button>
				)}
			</form>
		</Form>
	)
}
