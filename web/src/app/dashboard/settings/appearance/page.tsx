import { Separator } from '@/components/ui/separator'
import { AppearanceForm } from '@/components/appearance-form'

export default function SettingsDisplayPage() {
	return (
		<div className="container mx-auto py-10 space-y-10">
			<div>
				<h3 className="text-lg font-medium">Appearance</h3>
				<p className="text-sm text-muted-foreground">
					Customize the appearance of the app. Automatically switch between day
					and night themes.
				</p>
			</div>
			<Separator />
			<h1>
				<AppearanceForm />
			</h1>
		</div>
	)
}
