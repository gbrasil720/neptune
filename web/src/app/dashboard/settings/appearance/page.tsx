import { Separator } from '@/components/ui/separator'

export default function SettingsDisplayPage() {
	return (
		<div className="container mx-auto py-10 space-y-10">
			<div>
				<h3 className="text-lg font-medium">Display</h3>
				<p className="text-sm text-muted-foreground">
					Turn items on or off to control what&apos;s displayed in the app.
				</p>
			</div>
			<Separator />
			<h1>Edit here the appearance settings</h1>
		</div>
	)
}
