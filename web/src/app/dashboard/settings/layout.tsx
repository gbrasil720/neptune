'use client'

import type { NeptuneMain } from '@/@types'
import { Navbar } from '@/components/navbar'
import { SidebarNav } from '@/components/sidebar'
import { Separator } from '@/components/ui/separator'
import { sidebarNavItems } from '@/utils/sidebarItems'

export default function SettingsLayout({
	children,
}: NeptuneMain.SettingsLayoutProps) {
	return (
		<>
			<Navbar />
			<div className="hidden p-10 pb-16 md:block container mx-auto py-10 space-y-10">
				<div className="space-y-0.5">
					<h2 className="text-2xl font-bold tracking-tight">Settings</h2>
					<p className="text-muted-foreground">
						Manage your account settings and set e-mail preferences.
					</p>
				</div>
				<Separator className="my-6" />
				<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
					<aside className="-mx-4 lg:w-1/5">
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className="flex-1 lg:max-w-2xl">{children}</div>
				</div>
			</div>
		</>
	)
}
