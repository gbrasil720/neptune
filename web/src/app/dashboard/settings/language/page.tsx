'use client'

import { Separator } from '@/components/ui/separator'
import { LanguageForm } from '@/components/forms/language-form'

export default function LanguageSettingsPage() {
	return (
		<div className="container mx-auto py-10 space-y-10">
			<div>
				<h3 className="text-lg font-medium">Language</h3>
				<p className="text-sm text-muted-foreground">
					Update the app language.
				</p>
			</div>
			<Separator />
			<LanguageForm />
		</div>
	)
}
