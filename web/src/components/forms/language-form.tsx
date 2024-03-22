import type { NeptuneMain } from '@/@types'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { languageSelectSchema } from '@/utils/schemas/language-zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import type { z } from 'zod'
import { LanguageSelect } from '../navbar/language-select'
import { Button } from '../ui/button'

export function LanguageForm() {
	const defaultValues: NeptuneMain.Forms.LanguageFormDefaultValues = {
		language: 'english',
	}

	const form = useForm<NeptuneMain.Forms.LanguageFormDefaultValues>({
		resolver: zodResolver(languageSelectSchema),
		defaultValues,
	})

	async function handleSubmit(values: z.infer<typeof languageSelectSchema>) {
		console.log(values)
	}

	return (
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
	)
}
