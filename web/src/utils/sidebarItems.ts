import type { NeptuneUtils } from '@/@types'

export const sidebarNavItems: NeptuneUtils.Sidebar.SidebarItemsProps = [
	{
		title: 'Account',
		href: '/dashboard/settings',
	},
	{
		title: 'Appearance',
		href: '/dashboard/settings/appearance',
	},
	{
		title: 'Subscription',
		href: '/dashboard/settings/subscription',
	},
	{
		title: 'Language',
		href: '/dashboard/settings/language',
	},
]
