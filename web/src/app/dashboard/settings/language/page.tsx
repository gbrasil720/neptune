'use client'

import { LanguageSelect } from '@/components/navbar/language-select'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const languageSelectSchema = z.object({
	language: z.enum(['english', 'portuguese'], {
		required_error: 'Another language is required',
	}),
})

export default function LanguageSettingsPage() {
	const defaultValues = {
		language: 'english',
	}

	const form = useForm({
		resolver: zodResolver(languageSelectSchema),
		defaultValues,
	})

	async function handleSubmit(values: z.infer<typeof languageSelectSchema>) {
		console.log(values)
	}

	return (
		<div className="container mx-auto py-10 space-y-10">
			<div>
				<h3 className="text-lg font-medium">Language</h3>
				<p className="text-sm text-muted-foreground">
					Update the app language.
				</p>
			</div>
			<Separator />
			<Form {...form}>
				<form
					className="space-y-8"
					onSubmit={form.handleSubmit(
						handleSubmit as SubmitHandler<{ language: string }>
					)}
				>
					<FormField
						name="language"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>App language</FormLabel>
								<FormControl>
									<LanguageSelect field={field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button>Update preferences</Button>
				</form>
			</Form>
		</div>
	)
}
